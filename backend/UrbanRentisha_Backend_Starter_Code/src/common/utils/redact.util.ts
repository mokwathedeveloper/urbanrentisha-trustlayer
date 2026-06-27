/**
 * Strips the specific shapes of secret that have a real chance of ending
 * up inside an Error.message - a Postgres connection-string password (a
 * raw DATABASE_URL embeds one), a JWT, a Bearer token, or a Stellar
 * secret key - before that message is ever passed to a logger. This is a
 * denylist of known-dangerous patterns, not a general-purpose secret
 * scanner; it exists specifically for the one place (api/index.ts's
 * bootstrap failure handler) that would otherwise log a raw, unclassified
 * error object.
 */
export function redactSecrets(text: string): string {
  return text
    .replace(/(postgres(?:ql)?:\/\/[^:/?#\s]+:)[^@\s]+(@)/gi, "$1[REDACTED]$2")
    .replace(/Bearer\s+[A-Za-z0-9._~+/=-]+/g, "Bearer [REDACTED]")
    .replace(
      /eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g,
      "[REDACTED_JWT]",
    )
    .replace(/\bS[A-Z2-7]{55}\b/g, "[REDACTED_STELLAR_SECRET]");
}
