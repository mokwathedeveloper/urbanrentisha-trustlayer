import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  ListingAvailability,
  NotificationType,
  UserRole,
  ViewingRequestStatus,
} from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { AuditLogsService } from "../audit-logs/audit-logs.service";
import { NotificationsService } from "../notifications/notifications.service";
import { CreateViewingRequestDto } from "./dto/create-viewing-request.dto";
import { ViewingRequestAccessService } from "./viewing-request-access.service";
import { summarizePayments } from "../escrow-reporting/escrow-summary.util";

/**
 * How long a tenant has to pay once it's their turn before the slot is
 * handed to the next interested tenant in line - keeps a serious tenant
 * from being stuck behind someone who never intends to pay.
 */
const TURN_WINDOW_MS = 30 * 60 * 1000;

const NON_BOOKING_STATUSES: ViewingRequestStatus[] = [
  ViewingRequestStatus.EXPIRED,
  ViewingRequestStatus.REVOKED,
  ViewingRequestStatus.CANCELLED,
  ViewingRequestStatus.ACCESS_UNLOCKED,
];

@Injectable()
export class ViewingRequestsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogs: AuditLogsService,
    private readonly access: ViewingRequestAccessService,
    private readonly notifications: NotificationsService,
  ) {}

  async create(userId: string, dto: CreateViewingRequestDto) {
    const tenant = await this.prisma.tenantProfile.findUnique({
      where: { userId },
    });
    if (!tenant) throw new BadRequestException("Tenant profile is required.");

    const listing = await this.prisma.listing.findUnique({
      where: { id: dto.listingId },
    });
    if (!listing) throw new NotFoundException("Listing not found.");
    if (listing.availabilityStatus === ListingAvailability.RESERVED) {
      throw new BadRequestException(
        "This property is currently reserved by another tenant.",
      );
    }
    if (listing.availabilityStatus === ListingAvailability.RENTED) {
      throw new BadRequestException("This property has already been rented.");
    }

    const activeHolder = await this.prisma.viewingRequest.findFirst({
      where: {
        listingId: listing.id,
        status: ViewingRequestStatus.AWAITING_PAYMENT,
        turnExpiresAt: { gt: new Date() },
      },
    });

    const isQueued = Boolean(activeHolder);
    const request = await this.prisma.viewingRequest.create({
      data: {
        tenantId: tenant.id,
        listingId: listing.id,
        preferredDate: dto.preferredDate
          ? new Date(dto.preferredDate)
          : undefined,
        preferredTime: dto.preferredTime,
        status: isQueued
          ? ViewingRequestStatus.QUEUED
          : ViewingRequestStatus.AWAITING_PAYMENT,
        turnExpiresAt: isQueued ? null : new Date(Date.now() + TURN_WINDOW_MS),
      },
      include: { listing: true },
    });

    await this.auditLogs.create({
      actorId: userId,
      action: isQueued ? "viewing_request.queued" : "viewing_request.created",
      entityType: "viewing_request",
      entityId: request.id,
      severity: "INFO",
      metadata: { listingId: listing.id, viewingFee: listing.viewingFee },
    });

    if (isQueued) {
      const position = await this.prisma.viewingRequest.count({
        where: {
          listingId: listing.id,
          status: ViewingRequestStatus.QUEUED,
          createdAt: { lte: request.createdAt },
        },
      });
      await this.notifications.create({
        userId,
        type: NotificationType.SYSTEM,
        title: "You're in the Queue",
        message: `Another tenant is currently paying for "${listing.title}". You are #${position} in line and will be notified the moment it's your turn.`,
        viewingRequestId: request.id,
      });
    }

    return request;
  }

  /**
   * Hands the slot to the next queued tenant for this listing, if any -
   * called both by the cron sweep (turn expired) and directly by
   * ListingsService when a reservation releases, so the next tenant in
   * line doesn't have to wait for the next sweep tick.
   */
  async promoteNextQueuedRequest(listingId: string) {
    const next = await this.prisma.viewingRequest.findFirst({
      where: { listingId, status: ViewingRequestStatus.QUEUED },
      orderBy: { createdAt: "asc" },
      include: { tenant: true, listing: true },
    });
    if (!next) return null;

    const promoted = await this.prisma.viewingRequest.update({
      where: { id: next.id },
      data: {
        status: ViewingRequestStatus.AWAITING_PAYMENT,
        turnExpiresAt: new Date(Date.now() + TURN_WINDOW_MS),
      },
    });

    await this.auditLogs.create({
      actorId: next.tenant.userId,
      action: "viewing_request.turn_promoted",
      entityType: "viewing_request",
      entityId: next.id,
      severity: "INFO",
    });

    await this.notifications.create({
      userId: next.tenant.userId,
      type: NotificationType.SYSTEM,
      title: "It's Your Turn!",
      message: `"${next.listing.title}" is now available for you to pay for. You have 30 minutes before your turn passes to the next tenant.`,
      viewingRequestId: next.id,
    });

    return promoted;
  }

  /**
   * Called when a different tenant's payment actually secures the listing -
   * everyone else still queued for it never gets a turn on this listing, so
   * tell them now rather than leaving them waiting indefinitely.
   */
  async cancelQueuedRequestsForListing(
    listingId: string,
    excludeRequestId: string,
  ) {
    const queued = await this.prisma.viewingRequest.findMany({
      where: {
        listingId,
        id: { not: excludeRequestId },
        status: {
          in: [
            ViewingRequestStatus.QUEUED,
            ViewingRequestStatus.AWAITING_PAYMENT,
          ],
        },
      },
      include: { tenant: true, listing: true },
    });
    if (queued.length === 0) return;

    await this.prisma.viewingRequest.updateMany({
      where: { id: { in: queued.map((q) => q.id) } },
      data: { status: ViewingRequestStatus.CANCELLED, turnExpiresAt: null },
    });

    await Promise.all(
      queued.map((request) =>
        this.notifications.create({
          userId: request.tenant.userId,
          type: NotificationType.SYSTEM,
          title: "Property No Longer Available",
          message: `"${request.listing.title}" was secured by another tenant. Browse similar verified properties.`,
          viewingRequestId: request.id,
        }),
      ),
    );
  }

  /**
   * Cron entry point - releases any turn whose window lapsed with no
   * payment, and promotes the next tenant in line for that listing.
   */
  async expireLapsedTurns() {
    const lapsed = await this.prisma.viewingRequest.findMany({
      where: {
        status: ViewingRequestStatus.AWAITING_PAYMENT,
        turnExpiresAt: { lt: new Date() },
      },
      include: { tenant: true, listing: true },
    });

    for (const request of lapsed) {
      await this.prisma.viewingRequest.update({
        where: { id: request.id },
        data: { status: ViewingRequestStatus.EXPIRED, turnExpiresAt: null },
      });

      await this.auditLogs.create({
        actorId: request.tenant.userId,
        action: "viewing_request.turn_expired",
        entityType: "viewing_request",
        entityId: request.id,
        severity: "WARNING",
      });

      await this.notifications.create({
        userId: request.tenant.userId,
        type: NotificationType.SYSTEM,
        title: "Your Turn Has Expired",
        message: `You did not pay for "${request.listing.title}" in time. Your turn has passed to the next tenant in line.`,
        viewingRequestId: request.id,
      });

      await this.promoteNextQueuedRequest(request.listingId);
    }

    return lapsed.length;
  }

  async findAllForUser(userId: string) {
    const tenant = await this.prisma.tenantProfile.findUnique({
      where: { userId },
    });
    if (!tenant) return [];

    return this.prisma.viewingRequest.findMany({
      where: { tenantId: tenant.id },
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
        payment: true,
        zkProof: true,
        proofVerification: true,
        viewingCode: true,
      },
    });
  }

  /** Dashboard card numbers for a tenant - amount spent, held in escrow,
   * refunded, and booking counts, mirroring the landlord/agent summary
   * shape so the same dashboard card components work for every role. */
  async findEscrowSummary(userId: string) {
    const tenant = await this.prisma.tenantProfile.findUnique({
      where: { userId },
    });
    if (!tenant) {
      return {
        currency: "KES",
        totalReceived: 0,
        totalManaged: 0,
        escrowHeldAmount: 0,
        escrowHeldCount: 0,
        pendingReleaseAmount: 0,
        pendingReleaseCount: 0,
        totalReleased: 0,
        totalRefunded: 0,
        completedTransactions: 0,
        activePropertiesWithEscrow: 0,
        activeBookings: 0,
        completedBookings: 0,
      };
    }

    const [requests, activeBookings, completedBookings] = await Promise.all([
      this.prisma.viewingRequest.findMany({
        where: { tenantId: tenant.id },
        include: { payment: true, proofVerification: true },
      }),
      this.prisma.viewingRequest.count({
        where: { tenantId: tenant.id, status: { notIn: NON_BOOKING_STATUSES } },
      }),
      this.prisma.viewingRequest.count({
        where: {
          tenantId: tenant.id,
          status: ViewingRequestStatus.ACCESS_UNLOCKED,
        },
      }),
    ]);

    const payments = requests
      .filter((r) => r.payment)
      .map((r) => ({
        amount: r.payment!.amount,
        currency: r.payment!.currency,
        status: r.payment!.status,
        listingId: r.listingId,
        isEscrow: Boolean(r.payment!.escrowDepositTxHash),
        proofStatus: r.proofVerification?.status ?? null,
      }));

    return {
      ...summarizePayments(payments),
      activeBookings,
      completedBookings,
    };
  }

  async findOne(id: string, userId: string, role: UserRole) {
    await this.access.assertAccess(id, userId, role);

    const request = await this.prisma.viewingRequest.findUnique({
      where: { id },
      include: {
        listing: true,
        payment: true,
        zkProof: true,
        proofVerification: true,
        viewingCode: true,
      },
    });

    if (!request) throw new NotFoundException("Viewing request not found.");
    return request;
  }

  async status(id: string, userId: string, role: UserRole) {
    const request = await this.findOne(id, userId, role);
    let queuePosition: number | null = null;
    if (request.status === ViewingRequestStatus.QUEUED) {
      queuePosition = await this.prisma.viewingRequest.count({
        where: {
          listingId: request.listingId,
          status: ViewingRequestStatus.QUEUED,
          createdAt: { lte: request.createdAt },
        },
      });
    }

    return {
      id: request.id,
      status: request.status,
      turnExpiresAt: request.turnExpiresAt,
      queuePosition,
      paymentStatus: request.payment?.status ?? "NOT_CREATED",
      proofStatus: request.zkProof?.status ?? "NOT_STARTED",
      verificationStatus: request.proofVerification?.status ?? "NOT_SUBMITTED",
      viewingCodeStatus: request.viewingCode?.status ?? "LOCKED",
    };
  }

  updateStatus(id: string, status: ViewingRequestStatus) {
    return this.prisma.viewingRequest.update({
      where: { id },
      data: { status },
    });
  }
}
