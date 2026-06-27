import { ThrottlerStorage } from "@nestjs/throttler";
import { ResilientThrottlerStorage } from "./resilient-throttler-storage";

function fakeStorage(): ThrottlerStorage & { calls: number } {
  const store: ThrottlerStorage & { calls: number } = {
    calls: 0,
    increment: jest.fn(async (_key: string, ttl: number) => {
      store.calls += 1;
      return {
        totalHits: store.calls,
        timeToExpire: ttl,
        isBlocked: false,
        timeToBlockExpire: 0,
      };
    }),
  };
  return store;
}

describe("ResilientThrottlerStorage", () => {
  it("delegates to the primary (shared) store when it is healthy", async () => {
    const primary = fakeStorage();
    const fallback = fakeStorage();
    const storage = new ResilientThrottlerStorage(primary, fallback);

    const record = await storage.increment("key-1", 60_000, 10, 0, "default");

    expect(primary.increment).toHaveBeenCalledWith(
      "key-1",
      60_000,
      10,
      0,
      "default",
    );
    expect(fallback.increment).not.toHaveBeenCalled();
    expect(record.totalHits).toBe(1);
  });

  it("falls back to the in-memory store (fails safe, not closed) when the primary store errors", async () => {
    const primary: ThrottlerStorage = {
      increment: jest.fn().mockRejectedValue(new Error("ECONNREFUSED")),
    };
    const fallback = fakeStorage();
    const storage = new ResilientThrottlerStorage(primary, fallback);

    const record = await storage.increment("key-1", 60_000, 10, 0, "default");

    expect(fallback.increment).toHaveBeenCalledWith(
      "key-1",
      60_000,
      10,
      0,
      "default",
    );
    expect(record.totalHits).toBe(1);
  });

  it("recovers to using the primary store again once it stops erroring", async () => {
    let shouldFail = true;
    const primary: ThrottlerStorage = {
      increment: jest.fn(async (_key, ttl) => {
        if (shouldFail) throw new Error("ECONNREFUSED");
        return {
          totalHits: 99,
          timeToExpire: ttl,
          isBlocked: false,
          timeToBlockExpire: 0,
        };
      }),
    };
    const fallback = fakeStorage();
    const storage = new ResilientThrottlerStorage(primary, fallback);

    await storage.increment("key-1", 60_000, 10, 0, "default");
    expect(fallback.increment).toHaveBeenCalledTimes(1);

    shouldFail = false;
    const record = await storage.increment("key-1", 60_000, 10, 0, "default");

    expect(record.totalHits).toBe(99);
    // Still only the one call from while it was down - recovery used the
    // primary again, not another fallback call.
    expect(fallback.increment).toHaveBeenCalledTimes(1);
  });

  describe("simulated shared store across two app instances", () => {
    it("counts a hit recorded by one 'instance' as visible to another, via the same shared primary", async () => {
      // Stands in for Redis: a single shared counter, exactly the thing
      // each Vercel function instance's own in-memory store can never be.
      const sharedPrimary = fakeStorage();

      // Two separate ResilientThrottlerStorage instances, each with its
      // OWN local fallback (simulating two different serverless function
      // instances, which never share memory) - but both wired to the same
      // shared primary, simulating what actually makes them share a limit.
      const instanceA = new ResilientThrottlerStorage(
        sharedPrimary,
        fakeStorage(),
      );
      const instanceB = new ResilientThrottlerStorage(
        sharedPrimary,
        fakeStorage(),
      );

      const first = await instanceA.increment(
        "shared-key",
        60_000,
        10,
        0,
        "default",
      );
      const second = await instanceB.increment(
        "shared-key",
        60_000,
        10,
        0,
        "default",
      );
      const third = await instanceA.increment(
        "shared-key",
        60_000,
        10,
        0,
        "default",
      );

      expect(first.totalHits).toBe(1);
      expect(second.totalHits).toBe(2);
      expect(third.totalHits).toBe(3);
      expect(sharedPrimary.calls).toBe(3);
    });

    it("each instance's own fallback stays independent - only the shared primary is actually shared", async () => {
      const sharedPrimary: ThrottlerStorage = {
        increment: jest.fn().mockRejectedValue(new Error("Redis down")),
      };
      const fallbackA = fakeStorage();
      const fallbackB = fakeStorage();
      const instanceA = new ResilientThrottlerStorage(sharedPrimary, fallbackA);
      const instanceB = new ResilientThrottlerStorage(sharedPrimary, fallbackB);

      const a1 = await instanceA.increment(
        "shared-key",
        60_000,
        10,
        0,
        "default",
      );
      const b1 = await instanceB.increment(
        "shared-key",
        60_000,
        10,
        0,
        "default",
      );

      // With the shared store down, each instance's count is now its own
      // local fallback's count, not a shared one - exactly the degraded
      // (but still functioning) behavior this wrapper documents.
      expect(a1.totalHits).toBe(1);
      expect(b1.totalHits).toBe(1);
      expect(fallbackA.calls).toBe(1);
      expect(fallbackB.calls).toBe(1);
    });
  });
});
