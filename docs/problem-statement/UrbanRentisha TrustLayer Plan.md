# Problem, Solution, and Execution Plan

## 1\. Problem

Rental scams remain a serious trust problem in many housing markets. Tenants often pay viewing fees, reservation fees, or deposits to people claiming to be legitimate agents or landlords, only to later discover that the property is fake, already occupied, wrongly represented, or controlled by an unverified person.

At the same time, genuine property managers and rental platforms face a different problem. They need to identify serious tenants before releasing sensitive viewing details, agent contacts, or appointment information. However, many current verification methods depend on screenshots, mobile money receipts, phone calls, manual confirmation, or informal trust. These methods are slow, easy to fake, difficult to audit, and often expose unnecessary personal or financial information.

The core problem UrbanRentisha TrustLayer addresses is this:

Tenants need a safer way to prove they completed a required rental viewing payment, while rental platforms need a reliable way to verify that payment condition without exposing unnecessary wallet history, private transaction activity, or relying on fakeable proof such as screenshots.

## 2\. Solution

UrbanRentisha TrustLayer is a ZK-powered rental trust and payment-verification layer built on Stellar. It allows tenants to privately prove that they have completed a required viewing or reservation payment before private property access details are unlocked.

The system works through a simple trust flow. A tenant selects a verified rental listing, requests viewing access, completes a Stellar testnet payment, generates a zero-knowledge proof off-chain, and submits that proof to a Stellar Soroban smart contract for verification. If the proof is valid, the smart contract marks the viewing request as verified, and the platform unlocks a unique viewing code or controlled agent contact details.

Zero-knowledge proof technology is load-bearing in the product because it is not only mentioned in the project description. It directly controls access to viewing details. The tenant must generate a valid proof that the required payment condition has been satisfied. Without successful proof verification, access remains locked.

Stellar is also load-bearing in the product. The MVP uses Stellar testnet payment and Soroban smart contract verification to create a trusted record of viewing request status, proof verification outcome, and access eligibility. This makes the product more transparent, auditable, and suitable for real-world rental platforms.

## 3\. Why This Solution Matters

UrbanRentisha TrustLayer creates value for three main groups.

For tenants, it reduces exposure to fake agents and protects them from sharing unnecessary wallet details or payment history.

For property managers, it reduces manual payment confirmation, filters unserious inquiries, and creates a trusted verification record.

For rental platforms, it provides reusable fraud-prevention infrastructure that can be integrated into existing marketplaces through dashboards and API endpoints.

The solution is intentionally focused. It does not attempt to build a full rental marketplace, lease system, or production escrow platform. Instead, it focuses on one high-value trust moment: proving that a payment condition has been satisfied before verified rental access is released.

## 4\. Execution Plan

### Phase 1: Product Foundation

The first phase focuses on defining the core product flow, user roles, and data structure. The system will support tenants, property managers, and administrators. Sample verified properties, agent profiles, viewing fees, and tenant demo accounts will be created for the hackathon demo.

Key outputs:

- Product scope finalized
- Core user journey mapped
- Demo property data prepared
- Tenant, manager, and admin roles defined
- Viewing request status model created

### Phase 2: Frontend Experience

The second phase focuses on building the user interface. The frontend will include property listings, property details, tenant dashboard, viewing request tracker, payment screen, proof generation screen, proof verification screen, viewing code page, manager dashboard, admin dashboard, reports page, and demo mode.

Key outputs:

- Property listing page
- Verified property badge
- Request viewing button
- Tenant dashboard
- Proof status tracker
- Viewing code unlock page
- Admin audit log
- Demo mode for judges

### Phase 3: Stellar Payment Integration

The third phase integrates Stellar testnet payment into the viewing request flow. When a tenant requests a viewing, the system creates a unique viewing request linked to the selected property, tenant wallet, required viewing fee, and payment status.

Key outputs:

- Stellar testnet account support
- Testnet XLM payment flow
- Payment status tracking
- Payment reference linked to viewing request
- Payment received state displayed in the frontend

### Phase 4: ZK Proof Generation

The fourth phase implements off-chain zero-knowledge proof generation. The proof will show that the tenant satisfied the required viewing payment condition for a specific listing without revealing unrelated wallet activity or full transaction history.

Recommended proof statement:

The tenant knows a valid payment reference or commitment that satisfies the required viewing fee for a specific property listing.

