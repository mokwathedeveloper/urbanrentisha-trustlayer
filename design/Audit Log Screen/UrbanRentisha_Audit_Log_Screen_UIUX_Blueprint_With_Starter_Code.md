# UrbanRentisha TrustLayer Audit Log Screen UI/UX Blueprint and Starter Code

## 1. Screen Covered

```text
19. Audit Log Screen only
```

## 2. Page Purpose

The **Audit Log Screen** shows important system events and trust activity.

This screen helps admins, platform operators, and future compliance reviewers:

```text
Search system events
Review trust activity
Track proof verification records
Trace payment and viewing-code events
Review fake-listing and unsafe-payment reports
Check suspicious activity events
View event severity and integrity state
Export filtered audit logs
Open selected event details
```

---

## 3. Design Inspiration Rule

The provided MantleMandate design system is used only as structural inspiration for:

```text
Strict spacing
Dark SaaS dashboard layout
Persistent sidebar
Searchable event table
Readable status badges
Timeline structure
Minimal motion
Technical trust tone
```

Do not copy MantleMandate branding, logo, or blue palette.

UrbanRentisha must keep its own identity:

```text
Dark green trust UI
Eco-friendly real estate trust
Rental scam prevention
ZK payment proof
Stellar/Soroban verification
Professional B2B SaaS clarity
```

---

## 4. UX Goal

The user should understand this immediately:

```text
This page is the trust record for the platform.
Every important system event can be searched, filtered, reviewed, and exported.
Proof verification, payments, viewing codes, suspicious activity, reports, listings, agents, and access changes all leave a visible audit trail.
```

---

## 5. Required Screen Content

Required sections:

```text
Audit log hero
Audit statistics
Search and filter bar
Event timeline
Important system events table
Selected event details panel
Trust activity panel
Export and actions panel
Integrity status card
Sidebar navigation
Topbar search
```

Event categories:

```text
Proof verified
Payment received
Viewing code unlocked
Listing approved
Agent verified
Report submitted
Suspicious activity
Access revoked
System update
```

Status categories:

```text
Severity: Info, Success, Warning, Critical
Integrity: Verified, Pending, Flagged
Actor type: System, Admin, Tenant, Agent, Contract
Target type: Request, Listing, Agent, Payment, Proof, Report, Viewing code, System
```

---

## 6. Final Folder Structure

```text
urbanrentisha-audit-log-screen/
├── app/
│   ├── audit-log/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── audit-log/
│   │   ├── audit-details-panel.tsx
│   │   ├── audit-event-table.tsx
│   │   ├── audit-export-panel.tsx
│   │   ├── audit-filter-bar.tsx
│   │   ├── audit-hero.tsx
│   │   ├── audit-log-page.tsx
│   │   ├── audit-sidebar.tsx
│   │   ├── audit-stats-grid.tsx
│   │   ├── audit-timeline.tsx
│   │   ├── audit-topbar.tsx
│   │   ├── integrity-status-card.tsx
│   │   ├── logo-mark.tsx
│   │   ├── status-badge.tsx
│   │   └── trust-activity-panel.tsx
│   │
│   └── ui/
│       ├── badge.tsx
│       └── button.tsx
│
├── lib/
│   ├── audit-log-data.ts
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
Left sidebar
Sticky topbar with search and export
Page title and trust badges
Audit hero
Stats grid
Search/filter bar
Main two-column layout:
  Left:
    - event timeline
    - important system events table
  Right sticky:
    - selected event details
    - trust activity
    - export and actions
    - integrity status
```

Mobile and tablet:

```text
Topbar with menu button
No fixed sidebar
Page title
Audit hero
Stats grid stacked
Search/filter bar
Timeline
Event table as stacked rows
Selected event details
Trust activity
Export controls
Integrity status
```

---

## 8. Interaction Rules

```text
Search supports event ID, actor, target, request ID, proof hash, transaction hash, listing ID, and report ID.
Filter tabs switch event categories.
Date button opens date-range picker when integrated.
Filters button opens advanced filter drawer when integrated.
Export button downloads filtered audit events.
View button opens selected event details.
Copy event ID action copies selected event reference.
Refresh logs pulls latest trust activity.
Critical events must be visually stronger than normal events.
Proof and transaction hashes must use JetBrains Mono.
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
JetBrains Mono = event IDs, request IDs, listing IDs, proof hashes, TX hashes, actor references, audit references
```

Use JetBrains Mono for:

```text
AUD-UR-5510
REQ-UR-9084
UR-LST-1001
CODE-UR-4829
RPT-UR-4418
soro_0x7ab42d3c...2c109
4f7a8b2c0ae9b3c4d5f611e8a92f001b
tenant_wallet/GCB7...22LP
```

---

