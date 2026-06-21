import { BadRequestException, Injectable } from "@nestjs/common";
import { UserRole, VerificationStage } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { StorageService } from "../storage/storage.service";
import { AuditLogsService } from "../audit-logs/audit-logs.service";

@Injectable()
export class UploadsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: StorageService,
    private readonly auditLogs: AuditLogsService,
  ) {}

  async uploadAvatar(userId: string, file: Express.Multer.File) {
    const avatarUrl = await this.storage.uploadAvatar(userId, file);

    await this.prisma.user.update({
      where: { id: userId },
      data: { avatarUrl },
    });

    await this.auditLogs.create({
      actorId: userId,
      action: "user.avatar_uploaded",
      entityType: "user",
      entityId: userId,
      severity: "INFO",
    });

    return { avatarUrl };
  }

  async uploadDocument(
    userId: string,
    role: UserRole,
    file: Express.Multer.File,
  ) {
    const { fileUrl, fileName } = await this.storage.uploadDocument(
      userId,
      file,
    );

    const profileLink = await this.resolveProfileLink(userId, role);

    const document = await this.prisma.document.create({
      data: {
        uploaderId: userId,
        fileUrl,
        fileName,
        ...profileLink.documentData,
      },
    });

    await this.bumpStageIfNeeded(profileLink);

    await this.auditLogs.create({
      actorId: userId,
      action: "document.uploaded",
      entityType: "document",
      entityId: document.id,
      severity: "INFO",
      metadata: { fileName },
    });

    return document;
  }

  private async resolveProfileLink(userId: string, role: UserRole) {
    switch (role) {
      case UserRole.TENANT: {
        const profile = await this.prisma.tenantProfile.findUniqueOrThrow({
          where: { userId },
        });
        return {
          documentData: { tenantProfileId: profile.id },
          profileType: "tenantProfile" as const,
          profileId: profile.id,
          currentStage: profile.verificationStage,
        };
      }
      case UserRole.LANDLORD: {
        const profile = await this.prisma.landlordProfile.findUniqueOrThrow({
          where: { userId },
        });
        return {
          documentData: { landlordProfileId: profile.id },
          profileType: "landlordProfile" as const,
          profileId: profile.id,
          currentStage: profile.verificationStage,
        };
      }
      case UserRole.AGENT: {
        const profile = await this.prisma.agentProfile.findUniqueOrThrow({
          where: { userId },
        });
        return {
          documentData: { agentProfileId: profile.id },
          profileType: "agentProfile" as const,
          profileId: profile.id,
          currentStage: profile.verificationStage,
        };
      }
      case UserRole.MANAGER: {
        const profile = await this.prisma.managerProfile.findUniqueOrThrow({
          where: { userId },
        });
        return {
          documentData: { managerProfileId: profile.id },
          profileType: "managerProfile" as const,
          profileId: profile.id,
          currentStage: profile.verificationStage,
        };
      }
      default:
        throw new BadRequestException(
          "This role does not support document uploads.",
        );
    }
  }

  private async bumpStageIfNeeded(
    profileLink: Awaited<ReturnType<UploadsService["resolveProfileLink"]>>,
  ) {
    if (profileLink.currentStage !== VerificationStage.PROFILE_CREATED) return;

    const data = { verificationStage: VerificationStage.DOCUMENTS_UPLOADED };
    switch (profileLink.profileType) {
      case "tenantProfile":
        await this.prisma.tenantProfile.update({
          where: { id: profileLink.profileId },
          data,
        });
        break;
      case "landlordProfile":
        await this.prisma.landlordProfile.update({
          where: { id: profileLink.profileId },
          data,
        });
        break;
      case "agentProfile":
        await this.prisma.agentProfile.update({
          where: { id: profileLink.profileId },
          data,
        });
        break;
      case "managerProfile":
        await this.prisma.managerProfile.update({
          where: { id: profileLink.profileId },
          data,
        });
        break;
    }
  }
}
