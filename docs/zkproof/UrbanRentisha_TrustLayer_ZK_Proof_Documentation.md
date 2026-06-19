# UrbanRentisha TrustLayer ZK Proof Documentation

## 1. Document Purpose

This document explains the zero-knowledge proof design for **UrbanRentisha TrustLayer**, a ZK-powered rental payment proof and verified property access layer built on Stellar.

The goal is to help developers, judges, and future contributors understand:

```text
What the proof proves
Why the proof is needed
What data remains private
What data is public
How the proof is generated
How the proof is submitted
How Stellar/Soroban verification works
How the frontend status changes
How failures are handled
What is included in the MVP
What is deferred to future versions
```

UrbanRentisha TrustLayer uses ZK to support one clear product promise:

```text
A tenant privately proves payment, Stellar verifies it, and UrbanRentisha unlocks safe property access.
```

---

## 2. Product Context

UrbanRentisha TrustLayer helps tenants safely request property viewing access. A tenant selects a verified rental listing, requests viewing access, pays a required viewing or reservation fee through Stellar testnet, generates a zero-knowledge proof, verifies the proof through a Stellar/Soroban smart contract, and receives a viewing code after successful verification.

The proof is not decorative. It is load-bearing because viewing details remain locked until the proof verification step succeeds.

---

## 3. Why ZK Is Used

Rental platforms often rely on screenshots, manual confirmations, phone calls, or informal receipts to confirm viewing or reservation payments. These methods are easy to fake, difficult to audit, and may expose unnecessary payment information.

UrbanRentisha uses zero-knowledge proof technology so the tenant can prove that a required payment condition was satisfied without exposing unnecessary wallet details, full transaction history, or unrelated financial activity.

In general terms, a zero-knowledge proof allows one party to prove that a statement is true without revealing additional private information beyond the truth of that statement.

For UrbanRentisha, the statement is simple:

```text
The tenant satisfied the payment condition required for a specific viewing request.
```

---

## 4. MVP Proof Statement

The MVP proof statement is:

```text
The tenant knows a valid payment reference or commitment that satisfies the required viewing fee for the selected property listing.
```

A more product-friendly version is:

```text
This tenant paid the required viewing fee for this property request without exposing unrelated wallet history.
```

A more technical version is:

```text
Given a public request ID, listing ID, required viewing fee, and payment commitment, the prover knows private payment data that produces a valid commitment matching the required payment condition.
```

---

## 5. ZK Design Goal

The proof should answer one question:

```text
Has the payment condition for this viewing request been satisfied?
```

The proof should not reveal:

```text
Full tenant wallet history
Unrelated transactions
Tenant-side payment secret
Private payment reference
Other balances or activity
```

The proof should reveal only what the product needs:

```text
The selected listing
The viewing request
The required viewing fee
The payment commitment
The verification result
```

---

## 6. Recommended ZK Stack

**Implementation update:** the actual hackathon build uses **Circom + Groth16**, not Noir. Noir's on-chain Soroban verifier only exists as an unaudited third-party reference repo, whereas Stellar publishes an official Groth16 verifier reference (`stellar/soroban-examples/groth16_verifier`) using native BLS12-381 host functions. Forking the official reference was lower-risk for actually deploying a real, on-chain-verified proof by the submission deadline. The stack:

```text
Circom (circuit compiled with --prime bls12381)
snarkjs (Groth16 trusted setup, proving, off-chain verification)
Off-chain proof generation service
Soroban verifier contract (UrbanRentishaTrustVerifier), forked from stellar/soroban-examples/groth16_verifier
```

See `circuits/payment-proof/` for the circuit and `contracts/trust-verifier/` for the deployed verifier contract.

## 6.1 Why Circom + Groth16 Was Chosen Over Noir

