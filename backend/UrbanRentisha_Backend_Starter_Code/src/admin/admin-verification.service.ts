import { Injectable } from "@nestjs/common";
import {
  AgentVerificationStatus,
  DocumentType,
  NotificationType,
  UserStatus,
  VerificationStage,
} from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { AuditLogsService } from "../audit-logs/audit-logs.service";
import { StorageService } from "../storage/storage.service";
import { StellarService } from "../stellar/stellar.service";
import { NotificationsService } from "../notifications/notifications.service";
import { VerificationDecision } from "./dto/review-verification.dto";

@Injectable()
export class AdminVerificationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogs: AuditLogsService,
    private readonly storage: StorageService,
    private readonly stellar: StellarService,
    private readonly notifications: NotificationsService,
  ) {}

  async listVerifications() {
    const pendingStages: VerificationStage[] = [
      VerificationStage.DOCUMENTS_UPLOADED,
      VerificationStage.UNDER_REVIEW,
      VerificationStage.NEEDS_CORRECTION,
    ];

    const [tenants, landlords, agents, managers] = await Promise.all([
      this.prisma.tenantProfile.findMany({
        where: { verificationStage: { in: pendingStages } },
        include: {
          user: { select: { id: true, name: true, email: true, status: true } },
          documents: true,
        },
      }),
      this.prisma.landlordProfile.findMany({
        where: { verificationStage: { in: pendingStages } },
        include: {
          user: { select: { id: true, name: true, email: true, status: true } },
          documents: true,
        },
      }),
      this.prisma.agentProfile.findMany({
        where: { verificationStage: { in: pendingStages } },
        include: {
          user: { select: { id: true, name: true, email: true, status: true } },
          documents: true,
          landlord: { include: { user: { select: { name: true } } } },
        },
      }),
      this.prisma.managerProfile.findMany({
        where: { verificationStage: { in: pendingStages } },
        include: {
          user: { select: { id: true, name: true, email: true, status: true } },
          documents: true,
          landlord: { include: { user: { select: { name: true } } } },
        },
      }),
    ]);

    type VerifiableProfile = {
      id: string;
      createdAt: Date;
      verificationStage: VerificationStage;
      user: { id: string; name: string; email: string; status: UserStatus };
      landlord?: { user: { name: string } } | null;
      documents: {
        id: string;
        fileUrl: string;
        fileName: string;
        documentType: DocumentType | null;
        status: string;
        createdAt: Date;
      }[];
    };

    const toRow = async (profile: VerifiableProfile, profileType: string) => ({
      profileType,
      profileId: profile.id,
      userId: profile.user.id,
      name: profile.user.name,
      email: profile.user.email,
      userStatus: profile.user.status,
      verificationStage: profile.verificationStage,
      linkedLandlordName: profile.landlord?.user.name ?? null,
      documents: await Promise.all(
        profile.documents.map(async (doc) => ({
          id: doc.id,
          fileName: doc.fileName,
          documentType: doc.documentType,
          status: doc.status,
          createdAt: doc.createdAt,
          signedUrl: await this.storage.getDocumentSignedUrl(doc.fileUrl),
        })),
      ),
      createdAt: profile.createdAt,
    });

    const rows = await Promise.all([
      ...tenants.map((p) => toRow(p, "tenant")),
      ...landlords.map((p) => toRow(p, "landlord")),
      ...agents.map((p) => toRow(p, "agent")),
      ...managers.map((p) => toRow(p, "manager")),
    ]);

    return rows.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async reviewVerification(
    profileType: "tenant" | "landlord" | "agent" | "manager",
    profileId: string,
    decision: VerificationDecision,
    note: string | undefined,
    actorId: string,
  ) {
    const stage =
      decision === VerificationDecision.APPROVED
        ? VerificationStage.APPROVED
        : decision === VerificationDecision.REJECTED
          ? VerificationStage.REJECTED
          : VerificationStage.NEEDS_CORRECTION;

    let updated;
    switch (profileType) {
      case "tenant":
        updated = await this.prisma.tenantProfile.update({
          where: { id: profileId },
          data: {
            verificationStage: stage,
            verifiedBadge: decision === VerificationDecision.APPROVED,
          },
        });
        break;
      case "landlord":
        updated = await this.prisma.landlordProfile.update({
          where: { id: profileId },
          data: { verificationStage: stage },
        });
        break;
      case "agent":
        updated = await this.prisma.agentProfile.update({
          where: { id: profileId },
          data: {
            verificationStage: stage,
            verificationStatus:
              decision === VerificationDecision.APPROVED
                ? AgentVerificationStatus.VERIFIED
                : AgentVerificationStatus.PENDING,
          },
        });
        break;
      case "manager":
        updated = await this.prisma.managerProfile.update({
          where: { id: profileId },
          data: {
            verificationStage: stage,
            verificationStatus:
              decision === VerificationDecision.APPROVED
                ? AgentVerificationStatus.VERIFIED
                : AgentVerificationStatus.PENDING,
          },
        });
        break;
    }

    await this.auditLogs.create({
      actorId,
      action: `verification.${decision.toLowerCase()}`,
      entityType: profileType,
      entityId: profileId,
      severity:
        decision === VerificationDecision.REJECTED ? "WARNING" : "SUCCESS",
      metadata: { note },
    });

    if (
      (profileType === "agent" || profileType === "manager") &&
      decision === VerificationDecision.APPROVED
    ) {
      await this.attestAndNotifyLandlord(profileType, profileId, actorId);
    }

    return updated;
  }

  private async attestAndNotifyLandlord(
    profileType: "agent" | "manager",
    profileId: string,
    actorId: string,
  ) {
    try {
      const { txHash } = await this.stellar.recordAttestation({
        subjectId: profileId,
        approvedBy: actorId,
        role: profileType,
      });

      if (profileType === "agent") {
        await this.prisma.agentProfile.update({
          where: { id: profileId },
          data: { attestationTxHash: txHash, attestedAt: new Date() },
        });
      } else {
        await this.prisma.managerProfile.update({
          where: { id: profileId },
          data: { attestationTxHash: txHash, attestedAt: new Date() },
        });
      }

      await this.auditLogs.create({
        actorId,
        action: "agent.attested",
        entityType: profileType,
        entityId: profileId,
        severity: "SUCCESS",
        metadata: { txHash },
      });
    } catch (error) {
      await this.auditLogs.create({
        actorId,
        action: "agent.attestation_failed",
        entityType: profileType,
        entityId: profileId,
        severity: "CRITICAL",
        metadata: {
          error: error instanceof Error ? error.message : String(error),
        },
      });
    }

    const profile =
      profileType === "agent"
        ? await this.prisma.agentProfile.findUnique({
            where: { id: profileId },
            include: { landlord: { select: { userId: true } } },
          })
        : await this.prisma.managerProfile.findUnique({
            where: { id: profileId },
            include: { landlord: { select: { userId: true } } },
          });

    if (profile?.landlord?.userId) {
      await this.notifications.create({
        userId: profile.landlord.userId,
        type: NotificationType.SYSTEM,
        title: "Agent Invite Approved",
        message:
          "Your invited team member has been approved. Generate their activation code from My Team.",
      });
    }
  }
}
