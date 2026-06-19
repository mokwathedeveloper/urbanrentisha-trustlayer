# UrbanRentisha TrustLayer Admin Dashboard UI/UX Blueprint and Starter Code

## 1. Screen Covered

```text
18. Admin Dashboard only
```

## 2. Page Purpose

The **Admin Dashboard** shows platform-wide approvals, reports, agents, proof verification activity, suspicious activity, audit logs, and analytics.

This screen helps administrators:

```text
Review platform-wide approvals
Triage safety reports
Monitor agent trust and restrictions
Track proof verification activity
Investigate suspicious activity
Review audit logs
Monitor platform trust analytics
Take fast trust-operations actions
```

---

## 3. Design Inspiration Rule

The provided MantleMandate design system is used only as structural inspiration for:

```text
Strict spacing
Dark SaaS admin layout
Persistent app sidebar
Readable data tables
Trust operations hierarchy
Accessible status states
Minimal motion
Technical admin tone
```

Do not copy MantleMandate branding, logo, or blue palette.

UrbanRentisha must keep its own identity:

```text
Dark green trust UI
Eco-friendly real estate trust
Rental scam prevention
ZK payment proof
Stellar/Soroban verification
Admin trust operations
Professional B2B SaaS clarity
```

---

## 4. UX Goal

The admin should understand this immediately:

```text
This dashboard is the platform-wide trust command center.
Approvals, reports, agents, proofs, suspicious activity, audits, and analytics are visible in one place.
High-risk items are clearly separated from normal operational work.
```

---

## 5. Required Dashboard Content

Required sections:

```text
Admin overview
Platform-wide approvals
Reports center
Agents
Proof verification activity
Suspicious activity
Audit logs
Analytics
Quick actions
Admin trust flow
Admin safety rules
Audit references
```

Status categories:

```text
Approval: Pending, Approved, Rejected, Needs review
Report severity: Low, Medium, High, Critical
Agent: Verified, Pending, Restricted, Suspended
Proof: Verified, Failed, Queued, Review
Suspicious activity: Open, Investigating, Blocked, Resolved
Audit action: Approval, Proof, Report, Agent, System
```

---

## 6. Final Folder Structure

```text
urbanrentisha-admin-dashboard/
├── app/
│   ├── admin/
│   │   └── dashboard/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── admin-dashboard/
│   │   ├── admin-dashboard-page.tsx
│   │   ├── admin-flow-timeline-card.tsx
│   │   ├── admin-overview-hero.tsx
│   │   ├── admin-safety-rules-card.tsx
│   │   ├── admin-sidebar.tsx
│   │   ├── admin-stats-grid.tsx
│   │   ├── admin-topbar.tsx
│   │   ├── agents-panel.tsx
│   │   ├── analytics-panel.tsx
│   │   ├── approvals-queue-panel.tsx
│   │   ├── audit-logs-panel.tsx
│   │   ├── audit-references-card.tsx
│   │   ├── logo-mark.tsx
│   │   ├── proof-verification-activity-panel.tsx
│   │   ├── quick-actions-panel.tsx
│   │   ├── reports-center-panel.tsx
│   │   ├── status-badge.tsx
│   │   └── suspicious-activity-panel.tsx
│   │
│   └── ui/
│       ├── badge.tsx
│       └── button.tsx
│
├── lib/
│   ├── admin-dashboard-data.ts
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
Page title and admin trust badges
Admin overview hero
Admin stats grid
Main two-column layout:
  Left:
    - platform-wide approvals
    - reports center
    - agents
    - proof verification activity
    - suspicious activity
    - audit logs
  Right sticky:
    - analytics
    - quick actions
    - admin trust flow
    - admin safety rules
    - audit references
```

Mobile and tablet:

```text
Topbar with menu button
No fixed sidebar
Dashboard title
Admin overview
Stats grid stacked
Approval queue
Reports
Agents
Proof activity
Suspicious activity
Audit logs
Analytics
Quick actions
Safety rules
Audit references
```

---

## 8. Interaction Rules

```text
Review approvals opens the approval queue.
Open report center opens safety report triage.
Run proof audit opens proof verification activity.
View risk queue opens suspicious activity investigation.
Approval rows link to approval detail.
Agent names link to agent profile admin detail.
Proof rows display request ID, proof hash, and network.
Suspicious activity cards show actor, source, risk score, and action.
Audit logs show actor, action type, reference, and time.
Search field is UI-ready for dashboard-wide search.
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
JetBrains Mono = admin IDs, approval IDs, report IDs, agent IDs, request IDs, proof hashes, audit log IDs, audit references
```

Use JetBrains Mono for:

```text
ADM-UR-001
APP-UR-9001
RPT-UR-4421
AGT-UR-2048
REQ-UR-9084
soro_0x7ab...2c109
AUD-UR-5510
risk_engine_live
audit_stream_active
```

---

## 11. Accessibility Requirements

```text
Status must use text, icon, and color together.
High-risk activity must use warning/error labels with clear text.
Approval and proof tables must collapse into readable cards on smaller screens.
Sidebar links must have visible active state.
Search input must have accessible label.
Analytics must show values as text and not only bars/colors.
All buttons and links must have visible focus states.
Long hash/reference values must truncate safely.
Minimum mobile touch target should be 44px.
```

---

## 12. Implementation Notes

This starter is UI-only.

Connect it later to:

```text
Admin profile API
Approval queue API
Reports API
Agent management API
Proof verification API
Risk/suspicious activity API
Audit logs API
Analytics API
Search/filter API
```

Recommended API endpoints:

