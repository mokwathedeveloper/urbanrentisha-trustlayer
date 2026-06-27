/**
 * Centralizes which env vars these tests need, so a missing credential
 * produces one clear skip message instead of a confusing failure deep in
 * a login form. Never hardcode real passwords here - they come from the
 * environment only (see README's "Running the E2E tests" section).
 */
export const ENV = {
  appBaseUrl: process.env.APP_BASE_URL ?? "http://localhost:3000",
  apiBaseUrl: process.env.API_BASE_URL ?? "http://localhost:4000/api/v1",
  tenant: {
    email: process.env.TEST_TENANT_EMAIL,
    password: process.env.TEST_TENANT_PASSWORD,
  },
  landlord: {
    email: process.env.TEST_LANDLORD_EMAIL,
    password: process.env.TEST_LANDLORD_PASSWORD,
  },
  admin: {
    email: process.env.TEST_ADMIN_EMAIL,
    password: process.env.TEST_ADMIN_PASSWORD,
  },
};

export function requireCreds(
  creds: { email?: string; password?: string },
  roleLabel: string,
): { email: string; password: string } {
  if (!creds.email || !creds.password) {
    throw new Error(
      `Missing ${roleLabel} credentials - set the corresponding TEST_*_EMAIL / TEST_*_PASSWORD env vars (see README) to run this test.`,
    );
  }
  return { email: creds.email, password: creds.password };
}
