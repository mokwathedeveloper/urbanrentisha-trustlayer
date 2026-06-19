# UrbanRentisha TrustLayer Contract Documentation

## 1. Document Purpose

This document defines the smart contract design for **UrbanRentisha TrustLayer**, a ZK-powered rental payment proof and verified property access platform built on Stellar.

The contract layer supports the core trust flow:

```text
Tenant requests viewing
Tenant pays through Stellar testnet
Tenant generates ZK payment proof
Soroban verifies or records proof verification
UrbanRentisha unlocks viewing code
Admin audit log records the event
```

The contract is intentionally focused. It does not attempt to build a full rental marketplace or full legal escrow system. Its main role is to support trusted proof verification and access eligibility for verified property viewing requests.

---

## 2. Contract Name

Recommended contract name:

```text
UrbanRentishaTrustVerifier
```

Alternative names:

```text
TrustLayerVerifier
RentalAccessVerifier
ViewingAccessVerifier
```

Best final name:

```text
UrbanRentishaTrustVerifier
```

Reason:

The name clearly communicates the contract’s purpose: verifying trust conditions for rental access.

---

## 3. Contract Purpose

The contract provides an on-chain verification and access-control layer for rental viewing requests.

It should allow the platform to:

```text
Create a viewing request reference
Submit proof metadata
Verify a ZK proof or record proof verification result
Store proof verification status
Store access eligibility
Return viewing access status
Emit events for auditability
```

The contract is part of the trust layer. It should make it clear that viewing access is not unlocked until proof verification succeeds.

---

## 4. Contract Scope

## 4.1 MVP Contract Scope

The MVP contract should support:

```text
Viewing request registration
Proof submission
Proof verification status
Access eligibility status
Verification events
Access status lookup
```

## 4.2 Out of Scope for MVP

The MVP contract should not overbuild:

```text
Full legal escrow
Dispute resolution
Automated refunds
Mainnet custody
Complex multi-party settlement
Production compliance
Advanced fraud scoring
Property ownership verification
```

These can be added later after the hackathon MVP.

---

## 5. Contract Responsibilities

The smart contract is responsible for:

```text
Storing viewing request references
Binding a request to a tenant, listing, and required amount
Receiving proof metadata
Verifying or recording proof verification outcome
Marking a request as verified after proof success
Marking access as unlocked after verification
Rejecting duplicate or invalid proof submissions
Returning access status to the application
Emitting auditable events
```

The backend remains responsible for:

```text
User authentication
Property listing management
Payment confirmation
ZK proof generation
Viewing code generation
Notifications
Admin dashboard
Audit logs
Analytics
API integrations
```

---

## 6. Contract Architecture

```text
Next.js Frontend
        ↓
NestJS Backend
        ↓
Stellar Service
        ↓
Soroban Contract: UrbanRentishaTrustVerifier
        ↓
Proof Verification Status
        ↓
Access Eligibility
        ↓
Viewing Code Unlock in Backend
```

The contract does not directly reveal viewing details. It only returns whether the request is eligible for access. The backend uses this result to unlock viewing details and generate a viewing code.

---

## 7. Core Contract Flow

```text
1. Backend creates a viewing request.
2. Backend calls create_request on the Soroban contract.
3. Tenant completes Stellar testnet payment.
4. Backend confirms payment and generates a payment commitment.
5. ZK proof is generated off-chain.
6. Backend submits proof metadata to the contract.
7. Contract verifies or records verification result.
8. Contract marks request as verified if proof succeeds.
9. Backend reads contract access status.
10. Backend generates viewing code.
11. Tenant sees unlocked viewing details.
```

---

## 8. Recommended Contract Functions

## 8.1 create_request

```text
create_request(request_id, tenant, listing_id, amount)
```

### Purpose

Creates an on-chain reference for a viewing request.

### Inputs

