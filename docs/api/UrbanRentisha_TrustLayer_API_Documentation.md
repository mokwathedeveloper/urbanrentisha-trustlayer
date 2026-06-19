# UrbanRentisha TrustLayer API Documentation

## 1. Document Purpose

This document defines the API structure for **UrbanRentisha TrustLayer**, a ZK-powered rental trust and payment-verification platform built on Stellar.

The APIs support the main product flow:

```text
Tenant requests viewing
Tenant pays through Stellar testnet
Tenant generates ZK payment proof
Soroban verifies proof
UrbanRentisha unlocks viewing code
Admin audit log records the event
```

The API is designed for:

```text
Next.js frontend client
NestJS backend services
Tenant dashboard
Property manager dashboard
Admin dashboard
External rental platforms
Demo mode
Future third-party integrations
```

---

## 2. API Design Principles

The UrbanRentisha API must follow these principles:

```text
Clear resource-based URLs
Consistent response format
Strict request validation
Role-based authorization
Safe error messages
Audit logging for important actions
No private keys or seed phrases
No unnecessary wallet-history exposure
Simple human-readable status values
Developer-friendly external API design
```

The API should make it easy to understand the status of a viewing request at every stage.

---

## 3. Base URLs

## 3.1 Local Development

```text
Frontend: http://localhost:3000
Backend:  http://localhost:4000
```

## 3.2 Staging

```text
Frontend: https://staging.urbanrentisha.app
Backend:  https://api-staging.urbanrentisha.app
```

## 3.3 Production Direction

```text
Frontend: https://urbanrentisha.app
Backend:  https://api.urbanrentisha.app
```

---

## 4. API Versioning

Recommended versioning strategy:

```text
/api/v1
```

Example:

```text
GET /api/v1/listings
POST /api/v1/viewing-requests
POST /api/v1/proofs/generate
```

For hackathon MVP, `/api` can be used first, but `/api/v1` is recommended for a professional structure.

---

## 5. Authentication

## 5.1 User Authentication

The MVP can support:

```text
Email/password demo login
Demo tenant login
Demo manager login
Demo admin login
Wallet-linked demo account
```

Recommended authentication method:

```text
JWT access token
Refresh token or session strategy if needed
```

## 5.2 Authorization Header

Authenticated frontend requests should include:

```http
Authorization: Bearer <access_token>
```

## 5.3 External API Authentication

External rental platforms should use API keys.

```http
x-api-key: <api_key>
```

For production, API keys should be scoped, rate-limited, and rotated.

---

## 6. User Roles

The platform supports the following roles:

```text
TENANT
AGENT
MANAGER
ADMIN
API_CLIENT
```

## 6.1 Role Permissions Summary

| Role | Main Permissions |
|---|---|
| `TENANT` | Browse listings, request viewing, pay, generate proof, view own code, report listing. |
| `AGENT` | Manage own listings, view related viewing requests, view reports linked to own listings. |
| `MANAGER` | Manage assigned listings, verified tenants, reports, escrow/payment-hold status. |
| `ADMIN` | Approve listings, verify agents, review reports, view audit logs, monitor platform activity. |
| `API_CLIENT` | Use external platform endpoints according to API key scope. |

---

## 7. Standard Response Format

## 7.1 Success Response

```json
{
  "success": true,
  "message": "Request completed successfully.",
  "data": {}
}
```

## 7.2 Error Response

```json
{
  "success": false,
  "message": "Validation failed.",
  "error": {
    "code": "VALIDATION_ERROR",
    "details": []
  }
}
```

## 7.3 Paginated Response

```json
{
  "success": true,
  "message": "Records retrieved successfully.",
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 120,
      "totalPages": 6
    }
  }
}
```

---

## 8. Common HTTP Status Codes

| Code | Meaning |
|---|---|
| `200` | Request successful. |
| `201` | Resource created. |
| `400` | Invalid request body or parameters. |
| `401` | Authentication required. |
| `403` | User does not have permission. |
| `404` | Resource not found. |
| `409` | Conflict or duplicate action. |
| `422` | Business rule failed. |
| `429` | Too many requests. |
| `500` | Server error. |

---

