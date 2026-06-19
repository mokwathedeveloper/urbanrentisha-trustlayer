# UrbanRentisha TrustLayer API Documentation Page UI/UX Blueprint and Starter Code

## 1. Screen Covered

```text
20. API Documentation Page only
```

## 2. Page Purpose

The **API Documentation Page** shows API endpoints for external rental-platform integrations.

This screen helps developers and external rental platforms understand how to authenticate securely, create verified listing records, create viewing requests, create Stellar payment intents, track payment status, generate private payment proof, submit proof verification, unlock viewing codes, submit suspicious listing reports, register webhook endpoints, and receive real-time trust updates.

---

## 3. Design Inspiration Rule

The provided MantleMandate design system is used only as structural inspiration for strict spacing, dark SaaS documentation layout, readable endpoint cards, code blocks, sidebar anchors, searchable documentation, status badges, minimal motion, and a technical trustworthy tone.

Do not copy MantleMandate branding, logo, or blue palette. UrbanRentisha keeps its dark green trust UI, eco-friendly real estate identity, rental scam prevention focus, ZK payment proof, Stellar/Soroban verification, and external rental-platform integration purpose.

---

## 4. UX Goal

```text
UrbanRentisha TrustLayer can be integrated into an existing rental platform without replacing that platform.
The external platform uses APIs to create viewing requests, process payment proof, verify access status, unlock viewing codes, submit reports, and receive webhooks.
```

---

## 5. Required Screen Content

```text
API documentation hero
API stats grid
Authentication panel
Endpoint catalog
Request and response examples
Webhook events
SDK cards
Integration flow
API playground preview
Security rules
Sidebar navigation
Topbar search
```

Endpoint groups:

```text
Authentication
Listings
Viewing Requests
Payments
Proofs
Viewing Codes
Reports
Webhooks
```

---

## 6. Final Folder Structure

```text
urbanrentisha-api-documentation-page/
├── app/
│   ├── api-docs/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── api-docs/
│   │   ├── api-docs-page.tsx
│   │   ├── api-docs-sidebar.tsx
│   │   ├── api-docs-topbar.tsx
│   │   ├── api-hero.tsx
│   │   ├── api-playground-panel.tsx
│   │   ├── api-stats-grid.tsx
│   │   ├── auth-panel.tsx
│   │   ├── code-block-small.tsx
│   │   ├── code-example-panel.tsx
│   │   ├── endpoint-card.tsx
│   │   ├── endpoint-catalog.tsx
│   │   ├── integration-flow-panel.tsx
│   │   ├── logo-mark.tsx
│   │   ├── sdk-cards-panel.tsx
│   │   ├── security-rules-panel.tsx
│   │   ├── status-badge.tsx
│   │   └── webhooks-panel.tsx
│   │
│   └── ui/
│       ├── badge.tsx
│       └── button.tsx
│
├── lib/
│   ├── api-docs-data.ts
│   └── utils.ts
│
├── next.config.ts
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 7. Page Layout

Desktop:

```text
Left docs sidebar
Sticky topbar with search and OpenAPI export
Page title and trust badges
API hero
API stats grid
Main two-column layout:
  Left:
    - authentication
    - endpoint catalog
    - webhooks
    - SDK cards
  Right sticky:
    - code examples
    - integration flow
    - API playground
    - security rules
