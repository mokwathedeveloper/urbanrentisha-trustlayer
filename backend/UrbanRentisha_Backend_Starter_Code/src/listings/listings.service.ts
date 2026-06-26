import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  ListingAvailability,
  ListingStatus,
  NotificationType,
  Prisma,
  UserRole,
  ViewingRequestStatus,
} from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { AuditLogsService } from "../audit-logs/audit-logs.service";
import { NotificationsService } from "../notifications/notifications.service";
import { RealtimeGateway } from "../realtime/realtime.gateway";
import { ViewingRequestsService } from "../viewing-requests/viewing-requests.service";
import { computeEscrowPhase } from "../escrow-reporting/escrow-phase.util";
import { CreateListingDto } from "./dto/create-listing.dto";
import { AddListingImageDto } from "./dto/add-listing-image.dto";

const MAX_LISTING_IMAGES = 6;
const ADMIN_ROLES = new Set<UserRole>([UserRole.ADMIN, UserRole.PLATFORM]);

const RESERVATION_WINDOW_MS = 48 * 60 * 60 * 1000;

const TERMINAL_REQUEST_STATUSES: ViewingRequestStatus[] = [
  ViewingRequestStatus.EXPIRED,
  ViewingRequestStatus.REVOKED,
  ViewingRequestStatus.CANCELLED,
];

const CONTACT_USER_SELECT = {
  id: true,
  name: true,
  email: true,
  phone: true,
  lastActiveAt: true,
} satisfies Prisma.UserSelect;

const LISTING_OWNER_INCLUDE = {
  owner: { select: CONTACT_USER_SELECT },
  agent: {
    include: { user: { select: CONTACT_USER_SELECT } },
  },
  manager: {
    include: { user: { select: CONTACT_USER_SELECT } },
  },
  images: { orderBy: { order: "asc" } },
} satisfies Prisma.ListingInclude;