## 9. Common Error Codes

```text
VALIDATION_ERROR
AUTH_REQUIRED
ACCESS_DENIED
RESOURCE_NOT_FOUND
LISTING_NOT_VERIFIED
PAYMENT_NOT_CONFIRMED
PROOF_NOT_READY
PROOF_GENERATION_FAILED
PROOF_VERIFICATION_FAILED
VIEWING_CODE_NOT_FOUND
VIEWING_CODE_EXPIRED
REPORT_ALREADY_SUBMITTED
RATE_LIMIT_EXCEEDED
INTERNAL_SERVER_ERROR
```

---

## 10. Status Enums

## 10.1 User Role

```text
TENANT
AGENT
MANAGER
ADMIN
API_CLIENT
```

## 10.2 Listing Verification Status

```text
PENDING
VERIFIED
REJECTED
SUSPENDED
```

## 10.3 Viewing Request Status

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

## 10.4 Payment Status

```text
PENDING
INITIATED
RECEIVED
FAILED
REFUNDED
```

## 10.5 Proof Status

```text
NOT_STARTED
GENERATING
GENERATED
SUBMITTED
VERIFIED
FAILED
```

## 10.6 Escrow / Payment-Hold Status

```text
NOT_STARTED
PENDING
ACTIVE
RELEASED
REFUNDED
FAILED
```

## 10.7 Access Status

```text
LOCKED
UNLOCKED
EXPIRED
REVOKED
```

## 10.8 Report Status

```text
OPEN
UNDER_REVIEW
RESOLVED
DISMISSED
```

---

## 11. Auth APIs

## 11.1 Register User

```http
POST /api/v1/auth/register
```

### Purpose

Creates a new user account.

### Roles

```text
Public
```

### Request Body

```json
{
  "name": "Amara Okafor",
  "email": "amara@example.com",
  "password": "StrongPassword123",
  "role": "TENANT"
}
```

### Response

```json
{
  "success": true,
  "message": "Account created successfully.",
  "data": {
    "user": {
      "id": "user_123",
      "name": "Amara Okafor",
      "email": "amara@example.com",
      "role": "TENANT"
    },
    "accessToken": "jwt_token_here"
  }
}
```

---

## 11.2 Login

```http
POST /api/v1/auth/login
```

### Purpose

Authenticates a user.

### Request Body

```json
{
  "email": "amara@example.com",
  "password": "StrongPassword123"
}
```

### Response

```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "user": {
      "id": "user_123",
      "name": "Amara Okafor",
      "email": "amara@example.com",
      "role": "TENANT"
    },
    "accessToken": "jwt_token_here"
  }
}
```

---

## 11.3 Get Current User

```http
GET /api/v1/auth/me
```

### Purpose

Returns the authenticated user profile.

### Roles

```text
TENANT
AGENT
MANAGER
ADMIN
API_CLIENT
```

### Response

```json
{
  "success": true,
  "message": "Current user retrieved successfully.",
  "data": {
    "id": "user_123",
    "name": "Amara Okafor",
    "email": "amara@example.com",
    "role": "TENANT",
    "walletAddress": "GABC..."
  }
}
```

---

## 12. Listing APIs

## 12.1 Get Listings

```http
GET /api/v1/listings
```

### Purpose

Returns property listings.

### Query Parameters

| Parameter | Type | Description |
|---|---|---|
| `location` | string | Filter by location. |
| `minRent` | number | Minimum rent. |
| `maxRent` | number | Maximum rent. |
| `verified` | boolean | Show verified listings only. |
| `page` | number | Page number. |
| `limit` | number | Page size. |

### Response

```json
{
  "success": true,
  "message": "Listings retrieved successfully.",
  "data": {
    "items": [
      {
        "id": "listing_001",
        "title": "Modern 2BR Apartment",
        "location": "Kilimani, Nairobi",
        "rentAmount": 65000,
        "viewingFee": 1000,
        "imageUrl": "/images/demo/apartment.jpg",
        "agent": {
          "id": "agent_001",
          "name": "Urban Homes Agency",
          "verificationStatus": "VERIFIED",
          "trustScore": 92
        },
        "verificationStatus": "VERIFIED"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 1,
      "totalPages": 1
    }
  }
}
```