| Field | Type | Description |
|---|---|---|
| `request_id` | Symbol/String/BytesN | Unique viewing request identifier. |
| `tenant` | Address | Tenant wallet or tenant-linked address. |
| `listing_id` | Symbol/String/BytesN | Property listing identifier. |
| `amount` | i128/u128 | Required viewing fee amount. |

### Expected Behavior

```text
Validate request does not already exist.
Store request data.
Set proof status to NOT_SUBMITTED.
Set access status to LOCKED.
Emit RequestCreated event.
```

### Failure Cases

```text
Request already exists.
Invalid tenant address.
Invalid amount.
Invalid listing identifier.
Unauthorized caller if restricted.
```

---

## 8.2 submit_proof

```text
submit_proof(request_id, proof_hash, public_inputs)
```

### Purpose

Stores submitted proof metadata for a viewing request.

### Inputs

| Field | Type | Description |
|---|---|---|
| `request_id` | Symbol/String/BytesN | Viewing request identifier. |
| `proof_hash` | BytesN | Hash or commitment of submitted proof. |
| `public_inputs` | Vec/Map | Public proof inputs such as listing ID, request ID, amount, and payment commitment. |

### Expected Behavior

```text
Check request exists.
Check request is not already verified.
Store proof hash.
Store public input reference or hash.
Set proof status to SUBMITTED.
Emit ProofSubmitted event.
```

### Failure Cases

```text
Request not found.
Proof already submitted.
Proof already verified.
Invalid public inputs.
Missing payment commitment.
```

---

## 8.3 verify_proof

```text
verify_proof(request_id, proof_data)
```

### Purpose

Verifies the submitted proof or records the verification result, depending on the MVP implementation.

### Inputs

| Field | Type | Description |
|---|---|---|
| `request_id` | Symbol/String/BytesN | Viewing request identifier. |
| `proof_data` | Bytes/Vec | Proof payload or encoded proof data. |

### Expected Behavior

```text
Check request exists.
Check proof was submitted.
Validate proof against public inputs.
If valid, set proof status to VERIFIED.
If valid, set access status to UNLOCKED.
If invalid, set proof status to FAILED.
Emit ProofVerified or ProofFailed event.
Emit AccessGranted event if successful.
```

### Failure Cases

```text
Request not found.
Proof not submitted.
Invalid proof.
Mismatched public inputs.
Replay attempt.
Verification error.
```

### MVP Note

If full on-chain verification is not completed within the hackathon timeline, the contract may record a verification result from a verifier service. This must be clearly documented as an MVP limitation. The demo should honestly state whether the contract fully verifies the proof or records verified proof status after off-chain verification.

---

## 8.4 get_access_status

```text
get_access_status(request_id)
```

### Purpose

Returns whether viewing access is locked or unlocked for a viewing request.

### Inputs

| Field | Type | Description |
|---|---|---|
| `request_id` | Symbol/String/BytesN | Viewing request identifier. |

### Response

```text
LOCKED
UNLOCKED
EXPIRED
REVOKED
```

### Expected Behavior

```text
Check request exists.
Return current access status.
```

---

## 8.5 get_verification_status

```text
get_verification_status(request_id)
```

### Purpose

Returns the proof verification status for a viewing request.

### Inputs

| Field | Type | Description |
|---|---|---|
| `request_id` | Symbol/String/BytesN | Viewing request identifier. |

### Response

```text
NOT_SUBMITTED
SUBMITTED
VERIFIED
FAILED
```

---

## 8.6 revoke_access

```text
revoke_access(request_id)
```

### Purpose

Allows an authorized admin or platform account to revoke viewing access if suspicious activity is detected.

### Expected Behavior

```text
Check caller authorization.
Check request exists.
Set access status to REVOKED.
Emit AccessRevoked event.
```

### Failure Cases

```text
Unauthorized caller.
Request not found.
Access already revoked.
```

### MVP Priority

This function is useful but optional for the first hackathon MVP.

---

## 9. Recommended Contract Events

## 9.1 RequestCreated

Emitted when a viewing request reference is created.