## 11. Accessibility Requirements

```text
Status must use text, icon, and color together.
Critical events must say Critical, not just appear red.
Timeline cards must be readable without hover.
Search input must have accessible label.
Filter buttons must have keyboard focus.
Table rows must collapse into readable stacked cards on smaller screens.
Long hashes must truncate safely but remain copy-ready.
Export actions must be labeled clearly.
Minimum mobile touch target should be 44px.
```

---

## 12. Implementation Notes

This starter is UI-only.

Connect it later to:

```text
Audit log API
Search API
Filter API
Date range API
Export API
Selected event API
Trust activity API
Proof verification API
Report activity API
System event stream
```

Recommended API endpoints:

```text
GET /api/v1/audit-logs
GET /api/v1/audit-logs/:id
GET /api/v1/audit-logs/search
GET /api/v1/audit-logs/export
GET /api/v1/audit-logs/trust-activity
GET /api/v1/audit-logs/integrity
POST /api/v1/audit-logs/:id/flag
POST /api/v1/audit-logs/refresh
```

Recommended route:

```text
/audit-log
```

---

# 13. Full Starter Code

\n## `package.json`\n\n```json\n{
  "name": "urbanrentisha-audit-log-screen",
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
        "warning-glow": "0 0 55px rgba(245, 158, 11, 0.14)",
        "danger-glow": "0 0 55px rgba(239, 68, 68, 0.14)"
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
  title: "Audit Log | UrbanRentisha TrustLayer",
  description:
    "Review important system events, trust activity, proof events, reports, viewing code changes, and audit records."
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

  .audit-grid-bg {
    background-image:
      linear-gradient(rgba(22, 163, 74, 0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(22, 163, 74, 0.045) 1px, transparent 1px);
    background-size: 38px 38px;
  }

  .audit-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(22, 163, 74, 0.45) rgba(255, 255, 255, 0.04);
  }
}
\n```\n\n## `app/page.tsx`\n\n```tsx\nimport { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/audit-log");
}
\n```\n\n## `app/audit-log/page.tsx`\n\n```tsx\nimport { AuditLogPage } from "@/components/audit-log/audit-log-page";

