/**
 * Encodes snarkjs's decimal-string BLS12-381 coordinates into the raw
 * big-endian byte layout the Soroban host's bls12_381 module expects
 * (arkworks `serialize_uncompressed`: each Fp is 48 bytes BE, G1 = x||y).
 * For G2, arkworks' Fq2 serializes as (c1, c0), not (c0, c1) - i.e. the
 * *second* snarkjs coordinate comes first in the byte layout. Confirmed
 * against the live deployed contract in contracts/trust-verifier (a
 * naive c0,c1 order fails on-chain with "G2: point not on curve").
 */

const FP_SIZE = 48;

function beBytes(decimal: string, size = FP_SIZE): Buffer {
  let n = BigInt(decimal);
  const buf = Buffer.alloc(size);
  for (let i = size - 1; i >= 0; i -= 1) {
    buf[i] = Number(n & 0xffn);
    n >>= 8n;
  }
  return buf;
}

export function g1Point(x: string, y: string): Buffer {
  return Buffer.concat([beBytes(x), beBytes(y)]);
}

export function g2Point(
  x1: string,
  x2: string,
  y1: string,
  y2: string,
): Buffer {
  return Buffer.concat([beBytes(x2), beBytes(x1), beBytes(y2), beBytes(y1)]);
}
