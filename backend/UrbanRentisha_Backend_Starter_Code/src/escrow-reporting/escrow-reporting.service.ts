import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

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
}