Noir was the original recommendation for readability, but its UltraHonk verifier for Soroban only exists as a third-party fork ([yugocabrio/rs-soroban-ultrahonk](https://github.com/yugocabrio/rs-soroban-ultrahonk)), which is a higher-risk dependency to adapt under a hackathon deadline. Circom + Groth16 has an official Stellar-maintained reference verifier, making it the more reliable path to a genuinely deployed, on-chain-verified proof.

## 6.2 Hash Primitive Substitution

The conceptual commitment formula in section 8 below calls for a ZK-friendly hash (e.g. Poseidon). The deployed circuit instead uses a field-native quadratic binding (`commitment = secret^2 + nonce^2 + requestId*listingId + fee`), because circomlib's Poseidon round constants are computed for the BN254 scalar field and are not valid under the BLS12-381 field this verifier contract requires. This is a known, intentional substitution, not an oversight — see `circuits/payment-proof/payment_proof.circom` for the in-code rationale.

## 6.3 When RISC Zero Makes Sense

RISC Zero can be considered if the team wants to prove more complex off-chain computation. For this MVP, the payment-condition proof is simple enough that Circom is a better fit.

---

## 7. Proof Inputs

## 7.1 Private Inputs

Private inputs are known to the prover but should not be revealed publicly.

Recommended private inputs:

```text
paymentSecret
tenantPaymentReference
tenantWalletData
paymentNonce
```

Meaning:

| Private Input | Purpose |
|---|---|
| `paymentSecret` | Secret value used to bind the tenant's proof to the payment condition. |
| `tenantPaymentReference` | Private payment reference or local proof material. |
| `tenantWalletData` | Tenant-side payment information that should not be fully exposed. |
| `paymentNonce` | Random nonce used to prevent simple replay or guessing. |

## 7.2 Public Inputs

Public inputs are visible to the verifier and can be used by the smart contract.

Recommended public inputs:

```text
requestId
listingId
requiredViewingFee
paymentCommitment
escrowContractAddress
```

Meaning:

| Public Input | Purpose |
|---|---|
| `requestId` | Unique viewing request identifier. |
| `listingId` | Property listing connected to the payment rule. |
| `requiredViewingFee` | Required amount for viewing access. |
| `paymentCommitment` | Public commitment derived from private payment data. |
| `escrowContractAddress` | Contract or payment-hold address used for the flow. |

## 7.3 Proof Output

Expected proof output:

```text
validPaymentCondition = true
```

Product result:

```text
Proof verified
Viewing request marked as verified
Viewing code generated
Access unlocked
```

---

## 8. Commitment Design

The MVP can use a simple commitment pattern.

Conceptual formula:

```text
paymentCommitment = hash(requestId, listingId, requiredViewingFee, paymentSecret, paymentNonce)
```

The proof should show that the tenant knows private values that produce the public commitment and satisfy the payment condition.

The exact hash primitive should match the chosen proving system and verifier compatibility. For a ZK-friendly design, use a ZK-friendly hash such as Poseidon where supported.

---

## 9. Proof Lifecycle

The proof lifecycle has seven stages:

```text
1. Payment condition created
2. Stellar testnet payment completed
3. Payment record confirmed
4. Payment commitment created
5. ZK proof generated off-chain
6. Proof submitted for verification
7. Verification result unlocks access
```

Detailed flow:

```text
Tenant requests viewing
    ↓
Backend creates viewing request
    ↓
Tenant pays through Stellar testnet
    ↓
Backend records transaction hash
    ↓
Backend marks payment as received
    ↓
Proof service receives payment reference
    ↓
Proof service generates ZK proof
    ↓
Proof is submitted to Soroban verifier
    ↓
Soroban returns verification result
    ↓
Backend updates proof status
    ↓
Viewing code is generated
    ↓
Tenant access is unlocked
```

---

## 10. User-Facing ZK Flow

The UI should not overwhelm the tenant with circuit language.

Use this user-facing sequence:

```text
Payment received
    ↓
Generating private payment proof
    ↓
Proof generated
    ↓
Verifying proof on Stellar
    ↓
Proof verified
    ↓
Viewing code unlocked
```

Recommended tenant microcopy:

```text
Your private payment proof is being generated.
```

```text
This proof confirms that you met the payment requirement without exposing unrelated wallet activity.
```

```text
Your proof is being checked by the Stellar smart contract.
```

```text
Proof verified. Your viewing code is ready.
```

---

## 11. Developer Flow

## 11.1 Backend Receives Payment Confirmation

After payment confirmation, the backend stores:

```text
viewingRequestId
stellarTxHash
tenantWallet
amount
asset
paymentStatus
paidAt
```

## 11.2 Backend Creates Proof Job

The backend creates a queue job:

```text
proof-generation-queue
```

Job payload:

```json
{
  "viewingRequestId": "vr_123",
  "requestId": "REQ-123",
  "listingId": "LIST-001",
  "requiredViewingFee": "10",
  "paymentCommitment": "commitment_hash_here"
}
```

## 11.3 Proof Service Generates Proof

The proof service:

```text
Receives proof job
Builds witness
Generates proof
Stores proof metadata
Updates proof status to GENERATED
Triggers verification job
```

## 11.4 Proof Submitted to Soroban

The backend or verification service submits:

```text
proof
publicInputs
requestId
paymentCommitment
```

The smart contract verifies or records verification status.

---

## 12. Soroban Verification Design

## 12.1 MVP Contract Responsibility

The Soroban contract should stay minimal.

It should handle:

```text
Create request reference
Submit proof metadata
Verify proof or record verification result
Store proof verification status
Store access eligibility
Return access status
Emit verification events
```

## 12.2 Recommended Contract Functions

```text
create_request(request_id, tenant, listing_id, amount)
submit_proof(request_id, proof_hash, public_inputs)
verify_proof(request_id, proof_data)
get_access_status(request_id)
get_verification_status(request_id)
```

## 12.3 Recommended Contract Events

```text
RequestCreated
ProofSubmitted
ProofVerified
ProofFailed
AccessGranted
```

## 12.4 Verification Output

If verification succeeds:

```text
proofStatus = VERIFIED
accessStatus = UNLOCKED
```

If verification fails:

```text
proofStatus = FAILED
accessStatus = LOCKED
```

---

## 13. Backend Data Models

## 13.1 ZKProof Model

Recommended fields:

```text
id
viewingRequestId
proofHash
publicInputs
proofStatus
generatedAt
createdAt
updatedAt
```

## 13.2 ProofVerification Model

Recommended fields:

```text
id
proofId
contractAddress
verificationTxHash
verificationStatus
verifiedAt
createdAt
updatedAt
```

## 13.3 ViewingRequest Status Fields

The viewing request should track:

```text
paymentStatus
proofStatus
escrowStatus
accessStatus
viewingCodeId
```

---

## 14. API Endpoints

## 14.1 Generate Proof

```text
POST /api/proofs/generate
```

Request:

```json
{
  "viewingRequestId": "vr_123"
}
```

Response:

```json
{
  "proofId": "proof_123",
  "status": "GENERATING",
  "message": "Proof generation has started."
}
```

## 14.2 Get Proof Status

```text
GET /api/proofs/:id/status
```

Response:

```json
{
  "proofId": "proof_123",
  "viewingRequestId": "vr_123",
  "status": "GENERATED",
  "publicInputs": {
    "requestId": "REQ-123",
    "listingId": "LIST-001",
    "requiredViewingFee": "10",
    "paymentCommitment": "0xabc123"
  }
}
```

## 14.3 Submit Proof

```text
POST /api/proofs/submit
```

Request:

```json
{
  "proofId": "proof_123"
}
```

Response:

```json
{
  "proofId": "proof_123",
  "status": "SUBMITTED",
  "message": "Proof has been submitted for verification."
}
```

## 14.4 Verify Proof

```text
POST /api/proofs/verify
```

Request:

```json
{
  "proofId": "proof_123",
  "viewingRequestId": "vr_123"
}
```

Response:

```json
{
  "proofId": "proof_123",
  "verificationStatus": "VERIFIED",
  "accessStatus": "UNLOCKED",
  "verificationTxHash": "stellar_tx_hash_here"
}
```

---

## 15. Status Enums

## 15.1 Proof Status

```text
NOT_STARTED
GENERATING
GENERATED
SUBMITTED
VERIFIED
FAILED
```

## 15.2 Access Status

```text
LOCKED
UNLOCKED
EXPIRED
REVOKED
```

## 15.3 Payment Status

```text
PENDING
INITIATED
RECEIVED
FAILED
REFUNDED
```

## 15.4 Viewing Request Status

```text
VIEWING_REQUESTED
PAYMENT_PENDING
PAYMENT_RECEIVED
PROOF_GENERATED
PROOF_VERIFIED
ESCROW_ACTIVE
VIEWING_CODE_GENERATED
ACCESS_UNLOCKED
COMPLETED
FAILED
REPORTED
```

---

## 16. Failure States

## 16.1 Payment Not Confirmed

Condition:

```text
Payment status is not RECEIVED.
```

Action:

```text
Do not allow proof generation.
Keep access locked.
Show retry or payment status check.
```

User message:

```text
Payment has not been confirmed yet. Proof generation will become available after payment is received.
```

## 16.2 Proof Generation Failed

Condition:

```text
Proof service cannot generate proof.
```

Action:

```text
Set proofStatus = FAILED.
Allow retry.
Write audit log.
Do not unlock access.
```

User message:

```text
Your proof could not be generated. Please try again.
```

## 16.3 Proof Verification Failed

Condition:

```text
Soroban verification returns false or transaction fails.
```

Action:

```text
Set proofStatus = FAILED.
Set accessStatus = LOCKED.
Write audit log.
Show support or retry option.
```

User message:

```text
Your proof could not be verified. Viewing access remains locked for safety.
```

## 16.4 Replay Attempt

Condition:

```text
Same proof or commitment is used for another viewing request.
```

Action:

```text
Reject verification.
Write security audit log.
Keep access locked.
```

User message:

```text
This proof cannot be reused for another viewing request.
```

---

## 17. Security Rules

The ZK proof system must follow these rules:

```text
Never expose private proof inputs in the frontend.
Never store seed phrases.
Never ask for private keys.
Never unlock viewing details before verification succeeds.
Never accept proof verification without binding it to requestId and listingId.
Never allow proof reuse across different viewing requests.
Always validate public inputs.
Always write audit logs for proof status changes.
Always keep access locked after failed verification.
```

---

## 18. Privacy Rules

The system should minimize exposed payment information.

The UI may show:

```text
Payment status
Transaction hash
Required viewing fee
Proof status
Verification status
Viewing code after unlock
```

The UI should not show:

```text
Full wallet history
Private payment secret
Private witness values
Unrelated transactions
Sensitive internal proof data
```

---

## 19. Audit Log Events

Record these events:

```text
PAYMENT_RECEIVED
PROOF_GENERATION_STARTED
PROOF_GENERATED
PROOF_SUBMITTED
PROOF_VERIFIED
PROOF_FAILED
ACCESS_UNLOCKED
VIEWING_CODE_GENERATED
```

Example audit metadata:

```json
{
  "viewingRequestId": "vr_123",
  "proofId": "proof_123",
  "proofStatus": "VERIFIED",
  "verificationTxHash": "stellar_tx_hash_here"
}
```

---

## 20. Queue Design

Use background queues for proof-related work.

Recommended queues:

```text
proof-generation-queue
proof-verification-queue
stellar-confirmation-queue
audit-log-queue
notification-queue
```

## 20.1 Proof Generation Queue

Triggered when:

```text
Payment status becomes RECEIVED.
```

Responsibilities:

```text
Build witness
Generate proof
Store proof metadata
Update status
Trigger notification
```

## 20.2 Proof Verification Queue

Triggered when:

```text
Proof status becomes GENERATED.
```

Responsibilities:

```text
Submit proof to verifier
Receive verification result
Update proof status
Update access status
Trigger viewing code generation
```

---

## 21. Frontend Components

Recommended components:

```text
ProofStatusTracker
ProofGenerationCard
ProofVerificationCard
PaymentCommitmentCard
PublicInputsCard
PrivateDataNotice
SorobanVerificationCard
VerificationTxCard
AccessLockedNotice
AccessUnlockedSuccess
ProofFailureAlert
```

## 21.1 Proof Status Tracker

Statuses:

```text
Payment received
Proof generating
Proof generated
Proof submitted
Proof verified
Access unlocked
```

## 21.2 Private Data Notice

Message:

```text
Your private payment data is used to create the proof. It is not shown publicly.
```

## 21.3 Access Locked Notice

Message:

```text
Viewing details remain locked until proof verification succeeds.
```

---

## 22. Demo Mode ZK Flow

Demo mode should make the ZK process easy to follow.

Demo steps:

```text
1. Choose a verified property.
2. Request viewing access.
3. Complete or simulate Stellar testnet payment.
4. Generate ZK payment proof.
5. Submit proof for Soroban verification.
6. Show verification result.
7. Unlock viewing code.
8. Show audit log event.
```

If live proof generation is not stable, use a clearly labeled fallback:

```text
Demo fallback: showing expected proof verification result from seeded test data.
```

Do not pretend a failed proof succeeded.

---

## 23. MVP Scope

The MVP should include:

```text
Payment confirmation
Simple payment commitment
Off-chain proof generation
Proof metadata storage
Proof submission
Soroban verification or verification-state recording
Proof status tracker
Viewing code unlock after verification
Audit log update
Demo mode
```

The MVP can simplify:

```text
Advanced replay protection
Production escrow
Automated refunds
Complex identity proofs
Multi-asset support
Advanced privacy pools
```

---

## 24. Production Improvements

Future ZK improvements may include:

```text
Stronger nullifier design
Replay-safe proof consumption
Multi-asset proof support
Private reservation deposits
Private tenant eligibility proofs
Private compliance proofs
Agent verification proofs
External platform proof-carrying API responses
Formal circuit testing
Circuit fuzzing
Verifier cost optimization
```

---

## 25. Testing Plan

## 25.1 Unit Tests

Test:

```text
Commitment generation
Proof input validation
Status transitions
Viewing code unlock rules
Proof failure handling
Replay rejection logic
```

## 25.2 Integration Tests

Test:

```text
Payment received → proof generation
Proof generated → verification submitted
Proof verified → access unlocked
Proof failed → access locked
Viewing code generated only after verification
Audit log written on proof events
```

## 25.3 Smart Contract Tests

Test:

```text
create_request works
submit_proof works
verify_proof accepts valid proof
verify_proof rejects invalid proof
get_access_status returns correct state
events are emitted correctly
```

## 25.4 Demo Tests

Test:

```text
Demo tenant can generate proof
Proof status updates in UI
Verification screen shows transaction hash
Viewing code appears after verification
Admin audit log shows proof event
```

---

## 26. Known Limitations

```text
The MVP uses Stellar testnet, not mainnet.
The MVP proof statement is intentionally simple.
The MVP does not provide full legal escrow.
The MVP may use simplified proof verification depending on implementation time.
The MVP does not prove full payment privacy like a complete shielded payment system.
The MVP does not replace rental legal due diligence.
```

---

## 27. Final Developer Checklist

```text
Define proof statement
Define private inputs
Define public inputs
Create payment commitment format
Create proof circuit
Create proof generation script
Create proof API endpoint
Create proof status endpoint
Create Soroban verifier contract
Connect backend verification service
Store proof metadata
Store verification result
Update viewing request status
Generate viewing code after verification
Write audit logs
Add frontend proof status tracker
Add failure states
Add demo mode
Document known limitations
```

---

## 28. Final Summary

The UrbanRentisha TrustLayer ZK proof system is designed to prove one practical real-world condition:

```text
A tenant satisfied the required viewing payment condition for a specific verified property request.
```

This proof allows UrbanRentisha to unlock viewing access only after verification succeeds, while avoiding unnecessary exposure of the tenant's wallet activity or private payment details.

The ZK proof is central to the product. It is the trust gate between payment and property access.
