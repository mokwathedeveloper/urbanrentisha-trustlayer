import { ConfigService } from "@nestjs/config";
import { ThrottlerStorageService } from "@nestjs/throttler";
import { ThrottlerStorageRedisService } from "@nest-lab/throttler-storage-redis";
import { buildThrottlerStorage } from "./throttler-storage.factory";
import { ResilientThrottlerStorage } from "./resilient-throttler-storage";

function configWith(redisUrl: string | undefined): ConfigService {
  return {
    get: jest.fn((key: string) => (key === "REDIS_URL" ? redisUrl : undefined)),
  } as unknown as ConfigService;
}

describe("buildThrottlerStorage", () => {
  it("falls back to per-instance in-memory storage when REDIS_URL is not configured", () => {
    const storage = buildThrottlerStorage(configWith(undefined));

    expect(storage).toBeInstanceOf(ThrottlerStorageService);
  });

  it("wires up the shared Redis-backed storage (with fail-safe fallback) when REDIS_URL is configured", () => {
    const storage = buildThrottlerStorage(
      configWith("redis://default:token@some-host.upstash.io:6379"),
    );

    expect(storage).toBeInstanceOf(ResilientThrottlerStorage);
    const primary = (
      storage as unknown as { primary: ThrottlerStorageRedisService }
    ).primary;
    expect(primary).toBeInstanceOf(ThrottlerStorageRedisService);
    expect(
      (storage as unknown as { fallback: unknown }).fallback,
    ).toBeInstanceOf(ThrottlerStorageService);

    // Constructing the storage opens a real ioredis socket - close it so
    // the test process can exit cleanly (this host doesn't actually exist).
    (
      primary as unknown as { redis: { disconnect: () => void } }
    ).redis.disconnect();
  });
});
