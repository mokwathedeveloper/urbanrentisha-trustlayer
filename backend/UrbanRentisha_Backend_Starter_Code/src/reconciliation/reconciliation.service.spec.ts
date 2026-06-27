import { Test } from "@nestjs/testing";
import { PaymentStatus, ViewingRequestStatus } from "@prisma/client";
import {
  DEPOSIT_RECONCILIATION_THRESHOLD_MS,
  RELEASE_RECONCILIATION_THRESHOLD_MS,
  ReconciliationService,
} from "./reconciliation.service";
import { PrismaService } from "../prisma/prisma.service";
import { AuditLogsService } from "../audit-logs/audit-logs.service";
import { NotificationsService } from "../notifications/notifications.service";
import { ListingsService } from "../listings/listings.service";
import { EscrowService } from "../soroban/escrow.service";
import { HoldStatus } from "../soroban/escrow.client";

describe("ReconciliationService", () => {
  let service: ReconciliationService;
  let prisma: {
    payment: { findMany: jest.Mock; update: jest.Mock };
    $transaction: jest.Mock;
  };
  let tx: {
    payment: { update: jest.Mock };
    viewingRequest: { update: jest.Mock };
  };
  let escrow: { getHold: jest.Mock };
  let auditLogs: { create: jest.Mock };
  let notifications: {
    create: jest.Mock;
    createRecord: jest.Mock;
    emitCreated: jest.Mock;
    notifyAdmins: jest.Mock;
  };
  let listings: { reserveForRequest: jest.Mock; getEscrowContacts: jest.Mock };
  let runPostCommitEffects: jest.Mock;

  beforeEach(async () => {
    tx = {
      payment: { update: jest.fn().mockResolvedValue({}) },
      viewingRequest: { update: jest.fn().mockResolvedValue({}) },
    };
    prisma = {
      payment: { findMany: jest.fn().mockResolvedValue([]), update: jest.fn() },
      $transaction: jest.fn((callback: (tx: unknown) => Promise<unknown>) =>
        callback(tx),
      ),
    };
    escrow = { getHold: jest.fn() };
    auditLogs = { create: jest.fn().mockResolvedValue(undefined) };
    runPostCommitEffects = jest.fn().mockResolvedValue(undefined);
    notifications = {
      create: jest.fn().mockResolvedValue(undefined),
      createRecord: jest
        .fn()
        .mockResolvedValue({ id: "notification-1", userId: "tenant-user-1" }),
      emitCreated: jest.fn(),
      notifyAdmins: jest.fn().mockResolvedValue(undefined),
    };
    listings = {
      reserveForRequest: jest
        .fn()
        .mockResolvedValue({ conflict: false, runPostCommitEffects }),
      getEscrowContacts: jest.fn().mockResolvedValue(["owner-1"]),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        ReconciliationService,
        { provide: PrismaService, useValue: prisma },
        { provide: AuditLogsService, useValue: auditLogs },
        { provide: NotificationsService, useValue: notifications },
        { provide: ListingsService, useValue: listings },
        { provide: EscrowService, useValue: escrow },
      ],
    }).compile();

    service = moduleRef.get(ReconciliationService);
  });

  function stalePayment(
    overrides: Partial<{
      id: string;
      status: PaymentStatus;
      createdAt: Date;
    }> = {},
  ) {
    return {
      id: "payment-1",
      status: PaymentStatus.AWAITING_PAYMENT,
      createdAt: new Date(),
      viewingRequestId: "request-1",
      amount: 500,
      stellarAsset: "XLM_TEST",
      viewingRequest: {
        id: "request-1",
        status: ViewingRequestStatus.AWAITING_PAYMENT,
        listingId: "listing-1",
        tenant: { userId: "tenant-user-1" },
        listing: { id: "listing-1", title: "Kilimani Green View Apartment" },
      },
      ...overrides,
    };
  }

  describe("reconcileDeposits", () => {
    it("queries with a createdAt threshold so fresh, still-in-flight payments are never touched", async () => {
      await service.reconcileDeposits();

      const [args] = prisma.payment.findMany.mock.calls[0];
      const cutoff: Date = args.where.createdAt.lt;
      const expectedCutoff = Date.now() - DEPOSIT_RECONCILIATION_THRESHOLD_MS;
      expect(Math.abs(cutoff.getTime() - expectedCutoff)).toBeLessThan(5_000);
      expect(args.where.status).toBe(PaymentStatus.AWAITING_PAYMENT);
    });

    it("repairs a stale AWAITING_PAYMENT row to RECEIVED when the on-chain hold is confirmed Held", async () => {
      prisma.payment.findMany.mockResolvedValue([stalePayment()]);
      escrow.getHold.mockResolvedValue({
        status: HoldStatus.Held,
        payer: "GPAYER",
        amount: 5_000_000n,
      });

      const result = await service.reconcileDeposits();

      expect(result).toEqual({ repaired: 1, ambiguous: 0 });
      expect(tx.payment.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            status: PaymentStatus.RECEIVED,
            payerWallet: "GPAYER",
          }),
        }),
      );
      expect(tx.viewingRequest.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { status: ViewingRequestStatus.PAYMENT_RECEIVED },
        }),
      );
      expect(listings.reserveForRequest).toHaveBeenCalledWith(
        "listing-1",
        "request-1",
        "tenant-user-1",
        tx,
      );
      expect(auditLogs.create).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "payment.reconciliation_deposit_repaired",
        }),
        tx,
      );
      // Side effects only after the transaction has returned.
      expect(runPostCommitEffects).toHaveBeenCalledTimes(1);
      expect(notifications.emitCreated).toHaveBeenCalledTimes(1);
      expect(notifications.notifyAdmins).toHaveBeenCalledTimes(1);
    });

    it("does not mark a payment RECEIVED when no on-chain hold exists at all (tenant simply never paid)", async () => {
      prisma.payment.findMany.mockResolvedValue([stalePayment()]);
      escrow.getHold.mockResolvedValue(null);

      const result = await service.reconcileDeposits();

      expect(result).toEqual({ repaired: 0, ambiguous: 0 });
      expect(tx.payment.update).not.toHaveBeenCalled();
      expect(auditLogs.create).not.toHaveBeenCalled();
      expect(notifications.notifyAdmins).not.toHaveBeenCalled();
    });

    it("flags - but does not auto-repair - an ambiguous case where on-chain state is Released/Refunded but the DB never recorded a deposit", async () => {
      prisma.payment.findMany.mockResolvedValue([stalePayment()]);
      escrow.getHold.mockResolvedValue({
        status: HoldStatus.Released,
        payer: "GPAYER",
        amount: 5_000_000n,
      });

      const result = await service.reconcileDeposits();

      expect(result).toEqual({ repaired: 0, ambiguous: 1 });
      expect(tx.payment.update).not.toHaveBeenCalled();
      expect(prisma.$transaction).not.toHaveBeenCalled();
      expect(auditLogs.create).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "payment.reconciliation_ambiguous_deposit",
          severity: "CRITICAL",
        }),
      );
      expect(notifications.notifyAdmins).toHaveBeenCalledTimes(1);
    });
  });

  describe("reconcileReleases", () => {
    function staleReleaseClaim(
      overrides: Partial<{ status: PaymentStatus }> = {},
    ) {
      return {
        id: "payment-2",
        status: PaymentStatus.RECEIVED,
        escrowReleaseTxHash: null,
        escrowReleaseClaimedAt: new Date(),
        amount: 500,
        stellarAsset: "XLM_TEST",
        viewingRequestId: "request-2",
        viewingRequest: {
          id: "request-2",
          listingId: "listing-2",
          tenant: { userId: "tenant-user-2" },
          listing: { id: "listing-2", title: "Westlands Skyline Loft" },
        },
        ...overrides,
      };
    }

    it("queries with an escrowReleaseClaimedAt threshold so a release that is merely still in flight is never touched", async () => {
      await service.reconcileReleases();

      const [args] = prisma.payment.findMany.mock.calls[0];
      const cutoff: Date = args.where.escrowReleaseClaimedAt.lt;
      const expectedCutoff = Date.now() - RELEASE_RECONCILIATION_THRESHOLD_MS;
      expect(Math.abs(cutoff.getTime() - expectedCutoff)).toBeLessThan(5_000);
      expect(args.where.escrowReleaseClaimedAt.not).toBeNull();
      expect(args.where.escrowReleaseTxHash).toBeNull();
      expect(args.where.status).toBe(PaymentStatus.RECEIVED);
    });

    it("clears a stale escrowReleaseClaimedAt lock when on-chain funds are still Held (the release never actually ran)", async () => {
      prisma.payment.findMany.mockResolvedValue([staleReleaseClaim()]);
      escrow.getHold.mockResolvedValue({
        status: HoldStatus.Held,
        payer: "GPAYER",
        amount: 5_000_000n,
      });

      const result = await service.reconcileReleases();

      expect(result).toEqual({ repaired: 0, lockCleared: 1, ambiguous: 0 });
      expect(prisma.payment.update).toHaveBeenCalledWith({
        where: { id: "payment-2" },
        data: { escrowReleaseClaimedAt: null },
      });
      expect(auditLogs.create).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "payment.reconciliation_release_lock_cleared",
        }),
      );
      // Never claims money was released when the chain says it wasn't.
      expect(prisma.payment.update).not.toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ status: PaymentStatus.RELEASED }),
        }),
      );
    });

    it("repairs status to RELEASED when on-chain state confirms the release actually succeeded", async () => {
      prisma.payment.findMany.mockResolvedValue([staleReleaseClaim()]);
      escrow.getHold.mockResolvedValue({
        status: HoldStatus.Released,
        payer: "GPAYER",
        amount: 5_000_000n,
      });

      const result = await service.reconcileReleases();

      expect(result).toEqual({ repaired: 1, lockCleared: 0, ambiguous: 0 });
      expect(prisma.payment.update).toHaveBeenCalledWith({
        where: { id: "payment-2" },
        data: expect.objectContaining({ status: PaymentStatus.RELEASED }),
      });
      expect(auditLogs.create).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "payment.reconciliation_release_repaired",
        }),
      );
      expect(notifications.notifyAdmins).toHaveBeenCalledTimes(1);
    });

    it("flags - but does not change status - an ambiguous case where no on-chain hold record exists", async () => {
      prisma.payment.findMany.mockResolvedValue([staleReleaseClaim()]);
      escrow.getHold.mockResolvedValue(null);

      const result = await service.reconcileReleases();

      expect(result).toEqual({ repaired: 0, lockCleared: 0, ambiguous: 1 });
      expect(prisma.payment.update).not.toHaveBeenCalled();
      expect(auditLogs.create).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "payment.reconciliation_ambiguous_release",
          severity: "CRITICAL",
        }),
      );
      expect(notifications.notifyAdmins).toHaveBeenCalledTimes(1);
    });

    it("flags - but does not change status - an ambiguous case where on-chain state shows Refunded instead of the claimed release", async () => {
      prisma.payment.findMany.mockResolvedValue([staleReleaseClaim()]);
      escrow.getHold.mockResolvedValue({
        status: HoldStatus.Refunded,
        payer: "GPAYER",
        amount: 5_000_000n,
      });

      const result = await service.reconcileReleases();

      expect(result).toEqual({ repaired: 0, lockCleared: 0, ambiguous: 1 });
      expect(prisma.payment.update).not.toHaveBeenCalled();
      expect(auditLogs.create).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "payment.reconciliation_ambiguous_release",
          severity: "CRITICAL",
        }),
      );
    });
  });
});