---

## 12.2 Get Listing Details

```http
GET /api/v1/listings/:id
```

### Purpose

Returns details for a single property listing.

### Response

```json
{
  "success": true,
  "message": "Listing retrieved successfully.",
  "data": {
    "id": "listing_001",
    "title": "Modern 2BR Apartment",
    "location": "Kilimani, Nairobi",
    "rentAmount": 65000,
    "viewingFee": 1000,
    "description": "A verified two-bedroom apartment near public transport.",
    "verificationStatus": "VERIFIED",
    "agent": {
      "id": "agent_001",
      "name": "Urban Homes Agency",
      "verificationStatus": "VERIFIED",
      "trustScore": 92,
      "reportCount": 1,
      "verifiedViewingRequests": 48
    }
  }
}
```

---

## 12.3 Create Listing

```http
POST /api/v1/listings
```

### Roles

```text
AGENT
MANAGER
ADMIN
```

### Request Body

```json
{
  "title": "Modern 2BR Apartment",
  "location": "Kilimani, Nairobi",
  "rentAmount": 65000,
  "viewingFee": 1000,
  "imageUrl": "/images/demo/apartment.jpg",
  "description": "Verified rental property with secure viewing access."
}
```

### Response

```json
{
  "success": true,
  "message": "Listing created successfully.",
  "data": {
    "id": "listing_001",
    "verificationStatus": "PENDING"
  }
}
```

---

## 12.4 Approve Listing

```http
PATCH /api/v1/listings/:id/approve
```

### Roles

```text
ADMIN
```

### Request Body

```json
{
  "verificationStatus": "VERIFIED"
}
```

### Response

```json
{
  "success": true,
  "message": "Listing approved successfully.",
  "data": {
    "id": "listing_001",
    "verificationStatus": "VERIFIED"
  }
}
```

---

## 12.5 Report Listing

```http
POST /api/v1/listings/:id/report
```

### Roles

```text
TENANT
```

### Request Body

```json
{
  "reason": "PAYMENT_SCAM",
  "description": "The agent requested payment outside the platform."
}
```

### Response

```json
{
  "success": true,
  "message": "Report submitted for admin review.",
  "data": {
    "reportId": "report_001",
    "status": "OPEN"
  }
}
```

---

## 13. Viewing Request APIs

## 13.1 Create Viewing Request

```http
POST /api/v1/viewing-requests
```

### Purpose

Creates a viewing request linked to a tenant, property listing, agent, and required viewing fee.

### Roles

```text
TENANT
```

### Request Body

```json
{
  "listingId": "listing_001"
}
```

### Response

```json
{
  "success": true,
  "message": "Viewing request created successfully.",
  "data": {
    "id": "vr_123",
    "listingId": "listing_001",
    "paymentStatus": "PENDING",
    "proofStatus": "NOT_STARTED",
    "escrowStatus": "NOT_STARTED",
    "accessStatus": "LOCKED",
    "requiredViewingFee": 1000
  }
}
```

---

## 13.2 Get Viewing Request

```http
GET /api/v1/viewing-requests/:id
```

### Roles

```text
TENANT
AGENT
MANAGER
ADMIN
```

### Response

```json
{
  "success": true,
  "message": "Viewing request retrieved successfully.",
  "data": {
    "id": "vr_123",
    "tenantId": "tenant_001",
    "listingId": "listing_001",
    "paymentStatus": "RECEIVED",
    "proofStatus": "VERIFIED",
    "escrowStatus": "ACTIVE",
    "accessStatus": "UNLOCKED",
    "viewingCode": {
      "code": "VIEW-8K29XQ",
      "status": "ACTIVE",
      "expiresAt": "2026-06-29T12:00:00.000Z"
    }
  }
}
```

---

## 13.3 Get Viewing Request Status

```http
GET /api/v1/viewing-requests/:id/status
```

### Response

```json
{
  "success": true,
  "message": "Viewing request status retrieved successfully.",
  "data": {
    "viewingRequestId": "vr_123",
    "status": "ACCESS_UNLOCKED",
    "paymentStatus": "RECEIVED",
    "proofStatus": "VERIFIED",
    "escrowStatus": "ACTIVE",
    "accessStatus": "UNLOCKED"
  }
}
```

