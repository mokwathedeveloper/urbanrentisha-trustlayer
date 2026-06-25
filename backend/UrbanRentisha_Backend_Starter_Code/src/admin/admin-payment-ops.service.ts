import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { NotificationType, PaymentStatus } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { AuditLogsService } from "../audit-logs/audit-logs.service";
import { EscrowService } from "../soroban/escrow.service";
import { HoldStatus } from "../soroban/escrow.client";
import { NotificationsService } from "../notifications/notifications.service";
import { ListingsService } from "../listings/listings.service";

@Injectable()
export class AdminPaymentOpsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogs: AuditLogsService,
    private readonly escrow: EscrowService,
    private readonly notifications: NotificationsService,
    private readonly listings: ListingsService,
  ) {}

  /**
   * Refunds a held escrow payment back to the tenant. Manual admin action
   * for disputes/cancellations - this codebase has no automated
   * cancellation flow to hook a refund into yet.
   */
  async refundPayment(paymentId: string, adminId: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        viewingRequest: {
          include: {
            tenant: true,
            listing: { select: { id: true, title: true } },
          },
        },
      },
    });
    if (!payment) throw new NotFoundException("Payment not found.");
    if (
      payment.status !== PaymentStatus.RECEIVED ||
      !payment.escrowDepositTxHash
    ) {
      throw new BadRequestException(
        "Only a payment held in escrow can be refunded.",
      );
    }

    let refundTxHash: string;
    try {
      const hold = await this.escrow.getHold(payment.id);
      if (!hold || hold.status !== HoldStatus.Held) {
        throw new BadRequestException(
          "No held funds were found on-chain for this payment.",
        );
      }
      refundTxHash = await this.escrow.refund(payment.id);
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      await this.auditLogs.create({
        actorId: adminId,
        action: "payment.escrow_refund_failed",
        entityType: "payment",
        entityId: payment.id,
        severity: "CRITICAL",
        metadata: { reason: (error as Error).message },
      });
      throw new BadRequestException(
        "Could not refund the escrow payment on-chain. Please try again.",
      );
    }

    const updated = await this.prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: PaymentStatus.REFUNDED,
        escrowReleaseTxHash: refundTxHash,
      },
    });

    await this.auditLogs.create({
      actorId: adminId,
      action: "payment.escrow_refunded",
      entityType: "payment",
      entityId: payment.id,
      severity: "SUCCESS",
      metadata: {
        refundTxHash,
        viewingRequestId: payment.viewingRequestId,
      },
    });

    await this.notifications.create({
      userId: payment.viewingRequest.tenant.userId,
      type: NotificationType.PAYMENT,
      title: "Payment Refunded",
      message: `Your payment of ${updated.amount} ${updated.stellarAsset} has been refunded.`,
      viewingRequestId: payment.viewingRequestId,
    });

    // The landlord/agent/manager were expecting these funds - a refund
    // means the booking fell through, which is exactly the kind of thing
    // they shouldn't have to discover after the fact.
    const contacts = await this.listings.getEscrowContacts(
      payment.viewingRequest.listing.id,
    );
    await Promise.all(
      contacts
        .filter((userId) => userId !== payment.viewingRequest.tenant.userId)
        .map((userId) =>
          this.notifications.create({
            userId,
            type: NotificationType.PAYMENT,
            title: "Escrow Refunded",
            message: `Escrow funds of ${updated.amount} ${updated.stellarAsset} for "${payment.viewingRequest.listing.title}" were refunded to the tenant. This booking did not go through.`,
            viewingRequestId: payment.viewingRequestId,
          }),
        ),
    );

    return updated;
  }
}