```text
GET /api/v1/admin/dashboard
GET /api/v1/admin/approvals
GET /api/v1/admin/reports
GET /api/v1/admin/agents
GET /api/v1/admin/proofs
GET /api/v1/admin/risk
GET /api/v1/admin/audit-logs
GET /api/v1/admin/analytics
POST /api/v1/admin/approvals/:id/approve
POST /api/v1/admin/approvals/:id/reject
POST /api/v1/admin/reports/:id/escalate
POST /api/v1/admin/risk/:id/block
```

Recommended route:

```text
/admin/dashboard
```

---

# 13. Full Starter Code

\n## `package.json`\n\n```json\n{
  "name": "urbanrentisha-admin-dashboard-screen",
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
  title: "Admin Dashboard | UrbanRentisha TrustLayer",
  description:
    "Monitor approvals, reports, agents, proof verification activity, suspicious activity, audit logs, and analytics."
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

  .admin-grid-bg {
    background-image:
      linear-gradient(rgba(22, 163, 74, 0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(22, 163, 74, 0.045) 1px, transparent 1px);
    background-size: 38px 38px;
  }

  .admin-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(22, 163, 74, 0.45) rgba(255, 255, 255, 0.04);
  }
}
\n```\n\n## `app/page.tsx`\n\n```tsx\nimport { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/admin/dashboard");
}
\n```\n\n## `app/admin/dashboard/page.tsx`\n\n```tsx\nimport { AdminDashboardPage } from "@/components/admin-dashboard/admin-dashboard-page";