---

## 14. Payment APIs

## 14.1 Create Payment

```http
POST /api/v1/payments/create
```

### Purpose

Creates a payment record for a viewing request.

### Roles

```text
TENANT
```

### Request Body

```json
{
  "viewingRequestId": "vr_123",
  "asset": "XLM"
}
```

### Response

```json
{
  "success": true,
  "message": "Payment record created successfully.",
  "data": {
    "paymentId": "pay_001",
    "viewingRequestId": "vr_123",
    "amount": 1000,
    "asset": "XLM",
    "network": "STELLAR_TESTNET",
    "destinationAddress": "GDESTINATION...",
    "paymentStatus": "INITIATED"
  }
}
```

---

## 14.2 Confirm Payment

```http
POST /api/v1/payments/confirm
```

### Purpose

Confirms that a Stellar testnet payment was completed.

### Request Body

```json
{
  "paymentId": "pay_001",
  "stellarTxHash": "abc123stellarhash"
}
```

### Response

```json
{
  "success": true,
  "message": "Payment confirmed successfully.",
  "data": {
    "paymentId": "pay_001",
    "paymentStatus": "RECEIVED",
    "stellarTxHash": "abc123stellarhash",
    "nextStep": "GENERATE_PROOF"
  }
}
```

---

## 14.3 Get Payment Status

```http
GET /api/v1/payments/:id/status
```

### Response

```json
{
  "success": true,
  "message": "Payment status retrieved successfully.",
  "data": {
    "paymentId": "pay_001",
    "paymentStatus": "RECEIVED",
    "asset": "XLM",
    "amount": 1000,
    "stellarTxHash": "abc123stellarhash"
  }
}
```

---

## 15. ZK Proof APIs

## 15.1 Generate Proof

```http
POST /api/v1/proofs/generate
```

### Purpose

Starts off-chain ZK proof generation after payment is received.

### Roles

```text
TENANT
```

### Request Body

```json
{
  "viewingRequestId": "vr_123"
}
```

### Response

```json
{
  "success": true,
  "message": "Proof generation started.",
  "data": {
    "proofId": "proof_001",
    "viewingRequestId": "vr_123",
    "proofStatus": "GENERATING"
  }
}
```

---

## 15.2 Submit Proof

```http
POST /api/v1/proofs/submit
```

### Purpose

Submits a generated proof for verification.

### Roles

```text
TENANT
ADMIN
```

### Request Body

```json
{
  "proofId": "proof_001"
}
```

### Response

```json
{
  "success": true,
  "message": "Proof submitted for verification.",
  "data": {
    "proofId": "proof_001",
    "proofStatus": "SUBMITTED"
  }
}
```

---

## 15.3 Verify Proof

```http
POST /api/v1/proofs/verify
```

### Purpose

Verifies the proof through the Soroban verifier contract or verification service.

### Request Body

```json
{
  "proofId": "proof_001",
  "viewingRequestId": "vr_123"
}
```

### Response

```json
{
  "success": true,
  "message": "Proof verified successfully.",
  "data": {
    "proofId": "proof_001",
    "proofStatus": "VERIFIED",
    "accessStatus": "UNLOCKED",
    "verificationTxHash": "stellar_contract_tx_hash"
  }
}
```

---

## 15.4 Get Proof Status

```http
GET /api/v1/proofs/:id/status
```

### Response

```json
{
  "success": true,
  "message": "Proof status retrieved successfully.",
  "data": {
    "proofId": "proof_001",
    "viewingRequestId": "vr_123",
    "proofStatus": "VERIFIED",
    "publicInputs": {
      "requestId": "REQ-123",
      "listingId": "listing_001",
      "requiredViewingFee": 1000,
      "paymentCommitment": "0xabc123"
    }
  }
}
```

---

## 16. Viewing Code APIs

## 16.1 Generate Viewing Code

```http
POST /api/v1/viewing-codes/generate
```

### Purpose

Generates a unique viewing code after proof verification succeeds.

### Roles

