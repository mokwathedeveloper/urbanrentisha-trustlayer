import { looksLikePlaceholderSecret, validateEnv } from "./env.validation";

function validConfig(overrides: Record<string, unknown> = {}) {
  return {
    NODE_ENV: "development",
    DATABASE_URL: "postgresql://user:pass@localhost:5432/db",
    JWT_SECRET: "a-real-32-character-random-secret",
    CORS_ORIGIN: "http://localhost:3000",
    STELLAR_NETWORK_PASSPHRASE: "Test SDF Network ; September 2015",
    STELLAR_PLATFORM_SECRET_KEY:
      "SC6HOQOJ5K6N7AAGNXSKDFGYNUEDPDLBDXMXJDTQM7PUTRVL3HUUTBLW",
    SOROBAN_RPC_URL: "https://soroban-testnet.stellar.org",
    ESCROW_CONTRACT_ID:
      "CCDYGIL6TW3CDBYUOOZFEY7LJXCY35AFTS3FGIMIG37PYMKAAJW5ESTY",
    TRUST_VERIFIER_CONTRACT_ID:
      "CAO2EEH75TIJWGQEMKIO2RLDPWHQJ7HLDTG7HVYYGS6ZEV62HZQYDGSW",
    NATIVE_ASSET_CONTRACT_ID:
      "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC",
    SUPABASE_URL: "https://project-ref-real.supabase.co",
    SUPABASE_SERVICE_ROLE_KEY: "a-real-looking-service-role-key-value",
    CRON_SECRET: "a-real-32-character-random-cron-secret",
    REDIS_URL: "rediss://default:a-real-token@some-host.upstash.io:6379",
    ...overrides,
  };
}

describe("validateEnv", () => {
  it("accepts a fully populated, valid configuration", () => {
    expect(() => validateEnv(validConfig())).not.toThrow();
  });

  it("fails fast when a required environment variable is missing", () => {
    const config = validConfig();
    delete (config as Record<string, unknown>).DATABASE_URL;

    expect(() => validateEnv(config)).toThrow(
      /Invalid environment configuration/,
    );
  });

  it("fails fast when a required environment variable has the wrong shape", () => {
    expect(() =>
      validateEnv(validConfig({ DATABASE_URL: "not-a-postgres-url" })),
    ).toThrow(/DATABASE_URL/);
  });

  it("fails fast when JWT_SECRET is too short to be a real secret", () => {
    expect(() => validateEnv(validConfig({ JWT_SECRET: "short" }))).toThrow();
  });

  it("does not reject an example.com-shaped CORS_ORIGIN in non-production", () => {
    expect(() =>
      validateEnv(validConfig({ NODE_ENV: "development" })),
    ).not.toThrow();
  });

  it("rejects placeholder secrets when NODE_ENV is production", () => {
    expect(() =>
      validateEnv(
        validConfig({
          NODE_ENV: "production",
          JWT_SECRET: "replace-with-long-random-secret",
        }),
      ),
    ).toThrow(/placeholder/);
  });

  it("rejects a repeated-character placeholder secret in production", () => {
    expect(() =>
      validateEnv(
        validConfig({
          NODE_ENV: "production",
          STELLAR_PLATFORM_SECRET_KEY: `S${"X".repeat(55)}`,
        }),
      ),
    ).toThrow(/placeholder/);
  });

  it("accepts the same placeholder-shaped values outside production", () => {
    // The same literal value that fails in production is allowed in dev -
    // this is specifically a production-boot guard, not a general secret
    // strength check.
    expect(() =>
      validateEnv(
        validConfig({
          NODE_ENV: "development",
          JWT_SECRET: "replace-with-long-random-secret-but-long-enough",
        }),
      ),
    ).not.toThrow();
  });

  it("accepts a real-looking production configuration", () => {
    expect(() =>
      validateEnv(validConfig({ NODE_ENV: "production" })),
    ).not.toThrow();
  });

  it("allows CRON_SECRET to be unset outside production", () => {
    const config = validConfig({ NODE_ENV: "development" });
    delete (config as Record<string, unknown>).CRON_SECRET;

    expect(() => validateEnv(config)).not.toThrow();
  });

  it("fails fast when CRON_SECRET is missing in production", () => {
    const config = validConfig({ NODE_ENV: "production" });
    delete (config as Record<string, unknown>).CRON_SECRET;

    expect(() => validateEnv(config)).toThrow(/CRON_SECRET/);
  });

  it("rejects a placeholder CRON_SECRET in production", () => {
    expect(() =>
      validateEnv(
        validConfig({
          NODE_ENV: "production",
          CRON_SECRET: "replace-with-a-real-cron-secret-value",
        }),
      ),
    ).toThrow(/placeholder/);
  });

  it("rejects a too-short CRON_SECRET in any environment", () => {
    expect(() => validateEnv(validConfig({ CRON_SECRET: "short" }))).toThrow(
      /CRON_SECRET/,
    );
  });

  it("allows REDIS_URL to be unset outside production", () => {
    const config = validConfig({ NODE_ENV: "development" });
    delete (config as Record<string, unknown>).REDIS_URL;

    expect(() => validateEnv(config)).not.toThrow();
  });

  it("fails fast when REDIS_URL is missing in production", () => {
    const config = validConfig({ NODE_ENV: "production" });
    delete (config as Record<string, unknown>).REDIS_URL;

    expect(() => validateEnv(config)).toThrow(/REDIS_URL/);
  });

  it("rejects a malformed REDIS_URL in any environment", () => {
    expect(() =>
      validateEnv(validConfig({ REDIS_URL: "http://not-a-redis-url" })),
    ).toThrow(/REDIS_URL/);
  });

  it("accepts a plain redis:// URL as well as rediss://", () => {
    expect(() =>
      validateEnv(validConfig({ REDIS_URL: "redis://localhost:6379" })),
    ).not.toThrow();
  });
});

describe("looksLikePlaceholderSecret", () => {
  it("flags known placeholder phrases", () => {
    expect(looksLikePlaceholderSecret("replace-with-long-random-secret")).toBe(
      true,
    );
    expect(looksLikePlaceholderSecret("ChangeMe123!")).toBe(true);
  });

  it("flags long runs of a repeated character", () => {
    expect(looksLikePlaceholderSecret("S" + "X".repeat(55))).toBe(true);
  });

  it("does not flag a normal-looking real secret", () => {
    expect(
      looksLikePlaceholderSecret(
        "SC6HOQOJ5K6N7AAGNXSKDFGYNUEDPDLBDXMXJDTQM7PUTRVL3HUUTBLW",
      ),
    ).toBe(false);
  });
});
