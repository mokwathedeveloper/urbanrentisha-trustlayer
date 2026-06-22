import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { randomInt } from "crypto";
import { UserRole } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../prisma/prisma.service";
import { AuditLogsService } from "../audit-logs/audit-logs.service";
import { InviteAgentDto } from "./dto/invite-agent.dto";

const TEMP_PASSWORD_CHARSET =
  "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";

function generateTemporaryPassword(length = 12): string {
  let password = "";
  for (let i = 0; i < length; i++) {
    password += TEMP_PASSWORD_CHARSET[randomInt(TEMP_PASSWORD_CHARSET.length)];
  }
  return password;
}

@Injectable()
export class LandlordService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogs: AuditLogsService,
  ) {}

  async inviteAgent(actorId: string, actorRole: UserRole, dto: InviteAgentDto) {
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

    const temporaryPassword = generateTemporaryPassword();
    const passwordHash = await bcrypt.hash(temporaryPassword, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        passwordHash,
        role: dto.role,
        mustChangePassword: true,
        agentProfile:
          dto.role === UserRole.AGENT
            ? {
                create: {
                  verificationStatus: "pending",
                  landlordId: landlordProfileId,
                },
              }
            : undefined,
        managerProfile:
          dto.role === UserRole.MANAGER
            ? {
                create: {
                  verificationStatus: "pending",
                  landlordId: landlordProfileId,
                },
              }
            : undefined,
      },
      select: { id: true, email: true, name: true, role: true },
    });

    await this.auditLogs.create({
      actorId,
      action: "agent.invited",
      entityType: "user",
      entityId: user.id,
      severity: "INFO",
      metadata: { email: user.email, role: user.role, landlordProfileId },
    });

    return { user, temporaryPassword };
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
        user: agent.user,
      })),
      managers: managers.map((manager) => ({
        id: manager.id,
        profileType: "manager" as const,
        agencyName: manager.agencyName,
        verificationStatus: manager.verificationStatus,
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