export default function Page() {
  return <AuditLogPage />;
}
\n```\n\n## `lib/utils.ts`\n\n```ts\nimport { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
\n```\n\n## `lib/audit-log-data.ts`\n\n```ts\nimport {
  AlertTriangle,
  BadgeCheck,
  Bell,
  Building2,
  CalendarCheck2,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Code2,
  Copy,
  Database,
  Download,
  Eye,
  FileCheck2,
  FileSearch,
  FileWarning,
  Filter,
  Flag,
  Gauge,
  Hash,
  HelpCircle,
  Home,
  KeyRound,
  LayoutDashboard,
  ListChecks,
  LockKeyhole,
  LogOut,
  MessageCircle,
  Network,
  RefreshCcw,
  Search,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Star,
  TimerReset,
  UserCheck,
  UserRound,
  UsersRound,
  WalletCards,
  XCircle
} from "lucide-react";

export type AuditEventType =
  | "proof_verified"
  | "payment_received"
  | "viewing_code_unlocked"
  | "listing_approved"
  | "agent_verified"
  | "report_submitted"
  | "suspicious_activity"
  | "access_revoked"
  | "system_update";

export type AuditSeverity = "info" | "success" | "warning" | "critical";
export type AuditActorType = "system" | "admin" | "tenant" | "agent" | "contract";
export type AuditIntegrity = "verified" | "pending" | "flagged";

export type AuditEvent = {
  id: string;
  type: AuditEventType;
  title: string;
  description: string;
  actor: string;
  actorType: AuditActorType;
  target: string;
  targetType: "request" | "listing" | "agent" | "payment" | "proof" | "report" | "viewing_code" | "system";
  severity: AuditSeverity;
  integrity: AuditIntegrity;
  timestamp: string;
  dateGroup: "Today" | "Yesterday" | "Earlier";
  txHash?: string;
  proofHash?: string;
  requestId?: string;
  listingId?: string;
  ipAddress?: string;
};

export type AuditStat = {
  label: string;
  value: string;
  helper: string;
  tone: "success" | "warning" | "danger" | "neutral";
  icon: typeof Database;
};

export const auditStats: AuditStat[] = [
  {
    label: "Total events",
    value: "14.2K",
    helper: "System-wide trust activity",
    tone: "neutral",
    icon: Database
  },
  {
    label: "Verified events",
    value: "98.7%",
    helper: "Integrity checked records",
    tone: "success",
    icon: ShieldCheck
  },
  {
    label: "Proof events",
    value: "2,842",
    helper: "ZK/Soroban proof history",
    tone: "success",
    icon: LockKeyhole
  },
  {
    label: "Report events",
    value: "431",
    helper: "Fake listing and payment reports",
    tone: "warning",
    icon: Flag
  },
  {
    label: "Critical flags",
    value: "7",
    helper: "Needs trust-ops attention",
    tone: "danger",
    icon: ShieldAlert
  },
  {
    label: "Export ready",
    value: "CSV",
    helper: "Filtered audit export",
    tone: "success",
    icon: Download
  }
];

export const auditEvents: AuditEvent[] = [
  {
    id: "AUD-UR-5510",
    type: "proof_verified",
    title: "Proof verification accepted",
    description:
      "Tenant payment proof was verified through the trust verification flow before viewing access was unlocked.",
    actor: "system/verifier",
    actorType: "system",
    target: "REQ-UR-9084",
    targetType: "proof",
    severity: "success",
    integrity: "verified",
    timestamp: "Today, 10:31 AM",
    dateGroup: "Today",
    txHash: "4f7a8b2c0ae9b3c4d5f611e8a92f001b",
    proofHash: "soro_0x7ab42d3c...2c109",
    requestId: "REQ-UR-9084",
    listingId: "UR-LST-1001",
    ipAddress: "system"
  },
  {
    id: "AUD-UR-5509",
    type: "viewing_code_unlocked",
    title: "Viewing code unlocked",
    description:
      "A viewing code was generated after proof verification and payment-hold validation.",
    actor: "system/access-service",
    actorType: "system",
    target: "CODE-UR-4829",
    targetType: "viewing_code",
    severity: "success",
    integrity: "verified",
    timestamp: "Today, 10:32 AM",
    dateGroup: "Today",
    txHash: "7b2a99fd1c3a71e0b119f82c221d05c7",
    proofHash: "soro_0x7ab42d3c...2c109",
    requestId: "REQ-UR-9084",
    listingId: "UR-LST-1001",
    ipAddress: "system"
  },
  {
    id: "AUD-UR-5508",
    type: "report_submitted",
    title: "Unsafe payment report escalated",
    description:
      "A tenant reported that an agent requested off-platform payment outside the verified flow.",
    actor: "admin@urbanrentisha",
    actorType: "admin",
    target: "RPT-UR-4418",
    targetType: "report",
    severity: "critical",
    integrity: "verified",
    timestamp: "Today, 10:13 AM",
    dateGroup: "Today",
    requestId: "REQ-UR-9121",
    listingId: "UR-LST-1024",
    ipAddress: "102.214.88.19"
  },
  {
    id: "AUD-UR-5502",
    type: "listing_approved",
    title: "Property document approved",
    description:
      "Admin completed document review and approved the listing verification record.",
    actor: "admin@urbanrentisha",
    actorType: "admin",
    target: "APP-UR-9003",
    targetType: "listing",
    severity: "success",
    integrity: "verified",
    timestamp: "Today, 9:22 AM",
    dateGroup: "Today",
    listingId: "UR-LST-1024",
    ipAddress: "102.214.88.19"
  },
  {
    id: "AUD-UR-5498",
    type: "suspicious_activity",
    title: "Duplicate listing image hash detected",
    description:
      "Risk engine detected image reuse across two active rental listings with different managers.",
    actor: "system/risk-engine",
    actorType: "system",
    target: "SUS-UR-6998",
    targetType: "system",
    severity: "warning",
    integrity: "flagged",
    timestamp: "Yesterday, 5:45 PM",
    dateGroup: "Yesterday",
    listingId: "UR-LST-1220",
    ipAddress: "system"
  },
  {
    id: "AUD-UR-5484",
    type: "payment_received",
    title: "Viewing fee payment received",
    description:
      "Stellar testnet payment was attached to a viewing request and marked ready for proof generation.",
    actor: "tenant_wallet/GCB7...22LP",
    actorType: "tenant",
    target: "PAY-UR-7201",
    targetType: "payment",
    severity: "info",
    integrity: "verified",
    timestamp: "Yesterday, 2:30 PM",
    dateGroup: "Yesterday",
    txHash: "8d2a1f0c7119bbcc28d091e77a88951e",
    requestId: "REQ-UR-9084",
    listingId: "UR-LST-1001",
    ipAddress: "wallet"
  },
  {
    id: "AUD-UR-5470",
    type: "agent_verified",
    title: "Agent profile verified",
    description:
      "Agent identity and business profile were verified and moved to active status.",
    actor: "admin@urbanrentisha",
    actorType: "admin",
    target: "AGT-UR-2048",
    targetType: "agent",
    severity: "success",
    integrity: "verified",
    timestamp: "Earlier, 14 Jun 2026",
    dateGroup: "Earlier",
    ipAddress: "102.214.88.19"
  },
  {
    id: "AUD-UR-5466",
    type: "access_revoked",
    title: "Viewing access revoked",
    description:
      "Viewing code was revoked after a suspicious payment mismatch was detected.",
    actor: "system/access-service",
    actorType: "system",
    target: "CODE-UR-4397",
    targetType: "viewing_code",
    severity: "critical",
    integrity: "verified",
    timestamp: "Earlier, 13 Jun 2026",
    dateGroup: "Earlier",
    requestId: "REQ-UR-9146",
    listingId: "UR-LST-1042",
    ipAddress: "system"
  }
];

export const trustActivity = [
  {
    id: "TRUST-001",
    title: "Proof-backed access flow",
    description: "Verified payment proof unlocked a viewing code for REQ-UR-9084.",
    icon: LockKeyhole,
    tone: "success",
    reference: "soro_0x7ab...2c109"
  },
  {
    id: "TRUST-002",
    title: "Report safety triage",
    description: "Unsafe payment report moved to escalated status.",
    icon: Flag,
    tone: "danger",
    reference: "RPT-UR-4418"
  },
  {
    id: "TRUST-003",
    title: "Listing verification",
    description: "Document approval changed listing to verified.",
    icon: Building2,
    tone: "success",
    reference: "UR-LST-1024"
  },
  {
    id: "TRUST-004",
    title: "Risk engine flag",
    description: "Duplicate listing image hash requires admin review.",
    icon: ShieldAlert,
    tone: "warning",
    reference: "SUS-UR-6998"
  }
];

export const sidebarItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Audit Log", href: "/audit-log", icon: Database, active: true },
  { label: "Approvals", href: "/admin/approvals", icon: ClipboardCheck },
  { label: "Reports", href: "/admin/reports", icon: Flag },
  { label: "Agents", href: "/admin/agents", icon: UsersRound },
  { label: "Proof Activity", href: "/admin/proofs", icon: LockKeyhole },
  { label: "Risk Queue", href: "/admin/risk", icon: ShieldAlert },
  { label: "Analytics", href: "/admin/analytics", icon: Gauge },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "Support", href: "/support", icon: HelpCircle }
];

