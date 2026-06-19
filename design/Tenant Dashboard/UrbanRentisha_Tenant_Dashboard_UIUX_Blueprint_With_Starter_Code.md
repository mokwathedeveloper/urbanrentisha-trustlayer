# UrbanRentisha TrustLayer Tenant Dashboard UI/UX Blueprint and Starter Code

## 1. Screen Covered

```text
16. Tenant Dashboard only
```

## 2. Page Purpose

The **Tenant Dashboard** shows tenant requests, payment statuses, proof statuses, escrow/payment-hold statuses, viewing codes, notifications, reports, and viewing history.

This screen helps tenants:

```text
Track active viewing requests
See payment status for each request
See private proof generation and verification status
See escrow/payment-hold status
Open unlocked viewing codes
Review trust-flow notifications
Track suspicious listing reports
Review viewing history
Continue key actions from one dashboard
```

---

## 3. Design Inspiration Rule

The provided MantleMandate design system is used only as structural inspiration for:

```text
Strict spacing
Dark SaaS dashboard layout
Persistent app sidebar
Readable status tables
Clear cards and panels
Accessible controls
Minimal motion
Technical trust tone
```

Do not copy MantleMandate branding, logo, or blue palette.

UrbanRentisha must keep its own identity:

```text
Dark green trust UI
Eco-friendly real estate trust
Verified rental access
Tenant safety
ZK payment proof
Stellar verification
Professional B2B SaaS clarity
```

---

## 4. UX Goal

The tenant should understand this immediately:

```text
This dashboard is the control center for all tenant trust flows.
Every request shows payment, proof, hold, and viewing-code progress.
Important updates are visible without leaving the dashboard.
The tenant can safely continue to payment, proof, viewing code, reports, or history.
```

---

## 5. Required Dashboard Content

Required sections:

```text
Tenant overview
Active requests
Payment statuses
Proof statuses
Escrow/payment-hold statuses
Viewing codes
Notifications
Reports
Viewing history
Quick actions
Trust flow timeline
Safety guidance
Audit references
```

Status categories:

```text
Payment: Not started, Pending, Paid, Held, Refunded
Proof: Not generated, Generating, Generated, Verified, Failed
Hold: None, Active, Released, Expired, Refunded
Viewing code: Locked, Unlocked, Expired
Request: In progress, Ready, Completed, Attention
Report: Submitted, Reviewed, Resolved
```

---

## 6. Final Folder Structure

```text
urbanrentisha-tenant-dashboard/
├── app/
│   ├── tenant/
│   │   └── dashboard/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── tenant-dashboard/
│   │   ├── active-request-overview-card.tsx
│   │   ├── audit-references-card.tsx
│   │   ├── dashboard-sidebar.tsx
│   │   ├── dashboard-stats-grid.tsx
│   │   ├── dashboard-topbar.tsx
│   │   ├── logo-mark.tsx
│   │   ├── notification-summary-panel.tsx
│   │   ├── payment-and-proof-panel.tsx
│   │   ├── quick-actions-panel.tsx
│   │   ├── reports-panel.tsx
│   │   ├── request-status-table.tsx
│   │   ├── safety-rules-card.tsx
│   │   ├── status-badge.tsx
│   │   ├── tenant-dashboard-page.tsx
│   │   ├── trust-flow-timeline-card.tsx
│   │   ├── viewing-code-panel.tsx
│   │   └── viewing-history-panel.tsx
│   │
│   └── ui/
│       ├── badge.tsx
│       └── button.tsx
│
├── lib/
│   ├── tenant-dashboard-data.ts
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
Left fixed sidebar
Sticky topbar
Dashboard title and trust badges
Stats grid
Main two-column layout:
  Left:
    - active request overview
    - request status table
    - payment/proof panel
    - viewing code panel
    - viewing history
  Right sticky:
    - quick actions
    - notifications
    - reports
    - trust flow timeline
    - safety rules
    - audit references
```

Mobile and tablet:

```text
Topbar with menu button
No fixed sidebar
Dashboard title
Stats grid stacked
Active request overview
Status table as stacked cards
Payment/proof
Viewing code
Quick actions
Notifications
Reports
History
Safety rules
Audit references
```

---

## 8. Interaction Rules

```text
Find property goes to property listing page.
Open viewing code goes to viewing code success screen.
View payment goes to Stellar payment screen.
View proof goes to proof verification screen.
View payment hold goes to escrow/payment-hold screen.
Report suspicious listing goes to report screen.
Notifications link to notifications screen.
Request rows link to request detail.
Viewing code copy button is UI-ready for clipboard integration.
Search field is UI-ready for dashboard-wide filtering.
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
JetBrains Mono = tenant ID, request IDs, listing IDs, transaction hashes, proof hashes, viewing codes, wallet address, audit references
```

Use JetBrains Mono for:

```text
TNT-UR-1188
REQ-UR-9084
UR-LST-1001
UR-4829-LOCK
GCDK...9X2P
4f7a8b2c...b3c4d5
soro_0x7ab...2c109
tenant_flow_active
```

---

## 11. Accessibility Requirements

```text
Status must use text, icon, and color together.
Tables must collapse into readable cards on smaller screens.
Sidebar links must have visible active state.
Search input must have accessible label.
Notification unread state must use text, not color only.
Viewing code should be readable and copyable.
All buttons and links must have visible focus states.
Long hash/reference values must truncate safely.
Minimum mobile touch target should be 44px.
```

---

## 12. Implementation Notes

This starter is UI-only.

Connect it later to:

```text
Tenant profile API
Viewing request API
Payment status API
Proof status API
Escrow/payment-hold API
Viewing code API
Notifications API
Reports API
Viewing history API
Search/filter API
```

Recommended API endpoints:

```text
GET /api/v1/tenant/dashboard
GET /api/v1/tenant/requests
GET /api/v1/tenant/payments
GET /api/v1/tenant/proofs
GET /api/v1/tenant/holds
GET /api/v1/tenant/viewing-codes
GET /api/v1/notifications
GET /api/v1/reports
GET /api/v1/tenant/viewing-history
```

Recommended route:

```text
/tenant/dashboard
```

---

# 13. Full Starter Code

\n## `package.json`\n\n```json\n{
  "name": "urbanrentisha-tenant-dashboard-screen",
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
\n```\n\n## `next.config.ts`\n\n```ts\nimport type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true
};

export default nextConfig;
\n```\n\n## `postcss.config.js`\n\n```js\nmodule.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
\n```\n\n## `tsconfig.json`\n\n```json\n{
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
\n```\n\n## `tailwind.config.ts`\n\n```ts\nimport type { Config } from "tailwindcss";

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
        "card-hover": "0 18px 55px rgba(22, 163, 74, 0.13)",
        "warning-glow": "0 0 55px rgba(245, 158, 11, 0.14)"
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
\n```\n\n## `app/layout.tsx`\n\n```tsx\nimport type { Metadata } from "next";
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
  title: "Tenant Dashboard | UrbanRentisha TrustLayer",
  description:
    "Track tenant viewing requests, payments, proofs, holds, viewing codes, notifications, reports, and viewing history."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
\n```\n\n## `app/globals.css`\n\n```css\n@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-inter: Inter, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  background: #060B0A;
  color: #F8FAFC;
  font-family: var(--font-inter);
}

code,
pre,
.font-mono {
  font-family: var(--font-mono);
}

::selection {
  background: rgba(22, 163, 74, 0.35);
}

@layer utilities {
  .ur-container {
    @apply mx-auto w-full max-w-[1440px] px-5 sm:px-6 lg:px-8;
  }

  .ur-focus {
    @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ur-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ur-bg;
  }

  .dashboard-grid-bg {
    background-image:
      linear-gradient(rgba(22, 163, 74, 0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(22, 163, 74, 0.045) 1px, transparent 1px);
    background-size: 38px 38px;
  }

  .dashboard-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(22, 163, 74, 0.45) rgba(255, 255, 255, 0.04);
  }
}
\n```\n\n## `app/page.tsx`\n\n```tsx\nimport { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/tenant/dashboard");
}
\n```\n\n## `app/tenant/dashboard/page.tsx`\n\n```tsx\nimport { TenantDashboardPage } from "@/components/tenant-dashboard/tenant-dashboard-page";