export default function Page() {
  return <AdminDashboardPage />;
}
\n```\n\n## `lib/utils.ts`\n\n```ts\nimport { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
\n```\n\n## `lib/admin-dashboard-data.ts`\n\n```ts\nimport {
  Activity,
  AlertTriangle,
  BadgeCheck,
  BarChart3,
  Bell,
  Building2,
  CalendarCheck2,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Code2,
  Database,
  Eye,
  FileCheck2,
  FileSearch,
  FileWarning,
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
  Plus,
  ReceiptText,
  Search,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Star,
  TimerReset,
  TrendingUp,
  UserCheck,
  UserRound,
  UsersRound,
  WalletCards,
  XCircle
} from "lucide-react";

export type ApprovalStatus = "pending" | "approved" | "rejected" | "needs_review";
export type ReportSeverity = "low" | "medium" | "high" | "critical";
export type AgentStatus = "verified" | "pending" | "restricted" | "suspended";
export type ProofStatus = "verified" | "failed" | "queued" | "review";
export type SuspiciousStatus = "open" | "investigating" | "blocked" | "resolved";
export type AuditAction = "approval" | "proof" | "report" | "agent" | "system";
export type AnalyticsTone = "success" | "warning" | "danger" | "neutral";

export type AdminProfile = {
  id: string;
  name: string;
  role: string;
  accessLevel: string;
  walletAddress: string;
  pendingApprovals: number;
  openReports: number;
  suspiciousFlags: number;
  proofVerifications: number;
  activeAgents: number;
};

export type PlatformApproval = {
  id: string;
  type: "listing" | "agent" | "property_document" | "api_partner";
  title: string;
  submittedBy: string;
  submittedAt: string;
  status: ApprovalStatus;
  riskScore: number;
};

export type PlatformReport = {
  id: string;
  type: "fake_listing" | "unsafe_payment" | "agent_mismatch" | "access_issue";
  title: string;
  submittedBy: string;
  createdAt: string;
  severity: ReportSeverity;
  status: "new" | "under_review" | "escalated" | "resolved";
};

export type AgentRecord = {
  id: string;
  name: string;
  company: string;
  status: AgentStatus;
  trustScore: number;
  reports: number;
  listedProperties: number;
};

export type ProofActivity = {
  id: string;
  requestId: string;
  tenant: string;
  listing: string;
  status: ProofStatus;
  network: "Stellar Testnet" | "Soroban";
  proofHash: string;
  time: string;
};

export type SuspiciousActivity = {
  id: string;
  title: string;
  actor: string;
  source: string;
  status: SuspiciousStatus;
  riskScore: number;
  detectedAt: string;
};

export type AuditLog = {
  id: string;
  action: AuditAction;
  actor: string;
  description: string;
  reference: string;
  time: string;
};

export type AnalyticsMetric = {
  label: string;
  value: string;
  helper: string;
  tone: AnalyticsTone;
  icon: typeof LayoutDashboard;
};

export const adminProfile: AdminProfile = {
  id: "ADM-UR-001",
  name: "Platform Admin",
  role: "Trust Operations Lead",
  accessLevel: "Super Admin",
  walletAddress: "GADM...9X2P",
  pendingApprovals: 18,
  openReports: 11,
  suspiciousFlags: 7,
  proofVerifications: 2842,
  activeAgents: 126
};

export const platformApprovals: PlatformApproval[] = [
  {
    id: "APP-UR-9001",
    type: "listing",
    title: "Kilimani Green View Apartment",
    submittedBy: "Amina Realty Group",
    submittedAt: "Today, 9:18 AM",
    status: "pending",
    riskScore: 22
  },
  {
    id: "APP-UR-9002",
    type: "agent",
    title: "Daniel Mwangi Agent Profile",
    submittedBy: "Daniel Mwangi",
    submittedAt: "Today, 10:02 AM",
    status: "needs_review",
    riskScore: 48
  },
  {
    id: "APP-UR-9003",
    type: "property_document",
    title: "Westlands Studio Lease Docs",
    submittedBy: "Northside Homes",
    submittedAt: "Yesterday, 4:21 PM",
    status: "approved",
    riskScore: 12
  },
  {
    id: "APP-UR-9004",
    type: "api_partner",
    title: "MetroRent API Access",
    submittedBy: "MetroRent Limited",
    submittedAt: "Yesterday, 2:40 PM",
    status: "pending",
    riskScore: 31
  }
];

export const platformReports: PlatformReport[] = [
  {
    id: "RPT-UR-4421",
    type: "fake_listing",
    title: "Suspicious duplicate listing in Kilimani",
    submittedBy: "John Tenant",
    createdAt: "12 min ago",
    severity: "high",
    status: "under_review"
  },
  {
    id: "RPT-UR-4418",
    type: "unsafe_payment",
    title: "Agent requested off-platform payment",
    submittedBy: "Maya Tenant",
    createdAt: "36 min ago",
    severity: "critical",
    status: "escalated"
  },
  {
    id: "RPT-UR-4409",
    type: "agent_mismatch",
    title: "Agent identity does not match viewing details",
    submittedBy: "Brian Tenant",
    createdAt: "1 hr ago",
    severity: "medium",
    status: "new"
  }
];

export const agentRecords: AgentRecord[] = [
  {
    id: "AGT-UR-2048",
    name: "Amina Njoroge",
    company: "Amina Realty Group",
    status: "verified",
    trustScore: 96,
    reports: 2,
    listedProperties: 12
  },
  {
    id: "AGT-UR-2091",
    name: "Daniel Mwangi",
    company: "Northside Homes",
    status: "pending",
    trustScore: 72,
    reports: 1,
    listedProperties: 5
  },
  {
    id: "AGT-UR-2112",
    name: "Kevin Otieno",
    company: "MetroRent Limited",
    status: "restricted",
    trustScore: 58,
    reports: 6,
    listedProperties: 9
  }
];

export const proofActivities: ProofActivity[] = [
  {
    id: "PRF-UR-8101",
    requestId: "REQ-UR-9084",
    tenant: "John Tenant",
    listing: "Kilimani Green View Apartment",
    status: "verified",
    network: "Soroban",
    proofHash: "soro_0x7ab...2c109",
    time: "2 min ago"
  },
  {
    id: "PRF-UR-8100",
    requestId: "REQ-UR-9121",
    tenant: "Maya Tenant",
    listing: "Westlands Studio Loft",
    status: "queued",
    network: "Stellar Testnet",
    proofHash: "zkp_0x8fe...a12cc",
    time: "11 min ago"
  },
  {
    id: "PRF-UR-8097",
    requestId: "REQ-UR-9146",
    tenant: "Brian Tenant",
    listing: "Lavington Garden Maisonette",
    status: "failed",
    network: "Soroban",
    proofHash: "soro_0xe51...9cd41",
    time: "29 min ago"
  }
];

export const suspiciousActivities: SuspiciousActivity[] = [
  {
    id: "SUS-UR-7001",
    title: "Repeated off-platform payment language",
    actor: "AGT-UR-2112",
    source: "Message scan",
    status: "investigating",
    riskScore: 91,
    detectedAt: "7 min ago"
  },
  {
    id: "SUS-UR-6998",
    title: "Duplicate listing image hash",
    actor: "UR-LST-1220",
    source: "Listing upload",
    status: "open",
    riskScore: 78,
    detectedAt: "22 min ago"
  },
  {
    id: "SUS-UR-6993",
    title: "Proof mismatch with request amount",
    actor: "REQ-UR-9146",
    source: "Proof verifier",
    status: "blocked",
    riskScore: 88,
    detectedAt: "34 min ago"
  }
];

export const auditLogs: AuditLog[] = [
  {
    id: "AUD-UR-5510",
    action: "proof",
    actor: "system/verifier",
    description: "Proof verification accepted for REQ-UR-9084.",
    reference: "soro_0x7ab...2c109",
    time: "2 min ago"
  },
  {
    id: "AUD-UR-5508",
    action: "report",
    actor: "admin@urbanrentisha",
    description: "Escalated unsafe payment report.",
    reference: "RPT-UR-4418",
    time: "18 min ago"
  },
  {
    id: "AUD-UR-5502",
    action: "approval",
    actor: "admin@urbanrentisha",
    description: "Approved property document review.",
    reference: "APP-UR-9003",
    time: "1 hr ago"
  },
  {
    id: "AUD-UR-5498",
    action: "agent",
    actor: "system/risk-engine",
    description: "Restricted an agent profile after report threshold.",
    reference: "AGT-UR-2112",
    time: "2 hrs ago"
  }
];

export const analyticsMetrics: AnalyticsMetric[] = [
  {
    label: "Proof success rate",
    value: "98.4%",
    helper: "+2.1% this week",
    tone: "success",
    icon: ShieldCheck
  },
  {
    label: "Report resolution",
    value: "74%",
    helper: "Median 3.8 hours",
    tone: "warning",
    icon: Flag
  },
  {
    label: "Suspicious blocks",
    value: "19",
    helper: "7 active investigations",
    tone: "danger",
    icon: ShieldAlert
  },
  {
    label: "Verified agents",
    value: "126",
    helper: "+14 this month",
    tone: "success",
    icon: UserCheck
  }
];

export const dashboardStats = [
  {
    label: "Pending approvals",
    value: "18",
    helper: "Listings, agents, docs, partners",
    icon: ClipboardCheck,
    tone: "warning"
  },
  {
    label: "Open reports",
    value: "11",
    helper: "2 escalated, 4 high priority",
    icon: Flag,
    tone: "danger"
  },
  {
    label: "Agents",
    value: "126",
    helper: "112 verified, 9 pending",
    icon: UsersRound,
    tone: "success"
  },
  {
    label: "Proof verifications",
    value: "2.8K",
    helper: "98.4% success rate",
    icon: LockKeyhole,
    tone: "success"
  },
  {
    label: "Suspicious flags",
    value: "7",
    helper: "Active risk investigations",
    icon: ShieldAlert,
    tone: "danger"
  },
  {
    label: "Audit logs",
    value: "14.2K",
    helper: "Immutable platform trail",
    icon: Database,
    tone: "neutral"
  }
];

export const quickActions = [
  {
    label: "Review approvals",
    description: "Approve or reject listings, agents, documents, and API partners.",
    href: "/admin/approvals",
    icon: ClipboardCheck
  },
  {
    label: "Open report center",
    description: "Investigate fake listings, unsafe payments, and access issues.",
    href: "/admin/reports",
    icon: Flag
  },
  {
    label: "Run proof audit",
    description: "Inspect proof status, hashes, request IDs, and verifier logs.",
    href: "/admin/proofs",
    icon: LockKeyhole
  },
  {
    label: "View risk queue",
    description: "Review suspicious platform activity and blocked flows.",
    href: "/admin/risk",
    icon: ShieldAlert
  }
];

export const sidebarItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, active: true },
  { label: "Approvals", href: "/admin/approvals", icon: ClipboardCheck },
  { label: "Reports", href: "/admin/reports", icon: Flag },
  { label: "Agents", href: "/admin/agents", icon: UsersRound },
  { label: "Listings", href: "/admin/listings", icon: Building2 },
  { label: "Proof Activity", href: "/admin/proofs", icon: LockKeyhole },
  { label: "Suspicious Activity", href: "/admin/risk", icon: ShieldAlert },
  { label: "Audit Logs", href: "/admin/audit-logs", icon: Database },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "API Partners", href: "/admin/api-partners", icon: Code2 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "Support", href: "/support", icon: HelpCircle }
];

