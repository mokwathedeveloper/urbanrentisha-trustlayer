/**
 * Shared @Throttle() tiers for endpoints stricter than the global default
 * (60/min, see ThrottlerModule.forRoot in app.module.ts). Centralized so
 * every financial/escrow/proof/upload endpoint across controllers uses the
 * same numbers rather than each redeclaring its own magic constants -
 * mirrors the existing AUTH_THROTTLE pattern in auth.controller.ts.
 */

/** Payment/escrow mutation endpoints - confirms or moves money, or
 * submits an on-chain escrow transaction. */
export const FINANCIAL_MUTATION_THROTTLE = {
  default: { limit: 10, ttl: 60_000 },
};

/** Proof generation/submission endpoints - CPU/RPC-expensive, and proof
 * submission is what triggers escrow release. */
export const PROOF_THROTTLE = {
  default: { limit: 5, ttl: 60_000 },
};

/** Document/image/avatar upload endpoints - expensive storage writes. */
export const UPLOAD_THROTTLE = {
  default: { limit: 10, ttl: 60_000 },
};

/** Read-only payment status polling - more generous than a mutation, but
 * still tighter than the global default for a frequently-polled endpoint. */
export const PAYMENT_POLL_THROTTLE = {
  default: { limit: 30, ttl: 60_000 },
};
