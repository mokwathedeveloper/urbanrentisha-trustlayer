import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import {
  DocumentType,
  NotificationType,
  UserRole,
  UserStatus,
  VerificationStage,
} from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { randomBytes, randomUUID } from "crypto";
import { PrismaService } from "../prisma/prisma.service";
import { AuditLogsService } from "../audit-logs/audit-logs.service";
import { NotificationsService } from "../notifications/notifications.service";
import { StorageService } from "../storage/storage.service";
import { StellarService } from "../stellar/stellar.service";
import { EscrowReportingService } from "../escrow-reporting/escrow-reporting.service";

const ACTIVATION_CODE_CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const ACTIVATION_CODE_TTL_MS = 1000 * 60 * 60 * 72;

function generateActivationCode(length = 8): string {
  let code = "";
  for (let i = 0; i < length; i++) {
    code +=
      ACTIVATION_CODE_CHARSET[
        randomBytes(1)[0] % ACTIVATION_CODE_CHARSET.length
      ];
  }
  return code;
}

@Injectable()
export class LandlordService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogs: AuditLogsService,
    private readonly notifications: NotificationsService,
    private readonly storage: StorageService,
    private readonly stellar: StellarService,
    private readonly escrowReporting: EscrowReportingService,
  ) {}

  /**
   * Every escrow/payment transaction tied to a property this landlord
   * owns - active holds, releases, and refunds together, since "where is
   * my money" shouldn't require checking three different screens.
   */
  async findEscrowOverview(userId: string) {
    return this.escrowReporting.findForListings({ ownerId: userId });
  }

  async inviteAgent(
    actorId: string,
    actorRole: UserRole,
    dto: {
      email: string;
      name: string;
      role: "AGENT" | "MANAGER";
      landlordProfileId?: string;
    },
    file: Express.Multer.File,
  ) {
    const landlordProfileId = await this.resolveLandlordProfileId(
      actorId,
      actorRole,
      dto.landlordProfileId,
    );

    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new BadRequestException("Email is already registered.");
    }

    // Unguessable placeholder: nobody is ever told this, so login is
    // naturally impossible until the agent activates with a real code.
    const placeholderHash = await bcrypt.hash(randomUUID(), 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        passwordHash: placeholderHash,
        role: dto.role,
        status: UserStatus.PENDING,
        agentProfile:
          dto.role === UserRole.AGENT
            ? {
                create: {
                  verificationStatus: "pending",
                  verificationStage: VerificationStage.DOCUMENTS_UPLOADED,
                  landlordId: landlordProfileId,
                },
              }
            : undefined,
        managerProfile:
          dto.role === UserRole.MANAGER
            ? {
                create: {
                  verificationStatus: "pending",
                  verificationStage: VerificationStage.DOCUMENTS_UPLOADED,
                  landlordId: landlordProfileId,
                },
              }
            : undefined,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        agentProfile: { select: { id: true } },
        managerProfile: { select: { id: true } },
      },
    });

    const profileId = user.agentProfile?.id ?? user.managerProfile?.id;
    if (!profileId) {
      throw new BadRequestException("role must be AGENT or MANAGER.");
    }

    const { fileUrl, fileName } = await this.storage.uploadDocument(
      actorId,
      file,
    );
    await this.prisma.document.create({
      data: {
        uploaderId: actorId,
        fileUrl,
        fileName,
        documentType: DocumentType.ID_CARD,
        agentProfileId: dto.role === UserRole.AGENT ? profileId : undefined,
        managerProfileId: dto.role === UserRole.MANAGER ? profileId : undefined,
      },
    });

    await this.auditLogs.create({
      actorId,
      action: "agent.invite_submitted",
      entityType: "user",
      entityId: user.id,
      severity: "INFO",
      metadata: { email: user.email, role: user.role, landlordProfileId },
    });

    await this.notifications.notifyAdmins({
      type: NotificationType.SYSTEM,
      title: "New Agent Invite Pending Review",
      message: `${dto.name} was invited as a ${dto.role.toLowerCase()} and needs document verification.`,
    });

    return {
      message:
        "Submitted for admin review. You'll be notified once it's approved.",
      profileId,
    };
  }

  async generateActivationCode(
    actorId: string,
    actorRole: UserRole,
    profileType: "agent" | "manager",
    profileId: string,
  ) {
    const landlordProfileId = await this.resolveLandlordProfileId(
      actorId,
      actorRole,
      undefined,
    );

    const profile =
      profileType === "agent"
        ? await this.prisma.agentProfile.findUnique({
            where: { id: profileId },
          })
        : await this.prisma.managerProfile.findUnique({
            where: { id: profileId },
          });

    if (!profile) throw new NotFoundException("Profile not found.");
    if (profile.landlordId !== landlordProfileId) {
      throw new ForbiddenException(
        "This profile does not belong to your team.",
      );
    }
    if (profile.verificationStatus !== "verified") {
      throw new BadRequestException(
        "This profile has not been approved by an admin yet.",
      );
    }

    const code = generateActivationCode();
    const activationCodeHash = await bcrypt.hash(code, 10);
    const activationCodeExpiresAt = new Date(
      Date.now() + ACTIVATION_CODE_TTL_MS,
    );

    if (profileType === "agent") {
      await this.prisma.agentProfile.update({
        where: { id: profileId },
        data: { activationCodeHash, activationCodeExpiresAt },
      });
    } else {
      await this.prisma.managerProfile.update({
        where: { id: profileId },
        data: { activationCodeHash, activationCodeExpiresAt },
      });
    }

    await this.auditLogs.create({
      actorId,
      action: "agent.activation_code_generated",
      entityType: profileType,
      entityId: profileId,
      severity: "INFO",
    });

    return { activationCode: code, expiresAt: activationCodeExpiresAt };
  }

  async activate(input: {
    email: string;
    activationCode: string;
    newPassword: string;
    file: Express.Multer.File;
  }) {
    const user = await this.prisma.user.findUnique({
      where: { email: input.email },
      include: { agentProfile: true, managerProfile: true },
    });

    if (!user || (!user.agentProfile && !user.managerProfile)) {
      throw new UnauthorizedException("Invalid activation request.");
    }

    const profile = user.agentProfile ?? user.managerProfile;
    const profileType: "agent" | "manager" = user.agentProfile
      ? "agent"
      : "manager";

    if (
      !profile?.activationCodeHash ||
      !profile.activationCodeExpiresAt ||
      profile.activationCodeExpiresAt.getTime() < Date.now()
    ) {
      throw new UnauthorizedException(
        "This activation code is invalid or has expired.",
      );
    }

    const codeOk = await bcrypt.compare(
      input.activationCode,
      profile.activationCodeHash,
    );
    if (!codeOk) {
      throw new UnauthorizedException("Invalid activation code.");
    }

    const passwordHash = await bcrypt.hash(input.newPassword, 10);
    const { fileUrl, fileName } = await this.storage.uploadDocument(
      user.id,
      input.file,
    );

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: user.id },
        data: { passwordHash, status: UserStatus.ACTIVE },
      }),
      profileType === "agent"
        ? this.prisma.agentProfile.update({
            where: { id: profile.id },
            data: {
              activationCodeHash: null,
              activationCodeExpiresAt: null,
              activatedAt: new Date(),
            },
          })
        : this.prisma.managerProfile.update({
            where: { id: profile.id },
            data: {
              activationCodeHash: null,
              activationCodeExpiresAt: null,
              activatedAt: new Date(),
            },
          }),
      this.prisma.document.create({
        data: {
          uploaderId: user.id,
          fileUrl,
          fileName,
          documentType: DocumentType.ID_CARD,
          agentProfileId: profileType === "agent" ? profile.id : undefined,
          managerProfileId: profileType === "manager" ? profile.id : undefined,
        },
      }),
    ]);

    await this.auditLogs.create({
      actorId: user.id,
      action: "agent.activated",
      entityType: profileType,
      entityId: profile.id,
      severity: "SUCCESS",
    });

    let walletSecret: string | undefined;
    try {
      const wallet = this.stellar.generateWallet();
      await this.prisma.user.update({
        where: { id: user.id },
        data: { walletAddress: wallet.publicKey },
      });
      this.stellar.fundTestnetAccount(wallet.publicKey).catch(() => undefined);
      walletSecret = wallet.secretKey;
    } catch {
      // Non-critical: the agent can generate a wallet later from their profile.
    }

    return { success: true, walletSecret };
  }

  async getTeam(actorId: string, actorRole: UserRole) {
    const landlordProfileId = await this.resolveLandlordProfileId(
      actorId,
      actorRole,
      undefined,
    );

    const [agents, managers] = await Promise.all([
      this.prisma.agentProfile.findMany({
        where: { landlordId: landlordProfileId },
        include: {
          user: { select: { id: true, name: true, email: true, status: true } },
        },
      }),
      this.prisma.managerProfile.findMany({
        where: { landlordId: landlordProfileId },
        include: {
          user: { select: { id: true, name: true, email: true, status: true } },
        },
      }),
    ]);

    return {
      agents: agents.map((agent) => ({
        id: agent.id,
        profileType: "agent" as const,
        agencyName: agent.agencyName,
        verificationStatus: agent.verificationStatus,
        activatedAt: agent.activatedAt,
        attestationTxHash: agent.attestationTxHash,
        user: agent.user,
      })),
      managers: managers.map((manager) => ({
        id: manager.id,
        profileType: "manager" as const,
        agencyName: manager.agencyName,
        verificationStatus: manager.verificationStatus,
        activatedAt: manager.activatedAt,
        attestationTxHash: manager.attestationTxHash,
        user: manager.user,
      })),
    };
  }

  private async resolveLandlordProfileId(
    actorId: string,
    actorRole: UserRole,
    requestedLandlordProfileId: string | undefined,
  ): Promise<string> {
    if (actorRole === UserRole.ADMIN || actorRole === UserRole.PLATFORM) {
      if (!requestedLandlordProfileId) {
        throw new BadRequestException(
          "landlordProfileId is required when an admin performs this action.",
        );
      }
      const landlord = await this.prisma.landlordProfile.findUnique({
        where: { id: requestedLandlordProfileId },
      });
      if (!landlord) throw new NotFoundException("Landlord profile not found.");
      return landlord.id;
    }

    if (actorRole !== UserRole.LANDLORD) {
      throw new ForbiddenException("Only landlords can manage their team.");
    }

    const landlord = await this.prisma.landlordProfile.findUnique({
      where: { userId: actorId },
    });
    if (!landlord) throw new NotFoundException("Landlord profile not found.");
    return landlord.id;
  }
}