```

Mobile and tablet:

```text
Topbar with menu button
No fixed sidebar
Page title
API hero
Stats grid stacked
Authentication panel
Endpoint cards stacked
Webhook cards stacked
SDK cards stacked
Code examples
Integration flow
Playground
Security rules
```

---

## 8. Interaction Rules

```text
Search supports endpoint path, endpoint title, webhook event, field name, SDK, request body, and response body.
Sidebar links scroll to documentation sections.
Copy path copies endpoint URL.
Copy quick start copies cURL and TypeScript starter.
Export OpenAPI downloads OpenAPI JSON when integrated.
API playground allows selecting endpoint and previewing request body.
Webhook event cards show required priority and payload key.
Security warnings must remain visible near authentication and integration rules.
```

---

## 9. Color Tokens

```text
Background: #060B0A
Soft background: #0B1512
Sidebar: #07100D
Card: #0E1A16
Card hover: #12241D
Input: #07110E
Border: #1F352B
Strong border: #2E5A45
Primary green: #16A34A
Primary hover: #15803D
Mint: #34D399
Cyan: #22D3EE
Warning: #F59E0B
Warning background: #2A2000
Error: #EF4444
Error background: #2D0F0F
Success: #22C55E
Success background: #0D2818
Text: #F8FAFC
Muted: #94A3B8
Subtle: #64748B
```

---

## 10. Typography

Google Fonts are mandatory.

```text
Inter = all UI text
JetBrains Mono = endpoints, methods, request examples, response examples, API keys, webhook headers, proof hashes, transaction hashes
```

---

## 11. Accessibility Requirements

```text
Endpoint method must use text and color, not color alone.
Endpoint status must use icon and label.
Code blocks must be scrollable.
Long endpoint paths must wrap safely.
Inputs must have labels.
Buttons must have visible focus states.
Sidebar anchors must be keyboard accessible.
Webhook priority must use text and icon.
Mobile cards must remain readable and stacked.
Minimum touch target should be 44px.
```

---

## 12. Implementation Notes

This starter is UI-only. Connect it later to OpenAPI schema, API key management, endpoint search, API playground execution, webhook registration, SDK docs, and partner platform portal.

Recommended API docs route:

```text
/api-docs
```

Recommended backend base route:

```text
/api/v1/external
```

---

# 13. Full Starter Code

## `package.json`

```json
{
  "name": "urbanrentisha-api-documentation-page",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "clsx": "latest",
    "lucide-react": "latest",
    "next": "latest",
    "react": "latest",
    "react-dom": "latest",
    "tailwind-merge": "latest"
  },
  "devDependencies": {
    "@types/node": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "autoprefixer": "latest",
    "postcss": "latest",
    "tailwindcss": "latest",
    "typescript": "latest"
  }
}
```

## `next.config.ts`

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true
};

export default nextConfig;
```

## `postcss.config.js`

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
```

## `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "es2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

## `tailwind.config.ts`

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ur: {
          bg: "#060B0A",
          "bg-soft": "#0B1512",
          sidebar: "#07100D",
          card: "#0E1A16",
          "card-hover": "#12241D",
          input: "#07110E",
          border: "#1F352B",
          "border-strong": "#2E5A45",
          primary: "#16A34A",
          "primary-hover": "#15803D",
          mint: "#34D399",
          cyan: "#22D3EE",
          warning: "#F59E0B",
          "warning-bg": "#2A2000",
          error: "#EF4444",
          "error-bg": "#2D0F0F",
          success: "#22C55E",
          "success-bg": "#0D2818",
          text: "#F8FAFC",
          muted: "#94A3B8",
          subtle: "#64748B",
          disabled: "#475569"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      },
      boxShadow: {
        "green-glow": "0 0 60px rgba(22, 163, 74, 0.24)",
        "soft-dark": "0 24px 80px rgba(0, 0, 0, 0.35)",
        "cyan-glow": "0 0 65px rgba(34, 211, 238, 0.16)"
      },
      borderRadius: {
        "ur-sm": "8px",
        ur: "12px",
        "ur-lg": "18px",
        "ur-xl": "28px"
      }
    }
  },
  plugins: []
};

export default config;
```

## `app/layout.tsx`

```tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "900"]
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"]
});

export const metadata: Metadata = {
  title: "API Documentation | UrbanRentisha TrustLayer",
  description:
    "API documentation for external rental-platform integrations, viewing requests, proof verification, viewing codes, reports, and webhooks."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

## `app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-inter: Inter, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  min-height: 100vh;
  background: #060B0A;
  color: #F8FAFC;
  font-family: var(--font-inter);
}
code, pre, .font-mono { font-family: var(--font-mono); }
::selection { background: rgba(22, 163, 74, 0.35); }

@layer utilities {
  .ur-container { @apply mx-auto w-full max-w-[1440px] px-5 sm:px-6 lg:px-8; }
  .ur-focus { @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ur-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ur-bg; }
  .api-grid-bg {
    background-image:
      linear-gradient(rgba(22, 163, 74, 0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(22, 163, 74, 0.045) 1px, transparent 1px);
    background-size: 38px 38px;
  }
  .api-scrollbar { scrollbar-width: thin; scrollbar-color: rgba(22, 163, 74, 0.45) rgba(255, 255, 255, 0.04); }
}
```

## `app/page.tsx`

```tsx
import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/api-docs");
}
```

## `app/api-docs/page.tsx`

```tsx
import { ApiDocsPage } from "@/components/api-docs/api-docs-page";

export default function Page() {
  return <ApiDocsPage />;
}
```

## `lib/utils.ts`

```ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## `lib/api-docs-data.ts`

```ts
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
```