export const statusVisuals = {
  approval: {
    pending: { label: "Pending", variant: "warning", icon: TimerReset },
    approved: { label: "Approved", variant: "success", icon: CheckCircle2 },
    rejected: { label: "Rejected", variant: "danger", icon: XCircle },
    needs_review: { label: "Needs review", variant: "warning", icon: AlertTriangle }
  },
  reportSeverity: {
    low: { label: "Low", variant: "neutral", icon: Flag },
    medium: { label: "Medium", variant: "warning", icon: FileWarning },
    high: { label: "High", variant: "danger", icon: ShieldAlert },
    critical: { label: "Critical", variant: "danger", icon: AlertTriangle }
  },
  agent: {
    verified: { label: "Verified", variant: "success", icon: BadgeCheck },
    pending: { label: "Pending", variant: "warning", icon: TimerReset },
    restricted: { label: "Restricted", variant: "danger", icon: ShieldAlert },
    suspended: { label: "Suspended", variant: "danger", icon: XCircle }
  },
  proof: {
    verified: { label: "Verified", variant: "success", icon: ShieldCheck },
    failed: { label: "Failed", variant: "danger", icon: AlertTriangle },
    queued: { label: "Queued", variant: "warning", icon: Clock3 },
    review: { label: "Review", variant: "warning", icon: FileSearch }
  },
  suspicious: {
    open: { label: "Open", variant: "warning", icon: AlertTriangle },
    investigating: { label: "Investigating", variant: "danger", icon: Eye },
    blocked: { label: "Blocked", variant: "danger", icon: LockKeyhole },
    resolved: { label: "Resolved", variant: "success", icon: CheckCircle2 }
  },
  audit: {
    approval: { label: "Approval", variant: "warning", icon: ClipboardCheck },
    proof: { label: "Proof", variant: "success", icon: LockKeyhole },
    report: { label: "Report", variant: "danger", icon: Flag },
    agent: { label: "Agent", variant: "neutral", icon: UserCheck },
    system: { label: "System", variant: "neutral", icon: Network }
  }
} as const;

export const adminFlowSteps = [
  {
    title: "Approvals reviewed",
    description: "Listings, agents, documents, and API partners enter admin queue.",
    status: "Active",
    icon: ClipboardCheck
  },
  {
    title: "Reports triaged",
    description: "Safety reports are classified by severity and status.",
    status: "Active",
    icon: Flag
  },
  {
    title: "Proofs monitored",
    description: "Verifier activity is watched for failed or suspicious proof states.",
    status: "Live",
    icon: ShieldCheck
  },
  {
    title: "Audit trail retained",
    description: "Admin and system events are preserved for traceability.",
    status: "Live",
    icon: Database
  }
];

export const auditReferences = [
  {
    label: "Admin ID",
    value: "ADM-UR-001",
    icon: UserRound
  },
  {
    label: "Network",
    value: "Stellar Testnet",
    icon: Sparkles
  },
  {
    label: "Latest proof",
    value: "soro_0x7ab...2c109",
    icon: Hash
  },
  {
    label: "Risk engine",
    value: "risk_engine_live",
    icon: Gauge
  },
  {
    label: "Audit stream",
    value: "audit_stream_active",
    icon: Database
  },
  {
    label: "Admin scope",
    value: "platform_trust_ops",
    icon: ShieldCheck
  }
];