export default function Page() {
  return <TenantDashboardPage />;
}
\n```\n\n## `lib/utils.ts`\n\n```ts\nimport { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
\n```\n\n## `lib/tenant-dashboard-data.ts`\n\n```ts\nimport {
  AlertTriangle,
  BadgeCheck,
  Bell,
  Building2,
  CalendarCheck2,
  CheckCircle2,
  Clock3,
  Copy,
  Database,
  DoorOpen,
  Eye,
  FileWarning,
  Flag,
  Hash,
  Heart,
  HelpCircle,
  Home,
  KeyRound,
  LayoutDashboard,
  LockKeyhole,
  MapPin,
  MessageCircle,
  ReceiptText,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TimerReset,
  UserRound,
  WalletCards
} from "lucide-react";

export type PaymentStatus = "not_started" | "pending" | "paid" | "held" | "refunded";
export type ProofStatus = "not_generated" | "generating" | "generated" | "verified" | "failed";
export type HoldStatus = "none" | "active" | "released" | "expired" | "refunded";
export type ViewingCodeStatus = "locked" | "unlocked" | "expired";
export type RequestStatus = "in_progress" | "ready" | "completed" | "attention";
export type ReportStatus = "submitted" | "reviewed" | "resolved";
export type NotificationType = "payment" | "proof" | "access" | "report" | "viewing-code";

export type TenantProfile = {
  id: string;
  name: string;
  role: string;
  walletAddress: string;
  accountStatus: "Verified tenant";
  activeRequests: number;
  unreadNotifications: number;
  completedViewings: number;
};

export type TenantRequest = {
  id: string;
  propertyId: string;
  propertyTitle: string;
  location: string;
  agentName: string;
  requestedAt: string;
  viewingDate: string;
  viewingTime: string;
  paymentAmountKes: number;
  paymentStatus: PaymentStatus;
  proofStatus: ProofStatus;
  holdStatus: HoldStatus;
  viewingCodeStatus: ViewingCodeStatus;
  requestStatus: RequestStatus;
  viewingCode?: string;
  txHash?: string;
  proofHash?: string;
};

export type ViewingHistoryItem = {
  id: string;
  propertyTitle: string;
  location: string;
  date: string;
  agentName: string;
  status: "completed" | "cancelled" | "expired";
  proofReference: string;
};

export type TenantNotification = {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  href: string;
};

export type TenantReport = {
  id: string;
  propertyTitle: string;
  reason: string;
  status: ReportStatus;
  submittedAt: string;
};

export const tenantProfile: TenantProfile = {
  id: "TNT-UR-1188",
  name: "John Tenant",
  role: "Verified Tenant",
  walletAddress: "GCDK...9X2P",
  accountStatus: "Verified tenant",
  activeRequests: 3,
  unreadNotifications: 5,
  completedViewings: 8
};

export const tenantRequests: TenantRequest[] = [
  {
    id: "REQ-UR-9084",
    propertyId: "UR-LST-1001",
    propertyTitle: "Kilimani Green View Apartment",
    location: "Kilimani, Nairobi",
    agentName: "Amina Njoroge",
    requestedAt: "Today, 10:04 AM",
    viewingDate: "22 Jun 2026",
    viewingTime: "11:30 AM",
    paymentAmountKes: 500,
    paymentStatus: "paid",
    proofStatus: "verified",
    holdStatus: "active",
    viewingCodeStatus: "unlocked",
    requestStatus: "ready",
    viewingCode: "UR-4829-LOCK",
    txHash: "4f7a8b2c...b3c4d5",
    proofHash: "soro_0x7ab...2c109"
  },
  {
    id: "REQ-UR-9121",
    propertyId: "UR-LST-1024",
    propertyTitle: "Westlands Studio Loft",
    location: "Westlands, Nairobi",
    agentName: "Daniel Mwangi",
    requestedAt: "Today, 12:18 PM",
    viewingDate: "23 Jun 2026",
    viewingTime: "2:00 PM",
    paymentAmountKes: 400,
    paymentStatus: "held",
    proofStatus: "generated",
    holdStatus: "active",
    viewingCodeStatus: "locked",
    requestStatus: "in_progress",
    txHash: "8d2a1f0c...91e77a",
    proofHash: "zkp_0x8fe...a12cc"
  },
  {
    id: "REQ-UR-9146",
    propertyId: "UR-LST-1042",
    propertyTitle: "Lavington Garden Maisonette",
    location: "Lavington, Nairobi",
    agentName: "Faith Wanjiku",
    requestedAt: "Yesterday, 5:41 PM",
    viewingDate: "24 Jun 2026",
    viewingTime: "10:00 AM",
    paymentAmountKes: 700,
    paymentStatus: "pending",
    proofStatus: "not_generated",
    holdStatus: "none",
    viewingCodeStatus: "locked",
    requestStatus: "attention"
  }
];

export const viewingHistory: ViewingHistoryItem[] = [
  {
    id: "HST-UR-7001",
    propertyTitle: "Parklands One Bedroom",
    location: "Parklands, Nairobi",
    date: "18 Jun 2026",
    agentName: "Kevin Otieno",
    status: "completed",
    proofReference: "soro_0x21e...90fa1"
  },
  {
    id: "HST-UR-6968",
    propertyTitle: "Ngong Road Bedsitter",
    location: "Ngong Road, Nairobi",
    date: "14 Jun 2026",
    agentName: "Grace Muthoni",
    status: "completed",
    proofReference: "soro_0x4ab...d9e21"
  },
  {
    id: "HST-UR-6882",
    propertyTitle: "Kileleshwa Studio",
    location: "Kileleshwa, Nairobi",
    date: "9 Jun 2026",
    agentName: "Amina Njoroge",
    status: "expired",
    proofReference: "soro_0xb91...2af10"
  }
];

export const tenantNotifications: TenantNotification[] = [
  {
    id: "NTF-1001",
    type: "viewing-code",
    title: "Viewing code unlocked",
    description: "Your code for Kilimani Green View Apartment is ready.",
    time: "2 min ago",
    unread: true,
    href: "/viewing-code/REQ-UR-9084"
  },
  {
    id: "NTF-1002",
    type: "proof",
    title: "Proof verified",
    description: "Soroban verification accepted the payment proof.",
    time: "6 min ago",
    unread: true,
    href: "/proof-verification/REQ-UR-9084"
  },
  {
    id: "NTF-1003",
    type: "payment",
    title: "Payment hold active",
    description: "Reservation hold is active for Westlands Studio Loft.",
    time: "22 min ago",
    unread: true,
    href: "/payment-hold/REQ-UR-9121"
  },
  {
    id: "NTF-1004",
    type: "report",
    title: "Report reviewed",
    description: "Your report for Westlands Studio Loft was reviewed.",
    time: "1 hr ago",
    unread: false,
    href: "/reports/RPT-UR-3310"
  }
];

export const tenantReports: TenantReport[] = [
  {
    id: "RPT-UR-3310",
    propertyTitle: "Westlands Studio Loft",
    reason: "Agent requested off-platform payment",
    status: "reviewed",
    submittedAt: "18 Jun 2026"
  },
  {
    id: "RPT-UR-3291",
    propertyTitle: "Ngong Road Bedsitter",
    reason: "Location mismatch",
    status: "resolved",
    submittedAt: "12 Jun 2026"
  }
];

export const dashboardStats = [
  {
    label: "Active requests",
    value: "3",
    helper: "2 active, 1 needs action",
    icon: CalendarCheck2,
    tone: "success"
  },
  {
    label: "Payment statuses",
    value: "2",
    helper: "Paid or held requests",
    icon: WalletCards,
    tone: "success"
  },
  {
    label: "Verified proofs",
    value: "1",
    helper: "Soroban accepted",
    icon: ShieldCheck,
    tone: "success"
  },
  {
    label: "Notifications",
    value: "5",
    helper: "Unread trust-flow updates",
    icon: Bell,
    tone: "warning"
  }
];

export const quickActions = [
  {
    label: "Find verified property",
    description: "Search properties with verified listing badges.",
    href: "/listings",
    icon: Search
  },
  {
    label: "Open viewing code",
    description: "Go to the latest unlocked viewing code.",
    href: "/viewing-code/REQ-UR-9084",
    icon: KeyRound
  },
  {
    label: "View payment hold",
    description: "Check the reservation and hold status.",
    href: "/payment-hold/REQ-UR-9084",
    icon: ReceiptText
  },
  {
    label: "Report suspicious listing",
    description: "Submit a safety report for suspicious activity.",
    href: "/report-listing/UR-LST-1001",
    icon: Flag
  }
];

export const trustFlowSteps = [
  {
    title: "Request created",
    description: "Tenant requested verified viewing.",
    status: "Complete",
    icon: CalendarCheck2
  },
  {
    title: "Payment received",
    description: "Viewing fee payment matched request.",
    status: "Complete",
    icon: WalletCards
  },
  {
    title: "Proof verified",
    description: "Private proof accepted on verification layer.",
    status: "Complete",
    icon: ShieldCheck
  },
  {
    title: "Access unlocked",
    description: "Viewing code is active for the scheduled slot.",
    status: "Active",
    icon: DoorOpen
  }
];

export const sidebarItems = [
  { label: "Dashboard", href: "/tenant/dashboard", icon: LayoutDashboard, active: true },
  { label: "Properties", href: "/listings", icon: Home },
  { label: "Requests", href: "/tenant/requests", icon: CalendarCheck2 },
  { label: "Payments", href: "/tenant/payments", icon: WalletCards },
  { label: "Proofs", href: "/tenant/proofs", icon: LockKeyhole },
  { label: "Viewing Codes", href: "/tenant/viewing-codes", icon: KeyRound },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Reports", href: "/reports", icon: Flag },
  { label: "History", href: "/tenant/history", icon: Clock3 },
  { label: "Saved", href: "/tenant/saved", icon: Heart },
  { label: "Support", href: "/support", icon: HelpCircle }
];

export const statusVisuals = {
  payment: {
    paid: { label: "Paid", variant: "success", icon: CheckCircle2 },
    held: { label: "Held", variant: "warning", icon: ReceiptText },
    pending: { label: "Pending", variant: "warning", icon: TimerReset },
    not_started: { label: "Not started", variant: "neutral", icon: Clock3 },
    refunded: { label: "Refunded", variant: "neutral", icon: WalletCards }
  },
  proof: {
    verified: { label: "Verified", variant: "success", icon: ShieldCheck },
    generated: { label: "Generated", variant: "warning", icon: LockKeyhole },
    generating: { label: "Generating", variant: "warning", icon: TimerReset },
    not_generated: { label: "Not generated", variant: "neutral", icon: Clock3 },
    failed: { label: "Failed", variant: "danger", icon: AlertTriangle }
  },
  hold: {
    active: { label: "Active hold", variant: "warning", icon: ReceiptText },
    released: { label: "Released", variant: "success", icon: CheckCircle2 },
    expired: { label: "Expired", variant: "danger", icon: AlertTriangle },
    refunded: { label: "Refunded", variant: "neutral", icon: WalletCards },
    none: { label: "No hold", variant: "neutral", icon: Clock3 }
  },
  code: {
    unlocked: { label: "Unlocked", variant: "success", icon: KeyRound },
    locked: { label: "Locked", variant: "warning", icon: LockKeyhole },
    expired: { label: "Expired", variant: "danger", icon: TimerReset }
  }
} as const;

export const safetyRules = [
  {
    title: "Use platform payments only",
    description: "Do not send money outside UrbanRentisha when requesting a viewing.",
    icon: WalletCards
  },
  {
    title: "Check proof and access status",
    description: "Viewing access should unlock only after payment and proof verification.",
    icon: ShieldCheck
  },
  {
    title: "Keep viewing codes private",
    description: "Share a viewing code only with the verified agent or access desk.",
    icon: KeyRound
  },
  {
    title: "Report suspicious behaviour",
    description: "Use the report flow if an agent asks for extra payment or unsafe access.",
    icon: ShieldAlert
  }
];

export const auditReferences = [
  {
    label: "Tenant ID",
    value: "TNT-UR-1188",
    icon: UserRound
  },
  {
    label: "Active request",
    value: "REQ-UR-9084",
    icon: CalendarCheck2
  },
  {
    label: "Network",
    value: "Stellar Testnet",
    icon: Sparkles
  },
  {
    label: "Latest TX",
    value: "4f7a8b2c...b3c4d5",
    icon: Hash
  },
  {
    label: "Proof",
    value: "soro_0x7ab...2c109",
    icon: LockKeyhole
  },
  {
    label: "Audit DB",
    value: "tenant_flow_active",
    icon: Database
  }
];
\n```\n\n## `components/ui/button.tsx`\n\n```tsx\nimport * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "warning" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "border border-ur-primary bg-ur-primary text-white hover:bg-ur-primary-hover",
  secondary:
    "border border-ur-border-strong bg-ur-card text-ur-text hover:bg-ur-card-hover",
  ghost:
    "border border-transparent bg-transparent text-ur-muted hover:bg-white/5 hover:text-white",
  outline:
    "border border-white/14 bg-transparent text-white hover:border-ur-primary/60 hover:bg-white/5",
  warning:
    "border border-ur-warning/30 bg-ur-warning-bg text-ur-warning hover:bg-ur-warning/15",
  danger:
    "border border-ur-error/40 bg-ur-error-bg text-ur-error hover:bg-ur-error/15"
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-10 px-5 text-sm",
  lg: "h-[52px] px-8 text-base"
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
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
\n```\n\n## `components/ui/badge.tsx`\n\n```tsx\nimport * as React from "react";
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

export function Badge({
  className,
  variant = "neutral",
  ...props
}: BadgeProps) {
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
\n```\n\n## `components/tenant-dashboard/logo-mark.tsx`\n\n```tsx\nimport Link from "next/link";
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
        <p className="text-xl font-black tracking-[-0.04em] text-white">
          Urban<span className="text-ur-primary">Rentisha</span>
        </p>
        <p className="text-sm font-semibold text-ur-muted">TrustLayer</p>
      </div>
    </Link>
  );
}
\n```\n\n## `components/tenant-dashboard/dashboard-sidebar.tsx`\n\n```tsx\nimport Link from "next/link";
import { LogOut, UserRound } from "lucide-react";
import { sidebarItems, tenantProfile } from "@/lib/tenant-dashboard-data";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/tenant-dashboard/logo-mark";