## `components/ui/button.tsx`

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "warning" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variants: Record<ButtonVariant, string> = {
  primary: "border border-ur-primary bg-ur-primary text-white hover:bg-ur-primary-hover",
  secondary: "border border-ur-border-strong bg-ur-card text-ur-text hover:bg-ur-card-hover",
  ghost: "border border-transparent bg-transparent text-ur-muted hover:bg-white/5 hover:text-white",
  outline: "border border-white/14 bg-transparent text-white hover:border-ur-primary/60 hover:bg-white/5",
  warning: "border border-ur-warning/30 bg-ur-warning-bg text-ur-warning hover:bg-ur-warning/15",
  danger: "border border-ur-error/40 bg-ur-error-bg text-ur-error hover:bg-ur-error/15"
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-10 px-5 text-sm",
  lg: "h-[52px] px-8 text-base"
};

export function Button({ className, variant = "primary", size = "md", type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-ur-sm font-bold transition-colors duration-150 ur-focus disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
```

## `components/ui/badge.tsx`

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "success" | "warning" | "danger" | "neutral" | "outline";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const variants: Record<BadgeVariant, string> = {
  success: "border-ur-success/25 bg-ur-success-bg text-ur-success",
  warning: "border-ur-warning/25 bg-ur-warning-bg text-ur-warning",
  danger: "border-ur-error/25 bg-ur-error-bg text-ur-error",
  neutral: "border-white/10 bg-white/5 text-ur-muted",
  outline: "border-white/14 bg-transparent text-white/82"
};

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
```

## `components/api-docs/status-badge.tsx`

```tsx
import type { ComponentType } from "react";
import { Badge } from "@/components/ui/badge";

type StatusBadgeProps = {
  label: string;
  variant: "success" | "warning" | "danger" | "neutral" | "outline";
  icon: ComponentType<{ className?: string }>;
};

export function StatusBadge({ label, variant, icon: Icon }: StatusBadgeProps) {
  return (
    <Badge variant={variant}>
      <Icon className="h-3.5 w-3.5" />
      {label}
    </Badge>
  );
}
```

## `components/api-docs/logo-mark.tsx`

```tsx
import Link from "next/link";
import { Home, Leaf, ShieldCheck } from "lucide-react";

export function LogoMark() {
  return (
    <Link href="/" className="flex w-fit items-center gap-3 rounded-ur-sm ur-focus">
      <div className="relative grid h-11 w-11 place-items-center rounded-2xl border border-ur-primary/35 bg-ur-primary/10 shadow-green-glow">
        <ShieldCheck className="absolute h-8 w-8 text-ur-primary" strokeWidth={1.8} />
        <Home className="h-4 w-4 text-white" strokeWidth={2.4} />
        <Leaf className="absolute bottom-1 right-1 h-4 w-4 text-ur-mint" strokeWidth={2.2} />
      </div>
      <div className="leading-tight">
        <p className="text-xl font-black tracking-[-0.04em] text-white">Urban<span className="text-ur-primary">Rentisha</span></p>
        <p className="text-sm font-semibold text-ur-muted">TrustLayer</p>
      </div>
    </Link>
  );
}
```

## `components/api-docs/api-docs-sidebar.tsx`

```tsx
import Link from "next/link";
import { ExternalLink, Github, LogOut, ShieldCheck, UserRound } from "lucide-react";
import { sidebarItems } from "@/lib/api-docs-data";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/api-docs/logo-mark";

export function ApiDocsSidebar() {
  return (
    <aside className="hidden min-h-screen w-[292px] shrink-0 border-r border-white/10 bg-ur-sidebar/90 p-5 backdrop-blur-xl xl:block">
      <LogoMark />
      <nav className="mt-9 space-y-1" aria-label="API documentation navigation">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <a key={item.label} href={item.href} className={cn("flex h-11 items-center gap-3 rounded-ur-sm px-3 text-sm font-bold transition-colors ur-focus", item.active ? "border border-ur-primary/25 bg-ur-primary/12 text-white" : "text-white/56 hover:bg-white/5 hover:text-white")}>
              <Icon className={cn("h-4 w-4", item.active ? "text-ur-primary" : "text-white/44")} />
              {item.label}
            </a>
          );
        })}
      </nav>
      <div className="mt-8 rounded-ur-xl border border-ur-primary/25 bg-ur-primary/8 p-4">
        <ShieldCheck className="h-6 w-6 text-ur-primary" />
        <p className="mt-3 text-sm font-black text-white">External API ready</p>
        <p className="mt-2 text-xs leading-5 text-white/58">Use server-side API keys, signed webhooks, and proof-aware viewing access.</p>
        <div className="mt-4 grid gap-2">
          <Link href="/api-docs/openapi.json" className="inline-flex h-9 items-center justify-center gap-2 rounded-ur-sm border border-white/10 text-xs font-bold text-white/70 hover:border-ur-primary/40 hover:bg-white/5 ur-focus">
            OpenAPI JSON <ExternalLink className="h-3.5 w-3.5" />
          </Link>
          <Link href="https://github.com" className="inline-flex h-9 items-center justify-center gap-2 rounded-ur-sm border border-white/10 text-xs font-bold text-white/70 hover:border-ur-primary/40 hover:bg-white/5 ur-focus">
            GitHub examples <Github className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
      <div className="mt-8 border-t border-white/10 pt-5">
        <div className="flex items-center gap-3 rounded-ur-lg border border-white/10 bg-black/16 p-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-ur-primary/15 text-ur-primary"><UserRound className="h-5 w-5" /></div>
          <div className="min-w-0"><p className="truncate text-sm font-black text-white">Developer Admin</p><p className="text-xs text-white/46">API Integration</p></div>
        </div>
        <button type="button" className="mt-3 flex h-10 w-full items-center gap-3 rounded-ur-sm px-3 text-sm font-bold text-white/56 transition-colors hover:bg-white/5 hover:text-white ur-focus">
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>
    </aside>
  );
}
```

## `components/api-docs/api-docs-topbar.tsx`

```tsx
import Link from "next/link";
import { Bell, Download, Menu, Search, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/api-docs/logo-mark";

export function ApiDocsTopbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ur-bg/78 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 xl:hidden">
          <button type="button" className="grid h-10 w-10 place-items-center rounded-ur-sm border border-white/10 text-white/70 transition-colors hover:border-ur-primary/50 hover:bg-white/5 hover:text-white ur-focus" aria-label="Open menu">
            <Menu className="h-4 w-4" />
          </button>
          <LogoMark />
        </div>
        <label className="relative hidden flex-1 xl:block">
          <span className="sr-only">Search API documentation</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/42" />
          <input placeholder="Search endpoint, path, webhook, request field, response field, SDK..." className="h-11 w-full max-w-[760px] rounded-ur-sm border border-white/10 bg-black/18 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-ur-primary" />
        </label>
        <div className="flex items-center gap-2">
          <Link href="/notifications" className="relative grid h-10 w-10 place-items-center rounded-ur-sm border border-white/10 text-white/70 transition-colors hover:border-ur-warning/50 hover:bg-white/5 hover:text-white ur-focus" aria-label="Open notifications">
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-ur-warning px-1 text-[10px] font-black text-black">3</span>
          </Link>
          <Button className="hidden sm:inline-flex"><Download className="h-4 w-4" /> Export OpenAPI</Button>
          <Link href="/profile" className="grid h-10 w-10 place-items-center rounded-ur-sm border border-white/10 text-white/70 transition-colors hover:border-ur-primary/50 hover:bg-white/5 hover:text-white ur-focus" aria-label="Developer profile"><UserRound className="h-4 w-4" /></Link>
        </div>
      </div>
    </header>
  );
}
```

## `components/api-docs/api-docs-page.tsx`

```tsx
import { BadgeCheck, Code2, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ApiDocsSidebar } from "@/components/api-docs/api-docs-sidebar";
import { ApiDocsTopbar } from "@/components/api-docs/api-docs-topbar";
import { ApiHero } from "@/components/api-docs/api-hero";
import { ApiStatsGrid } from "@/components/api-docs/api-stats-grid";
import { AuthPanel } from "@/components/api-docs/auth-panel";
import { EndpointCatalog } from "@/components/api-docs/endpoint-catalog";
import { CodeExamplePanel } from "@/components/api-docs/code-example-panel";
import { IntegrationFlowPanel } from "@/components/api-docs/integration-flow-panel";
import { WebhooksPanel } from "@/components/api-docs/webhooks-panel";
import { SdkCardsPanel } from "@/components/api-docs/sdk-cards-panel";
import { SecurityRulesPanel } from "@/components/api-docs/security-rules-panel";
import { ApiPlaygroundPanel } from "@/components/api-docs/api-playground-panel";

export function ApiDocsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 api-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-cyan/10 blur-[130px]" />
      <div className="relative z-10 flex min-h-screen">
        <ApiDocsSidebar />
        <div className="min-w-0 flex-1">
          <ApiDocsTopbar />
          <section className="px-5 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1440px]">
              <div className="mb-6" id="overview">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="success"><BadgeCheck className="h-3.5 w-3.5" /> API documentation</Badge>
                  <Badge variant="outline"><ShieldCheck className="h-3.5 w-3.5" /> Secure rental-platform integration</Badge>
                  <Badge variant="outline"><Code2 className="h-3.5 w-3.5" /> REST + Webhooks</Badge>
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">API documentation page</p>
                <h1 className="mt-3 max-w-[1040px] text-[42px] font-black leading-[1.02] tracking-[-0.07em] text-white sm:text-[56px]">External rental platforms can plug into verified viewing.</h1>
                <p className="mt-4 max-w-[940px] text-base leading-7 text-white/66">Use UrbanRentisha TrustLayer APIs to create listing records, viewing requests, Stellar payment intents, private proof workflows, viewing-code unlocks, suspicious listing reports, and webhook updates.</p>
              </div>
              <ApiHero />
              <ApiStatsGrid />
              <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_420px]">
                <section className="space-y-6">
                  <AuthPanel />
                  <EndpointCatalog />
                  <WebhooksPanel />
                  <SdkCardsPanel />
                </section>
                <aside className="space-y-5 xl:sticky xl:top-24 xl:self-start">
                  <CodeExamplePanel />
                  <IntegrationFlowPanel />
                  <ApiPlaygroundPanel />
                  <SecurityRulesPanel />
                </aside>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
```

## `components/api-docs/api-hero.tsx`

```tsx
import { ArrowRight, Code2, Globe2, ShieldCheck, Webhook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ApiHero() {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="grid gap-6 lg:grid-cols-[1.18fr_0.82fr] lg:items-center">
        <div>
          <Badge variant="success"><ShieldCheck className="h-3.5 w-3.5" /> Partner integration layer</Badge>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] text-white">Build verified viewing into any rental platform.</h2>
          <p className="mt-3 max-w-[760px] text-sm leading-6 text-white/62">External platforms can create viewing requests, collect Stellar testnet payment references, trigger private proof generation, verify proof status, unlock viewing codes, and receive webhooks without becoming a full marketplace.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button>Start integration <ArrowRight className="h-4 w-4" /></Button>
            <Button variant="outline">View OpenAPI</Button>
          </div>
        </div>
        <div className="rounded-ur-lg border border-white/10 bg-black/18 p-5">
          <div className="grid gap-3">
            <TechRow icon={<Globe2 className="h-4 w-4" />} label="Base URL" value="https://api.urbanrentisha.dev" />
            <TechRow icon={<Code2 className="h-4 w-4" />} label="Version" value="/api/v1/external" />
            <TechRow icon={<Webhook className="h-4 w-4" />} label="Webhook header" value="x-ur-signature" />
            <TechRow icon={<ShieldCheck className="h-4 w-4" />} label="Auth" value="API key + JWT" />
          </div>
        </div>
      </div>
    </section>
  );
}

function TechRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-ur-sm border border-white/10 bg-black/20 p-3">
      <div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">{icon}</div><p className="text-sm font-bold text-white/70">{label}</p></div>
      <p className="max-w-[230px] truncate font-mono text-xs font-bold text-ur-mint">{value}</p>
    </div>
  );
}
```

## `components/api-docs/api-stats-grid.tsx`

```tsx
import { apiStats } from "@/lib/api-docs-data";
import { cn } from "@/lib/utils";

export function ApiStatsGrid() {
  return (
    <section className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
      {apiStats.map((stat) => {
        const Icon = stat.icon;
        return (
          <article key={stat.label} className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4">
              <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">{stat.label}</p><p className="mt-2 text-3xl font-black tracking-[-0.05em] text-white">{stat.value}</p></div>
              <div className={cn("grid h-11 w-11 place-items-center rounded-ur", stat.tone === "warning" ? "bg-ur-warning-bg text-ur-warning" : stat.tone === "success" ? "bg-ur-success-bg text-ur-success" : "bg-white/5 text-white/60")}><Icon className="h-5 w-5" /></div>
            </div>
            <p className="mt-4 text-sm leading-6 text-white/52">{stat.helper}</p>
          </article>
        );
      })}
    </section>
  );
}
```

## `components/api-docs/auth-panel.tsx`

```tsx
import { AlertTriangle, KeyRound, LockKeyhole, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AuthPanel() {
  return (
    <section id="authentication" className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">Authentication</p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">Secure server-side integration</h2>
          <p className="mt-2 max-w-[760px] text-sm leading-6 text-white/56">External platforms authenticate with a server-side API key, exchange it for a short-lived JWT, and verify signed webhooks.</p>
        </div>
        <Badge variant="success"><ShieldCheck className="h-3.5 w-3.5" /> API key required</Badge>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <AuthCard icon={<KeyRound className="h-5 w-5" />} title="API Key" text="Used only on the partner backend. Never expose it in browser JavaScript." value="ur_live_xxxxxxxxx" />
        <AuthCard icon={<LockKeyhole className="h-5 w-5" />} title="JWT" text="Short-lived bearer token used to call listing, payment, proof, and viewing-code APIs." value="Authorization: Bearer <token>" />
        <AuthCard icon={<AlertTriangle className="h-5 w-5" />} title="Webhook Secret" text="Used to verify webhook signatures before trusting external event updates." value="x-ur-signature" />
      </div>
      <div className="mt-5 rounded-ur-lg border border-ur-warning/25 bg-ur-warning-bg p-4">
        <p className="text-sm font-black text-white">Security warning</p>
        <p className="mt-2 text-sm leading-6 text-ur-warning/76">Live API keys, webhook secrets, and platform tokens must stay on the backend only.</p>
      </div>
    </section>
  );
}

function AuthCard({ icon, title, text, value }: { icon: React.ReactNode; title: string; text: string; value: string }) {
  return (
    <article className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
      <div className="grid h-10 w-10 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">{icon}</div>
      <h3 className="mt-4 text-lg font-black text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-white/56">{text}</p>
      <p className="mt-4 truncate rounded-ur-sm border border-white/10 bg-black/24 px-3 py-2 font-mono text-xs font-bold text-ur-mint">{value}</p>
    </article>
  );
}
```

## `components/api-docs/endpoint-catalog.tsx`

```tsx
import { endpointGroups, apiEndpoints } from "@/lib/api-docs-data";
import { EndpointCard } from "@/components/api-docs/endpoint-card";

export function EndpointCatalog() {
  return (
    <section id="endpoints" className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">Endpoints</p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">External rental-platform API catalog</h2>
        <p className="mt-2 max-w-[820px] text-sm leading-6 text-white/56">Use these APIs to add verified viewing, payment proof, access unlocks, and suspicious-listing reporting into existing rental products.</p>
      </div>
      <div className="mt-6 space-y-8">
        {endpointGroups.map((group) => {
          const endpoints = apiEndpoints.filter((endpoint) => endpoint.group === group);
          const anchor = group.toLowerCase().replaceAll(" ", "-");
          return (
            <div key={group} id={anchor}>
              <div className="mb-3 flex items-center gap-3"><div className="h-px flex-1 bg-white/10" /><p className="text-xs font-black uppercase tracking-[0.16em] text-white/42">{group}</p><div className="h-px flex-1 bg-white/10" /></div>
              <div className="space-y-3">{endpoints.map((endpoint) => <EndpointCard key={endpoint.id} endpoint={endpoint} />)}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
```

## `components/api-docs/endpoint-card.tsx`

```tsx
import { Braces, Copy, LockKeyhole } from "lucide-react";
import { methodVisuals, statusVisuals, type ApiEndpoint } from "@/lib/api-docs-data";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/api-docs/status-badge";
import { Button } from "@/components/ui/button";

export function EndpointCard({ endpoint }: { endpoint: ApiEndpoint }) {
  const method = methodVisuals[endpoint.method];
  const status = statusVisuals[endpoint.status];
  return (
    <article className="rounded-ur-lg border border-white/10 bg-black/16 p-4 transition-colors hover:border-ur-primary/40 hover:bg-white/[0.04]">
      <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-start">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2"><Badge variant={method.variant}>{method.label}</Badge><p className="break-all font-mono text-sm font-black text-ur-mint">{endpoint.path}</p></div>
          <h3 className="mt-3 text-lg font-black text-white">{endpoint.title}</h3>
          <p className="mt-2 max-w-[820px] text-sm leading-6 text-white/56">{endpoint.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <StatusBadge label={status.label} variant={status.variant} icon={status.icon} />
            <Badge variant="outline"><LockKeyhole className="h-3.5 w-3.5" /> {endpoint.auth}</Badge>
            <Badge variant="neutral"><Braces className="h-3.5 w-3.5" /> {endpoint.id}</Badge>
          </div>
        </div>
        <Button variant="outline" size="sm"><Copy className="h-4 w-4" /> Copy path</Button>
      </div>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <CodeBlock label="Request" code={endpoint.requestExample} />
        <CodeBlock label="Response" code={endpoint.responseExample} />
      </div>
    </article>
  );
}

function CodeBlock({ label, code }: { label: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-ur-sm border border-white/10 bg-[#050806]">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2"><p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">{label}</p><Copy className="h-3.5 w-3.5 text-white/36" /></div>
      <pre className="max-h-[260px] overflow-auto p-3 text-xs leading-5 text-white/72 api-scrollbar"><code>{code}</code></pre>
    </div>
  );
}
```

## `components/api-docs/code-example-panel.tsx`

```tsx
import { Copy, TerminalSquare } from "lucide-react";
import { codeSamples } from "@/lib/api-docs-data";
import { Button } from "@/components/ui/button";

export function CodeExamplePanel() {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">Quick start</p><h2 className="mt-2 text-lg font-black text-white">Auth token request</h2></div><TerminalSquare className="h-6 w-6 text-ur-primary" /></div>
      <div className="mt-4 overflow-hidden rounded-ur-sm border border-white/10 bg-[#050806]">
        <div className="flex items-center justify-between border-b border-white/10 px-3 py-2"><p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">cURL</p><Copy className="h-3.5 w-3.5 text-white/36" /></div>
        <pre className="max-h-[260px] overflow-auto p-3 text-xs leading-5 text-white/72 api-scrollbar"><code>{codeSamples.authCurl}</code></pre>
      </div>
      <h3 className="mt-5 text-sm font-black text-white">Create viewing request</h3>
      <div className="mt-3 overflow-hidden rounded-ur-sm border border-white/10 bg-[#050806]"><pre className="max-h-[230px] overflow-auto p-3 text-xs leading-5 text-white/72 api-scrollbar"><code>{codeSamples.createRequest}</code></pre></div>
      <Button className="mt-4 w-full"><Copy className="h-4 w-4" /> Copy quick start</Button>
    </section>
  );
}
```

## `components/api-docs/code-block-small.tsx`

```tsx
import { Copy } from "lucide-react";

export function CodeBlockSmall({ label, code }: { label: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-ur-sm border border-white/10 bg-[#050806]">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2"><p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">{label}</p><Copy className="h-3.5 w-3.5 text-white/36" /></div>
      <pre className="max-h-[260px] overflow-auto p-3 text-xs leading-5 text-white/72 api-scrollbar"><code>{code}</code></pre>
    </div>
  );
}
```

## `components/api-docs/integration-flow-panel.tsx`

```tsx
import { integrationSteps } from "@/lib/api-docs-data";

export function IntegrationFlowPanel() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">Integration flow</p>
      <h2 className="mt-2 text-lg font-black text-white">Verified viewing workflow</h2>
      <div className="mt-4 space-y-3">
        {integrationSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <article key={step.title} className="flex gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary"><Icon className="h-4 w-4" /></div>
              <div><p className="text-sm font-black text-white">{index + 1}. {step.title}</p><p className="mt-1 text-xs leading-5 text-white/52">{step.description}</p></div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
```

## `components/api-docs/webhooks-panel.tsx`

```tsx
import { Webhook } from "lucide-react";
import { webhookEvents, webhookStatusVisuals, codeSamples } from "@/lib/api-docs-data";
import { StatusBadge } from "@/components/api-docs/status-badge";
import { CodeBlockSmall } from "@/components/api-docs/code-block-small";

export function WebhooksPanel() {
  return (
    <section id="webhooks" className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">Webhooks</p><h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">Real-time trust updates</h2><p className="mt-2 max-w-[760px] text-sm leading-6 text-white/56">Receive payment, proof, access, and report updates inside your rental platform.</p></div>
        <Webhook className="h-7 w-7 text-ur-primary" />
      </div>
      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        {webhookEvents.map((event) => {
          const visual = webhookStatusVisuals[event.status];
          return (
            <article key={event.id} className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
              <div className="flex items-start justify-between gap-4"><div><p className="font-mono text-sm font-black text-ur-mint">{event.event}</p><p className="mt-2 text-sm leading-6 text-white/56">{event.description}</p><p className="mt-3 font-mono text-xs font-bold text-white/48">payload: {event.payloadKey}</p></div><StatusBadge label={visual.label} variant={visual.variant} icon={visual.icon} /></div>
            </article>
          );
        })}
      </div>
      <div className="mt-5"><CodeBlockSmall label="Example webhook payload" code={codeSamples.webhookPayload} /></div>
    </section>
  );
}
```

## `components/api-docs/sdk-cards-panel.tsx`

```tsx
import { Download } from "lucide-react";
import { sdkCards } from "@/lib/api-docs-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function SdkCardsPanel() {
  return (
    <section id="sdks" className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">SDK and integration options</p><h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">Choose the integration path</h2></div>
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {sdkCards.map((sdk) => {
          const Icon = sdk.icon;
          return (
            <article key={sdk.language} className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
              <div className="flex items-start justify-between gap-4"><div className="grid h-11 w-11 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary"><Icon className="h-5 w-5" /></div><Badge variant={sdk.status === "recommended" ? "success" : "neutral"}>{sdk.status}</Badge></div>
              <h3 className="mt-4 text-lg font-black text-white">{sdk.language}</h3>
              <p className="mt-2 font-mono text-xs font-bold text-ur-mint">{sdk.packageName}</p>
              <p className="mt-3 rounded-ur-sm border border-white/10 bg-black/24 px-3 py-2 font-mono text-xs text-white/64">{sdk.installCommand}</p>
              <Button variant="outline" className="mt-4 w-full"><Download className="h-4 w-4" /> View setup</Button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
```

## `components/api-docs/api-playground-panel.tsx`

```tsx
import { Play, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ApiPlaygroundPanel() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">API playground</p><h2 className="mt-2 text-lg font-black text-white">Test request preview</h2></div><Badge variant="warning">Demo</Badge></div>
      <div className="mt-4 space-y-3">
        <label className="block"><span className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">Endpoint</span><select className="mt-2 h-11 w-full rounded-ur-sm border border-white/10 bg-black/18 px-3 text-sm text-white outline-none focus:border-ur-primary"><option>POST /api/v1/external/viewing-requests</option><option>POST /api/v1/external/payments/stellar-intent</option><option>POST /api/v1/external/proofs/verify</option></select></label>
        <label className="block"><span className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">Request body</span><textarea className="mt-2 min-h-[150px] w-full rounded-ur-sm border border-white/10 bg-black/18 p-3 font-mono text-xs leading-5 text-white outline-none focus:border-ur-primary" defaultValue={`{
  "listingId": "UR-LST-1001",
  "tenantExternalId": "TEN-123456"
}`} /></label>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3"><Button><Play className="h-4 w-4" /> Send</Button><Button variant="outline"><RefreshCcw className="h-4 w-4" /> Reset</Button></div>
    </section>
  );
}
```

## `components/api-docs/security-rules-panel.tsx`

```tsx
import { securityRules } from "@/lib/api-docs-data";

export function SecurityRulesPanel() {
  return (
    <section id="security" className="rounded-ur-xl border border-ur-warning/25 bg-ur-warning-bg p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-warning">Security rules</p>
      <h2 className="mt-2 text-lg font-black text-white">Integration safety requirements</h2>
      <div className="mt-4 space-y-3">
        {securityRules.map((rule) => {
          const Icon = rule.icon;
          return (
            <div key={rule.title} className="flex gap-3 rounded-ur-sm border border-ur-warning/20 bg-black/16 p-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm bg-ur-warning/15 text-ur-warning"><Icon className="h-4 w-4" /></div>
              <div><p className="text-sm font-black text-white">{rule.title}</p><p className="mt-1 text-xs leading-5 text-ur-warning/74">{rule.description}</p></div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
```

---

# 14. Acceptance Checklist

```text
The route /api-docs works.
Google Fonts are loaded.
Inter is used for UI text.
JetBrains Mono is used for endpoints, API keys, webhook headers, JSON, and code blocks.
UrbanRentisha dark green theme is applied.
Left docs sidebar is visible on desktop.
Topbar search is visible.
API documentation title and trust badges are visible.
API hero is visible.
API stats grid is visible.
Authentication panel is visible.
Endpoint catalog is visible.
Each endpoint includes method, path, title, description, status, auth type, request example, and response example.
Webhook events are visible.
SDK cards are visible.
Quick-start code examples are visible.
Integration flow is visible.
API playground preview is visible.
Security rules are visible.
Mobile layout is stacked and readable.
All controls have visible focus states.
```

---

# 15. Final UX Summary

```text
The API Documentation Page is the external developer entry point.
It should make UrbanRentisha TrustLayer easy to integrate into any rental platform while keeping payment proof, viewing access, webhooks, and security requirements clear.
```