@Injectable()
export class ListingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogs: AuditLogsService,
    private readonly notifications: NotificationsService,
    private readonly realtime: RealtimeGateway,
    private readonly viewingRequests: ViewingRequestsService,
  ) {}

  /**
   * Public, unauthenticated browse endpoint (no guard, no role context) -
   * defaults to verified-only. Pending/rejected listings have no business
   * being shown to a tenant browsing the marketplace; admins moderate
   * those through the dedicated admin verification endpoints, not this one.
   */
  findAll() {
    return this.prisma.listing.findMany({
      where: { verificationStatus: ListingStatus.VERIFIED },
      orderBy: { createdAt: "desc" },
      include: LISTING_OWNER_INCLUDE,
    });
  }

  async findMine(userId: string, role: UserRole) {
    let listings: Awaited<ReturnType<typeof this.prisma.listing.findMany>>;

    if (role === UserRole.AGENT) {
      const agentProfile = await this.prisma.agentProfile.findUnique({
        where: { userId },
      });
      if (!agentProfile) return [];
      listings = await this.prisma.listing.findMany({
        where: { agentId: agentProfile.id },
        orderBy: { createdAt: "desc" },
        include: LISTING_OWNER_INCLUDE,
      });
    } else if (role === UserRole.MANAGER) {
      const managerProfile = await this.prisma.managerProfile.findUnique({
        where: { userId },
      });
      if (!managerProfile) return [];
      listings = await this.prisma.listing.findMany({
        where: { managerId: managerProfile.id },
        orderBy: { createdAt: "desc" },
        include: LISTING_OWNER_INCLUDE,
      });
    } else {
      // LANDLORD (and ADMIN/PLATFORM, who own no listings but get an empty,
      // harmless result here - they use /listings or /admin views instead).
      listings = await this.prisma.listing.findMany({
        where: { ownerId: userId },
        orderBy: { createdAt: "desc" },
        include: LISTING_OWNER_INCLUDE,
      });
    }

    return this.attachEscrowPhase(listings);
  }

  /**
   * Adds the current booking/escrow phase to each listing - authenticated,
   * owner-scoped callers only (findMine, the per-listing escrow endpoint).
   * Deliberately NOT part of LISTING_OWNER_INCLUDE, which also backs the
   * public findAll/findOne endpoints - tenant identity and payment amounts
   * must never leak to anonymous listing views.
   */
  private async attachEscrowPhase<
    T extends { id: string; reservedByRequestId: string | null },
  >(listings: T[]) {
    const requestIds = listings
      .map((l) => l.reservedByRequestId)
      .filter((id): id is string => Boolean(id));
    if (requestIds.length === 0) {
      return listings.map((listing) => ({ ...listing, escrowPhase: null }));
    }

    const requests = await this.prisma.viewingRequest.findMany({
      where: { id: { in: requestIds } },
      include: {
        payment: true,
        proofVerification: true,
        tenant: { include: { user: { select: { id: true, name: true } } } },
      },
    });
    const requestById = new Map(requests.map((r) => [r.id, r]));

    return listings.map((listing) => {
      const request = listing.reservedByRequestId
        ? requestById.get(listing.reservedByRequestId)
        : undefined;
      return {
        ...listing,
        escrowPhase: request ? computeEscrowPhase(request) : null,
      };
    });
  }

  async getEscrowPhase(listingId: string, userId: string, role: UserRole) {
    const listing = await this.assertCanManageListing(listingId, userId, role);
    if (!listing.reservedByRequestId) return null;

    const request = await this.prisma.viewingRequest.findUnique({
      where: { id: listing.reservedByRequestId },
      include: {
        payment: true,
        proofVerification: true,
        tenant: { include: { user: { select: { id: true, name: true } } } },
      },
    });
    return request ? computeEscrowPhase(request) : null;
  }

  /** Owner + agent + manager userIds for a listing, deduped. Used to fan
   * out escrow notifications to everyone with a stake in the property, not
   * just the tenant. */
  async getEscrowContacts(listingId: string): Promise<string[]> {
    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
      include: { agent: true, manager: true },
    });
    if (!listing) return [];
    return [
      ...new Set(
        [
          listing.ownerId,
          listing.agent?.userId,
          listing.manager?.userId,
        ].filter((id): id is string => Boolean(id)),
      ),
    ];
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
      listingId: listing.id,
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
        gpsPresent: dto.gpsPresent,
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
    return this.assertCanManageListing(listingId, userId, role);
  }

  private async assertCanManageListing(
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

  /**
   * Reserves a listing for the tenant whose payment just landed - the
   * earliest real commitment signal, matching how real estate platforms
   * (Zillow, Lamudi, Property24) flip a listing to "Under Offer" rather
   * than running a hotel-style date-lock or a strict FIFO ticket queue,
   * neither of which fits a single, all-or-nothing rental unit.
   *
   * If the listing is already reserved by a *different* request (a genuine
   * race - two tenants both mid-pipeline), this payment is still honored
   * (the money already moved, it cannot be undone here) but the conflict is
   * surfaced loudly for manual admin resolution rather than silently lost.
   */
  async reserveForRequest(
    listingId: string,
    requestId: string,
    actorId: string,
  ) {
    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
    });
    if (!listing) return { conflict: false as const };

    if (
      listing.availabilityStatus === ListingAvailability.RESERVED &&
      listing.reservedByRequestId !== requestId
    ) {
      await this.auditLogs.create({
        actorId,
        action: "listing.reservation_conflict",
        entityType: "listing",
        entityId: listingId,
        severity: "CRITICAL",
        metadata: {
          requestId,
          alreadyReservedByRequestId: listing.reservedByRequestId,
        },
      });
      await this.notifications.notifyAdmins({
        type: NotificationType.SYSTEM,
        title: "Listing Reservation Conflict",
        message: `Two tenants both paid for "${listing.title}" around the same time. Manual review and possible refund needed.`,
        listingId,
      });
      return { conflict: true as const };
    }

    if (listing.availabilityStatus !== ListingAvailability.AVAILABLE) {
      return { conflict: false as const };
    }

    await this.prisma.listing.update({
      where: { id: listingId },
      data: {
        availabilityStatus: ListingAvailability.RESERVED,
        reservedByRequestId: requestId,
        reservationExpiresAt: new Date(Date.now() + RESERVATION_WINDOW_MS),
      },
    });

    await this.auditLogs.create({
      actorId,
      action: "listing.reserved",
      entityType: "listing",
      entityId: listingId,
      severity: "INFO",
      metadata: { requestId },
    });

    await this.notifyWaitlist(
      listingId,
      actorId,
      "Property Reserved by Another Tenant",
      `"${listing.title}" now has another tenant ahead of you in the process.`,
    );

    this.realtime.emitToListing(listingId, "listing:reserved", {
      listingId,
      availabilityStatus: ListingAvailability.RESERVED,
    });

    return { conflict: false as const };
  }

  /**
   * Called once this tenant's proof actually verifies - only now is the
   * deal truly done, so only now do other queued tenants lose their place.
   * Cancelling them at payment time instead would be premature: if this
   * tenant's proof later fails, the queue would already be empty with no
   * one left to promote.
   */
  async finalizeRequest(listingId: string, requestId: string) {
    await this.viewingRequests.cancelQueuedRequestsForListing(
      listingId,
      requestId,
    );
  }

  /**
   * Releases a listing back to AVAILABLE - called when the reserving
   * tenant's proof fails, their reservation window lapses (see the cron
   * sweep in ListingsAvailabilityScheduler), or an agent manually frees it.
   * If `expectedRequestId` is given, only releases when that request is the
   * one actually holding the reservation - guards against a failure on one
   * tenant's request accidentally freeing a different tenant's valid hold.
   */
  async releaseListing(
    listingId: string,
    actorId: string | undefined,
    reason: string,
    expectedRequestId?: string,
  ) {
    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
    });
    if (
      !listing ||
      listing.availabilityStatus !== ListingAvailability.RESERVED
    ) {
      return;
    }
    if (
      expectedRequestId &&
      listing.reservedByRequestId !== expectedRequestId
    ) {
      return;
    }

    await this.prisma.listing.update({
      where: { id: listingId },
      data: {
        availabilityStatus: ListingAvailability.AVAILABLE,
        reservedByRequestId: null,
        reservationExpiresAt: null,
      },
    });

    await this.auditLogs.create({
      actorId,
      action: "listing.released",
      entityType: "listing",
      entityId: listingId,
      severity: "INFO",
      metadata: { reason },
    });

    await this.notifyWaitlist(
      listingId,
      actorId,
      "Property Available Again",
      `"${listing.title}" is available again - you can request a viewing.`,
    );

    this.realtime.emitToListing(listingId, "listing:released", {
      listingId,
      availabilityStatus: ListingAvailability.AVAILABLE,
    });

    // If someone was queued behind the tenant who just lost their hold,
    // give them their turn immediately rather than waiting for the next
    // cron tick.
    await this.viewingRequests.promoteNextQueuedRequest(listingId);
  }

  async markRented(listingId: string, actorId: string, role: UserRole) {
    const listing = await this.assertCanManageListing(listingId, actorId, role);
    if (listing.availabilityStatus !== ListingAvailability.RESERVED) {
      throw new BadRequestException(
        "Only a reserved listing can be marked as rented.",
      );
    }

    const updated = await this.prisma.listing.update({
      where: { id: listingId },
      data: { availabilityStatus: ListingAvailability.RENTED },
    });

    await this.auditLogs.create({
      actorId,
      action: "listing.rented",
      entityType: "listing",
      entityId: listingId,
      severity: "SUCCESS",
    });

    this.realtime.emitToListing(listingId, "listing:rented", {
      listingId,
      availabilityStatus: ListingAvailability.RENTED,
    });

    return updated;
  }

  async releaseReservation(listingId: string, actorId: string, role: UserRole) {
    await this.assertCanManageListing(listingId, actorId, role);
    await this.releaseListing(listingId, actorId, "manual_agent_release");
    return this.findOne(listingId);
  }

  /**
   * Called by the cron sweep (see ListingsAvailabilityScheduler) - finds
   * every reservation whose 48h window has lapsed with nothing resolving it
   * (no proof submitted, no agent action) and frees those listings.
   */
  async releaseExpiredReservations() {
    const expired = await this.prisma.listing.findMany({
      where: {
        availabilityStatus: ListingAvailability.RESERVED,
        reservationExpiresAt: { lt: new Date() },
      },
      select: { id: true },
    });

    for (const listing of expired) {
      await this.releaseListing(listing.id, undefined, "reservation_expired");
    }

    return expired.length;
  }

  /**
   * Everyone with real interest in a listing - tenants who saved it, plus
   * tenants with a still-active (non-terminal) viewing request for it -
   * minus the tenant who just triggered this notification, if any.
   */
  private async notifyWaitlist(
    listingId: string,
    excludeUserId: string | null | undefined,
    title: string,
    message: string,
  ) {
    const [savedBy, requesters] = await Promise.all([
      this.prisma.savedListing.findMany({
        where: { listingId },
        select: { userId: true },
      }),
      this.prisma.viewingRequest.findMany({
        where: {
          listingId,
          status: { notIn: TERMINAL_REQUEST_STATUSES },
        },
        select: { tenant: { select: { userId: true } } },
      }),
    ]);

    const userIds = new Set<string>([
      ...savedBy.map((s) => s.userId),
      ...requesters.map((r) => r.tenant.userId),
    ]);
    if (excludeUserId) userIds.delete(excludeUserId);

    await Promise.all(
      Array.from(userIds).map((userId) =>
        this.notifications.create({
          userId,
          type: NotificationType.SYSTEM,
          title,
          message,
          listingId,
        }),
      ),
    );
  }
}
