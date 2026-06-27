import {
  NonRetryableError,
  RetryableError,
  TimeoutError,
  isRetryableError,
  withRetry,
  withTimeout,
} from "./resilience.util";

/** Deterministic, instant stand-in for the real setTimeout-based sleep, so
 * these tests don't actually wait out exponential backoff delays. */
function instantSleep(): Promise<void> {
  return Promise.resolve();
}

describe("withTimeout", () => {
  it("resolves with the value when the operation finishes before the deadline", async () => {
    const result = await withTimeout(() => Promise.resolve("ok"), 50);
    expect(result).toBe("ok");
  });

  it("rejects with a TimeoutError once the configured timeout elapses", async () => {
    const neverResolves = () => new Promise<string>(() => {});

    await expect(withTimeout(neverResolves, 20, "slow-call")).rejects.toThrow(
      TimeoutError,
    );
  });

  it("propagates the operation's own rejection instead of timing out, when it fails fast", async () => {
    const fails = () => Promise.reject(new Error("boom"));

    await expect(withTimeout(fails, 1_000)).rejects.toThrow("boom");
  });
});

describe("isRetryableError", () => {
  it("treats a TimeoutError as retryable", () => {
    expect(isRetryableError(new TimeoutError("op", 100))).toBe(true);
  });

  it("treats messages that look like transient network/RPC failures as retryable", () => {
    expect(isRetryableError(new Error("ECONNRESET"))).toBe(true);
    expect(isRetryableError(new Error("upstream returned 503"))).toBe(true);
    expect(isRetryableError(new Error("rate limit exceeded"))).toBe(true);
  });

  it("treats an explicit RetryableError as retryable regardless of message", () => {
    expect(isRetryableError(new RetryableError("anything"))).toBe(true);
  });

  it("treats an explicit NonRetryableError as non-retryable even if the message looks transient", () => {
    expect(isRetryableError(new NonRetryableError("timeout"))).toBe(false);
  });

  it("treats an ordinary validation/contract error as non-retryable by default", () => {
    expect(isRetryableError(new Error("invalid signature"))).toBe(false);
  });
});

describe("withRetry", () => {
  it("retries a transient error and eventually succeeds", async () => {
    let attempts = 0;
    const fn = jest.fn(async () => {
      attempts += 1;
      if (attempts < 3) throw new Error("ECONNRESET");
      return "success";
    });

    const result = await withRetry(fn, { retries: 3, sleep: instantSleep });

    expect(result).toBe("success");
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it("does not retry a non-retryable error - fails on the first attempt", async () => {
    const fn = jest.fn(async () => {
      throw new Error("invalid signature");
    });

    await expect(
      withRetry(fn, { retries: 3, sleep: instantSleep }),
    ).rejects.toThrow("invalid signature");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("stops after the configured number of retries and throws the last error", async () => {
    const fn = jest.fn(async () => {
      throw new Error("ECONNRESET");
    });

    await expect(
      withRetry(fn, { retries: 2, sleep: instantSleep }),
    ).rejects.toThrow("ECONNRESET");
    // 1 initial attempt + 2 retries = 3 total calls.
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it("honors a custom isRetryable classifier instead of the default heuristic", async () => {
    let attempts = 0;
    const fn = jest.fn(async () => {
      attempts += 1;
      if (attempts < 2) throw new Error("custom-transient");
      return "ok";
    });

    const result = await withRetry(fn, {
      retries: 2,
      sleep: instantSleep,
      isRetryable: (error) =>
        error instanceof Error && error.message === "custom-transient",
    });

    expect(result).toBe("ok");
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("bounds each individual attempt with timeoutMs", async () => {
    const neverResolves = jest.fn(() => new Promise<string>(() => {}));

    await expect(
      withRetry(neverResolves, {
        retries: 1,
        timeoutMs: 10,
        sleep: instantSleep,
      }),
    ).rejects.toThrow(TimeoutError);
    // A TimeoutError is retryable by default, so this should have been
    // attempted twice (1 initial + 1 retry) before giving up.
    expect(neverResolves).toHaveBeenCalledTimes(2);
  });
});

describe("transaction-submission calls are never blindly retried", () => {
  /**
   * This mirrors how EscrowService wires submitSignedDeposit/release/
   * refund: timeout-bounded via withTimeout alone, with no withRetry
   * wrapper at all - so a transient failure surfaces to the caller on the
   * very first attempt, exactly once, never resubmitted automatically.
   */
  it("a write/submission call wrapped only in withTimeout is attempted exactly once on failure", async () => {
    const submit = jest.fn(async () => {
      throw new Error("ECONNRESET");
    });

    await expect(withTimeout(submit, 1_000, "escrow.release")).rejects.toThrow(
      "ECONNRESET",
    );
    expect(submit).toHaveBeenCalledTimes(1);
  });
});

describe("read-only calls like getHold are retried safely", () => {
  /** Mirrors EscrowService.getHold: withRetry + timeoutMs, default classifier. */
  it("retries a transient getHold-style failure and returns the eventual successful read", async () => {
    let attempts = 0;
    const getHold = jest.fn(async () => {
      attempts += 1;
      if (attempts < 2) throw new Error("network error");
      return { status: "Held", payer: "GPAYER", amount: 1_000n, token: "X" };
    });

    const result = await withRetry(getHold, {
      timeoutMs: 1_000,
      sleep: instantSleep,
    });

    expect(result).toEqual({
      status: "Held",
      payer: "GPAYER",
      amount: 1_000n,
      token: "X",
    });
    expect(getHold).toHaveBeenCalledTimes(2);
  });
});
