import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  NotificationType,
  PaymentStatus,
  ViewingRequestStatus,
} from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { StellarService } from "../stellar/stellar.service";
import { AuditLogsService } from "../audit-logs/audit-logs.service";
import { NotificationsService } from "../notifications/notifications.service";
import { CreatePaymentIntentDto } from "./dto/create-payment-intent.dto";
import { ConfirmPaymentDto } from "./dto/confirm-payment.dto";

@Injectable()
export class PaymentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stellar: StellarService,
    private readonly auditLogs: AuditLogsService,
    private readonly notifications: NotificationsService,
  ) {}

  async createIntent(actorId: string, dto: CreatePaymentIntentDto) {
    const request = await this.prisma.viewingRequest.findUnique({
      where: { id: dto.viewingRequestId },
      include: { listing: true, payment: true },
    });

    if (!request) throw new NotFoundException("Viewing request not found.");
    if (request.payment) return request.payment;

    const payment = await this.prisma.payment.create({
      data: {
        viewingRequestId: request.id,
        amount: request.listing.viewingFee,
        currency: request.listing.currency,
        destinationWallet: this.stellar.getDestinationWallet(),
        payerWallet: dto.payerWallet,
        stellarMemo: this.stellar.createMemoForRequest(request.id),
        status: PaymentStatus.AWAITING_PAYMENT,
      },
    });

    await this.auditLogs.create({
      actorId,
      action: "payment_intent.created",
      entityType: "payment",
      entityId: payment.id,
      severity: "INFO",
      metadata: {
        viewingRequestId: request.id,
        amount: payment.amount,
        stellarMemo: payment.stellarMemo,
      },
    });

    return payment;
  }

  async confirm(actorId: string, dto: ConfirmPaymentDto) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: dto.paymentId },
      include: { viewingRequest: true },
    });

    if (!payment) throw new NotFoundException("Payment not found.");

    const verification = await this.stellar.verifyPaymentReference({
      txHash: dto.txHash,
      expectedMemo: payment.stellarMemo,
    });

    if (!verification.ok) {
      throw new BadRequestException(verification.reason);
    }

    const updated = await this.prisma.payment.update({
      where: { id: payment.id },
      data: {
        txHash: dto.txHash,
        status: PaymentStatus.RECEIVED,
        paidAt: new Date(),
      },
    });

    await this.prisma.viewingRequest.update({
      where: { id: payment.viewingRequestId },
      data: { status: ViewingRequestStatus.PAYMENT_RECEIVED },
    });

    await this.auditLogs.create({
      actorId,
      action: "payment.received",
      entityType: "payment",
      entityId: payment.id,
      severity: "SUCCESS",
      metadata: {
        txHash: dto.txHash,
        viewingRequestId: payment.viewingRequestId,
      },
    });

    await this.notifications.create({
      userId: actorId,
      type: NotificationType.PAYMENT,
      title: "Payment Received",
      message: `Your payment of ${updated.amount} ${updated.stellarAsset} has been received and confirmed.`,
      viewingRequestId: payment.viewingRequestId,
    });

    return updated;
  }

  findOne(id: string) {
    return this.prisma.payment.findUnique({ where: { id } });
  }
}
