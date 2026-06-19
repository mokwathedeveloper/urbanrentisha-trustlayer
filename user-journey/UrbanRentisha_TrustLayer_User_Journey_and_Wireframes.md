# UrbanRentisha TrustLayer User Journey and Wireframes

## 1. Document Purpose

This document defines the user journeys, screen flows, and low-fidelity wireframes for **UrbanRentisha TrustLayer**, a ZK-powered rental trust and payment-verification platform built on Stellar.

The purpose of this document is to guide UX/UI design, frontend implementation, backend workflow alignment, demo preparation, and product validation.

UrbanRentisha TrustLayer is designed around one central product promise:

```text
A tenant privately proves payment, Stellar verifies it, and UrbanRentisha unlocks safe property access.
```

---

## 2. Product Context

UrbanRentisha TrustLayer helps tenants safely request verified rental property viewing access. A tenant selects a verified listing, requests viewing access, pays a viewing or reservation fee through Stellar testnet, generates a zero-knowledge payment proof, verifies that proof through a Stellar/Soroban smart contract, and receives a viewing code after verification succeeds.

The platform also supports property managers, agents, administrators, and external rental platforms through dashboards, audit logs, agent trust profiles, fake listing reports, notifications, and API access.

The product should feel:

```text
Trustworthy
Professional
Human
Secure
Modern
Calm
Clear
Practical
B2B-ready
Locally relevant
```

---

## 3. Core UX Principle

The interface must make the verification journey easy to understand.

The user should always know:

```text
What step they are on
What action is required
What is being verified
What remains private
Why viewing access is locked
What unlocks access
What happens next
```

The product should avoid confusing blockchain language. ZK and Stellar should be visible in the flow but explained in simple human terms.

---

## 4. Primary User Roles

## 4.1 Tenant

The tenant wants to find a safe rental property, avoid fake agents, make a verified payment, and receive a trusted viewing code.

Tenant goals:

```text
View verified listings
Request viewing access
Pay safely through Stellar testnet
Generate private payment proof
Verify proof
Unlock viewing code
Track viewing request status
Report suspicious listings
```

Tenant fears:

```text
Paying fake agents
Losing money to fake listings
Being asked for informal payments
Sharing too much wallet information
Not knowing whether payment was received
Not understanding proof verification
```

## 4.2 Agent or Property Manager

The agent or property manager wants to list verified properties, receive serious tenant requests, reduce manual payment checks, and track viewing access.

Manager goals:

```text
Manage listed properties
View tenant requests
See verified tenants
Track escrow/payment-hold status
View generated viewing codes
Monitor reports
Maintain trust score
```

Manager fears:

```text
Too many unserious inquiries
Manual payment confirmation workload
False reports
Low trust score
Platform rejection
```

## 4.3 Platform Administrator

The admin wants to protect the platform, approve listings, verify agents, review reports, monitor proof verification, and maintain audit trails.

Admin goals:

```text
Approve verified listings
Verify agents
Review fake listing reports
Monitor proof verification activity
View audit logs
Manage suspicious activity
Track platform metrics
```

Admin fears:

```text
Fraudulent listings
Fake agents
Unclear audit trail
Disputed viewing payments
Failed proof verification
Platform trust damage
```

## 4.4 External Rental Platform

The external platform wants to integrate UrbanRentisha TrustLayer into its rental workflow using APIs.

External platform goals:

```text
Create viewing requests
Check proof status
Verify viewing codes
Retrieve agent trust profiles
Submit reports
Use trust-layer APIs
```

---

## 5. Core Tenant Journey

## 5.1 Journey Overview

```text
Discover platform
View verified property
Open property details
Request viewing
Confirm viewing fee
Pay through Stellar testnet
Generate ZK payment proof
Verify proof through Soroban
Track escrow/payment-hold status
Unlock viewing code
Use viewing code with verified agent
```

## 5.2 Tenant Journey Table

