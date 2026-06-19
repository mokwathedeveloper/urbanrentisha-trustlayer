import {
  AlertTriangle,
  BadgeCheck,
  Bell,
  BookOpenText,
  Braces,
  Building2,
  CheckCircle2,
  Code2,
  Copy,
  Download,
  FileCode2,
  Flag,
  Gauge,
  Globe2,
  HelpCircle,
  Home,
  KeyRound,
  LayoutDashboard,
  Link2,
  ListChecks,
  LockKeyhole,
  Network,
  PlugZap,
  Rocket,
  Settings,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  TimerReset,
  UserCheck,
  WalletCards,
  Webhook
} from "lucide-react";

export type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";
export type EndpointStatus = "stable" | "beta" | "secured";
export type EndpointGroup =
  | "Authentication"
  | "Listings"
  | "Viewing Requests"
  | "Payments"
  | "Proofs"
  | "Viewing Codes"
  | "Reports"
  | "Webhooks";

export type ApiEndpoint = {
  id: string;
  method: HttpMethod;
  path: string;
  title: string;
  description: string;
  group: EndpointGroup;
  status: EndpointStatus;
  auth: "API key" | "JWT" | "Webhook secret";
  requestExample: string;
  responseExample: string;
};

export type WebhookEvent = {
  id: string;
  event: string;
  description: string;
  payloadKey: string;
  status: "recommended" | "optional" | "critical";
};

export const apiStats = [
  { label: "Core endpoints", value: "22", helper: "Auth, listings, requests, proofs, reports", tone: "success", icon: Code2 },
  { label: "Webhook events", value: "8", helper: "Payment, proof, access, report updates", tone: "success", icon: Webhook },
  { label: "Auth methods", value: "3", helper: "API key, JWT, webhook secret", tone: "neutral", icon: KeyRound },
  { label: "Rate limit", value: "120/min", helper: "Per external platform token", tone: "warning", icon: Gauge },
  { label: "Network", value: "Stellar", helper: "Testnet payment and proof references", tone: "success", icon: Sparkles },
  { label: "Docs status", value: "MVP", helper: "Ready for developer implementation", tone: "neutral", icon: BookOpenText }
];

export const endpointGroups: EndpointGroup[] = [
  "Authentication",
  "Listings",
  "Viewing Requests",
  "Payments",
  "Proofs",
  "Viewing Codes",
  "Reports",
  "Webhooks"
];

