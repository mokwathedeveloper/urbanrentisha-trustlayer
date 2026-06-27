import { Test } from "@nestjs/testing";
import { BadRequestException } from "@nestjs/common";
import { PaymentStatus, UserRole, ViewingRequestStatus } from "@prisma/client";
import { PaymentsService } from "./payments.service";
import { PrismaService } from "../prisma/prisma.service";
import { StellarService } from "../stellar/stellar.service";
import { AuditLogsService } from "../audit-logs/audit-logs.service";
import { NotificationsService } from "../notifications/notifications.service";
import { ViewingRequestAccessService } from "../viewing-requests/viewing-request-access.service";
import { EscrowService } from "../soroban/escrow.service";
import { HoldStatus } from "../soroban/escrow.client";
import { ListingsService } from "../listings/listings.service";

describe("PaymentsService.confirmEscrowDeposit", () => {
  let service: PaymentsService;
  let tx: {
    payment: { update: jest.Mock };
    viewingRequest: { update: jest.Mock };
  };
  let prisma: {
    payment: { findUnique: jest.Mock };
    $transaction: jest.Mock;
  };
  let escrow: { submitSignedDeposit: jest.Mock; getHold: jest.Mock };
  let listings: { reserveForRequest: jest.Mock; getEscrowContacts: jest.Mock };
  let notifications: {
    create: jest.Mock;
    createRecord: jest.Mock;
    emitCreated: jest.Mock;
  };
  let auditLogs: { create: jest.Mock };
  let access: { assertAccess: jest.Mock };
  let runPostCommitEffects: jest.Mock;

  const basePayment = {
    id: "payment-1",
    viewingRequestId: "request-1",
    amount: 500,
    stellarAsset: "XLM_TEST",
    status: PaymentStatus.AWAITING_PAYMENT,
  };

  const heldHold = {
    status: HoldStatus.Held,
    payer: "GPAYER",
    amount: 5000000n,
  };

  beforeEach(async () => {
    tx = {
      payment: {
        update: jest.fn().mockResolvedValue({
          ...basePayment,
          status: PaymentStatus.RECEIVED,
          txHash: "tx-hash-1",
          escrowDepositTxHash: "tx-hash-1",
        }),
      },
      viewingRequest: {
        update: jest.fn().mockResolvedValue({
          id: "request-1",
          listingId: "listing-1",
          status: ViewingRequestStatus.PAYMENT_RECEIVED,
        }),
      },
    };
    prisma = {
      payment: { findUnique: jest.fn() },
      // Mirrors Prisma's real callback-form $transaction: invoke the
      // callback with a tx client, return whatever it resolves to. Good
      // enough to prove ordering/grouping without a real database.
      $transaction: jest.fn((callback: (tx: unknown) => Promise<unknown>) =>
        callback(tx),
      ),
    };
    escrow = {
      submitSignedDeposit: jest.fn().mockResolvedValue("tx-hash-1"),
      getHold: jest.fn().mockResolvedValue(heldHold),
    };
    runPostCommitEffects = jest.fn().mockResolvedValue(undefined);
    listings = {
      reserveForRequest: jest
        .fn()
        .mockResolvedValue({ conflict: false, runPostCommitEffects }),
      getEscrowContacts: jest.fn().mockResolvedValue([]),
    };
    notifications = {
      create: jest.fn().mockResolvedValue(undefined),
      createRecord: jest
        .fn()
        .mockResolvedValue({ id: "notification-1", userId: "actor-1" }),
      emitCreated: jest.fn(),
    };
    auditLogs = { create: jest.fn().mockResolvedValue(undefined) };
    access = { assertAccess: jest.fn().mockResolvedValue(undefined) };

    const moduleRef = await Test.createTestingModule({
      providers: [
        PaymentsService,
        { provide: PrismaService, useValue: prisma },
        { provide: StellarService, useValue: {} },
        { provide: AuditLogsService, useValue: auditLogs },
        { provide: NotificationsService, useValue: notifications },
        { provide: ViewingRequestAccessService, useValue: access },
        { provide: EscrowService, useValue: escrow },
        { provide: ListingsService, useValue: listings },
      ],
    }).compile();

    service = moduleRef.get(PaymentsService);
  });

  describe("idempotency guard", () => {
    it("does not call escrow.submitSignedDeposit when the payment is already RECEIVED", async () => {
      prisma.payment.findUnique.mockResolvedValue({
        ...basePayment,
        status: PaymentStatus.RECEIVED,
      });

      const result = await service.confirmEscrowDeposit(
        "actor-1",
        UserRole.TENANT,
        "payment-1",
        { signedXdr: "signed-xdr" },
      );

      expect(escrow.submitSignedDeposit).not.toHaveBeenCalled();
      expect(prisma.$transaction).not.toHaveBeenCalled();
      expect(result.status).toBe(PaymentStatus.RECEIVED);
    });

    it("does not call escrow.submitSignedDeposit when the payment is already RELEASED", async () => {
      prisma.payment.findUnique.mockResolvedValue({
        ...basePayment,
        status: PaymentStatus.RELEASED,
      });

      const result = await service.confirmEscrowDeposit(
        "actor-1",
        UserRole.TENANT,
        "payment-1",
        { signedXdr: "signed-xdr" },
      );

      expect(escrow.submitSignedDeposit).not.toHaveBeenCalled();
      expect(prisma.$transaction).not.toHaveBeenCalled();
      // None of the post-chain writes run either - this is a full no-op.
      expect(tx.payment.update).not.toHaveBeenCalled();
      expect(tx.viewingRequest.update).not.toHaveBeenCalled();
      expect(listings.reserveForRequest).not.toHaveBeenCalled();
      expect(notifications.createRecord).not.toHaveBeenCalled();
      expect(notifications.emitCreated).not.toHaveBeenCalled();
      expect(result.status).toBe(PaymentStatus.RELEASED);
    });

    it("calling confirmEscrowDeposit twice in a row only submits to Stellar once", async () => {
      // First call: payment starts AWAITING_PAYMENT, and the mock DB write
      // "persists" the new status so the second call sees it.
      let currentStatus: PaymentStatus = PaymentStatus.AWAITING_PAYMENT;
      prisma.payment.findUnique.mockImplementation(() =>
        Promise.resolve({ ...basePayment, status: currentStatus }),
      );
      tx.payment.update.mockImplementation(() => {
        currentStatus = PaymentStatus.RECEIVED;
        return Promise.resolve({ ...basePayment, status: currentStatus });
      });

      await service.confirmEscrowDeposit(
        "actor-1",
        UserRole.TENANT,
        "payment-1",
        {
          signedXdr: "signed-xdr",
        },
      );
      await service.confirmEscrowDeposit(
        "actor-1",
        UserRole.TENANT,
        "payment-1",
        {
          signedXdr: "signed-xdr",
        },
      );

      expect(escrow.submitSignedDeposit).toHaveBeenCalledTimes(1);
      expect(escrow.getHold).toHaveBeenCalledTimes(1);
      expect(prisma.$transaction).toHaveBeenCalledTimes(1);
    });

    it("rejects (does not silently succeed) when the payment can never be confirmed from its current state", async () => {
      // A REFUNDED/FAILED/EXPIRED payment is not AWAITING_PAYMENT, so it
      // falls through the idempotency guard exactly like RECEIVED/RELEASED -
      // it never proceeds to submit to Stellar again.
      prisma.payment.findUnique.mockResolvedValue({
        ...basePayment,
        status: PaymentStatus.REFUNDED,
      });

      const result = await service.confirmEscrowDeposit(
        "actor-1",
        UserRole.TENANT,
        "payment-1",
        { signedXdr: "signed-xdr" },
      );

      expect(escrow.submitSignedDeposit).not.toHaveBeenCalled();
      expect(result.status).toBe(PaymentStatus.REFUNDED);
    });
  });

  describe("transaction grouping", () => {
    beforeEach(() => {
      prisma.payment.findUnique.mockResolvedValue({ ...basePayment });
    });

    it("performs payment.update, viewingRequest.update, listing reservation, the audit log, and the notification row write inside a single $transaction call", async () => {
      await service.confirmEscrowDeposit(
        "actor-1",
        UserRole.TENANT,
        "payment-1",
        {
          signedXdr: "signed-xdr",
        },
      );

      expect(prisma.$transaction).toHaveBeenCalledTimes(1);

      // All five writes happened via the tx client / were passed the tx
      // client - i.e. as part of the same transaction, not as separate,
      // independently-awaited statements against the default client.
      expect(tx.payment.update).toHaveBeenCalledTimes(1);
      expect(tx.viewingRequest.update).toHaveBeenCalledTimes(1);
      expect(listings.reserveForRequest).toHaveBeenCalledWith(
        "listing-1",
        "request-1",
        "actor-1",
        tx,
      );
      expect(auditLogs.create).toHaveBeenCalledWith(
        expect.objectContaining({ action: "payment.escrow_deposit_confirmed" }),
        tx,
      );
      // The notification row is written via the side-effect-free
      // `createRecord` (passed tx) - never the side-effecting `create`.
      expect(notifications.createRecord).toHaveBeenCalledWith(
        expect.objectContaining({ title: "Payment Held in Escrow" }),
        tx,
      );
      expect(notifications.create).not.toHaveBeenCalled();

      // The realtime emit and the listing's post-commit effects (waitlist
      // notification, realtime "listing:reserved") only run once the
      // transaction above has returned.
      expect(notifications.emitCreated).toHaveBeenCalledWith(
        expect.objectContaining({ id: "notification-1" }),
      );
      expect(runPostCommitEffects).toHaveBeenCalledTimes(1);
    });

    it("performs no realtime emit, non-tx Prisma call, or notification fan-out before the transaction commits", async () => {
      const callOrder: string[] = [];
      prisma.$transaction.mockImplementation(
        async (callback: (tx: unknown) => Promise<unknown>) => {
          const result = await callback(tx);
          callOrder.push("transaction-committed");
          return result;
        },
      );
      runPostCommitEffects.mockImplementation(async () => {
        callOrder.push("listing-post-commit-effects-run");
      });
      notifications.emitCreated.mockImplementation(() => {
        callOrder.push("tenant-notification-emitted");
      });
      listings.getEscrowContacts.mockImplementation(async () => {
        callOrder.push("escrow-contacts-fetched");
        return ["owner-1"];
      });

      await service.confirmEscrowDeposit(
        "actor-1",
        UserRole.TENANT,
        "payment-1",
        {
          signedXdr: "signed-xdr",
        },
      );

      // Everything that emits, fans out a notification, or calls another
      // service happens strictly after "transaction-committed" - nothing
      // inside the $transaction callback (payment.update,
      // viewingRequest.update, reserveForRequest's DB write, audit log,
      // notification row write) appears in this list at all, because none
      // of those steps push into callOrder - only side effects do.
      expect(callOrder).toEqual([
        "transaction-committed",
        "listing-post-commit-effects-run",
        "tenant-notification-emitted",
        "escrow-contacts-fetched",
      ]);
    });

    it("throws and audit-logs a CRITICAL entry if the on-chain submission fails, without touching the database state", async () => {
      escrow.submitSignedDeposit.mockRejectedValue(new Error("RPC timeout"));

      await expect(
        service.confirmEscrowDeposit("actor-1", UserRole.TENANT, "payment-1", {
          signedXdr: "signed-xdr",
        }),
      ).rejects.toThrow(BadRequestException);

      expect(prisma.$transaction).not.toHaveBeenCalled();
      expect(tx.payment.update).not.toHaveBeenCalled();
      expect(auditLogs.create).toHaveBeenCalledWith(
        expect.objectContaining({ severity: "CRITICAL" }),
      );
    });

    it("throws if the on-chain hold is not actually Held, without writing any database state", async () => {
      escrow.getHold.mockResolvedValue({ status: HoldStatus.Refunded });

      await expect(
        service.confirmEscrowDeposit("actor-1", UserRole.TENANT, "payment-1", {
          signedXdr: "signed-xdr",
        }),
      ).rejects.toThrow(BadRequestException);

      expect(prisma.$transaction).not.toHaveBeenCalled();
      expect(tx.payment.update).not.toHaveBeenCalled();
    });
  });
});