| Stage | User Action | System Response | UX Need | Success Signal |
|---|---|---|---|---|
| Discovery | Opens landing page | Explains safe verified rental access | Trust and clarity | User understands product |
| Browse | Views property listings | Shows verified listings and badges | Confidence | User identifies safe listing |
| Detail | Opens property page | Shows property, agent, fee, report option | Transparency | User understands access requirement |
| Request | Clicks Request Viewing | Creates viewing request | Clear next step | Request ID created |
| Payment | Pays viewing fee | Records Stellar transaction | Payment reassurance | Payment received |
| Proof | Generates proof | Creates ZK proof off-chain | Simple explanation | Proof generated |
| Verification | Submits proof | Soroban verifies proof | Status clarity | Proof verified |
| Access | Views code | Unlocks viewing code | Confirmation | Code visible |
| Follow-up | Tracks dashboard | Shows notifications and history | Control | Request completed |

---

## 6. Tenant Happy Path Flow

```text
Landing Page
    ↓
Signup/Login
    ↓
Tenant Onboarding
    ↓
Property Listing Page
    ↓
Property Detail Page
    ↓
Request Viewing Screen
    ↓
Stellar Payment Screen
    ↓
ZK Proof Generation Screen
    ↓
Proof Verification Screen
    ↓
Escrow/Payment-Hold Status Screen
    ↓
Viewing Code Success Screen
    ↓
Tenant Dashboard
```

---

## 7. Tenant Failure and Recovery Paths

## 7.1 Payment Failed

```text
Payment screen
    ↓
Payment failed state
    ↓
Show reason if available
    ↓
Allow retry
    ↓
Keep viewing access locked
```

UX message:

```text
Payment was not confirmed. Viewing access remains locked until payment is received and proof verification succeeds.
```

## 7.2 Proof Generation Failed

```text
Proof generation screen
    ↓
Proof failed state
    ↓
Explain issue
    ↓
Allow retry
    ↓
Keep access locked
```

UX message:

```text
We could not generate your payment proof. Please retry. Your viewing details are still protected.
```

## 7.3 Proof Verification Failed

```text
Proof verification screen
    ↓
Verification failed
    ↓
Explain proof was not accepted
    ↓
Allow retry or support/report action
    ↓
Keep access locked
```

UX message:

```text
The proof could not be verified. Viewing access remains locked for safety.
```

## 7.4 Report Suspicious Listing

```text
Property detail page
    ↓
Report Listing
    ↓
Select reason
    ↓
Submit report
    ↓
Admin review queue
    ↓
Tenant notification
```

UX message:

```text
Thank you. This report has been sent for admin review.
```

---

## 8. Manager Journey

## 8.1 Manager Journey Overview

```text
Login
    ↓
Open manager dashboard
    ↓
View listed properties
    ↓
Check viewing requests
    ↓
Review verified tenants
    ↓
Track payment/proof/access status
    ↓
Respond to viewing code activity
    ↓
Review reports received
    ↓
Monitor trust profile
```

## 8.2 Manager Journey Table

| Stage | Manager Action | System Response | UX Need | Success Signal |
|---|---|---|---|---|
| Login | Accesses dashboard | Shows overview | Quick status | Dashboard loaded |
| Listings | Reviews properties | Shows verification badge | Listing control | Listings visible |
| Requests | Opens viewing requests | Shows status tracker | Prioritization | Verified tenants clear |
| Codes | Checks viewing codes | Shows generated codes | Operational clarity | Valid codes visible |
| Reports | Reviews reports | Shows report count and reasons | Trust management | Reports triaged |
| Trust | Views profile | Shows score and verification | Credibility | Profile clear |

---

## 9. Admin Journey

## 9.1 Admin Journey Overview

```text
Login
    ↓
Open admin dashboard
    ↓
Review platform metrics
    ↓
Approve property listings
    ↓
Verify agents
    ↓
Monitor proof verification activity
    ↓
Review fake listing reports
    ↓
Inspect audit logs
    ↓
Manage suspicious activity
```

## 9.2 Admin Journey Table