export const apiEndpoints: ApiEndpoint[] = [
  {
    id: "AUTH-001",
    method: "POST",
    path: "/api/v1/external/auth/token",
    title: "Create platform access token",
    description: "Issues a short-lived JWT for an approved external rental platform using an API key.",
    group: "Authentication",
    status: "secured",
    auth: "API key",
    requestExample: `{
  "platformId": "platform_urban_partner_01",
  "apiKey": "ur_live_xxxxxxxxx"
}`,
    responseExample: `{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "expiresIn": 3600,
  "tokenType": "Bearer"
}`
  },
  {
    id: "LIST-001",
    method: "POST",
    path: "/api/v1/external/listings",
    title: "Create verified listing record",
    description: "Creates a listing record that can be connected to a viewing-proof workflow.",
    group: "Listings",
    status: "stable",
    auth: "JWT",
    requestExample: `{
  "externalListingId": "LIS-78231",
  "title": "Kilimani Green View Apartment",
  "location": "Kilimani, Nairobi",
  "rentAmount": 65000,
  "currency": "KES",
  "viewingFee": 500
}`,
    responseExample: `{
  "listingId": "UR-LST-1001",
  "verificationStatus": "pending_review",
  "createdAt": "2026-06-19T10:30:00Z"
}`
  },
  {
    id: "VIEW-001",
    method: "POST",
    path: "/api/v1/external/viewing-requests",
    title: "Create viewing request",
    description: "Creates a viewing request and returns the required viewing fee and payment reference.",
    group: "Viewing Requests",
    status: "stable",
    auth: "JWT",
    requestExample: `{
  "listingId": "UR-LST-1001",
  "tenantExternalId": "TEN-123456",
  "preferredDate": "2026-06-24",
  "preferredTime": "10:00"
}`,
    responseExample: `{
  "requestId": "REQ-UR-9084",
  "requiredViewingFee": 500,
  "currency": "KES",
  "paymentStatus": "awaiting_payment"
}`
  },
  {
    id: "PAY-001",
    method: "POST",
    path: "/api/v1/external/payments/stellar-intent",
    title: "Create Stellar payment intent",
    description: "Creates a Stellar testnet payment intent for the viewing fee.",
    group: "Payments",
    status: "beta",
    auth: "JWT",
    requestExample: `{
  "requestId": "REQ-UR-9084",
  "amount": "500",
  "asset": "XLM_TEST",
  "payerWallet": "GCB7...22LP"
}`,
    responseExample: `{
  "paymentIntentId": "PAY-UR-7201",
  "stellarMemo": "REQ-UR-9084",
  "destinationWallet": "GDEST...9KQP",
  "status": "created"
}`
  },
  {
    id: "PAY-002",
    method: "GET",
    path: "/api/v1/external/payments/{paymentIntentId}",
    title: "Get payment status",
    description: "Returns payment amount, Stellar transaction hash, and confirmation status.",
    group: "Payments",
    status: "stable",
    auth: "JWT",
    requestExample: `GET /api/v1/external/payments/PAY-UR-7201`,
    responseExample: `{
  "paymentIntentId": "PAY-UR-7201",
  "status": "received",
  "txHash": "4f7a8b2c0ae9b3c4d5f611e8a92f001b"
}`
  },
  {
    id: "PROOF-001",
    method: "POST",
    path: "/api/v1/external/proofs/generate",
    title: "Generate private payment proof",
    description: "Starts ZK proof generation after payment has been received.",
    group: "Proofs",
    status: "beta",
    auth: "JWT",
    requestExample: `{
  "requestId": "REQ-UR-9084",
  "paymentIntentId": "PAY-UR-7201"
}`,
    responseExample: `{
  "proofJobId": "ZKJOB-UR-3301",
  "status": "generating",
  "estimatedSeconds": 12
}`
  },
  {
    id: "PROOF-002",
    method: "POST",
    path: "/api/v1/external/proofs/verify",
    title: "Submit proof for verification",
    description: "Submits generated proof metadata for Stellar/Soroban verification tracking.",
    group: "Proofs",
    status: "secured",
    auth: "JWT",
    requestExample: `{
  "requestId": "REQ-UR-9084",
  "proofHash": "soro_0x7ab42d3c...2c109",
  "publicInputs": {
    "listingId": "UR-LST-1001",
    "requiredViewingFee": 500
  }
}`,
    responseExample: `{
  "verificationId": "VER-UR-6101",
  "status": "verified",
  "accessStatus": "unlocked"
}`
  },
  {
    id: "CODE-001",
    method: "POST",
    path: "/api/v1/external/viewing-codes",
    title: "Generate viewing code",
    description: "Generates an unlocked viewing code after successful proof verification.",
    group: "Viewing Codes",
    status: "stable",
    auth: "JWT",
    requestExample: `{
  "requestId": "REQ-UR-9084",
  "verificationId": "VER-UR-6101"
}`,
    responseExample: `{
  "viewingCode": "UR-4829",
  "expiresAt": "2026-06-24T10:30:00Z",
  "accessStatus": "unlocked"
}`
  },
  {
    id: "RPT-001",
    method: "POST",
    path: "/api/v1/external/reports",
    title: "Submit suspicious listing report",
    description: "Allows an integrated platform to submit suspicious listing or unsafe payment reports.",
    group: "Reports",
    status: "stable",
    auth: "JWT",
    requestExample: `{
  "listingId": "UR-LST-1001",
  "reportType": "unsafe_payment",
  "description": "Agent requested off-platform payment.",
  "submittedBy": "TEN-123456"
}`,
    responseExample: `{
  "reportId": "RPT-UR-4418",
  "status": "under_review",
  "severity": "high"
}`
  },
  {
    id: "HOOK-001",
    method: "POST",
    path: "/api/v1/external/webhooks",
    title: "Register webhook endpoint",
    description: "Registers a destination URL for payment, proof, report, and viewing-code updates.",
    group: "Webhooks",
    status: "secured",
    auth: "JWT",
    requestExample: `{
  "url": "https://partner.example.com/urbanrentisha/webhook",
  "events": ["payment.received", "proof.verified", "viewing_code.unlocked"]
}`,
    responseExample: `{
  "webhookId": "WH-UR-1001",
  "secret": "whsec_xxxxxxxxx",
  "status": "active"
}`
  }
];

export const webhookEvents: WebhookEvent[] = [
  { id: "WH-EVT-001", event: "payment.received", description: "Triggered when a viewing-fee payment is confirmed.", payloadKey: "paymentIntentId", status: "critical" },
  { id: "WH-EVT-002", event: "proof.generated", description: "Triggered when private payment proof generation completes.", payloadKey: "proofJobId", status: "recommended" },
  { id: "WH-EVT-003", event: "proof.verified", description: "Triggered when proof verification unlocks the trust flow.", payloadKey: "verificationId", status: "critical" },
  { id: "WH-EVT-004", event: "viewing_code.unlocked", description: "Triggered when a viewing access code is created.", payloadKey: "viewingCode", status: "critical" },
  { id: "WH-EVT-005", event: "report.submitted", description: "Triggered when a suspicious listing or agent report is opened.", payloadKey: "reportId", status: "recommended" },
  { id: "WH-EVT-006", event: "access.revoked", description: "Triggered when viewing access is revoked for safety reasons.", payloadKey: "requestId", status: "critical" }
];

