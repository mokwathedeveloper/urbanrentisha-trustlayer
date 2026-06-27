import { Test } from "@nestjs/testing";
import { PaymentStatus } from "@prisma/client";
import { ProofVerificationService } from "./proof-verification.service";
import { PrismaService } from "../prisma/prisma.service";
import { AuditLogsService } from "../audit-logs/audit-logs.service";
import { SorobanService } from "../soroban/soroban.service";
import { EscrowService } from "../soroban/escrow.service";
import { NotificationsService } from "../notifications/notifications.service";
import { ViewingRequestAccessService } from "../viewing-requests/viewing-request-access.service";
import { ListingsService } from "../listings/listings.service";

/**
 * A minimal in-memory stand-in for the one Payment row under test. The
 * mocked updateMany only mutates state if its WHERE clause (id + status +
 * an unclaimed release lock) still matches the row's current state - the
 * same row-level atomicity contract a real database enforces, which is
 * what actually exercises the claim-before-release logic rather than just
 * asserting the function ran.
 */
function createFakePaymentStore(initial: {
  id: string;
  status: PaymentStatus;
  escrowDepositTxHash: string | null;
}) {
  let state: typeof initial & { escrowReleaseClaimedAt: Date | null } = {
    ...initial,
    escrowReleaseClaimedAt: null,
  };

  return {
    get state() {
      return state;
    },
    updateMany: jest.fn(
      async (args: {
        where: {
          id: string;
          status: PaymentStatus;
          escrowReleaseClaimedAt: null;
        };
        data: Partial<typeof state>;
      }) => {
        // A real database round-trip is never instantaneous - yielding a
        // microtask here lets two concurrent callers both reach this point
        // (both having read the row as RECEIVED and unclaimed) before
        // either's update actually lands, which is exactly the race this
        // method's atomic guard has to survive.
        await Promise.resolve();
        const matches =
          args.where.id === state.id &&
          state.status === args.where.status &&
          state.escrowReleaseClaimedAt === args.where.escrowReleaseClaimedAt;
        if (!matches) return { count: 0 };
        state = { ...state, ...args.data };
        return { count: 1 };
      },
    ),
    update: jest.fn(async (args: { data: Partial<typeof state> }) => {
      state = { ...state, ...args.data };
      return { ...state };
    }),
  };
}