| Stage | Admin Action | System Response | UX Need | Success Signal |
|---|---|---|---|---|
| Dashboard | Opens dashboard | Shows metrics and alerts | Risk overview | Key risks visible |
| Listings | Reviews pending listings | Shows approve/reject actions | Decision support | Listings processed |
| Agents | Reviews agent profile | Shows verification evidence | Trust control | Agent verified/rejected |
| Reports | Opens report queue | Shows reason and severity | Prioritization | Reports reviewed |
| Proofs | Views proof activity | Shows verified/failed proofs | Technical clarity | Issues identified |
| Audit | Opens audit logs | Shows event trail | Accountability | Event trace visible |

---

## 10. External API Client Journey

```text
External platform registers
    ↓
Receives API credentials
    ↓
Creates viewing request through API
    ↓
Checks payment/proof status
    ↓
Verifies viewing code
    ↓
Retrieves agent trust profile
    ↓
Submits report if needed
```

---

## 11. Information Architecture

## 11.1 Public Navigation

```text
Home
How It Works
Demo
API Docs
FAQ
Login
```

## 11.2 Tenant Navigation

```text
Dashboard
Listings
My Requests
Payments
Proof Status
Viewing Codes
Notifications
Reports
Profile
```

## 11.3 Manager Navigation

```text
Dashboard
Properties
Viewing Requests
Verified Tenants
Reports
Trust Profile
Settings
```

## 11.4 Admin Navigation

```text
Dashboard
Listings
Agents
Reports
Proof Activity
Audit Logs
Analytics
API Clients
Settings
```

---

## 12. Screen Inventory

## 12.1 Public Screens

```text
Landing page
Signup page
Login page
Tenant onboarding
Demo mode screen
Help/FAQ page
API documentation page
```

## 12.2 Tenant Screens

```text
Tenant dashboard
Property listing page
Search and filter page
Property detail page
Request viewing screen
Stellar payment screen
ZK proof generation screen
Proof verification screen
Escrow/payment-hold status screen
Viewing code success screen
Notifications screen
Fake listing report screen
Viewing history
Profile/settings
```

## 12.3 Manager Screens

```text
Manager dashboard
Listed properties
Viewing requests
Verified tenants
Generated viewing codes
Reports received
Agent trust profile
Manager settings
```

## 12.4 Admin Screens

```text
Admin dashboard
Property approvals
Agent verification
Fake listing reports
Proof verification activity
Escrow/payment-hold monitoring
Audit log screen
Analytics dashboard
Suspicious activity screen
API client management
```

---

## 13. Global Layout Rules

## 13.1 Desktop Layout

```text
Top navigation for public pages
Sidebar navigation for dashboards
Main content area with cards and tables
Right-side contextual help panel where useful
Clear status cards
Strong primary CTA placement
```

## 13.2 Mobile Layout

```text
Bottom navigation for tenant experience
Single-column cards
Sticky primary CTA on key screens
Collapsible filters
Step-by-step status tracker
Large tap targets
Minimal dashboard tables
```

## 13.3 Responsive Breakpoints

```text
Mobile: 360px to 767px
Tablet: 768px to 1023px
Desktop: 1024px and above
Wide dashboard: 1280px and above
```

---

## 14. Wireframe Notation

The wireframes below are low-fidelity layout guides.

Symbols:

```text
[ ] = Card, button, field, or content block
| | = Layout boundary
→ = Primary flow direction
```

---

## 15. Landing Page Wireframe