Key outputs:

- Simple ZK circuit or proof logic
- Public inputs defined
- Private inputs defined
- Proof generated after payment
- Proof status updated in the frontend

### Phase 5: Soroban Smart Contract Verification

The fifth phase connects the generated proof to a Stellar Soroban smart contract. The smart contract verifies the proof or records the verification outcome and updates the viewing request status.

Key contract functions:

- create_request
- submit_proof
- verify_proof
- get_access_status

Key outputs:

- Soroban contract deployed on Stellar testnet
- Proof submitted from frontend or backend
- Verification result stored
- Viewing request marked as verified
- Access eligibility returned to the app

### Phase 6: Access Unlock and Viewing Code

The sixth phase completes the tenant flow by unlocking viewing details only after successful proof verification. The system generates a unique viewing code linked to the property, tenant, and viewing request.

Key outputs:

- Viewing code generated
- Agent contact or viewing details unlocked
- Access status updated
- Tenant notification shown
- Admin audit event recorded

### Phase 7: Trust and Safety Features

The seventh phase adds the supporting anti-scam features. Tenants can report suspicious listings, agents have verification profiles, and administrators can review reports and monitor suspicious activity.

Key outputs:

- Fake listing report button
- Report reason form
- Agent verification profile
- Trust score display
- Report count tracking
- Admin review screen

### Phase 8: B2B SaaS Layer

The eighth phase adds SaaS credibility by exposing a lightweight API layer and dashboards for property managers and administrators. This shows how UrbanRentisha TrustLayer can later be integrated into real rental marketplaces.

Recommended API endpoints:

- POST /api/viewing-requests
- GET /api/viewing-requests/:id/status
- POST /api/proofs/verify
- POST /api/listings/:id/report
- GET /api/agents/:id/trust-profile
- GET /api/viewing-codes/:code/verify

Key outputs:

- Basic API routes
- API documentation page
- Manager dashboard
- Admin dashboard
- Audit log
- Notification feed

## 5\. Demo Execution Flow

The hackathon demo will follow one complete tenant journey:

1.  The tenant opens UrbanRentisha TrustLayer.
2.  The tenant views verified rental listings.
3.  The tenant selects a property and clicks “Request Viewing.”
4.  The system creates a viewing request.
5.  The tenant completes a Stellar testnet payment.
6.  The app marks the payment as received.
7.  The tenant generates a zero-knowledge proof.
8.  The proof is submitted to a Soroban smart contract.
9.  The contract verifies the proof.
10. The viewing request becomes verified.
11. The system generates a unique viewing code.
12. The tenant sees the unlocked viewing details.
13. The admin dashboard records the full audit trail.

## 6\. Success Criteria

The MVP will be considered successful if a judge can complete the full demo flow and clearly understand where ZK and Stellar are used.

Success means:

- A tenant can request viewing access.
- A Stellar testnet payment is completed or simulated.
- A ZK proof is generated after payment.
- A Soroban smart contract verifies the proof.
- Viewing access remains locked before verification.
- Viewing access unlocks after verification.
- The admin dashboard shows the verification event.
- The product clearly solves a real-world rental trust problem.

## 7\. Final Execution Focus

The project will prioritize a complete, understandable, working trust flow over unnecessary marketplace complexity. The goal is not to build another rental listing app. The goal is to prove that zero-knowledge proofs and Stellar can power a real-world rental access verification layer.

UrbanRentisha TrustLayer will show how rental platforms can reduce scams, verify serious tenants, protect user privacy, and create a transparent audit trail using ZK proof verification on Stellar.
Additional Product Rules:

1. ZK and Stellar must be load-bearing in the UX. The interface must clearly show that the tenant cannot unlock viewing access until the payment proof is verified.

2. Use simple language for blockchain and ZK. Avoid terms that confuse non-technical tenants.

3. Design role-based experiences for tenant, property manager, and admin users.

4. Demo mode must allow judges to complete the full flow in 2–3 minutes.

5. The product should not look like a generic rental marketplace. It should look like a trust, verification, anti-scam, and access-control layer for rental platforms.

6. Core data objects are tenant, property, agent, viewing request, payment, ZK proof, proof verification result, escrow status, viewing code, report, notification, and audit log.

7. Prioritize the central product promise: A tenant privately proves payment, Stellar verifies it, and UrbanRentisha unlocks safe property access.
