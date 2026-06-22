import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  ListingStatus,
  NotificationType,
  Prisma,
  UserRole,
} from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { AuditLogsService } from "../audit-logs/audit-logs.service";
import { NotificationsService } from "../notifications/notifications.service";
import { CreateListingDto } from "./dto/create-listing.dto";
import { AddListingImageDto } from "./dto/add-listing-image.dto";

const MAX_LISTING_IMAGES = 6;
const ADMIN_ROLES = new Set<UserRole>([UserRole.ADMIN, UserRole.PLATFORM]);

const LISTING_OWNER_INCLUDE = {
  agent: {
    include: {
      user: { select: { id: true, name: true, email: true, phone: true } },
    },
  },
  manager: {
    include: {
      user: { select: { id: true, name: true, email: true, phone: true } },
    },
  },
  images: { orderBy: { order: "asc" } },
} satisfies Prisma.ListingInclude;

@Injectable()
export class ListingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogs: AuditLogsService,
    private readonly notifications: NotificationsService,
  ) {}

  findAll() {
    return this.prisma.listing.findMany({
      orderBy: { createdAt: "desc" },
      include: LISTING_OWNER_INCLUDE,
    });
  }

  async findMine(userId: string, role: UserRole) {
    if (role === UserRole.AGENT) {
      const agentProfile = await this.prisma.agentProfile.findUnique({
        where: { userId },
      });
      if (!agentProfile) return [];
      return this.prisma.listing.findMany({
        where: { agentId: agentProfile.id },
        orderBy: { createdAt: "desc" },
        include: LISTING_OWNER_INCLUDE,
      });
    }

    if (role === UserRole.MANAGER) {
      const managerProfile = await this.prisma.managerProfile.findUnique({
        where: { userId },
      });
      if (!managerProfile) return [];
      return this.prisma.listing.findMany({
        where: { managerId: managerProfile.id },
        orderBy: { createdAt: "desc" },
        include: LISTING_OWNER_INCLUDE,
      });
    }

    // LANDLORD (and ADMIN/PLATFORM, who own no listings but get an empty,
    // harmless result here - they use /listings or /admin views instead).
    return this.prisma.listing.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: "desc" },
      include: LISTING_OWNER_INCLUDE,
    });
  }

  async findOne(id: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
      include: LISTING_OWNER_INCLUDE,
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

    await this.notifications.notifyAdmins({
      type: NotificationType.SYSTEM,
      title: "New Listing Pending Review",
      message: `"${listing.title}" was submitted and needs verification.`,
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
        listing: { include: LISTING_OWNER_INCLUDE },
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

  async reject(id: string, actorId: string, note?: string) {
    const listing = await this.prisma.listing.update({
      where: { id },
      data: { verificationStatus: ListingStatus.REJECTED },
    });

    await this.auditLogs.create({
      actorId,
      action: "listing.rejected",
      entityType: "listing",
      entityId: id,
      severity: "WARNING",
      metadata: { note },
    });

    return listing;
  }

  /**
   * Attaches an already-uploaded image to a listing, along with whatever
   * EXIF metadata the frontend extracted client-side (GPS/capture
   * date/device). This is a real authenticity signal, not a guarantee - the
   * backend trusts it as descriptive metadata only; a human admin still
   * reviews the listing before it goes VERIFIED.
   */
  async addImage(
    listingId: string,
    actorId: string,
    role: UserRole,
    dto: AddListingImageDto,
  ) {
    const listing = await this.assertCanManageImages(listingId, actorId, role);

    const imageCount = await this.prisma.listingImage.count({
      where: { listingId },
    });
    if (imageCount >= MAX_LISTING_IMAGES) {
      throw new BadRequestException(
        `A listing can have at most ${MAX_LISTING_IMAGES} images.`,
      );
    }

    const image = await this.prisma.listingImage.create({
      data: {
        listingId: listing.id,
        url: dto.url,
        order: imageCount,
        latitude: dto.latitude,
        longitude: dto.longitude,
        capturedAt: dto.capturedAt ? new Date(dto.capturedAt) : undefined,
        device: dto.device,
        gpsPresent: dto.gpsPresent ?? false,
      },
    });

    await this.auditLogs.create({
      actorId,
      action: "listing.image_added",
      entityType: "listing",
      entityId: listing.id,
      severity: "INFO",
      metadata: { imageId: image.id, gpsPresent: image.gpsPresent },
    });

    return image;
  }

  async deleteImage(
    listingId: string,
    imageId: string,
    actorId: string,
    role: UserRole,
  ) {
    const listing = await this.assertCanManageImages(listingId, actorId, role);

    const image = await this.prisma.listingImage.findUnique({
      where: { id: imageId },
    });
    if (!image || image.listingId !== listing.id) {
      throw new NotFoundException("Listing image not found.");
    }

    await this.prisma.listingImage.delete({ where: { id: imageId } });

    await this.auditLogs.create({
      actorId,
      action: "listing.image_removed",
      entityType: "listing",
      entityId: listing.id,
      severity: "INFO",
      metadata: { imageId },
    });

    return { success: true };
  }

  private async assertCanManageImages(
    listingId: string,
    userId: string,
    role: UserRole,
  ) {
    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
      include: LISTING_OWNER_INCLUDE,
    });
    if (!listing) throw new NotFoundException("Listing not found.");

    if (ADMIN_ROLES.has(role)) return listing;

    const isOwner = listing.ownerId === userId;
    const isAgent = listing.agent?.user.id === userId;
    const isManager = listing.manager?.user.id === userId;

    if (!isOwner && !isAgent && !isManager) {
      throw new ForbiddenException("You do not have access to this listing.");
    }

    return listing;
  }
}
