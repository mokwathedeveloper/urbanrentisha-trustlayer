# DoraHacks BUIDL Submission Draft — UrbanRentisha TrustLayer

Copy-paste into https://dorahacks.io/hackathon/stellar-hacks-zk/detail when ready.

## Title

UrbanRentisha TrustLayer

## One-line summary

Privacy-preserving rental trust layer on Stellar — tenants prove a viewing payment was made with a ZK proof, verified on-chain, before private property access is unlocked.

## Description

Rental scams thrive on fake listings and unverifiable "proof" of payment — screenshots, phone calls, informal receipts. UrbanRentisha TrustLayer fixes this with a zero-knowledge payment proof that's actually load-bearing: a tenant pays a viewing fee on Stellar testnet, generates a ZK proof that the payment condition was satisfied, and only gets the viewing code / agent contact details after a Soroban smart contract verifies that proof on-chain.

The ZK proof reveals only what's needed (listing ID, request ID, required fee, payment commitment, verification result) and nothing else — no full wallet history, no unrelated transactions, no private payment secrets. This makes it useful for real-world rental marketplaces where tenants need protection from fake agents and property managers need a reliable, auditable way to confirm serious viewing requests, without exposing financial data.

**What's built:**
- NestJS backend (TypeScript, Prisma, Stellar SDK) covering tenant/agent accounts, verified listings, viewing requests, Stellar testnet payments, proof generation/verification tracking, viewing code unlock, fraud reports, and audit logs
- ZK proof design: Noir circuit proving knowledge of private payment data matching a public commitment (see `zkproof/` in the repo)
- Soroban verifier contract design for on-chain proof verification (see `contracts/`)
- Full audit logging of the payment -> proof -> verification -> access-unlock lifecycle

**Stack:** Stellar (testnet), Soroban, Noir, NestJS, Prisma/PostgreSQL.

**Repo:** https://github.com/mokwathedeveloper/urbanrentisha-trustlayer
**Demo video:** _add link once recorded_

## Links

- GitHub: https://github.com/mokwathedeveloper/urbanrentisha-trustlayer
- Demo video: TODO