describe("ProofVerificationService.releaseEscrowIfHeld", () => {
  let service: ProofVerificationService;
  let store: ReturnType<typeof createFakePaymentStore>;
  let escrow: { release: jest.Mock };
  let auditLogs: { create: jest.Mock };
  let notifications: { create: jest.Mock };
  let listings: { getEscrowContacts: jest.Mock };

  const baseRequest = {
    id: "request-1",
    listingId: "listing-1",
    listing: {
      title: "Kilimani Green View Apartment",
      owner: { walletAddress: "GLANDLORD" },
    },
  };

  beforeEach(async () => {
    store = createFakePaymentStore({
      id: "payment-1",
      status: PaymentStatus.RECEIVED,
      escrowDepositTxHash: "deposit-tx-1",
    });
    escrow = { release: jest.fn().mockResolvedValue("release-tx-1") };
    auditLogs = { create: jest.fn().mockResolvedValue(undefined) };
    notifications = { create: jest.fn().mockResolvedValue(undefined) };
    listings = { getEscrowContacts: jest.fn().mockResolvedValue([]) };

    const moduleRef = await Test.createTestingModule({
      providers: [
        ProofVerificationService,
        {
          provide: PrismaService,
          useValue: {
            payment: { updateMany: store.updateMany, update: store.update },
          },
        },
        { provide: AuditLogsService, useValue: auditLogs },
        { provide: SorobanService, useValue: {} },
        { provide: EscrowService, useValue: escrow },
        { provide: NotificationsService, useValue: notifications },
        { provide: ViewingRequestAccessService, useValue: {} },
        { provide: ListingsService, useValue: listings },
      ],
    }).compile();

    service = moduleRef.get(ProofVerificationService);
  });

  type ReleaseRequest = typeof baseRequest & {
    payment: {
      id: string;
      status: PaymentStatus;
      escrowDepositTxHash: string | null;
      amount: number;
      stellarAsset: string;
    };
  };

  function release(actorId: string) {
    const request: ReleaseRequest = {
      ...baseRequest,
      payment: {
        id: store.state.id,
        status: store.state.status,
        escrowDepositTxHash: store.state.escrowDepositTxHash,
        amount: 500,
        stellarAsset: "XLM_TEST",
      },
    };
    return (
      service as unknown as {
        releaseEscrowIfHeld: (
          actorId: string,
          request: ReleaseRequest,
        ) => Promise<void>;
      }
    ).releaseEscrowIfHeld(actorId, request);
  }

  it("successful release writes escrowReleaseTxHash and only then marks status RELEASED", async () => {
    await release("actor-1");

    expect(escrow.release).toHaveBeenCalledTimes(1);
    expect(store.state.status).toBe(PaymentStatus.RELEASED);
    expect(store.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          status: PaymentStatus.RELEASED,
          escrowReleaseTxHash: "release-tx-1",
        }),
      }),
    );
    expect(auditLogs.create).toHaveBeenCalledWith(
      expect.objectContaining({ action: "payment.escrow_released" }),
    );
  });

  it("status is not RELEASED before escrow.release actually succeeds", async () => {
    // While escrow.release is still in flight, the payment must still
    // genuinely read as RECEIVED - the claim lock, not the status, is what
    // prevents a second caller from also calling escrow.release.
    escrow.release.mockImplementation(async () => {
      expect(store.state.status).toBe(PaymentStatus.RECEIVED);
      expect(store.state.escrowReleaseClaimedAt).not.toBeNull();
      return "release-tx-1";
    });

    await release("actor-1");

    expect(store.state.status).toBe(PaymentStatus.RELEASED);
  });

  it("two concurrent proof submissions racing to release the same escrow: escrow.release is called at most once", async () => {
    // Both calls read the same RECEIVED, unclaimed row before either's
    // atomic claim runs - Promise.all forces them to race through the
    // claim together.
    await Promise.all([release("actor-1"), release("actor-2")]);

    expect(escrow.release).toHaveBeenCalledTimes(1);
    expect(store.updateMany).toHaveBeenCalledTimes(2);
    expect(store.state.status).toBe(PaymentStatus.RELEASED);

    // Only one "escrow_released" audit entry was ever written - the loser
    // claimed nothing and therefore never reached the release call.
    const releasedAuditCalls = auditLogs.create.mock.calls.filter(
      ([entry]) => entry.action === "payment.escrow_released",
    );
    expect(releasedAuditCalls).toHaveLength(1);
  });

  it("a duplicate/retried release attempt after the payment is already RELEASED safely no-ops", async () => {
    await release("actor-1");
    expect(escrow.release).toHaveBeenCalledTimes(1);

    // By the time this second, sequential call builds its request
    // snapshot, the payment is genuinely RELEASED already - the cheap
    // status guard catches it before ever reaching the atomic claim.
    await release("actor-1");

    expect(escrow.release).toHaveBeenCalledTimes(1);
    expect(store.updateMany).toHaveBeenCalledTimes(1);
    expect(store.state.status).toBe(PaymentStatus.RELEASED);
  });

  it("a failed release never leaves the payment as RELEASED, and clears the lock for a later legitimate attempt", async () => {
    escrow.release.mockRejectedValue(new Error("RPC timeout"));

    await release("actor-1");

    expect(escrow.release).toHaveBeenCalledTimes(1);
    expect(store.state.status).toBe(PaymentStatus.RECEIVED);
    expect(store.state.escrowReleaseClaimedAt).toBeNull();
    expect(auditLogs.create).toHaveBeenCalledWith(
      expect.objectContaining({ action: "payment.escrow_release_failed" }),
    );
    // Never once did the failed attempt expose RELEASED, even transiently.
    expect(store.update).not.toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: PaymentStatus.RELEASED }),
      }),
    );

    // A later, separate attempt can now legitimately claim and succeed.
    escrow.release.mockResolvedValue("release-tx-2");
    await release("actor-1");

    expect(escrow.release).toHaveBeenCalledTimes(2);
    expect(store.state.status).toBe(PaymentStatus.RELEASED);
  });
});
