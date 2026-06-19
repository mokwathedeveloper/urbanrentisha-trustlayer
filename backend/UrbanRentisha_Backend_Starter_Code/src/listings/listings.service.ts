import { Injectable, NotFoundException } from "@nestjs/common";
import { ListingStatus } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { AuditLogsService } from "../audit-logs/audit-logs.service";
import { CreateListingDto } from "./dto/create-listing.dto";

@Injectable()
export class ListingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogs: AuditLogsService,
  ) {}

  findAll() {
    return this.prisma.listing.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        agent: {
          include: { user: { select: { id: true, name: true, email: true } } },
        },
      },
    });
  }

  async findOne(id: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
      include: {
        agent: {
          include: { user: { select: { id: true, name: true, email: true } } },
        },
      },
    });

    if (!listing) throw new NotFoundException("Listing not found.");
    return listing;
  }

  async create(ownerId: string, dto: CreateListingDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: ownerId },
      include: { agentProfile: true },
    });

    const listing = await this.prisma.listing.create({
      data: {
        ...dto,
        currency: dto.currency ?? "KES",
        ownerId,
        agentId: user?.agentProfile?.id,
        verificationStatus: ListingStatus.PENDING_REVIEW,
      },
    });

    await this.auditLogs.create({
      actorId: ownerId,
      action: "listing.created",
      entityType: "listing",
      entityId: listing.id,
      severity: "INFO",
      metadata: { title: listing.title },
    });

    return listing;
  }

  async markVerified(id: string, actorId: string) {
    const listing = await this.prisma.listing.update({
      where: { id },
      data: { verificationStatus: ListingStatus.VERIFIED },
    });

    await this.auditLogs.create({
      actorId,
      action: "listing.verified",
      entityType: "listing",
      entityId: id,
      severity: "SUCCESS",
    });

    return listing;
  }
}