```text
SYSTEM
ADMIN
```

### Request Body

```json
{
  "viewingRequestId": "vr_123"
}
```

### Response

```json
{
  "success": true,
  "message": "Viewing code generated successfully.",
  "data": {
    "code": "VIEW-8K29XQ",
    "status": "ACTIVE",
    "expiresAt": "2026-06-29T12:00:00.000Z"
  }
}
```

---

## 16.2 Verify Viewing Code

```http
GET /api/v1/viewing-codes/:code/verify
```

### Purpose

Checks whether a viewing code is valid.

### Roles

```text
TENANT
AGENT
MANAGER
ADMIN
API_CLIENT
```

### Response

```json
{
  "success": true,
  "message": "Viewing code is valid.",
  "data": {
    "code": "VIEW-8K29XQ",
    "status": "ACTIVE",
    "listingId": "listing_001",
    "tenantId": "tenant_001",
    "expiresAt": "2026-06-29T12:00:00.000Z"
  }
}
```

---

## 16.3 Revoke Viewing Code

```http
PATCH /api/v1/viewing-codes/:code/revoke
```

### Roles

```text
ADMIN
MANAGER
```

### Request Body

```json
{
  "reason": "Suspicious activity detected."
}
```

### Response

```json
{
  "success": true,
  "message": "Viewing code revoked successfully.",
  "data": {
    "code": "VIEW-8K29XQ",
    "status": "REVOKED"
  }
}
```

---

## 17. Agent APIs

## 17.1 Get Agent Trust Profile

```http
GET /api/v1/agents/:id/trust-profile
```

### Response

```json
{
  "success": true,
  "message": "Agent trust profile retrieved successfully.",
  "data": {
    "agentId": "agent_001",
    "name": "Urban Homes Agency",
    "verificationStatus": "VERIFIED",
    "listedProperties": 12,
    "verifiedViewingRequests": 48,
    "reportCount": 2,
    "trustScore": 92
  }
}
```

---

## 17.2 Verify Agent

```http
PATCH /api/v1/agents/:id/verify
```

### Roles

```text
ADMIN
```

### Request Body

```json
{
  "verificationStatus": "VERIFIED",
  "notes": "Documents reviewed and approved."
}
```

### Response

```json
{
  "success": true,
  "message": "Agent verified successfully.",
  "data": {
    "agentId": "agent_001",
    "verificationStatus": "VERIFIED"
  }
}
```

---

## 18. Notification APIs

## 18.1 Get Notifications

```http
GET /api/v1/notifications
```

### Roles

```text
TENANT
AGENT
MANAGER
ADMIN
```

### Response

```json
{
  "success": true,
  "message": "Notifications retrieved successfully.",
  "data": [
    {
      "id": "notif_001",
      "title": "Proof verified",
      "message": "Your proof was verified. Viewing access is now unlocked.",
      "status": "UNREAD",
      "createdAt": "2026-06-18T10:00:00.000Z"
    }
  ]
}
```

---

## 18.2 Mark Notification as Read

```http
PATCH /api/v1/notifications/:id/read
```

### Response

```json
{
  "success": true,
  "message": "Notification marked as read.",
  "data": {
    "id": "notif_001",
    "status": "READ"
  }
}
```

---

## 19. Admin APIs

## 19.1 Get Admin Dashboard

```http
GET /api/v1/admin/dashboard
```

### Roles

```text
ADMIN
```

### Response

```json
{
  "success": true,
  "message": "Admin dashboard retrieved successfully.",
  "data": {
    "metrics": {
      "totalListings": 120,
      "pendingListings": 8,
      "openReports": 3,
      "verifiedProofs": 42,
      "failedProofs": 2,
      "unlockedViewingCodes": 39
    }
  }
}
```

---

## 19.2 Get Audit Logs

```http
GET /api/v1/admin/audit-logs
```

### Query Parameters

| Parameter | Type | Description |
|---|---|---|
| `action` | string | Filter by action. |
| `actorRole` | string | Filter by actor role. |
| `entityType` | string | Filter by entity type. |
| `from` | string | Start date. |
| `to` | string | End date. |

### Response