```text
+------------------------------------------------------------+
| Logo                  How It Works  Demo  API Docs  Login  |
+------------------------------------------------------------+
|                                                            |
|  Hero Section                                               |
|  [Headline: Safer rental viewing through private proof]     |
|  [Subheadline explaining payment proof and verified access] |
|  [Primary CTA: Try Demo] [Secondary CTA: View API Docs]     |
|                                                            |
|  [Trust badges: ZK Proofs | Stellar Testnet | Verified]     |
+------------------------------------------------------------+
| Problem Section                                             |
| [Fake agents] [Unsafe viewing fees] [Manual receipts]       |
+------------------------------------------------------------+
| Solution Section                                            |
| [Pay on Stellar] → [Generate proof] → [Unlock viewing code] |
+------------------------------------------------------------+
| Feature Bento Grid                                          |
| [Verified Listings] [ZK Proof] [Soroban Verification]       |
| [Viewing Codes] [Agent Trust] [Audit Logs]                  |
+------------------------------------------------------------+
| Demo Preview                                                |
| [Screenshot / Flow cards] [CTA: Start Demo]                 |
+------------------------------------------------------------+
| API for Rental Platforms                                    |
| [Endpoint examples] [CTA: Read API Docs]                    |
+------------------------------------------------------------+
| FAQ                                                         |
| [What is ZK?] [What is Stellar?] [Is this escrow?]          |
+------------------------------------------------------------+
| Final CTA                                                   |
| [Start safe viewing demo]                                   |
+------------------------------------------------------------+
```

---

## 16. Signup/Login Wireframe

```text
+--------------------------------------------+
| Logo                                       |
+--------------------------------------------+
| [Welcome back to UrbanRentisha TrustLayer] |
|                                            |
| [Email input]                              |
| [Password input]                           |
| [Login button]                             |
|                                            |
| [Continue with demo tenant]                |
| [Continue with demo manager]               |
| [Continue with demo admin]                 |
|                                            |
| [Wallet-based login option]                |
+--------------------------------------------+
| Safety note: We never ask for seed phrases |
+--------------------------------------------+
```

---

## 17. Tenant Onboarding Wireframe

```text
+------------------------------------------------+
| Step 1 of 3: What UrbanRentisha protects       |
+------------------------------------------------+
| [Illustration: verified property access]       |
| "Avoid fake listings and unsafe viewing fees." |
| [Next]                                         |
+------------------------------------------------+
| Step 2: How verification works                 |
| [Pay] → [Generate proof] → [Verify] → [Unlock] |
| [Next]                                         |
+------------------------------------------------+
| Step 3: Ready to browse verified properties    |
| [Start browsing]                               |
+------------------------------------------------+
```

---

## 18. Property Listing Page Wireframe

```text
+----------------------------------------------------------------+
| Sidebar / Topbar                                               |
+----------------------------------------------------------------+
| [Search properties] [Location filter] [Rent filter] [Verified] |
+----------------------------------------------------------------+
| [Property Card]       [Property Card]       [Property Card]    |
| Image                 Image                 Image              |
| Title                 Title                 Title              |
| Location              Location              Location           |
| Rent                  Rent                  Rent               |
| Viewing fee           Viewing fee           Viewing fee        |
| [Verified Property]   [Verified Property]   [Verified Property]|
| [Request Viewing]     [Request Viewing]     [Request Viewing]  |
| [Report Listing]      [Report Listing]      [Report Listing]   |
+----------------------------------------------------------------+
```

---

## 19. Property Detail Page Wireframe

```text
+------------------------------------------------------------+
| [Back to listings]                                         |
+------------------------------------------------------------+
| [Large property image]        [Property Summary Card]       |
|                               Title                        |
|                               Location                     |
|                               Rent                         |
|                               Viewing fee                  |
|                               [Verified Property Badge]    |
|                               [Request Viewing CTA]        |
+------------------------------------------------------------+
| Agent Trust Profile                                        |
| [Agent name] [Verified Agent] [Trust score] [Report count]  |
+------------------------------------------------------------+
| Viewing Access Requirement                                 |
| 1. Pay viewing fee through Stellar testnet                  |
| 2. Generate private payment proof                           |
| 3. Verify proof through Soroban                             |
| 4. Unlock viewing code                                      |
+------------------------------------------------------------+
| [Report this listing]                                      |
+------------------------------------------------------------+
```

---

## 20. Request Viewing Screen Wireframe

