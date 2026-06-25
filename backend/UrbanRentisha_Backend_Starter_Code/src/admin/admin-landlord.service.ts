import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuditLogsService } from "../audit-logs/audit-logs.service";

@Injectable()
export class AdminLandlordService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogs: AuditLogsService,
  ) {}

  async listLandlords() {
    const landlords = await this.prisma.landlordProfile.findMany({
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true, email: true } } },
    });

    return landlords.map((landlord) => ({
      id: landlord.id,
      companyName: landlord.companyName,
      name: landlord.user.name,
      email: landlord.user.email,
    }));
  }

  async setAgentLandlord(
    profileType: "agent" | "manager",
    profileId: string,
    landlordProfileId: string | null,
    actorId: string,
  ) {
    if (landlordProfileId) {
      const landlord = await this.prisma.landlordProfile.findUnique({
        where: { id: landlordProfileId },
      });
      if (!landlord) throw new NotFoundException("Landlord profile not found.");
    }

    const existing =
      profileType === "agent"
        ? await this.prisma.agentProfile.findUnique({
            where: { id: profileId },
          })
        : await this.prisma.managerProfile.findUnique({
            where: { id: profileId },
          });
    if (!existing)
      throw new NotFoundException(`${profileType} profile not found.`);

    const updated =
      profileType === "agent"
        ? await this.prisma.agentProfile.update({
            where: { id: profileId },
            data: { landlordId: landlordProfileId },
            include: { user: { select: { name: true, email: true } } },
          })
        : await this.prisma.managerProfile.update({
            where: { id: profileId },
            data: { landlordId: landlordProfileId },
            include: { user: { select: { name: true, email: true } } },
          });

    await this.auditLogs.create({
      actorId,
      action: "landlord.relinked",
      entityType: profileType,
      entityId: profileId,
      severity: "INFO",
      metadata: { landlordProfileId },
    });

    return updated;
  }

  async getLandlordTeam(landlordProfileId: string) {
    const landlord = await this.prisma.landlordProfile.findUnique({
      where: { id: landlordProfileId },
      include: {
        user: { select: { id: true, name: true, email: true, status: true } },
        agents: {
          include: {
            user: {
              select: { id: true, name: true, email: true, status: true },
            },
            listings: {
              select: { id: true, title: true, verificationStatus: true },
            },
          },
        },
        managers: {
          include: {
            user: {
              select: { id: true, name: true, email: true, status: true },
            },
            listings: {
              select: { id: true, title: true, verificationStatus: true },
            },
          },
        },
      },
    });

    if (!landlord) throw new NotFoundException("Landlord profile not found.");

    return {
      id: landlord.id,
      companyName: landlord.companyName,
      verificationStage: landlord.verificationStage,
      trustScore: landlord.trustScore,
      user: landlord.user,
      agents: landlord.agents.map((agent) => ({
        id: agent.id,
        profileType: "agent" as const,
        agencyName: agent.agencyName,
        verificationStatus: agent.verificationStatus,
        trustScore: agent.trustScore,
        user: agent.user,
        listings: agent.listings,
      })),
      managers: landlord.managers.map((manager) => ({
        id: manager.id,
        profileType: "manager" as const,
        agencyName: manager.agencyName,
        verificationStatus: manager.verificationStatus,
        trustScore: manager.trustScore,
        user: manager.user,
        listings: manager.listings,
      })),
    };
  }
}