export const eventTypeLabels: Record<AuditEventType, string> = {
  proof_verified: "Proof verified",
  payment_received: "Payment received",
  viewing_code_unlocked: "Viewing code unlocked",
  listing_approved: "Listing approved",
  agent_verified: "Agent verified",
  report_submitted: "Report submitted",
  suspicious_activity: "Suspicious activity",
  access_revoked: "Access revoked",
  system_update: "System update"
};

export const statusVisuals = {
  severity: {
    info: { label: "Info", variant: "neutral", icon: Bell },
    success: { label: "Success", variant: "success", icon: CheckCircle2 },
    warning: { label: "Warning", variant: "warning", icon: AlertTriangle },
    critical: { label: "Critical", variant: "danger", icon: ShieldAlert }
  },
  integrity: {
    verified: { label: "Verified", variant: "success", icon: ShieldCheck },
    pending: { label: "Pending", variant: "warning", icon: TimerReset },
    flagged: { label: "Flagged", variant: "danger", icon: AlertTriangle }
  },
  eventTypeIcon: {
    proof_verified: LockKeyhole,
    payment_received: WalletCards,
    viewing_code_unlocked: KeyRound,
    listing_approved: Building2,
    agent_verified: UserCheck,
    report_submitted: Flag,
    suspicious_activity: ShieldAlert,
    access_revoked: XCircle,
    system_update: RefreshCcw
  }
} as const;

export const auditFilterTabs = [
  "All events",
  "Proofs",
  "Payments",
  "Reports",
  "Access",
  "Listings",
  "Agents",
  "Critical"
];

export const selectedEvent = auditEvents[0];

