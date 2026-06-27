/**
 * Shared timeout/retry primitives for outbound calls to external systems
 * (Stellar/Soroban RPC, Supabase storage, etc). Two deliberately separate
 * tools:
 *
 *  - `withTimeout` bounds a single attempt - use it alone for calls that
 *    must never be blindly retried (anything that submits a transaction
 *    and mutates on-chain state).
 *  - `withRetry` bounds *and* retries an operation - only for calls that
 *    are safe to run more than once (pure reads, or writes proven
 *    idempotent), per the project's "never blindly retry a transaction
 *    submission" rule.
 *
 * Neither tool may be used while holding a Prisma transaction open - both
 * are for calls to systems outside the database entirely.
 */

export class TimeoutError extends Error {
  constructor(label: string, timeoutMs: number) {
    super(`${label} timed out after ${timeoutMs}ms`);
    this.name = "TimeoutError";
  }
}

/** Explicit marker for an error a caller has already classified as safe
 * to retry (e.g. a transient RPC error mapped at the call site). */
export class RetryableError extends Error {}

/** Explicit marker for an error that must never be retried, regardless of
 * what the default heuristic below would otherwise conclude. */
export class NonRetryableError extends Error {}

/**
 * Default retryable/non-retryable classification for errors with no
 * explicit marker. Errs on the side of NOT retrying: only message
 * patterns that look like a transient network/RPC failure (timeouts,
 * connection resets, rate limiting, 5xx-style upstream errors) are
 * treated as retryable. Anything else - a validation error, a contract
 * error, a 4xx-style "this request itself is wrong" - is left alone,
 * since retrying it would just fail again for the same reason.
 */
export function isRetryableError(error: unknown): boolean {
  if (error instanceof NonRetryableError) return false;
  if (error instanceof RetryableError) return true;
  if (error instanceof TimeoutError) return true;

  const message = error instanceof Error ? error.message.toLowerCase() : "";
  return [
    "timeout",
    "timed out",
    "econnreset",
    "econnrefused",
    "etimedout",
    "enotfound",
    "network",
    "fetch failed",
    "rate limit",
    "too many requests",
    "502",
    "503",
    "504",
  ].some((pattern) => message.includes(pattern));
}

/**
 * Races a single attempt against a deadline. Note: this only stops
 * *waiting* on `fn()` - there is no AbortController plumbed through the
 * underlying Stellar SDK/Supabase clients, so the original network call
 * may still complete in the background after this rejects. Callers must
 * not assume a timed-out write definitely did not happen on-chain (this
 * is exactly the gap the reconciliation sweep exists to close).
 */
export async function withTimeout<T>(
  fn: () => Promise<T>,
  timeoutMs: number,
  label = "operation",
): Promise<T> {
  let timer!: NodeJS.Timeout;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(
      () => reject(new TimeoutError(label, timeoutMs)),
      timeoutMs,
    );
  });

  try {
    return await Promise.race([fn(), timeout]);
  } finally {
    clearTimeout(timer);
  }
}

export interface RetryOptions {
  /** Number of retry attempts AFTER the first try. Default 2 (3 attempts total). */
  retries?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
  /** If set, each individual attempt (not the overall call) is bounded by this. */
  timeoutMs?: number;
  label?: string;
  isRetryable?: (error: unknown) => boolean;
  /** Injectable so tests can run without real delays. */
  sleep?: (ms: number) => Promise<void>;
}

const DEFAULT_RETRIES = 2;
const DEFAULT_BASE_DELAY_MS = 200;
const DEFAULT_MAX_DELAY_MS = 2_000;

function defaultSleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Bounded retries with exponential backoff and jitter. Only ever use this
 * for operations proven safe to run more than once - a read, or a write
 * whose own idempotency has been explicitly established elsewhere. Each
 * attempt is optionally timeout-bounded via `timeoutMs`; the delay
 * between attempts grows exponentially (`baseDelayMs * 2^attempt`, capped
 * at `maxDelayMs`) with up to 50% random jitter added, so concurrent
 * callers retrying the same failing dependency don't all retry in lockstep.
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const {
    retries = DEFAULT_RETRIES,
    baseDelayMs = DEFAULT_BASE_DELAY_MS,
    maxDelayMs = DEFAULT_MAX_DELAY_MS,
    timeoutMs,
    label = "operation",
    isRetryable = isRetryableError,
    sleep = defaultSleep,
  } = options;

  const attempt = () => (timeoutMs ? withTimeout(fn, timeoutMs, label) : fn());

  let lastError: unknown;
  for (let attemptNumber = 0; attemptNumber <= retries; attemptNumber += 1) {
    try {
      return await attempt();
    } catch (error) {
      lastError = error;
      const isLastAttempt = attemptNumber === retries;
      if (isLastAttempt || !isRetryable(error)) {
        throw error;
      }
      const exponential = Math.min(
        maxDelayMs,
        baseDelayMs * 2 ** attemptNumber,
      );
      const jitter = Math.random() * exponential * 0.5;
      await sleep(exponential * 0.5 + jitter);
    }
  }

  // Unreachable (the loop always returns or throws), but keeps the
  // compiler satisfied that every path returns or throws.
  throw lastError;
}