```text
RequestCreated(request_id, tenant, listing_id, amount)
```

## 9.2 ProofSubmitted

Emitted when proof metadata is submitted.

```text
ProofSubmitted(request_id, proof_hash)
```

## 9.3 ProofVerified

Emitted when proof verification succeeds.

```text
ProofVerified(request_id, proof_hash)
```

## 9.4 ProofFailed

Emitted when proof verification fails.

```text
ProofFailed(request_id, proof_hash, reason)
```

## 9.5 AccessGranted

Emitted when access becomes unlocked.

```text
AccessGranted(request_id, tenant, listing_id)
```

## 9.6 AccessRevoked

Emitted when access is revoked.

```text
AccessRevoked(request_id, reason)
```

---

## 10. Contract Storage Design

## 10.1 Viewing Request Record

Recommended storage record:

```text
ViewingRequest {
  request_id
  tenant
  listing_id
  amount
  proof_hash
  proof_status
  access_status
  created_at
  verified_at
}
```

## 10.2 Proof Status

```text
NOT_SUBMITTED
SUBMITTED
VERIFIED
FAILED
```

## 10.3 Access Status

```text
LOCKED
UNLOCKED
EXPIRED
REVOKED
```

## 10.4 Storage Keys

Recommended storage key pattern:

```text
REQUEST:<request_id>
PROOF:<request_id>
ACCESS:<request_id>
ADMIN:<address>
```

---

## 11. Contract Status Lifecycle

## 11.1 Initial Request

```text
proof_status = NOT_SUBMITTED
access_status = LOCKED
```

## 11.2 After Proof Submission

```text
proof_status = SUBMITTED
access_status = LOCKED
```

## 11.3 After Successful Verification

```text
proof_status = VERIFIED
access_status = UNLOCKED
```

## 11.4 After Failed Verification

```text
proof_status = FAILED
access_status = LOCKED
```

## 11.5 After Revocation

```text
access_status = REVOKED
```

---

## 12. ZK Proof Contract Integration

## 12.1 Proof Statement

The contract supports verification for this proof statement:

```text
The tenant knows a valid payment reference or commitment that satisfies the required viewing fee for the selected property listing.
```

## 12.2 Public Inputs

The contract should validate or receive these public inputs:

```text
requestId
listingId
requiredViewingFee
paymentCommitment
escrowContractAddress
```

## 12.3 Private Inputs

Private inputs are never stored on-chain:

```text
paymentSecret
tenantPaymentReference
tenantWalletData
paymentNonce
```

## 12.4 Verification Result

If proof verification succeeds:

```text
Proof status becomes VERIFIED.
Access status becomes UNLOCKED.
```

If proof verification fails:

```text
Proof status becomes FAILED.
Access status remains LOCKED.
```

---

## 13. Contract Security Rules

The contract must follow these rules:

```text
Do not unlock access before proof verification succeeds.
Do not accept duplicate request IDs.
Do not allow the same proof to be reused across different requests.
Do not expose private proof inputs.
Do not store tenant private payment data.
Do not accept mismatched listing ID or request ID inputs.
Do not allow unauthorized access revocation.
Do not imply legal escrow unless implemented.
Do not store seed phrases or private keys.
```

---

## 14. Access Control

## 14.1 Authorized Callers

Depending on implementation, authorized callers may include:

```text
Platform admin address
Backend service address
Tenant address for proof submission
Verifier service address
```

## 14.2 Recommended Access Rules

| Function | Allowed Caller |
|---|---|
| `create_request` | Backend service or platform admin |
| `submit_proof` | Tenant or backend service |
| `verify_proof` | Backend service, verifier service, or public if safe |
| `get_access_status` | Public read |
| `get_verification_status` | Public read |
| `revoke_access` | Platform admin only |

---

## 15. Replay Protection

Replay protection is important because a proof should not unlock multiple viewing requests.

Recommended protections:

```text
Bind proof to request_id.
Bind proof to listing_id.
Bind proof to requiredViewingFee.
Use paymentCommitment.
Use nonce or nullifier.
Store used proof hash.
Reject already-used proof hash.
Reject already-verified request.
```

---

## 16. Error Codes

Recommended contract-level errors:

```text
REQUEST_ALREADY_EXISTS
REQUEST_NOT_FOUND
INVALID_TENANT
INVALID_AMOUNT
PROOF_ALREADY_SUBMITTED
PROOF_ALREADY_VERIFIED
PROOF_NOT_SUBMITTED
INVALID_PROOF
PUBLIC_INPUT_MISMATCH
PROOF_REPLAY_DETECTED
UNAUTHORIZED_CALLER
ACCESS_ALREADY_REVOKED
ACCESS_NOT_AVAILABLE
```

---

## 17. Contract Events and Backend Sync

The backend should listen for contract events and sync them to the database.

## 17.1 Event Sync Flow

```text
Contract emits event
Backend Stellar service reads event
Backend updates database
Audit log is written
Notification is created
Frontend status updates
```

## 17.2 Example Event Sync

```text
ProofVerified event
    ↓
Backend updates ProofVerification record
    ↓
ViewingRequest proofStatus becomes VERIFIED
    ↓
ViewingRequest accessStatus becomes UNLOCKED
    ↓
ViewingCode is generated
    ↓
Tenant receives notification
    ↓
Admin audit log records event
```

---

## 18. Backend Contract Service

The NestJS backend should include a dedicated Stellar or Contract service.

Recommended service:

```text
stellar-contract.service.ts
```

Responsibilities:

```text
Deploy or reference contract address
Call create_request
Call submit_proof
Call verify_proof
Read get_access_status
Read get_verification_status
Listen to contract events
Map contract results to database statuses
Handle transaction errors
Write audit logs
```

---

## 19. Recommended Backend API Mapping

| Backend API | Contract Function |
|---|---|
| `POST /api/viewing-requests` | `create_request` |
| `POST /api/proofs/submit` | `submit_proof` |
| `POST /api/proofs/verify` | `verify_proof` |
| `GET /api/viewing-requests/:id/status` | `get_access_status`, `get_verification_status` |
| `PATCH /api/viewing-codes/:code/revoke` | `revoke_access` if enabled |

---

## 20. Contract Deployment Strategy

## 20.1 Development

```text
Local Soroban environment
Local test accounts
Local contract tests
Mock proof data
```

## 20.2 Testnet

```text
Deploy contract to Stellar testnet.
Store contract address in backend environment variables.
Use demo tenant and platform accounts.
Use seeded listing and viewing request data.
Test proof submission and verification flow.
```

## 20.3 Production Direction

```text
Deploy audited contract.
Use secure admin keys.
Use controlled upgrade strategy.
Use monitoring for contract events.
Use mainnet only after legal, security, and product review.
```

---

## 21. Environment Variables

Recommended backend environment variables:

```text
STELLAR_NETWORK=testnet
STELLAR_RPC_URL=
STELLAR_HORIZON_URL=
SOROBAN_CONTRACT_ID=
PLATFORM_ADMIN_PUBLIC_KEY=
PLATFORM_ADMIN_SECRET_KEY=
VERIFIER_PUBLIC_KEY=
```

Security note:

```text
Never expose private keys in frontend code.
Never commit secrets to GitHub.
Use environment variables and secure secret storage.
```

---

## 22. Testing Plan

## 22.1 Contract Unit Tests

Test:

```text
create_request creates a valid request.
create_request rejects duplicate request ID.
submit_proof stores proof metadata.
submit_proof rejects unknown request.
verify_proof unlocks access for valid proof.
verify_proof keeps access locked for invalid proof.
get_access_status returns correct value.
get_verification_status returns correct value.
revoke_access revokes access for admin.
revoke_access rejects unauthorized caller.
```

## 22.2 Integration Tests

Test:

```text
Backend creates viewing request and calls contract.
Payment received triggers proof generation.
Proof generated triggers submit_proof.
Verification success updates backend state.
Viewing code is generated after access unlock.
Admin audit log records contract event.
Invalid proof keeps access locked.
```

## 22.3 Demo Tests

Test:

```text
Demo tenant can request viewing.
Contract request reference is created.
Proof submission screen works.
Proof verification screen works.
Access unlocks after verification.
Viewing code is shown.
Admin audit log shows ProofVerified event.
```

---

## 23. Contract Pseudocode

The exact code will depend on the final Soroban implementation, but the logic should follow this structure:

```rust
pub fn create_request(env, request_id, tenant, listing_id, amount) {
    assert_request_does_not_exist(request_id);
    assert_valid_amount(amount);

    let request = ViewingRequest {
        request_id,
        tenant,
        listing_id,
        amount,
        proof_hash: None,
        proof_status: ProofStatus::NotSubmitted,
        access_status: AccessStatus::Locked,
        created_at: env.ledger().timestamp(),
        verified_at: None,
    };

    store_request(request);
    emit_request_created(request_id, tenant, listing_id, amount);
}
```

```rust
pub fn submit_proof(env, request_id, proof_hash, public_inputs) {
    let request = get_request(request_id);
    assert_not_verified(request);
    assert_valid_public_inputs(request, public_inputs);

    request.proof_hash = Some(proof_hash);
    request.proof_status = ProofStatus::Submitted;

    store_request(request);
    emit_proof_submitted(request_id, proof_hash);
}
```

```rust
pub fn verify_proof(env, request_id, proof_data) {
    let request = get_request(request_id);
    assert_proof_submitted(request);

    let is_valid = verify_with_verifier(proof_data, request.public_inputs);

    if is_valid {
        request.proof_status = ProofStatus::Verified;
        request.access_status = AccessStatus::Unlocked;
        request.verified_at = env.ledger().timestamp();

        emit_proof_verified(request_id, request.proof_hash);
        emit_access_granted(request_id, request.tenant, request.listing_id);
    } else {
        request.proof_status = ProofStatus::Failed;
        request.access_status = AccessStatus::Locked;

        emit_proof_failed(request_id, request.proof_hash, "INVALID_PROOF");
    }

    store_request(request);
}
```

---

## 24. MVP Limitation Statement

For the hackathon MVP, the contract may support one of two approaches:

## Approach A: Full On-Chain Verification

The proof is verified directly by the Soroban contract.

```text
Best technical alignment
Stronger hackathon story
More complex implementation
```

## Approach B: Verification-State Recording

The proof is verified by an external proof service, and the Soroban contract records the verification outcome.

```text
Easier to complete in MVP
Still demonstrates Stellar integration
Must be clearly documented
Should not pretend to be full on-chain proof verification
```

Recommended priority:

```text
Attempt Approach A first.
Use Approach B only if full verifier integration cannot be completed in time.
Document the limitation honestly.
```

---

## 25. Contract Security Checklist

```text
Request IDs are unique.
Proofs are bound to request IDs.
Proofs are bound to listing IDs.
Proofs are bound to required fee.
Used proof hashes cannot be reused.
Private inputs are never stored.
Access remains locked after failed proof.
Only authorized admin can revoke access.
Contract events are emitted for important changes.
Backend audit logs mirror contract events.
No seed phrases or private keys are collected.
MVP escrow is not presented as legal escrow.
```

---

## 26. Final Contract Summary

The **UrbanRentishaTrustVerifier** contract is the trust anchor for verified viewing access.

It confirms that a tenant’s payment proof has been verified before the application unlocks a viewing code.

The contract keeps the MVP focused on one important real-world trust moment:

```text
Proof verified
Access unlocked
Viewing code generated
Audit trail recorded
```

This gives UrbanRentisha TrustLayer a clear Web3 purpose: using Stellar and zero-knowledge proof verification to make rental viewing access safer, more private, and more trustworthy.
