import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ThrottlerStorage, ThrottlerStorageService } from "@nestjs/throttler";
import { ThrottlerStorageRedisService } from "@nest-lab/throttler-storage-redis";
import { ResilientThrottlerStorage } from "./resilient-throttler-storage";

const logger = new Logger("ThrottlerStorageFactory");

/**
 * Bounded so a request never hangs waiting on a dead Redis - if the
 * connection can't be established or a command doesn't come back in this
 * window, ioredis surfaces an error immediately and
 * ResilientThrottlerStorage falls back to in-memory for that request.
 */
const REDIS_CONNECT_TIMEOUT_MS = 3_000;
const REDIS_COMMAND_TIMEOUT_RETRIES = 1;

/**
 * Builds the storage backend for ThrottlerModule. With REDIS_URL set
 * (required in production - see env.validation.ts), rate limits are
 * shared across every Vercel function instance via Upstash Redis,
 * wrapped so a Redis outage degrades to per-instance in-memory limiting
 * instead of failing requests. Without REDIS_URL (local/dev with no
 * Redis configured), this is exactly Nest's own default - per-instance
 * in-memory only, which is fine for a single local process.
 */
export function buildThrottlerStorage(config: ConfigService): ThrottlerStorage {
  const redisUrl = config.get<string>("REDIS_URL");
  const fallback = new ThrottlerStorageService();

  if (!redisUrl) {
    logger.warn(
      "REDIS_URL not configured - throttler storage is per-instance in-memory only, not shared across instances.",
    );
    return fallback;
  }

  const primary = new ThrottlerStorageRedisService(redisUrl, {
    connectTimeout: REDIS_CONNECT_TIMEOUT_MS,
    maxRetriesPerRequest: REDIS_COMMAND_TIMEOUT_RETRIES,
    // Vercel serverless functions don't hold a long-lived process the way
    // a traditional server does - retrying a broken connection forever in
    // the background is wasted work once this particular invocation has
    // already moved on (or the container is about to be recycled).
    retryStrategy: (attempt: number) => Math.min(attempt * 200, 2_000),
  });

  return new ResilientThrottlerStorage(primary, fallback);
}
