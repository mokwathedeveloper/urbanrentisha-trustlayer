# DoraHacks BUIDL Submission Draft — UrbanRentisha TrustLayer

Copy-paste into https://dorahacks.io/hackathon/stellar-hacks-zk/detail when ready.

## Title

UrbanRentisha TrustLayer

## One-line summary

Privacy-preserving rental trust layer on Stellar — tenants prove a viewing payment was made with a ZK proof, verified on-chain, before private property access is unlocked.

## Description

Rental scams thrive on fake listings and unverifiable "proof" of payment — screenshots, phone calls, informal receipts. UrbanRentisha TrustLayer fixes this with a zero-knowledge payment proof that's actually load-bearing: a tenant pays a viewing fee on Stellar testnet, generates a real Groth16 ZK proof that the payment condition was satisfied, and only gets the viewing code / agent contact details after a Soroban smart contract performs a genuine on-chain BLS12-381 pairing check on that proof.

The ZK proof reveals only what's needed (listing ID, request ID, required fee, payment commitment, verification result) and nothing else — no full wallet history, no unrelated transactions, no private payment secrets. This makes it useful for real-world rental marketplaces where tenants need protection from fake agents and property managers need a reliable, auditable way to confirm serious viewing requests, without exposing financial data.

**What's built and proven end-to-end (not a mock):**
- A Circom circuit (`circuits/payment-proof/`) compiled for the BLS12-381 curve, proving knowledge of private payment data (`paymentSecret`, `paymentNonce`) matching a public commitment
- A real Groth16 trusted setup, with the backend generating a genuine proof per viewing request via snarkjs (~7s)
- `UrbanRentishaTrustVerifier`, a Soroban contract (`contracts/trust-verifier/`, forked from Stellar's official `soroban-examples/groth16_verifier`) deployed to Stellar testnet, performing a real on-chain BLS12-381 pairing check — not a recorded/mocked result
- NestJS backend (TypeScript, Prisma, `@stellar/stellar-sdk`) covering tenant/agent accounts, verified listings, viewing requests, Stellar testnet payments, proof generation, on-chain verification, viewing code unlock, fraud reports, and audit logs
- Verified live: a tenant's real testnet payment → real Groth16 proof → real on-chain verification, returning a genuine Stellar transaction hash confirmed successful on Horizon

**Stack:** Stellar (testnet), Soroban (BLS12-381 host functions), Circom + Groth16 + snarkjs, NestJS, Prisma/PostgreSQL (Supabase).

**Deployed contract:** `CAO2EEH75TIJWGQEMKIO2RLDPWHQJ7HLDTG7HVYYGS6ZEV62HZQYDGSW` on Stellar testnet.

**Repo:** https://github.com/mokwathedeveloper/urbanrentisha-trustlayer
**Demo video:** _add link once recorded_

## Links

- GitHub: https://github.com/mokwathedeveloper/urbanrentisha-trustlayer
- Demo video: TODO