```json
{
  "success": true,
  "message": "Audit logs retrieved successfully.",
  "data": {
    "items": [
      {
        "id": "audit_001",
        "actorId": "system",
        "actorRole": "SYSTEM",
        "action": "PROOF_VERIFIED",
        "entityType": "VIEWING_REQUEST",
        "entityId": "vr_123",
        "metadata": {
          "proofId": "proof_001",
          "verificationTxHash": "stellar_contract_tx_hash"
        },
        "createdAt": "2026-06-18T10:00:00.000Z"
      }
    ]
  }
}
```

---

## 19.3 Review Report

```http
PATCH /api/v1/admin/reports/:id/review
```

### Roles

```text
ADMIN
```

### Request Body

```json
{
  "status": "RESOLVED",
  "adminNotes": "Listing was suspended after review."
}
```

### Response

```json
{
  "success": true,
  "message": "Report reviewed successfully.",
  "data": {
    "reportId": "report_001",
    "status": "RESOLVED"
  }
}
```

---

## 20. Analytics APIs

## 20.1 Get Admin Analytics

```http
GET /api/v1/admin/analytics
```

### Roles

```text
ADMIN
```

### Response

```json
{
  "success": true,
  "message": "Analytics retrieved successfully.",
  "data": {
    "viewingRequestsCreated": 100,
    "paymentsCompleted": 82,
    "proofsGenerated": 76,
    "proofsVerified": 72,
    "proofFailures": 4,
    "viewingCodesUnlocked": 70,
    "fakeListingReports": 6,
    "averagePaymentToUnlockMinutes": 3.4
  }
}
```

---

## 21. External Rental Platform APIs

External APIs allow partner rental platforms to integrate with UrbanRentisha TrustLayer.

## 21.1 Create External Viewing Request

```http
POST /api/v1/external/viewing-requests
```

### Authentication

```http
x-api-key: <api_key>
```

### Request Body

```json
{
  "externalListingId": "partner_listing_001",
  "tenantReference": "tenant_ref_001",
  "requiredViewingFee": 1000,
  "agentReference": "agent_ref_001"
}
```

### Response

```json
{
  "success": true,
  "message": "External viewing request created successfully.",
  "data": {
    "urbanRentishaRequestId": "vr_123",
    "status": "PAYMENT_PENDING"
  }
}
```

---

## 21.2 Check External Viewing Request Status

```http
GET /api/v1/external/viewing-requests/:id/status
```

### Response

```json
{
  "success": true,
  "message": "External viewing request status retrieved successfully.",
  "data": {
    "urbanRentishaRequestId": "vr_123",
    "paymentStatus": "RECEIVED",
    "proofStatus": "VERIFIED",
    "accessStatus": "UNLOCKED",
    "viewingCodeStatus": "ACTIVE"
  }
}
```

---

## 21.3 Verify External Viewing Code

```http
GET /api/v1/external/viewing-codes/:code/verify
```

### Response

```json
{
  "success": true,
  "message": "Viewing code verified successfully.",
  "data": {
    "code": "VIEW-8K29XQ",
    "status": "ACTIVE",
    "urbanRentishaRequestId": "vr_123"
  }
}
```

---

## 22. Webhook Design

## 22.1 Webhook Events

Future partner integrations can receive webhooks for:

```text
viewing_request.created
payment.received
proof.generated
proof.verified
proof.failed
viewing_code.generated
viewing_code.revoked
listing.reported
report.reviewed
```

## 22.2 Webhook Payload Example

```json
{
  "event": "proof.verified",
  "timestamp": "2026-06-18T10:00:00.000Z",
  "data": {
    "viewingRequestId": "vr_123",
    "proofId": "proof_001",
    "accessStatus": "UNLOCKED"
  }
}
```

## 22.3 Webhook Security

Production webhooks should use:

```text
Signature headers
Timestamp validation
Replay protection
Retry policy
Delivery logs
```

---

## 23. Demo Mode APIs

## 23.1 Start Demo Flow

```http
POST /api/v1/demo/start
```

### Purpose

Creates or resets demo data for hackathon judges.

### Response