export const auditExportOptions = [
  {
    label: "Export CSV",
    description: "Download filtered audit rows.",
    icon: Download
  },
  {
    label: "Copy event ID",
    description: "Copy selected event reference.",
    icon: Copy
  },
  {
    label: "Refresh logs",
    description: "Pull latest trust activity.",
    icon: RefreshCcw
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
\n```\n\n## `components/audit-log/status-badge.tsx`\n\n```tsx\nimport type { ComponentType } from "react";
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
\n```\n\n## `components/audit-log/logo-mark.tsx`\n\n```tsx\nimport Link from "next/link";
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
\n```\n\n## `components/audit-log/audit-sidebar.tsx`\n\n```tsx\nimport Link from "next/link";
import { LogOut, ShieldCheck, UserRound } from "lucide-react";
import { sidebarItems } from "@/lib/audit-log-data";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/audit-log/logo-mark";

export function AuditSidebar() {
  return (
    <aside className="hidden min-h-screen w-[280px] shrink-0 border-r border-white/10 bg-ur-sidebar/90 p-5 backdrop-blur-xl xl:block">
      <LogoMark />

      <nav className="mt-9 space-y-1" aria-label="Audit log navigation">
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

      <div className="mt-8 rounded-ur-xl border border-ur-success/25 bg-ur-success-bg p-4">
        <ShieldCheck className="h-6 w-6 text-ur-success" />
        <p className="mt-3 text-sm font-black text-white">Integrity healthy</p>
        <p className="mt-2 text-xs leading-5 text-ur-success/74">
          Audit records are verified, searchable, export-ready, and linked to trust activity.
        </p>
      </div>

      <div className="mt-8 border-t border-white/10 pt-5">
        <div className="flex items-center gap-3 rounded-ur-lg border border-white/10 bg-black/16 p-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-ur-primary/15 text-ur-primary">
            <UserRound className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-black text-white">Platform Admin</p>
            <p className="text-xs text-white/46">Trust Operations</p>
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
\n```\n\n## `components/audit-log/audit-topbar.tsx`\n\n```tsx\nimport Link from "next/link";
import { Bell, Download, Menu, Search, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/audit-log/logo-mark";

export function AuditTopbar() {
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
          <span className="sr-only">Search audit logs</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/42" />
          <input
            placeholder="Search event ID, request ID, proof hash, tenant, listing, actor, or TX hash..."
            className="h-11 w-full max-w-[760px] rounded-ur-sm border border-white/10 bg-black/18 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-ur-primary"
          />
        </label>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/reports"
            className="relative grid h-10 w-10 place-items-center rounded-ur-sm border border-white/10 text-white/70 transition-colors hover:border-ur-warning/50 hover:bg-white/5 hover:text-white ur-focus"
            aria-label="Open report notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-ur-warning px-1 text-[10px] font-black text-black">
              7
            </span>
          </Link>

          <Button className="hidden sm:inline-flex">
            <Download className="h-4 w-4" />
            Export logs
          </Button>

          <Link
            href="/admin/profile"
            className="grid h-10 w-10 place-items-center rounded-ur-sm border border-white/10 text-white/70 transition-colors hover:border-ur-primary/50 hover:bg-white/5 hover:text-white ur-focus"
            aria-label="Admin profile"
          >
            <UserRound className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
\n```\n\n## `components/audit-log/audit-log-page.tsx`\n\n```tsx\nimport { BadgeCheck, Database, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AuditSidebar } from "@/components/audit-log/audit-sidebar";
import { AuditTopbar } from "@/components/audit-log/audit-topbar";
import { AuditHero } from "@/components/audit-log/audit-hero";
import { AuditStatsGrid } from "@/components/audit-log/audit-stats-grid";
import { AuditFilterBar } from "@/components/audit-log/audit-filter-bar";
import { AuditTimeline } from "@/components/audit-log/audit-timeline";
import { AuditEventTable } from "@/components/audit-log/audit-event-table";
import { AuditDetailsPanel } from "@/components/audit-log/audit-details-panel";
import { TrustActivityPanel } from "@/components/audit-log/trust-activity-panel";
import { AuditExportPanel } from "@/components/audit-log/audit-export-panel";
import { IntegrityStatusCard } from "@/components/audit-log/integrity-status-card";

export function AuditLogPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 audit-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-cyan/10 blur-[130px]" />

      <div className="relative z-10 flex min-h-screen">
        <AuditSidebar />

        <div className="min-w-0 flex-1">
          <AuditTopbar />

          <section className="px-5 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1440px]">
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="success">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Audit trail active
                  </Badge>
                  <Badge variant="outline">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Trust activity monitor
                  </Badge>
                  <Badge variant="outline">
                    <Database className="h-3.5 w-3.5" />
                    Export ready
                  </Badge>
                </div>

                <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
                  Audit log screen
                </p>
                <h1 className="mt-3 max-w-[980px] text-[42px] font-black leading-[1.02] tracking-[-0.07em] text-white sm:text-[56px]">
                  Important system events and trust activity.
                </h1>
                <p className="mt-4 max-w-[900px] text-base leading-7 text-white/66">
                  Review proof verification, payment, report, access, listing, agent, and system events with searchable audit references.
                </p>
              </div>

              <AuditHero />
              <AuditStatsGrid />
              <AuditFilterBar />

              <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_410px]">
                <section className="space-y-6">
                  <AuditTimeline />
                  <AuditEventTable />
                </section>

                <aside className="space-y-5 xl:sticky xl:top-24 xl:self-start">
                  <AuditDetailsPanel />
                  <TrustActivityPanel />
                  <AuditExportPanel />
                  <IntegrityStatusCard />
                </aside>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
\n```\n\n## `components/audit-log/audit-hero.tsx`\n\n```tsx\nimport { Database, LockKeyhole, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AuditHero() {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
        <div>
          <Badge variant="success">
            <ShieldCheck className="h-3.5 w-3.5" />
            Verified audit trail
          </Badge>

          <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] text-white">
            Every trust decision should leave a trail.
          </h2>

          <p className="mt-3 max-w-[760px] text-sm leading-6 text-white/62">
            The audit log captures proof verification, payment receipt, viewing code unlocks, suspicious activity, report escalation, listing approval, agent verification, and access changes.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <InfoTile label="Primary scope" value="trust_activity" />
            <InfoTile label="Network" value="Stellar Testnet" />
            <InfoTile label="Retention" value="immutable_ready" />
          </div>
        </div>

        <div className="rounded-ur-lg border border-white/10 bg-black/18 p-5">
          <Database className="h-9 w-9 text-ur-primary" />
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-white/38">
            Latest verified proof
          </p>
          <p className="mt-2 break-all font-mono text-sm font-black text-ur-mint">
            soro_0x7ab42d3c...2c109
          </p>
          <div className="mt-4 flex items-center gap-3 rounded-ur-sm border border-ur-success/20 bg-ur-success-bg p-3">
            <LockKeyhole className="h-4 w-4 text-ur-success" />
            <p className="text-sm font-bold text-ur-success">
              Proof accepted before viewing access unlock.
            </p>
          </div>
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
\n```\n\n## `components/audit-log/audit-stats-grid.tsx`\n\n```tsx\nimport { auditStats } from "@/lib/audit-log-data";
import { cn } from "@/lib/utils";

export function AuditStatsGrid() {
  return (
    <section className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
      {auditStats.map((stat) => {
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
                  stat.tone === "danger"
                    ? "bg-ur-error-bg text-ur-error"
                    : stat.tone === "warning"
                      ? "bg-ur-warning-bg text-ur-warning"
                      : stat.tone === "success"
                        ? "bg-ur-success-bg text-ur-success"
                        : "bg-white/5 text-white/60"
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
\n```\n\n## `components/audit-log/audit-filter-bar.tsx`\n\n```tsx\nimport { CalendarCheck2, Filter, Search } from "lucide-react";
import { auditFilterTabs } from "@/lib/audit-log-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AuditFilterBar() {
  return (
    <section className="mt-6 rounded-ur-xl border border-white/10 bg-white/[0.035] p-4 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">Search audit events</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/42" />
          <input
            placeholder="Search event ID, actor, target, request ID, proof hash, TX hash..."
            className="h-11 w-full rounded-ur-sm border border-white/10 bg-black/18 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-ur-primary"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <CalendarCheck2 className="h-4 w-4" />
            Last 7 days
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 audit-scrollbar">
        {auditFilterTabs.map((tab, index) => (
          <button
            key={tab}
            type="button"
            className={cn(
              "h-9 shrink-0 rounded-full border px-4 text-sm font-bold transition-colors ur-focus",
              index === 0
                ? "border-ur-primary bg-ur-primary text-white"
                : "border-white/10 bg-black/16 text-white/58 hover:border-ur-primary/40 hover:text-white"
            )}
          >
            {tab}
          </button>
        ))}
      </div>
    </section>
  );
}
\n```\n\n## `components/audit-log/audit-timeline.tsx`\n\n```tsx\nimport { auditEvents, eventTypeLabels, statusVisuals, type AuditEventType, type AuditSeverity } from "@/lib/audit-log-data";
import { StatusBadge } from "@/components/audit-log/status-badge";

export function AuditTimeline() {
  const groups = ["Today", "Yesterday", "Earlier"] as const;

  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Event timeline
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        Trust activity by time
      </h2>

      <div className="mt-5 space-y-8">
        {groups.map((group) => {
          const events = auditEvents.filter((event) => event.dateGroup === group);

          return (
            <div key={group}>
              <div className="mb-3 flex items-center gap-3">
                <div className="h-px flex-1 bg-white/10" />
                <p className="text-xs font-black uppercase tracking-[0.16em] text-white/42">{group}</p>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <div className="space-y-3">
                {events.map((event) => {
                  const TypeIcon = statusVisuals.eventTypeIcon[event.type as AuditEventType];
                  const severity = statusVisuals.severity[event.severity as AuditSeverity];

                  return (
                    <article
                      key={event.id}
                      className="relative rounded-ur-lg border border-white/10 bg-black/16 p-4 transition-colors hover:border-ur-primary/40 hover:bg-white/[0.04]"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex gap-4">
                          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                            <TypeIcon className="h-6 w-6" />
                          </div>

                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-ur-mint">
                              {eventTypeLabels[event.type]}
                            </p>
                            <h3 className="mt-1 font-black text-white">{event.title}</h3>
                            <p className="mt-2 max-w-[760px] text-sm leading-6 text-white/56">
                              {event.description}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <span className="font-mono text-xs font-bold text-ur-mint">{event.id}</span>
                              <span className="text-xs text-white/32">•</span>
                              <span className="font-mono text-xs font-bold text-white/58">{event.target}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                          <StatusBadge label={severity.label} variant={severity.variant} icon={severity.icon} />
                          <p className="w-full text-left text-xs text-white/42 sm:text-right">
                            {event.timestamp}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/audit-log/audit-event-table.tsx`\n\n```tsx\nimport { auditEvents, eventTypeLabels, statusVisuals, type AuditEventType, type AuditIntegrity, type AuditSeverity } from "@/lib/audit-log-data";
import { StatusBadge } from "@/components/audit-log/status-badge";
import { Button } from "@/components/ui/button";

export function AuditEventTable() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
          Audit table
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
          Important system events
        </h2>
        <p className="mt-2 text-sm leading-6 text-white/56">
          A compact audit view for IDs, actors, targets, severity, integrity, and action review.
        </p>
      </div>

      <div className="mt-5 overflow-hidden rounded-ur-lg border border-white/10">
        <div className="hidden grid-cols-[1.05fr_1fr_0.85fr_135px_135px_100px] gap-4 border-b border-white/10 bg-black/20 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white/38 xl:grid">
          <span>Event</span>
          <span>Actor</span>
          <span>Target</span>
          <span>Severity</span>
          <span>Integrity</span>
          <span>Action</span>
        </div>

        <div className="divide-y divide-white/10">
          {auditEvents.map((event) => {
            const TypeIcon = statusVisuals.eventTypeIcon[event.type as AuditEventType];
            const severity = statusVisuals.severity[event.severity as AuditSeverity];
            const integrity = statusVisuals.integrity[event.integrity as AuditIntegrity];

            return (
              <article
                key={event.id}
                className="grid gap-4 bg-black/10 px-4 py-4 xl:grid-cols-[1.05fr_1fr_0.85fr_135px_135px_100px] xl:items-center"
              >
                <div className="flex gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                    <TypeIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-black text-white">{event.title}</p>
                    <p className="mt-1 font-mono text-xs font-bold text-ur-mint">{event.id}</p>
                    <p className="mt-1 text-xs text-white/42">{eventTypeLabels[event.type]}</p>
                  </div>
                </div>

                <div>
                  <p className="font-mono text-xs font-bold text-white">{event.actor}</p>
                  <p className="mt-1 text-xs capitalize text-white/42">{event.actorType}</p>
                </div>

                <div>
                  <p className="font-mono text-xs font-bold text-white">{event.target}</p>
                  <p className="mt-1 text-xs capitalize text-white/42">{event.targetType.replace("_", " ")}</p>
                </div>

                <StatusBadge label={severity.label} variant={severity.variant} icon={severity.icon} />
                <StatusBadge label={integrity.label} variant={integrity.variant} icon={integrity.icon} />

                <Button size="sm" variant="outline">
                  View
                </Button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
\n```\n\n## `components/audit-log/audit-details-panel.tsx`\n\n```tsx\nimport { Database, Hash, MapPin, Network, ShieldCheck, UserRound } from "lucide-react";
import { selectedEvent, statusVisuals, type AuditIntegrity, type AuditSeverity } from "@/lib/audit-log-data";
import { StatusBadge } from "@/components/audit-log/status-badge";

export function AuditDetailsPanel() {
  const severity = statusVisuals.severity[selectedEvent.severity as AuditSeverity];
  const integrity = statusVisuals.integrity[selectedEvent.integrity as AuditIntegrity];

  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Selected event
      </p>
      <h2 className="mt-2 text-lg font-black text-white">{selectedEvent.title}</h2>

      <div className="mt-4 flex flex-wrap gap-2">
        <StatusBadge label={severity.label} variant={severity.variant} icon={severity.icon} />
        <StatusBadge label={integrity.label} variant={integrity.variant} icon={integrity.icon} />
      </div>

      <p className="mt-4 text-sm leading-6 text-white/60">{selectedEvent.description}</p>

      <div className="mt-5 space-y-3">
        <DetailRow icon={<Database className="h-4 w-4" />} label="Event ID" value={selectedEvent.id} />
        <DetailRow icon={<UserRound className="h-4 w-4" />} label="Actor" value={selectedEvent.actor} />
        <DetailRow icon={<ShieldCheck className="h-4 w-4" />} label="Target" value={selectedEvent.target} />
        <DetailRow icon={<Hash className="h-4 w-4" />} label="Proof hash" value={selectedEvent.proofHash ?? "Not attached"} />
        <DetailRow icon={<Network className="h-4 w-4" />} label="TX hash" value={selectedEvent.txHash ?? "Not attached"} />
        <DetailRow icon={<MapPin className="h-4 w-4" />} label="Source" value={selectedEvent.ipAddress ?? "Not recorded"} />
      </div>
    </section>
  );
}

function DetailRow({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3">
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
          {icon}
        </div>
        <p className="text-sm font-bold text-white/70">{label}</p>
      </div>
      <p className="max-w-[190px] truncate font-mono text-xs font-bold text-white">{value}</p>
    </div>
  );
}
\n```\n\n## `components/audit-log/trust-activity-panel.tsx`\n\n```tsx\nimport { trustActivity } from "@/lib/audit-log-data";
import { cn } from "@/lib/utils";

export function TrustActivityPanel() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Trust activity
      </p>
      <h2 className="mt-2 text-lg font-black text-white">Key trust signals</h2>

      <div className="mt-4 space-y-3">
        {trustActivity.map((item) => {
          const Icon = item.icon;

          return (
            <article key={item.id} className="flex gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <div
                className={cn(
                  "grid h-10 w-10 shrink-0 place-items-center rounded-ur-sm",
                  item.tone === "danger"
                    ? "bg-ur-error-bg text-ur-error"
                    : item.tone === "warning"
                      ? "bg-ur-warning-bg text-ur-warning"
                      : "bg-ur-success-bg text-ur-success"
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-black text-white">{item.title}</p>
                <p className="mt-1 text-xs leading-5 text-white/52">{item.description}</p>
                <p className="mt-2 font-mono text-xs font-bold text-ur-mint">{item.reference}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/audit-log/audit-export-panel.tsx`\n\n```tsx\nimport { auditExportOptions } from "@/lib/audit-log-data";
import { Button } from "@/components/ui/button";

export function AuditExportPanel() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Export and actions
      </p>

      <div className="mt-4 space-y-3">
        {auditExportOptions.map((option, index) => {
          const Icon = option.icon;

          return (
            <button
              key={option.label}
              type="button"
              className="flex w-full items-center justify-between gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3 text-left transition-colors hover:border-ur-primary/40 hover:bg-white/[0.04] ur-focus"
            >
              <div className="flex gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-black text-white">{option.label}</p>
                  <p className="mt-1 text-xs leading-5 text-white/52">{option.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <Button className="mt-4 w-full">
        Export filtered audit log
      </Button>
    </section>
  );
}
\n```\n\n## `components/audit-log/integrity-status-card.tsx`\n\n```tsx\nimport { CheckCircle2, Database, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function IntegrityStatusCard() {
  return (
    <section className="rounded-ur-xl border border-ur-success/25 bg-ur-success-bg p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-success">
            Integrity status
          </p>
          <h2 className="mt-2 text-lg font-black text-white">Audit records verified</h2>
        </div>
        <Badge variant="success">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Healthy
        </Badge>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-ur-sm border border-ur-success/20 bg-black/16 p-3">
          <ShieldCheck className="h-4 w-4 text-ur-success" />
          <p className="mt-2 text-2xl font-black text-white">98.7%</p>
          <p className="mt-1 text-xs text-ur-success/72">Verified records</p>
        </div>

        <div className="rounded-ur-sm border border-ur-success/20 bg-black/16 p-3">
          <Database className="h-4 w-4 text-ur-success" />
          <p className="mt-2 text-2xl font-black text-white">14.2K</p>
          <p className="mt-1 text-xs text-ur-success/72">Audit rows</p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-ur-success/78">
        Each important trust activity should include actor, target, timestamp, severity, integrity status, and linked proof or transaction metadata when available.
      </p>
    </section>
  );
}
\n```\n
---

# 14. Acceptance Checklist

```text
The route /audit-log works.
Google Fonts are loaded.
Inter is used for UI text.
JetBrains Mono is used for event IDs, request IDs, proof hashes, TX hashes, and references.
UrbanRentisha dark green theme is applied.
Left sidebar is visible on desktop.
Topbar is visible.
Audit title and trust badges are visible.
Audit hero is visible.
Audit stats grid is visible.
Search and filter bar is visible.
Event timeline is visible.
Important system events table is visible.
Selected event details panel is visible.
Trust activity panel is visible.
Export and actions panel is visible.
Integrity status card is visible.
Severity uses text, icons, and color.
Integrity status uses text, icons, and color.
Mobile layout is stacked and readable.
All controls have visible focus states.
```

---

# 15. Final UX Summary

```text
The Audit Log Screen is the platform's trust record.
It should make every important system event searchable, understandable, traceable, and export-ready.
```