export const adminSafetyRules = [
  {
    title: "Never approve without evidence",
    description: "Listings, agents, and partner access must show enough proof for platform trust.",
    icon: ClipboardCheck
  },
  {
    title: "Escalate unsafe payments fast",
    description: "Off-platform payment requests must enter the report and risk queue.",
    icon: WalletCards
  },
  {
    title: "Monitor failed proofs",
    description: "Repeated proof failures can indicate amount mismatch or bad actors.",
    icon: LockKeyhole
  },
  {
    title: "Preserve audit logs",
    description: "Admin actions must remain traceable for compliance and dispute review.",
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
\n```\n\n## `components/admin-dashboard/status-badge.tsx`\n\n```tsx\nimport type { ComponentType } from "react";
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
\n```\n\n## `components/admin-dashboard/logo-mark.tsx`\n\n```tsx\nimport Link from "next/link";
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
\n```\n\n## `components/admin-dashboard/admin-sidebar.tsx`\n\n```tsx\nimport Link from "next/link";
import { LogOut, UserRound } from "lucide-react";
import { adminProfile, sidebarItems } from "@/lib/admin-dashboard-data";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/admin-dashboard/logo-mark";

export function AdminSidebar() {
  return (
    <aside className="hidden min-h-screen w-[292px] shrink-0 border-r border-white/10 bg-ur-sidebar/90 p-5 backdrop-blur-xl xl:block">
      <LogoMark />

      <nav className="mt-9 space-y-1" aria-label="Admin dashboard navigation">
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

      <div className="mt-8 rounded-ur-xl border border-ur-error/25 bg-ur-error-bg p-4">
        <p className="text-sm font-black text-white">Admin safety queue</p>
        <p className="mt-2 text-4xl font-black tracking-[-0.06em] text-white">
          {adminProfile.suspiciousFlags}
        </p>
        <p className="mt-2 text-xs leading-5 text-ur-error/74">
          Active suspicious activity flags require platform trust review.
        </p>
      </div>

      <div className="mt-8 border-t border-white/10 pt-5">
        <div className="flex items-center gap-3 rounded-ur-lg border border-white/10 bg-black/16 p-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-ur-primary/15 text-ur-primary">
            <UserRound className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-black text-white">{adminProfile.name}</p>
            <p className="text-xs text-white/46">{adminProfile.role}</p>
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
\n```\n\n## `components/admin-dashboard/admin-topbar.tsx`\n\n```tsx\nimport Link from "next/link";
import { Bell, Menu, Search, ShieldAlert, UserRound } from "lucide-react";
import { adminProfile } from "@/lib/admin-dashboard-data";
import { LogoMark } from "@/components/admin-dashboard/logo-mark";
import { Button } from "@/components/ui/button";

export function AdminTopbar() {
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
          <span className="sr-only">Search admin dashboard</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/42" />
          <input
            placeholder="Search approval, report, agent, proof, audit log, tenant, or listing..."
            className="h-11 w-full max-w-[720px] rounded-ur-sm border border-white/10 bg-black/18 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-ur-primary"
          />
        </label>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/risk"
            className="relative grid h-10 w-10 place-items-center rounded-ur-sm border border-white/10 text-white/70 transition-colors hover:border-ur-error/50 hover:bg-white/5 hover:text-white ur-focus"
            aria-label={`${adminProfile.suspiciousFlags} suspicious activity flags`}
          >
            <ShieldAlert className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-ur-error px-1 text-[10px] font-black text-white">
              {adminProfile.suspiciousFlags}
            </span>
          </Link>

          <Link
            href="/admin/reports"
            className="relative grid h-10 w-10 place-items-center rounded-ur-sm border border-white/10 text-white/70 transition-colors hover:border-ur-warning/50 hover:bg-white/5 hover:text-white ur-focus"
            aria-label={`${adminProfile.openReports} open reports`}
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-ur-warning px-1 text-[10px] font-black text-black">
              {adminProfile.openReports}
            </span>
          </Link>

          <Link href="/admin/approvals">
            <Button className="hidden sm:inline-flex">
              Review approvals
            </Button>
          </Link>

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
\n```\n\n## `components/admin-dashboard/admin-dashboard-page.tsx`\n\n```tsx\nimport { BadgeCheck, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AdminSidebar } from "@/components/admin-dashboard/admin-sidebar";
import { AdminTopbar } from "@/components/admin-dashboard/admin-topbar";
import { AdminOverviewHero } from "@/components/admin-dashboard/admin-overview-hero";
import { AdminStatsGrid } from "@/components/admin-dashboard/admin-stats-grid";
import { ApprovalsQueuePanel } from "@/components/admin-dashboard/approvals-queue-panel";
import { ReportsCenterPanel } from "@/components/admin-dashboard/reports-center-panel";
import { AgentsPanel } from "@/components/admin-dashboard/agents-panel";
import { ProofVerificationActivityPanel } from "@/components/admin-dashboard/proof-verification-activity-panel";
import { SuspiciousActivityPanel } from "@/components/admin-dashboard/suspicious-activity-panel";
import { AuditLogsPanel } from "@/components/admin-dashboard/audit-logs-panel";
import { AnalyticsPanel } from "@/components/admin-dashboard/analytics-panel";
import { QuickActionsPanel } from "@/components/admin-dashboard/quick-actions-panel";
import { AdminFlowTimelineCard } from "@/components/admin-dashboard/admin-flow-timeline-card";
import { AdminSafetyRulesCard } from "@/components/admin-dashboard/admin-safety-rules-card";
import { AuditReferencesCard } from "@/components/admin-dashboard/audit-references-card";

export function AdminDashboardPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 admin-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-error/10 blur-[130px]" />

      <div className="relative z-10 flex min-h-screen">
        <AdminSidebar />

        <div className="min-w-0 flex-1">
          <AdminTopbar />

          <section className="px-5 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1440px]">
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="success">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Admin access
                  </Badge>
                  <Badge variant="outline">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Platform trust operations
                  </Badge>
                </div>

                <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
                  Admin dashboard
                </p>
                <h1 className="mt-3 max-w-[1040px] text-[42px] font-black leading-[1.02] tracking-[-0.07em] text-white sm:text-[56px]">
                  Monitor approvals, reports, proofs, risks, and audits.
                </h1>
                <p className="mt-4 max-w-[930px] text-base leading-7 text-white/66">
                  Oversee platform-wide approvals, report triage, agent trust, proof verification activity, suspicious activity, audit logs, and analytics from one command center.
                </p>
              </div>

              <AdminOverviewHero />
              <AdminStatsGrid />

              <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_400px]">
                <section className="space-y-6">
                  <ApprovalsQueuePanel />

                  <div className="grid gap-6 lg:grid-cols-2">
                    <ReportsCenterPanel />
                    <AgentsPanel />
                  </div>

                  <ProofVerificationActivityPanel />
                  <SuspiciousActivityPanel />
                  <AuditLogsPanel />
                </section>

                <aside className="space-y-5 xl:sticky xl:top-24 xl:self-start">
                  <AnalyticsPanel />
                  <QuickActionsPanel />
                  <AdminFlowTimelineCard />
                  <AdminSafetyRulesCard />
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
\n```\n\n## `components/admin-dashboard/admin-overview-hero.tsx`\n\n```tsx\nimport Link from "next/link";
import { ArrowRight, ClipboardCheck, Database, ShieldAlert, ShieldCheck } from "lucide-react";
import { adminProfile } from "@/lib/admin-dashboard-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function AdminOverviewHero() {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
        <div>
          <Badge variant="success">
            <ShieldCheck className="h-3.5 w-3.5" />
            Trust operations live
          </Badge>

          <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] text-white">
            Platform control center
          </h2>

          <p className="mt-2 max-w-[780px] text-sm leading-6 text-white/62">
            Review approvals, monitor proof verification, resolve safety reports, investigate suspicious activity, and maintain a reliable audit trail across the UrbanRentisha trust layer.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <InfoTile icon={<ClipboardCheck className="h-4 w-4" />} label="Pending approvals" value={`${adminProfile.pendingApprovals}`} />
            <InfoTile icon={<ShieldAlert className="h-4 w-4" />} label="Risk flags" value={`${adminProfile.suspiciousFlags}`} />
            <InfoTile icon={<Database className="h-4 w-4" />} label="Admin ID" value={adminProfile.id} />
          </div>
        </div>

        <div className="min-w-[300px] rounded-ur-lg border border-ur-error/20 bg-ur-error-bg p-5">
          <ShieldAlert className="h-8 w-8 text-ur-error" />
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-ur-error/72">
            High priority
          </p>
          <p className="mt-2 text-3xl font-black text-white">{adminProfile.openReports} open reports</p>
          <p className="mt-2 text-sm leading-6 text-ur-error/72">
            Unsafe payment reports and suspicious listing patterns should be reviewed first.
          </p>

          <Link href="/admin/reports" className="mt-5 block">
            <Button variant="danger" className="w-full">
              Open report center
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function InfoTile({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
      <div className="mb-3 text-ur-primary">{icon}</div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
        {label}
      </p>
      <p className="mt-2 truncate font-mono text-sm font-bold text-ur-mint">
        {value}
      </p>
    </div>
  );
}
\n```\n\n## `components/admin-dashboard/admin-stats-grid.tsx`\n\n```tsx\nimport { dashboardStats } from "@/lib/admin-dashboard-data";
import { cn } from "@/lib/utils";

export function AdminStatsGrid() {
  return (
    <section className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
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
\n```\n\n## `components/admin-dashboard/approvals-queue-panel.tsx`\n\n```tsx\nimport Link from "next/link";
import { ArrowRight, ClipboardCheck } from "lucide-react";
import { platformApprovals, statusVisuals, type ApprovalStatus } from "@/lib/admin-dashboard-data";
import { StatusBadge } from "@/components/admin-dashboard/status-badge";
import { Button } from "@/components/ui/button";

export function ApprovalsQueuePanel() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Platform-wide approvals
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            Approval queue
          </h2>
          <p className="mt-2 text-sm leading-6 text-white/56">
            Review listings, agents, property documents, and API partner access requests.
          </p>
        </div>

        <Link href="/admin/approvals">
          <Button variant="outline" size="sm">
            View all
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="mt-5 overflow-hidden rounded-ur-lg border border-white/10">
        <div className="hidden grid-cols-[1.25fr_150px_130px_110px_120px] gap-4 border-b border-white/10 bg-black/20 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white/38 xl:grid">
          <span>Approval item</span>
          <span>Type</span>
          <span>Risk score</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        <div className="divide-y divide-white/10">
          {platformApprovals.map((approval) => {
            const status = statusVisuals.approval[approval.status as ApprovalStatus];

            return (
              <article
                key={approval.id}
                className="grid gap-4 bg-black/10 px-4 py-4 xl:grid-cols-[1.25fr_150px_130px_110px_120px] xl:items-center"
              >
                <div className="flex gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                    <ClipboardCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-black text-white">{approval.title}</p>
                    <p className="mt-1 text-sm text-white/52">Submitted by {approval.submittedBy}</p>
                    <p className="mt-2 font-mono text-xs font-bold text-ur-mint">{approval.id}</p>
                  </div>
                </div>

                <p className="text-sm font-bold capitalize text-white/70">
                  {approval.type.replace("_", " ")}
                </p>

                <p className="font-mono text-sm font-black text-white">{approval.riskScore}/100</p>
                <StatusBadge label={status.label} variant={status.variant} icon={status.icon} />

                <Link href={`/admin/approvals/${approval.id}`}>
                  <Button size="sm" variant="outline" className="w-full">
                    Review
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
\n```\n\n## `components/admin-dashboard/reports-center-panel.tsx`\n\n```tsx\nimport Link from "next/link";
import { ArrowRight, Flag } from "lucide-react";
import { platformReports, statusVisuals, type ReportSeverity } from "@/lib/admin-dashboard-data";
import { StatusBadge } from "@/components/admin-dashboard/status-badge";
import { Button } from "@/components/ui/button";

export function ReportsCenterPanel() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Reports
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            Safety report center
          </h2>
        </div>
        <Flag className="h-6 w-6 text-ur-error" />
      </div>

      <div className="mt-5 space-y-3">
        {platformReports.map((report) => {
          const severity = statusVisuals.reportSeverity[report.severity as ReportSeverity];

          return (
            <article key={report.id} className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-black text-white">{report.title}</p>
                  <p className="mt-1 text-sm text-white/52">
                    {report.type.replace("_", " ")} by {report.submittedBy}
                  </p>
                  <p className="mt-2 font-mono text-xs font-bold text-ur-mint">{report.id}</p>
                </div>
                <StatusBadge label={severity.label} variant={severity.variant} icon={severity.icon} />
              </div>
            </article>
          );
        })}
      </div>

      <Link href="/admin/reports" className="mt-5 block">
        <Button variant="danger" className="w-full">
          Open reports
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </section>
  );
}
\n```\n\n## `components/admin-dashboard/agents-panel.tsx`\n\n```tsx\nimport Link from "next/link";
import { ArrowRight, Star, UserCheck } from "lucide-react";
import { agentRecords, statusVisuals, type AgentStatus } from "@/lib/admin-dashboard-data";
import { StatusBadge } from "@/components/admin-dashboard/status-badge";
import { Button } from "@/components/ui/button";

export function AgentsPanel() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Agents
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            Agent trust monitor
          </h2>
        </div>
        <UserCheck className="h-6 w-6 text-ur-primary" />
      </div>

      <div className="mt-5 space-y-3">
        {agentRecords.map((agent) => {
          const status = statusVisuals.agent[agent.status as AgentStatus];

          return (
            <article key={agent.id} className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Link href={`/admin/agents/${agent.id}`} className="font-black text-white hover:text-ur-mint ur-focus">
                    {agent.name}
                  </Link>
                  <p className="mt-1 text-sm text-white/52">{agent.company}</p>
                  <p className="mt-2 font-mono text-xs font-bold text-ur-mint">{agent.id}</p>
                </div>
                <StatusBadge label={status.label} variant={status.variant} icon={status.icon} />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <Metric label="Trust" value={`${agent.trustScore}%`} icon={<Star className="h-4 w-4" />} />
                <Metric label="Reports" value={`${agent.reports}`} />
                <Metric label="Listings" value={`${agent.listedProperties}`} />
              </div>
            </article>
          );
        })}
      </div>

      <Link href="/admin/agents" className="mt-5 block">
        <Button variant="outline" className="w-full">
          View agents
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </section>
  );
}

function Metric({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-ur-sm border border-white/10 bg-black/20 p-3">
      <div className="flex items-center gap-2 text-ur-primary">{icon}</div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">{label}</p>
      <p className="mt-1 text-sm font-black text-white">{value}</p>
    </div>
  );
}
\n```\n\n## `components/admin-dashboard/proof-verification-activity-panel.tsx`\n\n```tsx\nimport Link from "next/link";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { proofActivities, statusVisuals, type ProofStatus } from "@/lib/admin-dashboard-data";
import { StatusBadge } from "@/components/admin-dashboard/status-badge";
import { Button } from "@/components/ui/button";

export function ProofVerificationActivityPanel() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Proof verification activity
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            Stellar / Soroban proof monitor
          </h2>
          <p className="mt-2 text-sm leading-6 text-white/56">
            Track proof status, request IDs, hashes, tenant activity, and failed verification cases.
          </p>
        </div>

        <Link href="/admin/proofs">
          <Button variant="outline" size="sm">
            View proofs
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="mt-5 overflow-hidden rounded-ur-lg border border-white/10">
        <div className="hidden grid-cols-[1.2fr_1fr_135px_140px_120px] gap-4 border-b border-white/10 bg-black/20 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white/38 xl:grid">
          <span>Request</span>
          <span>Listing</span>
          <span>Network</span>
          <span>Status</span>
          <span>Time</span>
        </div>

        <div className="divide-y divide-white/10">
          {proofActivities.map((proof) => {
            const status = statusVisuals.proof[proof.status as ProofStatus];

            return (
              <article
                key={proof.id}
                className="grid gap-4 bg-black/10 px-4 py-4 xl:grid-cols-[1.2fr_1fr_135px_140px_120px] xl:items-center"
              >
                <div className="flex gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                    <LockKeyhole className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-mono text-sm font-bold text-ur-mint">{proof.requestId}</p>
                    <p className="mt-1 text-sm text-white/52">{proof.tenant}</p>
                    <p className="mt-2 truncate font-mono text-xs font-bold text-white/62">{proof.proofHash}</p>
                  </div>
                </div>

                <p className="text-sm font-bold text-white">{proof.listing}</p>
                <p className="font-mono text-xs font-bold text-white/72">{proof.network}</p>
                <StatusBadge label={status.label} variant={status.variant} icon={status.icon} />
                <p className="text-sm text-white/52">{proof.time}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
\n```\n\n## `components/admin-dashboard/suspicious-activity-panel.tsx`\n\n```tsx\nimport { ShieldAlert } from "lucide-react";
import { suspiciousActivities, statusVisuals, type SuspiciousStatus } from "@/lib/admin-dashboard-data";
import { StatusBadge } from "@/components/admin-dashboard/status-badge";
import { Button } from "@/components/ui/button";

export function SuspiciousActivityPanel() {
  return (
    <section className="rounded-ur-xl border border-ur-error/25 bg-ur-error-bg p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-error">
            Suspicious activity
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            Risk queue
          </h2>
          <p className="mt-2 text-sm leading-6 text-ur-error/72">
            Investigate suspicious payment language, duplicate listings, proof mismatch, and unsafe access patterns.
          </p>
        </div>
        <ShieldAlert className="h-7 w-7 text-ur-error" />
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        {suspiciousActivities.map((activity) => {
          const status = statusVisuals.suspicious[activity.status as SuspiciousStatus];

          return (
            <article key={activity.id} className="rounded-ur-lg border border-ur-error/20 bg-black/20 p-4">
              <div className="flex items-start justify-between gap-4">
                <p className="font-black text-white">{activity.title}</p>
                <StatusBadge label={status.label} variant={status.variant} icon={status.icon} />
              </div>

              <p className="mt-2 text-sm text-ur-error/72">{activity.source}</p>
              <p className="mt-3 font-mono text-xs font-bold text-ur-mint">{activity.actor}</p>

              <div className="mt-4 rounded-ur-sm border border-ur-error/20 bg-black/24 p-3">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-ur-error/72">
                  Risk score
                </p>
                <p className="mt-1 text-2xl font-black text-white">{activity.riskScore}/100</p>
              </div>

              <Button variant="danger" size="sm" className="mt-4 w-full">
                Investigate
              </Button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/admin-dashboard/audit-logs-panel.tsx`\n\n```tsx\nimport Link from "next/link";
import { ArrowRight, Database } from "lucide-react";
import { auditLogs, statusVisuals, type AuditAction } from "@/lib/admin-dashboard-data";
import { StatusBadge } from "@/components/admin-dashboard/status-badge";
import { Button } from "@/components/ui/button";

export function AuditLogsPanel() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Audit logs
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            Admin and system audit trail
          </h2>
        </div>

        <Link href="/admin/audit-logs">
          <Button variant="outline" size="sm">
            View logs
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="mt-5 space-y-3">
        {auditLogs.map((log) => {
          const action = statusVisuals.audit[log.action as AuditAction];

          return (
            <article key={log.id} className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                    <Database className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-black text-white">{log.description}</p>
                    <p className="mt-1 text-sm text-white/52">Actor: {log.actor}</p>
                    <p className="mt-2 font-mono text-xs font-bold text-ur-mint">{log.id}</p>
                  </div>
                </div>

                <div className="text-right">
                  <StatusBadge label={action.label} variant={action.variant} icon={action.icon} />
                  <p className="mt-2 text-xs text-white/38">{log.time}</p>
                </div>
              </div>

              <p className="mt-3 truncate font-mono text-xs font-bold text-white/62">
                Ref: {log.reference}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/admin-dashboard/analytics-panel.tsx`\n\n```tsx\nimport { analyticsMetrics } from "@/lib/admin-dashboard-data";
import { cn } from "@/lib/utils";

export function AnalyticsPanel() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Analytics
      </p>
      <h2 className="mt-2 text-lg font-black text-white">Platform trust health</h2>

      <div className="mt-4 space-y-3">
        {analyticsMetrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <article key={metric.label} className="rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
                    {metric.label}
                  </p>
                  <p className="mt-1 text-2xl font-black tracking-[-0.04em] text-white">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-xs text-white/46">{metric.helper}</p>
                </div>

                <div
                  className={cn(
                    "grid h-10 w-10 shrink-0 place-items-center rounded-ur-sm",
                    metric.tone === "danger"
                      ? "bg-ur-error-bg text-ur-error"
                      : metric.tone === "warning"
                        ? "bg-ur-warning-bg text-ur-warning"
                        : "bg-ur-success-bg text-ur-success"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className={cn(
                    "h-full rounded-full",
                    metric.tone === "danger"
                      ? "w-[48%] bg-ur-error"
                      : metric.tone === "warning"
                        ? "w-[74%] bg-ur-warning"
                        : "w-[92%] bg-ur-primary"
                  )}
                />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/admin-dashboard/quick-actions-panel.tsx`\n\n```tsx\nimport Link from "next/link";
import { ArrowRight } from "lucide-react";
import { quickActions } from "@/lib/admin-dashboard-data";

export function QuickActionsPanel() {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Quick actions
      </p>
      <h2 className="mt-2 text-lg font-black text-white">Admin operations</h2>

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
\n```\n\n## `components/admin-dashboard/admin-flow-timeline-card.tsx`\n\n```tsx\nimport { CheckCircle2 } from "lucide-react";
import { adminFlowSteps } from "@/lib/admin-dashboard-data";
import { Badge } from "@/components/ui/badge";

export function AdminFlowTimelineCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Admin trust flow
      </p>

      <div className="mt-4 space-y-3">
        {adminFlowSteps.map((step) => {
          const Icon = step.icon;

          return (
            <div key={step.title} className="flex gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm bg-ur-success-bg text-ur-success">
                <CheckCircle2 className="h-4 w-4" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-black text-white">{step.title}</p>
                  <Badge variant={step.status === "Live" ? "success" : "warning"}>
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
\n```\n\n## `components/admin-dashboard/admin-safety-rules-card.tsx`\n\n```tsx\nimport { adminSafetyRules } from "@/lib/admin-dashboard-data";

export function AdminSafetyRulesCard() {
  return (
    <section className="rounded-ur-xl border border-ur-warning/25 bg-ur-warning-bg p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-warning">
        Admin safety rules
      </p>

      <div className="mt-4 space-y-3">
        {adminSafetyRules.map((rule) => {
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
\n```\n\n## `components/admin-dashboard/audit-references-card.tsx`\n\n```tsx\nimport { auditReferences } from "@/lib/admin-dashboard-data";

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
The route /admin/dashboard works.
Google Fonts are loaded.
Inter is used for UI text.
JetBrains Mono is used for admin IDs, approval IDs, report IDs, agent IDs, request IDs, proof hashes, and audit references.
UrbanRentisha dark green theme is applied.
Left sidebar is visible on desktop.
Topbar is visible.
Dashboard title and admin trust badges are visible.
Admin overview hero is visible.
Stats grid is visible.
Platform-wide approvals are visible.
Reports center is visible.
Agents panel is visible.
Proof verification activity is visible.
Suspicious activity risk queue is visible.
Audit logs panel is visible.
Analytics panel is visible.
Quick actions panel is visible.
Admin trust flow is visible.
Admin safety rules are visible.
Audit references are visible.
Mobile layout is stacked and readable.
All controls have visible focus states.
```

---

# 15. Final UX Summary

```text
The Admin Dashboard is the platform-wide trust command center.
It should make approvals, reports, agents, proofs, suspicious activity, audit logs, and analytics easy to monitor and act on without losing traceability or safety context.
```