export const sdkCards = [
  { language: "TypeScript", packageName: "@urbanrentisha/trustlayer-sdk", installCommand: "pnpm add @urbanrentisha/trustlayer-sdk", status: "recommended", icon: Code2 },
  { language: "REST", packageName: "OpenAPI-compatible REST", installCommand: "Base URL: https://api.urbanrentisha.dev", status: "starter", icon: Globe2 },
  { language: "Webhook", packageName: "Signed webhook events", installCommand: "Header: x-ur-signature", status: "starter", icon: Webhook }
];

export const integrationSteps = [
  { title: "Register rental platform", description: "Create API credentials for a partner marketplace or property-management system.", icon: PlugZap },
  { title: "Create listing and request", description: "Send listing data and create a viewing request for a tenant.", icon: Building2 },
  { title: "Collect Stellar payment", description: "Create a Stellar payment intent for the required viewing fee.", icon: WalletCards },
  { title: "Generate and verify proof", description: "Generate private payment proof and submit it for verification tracking.", icon: LockKeyhole },
  { title: "Unlock viewing code", description: "Receive webhook update and show the tenant verified viewing access.", icon: KeyRound }
];

export const securityRules = [
  { title: "Use server-side API keys only", description: "Never expose live platform API keys inside browser JavaScript.", icon: KeyRound },
  { title: "Verify webhook signatures", description: "Use x-ur-signature before trusting payment, proof, or access updates.", icon: ShieldCheck },
  { title: "Store proof metadata only", description: "Keep private payment data outside partner logs whenever possible.", icon: LockKeyhole },
  { title: "Rate-limit tenant request creation", description: "Prevent fake viewing spam and repeated unsafe integration activity.", icon: Gauge }
];

export const sidebarItems = [
  { label: "Overview", href: "#overview", icon: BookOpenText, active: true },
  { label: "Authentication", href: "#authentication", icon: KeyRound },
  { label: "Endpoints", href: "#endpoints", icon: Code2 },
  { label: "Viewing Requests", href: "#viewing-requests", icon: ListChecks },
  { label: "Payments", href: "#payments", icon: WalletCards },
  { label: "Proofs", href: "#proofs", icon: LockKeyhole },
  { label: "Viewing Codes", href: "#viewing-codes", icon: KeyRound },
  { label: "Reports", href: "#reports", icon: Flag },
  { label: "Webhooks", href: "#webhooks", icon: Webhook },
  { label: "SDKs", href: "#sdks", icon: FileCode2 },
  { label: "Security", href: "#security", icon: ShieldCheck }
];

export const codeSamples = {
  authCurl: `curl -X POST https://api.urbanrentisha.dev/api/v1/external/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{
    "platformId": "platform_urban_partner_01",
    "apiKey": "ur_live_xxxxxxxxx"
  }'`,
  createRequest: `const request = await urbanrentisha.viewingRequests.create({
  listingId: "UR-LST-1001",
  tenantExternalId: "TEN-123456",
  preferredDate: "2026-06-24",
  preferredTime: "10:00"
});`,
  webhookPayload: `{
  "event": "proof.verified",
  "requestId": "REQ-UR-9084",
  "verificationId": "VER-UR-6101",
  "accessStatus": "unlocked",
  "proofHash": "soro_0x7ab42d3c...2c109"
}`
};

export const methodVisuals: Record<HttpMethod, { variant: "success" | "warning" | "danger" | "neutral"; label: string }> = {
  GET: { variant: "success", label: "GET" },
  POST: { variant: "warning", label: "POST" },
  PATCH: { variant: "neutral", label: "PATCH" },
  DELETE: { variant: "danger", label: "DELETE" }
};

export const statusVisuals: Record<EndpointStatus, { variant: "success" | "warning" | "neutral"; label: string; icon: typeof CheckCircle2 }> = {
  stable: { variant: "success", label: "Stable", icon: CheckCircle2 },
  beta: { variant: "warning", label: "Beta", icon: TimerReset },
  secured: { variant: "success", label: "Secured", icon: ShieldCheck }
};

export const webhookStatusVisuals = {
  critical: { variant: "danger", label: "Critical", icon: AlertTriangle },
  recommended: { variant: "success", label: "Recommended", icon: CheckCircle2 },
  optional: { variant: "neutral", label: "Optional", icon: Bell }
} as const;
