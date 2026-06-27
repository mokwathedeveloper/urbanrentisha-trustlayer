import { redactSecrets } from "./redact.util";

describe("redactSecrets", () => {
  it("redacts the password segment of a Postgres connection string", () => {
    const message =
      "Can't reach database server: postgresql://postgres.abc123:s3cr3tPassw0rd@aws-0-eu-west-1.pooler.supabase.com:6543/postgres";

    const redacted = redactSecrets(message);

    expect(redacted).not.toContain("s3cr3tPassw0rd");
    expect(redacted).toContain("postgres.abc123:[REDACTED]@aws-0-eu-west-1");
  });

  it("redacts a Bearer token", () => {
    const redacted = redactSecrets(
      "Request failed with header Authorization: Bearer abc123.def456-ghi_789",
    );

    expect(redacted).not.toContain("abc123.def456-ghi_789");
    expect(redacted).toContain("Bearer [REDACTED]");
  });

  it("redacts a JWT-shaped string", () => {
    const jwt =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dQw4w9WgXcQ-abc123";
    const redacted = redactSecrets(`token was: ${jwt}`);

    expect(redacted).not.toContain(jwt);
    expect(redacted).toContain("[REDACTED_JWT]");
  });

  it("redacts a Stellar secret key", () => {
    const secret = "SC6HOQOJ5K6N7AAGNXSKDFGYNUEDPDLBDXMXJDTQM7PUTRVL3HUUTBLW";
    const redacted = redactSecrets(`signed with ${secret}`);

    expect(redacted).not.toContain(secret);
    expect(redacted).toContain("[REDACTED_STELLAR_SECRET]");
  });

  it("leaves an ordinary error message with no secret-shaped content unchanged", () => {
    const message = "Escrow deposit transaction did not succeed on-chain.";

    expect(redactSecrets(message)).toBe(message);
  });
});
