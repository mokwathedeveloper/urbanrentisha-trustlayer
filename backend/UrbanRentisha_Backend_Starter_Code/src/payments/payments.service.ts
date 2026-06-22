import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  NotificationType,
  PaymentStatus,
  UserRole,
  ViewingRequestStatus,
} from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { StellarService } from "../stellar/stellar.service";
import { AuditLogsService } from "../audit-logs/audit-logs.service";
import { NotificationsService } from "../notifications/notifications.service";
import { CreatePaymentIntentDto } from "./dto/create-payment-intent.dto";
import { ConfirmPaymentDto } from "./dto/confirm-payment.dto";
import { PrepareEscrowDepositDto } from "./dto/prepare-escrow-deposit.dto";
import { ConfirmEscrowDepositDto } from "./dto/confirm-escrow-deposit.dto";
import { ViewingRequestAccessService } from "../viewing-requests/viewing-request-access.service";
import { EscrowService } from "../soroban/escrow.service";
import { HoldStatus } from "../soroban/escrow.client";

@Injectable()
export class PaymentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stellar: StellarService,
    private readonly auditLogs: AuditLogsService,
    private readonly notifications: NotificationsService,
    private readonly access: ViewingRequestAccessService,
    private readonly escrow: EscrowService,
  ) {}

  async createIntent(
    actorId: string,
    role: UserRole,
    dto: CreatePaymentIntentDto,
  ) {
    await this.access.assertAccess(dto.viewingRequestId, actorId, role);

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

  /**
   * Manual fallback for confirming a payment by a known transaction hash.
   * Not used by the tenant-facing flow anymore (see pollStatus) - kept for
   * admin/support reconciliation if automatic memo detection ever misses a
   * real payment.
   */
  async confirm(actorId: string, role: UserRole, dto: ConfirmPaymentDto) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: dto.paymentId },
      include: { viewingRequest: true },
    });

    if (!payment) throw new NotFoundException("Payment not found.");
    await this.access.assertAccess(payment.viewingRequestId, actorId, role);

    const verification = await this.stellar.verifyPaymentReference({
      txHash: dto.txHash,
      expectedMemo: payment.stellarMemo,
    });

    if (!verification.ok) {
      throw new BadRequestException(verification.reason);
    }

    return this.markReceived(actorId, payment, dto.txHash);
  }

  /**
   * Polled by the tenant-facing payment page while waiting - checks Stellar
   * testnet for an incoming payment matching this Payment's memo and
   * auto-confirms it if found. The tenant never sees or provides a
   * transaction hash; the backend finds it for them.
   */
  async pollStatus(actorId: string, role: UserRole, paymentId: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
    });
    if (!payment) throw new NotFoundException("Payment not found.");
    await this.access.assertAccess(payment.viewingRequestId, actorId, role);

    if (payment.status !== PaymentStatus.AWAITING_PAYMENT) {
      return payment;
    }

    const txHash = await this.stellar.findIncomingPaymentByMemo(
      payment.stellarMemo,
    );
    if (!txHash) return payment;

    return this.markReceived(actorId, payment, txHash);
  }

  /**
   * Demo-only one-click payment: the tenant clicks "Pay Viewing Fee" and
   * the backend itself sends a real testnet payment from a platform-funded
   * treasury (see StellarService.payFromTreasury) - no address, memo, or
   * wallet knowledge required from the tenant at all. Not a production
   * payment method.
   */
  async payNow(actorId: string, role: UserRole, paymentId: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
    });
    if (!payment) throw new NotFoundException("Payment not found.");
    await this.access.assertAccess(payment.viewingRequestId, actorId, role);

    if (payment.status === PaymentStatus.RECEIVED) return payment;
    if (payment.status !== PaymentStatus.AWAITING_PAYMENT) {
      throw new BadRequestException("This payment can no longer be paid.");
    }

    const txHash = await this.stellar.payFromTreasury(
      payment.amount,
      payment.stellarMemo,
    );

    return this.markReceived(actorId, payment, txHash);
  }

  private async markReceived(
    actorId: string,
    payment: {
      id: string;
      viewingRequestId: string;
      amount: number;
      stellarAsset: string;
    },
    txHash: string,
  ) {
    const updated = await this.prisma.payment.update({
      where: { id: payment.id },
      data: {
        txHash,
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
        txHash,
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

  async findOne(id: string, userId: string, role: UserRole) {
    const payment = await this.prisma.payment.findUnique({ where: { id } });
    if (!payment) throw new NotFoundException("Payment not found.");
    await this.access.assertAccess(payment.viewingRequestId, userId, role);
    return payment;
  }

  /**
   * Builds the unsigned escrow `deposit` transaction for the tenant to sign
   * with Freighter. The backend never holds the tenant's key - only the
   * payer's own wallet can authorize this on-chain transfer.
   */
  async prepareEscrowDeposit(
    actorId: string,
    role: UserRole,
    paymentId: string,
    dto: PrepareEscrowDepositDto,
  ): Promise<{ xdr: string }> {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
    });
    if (!payment) throw new NotFoundException("Payment not found.");
    await this.access.assertAccess(payment.viewingRequestId, actorId, role);

    const xdr = await this.escrow.prepareDeposit(
      dto.payerPublicKey,
      payment.id,
      payment.amount,
    );
    return { xdr };
  }

  /**
   * Submits the tenant-signed deposit transaction, then confirms a real
   * `Held` record now exists on-chain (rather than trusting the submitted
   * tx hash alone) before marking the Payment as received.
   */
  async confirmEscrowDeposit(
    actorId: string,
    role: UserRole,
    paymentId: string,
    dto: ConfirmEscrowDepositDto,
  ) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
    });
    if (!payment) throw new NotFoundException("Payment not found.");
    await this.access.assertAccess(payment.viewingRequestId, actorId, role);

    const txHash = await this.escrow.submitSignedDeposit(dto.signedXdr);

    const hold = await this.escrow.getHold(payment.id);
    if (!hold || hold.status !== HoldStatus.Held) {
      throw new BadRequestException(
        "Escrow deposit transaction succeeded but no held funds were found on-chain.",
      );
    }

    const updated = await this.prisma.payment.update({
      where: { id: payment.id },
      data: {
        txHash,
        escrowDepositTxHash: txHash,
        payerWallet: hold.payer,
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
      action: "payment.escrow_deposit_confirmed",
      entityType: "payment",
      entityId: payment.id,
      severity: "SUCCESS",
      metadata: {
        txHash,
        viewingRequestId: payment.viewingRequestId,
        amountStroops: hold.amount.toString(),
      },
    });

    await this.notifications.create({
      userId: actorId,
      type: NotificationType.PAYMENT,
      title: "Payment Held in Escrow",
      message: `Your payment of ${updated.amount} ${updated.stellarAsset} is now held in escrow and will be released once your viewing proof is verified.`,
      viewingRequestId: payment.viewingRequestId,
    });

    return updated;
  }
}
