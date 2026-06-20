import * as crypto from "crypto";

// BLS12-381 scalar field order, matching the curve the payment-proof circuit
// is compiled for (see circuits/payment-proof/payment_proof.circom).
export const BLS12_381_SCALAR_FIELD = BigInt(
  "52435875175126190479447740508185965837690552500527637822603658699938581184513",
);

/** Deterministically maps an arbitrary string (e.g. a cuid) into the circuit's scalar field. */
export function fieldHash(value: string): bigint {
  const digest = crypto.createHash("sha256").update(value).digest("hex");
  return BigInt(`0x${digest}`) % BLS12_381_SCALAR_FIELD;
}

/** Generates a field element from cryptographically secure randomness. */
export function randomField(): bigint {
  const bytes = crypto.randomBytes(32);
  return BigInt(`0x${bytes.toString("hex")}`) % BLS12_381_SCALAR_FIELD;
}

export function mulMod(a: bigint, b: bigint): bigint {
  return (a * b) % BLS12_381_SCALAR_FIELD;
}

export function addMod(...values: bigint[]): bigint {
  return values.reduce((sum, v) => (sum + v) % BLS12_381_SCALAR_FIELD, 0n);
}
