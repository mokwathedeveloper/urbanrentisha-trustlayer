import { Test } from "@nestjs/testing";
import { ListingAvailability } from "@prisma/client";
import { ListingsService } from "./listings.service";
import { PrismaService } from "../prisma/prisma.service";
import { AuditLogsService } from "../audit-logs/audit-logs.service";
import { NotificationsService } from "../notifications/notifications.service";
import { RealtimeGateway } from "../realtime/realtime.gateway";
import { ViewingRequestsService } from "../viewing-requests/viewing-requests.service";

/**
 * A minimal in-memory stand-in for the one Listing row under test. The
 * mocked updateMany below checks its WHERE clause against this object's
 * current state and only mutates it if the clause matches - the same
 * contract a real database enforces atomically at the row level. This is
 * what actually exercises the conditional-update logic being tested, not
 * just that the function was called.
 */
function createFakeListingStore(initial: {
  id: string;
  title: string;
  availabilityStatus: ListingAvailability;
  reservedByRequestId: string | null;
}) {
  let state = { ...initial, reservationExpiresAt: null as Date | null };

  return {
    get state() {
      return state;
    },
    updateMany: jest.fn(
      async (args: {
        where: { id: string; availabilityStatus: ListingAvailability };
        data: Partial<typeof state>;
      }) => {
        const matches =
          args.where.id === state.id &&
          state.availabilityStatus === args.where.availabilityStatus;
        if (!matches) return { count: 0 };
        state = { ...state, ...args.data };
        return { count: 1 };
      },
    ),
    findUnique: jest.fn(async () => ({ ...state })),
  };
}

describe("ListingsService.reserveForRequest", () => {
  let service: ListingsService;
  let store: ReturnType<typeof createFakeListingStore>;
  let auditLogs: { create: jest.Mock };
  let notifications: { notifyAdmins: jest.Mock; create: jest.Mock };
  let realtime: { emitToListing: jest.Mock };

  beforeEach(async () => {
    store = createFakeListingStore({
      id: "listing-1",
      title: "Kilimani Green View Apartment",
      availabilityStatus: ListingAvailability.AVAILABLE,
      reservedByRequestId: null,
    });
    auditLogs = { create: jest.fn().mockResolvedValue(undefined) };
    notifications = {
      notifyAdmins: jest.fn().mockResolvedValue(undefined),
      create: jest.fn().mockResolvedValue(undefined),
    };
    realtime = { emitToListing: jest.fn() };

    const prisma = {
      listing: { updateMany: store.updateMany, findUnique: store.findUnique },
      savedListing: { findMany: jest.fn().mockResolvedValue([]) },
      viewingRequest: { findMany: jest.fn().mockResolvedValue([]) },
      user: { findMany: jest.fn().mockResolvedValue([]) },
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        ListingsService,
        { provide: PrismaService, useValue: prisma },
        { provide: AuditLogsService, useValue: auditLogs },
        { provide: NotificationsService, useValue: notifications },
        { provide: RealtimeGateway, useValue: realtime },
        { provide: ViewingRequestsService, useValue: {} },
      ],
    }).compile();

    service = moduleRef.get(ListingsService);
  });

  it("reserves an AVAILABLE listing and returns no conflict", async () => {
    const result = await service.reserveForRequest(
      "listing-1",
      "request-A",
      "actor-A",
    );

    expect(result.conflict).toBe(false);
    expect(store.state.availabilityStatus).toBe(ListingAvailability.RESERVED);
    expect(store.state.reservedByRequestId).toBe("request-A");
    expect(auditLogs.create).toHaveBeenCalledWith(
      expect.objectContaining({ action: "listing.reserved" }),
      expect.anything(),
    );

    // The DB write and the audit log already happened above, but the
    // waitlist notification / realtime emit must not fire until the
    // caller explicitly runs the deferred effects (i.e. after its own
    // transaction commits).
    expect(notifications.create).not.toHaveBeenCalled();
    expect(realtime.emitToListing).not.toHaveBeenCalled();

    await result.runPostCommitEffects();

    expect(realtime.emitToListing).toHaveBeenCalledWith(
      "listing-1",
      "listing:reserved",
      expect.objectContaining({
        availabilityStatus: ListingAvailability.RESERVED,
      }),
    );
  });

  it("two concurrent requests for the same listing: exactly one wins, the loser does not overwrite reservedByRequestId", async () => {
    const [resultA, resultB] = await Promise.all([
      service.reserveForRequest("listing-1", "request-A", "actor-A"),
      service.reserveForRequest("listing-1", "request-B", "actor-B"),
    ]);

    const results = [resultA, resultB];
    const winners = results.filter((r) => r.conflict === false);
    const losers = results.filter((r) => r.conflict === true);

    // Exactly one call actually transitioned the row.
    expect(store.updateMany).toHaveBeenCalledTimes(2);
    expect(winners).toHaveLength(1);
    expect(losers).toHaveLength(1);

    // The final, persisted state belongs to whichever request actually won -
    // it was never silently overwritten by the loser.
    const winningRequestId =
      resultA.conflict === false ? "request-A" : "request-B";
    expect(store.state.availabilityStatus).toBe(ListingAvailability.RESERVED);
    expect(store.state.reservedByRequestId).toBe(winningRequestId);

    // The loser's conflict was actually logged - this is the "preserve
    // existing conflict behaviour" requirement. The admin notification
    // itself is deferred until runPostCommitEffects is invoked.
    expect(auditLogs.create).toHaveBeenCalledWith(
      expect.objectContaining({ action: "listing.reservation_conflict" }),
      expect.anything(),
    );
    expect(notifications.notifyAdmins).not.toHaveBeenCalled();

    // The winner's success path ran exactly once, not twice.
    expect(auditLogs.create).toHaveBeenCalledTimes(2); // one "reserved", one "reservation_conflict"

    await Promise.all(results.map((r) => r.runPostCommitEffects()));
    expect(notifications.notifyAdmins).toHaveBeenCalledTimes(1);
  });

  it("a retried call for the same requestId that already won is a no-op, not a conflict", async () => {
    const first = await service.reserveForRequest(
      "listing-1",
      "request-A",
      "actor-A",
    );
    expect(first.conflict).toBe(false);

    const retry = await service.reserveForRequest(
      "listing-1",
      "request-A",
      "actor-A",
    );

    expect(retry.conflict).toBe(false);
    expect(notifications.notifyAdmins).not.toHaveBeenCalled();
    // Only the first call's success path should have logged "listing.reserved".
    expect(auditLogs.create).toHaveBeenCalledTimes(1);
  });

  it("a non-existent listing returns no conflict and touches no audit/notification logic", async () => {
    store.findUnique.mockResolvedValueOnce(null as never);
    store.updateMany.mockResolvedValueOnce({ count: 0 });

    const result = await service.reserveForRequest(
      "missing-listing",
      "request-A",
      "actor-A",
    );

    expect(result.conflict).toBe(false);
    expect(auditLogs.create).not.toHaveBeenCalled();
    expect(notifications.notifyAdmins).not.toHaveBeenCalled();

    await result.runPostCommitEffects();
    expect(notifications.notifyAdmins).not.toHaveBeenCalled();
  });
});
