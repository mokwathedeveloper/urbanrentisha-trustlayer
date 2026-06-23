import { Injectable } from "@nestjs/common";
import { Prisma, ViewingRequestStatus } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { summarizePayments, type EscrowSummary } from "./escrow-summary.util";

const NON_BOOKING_STATUSES: ViewingRequestStatus[] = [
  ViewingRequestStatus.EXPIRED,
  ViewingRequestStatus.REVOKED,
  ViewingRequestStatus.CANCELLED,
  ViewingRequestStatus.ACCESS_UNLOCKED,
];

/**
 * Full payment/escrow history for a set of listings - shared by the
 * landlord and agent/manager escrow dashboards so "active holds" and
 * "transaction history" mean the same thing everywhere, not two separate
 * ad hoc queries that could drift apart.
 */
@Injectable()
export class EscrowReportingService {
  constructor(private readonly prisma: PrismaService) {}

  async findForListings(where: Prisma.ListingWhereInput) {
    const listings = await this.prisma.listing.findMany({
      where,
      select: { id: true },
    });
    const listingIds = listings.map((l) => l.id);
    if (listingIds.length === 0) return [];

    const payments = await this.prisma.payment.findMany({
      where: { viewingRequest: { listingId: { in: listingIds } } },
      orderBy: { createdAt: "desc" },
      include: {
        viewingRequest: {
          include: {
            listing: { select: { id: true, title: true, imageUrl: true } },
            tenant: { include: { user: { select: { id: true, name: true } } } },
            proofVerification: true,
          },
        },
      },
    });
    if (payments.length === 0) return [];

    const auditLogs = await this.prisma.auditLog.findMany({
      where: {
        entityType: "payment",
        entityId: { in: payments.map((p) => p.id) },
      },
      orderBy: { createdAt: "asc" },
    });
    const timelineByPaymentId = new Map<string, typeof auditLogs>();
    for (const log of auditLogs) {
      if (!log.entityId) continue;
      const list = timelineByPaymentId.get(log.entityId) ?? [];
      list.push(log);
      timelineByPaymentId.set(log.entityId, list);
    }

    return payments.map((payment) => ({
      paymentId: payment.id,
      viewingRequestId: payment.viewingRequestId,
      listingId: payment.viewingRequest.listing.id,
      listingTitle: payment.viewingRequest.listing.title,
      listingImageUrl: payment.viewingRequest.listing.imageUrl,
      tenantId: payment.viewingRequest.tenant.user.id,
      tenantName: payment.viewingRequest.tenant.user.name,
      amount: payment.amount,
      currency: payment.currency,
      stellarAsset: payment.stellarAsset,
      status: payment.status,
      isEscrow: Boolean(payment.escrowDepositTxHash),
      escrowDepositTxHash: payment.escrowDepositTxHash,
      escrowReleaseTxHash: payment.escrowReleaseTxHash,
      proofStatus: payment.viewingRequest.proofVerification?.status ?? null,
      paidAt: payment.paidAt,
      escrowReleasedAt: payment.escrowReleasedAt,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
      timeline: (timelineByPaymentId.get(payment.id) ?? []).map((log) => ({
        action: log.action,
        severity: log.severity,
        metadata: log.metadata,
        createdAt: log.createdAt,
      })),
    }));
  }

  /**
   * The dashboard card numbers for a set of listings - reuses the same
   * payment rows findForListings already fetches, plus one extra count
   * query for booking status (which lives on ViewingRequest, not
   * Payment).
   */
  async summarizeForListings(
    where: Prisma.ListingWhereInput,
  ): Promise<EscrowSummary> {
    const items = await this.findForListings(where);
    const listings = await this.prisma.listing.findMany({
      where,
      select: { id: true },
    });
    const listingIds = listings.map((l) => l.id);

    const [activeBookings, completedBookings] = await Promise.all([
      listingIds.length === 0
        ? 0
        : this.prisma.viewingRequest.count({
            where: {
              listingId: { in: listingIds },
              status: { notIn: NON_BOOKING_STATUSES },
            },
          }),
      listingIds.length === 0
        ? 0
        : this.prisma.viewingRequest.count({
            where: {
              listingId: { in: listingIds },
              status: ViewingRequestStatus.ACCESS_UNLOCKED,
            },
          }),
    ]);

    return {
      ...summarizePayments(items),
      activeBookings,
      completedBookings,
    };
  }
}