export function DashboardSidebar() {
  return (
    <aside className="hidden min-h-screen w-[280px] shrink-0 border-r border-white/10 bg-ur-sidebar/90 p-5 backdrop-blur-xl xl:block">
      <LogoMark />

      <nav className="mt-9 space-y-1" aria-label="Tenant dashboard navigation">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex h-11 items-center gap-3 rounded-ur-sm px-3 text-sm font-bold transition-colors ur-focus",
                item.active
                  ? "border border-ur-primary/25 bg-ur-primary/12 text-white"
                  : "text-white/56 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className={cn("h-4 w-4", item.active ? "text-ur-primary" : "text-white/44")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-4">
        <p className="text-sm font-black text-white">Verified tenant</p>
        <p className="mt-2 text-xs leading-5 text-white/56">
          Your viewing requests use payment proof verification for safer access.
        </p>
        <p className="mt-3 font-mono text-xs font-bold text-ur-mint">
          {tenantProfile.walletAddress}
        </p>
      </div>

      <div className="mt-8 border-t border-white/10 pt-5">
        <div className="flex items-center gap-3 rounded-ur-lg border border-white/10 bg-black/16 p-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-ur-primary/15 text-ur-primary">
            <UserRound className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-black text-white">{tenantProfile.name}</p>
            <p className="text-xs text-white/46">{tenantProfile.role}</p>
          </div>
        </div>

        <button
          type="button"
          className="mt-3 flex h-10 w-full items-center gap-3 rounded-ur-sm px-3 text-sm font-bold text-white/56 transition-colors hover:bg-white/5 hover:text-white ur-focus"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
\n```\n\n## `components/tenant-dashboard/dashboard-topbar.tsx`\n\n```tsx\nimport Link from "next/link";
import { Bell, Menu, Search, UserRound } from "lucide-react";
import { tenantProfile } from "@/lib/tenant-dashboard-data";
import { LogoMark } from "@/components/tenant-dashboard/logo-mark";
import { Button } from "@/components/ui/button";

export function DashboardTopbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ur-bg/78 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 xl:hidden">
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-ur-sm border border-white/10 text-white/70 transition-colors hover:border-ur-primary/50 hover:bg-white/5 hover:text-white ur-focus"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
          <LogoMark />
        </div>

        <label className="relative hidden flex-1 xl:block">
          <span className="sr-only">Search dashboard</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/42" />
          <input
            placeholder="Search request, property, payment, proof, code..."
            className="h-11 w-full max-w-[620px] rounded-ur-sm border border-white/10 bg-black/18 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-ur-primary"
          />
        </label>

        <div className="flex items-center gap-2">
          <Link
            href="/notifications"
            className="relative grid h-10 w-10 place-items-center rounded-ur-sm border border-white/10 text-white/70 transition-colors hover:border-ur-primary/50 hover:bg-white/5 hover:text-white ur-focus"
            aria-label={`${tenantProfile.unreadNotifications} unread notifications`}
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-ur-primary px-1 text-[10px] font-black text-white">
              {tenantProfile.unreadNotifications}
            </span>
          </Link>

          <Link href="/listings">
            <Button className="hidden sm:inline-flex">
              Find property
            </Button>
          </Link>

          <Link
            href="/tenant/profile"
            className="grid h-10 w-10 place-items-center rounded-ur-sm border border-white/10 text-white/70 transition-colors hover:border-ur-primary/50 hover:bg-white/5 hover:text-white ur-focus"
            aria-label="Tenant profile"
          >
            <UserRound className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
\n```\n\n## `components/tenant-dashboard/status-badge.tsx`\n\n```tsx\nimport { Badge } from "@/components/ui/badge";

type StatusBadgeProps = {
  label: string;
  variant: "success" | "warning" | "danger" | "neutral" | "outline";
  icon: React.ComponentType<{ className?: string }>;
};

export function StatusBadge({ label, variant, icon: Icon }: StatusBadgeProps) {
  return (
    <Badge variant={variant}>
      <Icon className="h-3.5 w-3.5" />
      {label}
    </Badge>
  );
}
\n```\n\n## `components/tenant-dashboard/tenant-dashboard-page.tsx`\n\n```tsx\nimport { BadgeCheck, ShieldCheck } from "lucide-react";
import { DashboardSidebar } from "@/components/tenant-dashboard/dashboard-sidebar";
import { DashboardTopbar } from "@/components/tenant-dashboard/dashboard-topbar";
import { DashboardStatsGrid } from "@/components/tenant-dashboard/dashboard-stats-grid";
import { ActiveRequestOverviewCard } from "@/components/tenant-dashboard/active-request-overview-card";
import { RequestStatusTable } from "@/components/tenant-dashboard/request-status-table";
import { PaymentAndProofPanel } from "@/components/tenant-dashboard/payment-and-proof-panel";
import { ViewingCodePanel } from "@/components/tenant-dashboard/viewing-code-panel";
import { NotificationSummaryPanel } from "@/components/tenant-dashboard/notification-summary-panel";
import { ReportsPanel } from "@/components/tenant-dashboard/reports-panel";
import { ViewingHistoryPanel } from "@/components/tenant-dashboard/viewing-history-panel";
import { QuickActionsPanel } from "@/components/tenant-dashboard/quick-actions-panel";
import { TrustFlowTimelineCard } from "@/components/tenant-dashboard/trust-flow-timeline-card";
import { SafetyRulesCard } from "@/components/tenant-dashboard/safety-rules-card";
import { AuditReferencesCard } from "@/components/tenant-dashboard/audit-references-card";
import { Badge } from "@/components/ui/badge";

export function TenantDashboardPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 dashboard-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-mint/10 blur-[130px]" />

      <div className="relative z-10 flex min-h-screen">
        <DashboardSidebar />

        <div className="min-w-0 flex-1">
          <DashboardTopbar />

          <section className="px-5 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1440px]">
              <div className="mb-6 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="success">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      Verified tenant
                    </Badge>
                    <Badge variant="outline">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Payment proof protected
                    </Badge>
                  </div>

                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
                    Tenant dashboard
                  </p>
                  <h1 className="mt-3 max-w-[920px] text-[42px] font-black leading-[1.02] tracking-[-0.07em] text-white sm:text-[56px]">
                    Track every viewing request from payment to access.
                  </h1>
                  <p className="mt-4 max-w-[860px] text-base leading-7 text-white/66">
                    Monitor tenant requests, payment statuses, proof statuses, payment holds, viewing codes, notifications, safety reports, and viewing history from one trust dashboard.
                  </p>
                </div>
              </div>

              <DashboardStatsGrid />

              <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_400px]">
                <section className="space-y-6">
                  <ActiveRequestOverviewCard />
                  <RequestStatusTable />

                  <div className="grid gap-6 lg:grid-cols-2">
                    <PaymentAndProofPanel />
                    <ViewingCodePanel />
                  </div>

                  <ViewingHistoryPanel />
                </section>

                <aside className="space-y-5 xl:sticky xl:top-24 xl:self-start">
                  <QuickActionsPanel />
                  <NotificationSummaryPanel />
                  <ReportsPanel />
                  <TrustFlowTimelineCard />
                  <SafetyRulesCard />
                  <AuditReferencesCard />
                </aside>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
\n```\n\n## `components/tenant-dashboard/dashboard-stats-grid.tsx`\n\n```tsx\nimport { dashboardStats } from "@/lib/tenant-dashboard-data";
import { cn } from "@/lib/utils";

export function DashboardStatsGrid() {
  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {dashboardStats.map((stat) => {
        const Icon = stat.icon;

        return (
          <article
            key={stat.label}
            className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
                  {stat.label}
                </p>
                <p className="mt-2 text-3xl font-black tracking-[-0.05em] text-white">
                  {stat.value}
                </p>
              </div>
              <div
                className={cn(
                  "grid h-11 w-11 place-items-center rounded-ur",
                  stat.tone === "warning"
                    ? "bg-ur-warning-bg text-ur-warning"
                    : "bg-ur-success-bg text-ur-success"
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-white/52">{stat.helper}</p>
          </article>
        );
      })}
    </section>
  );
}
\n```\n\n## `components/tenant-dashboard/active-request-overview-card.tsx`\n\n```tsx\nimport Link from "next/link";
import { ArrowRight, CalendarCheck2, MapPin, ShieldCheck } from "lucide-react";
import { tenantRequests } from "@/lib/tenant-dashboard-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ActiveRequestOverviewCard() {
  const activeRequest = tenantRequests[0];

  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
        <div>
          <Badge variant="success">
            <ShieldCheck className="h-3.5 w-3.5" />
            Access ready
          </Badge>

          <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] text-white">
            {activeRequest.propertyTitle}
          </h2>

          <p className="mt-2 flex items-center gap-2 text-sm text-white/60">
            <MapPin className="h-4 w-4 text-ur-primary" />
            {activeRequest.location}
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <InfoTile label="Request ID" value={activeRequest.id} />
            <InfoTile label="Viewing" value={`${activeRequest.viewingDate}, ${activeRequest.viewingTime}`} />
            <InfoTile label="Agent" value={activeRequest.agentName} />
          </div>
        </div>

        <div className="min-w-[270px] rounded-ur-lg border border-ur-success/20 bg-ur-success-bg p-5">
          <CalendarCheck2 className="h-8 w-8 text-ur-success" />
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-ur-success/72">
            Current status
          </p>
          <p className="mt-2 text-2xl font-black text-white">Viewing code unlocked</p>
          <p className="mt-2 text-sm leading-6 text-ur-success/72">
            Payment and proof verification are complete.
          </p>

          <Link href={`/viewing-code/${activeRequest.id}`} className="mt-5 block">
            <Button className="w-full">
              Open viewing code
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
        {label}
      </p>
      <p className="mt-2 truncate font-mono text-sm font-bold text-ur-mint">
        {value}
      </p>
    </div>
  );
}
\n```\n\n## `components/tenant-dashboard/request-status-table.tsx`\n\n```tsx\nimport Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { tenantRequests, statusVisuals } from "@/lib/tenant-dashboard-data";
import { StatusBadge } from "@/components/tenant-dashboard/status-badge";
import { Button } from "@/components/ui/button";

