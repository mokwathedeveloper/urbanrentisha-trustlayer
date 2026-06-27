import { Logger } from "@nestjs/common";
import { ThrottlerStorage } from "@nestjs/throttler";

/** Mirrors @nestjs/throttler's ThrottlerStorageRecord shape - not part of
 * the package's public export surface, so re-declared structurally here
 * rather than importing an internal path. */
export interface ThrottlerStorageRecordShape {
  totalHits: number;
  timeToExpire: number;
  isBlocked: boolean;
  timeToBlockExpire: number;
}

/**
 * Wraps the shared Redis-backed throttler storage with a fallback to a
 * per-instance in-memory store. On Vercel serverless, each function
 * instance has its own memory - the Redis layer underneath this is what
 * makes a rate limit actually shared across instances; this wrapper is
 * only about what happens when that layer itself is unreachable.
 *
 * Documented behavior on Redis outage: fails SAFE, not closed. Every
 * `increment` call that errors against the primary (Redis) store falls
 * back to the in-memory store instead of propagating the error - so a
 * transient Redis outage degrades rate limiting back to per-instance
 * (the pre-Redis behavior) rather than turning every request into a 500.
 * A startup-time *absence* of REDIS_URL in production is a different,
 * intentionally stricter case - see env.validation.ts, which fails the
 * boot fast instead of silently degrading.
 */
export class ResilientThrottlerStorage implements ThrottlerStorage {
  private readonly logger = new Logger(ResilientThrottlerStorage.name);
  private isCurrentlyDegraded = false;

  constructor(
    private readonly primary: ThrottlerStorage,
    private readonly fallback: ThrottlerStorage,
  ) {}

  async increment(
    key: string,
    ttl: number,
    limit: number,
    blockDuration: number,
    throttlerName: string,
  ): Promise<ThrottlerStorageRecordShape> {
    try {
      const record = await this.primary.increment(
        key,
        ttl,
        limit,
        blockDuration,
        throttlerName,
      );
      if (this.isCurrentlyDegraded) {
        this.logger.log("Shared (Redis) throttler storage recovered.");
        this.isCurrentlyDegraded = false;
      }
      return record;
    } catch (error) {
      if (!this.isCurrentlyDegraded) {
        this.logger.warn(
          `Shared (Redis) throttler storage unavailable - falling back to per-instance in-memory rate limiting until it recovers: ${(error as Error).message}`,
        );
        this.isCurrentlyDegraded = true;
      }
      return this.fallback.increment(
        key,
        ttl,
        limit,
        blockDuration,
        throttlerName,
      );
    }
  }
}
