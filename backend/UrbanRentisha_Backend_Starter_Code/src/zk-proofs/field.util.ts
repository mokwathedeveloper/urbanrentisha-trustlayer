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

function powMod(base: bigint, exponent: bigint, modulus: bigint): bigint {
  let result = 1n;
  let b = base % modulus;
  let e = exponent;
  while (e > 0n) {
    if (e & 1n) result = (result * b) % modulus;
    b = (b * b) % modulus;
    e >>= 1n;
  }
  return result;
}

// Must exactly match circuits/payment-proof/payment_proof.circom's
// MiMCFeistel template (same round count, same round constants, same
// field) - this is the off-chain twin of that on-chain commitment
// construction. See the circuit file for the full rationale and the
// documented MVP limitation (not an audited Poseidon/MiMC parameter set).
const MIMC_ROUND_CONSTANTS: bigint[] = [
  27147793823878441697335518397435947331343405675391114107089645891423115864870n,
  2130592604356396211886033430366158809641555041372538547288921098944299351840n,
  14116188681833732135898805025597367001187164628586766431357512301804678496545n,
  20763022300433569639194615673118221231444123607206829207232817765903291103793n,
  1524327973003870966872997742467789520361435381882525270920542114004761303576n,
  1325562768844460446874615518889746196186287466513362245836920014553956014753n,
  43484050184970699068067359443959733412869863829704478866060697702337128139592n,
  25804834913701614295228082443535552138824437984229786569987871114464572798951n,
  408118065773249307046670557388179981960631039137615457207122187892916792842n,
  10510829619657606315916592502785524263248201214387807033876231150030858491673n,
  9001827358274994425598914527542062117420658537433088432011193045870097617080n,
  30561442166700718019589589944917652552715327878971000315277104488271409366941n,
  3790600832585850901191895693162985025859561151772001569518910999101028347265n,
  8441936577605398322860913077828129425794745025578705945536555750047172599619n,
  50172098884475042973533929933611544336349405213067781636425586671208297076574n,
  8369128532752549104008540141224894551292343673833747999837739397642670498979n,
];

const MIMC_ROUNDS = 12;

/**
 * One-way Feistel-style permutation over the BLS12-381 scalar field, using
 * the x^5 S-box. Must produce bit-for-bit identical output to the circuit's
 * MiMCFeistel template for the same inputs, since this is what binds the
 * proof's private witness to the on-chain paymentCommitment.
 */
export function mimcFeistel(left: bigint, right: bigint): bigint {
  let state = left % BLS12_381_SCALAR_FIELD;
  for (let i = 0; i < MIMC_ROUNDS; i++) {
    const added = addMod(state, right, MIMC_ROUND_CONSTANTS[i % 16]);
    state = powMod(added, 5n, BLS12_381_SCALAR_FIELD);
  }
  return addMod(state, right);
}