export function RequestStatusTable() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Tenant requests
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            Request status center
          </h2>
          <p className="mt-2 text-sm leading-6 text-white/56">
            Payment, proof, hold, and viewing code status for every active request.
          </p>
        </div>

        <Link href="/tenant/requests">
          <Button variant="outline" size="sm">
            View all
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="mt-5 overflow-hidden rounded-ur-lg border border-white/10">
        <div className="hidden grid-cols-[1.4fr_140px_140px_140px_150px_90px] gap-4 border-b border-white/10 bg-black/20 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white/38 xl:grid">
          <span>Property</span>
          <span>Payment</span>
          <span>Proof</span>
          <span>Hold</span>
          <span>Viewing code</span>
          <span>Action</span>
        </div>

        <div className="divide-y divide-white/10">
          {tenantRequests.map((request) => {
            const payment = statusVisuals.payment[request.paymentStatus];
            const proof = statusVisuals.proof[request.proofStatus];
            const hold = statusVisuals.hold[request.holdStatus];
            const code = statusVisuals.code[request.viewingCodeStatus];

            return (
              <article
                key={request.id}
                className="grid gap-4 bg-black/10 px-4 py-4 xl:grid-cols-[1.4fr_140px_140px_140px_150px_90px] xl:items-center"
              >
                <div>
                  <p className="font-black text-white">{request.propertyTitle}</p>
                  <p className="mt-1 flex items-center gap-2 text-sm text-white/52">
                    <MapPin className="h-4 w-4 text-ur-primary" />
                    {request.location}
                  </p>
                  <p className="mt-2 font-mono text-xs font-bold text-ur-mint">
                    {request.id}
                  </p>
                </div>

                <StatusBadge label={payment.label} variant={payment.variant} icon={payment.icon} />
                <StatusBadge label={proof.label} variant={proof.variant} icon={proof.icon} />
                <StatusBadge label={hold.label} variant={hold.variant} icon={hold.icon} />
                <StatusBadge label={code.label} variant={code.variant} icon={code.icon} />

                <Link href={`/viewing-requests/${request.id}`}>
                  <Button size="sm" variant="outline" className="w-full xl:w-auto">
                    Open
                  </Button>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
\n```\n\n## `components/tenant-dashboard/payment-and-proof-panel.tsx`\n\n```tsx\nimport Link from "next/link";
import { ArrowRight, Hash, LockKeyhole, ReceiptText, ShieldCheck, WalletCards } from "lucide-react";
import { tenantRequests } from "@/lib/tenant-dashboard-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function PaymentAndProofPanel() {
  const request = tenantRequests[0];

  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Payment and proof
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        Payment proof is verified.
      </h2>

      <div className="mt-5 grid gap-3">
        <StatusRow
          icon={<WalletCards className="h-5 w-5" />}
          label="Payment status"
          value="Paid"
          badge={<Badge variant="success">KES {request.paymentAmountKes}</Badge>}
        />
        <StatusRow
          icon={<ReceiptText className="h-5 w-5" />}
          label="Transaction"
          value={request.txHash ?? "Not available"}
          mono
        />
        <StatusRow
          icon={<LockKeyhole className="h-5 w-5" />}
          label="Proof reference"
          value={request.proofHash ?? "Not available"}
          mono
        />
        <StatusRow
          icon={<ShieldCheck className="h-5 w-5" />}
          label="Verification"
          value="Accepted by verification layer"
          badge={<Badge variant="success">Verified</Badge>}
        />
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Link href={`/stellar-payment/${request.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            View payment
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <Link href={`/proof-verification/${request.id}`} className="w-full">
          <Button className="w-full">
            View proof
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}

function StatusRow({
  icon,
  label,
  value,
  badge,
  mono
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  badge?: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-ur-lg border border-white/10 bg-black/16 p-4">
      <div className="flex min-w-0 items-center gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
            {label}
          </p>
          <p className={mono ? "mt-1 truncate font-mono text-sm font-bold text-ur-mint" : "mt-1 text-sm font-bold text-white"}>
            {value}
          </p>
        </div>
      </div>
      {badge}
    </div>
  );
}
\n```\n\n## `components/tenant-dashboard/viewing-code-panel.tsx`\n\n```tsx\nimport Link from "next/link";
import { ArrowRight, Copy, KeyRound, TimerReset } from "lucide-react";
import { tenantRequests } from "@/lib/tenant-dashboard-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ViewingCodePanel() {
  const request = tenantRequests[0];

  return (
    <section className="rounded-ur-xl border border-ur-success/25 bg-ur-success-bg p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-success">
            Viewing code
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            Access code unlocked
          </h2>
        </div>
        <Badge variant="success">
          <KeyRound className="h-3.5 w-3.5" />
          Ready
        </Badge>
      </div>

      <div className="mt-5 rounded-ur-xl border border-ur-success/20 bg-black/24 p-5 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-ur-success/70">
          Latest code
        </p>
        <p className="mt-3 break-all font-mono text-3xl font-black tracking-[0.08em] text-white">
          {request.viewingCode}
        </p>
      </div>

      <div className="mt-4 rounded-ur-lg border border-ur-success/20 bg-black/16 p-4">
        <div className="flex gap-3">
          <TimerReset className="mt-0.5 h-5 w-5 shrink-0 text-ur-success" />
          <p className="text-sm leading-6 text-ur-success/78">
            Valid for {request.viewingDate} at {request.viewingTime}. Share only with the verified agent or access desk.
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Button variant="outline" className="w-full">
          <Copy className="h-4 w-4" />
          Copy code
        </Button>
        <Link href={`/viewing-code/${request.id}`} className="w-full">
          <Button className="w-full">
            Open code
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
\n```\n\n## `components/tenant-dashboard/notification-summary-panel.tsx`\n\n```tsx\nimport Link from "next/link";
import { ArrowRight, Dot } from "lucide-react";
import { tenantNotifications } from "@/lib/tenant-dashboard-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function NotificationSummaryPanel() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Notifications
          </p>
          <h2 className="mt-2 text-lg font-black text-white">Recent updates</h2>
        </div>
        <Badge variant="warning">5 unread</Badge>
      </div>

      <div className="mt-4 space-y-3">
        {tenantNotifications.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="block rounded-ur-sm border border-white/10 bg-black/16 p-3 transition-colors hover:border-ur-primary/40 hover:bg-white/[0.04] ur-focus"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-black text-white">{item.title}</p>
                <p className="mt-1 text-xs leading-5 text-white/52">{item.description}</p>
                <p className="mt-2 text-xs font-bold text-white/38">{item.time}</p>
              </div>
              {item.unread ? (
                <span className="inline-flex shrink-0 items-center rounded-full bg-ur-primary/14 px-2 py-0.5 text-[11px] font-black text-ur-mint">
                  <Dot className="h-4 w-4" />
                  New
                </span>
              ) : null}
            </div>
          </Link>
        ))}
      </div>

      <Link href="/notifications" className="mt-4 block">
        <Button variant="outline" className="w-full">
          View notifications
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </section>
  );
}
\n```\n\n## `components/tenant-dashboard/reports-panel.tsx`\n\n```tsx\nimport Link from "next/link";
import { ArrowRight, Flag } from "lucide-react";
import { tenantReports } from "@/lib/tenant-dashboard-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function statusVariant(status: string) {
  if (status === "resolved") return "success";
  if (status === "reviewed") return "warning";
  return "neutral";
}

export function ReportsPanel() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Safety reports
          </p>
          <h2 className="mt-2 text-lg font-black text-white">Report activity</h2>
        </div>
        <Flag className="h-5 w-5 text-ur-primary" />
      </div>

      <div className="mt-4 space-y-3">
        {tenantReports.map((report) => (
          <article key={report.id} className="rounded-ur-sm border border-white/10 bg-black/16 p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-black text-white">{report.propertyTitle}</p>
                <p className="mt-1 text-xs leading-5 text-white/52">{report.reason}</p>
                <p className="mt-2 font-mono text-xs font-bold text-ur-mint">{report.id}</p>
              </div>
              <Badge variant={statusVariant(report.status)}>{report.status}</Badge>
            </div>
          </article>
        ))}
      </div>

      <Link href="/report-listing/UR-LST-1001" className="mt-4 block">
        <Button variant="danger" className="w-full">
          Report suspicious listing
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </section>
  );
}
\n```\n\n## `components/tenant-dashboard/viewing-history-panel.tsx`\n\n```tsx\nimport { CalendarCheck2, MapPin } from "lucide-react";
import { viewingHistory } from "@/lib/tenant-dashboard-data";
import { Badge } from "@/components/ui/badge";