```text
+----------------------------------------------------------+
| Request Viewing                                          |
+----------------------------------------------------------+
| Property: [Name]                                         |
| Agent: [Verified Agent]                                  |
| Viewing fee: [Amount]                                    |
| Payment method: Stellar testnet                          |
+----------------------------------------------------------+
| Status Tracker                                           |
| [Viewing requested] → [Payment pending] → [Proof]         |
+----------------------------------------------------------+
| Safety Message                                           |
| Viewing details remain locked until proof is verified.   |
+----------------------------------------------------------+
| [Create Viewing Request]                                 |
+----------------------------------------------------------+
```

---

## 21. Stellar Payment Screen Wireframe

```text
+----------------------------------------------------------+
| Stellar Testnet Payment                                  |
+----------------------------------------------------------+
| Viewing Request ID: [VR-123]                             |
| Required amount: [10 XLM]                                |
| Asset: [Testnet XLM]                                     |
| Destination: [Platform testnet address]                  |
+----------------------------------------------------------+
| [Connect Wallet] [Pay Viewing Fee]                       |
+----------------------------------------------------------+
| Transaction Status                                       |
| [Pending / Received / Failed]                            |
| Transaction Hash: [hash shown after payment]             |
+----------------------------------------------------------+
| [Continue to Generate Proof]                             |
+----------------------------------------------------------+
| Safety note: Do not share private keys or seed phrases.  |
+----------------------------------------------------------+
```

---

## 22. ZK Proof Generation Screen Wireframe

```text
+----------------------------------------------------------+
| Generate Private Payment Proof                           |
+----------------------------------------------------------+
| Payment status: Received                                 |
| Proof status: Not started                                |
+----------------------------------------------------------+
| Explanation Card                                         |
| This proof confirms the required payment was completed   |
| without exposing unrelated wallet activity.              |
+----------------------------------------------------------+
| Public inputs                                            |
| [Listing ID] [Request ID] [Required fee]                  |
+----------------------------------------------------------+
| Private data                                             |
| [Hidden from public view]                                |
+----------------------------------------------------------+
| [Generate Proof]                                         |
+----------------------------------------------------------+
```

---

## 23. Proof Verification Screen Wireframe

```text
+----------------------------------------------------------+
| Verify Proof on Stellar                                  |
+----------------------------------------------------------+
| Proof status: Generated                                  |
| Contract: [Soroban contract address]                     |
| Request ID: [VR-123]                                     |
+----------------------------------------------------------+
| Status Tracker                                           |
| [Proof generated] → [Submitted] → [Verified]             |
+----------------------------------------------------------+
| [Submit Proof for Verification]                          |
+----------------------------------------------------------+
| Verification Result                                      |
| [Pending / Verified / Failed]                            |
| Verification Tx Hash: [hash]                             |
+----------------------------------------------------------+
```

---

## 24. Escrow / Payment-Hold Status Wireframe

```text
+----------------------------------------------------------+
| Payment-Hold Status                                      |
+----------------------------------------------------------+
| Viewing Request: [VR-123]                                |
| Property: [Name]                                         |
+----------------------------------------------------------+
| Status Timeline                                          |
| [Pending] → [Paid] → [Verified] → [Active] → [Released]  |
+----------------------------------------------------------+
| Current status: Active                                   |
+----------------------------------------------------------+
| Note                                                     |
| This MVP shows payment-hold status for transparency.     |
| It is not a full legal escrow service.                   |
+----------------------------------------------------------+
```

---

## 25. Viewing Code Success Screen Wireframe

```text
+----------------------------------------------------------+
| Viewing Access Unlocked                                  |
+----------------------------------------------------------+
| [Success icon]                                           |
| Your viewing code is ready.                              |
+----------------------------------------------------------+
| Viewing Code                                             |
| [VIEW-8K29XQ]                                            |
+----------------------------------------------------------+
| Property: [Name]                                         |
| Agent: [Verified Agent]                                  |
| Instructions: Present this code during viewing.          |
+----------------------------------------------------------+
| [Copy Code] [View Tenant Dashboard]                      |
+----------------------------------------------------------+
| Safety note: Do not share this code publicly.            |
+----------------------------------------------------------+
```

