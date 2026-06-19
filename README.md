# UrbanRentisha TrustLayer

Privacy-preserving rental trust infrastructure on Stellar. A tenant proves a required viewing/reservation payment was made — using a zero-knowledge proof verified on-chain — without exposing wallet history, and only then receives access to a verified property's viewing details.

Built for [Stellar Hacks: Real-World ZK](https://dorahacks.io/hackathon/stellar-hacks-zk).

## The trust flow

```text
Tenant requests viewing on a verified listing
    -> Tenant pays the viewing fee on Stellar testnet
    -> Tenant generates a ZK proof that the payment condition was satisfied
    -> Proof is verified by a Soroban smart contract
    -> UrbanRentisha unlocks the viewing code / agent contact details
    -> Audit log records the event
```

The proof is load-bearing: access stays locked until verification succeeds. See [docs/zkproof/UrbanRentisha_TrustLayer_ZK_Proof_Documentation.md](docs/zkproof/UrbanRentisha_TrustLayer_ZK_Proof_Documentation.md) for the full proof design (statement, inputs, lifecycle, failure states).

## Why ZK + Stellar

Rental platforms today rely on screenshots, calls, or informal receipts to confirm a viewing payment — easy to fake, hard to audit, and unnecessarily exposing of financial data. UrbanRentisha proves the payment condition was met without revealing unrelated wallet activity, using Stellar's native ZK-friendly primitives (BN254, Poseidon, introduced in Protocols 25/26) to verify proofs on-chain cheaply.

Recommended/used stack: **Noir** circuits, Soroban verifier contract, Stellar testnet.

## Repository layout

```text
backend/                       NestJS backend starter (API, Prisma, Stellar SDK, proof workflow)
docs/contracts/                Soroban smart contract design docs
docs/zkproof/                  ZK proof design: statement, inputs, lifecycle, security/privacy rules
docs/system-architecture/      System architecture documentation
docs/problem-statement/        Problem statement, PRD, mandatory features
docs/roadmap/                  Build roadmap
docs/user-journey/             User journey docs
docs/Features_and_Pages/       Feature and page specs
docs/api/                      API documentation
docs/design/, docs/uxui/, docs/mockup/   Design assets and UI mockups
docs/resources/                Supporting reference material
docs/deployment/               Deployment docs
docs/projectstructure/         Project structure notes
CLAUDE.md                      AI implementation rules
QA_TESTING_RULES.md            QA testing rules
```

## Backend quick start

```bash
cd backend/UrbanRentisha_Backend_Starter_Code
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run start:dev
```

API base URL: `http://localhost:4000/api/v1`

The backend's ZK proof service currently produces a simulated proof hash/verification record so the end-to-end flow can be demonstrated; the API contract is designed so a real Noir circuit/prover can be swapped in without changing it.

## Status

MVP under active development for the hackathon submission deadline (June 29, 2026, 12:00 PM PST).

## License

TBD.