function historyVariant(status: string) {
  if (status === "completed") return "success";
  if (status === "expired") return "warning";
  return "danger";
}

export function ViewingHistoryPanel() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Viewing history
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        Recent property viewings
      </h2>

      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        {viewingHistory.map((item) => (
          <article key={item.id} className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                <CalendarCheck2 className="h-5 w-5" />
              </div>
              <Badge variant={historyVariant(item.status)}>{item.status}</Badge>
            </div>

            <h3 className="mt-4 font-black text-white">{item.propertyTitle}</h3>
            <p className="mt-2 flex items-center gap-2 text-sm text-white/52">
              <MapPin className="h-4 w-4 text-ur-primary" />
              {item.location}
            </p>
            <p className="mt-3 text-sm text-white/58">{item.date}</p>
            <p className="mt-2 text-xs text-white/42">Agent: {item.agentName}</p>
            <p className="mt-3 truncate font-mono text-xs font-bold text-ur-mint">
              {item.proofReference}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
\n```\n\n## `components/tenant-dashboard/quick-actions-panel.tsx`\n\n```tsx\nimport Link from "next/link";
import { ArrowRight } from "lucide-react";
import { quickActions } from "@/lib/tenant-dashboard-data";

export function QuickActionsPanel() {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Quick actions
      </p>
      <h2 className="mt-2 text-lg font-black text-white">Continue your trust flow</h2>

      <div className="mt-4 space-y-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center justify-between gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3 transition-colors hover:border-ur-primary/40 hover:bg-white/[0.04] ur-focus"
            >
              <div className="flex gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-black text-white">{action.label}</p>
                  <p className="mt-1 text-xs leading-5 text-white/52">{action.description}</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-white/38" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/tenant-dashboard/trust-flow-timeline-card.tsx`\n\n```tsx\nimport { CheckCircle2 } from "lucide-react";
import { trustFlowSteps } from "@/lib/tenant-dashboard-data";
import { Badge } from "@/components/ui/badge";

export function TrustFlowTimelineCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Current trust flow
      </p>

      <div className="mt-4 space-y-3">
        {trustFlowSteps.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="flex gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm bg-ur-success-bg text-ur-success">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-black text-white">{step.title}</p>
                  <Badge variant={step.status === "Active" ? "warning" : "success"}>
                    {step.status}
                  </Badge>
                </div>
                <p className="mt-1 text-xs leading-5 text-white/52">{step.description}</p>
                <Icon className="mt-2 h-4 w-4 text-ur-primary" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/tenant-dashboard/safety-rules-card.tsx`\n\n```tsx\nimport { safetyRules } from "@/lib/tenant-dashboard-data";

export function SafetyRulesCard() {
  return (
    <section className="rounded-ur-xl border border-ur-warning/25 bg-ur-warning-bg p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-warning">
        Tenant safety rules
      </p>

      <div className="mt-4 space-y-3">
        {safetyRules.map((rule) => {
          const Icon = rule.icon;
          return (
            <div key={rule.title} className="flex gap-3 rounded-ur-sm border border-ur-warning/20 bg-black/16 p-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm bg-ur-warning/15 text-ur-warning">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-black text-white">{rule.title}</p>
                <p className="mt-1 text-xs leading-5 text-ur-warning/74">{rule.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/tenant-dashboard/audit-references-card.tsx`\n\n```tsx\nimport { auditReferences } from "@/lib/tenant-dashboard-data";

export function AuditReferencesCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Audit references
      </p>

      <div className="mt-4 space-y-3">
        {auditReferences.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center justify-between gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-sm font-bold text-white/70">{item.label}</p>
              </div>
              <p className="max-w-[160px] truncate font-mono text-xs font-bold text-white">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
\n```\n
---

# 14. Acceptance Checklist

```text
The route /tenant/dashboard works.
Google Fonts are loaded.
Inter is used for UI text.
JetBrains Mono is used for tenant ID, wallet address, request IDs, listing IDs, hashes, and viewing codes.
UrbanRentisha dark green theme is applied.
Left sidebar is visible on desktop.
Topbar is visible.
Dashboard title and trust badges are visible.
Stats grid is visible.
Active request overview is visible.
Request status table shows payment, proof, hold, and viewing code states.
Payment and proof panel is visible.
Viewing code panel is visible.
Notifications panel is visible.
Reports panel is visible.
Viewing history panel is visible.
Quick actions panel is visible.
Trust flow timeline is visible.
Safety rules card is visible.
Audit references are visible.
Mobile layout is stacked and readable.
All controls have visible focus states.
```

---

# 15. Final UX Summary

```text
The Tenant Dashboard is the tenant's main trust command center.
It should make every rental viewing request easy to understand by showing the full chain from request, payment, proof, hold, and viewing code to safety reports and history.
```