---

## 26. Tenant Dashboard Wireframe

```text
+--------------------------------------------------------------+
| Tenant Dashboard                                             |
+--------------------------------------------------------------+
| [Active Requests] [Verified Proofs] [Unlocked Codes] [Reports]|
+--------------------------------------------------------------+
| My Viewing Requests                                          |
| ------------------------------------------------------------ |
| Property | Payment | Proof | Escrow | Access | Action         |
| ------------------------------------------------------------ |
| Unit A   | Paid    | Verified | Active | Unlocked | View Code |
| Unit B   | Pending | Not Started | Pending | Locked | Pay     |
+--------------------------------------------------------------+
| Notifications                                                |
| [Payment received] [Proof verified] [Viewing code ready]     |
+--------------------------------------------------------------+
```

---

## 27. Notifications Screen Wireframe

```text
+----------------------------------------------------------+
| Notifications                                            |
+----------------------------------------------------------+
| [Payment received for Kilimani Studio]                   |
| [Proof generated for Westlands Apartment]                 |
| [Viewing access unlocked]                                |
| [Report reviewed by admin]                               |
+----------------------------------------------------------+
| [Mark all as read]                                       |
+----------------------------------------------------------+
```

---

## 28. Fake Listing Report Screen Wireframe

```text
+----------------------------------------------------------+
| Report Suspicious Listing                                |
+----------------------------------------------------------+
| Property: [Name]                                         |
| Agent: [Name]                                            |
+----------------------------------------------------------+
| Reason                                                   |
| [Fake property]                                          |
| [Suspicious agent]                                       |
| [Wrong location]                                         |
| [Duplicate listing]                                      |
| [Payment scam]                                           |
| [Misleading details]                                     |
+----------------------------------------------------------+
| Additional details                                       |
| [Textarea]                                               |
+----------------------------------------------------------+
| [Submit Report]                                          |
+----------------------------------------------------------+
```

---

## 29. Manager Dashboard Wireframe

```text
+----------------------------------------------------------------+
| Property Manager Dashboard                                     |
+----------------------------------------------------------------+
| [Listed Properties] [Viewing Requests] [Verified Tenants]       |
| [Reports Received] [Trust Score]                               |
+----------------------------------------------------------------+
| Viewing Requests Table                                         |
| Property | Tenant | Payment | Proof | Code | Status | Action    |
+----------------------------------------------------------------+
| Reports Received                                               |
| Listing | Reason | Status | Date | Review                         |
+----------------------------------------------------------------+
| Agent Trust Profile Summary                                    |
| Verification: Verified | Trust Score: 86 | Reports: 2          |
+----------------------------------------------------------------+
```

---

## 30. Agent Trust Profile Wireframe

```text
+----------------------------------------------------------+
| Agent Trust Profile                                      |
+----------------------------------------------------------+
| [Agent photo/placeholder] [Agent name]                   |
| [Verified Agent Badge]                                   |
+----------------------------------------------------------+
| Trust Score: [86/100]                                    |
| Listed Properties: [12]                                  |
| Verified Viewing Requests: [48]                          |
| Report Count: [2]                                        |
| Last Reviewed: [Date]                                    |
+----------------------------------------------------------+
| Listed Properties                                        |
| [Property cards/table]                                   |
+----------------------------------------------------------+
```

---

## 31. Admin Dashboard Wireframe

```text
+----------------------------------------------------------------+
| Admin Dashboard                                                |
+----------------------------------------------------------------+
| [Pending Listings] [Agents Pending] [Open Reports] [Proof Failures] |
+----------------------------------------------------------------+
| Proof Verification Activity                                   |
| Request ID | Property | Tenant | Proof Status | Tx Hash | Date |
+----------------------------------------------------------------+
| Fake Listing Reports                                           |
| Listing | Agent | Reason | Status | Action                    |
+----------------------------------------------------------------+
| Suspicious Activity                                            |
| [Repeated reports] [Failed proofs] [High-risk agents]          |
+----------------------------------------------------------------+
```

