<div align="center">

<img src="logo.png" alt="UrbanRentisha TrustLayer" width="100" />

# UrbanRentisha TrustLayer
## Technical Whitepaper v1.0

### Privacy-Preserving Rental Trust Infrastructure on Stellar

[![Stellar Testnet](https://img.shields.io/badge/Network-Stellar_Testnet-08B5E5?style=for-the-badge&logo=stellar&logoColor=white)](https://stellar.org)
[![ZK Verified On-Chain](https://img.shields.io/badge/ZK_Proof-Verified_On--Chain-22D3EE?style=for-the-badge)](docs/zkproof/UrbanRentisha_TrustLayer_ZK_Proof_Documentation.md)

*June 2026*

</div>

---

## Abstract

Rental markets in many regions run on informal trust: screenshots of payment, phone calls, word of mouth. This is easy to forge, hard to audit, and exposes tenants to financial and physical risk from fake listings and impersonating agents. UrbanRentisha TrustLayer replaces informal trust with a cryptographic guarantee: a tenant proves, via a zero-knowledge proof verified on-chain by a Soroban smart contract, that a required viewing payment was made — without revealing wallet history or unrelated financial activity — and only then receives access to a verified property's viewing details. This paper describes the system's architecture, the ZK proof construction, the on-chain verification mechanism, and an honest account of its current limitations.

## 1. Introduction

### 1.1 The Problem

Three failure modes recur across informal rental markets: **fake listings** that don't correspond to real, available properties; **unverifiable payments**, where a tenant has no durable proof a viewing fee was paid in case of a dispute; and **unaccountable agents**, who can misrepresent properties with no persistent reputation cost. Existing platforms address these partially — verification badges, review systems — but none cryptographically bind payment to access.

### 1.2 The Approach

UrbanRentisha TrustLayer gates access to a property's viewing details behind a single, hard requirement: a zero-knowledge proof, verified by a smart contract on Stellar, that the required payment condition was satisfied. The proof reveals that the condition holds without revealing the private payment details that satisfy it. Access is denied unless on-chain verification returns `true` — the cryptography is the access-control mechanism, not a feature alongside it.

## 2. System Architecture

The system has four layers: a Next.js frontend, a NestJS backend (auth, listings, payments, proof orchestration), a Circom/Groth16 ZK circuit, and two Soroban smart contracts on Stellar testnet (escrow, trust-verifier). Full component diagram in [TECH_STACK.md](TECH_STACK.md); the data flow:

```text
Tenant requests viewing on a verified listing
    -> Tenant pays the viewing fee into a Soroban escrow contract (Stellar testnet)
    -> Backend generates a Groth16 proof (Circom circuit, BLS12-381 curve)
    -> Proof is submitted to a Soroban contract, which performs a real
       BLS12-381 pairing check
    -> On true: viewing code unlocked, escrow released to the landlord
    -> On false: access remains locked, escrow remains held
    -> Every stage is audit-logged
```

## 3. Smart Contract Protocol

Two contracts are deployed on Stellar testnet:

| Contract | Address | Function |
|---|---|---|
| `UrbanRentishaTrustVerifier` | `CAO2EEH75TIJWGQEMKIO2RLDPWHQJ7HLDTG7HVYYGS6ZEV62HZQYDGSW` | Groth16/BLS12-381 on-chain proof verification |
| `UrbanRentishaEscrow` | `CCDYGIL6TW3CDBYUOOZFEY7LJXCY35AFTS3FGIMIG37PYMKAAJW5ESTY` | Deposit, release, and refund of the viewing fee |

The verifier contract is **stateless with respect to the verification key** — the VK is passed as a call parameter on each invocation rather than stored in contract state. This means the circuit (and therefore the VK) can be revised — as it was, twice, during this project's development — without redeploying the contract. Verification itself uses Soroban's native `bls12_381()` host functions (`g1_mul`, `g1_add`, `pairing_check`) to evaluate the Groth16 pairing equation directly on-chain, rather than via a software-emulated curve implementation.

## 4. The Zero-Knowledge Proof System

### 4.1 Choice of Toolchain

Three viable ZK paths exist for Stellar today: RISC Zero, Noir, and Circom. This project uses **Circom + Groth16**, compiled for the **BLS12-381** curve — the same curve targeted by Stellar's own canonical `groth16_verifier` reference contract (`stellar/soroban-examples`), making this the officially-referenced path rather than a workaround. Noir's UltraHonk verifier for Soroban exists only as a third-party fork at the time of writing, a higher-risk dependency under hackathon time constraints.

### 4.2 The Proof Statement

The circuit (`circuits/payment-proof/payment_proof.circom`) proves: given public inputs `requestId`, `listingId`, `requiredViewingFee`, and `paymentCommitment`, the prover knows private values `paymentSecret` and `paymentNonce` such that `MiMCPermutation(paymentSecret, paymentNonce) + requestId × listingId + requiredViewingFee == paymentCommitment`. Full statement, lifecycle, and failure-state design in [docs/zkproof/UrbanRentisha_TrustLayer_ZK_Proof_Documentation.md](docs/zkproof/UrbanRentisha_TrustLayer_ZK_Proof_Documentation.md).

### 4.3 The Commitment Construction — and Its History of Real Fixes

The commitment binding the private witness to the public statement went through two corrections during development, both disclosed rather than silently patched:

1. **An initially non-binding relation.** An early version used `secret² + nonce² == target`. This is not a binding commitment — the conic equation `x² + y² = T` has on the order of the field's full size in solutions over a prime field, so a prover could choose an arbitrary secret and solve for a matching nonce via a modular square root, without ever knowing the real payment-derived secret.
2. **An under-secured replacement.** The fix — `MiMCPermutation`, a one-way permutation using the `x^5` S-box — was initially specified with 12 rounds. The algebraic degree of an `n`-round `x^5` permutation is `5^n`; for polynomial-interpolation/Gröbner-basis attacks to be infeasible, that degree must exceed the field size (`2^255` for BLS12-381's scalar field). `5^12 ≈ 2^28` — roughly 18× short. Corrected to 220 rounds, matching the security margin circomlib documents for its own MiMC implementation on a similarly-sized field.

### 4.4 Documented Limitation

The 220-round MiMC permutation is a minimal, self-contained construction sized to match a documented security margin — it is **not** an independently audited Poseidon/MiMC parameter set. A production deployment should adopt a standard, audited primitive for this field (e.g., a published Poseidon instantiation for BLS12-381).

## 5. Security Model

Full current security posture — what's implemented, what's known to be limited — is maintained as a living document in [SECURITY.md](SECURITY.md) rather than restated here, since it changes as the system does. As of this writing it includes rate-limited authentication, audit logging on every authentication event, strict input validation, and the on-chain verification described above.

## 6. Roadmap

See [docs/roadmap/UrbanRentisha_TrustLayer_Final_Professional_Roadmap.md](docs/roadmap/UrbanRentisha_TrustLayer_Final_Professional_Roadmap.md) for the full build roadmap. At a system level, the path beyond this MVP runs through: an independently audited ZK-friendly hash primitive in place of the current MiMC construction, mainnet deployment once that audit is complete, and broader automated test coverage across the backend (currently concentrated on the ZK commitment logic, escrow arithmetic, and authentication flow).

## 7. Conclusion

UrbanRentisha TrustLayer demonstrates that zero-knowledge proofs can be load-bearing infrastructure in a real-world marketplace use case — not a demonstration appended to a conventional application, but the actual access-control mechanism gating a financial transaction. The project's value is not only in what was built, but in how two real cryptographic weaknesses were found and corrected during development rather than discovered later: that process, disclosed in full above, is offered as evidence of the engineering rigor behind the system, not despite the mistakes it required catching.

## References

- Stellar Development Foundation, Protocol 25 ("X-Ray") and Protocol 26 ("Yardstick") release notes — native BN254 and Poseidon host functions.
- `stellar/soroban-examples`, `groth16_verifier` reference contract.
- circomlib, MiMC/Poseidon round-constant and round-count documentation.
- [docs/zkproof/UrbanRentisha_TrustLayer_ZK_Proof_Documentation.md](docs/zkproof/UrbanRentisha_TrustLayer_ZK_Proof_Documentation.md) — full proof design.
- [TECH_STACK.md](TECH_STACK.md) — full system architecture and technology rationale.
- [SECURITY.md](SECURITY.md) — current security posture and known limitations.
