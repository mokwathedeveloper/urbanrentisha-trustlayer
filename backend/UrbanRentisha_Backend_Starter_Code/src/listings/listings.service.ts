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
          include: {
            user: {
              select: { id: true, name: true, email: true, phone: true },
            },
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
      include: {
        agent: {
          include: {
            user: {
              select: { id: true, name: true, email: true, phone: true },
            },
          },
        },
      },
    });

    if (!listing) throw new NotFoundException("Listing not found.");
    return listing;
  }

  async create(ownerId: string, dto: CreateListingDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: ownerId },
      include: { agentProfile: true, managerProfile: true },
    });

    const listing = await this.prisma.listing.create({
      data: {
        ...dto,
        currency: dto.currency ?? "KES",
        ownerId,
        agentId: user?.agentProfile?.id,
        managerId: user?.managerProfile?.id,
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

  async saveListing(userId: string, listingId: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
    });
    if (!listing) throw new NotFoundException("Listing not found.");

    return this.prisma.savedListing.upsert({
      where: { userId_listingId: { userId, listingId } },
      update: {},
      create: { userId, listingId },
    });
  }

  async unsaveListing(userId: string, listingId: string) {
    await this.prisma.savedListing.deleteMany({ where: { userId, listingId } });
    return { success: true };
  }

  findSaved(userId: string) {
    return this.prisma.savedListing.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        listing: {
          include: {
            agent: {
              include: {
                user: {
                  select: { id: true, name: true, email: true, phone: true },
                },
              },
            },
          },
        },
      },
    });
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