---

## 32. Audit Log Screen Wireframe

```text
+----------------------------------------------------------------+
| Audit Logs                                                     |
+----------------------------------------------------------------+
| [Search] [Filter by action] [Filter by role] [Date range]      |
+----------------------------------------------------------------+
| Timestamp | Actor | Role | Action | Entity | Details           |
+----------------------------------------------------------------+
| 10:15     | Tenant A | TENANT | PAYMENT_RECEIVED | VR-123 | View|
| 10:18     | System   | SYSTEM | PROOF_VERIFIED   | VR-123 | View|
| 10:19     | System   | SYSTEM | ACCESS_UNLOCKED  | VR-123 | View|
+----------------------------------------------------------------+
```

---

## 33. API Documentation Page Wireframe

```text
+--------------------------------------------------------------+
| API Documentation                                            |
+--------------------------------------------------------------+
| Overview                                                     |
| UrbanRentisha APIs help rental platforms verify viewing      |
| access using payment proof and Stellar verification.          |
+--------------------------------------------------------------+
| Endpoint Cards                                               |
| [POST /api/external/viewing-requests]                        |
| [GET /api/external/viewing-requests/:id/status]              |
| [GET /api/external/viewing-codes/:code/verify]               |
| [GET /api/external/agents/:id/trust-profile]                 |
+--------------------------------------------------------------+
| Example Request                                              |
| [Code block]                                                 |
+--------------------------------------------------------------+
| Example Response                                             |
| [Code block]                                                 |
+--------------------------------------------------------------+
```

---

## 34. Demo Mode Wireframe

```text
+----------------------------------------------------------+
| Hackathon Demo Mode                                      |
+----------------------------------------------------------+
| Complete the UrbanRentisha trust flow in 2–3 minutes.    |
+----------------------------------------------------------+
| Demo Steps                                               |
| 1. Choose verified property                              |
| 2. Request viewing                                       |
| 3. Pay through Stellar testnet                           |
| 4. Generate ZK proof                                     |
| 5. Verify proof through Soroban                          |
| 6. Unlock viewing code                                   |
| 7. View admin audit log                                  |
+----------------------------------------------------------+
| [Start Guided Demo]                                      |
+----------------------------------------------------------+
| Demo accounts                                            |
| [Tenant] [Manager] [Admin]                               |
+----------------------------------------------------------+
```

---

## 35. Proof Status Tracker Component

```text
+----------------------------------------------------------+
| Proof Status                                             |
+----------------------------------------------------------+
| [Viewing requested]                                      |
|        ↓                                                 |
| [Payment pending]                                        |
|        ↓                                                 |
| [Payment received]                                       |
|        ↓                                                 |
| [Proof generated]                                        |
|        ↓                                                 |
| [Proof verified]                                         |
|        ↓                                                 |
| [Viewing code generated]                                 |
|        ↓                                                 |
| [Access unlocked]                                        |
+----------------------------------------------------------+
```

Status labels:

```text
Viewing requested
Payment pending
Payment received
Proof generated
Proof verified
Escrow active
Viewing code generated
Access unlocked
Completed
Failed
Reported
```

---

## 36. Empty States

## 36.1 No Viewing Requests

```text
You have not requested any property viewings yet.
Browse verified listings to start a safe viewing request.
[Browse Listings]
```

## 36.2 No Reports

```text
No suspicious listings reported yet.
Reports will appear here when tenants flag a listing for review.
```

## 36.3 No API Clients

```text
No API clients have been created.
Create an API client when a rental platform is ready to integrate.
```

---

## 37. Loading States

## 37.1 Payment Loading

```text
Checking Stellar testnet payment status.
```

## 37.2 Proof Generation Loading

```text
Generating your private payment proof.
```

