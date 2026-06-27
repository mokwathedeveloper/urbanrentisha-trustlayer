import { test, expect } from "@playwright/test";
import { ENV } from "../env";

/**
 * Backend API smoke checks against local/staging - includes the
 * controlled 429 burst test, which is deliberately NOT in
 * smoke/production.spec.ts (don't hammer real production with bursts on
 * every CI run; that rate-limit behavior was already verified manually
 * against production during the throttler-storage hardening work).
 */
test.describe("backend API smoke", () => {
  test("GET /health/live returns ok", async ({ request }) => {
    const res = await request.get(`${ENV.apiBaseUrl}/health/live`);
    expect(res.ok()).toBeTruthy();
  });

  test("GET /health/ready returns 200 or a clear 503", async ({ request }) => {
    const res = await request.get(`${ENV.apiBaseUrl}/health/ready`, {
      failOnStatusCode: false,
    });
    expect([200, 503]).toContain(res.status());
  });

  test("GET /listings returns a paginated shape", async ({ request }) => {
    const res = await request.get(`${ENV.apiBaseUrl}/listings`);
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    // Real shape per PaginatedResult<T> (src/common/utils/pagination.util.ts):
    // { items, page, limit, total, hasNextPage } - not a generic data/meta envelope.
    expect(Array.isArray(body.items)).toBe(true);
    expect(body).toHaveProperty("page");
    expect(body).toHaveProperty("limit");
    expect(body).toHaveProperty("total");
    expect(body).toHaveProperty("hasNextPage");
  });

  test("auth login works with valid tenant credentials", async ({ request }) => {
    test.skip(
      !ENV.tenant.email || !ENV.tenant.password,
      "TEST_TENANT_EMAIL/TEST_TENANT_PASSWORD not set",
    );
    const res = await request.post(`${ENV.apiBaseUrl}/auth/login`, {
      data: { email: ENV.tenant.email, password: ENV.tenant.password },
    });
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    expect(body).toHaveProperty("accessToken");
  });

  test("a protected endpoint rejects an unauthenticated request", async ({
    request,
  }) => {
    const res = await request.get(`${ENV.apiBaseUrl}/notifications`, {
      failOnStatusCode: false,
    });
    expect(res.status()).toBe(401);
  });

  test("a rate-limited endpoint eventually returns 429 under a controlled burst", async ({
    request,
  }) => {
    // proof-verification/submit is the tightest documented tier (5/min) -
    // see src/common/constants/throttle-limits.ts. Auth is irrelevant here:
    // ThrottlerGuard runs as a global APP_GUARD before JwtAuthGuard, so it
    // counts hits regardless of the (deliberately invalid) bearer token.
    let last429: number | null = null;
    for (let i = 0; i < 8; i += 1) {
      const res = await request.post(
        `${ENV.apiBaseUrl}/proof-verification/submit`,
        {
          headers: { Authorization: "Bearer e2e-smoke-invalid-token" },
          data: { viewingRequestId: "e2e-smoke-test-id" },
          failOnStatusCode: false,
        },
      );
      if (res.status() === 429) {
        last429 = res.status();
        break;
      }
    }
    expect(last429).toBe(429);
  });
});
