export type HttpMethod = "GET" | "POST" | "PATCH";
export type EndpointAuth = "Public" | "JWT" | "JWT (Admin)" | "API Key";

export interface ApiEndpoint {
  id: string;
  method: HttpMethod;
  path: string;
  title: string;
  description: string;
  group: string;
  auth: EndpointAuth;
}

export const apiEndpoints: ApiEndpoint[] = [
  { id: "auth-register", method: "POST", path: "/auth/register", title: "Register", description: "Create a tenant, agent, manager, or admin account.", group: "Authentication", auth: "Public" },
  { id: "auth-login", method: "POST", path: "/auth/login", title: "Login", description: "Exchange email/password for a JWT access token.", group: "Authentication", auth: "Public" },
  { id: "auth-me", method: "GET", path: "/auth/me", title: "Current User", description: "Return the authenticated user's profile.", group: "Authentication", auth: "JWT" },

  { id: "listings-list", method: "GET", path: "/listings", title: "List Listings", description: "Return all property listings with agent and verification info.", group: "Listings", auth: "Public" },
  { id: "listings-one", method: "GET", path: "/listings/:id", title: "Get Listing", description: "Return a single listing by ID.", group: "Listings", auth: "Public" },
  { id: "listings-create", method: "POST", path: "/listings", title: "Create Listing", description: "Create a new property listing.", group: "Listings", auth: "JWT" },
  { id: "listings-verify", method: "PATCH", path: "/listings/:id/verify", title: "Verify Listing", description: "Approve a pending listing for publication.", group: "Listings", auth: "JWT (Admin)" },

  { id: "viewing-requests-create", method: "POST", path: "/viewing-requests", title: "Create Viewing Request", description: "Request a viewing for a listing as a tenant.", group: "Viewing Requests", auth: "JWT" },
  { id: "viewing-requests-mine", method: "GET", path: "/viewing-requests", title: "List My Viewing Requests", description: "Return the current tenant's viewing requests.", group: "Viewing Requests", auth: "JWT" },
  { id: "viewing-requests-one", method: "GET", path: "/viewing-requests/:id", title: "Get Viewing Request", description: "Return a viewing request with payment, proof, and code state.", group: "Viewing Requests", auth: "JWT" },
  { id: "viewing-requests-status", method: "GET", path: "/viewing-requests/:id/status", title: "Get Viewing Request Status", description: "Return a compact status summary for a viewing request.", group: "Viewing Requests", auth: "JWT" },

  { id: "payments-create", method: "POST", path: "/payments/create", title: "Create Payment Intent", description: "Create a Stellar testnet payment intent for a viewing request.", group: "Payments", auth: "JWT" },
  { id: "payments-confirm", method: "POST", path: "/payments/confirm", title: "Confirm Payment", description: "Verify a Stellar testnet transaction hash against a payment intent.", group: "Payments", auth: "JWT" },
  { id: "payments-one", method: "GET", path: "/payments/:id", title: "Get Payment", description: "Return a payment by ID.", group: "Payments", auth: "JWT" },

  { id: "zk-proofs-generate", method: "POST", path: "/zk-proofs/generate", title: "Generate ZK Proof", description: "Generate a real Groth16 proof of payment for a viewing request.", group: "ZK Proofs", auth: "JWT" },
  { id: "zk-proofs-one", method: "GET", path: "/zk-proofs/:id", title: "Get ZK Proof", description: "Return a zero-knowledge proof by ID.", group: "ZK Proofs", auth: "JWT" },

  { id: "proof-verification-submit", method: "POST", path: "/proof-verification/submit", title: "Submit Proof for Verification", description: "Verify a generated proof on-chain against the Soroban trust verifier contract.", group: "Proof Verification", auth: "JWT" },
  { id: "proof-verification-one", method: "GET", path: "/proof-verification/:id", title: "Get Proof Verification", description: "Return a proof verification record by ID.", group: "Proof Verification", auth: "JWT" },

  { id: "viewing-codes-generate", method: "POST", path: "/viewing-codes/generate", title: "Generate Viewing Code", description: "Unlock a viewing code once proof verification succeeds.", group: "Viewing Codes", auth: "JWT" },
  { id: "viewing-codes-verify", method: "GET", path: "/viewing-codes/:code/verify", title: "Verify Viewing Code", description: "Check whether a viewing code is active and unexpired.", group: "Viewing Codes", auth: "Public" },

  { id: "reports-create", method: "POST", path: "/reports", title: "Submit Report", description: "Report a fake listing or suspicious agent behavior.", group: "Reports", auth: "JWT" },
  { id: "reports-all", method: "GET", path: "/reports", title: "List All Reports", description: "Return every report filed on the platform.", group: "Reports", auth: "JWT" },
  { id: "reports-mine", method: "GET", path: "/reports/mine", title: "List My Reports", description: "Return reports filed by the current user.", group: "Reports", auth: "JWT" },

  { id: "notifications-mine", method: "GET", path: "/notifications", title: "List My Notifications", description: "Return the current user's notifications.", group: "Notifications", auth: "JWT" },
  { id: "notifications-read", method: "PATCH", path: "/notifications/:id/read", title: "Mark Notification Read", description: "Mark a notification as read.", group: "Notifications", auth: "JWT" },

  { id: "agents-dashboard", method: "GET", path: "/agents/me/dashboard", title: "Agent Dashboard", description: "Return the current agent's listings, tenants, escrow, and reports.", group: "Agents", auth: "JWT" },
  { id: "agents-one", method: "GET", path: "/agents/:id", title: "Get Agent Profile", description: "Return a public agent verification profile and stats.", group: "Agents", auth: "JWT" },

  { id: "users-me", method: "GET", path: "/users/me", title: "Current User Profile", description: "Return the authenticated user's full profile record.", group: "Users", auth: "JWT" },

  { id: "audit-logs-all", method: "GET", path: "/audit-logs", title: "List Audit Logs", description: "Return the most recent platform audit log entries.", group: "Audit Logs", auth: "JWT (Admin)" },
  { id: "audit-logs-stats", method: "GET", path: "/audit-logs/stats", title: "Audit Log Stats", description: "Return categorized audit log counts.", group: "Audit Logs", auth: "JWT (Admin)" },

  { id: "admin-dashboard", method: "GET", path: "/admin/dashboard", title: "Admin Dashboard (Counts)", description: "Return simple platform-wide entity counts.", group: "Admin", auth: "JWT (Admin)" },
  { id: "admin-overview", method: "GET", path: "/admin/overview", title: "Admin Overview", description: "Return platform-wide stats, pending approvals, and suspicious activity.", group: "Admin", auth: "JWT (Admin)" },

  { id: "external-viewing-requests", method: "POST", path: "/external/viewing-requests", title: "Create Viewing Request (External)", description: "Create a viewing request from an integrated partner using an API key.", group: "External API", auth: "API Key" },

  { id: "webhooks-receive", method: "POST", path: "/webhooks", title: "Receive Webhook", description: "Receive a webhook event from an external system.", group: "Webhooks", auth: "API Key" },
  { id: "webhooks-list", method: "GET", path: "/webhooks", title: "List Webhook Events", description: "Return recently received webhook events.", group: "Webhooks", auth: "JWT (Admin)" },
];

export const apiGroups: string[] = Array.from(new Set(apiEndpoints.map((endpoint) => endpoint.group)));