## 37.3 Proof Verification Loading

```text
Submitting proof for Stellar smart contract verification.
```

## 37.4 Viewing Code Loading

```text
Preparing your viewing code.
```

---

## 38. Error States

## 38.1 Payment Failed

```text
Payment was not confirmed. Please retry or check your transaction details.
```

## 38.2 Proof Generation Failed

```text
Your proof could not be generated. Please try again.
```

## 38.3 Proof Verification Failed

```text
Your proof could not be verified. Viewing access remains locked.
```

## 38.4 Viewing Code Expired

```text
This viewing code has expired. Please request a new viewing access flow.
```

---

## 39. Success States

## 39.1 Payment Received

```text
Payment received. You can now generate your private payment proof.
```

## 39.2 Proof Generated

```text
Proof generated. Submit it for Stellar smart contract verification.
```

## 39.3 Proof Verified

```text
Proof verified. Your viewing access can now be unlocked.
```

## 39.4 Viewing Code Ready

```text
Your viewing code is ready.
```

---

## 40. UX Writing Guidelines

Use language that is:

```text
Clear
Human
Short
Reassuring
Action-oriented
Safety-focused
Non-technical
```

Avoid:

```text
Crypto jargon
Threatening language
Overpromising escrow
Complex proof terminology
Unclear blockchain language
```

Recommended microcopy:

```text
This property has been verified.
Your payment proof is being generated.
Your viewing access is now unlocked.
Your viewing code is ready.
This agent has passed platform verification.
Report this listing if something feels suspicious.
Your payment is protected while verification is completed.
Viewing details remain locked until proof verification succeeds.
```

---

## 41. Accessibility Guidelines

The UI must follow these rules:

```text
Strong color contrast
Readable font sizes
Clear form labels
Visible focus states
Large tap targets
Do not rely on color alone for status
Use icons plus labels
Use simple error messages
Support keyboard navigation
Use responsive layouts
Avoid overcrowded dashboards
```

---

## 42. Mobile-First UX Notes

For mobile:

```text
Use single-column layouts
Use sticky primary action buttons
Use collapsible filters
Use compact status trackers
Avoid wide tables
Use cards instead of tables where possible
Use bottom navigation for tenant screens
Keep payment and proof steps focused
```

---

## 43. UX Risks and Mitigations

| Risk | UX Mitigation |
|---|---|
| Users do not understand ZK | Explain as private payment proof |
| Users confuse testnet with real money | Clearly label Stellar testnet |
| Users think escrow is legal escrow | Use payment-hold status wording |
| Users expect immediate access after payment | Show proof verification step |
| Admin dashboard becomes crowded | Use filters, cards, and priority sections |
| Proof failure causes confusion | Provide clear retry and support path |
| Fake listing report feels hidden | Place report button on listing and detail pages |

---

## 44. Figma Design Notes

Use this design direction:

```text
Minimalist / Swiss Design
Bento Grid sections
Clean white surfaces
Deep navy headings
Trust teal CTAs
Verified green status badges
Warm sand highlights
Amber warning states
Red scam/failure alerts
Rounded cards
Soft borders
Clear dashboard hierarchy
```

Recommended fonts:

```text
Inter for body and UI
Space Grotesk for headings
IBM Plex Mono for technical values
```

Recommended icons:

```text
lucide-react icon style
ShieldCheck for verification
Home for property
Wallet for payment
FileCheck for proof
KeyRound for viewing code
AlertTriangle for reports
Activity for audit log
Code for API
```

---

## 45. Final UX Summary

UrbanRentisha TrustLayer should feel like a safe, professional, human, and modern trust layer for rental access.

The most important user journey is:

```text
Find verified property
Request viewing
Pay through Stellar testnet
Generate private proof
Verify proof on Stellar/Soroban
Unlock viewing code
Record event in audit log
```

Every screen should support this flow. The design should make ZK and Stellar understandable without making the product feel overly technical. The tenant should feel protected, the property manager should feel organized, and the administrator should feel in control.