```json
{
  "success": true,
  "message": "Demo mode started.",
  "data": {
    "demoTenantId": "tenant_demo",
    "demoListingId": "listing_demo",
    "demoManagerId": "manager_demo",
    "demoAdminId": "admin_demo"
  }
}
```

## 23.2 Simulate Demo Payment

```http
POST /api/v1/demo/payments/simulate
```

### Request Body

```json
{
  "viewingRequestId": "vr_demo"
}
```

### Response

```json
{
  "success": true,
  "message": "Demo payment simulated successfully.",
  "data": {
    "paymentStatus": "RECEIVED",
    "stellarTxHash": "demo_stellar_tx_hash"
  }
}
```

## 23.3 Simulate Demo Proof Verification

```http
POST /api/v1/demo/proofs/verify
```

### Response

```json
{
  "success": true,
  "message": "Demo proof verified successfully.",
  "data": {
    "proofStatus": "VERIFIED",
    "accessStatus": "UNLOCKED",
    "viewingCode": "VIEW-DEMO01"
  }
}
```

---

## 24. Audit Log Requirements

Important API actions must create audit logs.

Audit-worthy actions:

```text
USER_REGISTERED
LISTING_CREATED
LISTING_APPROVED
VIEWING_REQUEST_CREATED
PAYMENT_INITIATED
PAYMENT_RECEIVED
PROOF_GENERATION_STARTED
PROOF_GENERATED
PROOF_SUBMITTED
PROOF_VERIFIED
PROOF_FAILED
VIEWING_CODE_GENERATED
ACCESS_UNLOCKED
LISTING_REPORTED
REPORT_REVIEWED
AGENT_VERIFIED
API_CLIENT_CREATED
EXTERNAL_API_REQUEST_RECEIVED
```

Audit log metadata should include:

```text
actorId
actorRole
action
entityType
entityId
metadata
createdAt
```

---

## 25. Rate Limiting

Recommended limits:

| API Area | Suggested Limit |
|---|---|
| Auth login | 5 attempts per 15 minutes |
| Public listings | 100 requests per minute |
| Viewing request creation | 10 requests per hour per tenant |
| Report listing | 5 reports per hour per tenant |
| Proof generation | 5 requests per hour per viewing request |
| External API | Based on API client plan |

---

## 26. Security Rules

The API must enforce:

```text
No private keys in requests
No seed phrase collection
Request body validation
Role-based access control
Server-side ownership checks
API key hashing
Rate limiting
Audit logging
Webhook signatures
Safe error messages
No access unlock before proof verification
```

---

## 27. Privacy Rules

The API should not expose:

```text
Tenant private payment secret
Private proof witness
Full wallet transaction history
Unrelated wallet activity
Internal verification secrets
Sensitive admin notes to tenants
API key raw values after creation
```

The API may expose:

```text
Payment status
Transaction hash
Proof status
Verification status
Viewing code after access unlock
Public proof inputs
Agent trust profile
Listing verification status
```

---

## 28. API Implementation Checklist

```text
Create NestJS controllers
Create DTOs for all request bodies
Add validation decorators
Add role guards
Add API key guard
Add Prisma service
Add audit log service
Add consistent response wrapper
Add error filter
Add pagination helper
Add listing APIs
Add viewing request APIs
Add payment APIs
Add ZK proof APIs
Add viewing code APIs
Add notification APIs
Add admin APIs
Add external platform APIs
Add demo APIs
Add Swagger/OpenAPI docs
Add tests
```

---

## 29. OpenAPI / Swagger Recommendation

The NestJS backend should expose Swagger documentation.

Recommended path:

```text
/api/docs
```

Swagger should include:

```text
Authentication examples
Request body schemas
Response schemas
Error schemas
Role requirements
External API key examples
Demo mode endpoints
```

---

## 30. Final API Summary

UrbanRentisha TrustLayer APIs are designed around a single trust flow:

```text
Tenant creates viewing request
Tenant completes Stellar testnet payment
Tenant generates ZK proof
Proof is verified through Soroban
Viewing code is generated
Access is unlocked
Audit log records the event
```

The API design supports both the hackathon MVP and future B2B SaaS integrations. It keeps the system clear, secure, privacy-aware, and developer-ready.
