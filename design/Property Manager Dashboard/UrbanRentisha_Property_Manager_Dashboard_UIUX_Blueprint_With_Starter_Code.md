# UrbanRentisha TrustLayer Property Manager Dashboard UI/UX Blueprint and Starter Code

## 1. Screen Covered

```text
17. Property Manager Dashboard only
```

## 2. Page Purpose

The **Property Manager Dashboard** shows manager listings, viewing requests, verified tenants, escrow/payment-hold statuses, reports, viewing codes, and trust score.

This screen helps property managers:

```text
Track active property listings
Monitor listing verification status
Review tenant viewing requests
Check verified tenant profiles
View escrow/payment-hold statuses
Manage viewing codes
Respond to safety reports
Monitor manager trust score
Access key management actions quickly
Review recent operational activity
```

---

## 3. Design Inspiration Rule

The provided MantleMandate design system is used only as structural inspiration for:

```text
Strict spacing
Dark SaaS dashboard layout
Persistent app sidebar
Readable data panels
Accessible status states
Minimal motion
Technical trust tone
Manager control center hierarchy
```

Do not copy MantleMandate branding, logo, or blue palette.

UrbanRentisha must keep its own identity:

```text
Dark green trust UI
Eco-friendly real estate trust
Verified property management
Rental scam prevention
ZK payment proof
Stellar/Soroban verification
Professional B2B SaaS clarity
```

---

## 4. UX Goal

The manager should understand this immediately:

```text
This dashboard is the operational control center for verified rental access.
Every listing, tenant, payment hold, viewing request, code, and report is traceable.
The manager can act quickly without breaking trust or bypassing proof verification.
```

---

## 5. Required Dashboard Content

Required sections:

```text
Manager overview
Manager listings
Viewing requests
Verified tenants
Escrow / payment-hold statuses
Reports
Viewing codes
Trust score
Quick actions
Recent activity
Manager trust flow
Safety rules
Audit references
```

Status categories:

```text
Listing: Verified, Review needed, Paused
Viewing request: New, Proof verified, Scheduled, Completed, Needs action
Tenant: Verified, Pending, Restricted
Payment hold: Active, Released, Expired, Disputed
Report: Submitted, Under review, Resolved, Escalated
Viewing code: Active, Used, Expired, Revoked
```

---

## 6. Final Folder Structure

```text
urbanrentisha-property-manager-dashboard/
├── app/
│   ├── manager/
│   │   └── dashboard/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── property-manager-dashboard/
│   │   ├── audit-references-card.tsx
│   │   ├── listings-overview-card.tsx
│   │   ├── logo-mark.tsx
│   │   ├── manager-activity-feed.tsx
│   │   ├── manager-flow-timeline-card.tsx
│   │   ├── manager-overview-hero.tsx
│   │   ├── manager-safety-rules-card.tsx
│   │   ├── manager-sidebar.tsx
│   │   ├── manager-stats-grid.tsx
│   │   ├── manager-topbar.tsx
│   │   ├── payment-hold-status-panel.tsx
│   │   ├── property-manager-dashboard-page.tsx
│   │   ├── quick-actions-panel.tsx
│   │   ├── reports-center-panel.tsx
│   │   ├── status-badge.tsx
│   │   ├── trust-score-panel.tsx
│   │   ├── verified-tenants-panel.tsx
│   │   ├── viewing-codes-panel.tsx
│   │   └── viewing-requests-panel.tsx
│   │
│   └── ui/
│       ├── badge.tsx
│       └── button.tsx
│
├── lib/
│   ├── property-manager-data.ts
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
Page title and trust badges
Manager overview hero
Manager stats grid
Main two-column layout:
  Left:
    - listings overview
    - viewing requests
    - verified tenants
    - escrow/payment holds
    - viewing codes
    - reports center
  Right sticky:
    - trust score
    - quick actions
    - recent activity
    - manager trust flow
    - manager safety rules
    - audit references
```

Mobile and tablet:

```text
Topbar with menu button
No fixed sidebar
Dashboard title
Manager overview
Stats grid stacked
Listings
Requests
Verified tenants
Payment holds
Viewing codes
Reports
Trust score
Quick actions
Activity
Safety rules
Audit references
```

---

## 8. Interaction Rules

```text
Add listing goes to manager listing creation.
Review requests opens viewing request queue.
Manage viewing codes opens viewing code management.
Open report center opens manager report center.
Listing titles link to property details.
Viewing request cards link to request details when integrated.
Copy code buttons are UI-ready for clipboard integration.
Search field is UI-ready for manager-wide filtering.
Trust score links to score breakdown.
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
JetBrains Mono = manager IDs, listing IDs, tenant IDs, request IDs, viewing codes, transaction hashes, proof hashes, audit references
```

Use JetBrains Mono for:

```text
MGR-UR-4408
UR-LST-1001
TNT-UR-1188
REQ-UR-9084
CODE-UR-4829
UR-4829-LOCK
4f7a8b2c...b3c4d5
soro_0x7ab...2c109
manager_flow_active
```

---

## 11. Accessibility Requirements

```text
Status must use text, icon, and color together.
Tables and grids must collapse into readable cards on smaller screens.
Sidebar links must have visible active state.
Search input must have accessible label.
Viewing codes must be readable and copy-ready.
Trust score must be shown with text and progress bar.
Reports must show severity/status clearly without relying only on color.
All buttons and links must have visible focus states.
Long hash/reference values must truncate safely.
Minimum mobile touch target should be 44px.
```

---

## 12. Implementation Notes

This starter is UI-only.

Connect it later to:

```text
Manager profile API
Manager listing API
Viewing request API
Verified tenant API
Escrow/payment-hold API
Viewing code API
Report center API
Trust score API
Activity feed API
Search/filter API
```

Recommended API endpoints:

```text
GET /api/v1/manager/dashboard
GET /api/v1/manager/listings
GET /api/v1/manager/viewing-requests
GET /api/v1/manager/verified-tenants
GET /api/v1/manager/payment-holds
GET /api/v1/manager/viewing-codes
GET /api/v1/manager/reports
GET /api/v1/manager/trust-score
GET /api/v1/manager/activity
```

Recommended route:

```text
/manager/dashboard
```

---

# 13. Full Starter Code

\n## `package.json`\n\n```json\n{
  "name": "urbanrentisha-property-manager-dashboard-screen",
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
  title: "Property Manager Dashboard | UrbanRentisha TrustLayer",
  description:
    "Manage verified listings, viewing requests, tenants, payment holds, viewing codes, reports, and trust score."
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

  .manager-grid-bg {
    background-image:
      linear-gradient(rgba(22, 163, 74, 0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(22, 163, 74, 0.045) 1px, transparent 1px);
    background-size: 38px 38px;
  }

  .manager-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(22, 163, 74, 0.45) rgba(255, 255, 255, 0.04);
  }
}
\n```\n\n## `app/page.tsx`\n\n```tsx\nimport { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/manager/dashboard");
}
\n```\n\n## `app/manager/dashboard/page.tsx`\n\n```tsx\nimport { PropertyManagerDashboardPage } from "@/components/property-manager-dashboard/property-manager-dashboard-page";

export default function Page() {
  return <PropertyManagerDashboardPage />;
}
\n```\n\n## `lib/utils.ts`\n\n```ts\nimport { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
\n```\n\n## `lib/property-manager-data.ts`\n\n```ts\nimport {
  AlertTriangle,
  BadgeCheck,
  Bell,
  Building2,
  CalendarCheck2,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Copy,
  Database,
  DoorOpen,
  Eye,
  FileWarning,
  Flag,
  Hash,
  HelpCircle,
  Home,
  KeyRound,
  LayoutDashboard,
  ListChecks,
  LockKeyhole,
  LogOut,
  MapPin,
  MessageCircle,
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
  WalletCards
} from "lucide-react";

export type ListingStatus = "verified" | "review_needed" | "paused";
export type RequestStatus = "new" | "proof_verified" | "scheduled" | "completed" | "needs_action";
export type TenantStatus = "verified" | "pending" | "restricted";
export type HoldStatus = "active" | "released" | "expired" | "disputed";
export type ReportStatus = "submitted" | "under_review" | "resolved" | "escalated";
export type CodeStatus = "active" | "used" | "expired" | "revoked";

export type ManagerProfile = {
  id: string;
  name: string;
  company: string;
  role: string;
  walletAddress: string;
  trustScore: number;
  activeListings: number;
  pendingRequests: number;
  verifiedTenants: number;
  activeHolds: number;
  openReports: number;
};

export type ManagerListing = {
  id: string;
  title: string;
  location: string;
  rentKes: number;
  viewingFeeKes: number;
  status: ListingStatus;
  requests: number;
  verifiedViews: number;
};

export type ViewingRequest = {
  id: string;
  propertyTitle: string;
  tenantName: string;
  tenantId: string;
  requestedAt: string;
  viewingSlot: string;
  status: RequestStatus;
  paymentStatus: "paid" | "held" | "pending";
  proofHash?: string;
};

export type VerifiedTenant = {
  id: string;
  name: string;
  propertyTitle: string;
  verification: TenantStatus;
  lastActivity: string;
  walletAddress: string;
};

export type PaymentHold = {
  id: string;
  propertyTitle: string;
  tenantName: string;
  amountKes: number;
  status: HoldStatus;
  holdUntil: string;
  txHash: string;
};

export type ManagerReport = {
  id: string;
  type: "listing" | "agent" | "payment" | "access";
  propertyTitle: string;
  submittedBy: string;
  status: ReportStatus;
  submittedAt: string;
};

export type ViewingCode = {
  id: string;
  propertyTitle: string;
  tenantName: string;
  code: string;
  status: CodeStatus;
  expiresAt: string;
};

export type ActivityItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "listing" | "request" | "payment" | "proof" | "report";
};

export const managerProfile: ManagerProfile = {
  id: "MGR-UR-4408",
  name: "Amina Realty Group",
  company: "Amina Realty Group",
  role: "Verified Property Manager",
  walletAddress: "GCDK...9X2P",
  trustScore: 94,
  activeListings: 12,
  pendingRequests: 7,
  verifiedTenants: 36,
  activeHolds: 5,
  openReports: 2
};

export const managerListings: ManagerListing[] = [
  {
    id: "UR-LST-1001",
    title: "Kilimani Green View Apartment",
    location: "Kilimani, Nairobi",
    rentKes: 85000,
    viewingFeeKes: 500,
    status: "verified",
    requests: 42,
    verifiedViews: 31
  },
  {
    id: "UR-LST-1024",
    title: "Westlands Studio Loft",
    location: "Westlands, Nairobi",
    rentKes: 52000,
    viewingFeeKes: 400,
    status: "verified",
    requests: 29,
    verifiedViews: 18
  },
  {
    id: "UR-LST-1042",
    title: "Lavington Garden Maisonette",
    location: "Lavington, Nairobi",
    rentKes: 145000,
    viewingFeeKes: 700,
    status: "review_needed",
    requests: 18,
    verifiedViews: 9
  },
  {
    id: "UR-LST-1055",
    title: "Runda Family Home",
    location: "Runda, Nairobi",
    rentKes: 280000,
    viewingFeeKes: 1000,
    status: "paused",
    requests: 11,
    verifiedViews: 4
  }
];

export const viewingRequests: ViewingRequest[] = [
  {
    id: "REQ-UR-9084",
    propertyTitle: "Kilimani Green View Apartment",
    tenantName: "John Tenant",
    tenantId: "TNT-UR-1188",
    requestedAt: "Today, 10:04 AM",
    viewingSlot: "22 Jun, 11:30 AM",
    status: "proof_verified",
    paymentStatus: "held",
    proofHash: "soro_0x7ab...2c109"
  },
  {
    id: "REQ-UR-9121",
    propertyTitle: "Westlands Studio Loft",
    tenantName: "Maya Tenant",
    tenantId: "TNT-UR-1260",
    requestedAt: "Today, 12:18 PM",
    viewingSlot: "23 Jun, 2:00 PM",
    status: "scheduled",
    paymentStatus: "paid",
    proofHash: "soro_0x3ed...7f991"
  },
  {
    id: "REQ-UR-9146",
    propertyTitle: "Lavington Garden Maisonette",
    tenantName: "Brian Tenant",
    tenantId: "TNT-UR-1309",
    requestedAt: "Yesterday, 5:41 PM",
    viewingSlot: "24 Jun, 10:00 AM",
    status: "needs_action",
    paymentStatus: "pending"
  }
];

export const verifiedTenants: VerifiedTenant[] = [
  {
    id: "TNT-UR-1188",
    name: "John Tenant",
    propertyTitle: "Kilimani Green View Apartment",
    verification: "verified",
    lastActivity: "2 min ago",
    walletAddress: "GCB7...22LP"
  },
  {
    id: "TNT-UR-1260",
    name: "Maya Tenant",
    propertyTitle: "Westlands Studio Loft",
    verification: "verified",
    lastActivity: "18 min ago",
    walletAddress: "GDA4...9Q81"
  },
  {
    id: "TNT-UR-1309",
    name: "Brian Tenant",
    propertyTitle: "Lavington Garden Maisonette",
    verification: "pending",
    lastActivity: "1 hr ago",
    walletAddress: "GFC8...17VR"
  }
];

export const paymentHolds: PaymentHold[] = [
  {
    id: "ESC-UR-7201",
    propertyTitle: "Kilimani Green View Apartment",
    tenantName: "John Tenant",
    amountKes: 500,
    status: "active",
    holdUntil: "22 Jun, 12:30 PM",
    txHash: "4f7a8b2c...b3c4d5"
  },
  {
    id: "ESC-UR-7195",
    propertyTitle: "Westlands Studio Loft",
    tenantName: "Maya Tenant",
    amountKes: 400,
    status: "released",
    holdUntil: "Released today",
    txHash: "8d2a1f0c...91e77a"
  },
  {
    id: "ESC-UR-7168",
    propertyTitle: "Lavington Garden Maisonette",
    tenantName: "Brian Tenant",
    amountKes: 700,
    status: "disputed",
    holdUntil: "Under review",
    txHash: "92fa31cd...09d71e"
  }
];

export const managerReports: ManagerReport[] = [
  {
    id: "RPT-UR-3310",
    type: "payment",
    propertyTitle: "Westlands Studio Loft",
    submittedBy: "Maya Tenant",
    status: "under_review",
    submittedAt: "18 Jun"
  },
  {
    id: "RPT-UR-3291",
    type: "listing",
    propertyTitle: "Runda Family Home",
    submittedBy: "Anonymous tenant",
    status: "escalated",
    submittedAt: "14 Jun"
  },
  {
    id: "RPT-UR-3287",
    type: "access",
    propertyTitle: "Kilimani Green View Apartment",
    submittedBy: "John Tenant",
    status: "resolved",
    submittedAt: "12 Jun"
  }
];

export const viewingCodes: ViewingCode[] = [
  {
    id: "CODE-UR-4829",
    propertyTitle: "Kilimani Green View Apartment",
    tenantName: "John Tenant",
    code: "UR-4829-LOCK",
    status: "active",
    expiresAt: "22 Jun, 12:30 PM"
  },
  {
    id: "CODE-UR-4630",
    propertyTitle: "Westlands Studio Loft",
    tenantName: "Maya Tenant",
    code: "UR-4630-OPEN",
    status: "used",
    expiresAt: "Used today"
  },
  {
    id: "CODE-UR-4397",
    propertyTitle: "Lavington Garden Maisonette",
    tenantName: "Brian Tenant",
    code: "UR-4397-WAIT",
    status: "expired",
    expiresAt: "Expired yesterday"
  }
];

export const recentActivity: ActivityItem[] = [
  {
    id: "ACT-1001",
    title: "Proof verified",
    description: "John Tenant proof verified for Kilimani Green View Apartment.",
    time: "2 min ago",
    type: "proof"
  },
  {
    id: "ACT-1002",
    title: "Payment hold activated",
    description: "KES 500 hold became active for REQ-UR-9084.",
    time: "8 min ago",
    type: "payment"
  },
  {
    id: "ACT-1003",
    title: "New viewing request",
    description: "Brian Tenant requested Lavington Garden Maisonette.",
    time: "1 hr ago",
    type: "request"
  },
  {
    id: "ACT-1004",
    title: "Report escalated",
    description: "Runda Family Home listing report requires review.",
    time: "4 hrs ago",
    type: "report"
  }
];

export const dashboardStats = [
  {
    label: "Active listings",
    value: "12",
    helper: "10 verified, 1 review, 1 paused",
    icon: Building2,
    tone: "success"
  },
  {
    label: "Viewing requests",
    value: "7",
    helper: "3 awaiting manager action",
    icon: CalendarCheck2,
    tone: "warning"
  },
  {
    label: "Verified tenants",
    value: "36",
    helper: "Proof-backed tenant activity",
    icon: UsersRound,
    tone: "success"
  },
  {
    label: "Payment holds",
    value: "5",
    helper: "Active escrow/payment holds",
    icon: ReceiptText,
    tone: "warning"
  },
  {
    label: "Viewing codes",
    value: "9",
    helper: "4 active, 3 used, 2 expired",
    icon: KeyRound,
    tone: "success"
  },
  {
    label: "Trust score",
    value: "94%",
    helper: "Manager trust profile",
    icon: Star,
    tone: "success"
  }
];

export const quickActions = [
  {
    label: "Add new listing",
    description: "Create a verified property listing.",
    href: "/manager/listings/new",
    icon: Plus
  },
  {
    label: "Review requests",
    description: "Approve or schedule tenant viewing requests.",
    href: "/manager/requests",
    icon: ListChecks
  },
  {
    label: "Manage viewing codes",
    description: "View active, used, and expired access codes.",
    href: "/manager/viewing-codes",
    icon: KeyRound
  },
  {
    label: "Open report center",
    description: "Review suspicious listing, payment, and access reports.",
    href: "/manager/reports",
    icon: ShieldAlert
  }
];

export const managerFlowSteps = [
  {
    title: "Listing verified",
    description: "Property details and manager profile were reviewed.",
    status: "Complete",
    icon: Building2
  },
  {
    title: "Tenant payment received",
    description: "Viewing fee payment is attached to a request.",
    status: "Complete",
    icon: WalletCards
  },
  {
    title: "Proof accepted",
    description: "Tenant proof is verified before access unlocks.",
    status: "Complete",
    icon: ShieldCheck
  },
  {
    title: "Viewing code active",
    description: "Tenant access code is active for the scheduled slot.",
    status: "Active",
    icon: DoorOpen
  }
];

export const sidebarItems = [
  { label: "Dashboard", href: "/manager/dashboard", icon: LayoutDashboard, active: true },
  { label: "Listings", href: "/manager/listings", icon: Building2 },
  { label: "Requests", href: "/manager/requests", icon: CalendarCheck2 },
  { label: "Verified Tenants", href: "/manager/tenants", icon: UsersRound },
  { label: "Payment Holds", href: "/manager/payment-holds", icon: ReceiptText },
  { label: "Viewing Codes", href: "/manager/viewing-codes", icon: KeyRound },
  { label: "Reports", href: "/manager/reports", icon: Flag },
  { label: "Messages", href: "/manager/messages", icon: MessageCircle },
  { label: "Trust Score", href: "/manager/trust-score", icon: Star },
  { label: "Settings", href: "/manager/settings", icon: Settings },
  { label: "Support", href: "/support", icon: HelpCircle }
];

export const statusVisuals = {
  listing: {
    verified: { label: "Verified", variant: "success", icon: ShieldCheck },
    review_needed: { label: "Review needed", variant: "warning", icon: AlertTriangle },
    paused: { label: "Paused", variant: "danger", icon: LockKeyhole }
  },
  request: {
    new: { label: "New", variant: "warning", icon: Bell },
    proof_verified: { label: "Proof verified", variant: "success", icon: ShieldCheck },
    scheduled: { label: "Scheduled", variant: "success", icon: CalendarCheck2 },
    completed: { label: "Completed", variant: "success", icon: CheckCircle2 },
    needs_action: { label: "Needs action", variant: "danger", icon: AlertTriangle }
  },
  tenant: {
    verified: { label: "Verified", variant: "success", icon: UserCheck },
    pending: { label: "Pending", variant: "warning", icon: TimerReset },
    restricted: { label: "Restricted", variant: "danger", icon: ShieldAlert }
  },
  hold: {
    active: { label: "Active", variant: "warning", icon: ReceiptText },
    released: { label: "Released", variant: "success", icon: CheckCircle2 },
    expired: { label: "Expired", variant: "danger", icon: Clock3 },
    disputed: { label: "Disputed", variant: "danger", icon: AlertTriangle }
  },
  report: {
    submitted: { label: "Submitted", variant: "neutral", icon: Flag },
    under_review: { label: "Under review", variant: "warning", icon: FileWarning },
    resolved: { label: "Resolved", variant: "success", icon: CheckCircle2 },
    escalated: { label: "Escalated", variant: "danger", icon: ShieldAlert }
  },
  code: {
    active: { label: "Active", variant: "success", icon: KeyRound },
    used: { label: "Used", variant: "neutral", icon: CheckCircle2 },
    expired: { label: "Expired", variant: "danger", icon: TimerReset },
    revoked: { label: "Revoked", variant: "danger", icon: LockKeyhole }
  }
} as const;

export const auditReferences = [
  {
    label: "Manager ID",
    value: "MGR-UR-4408",
    icon: UserRound
  },
  {
    label: "Active listing",
    value: "UR-LST-1001",
    icon: Building2
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
    label: "Active proof",
    value: "soro_0x7ab...2c109",
    icon: LockKeyhole
  },
  {
    label: "Audit DB",
    value: "manager_flow_active",
    icon: Database
  }
];

export const safetyRules = [
  {
    title: "Do not unlock access manually",
    description: "Access should unlock after verified payment and proof status only.",
    icon: KeyRound
  },
  {
    title: "Keep listing details accurate",
    description: "Wrong location, photos, or fees increase reports and reduce trust score.",
    icon: Building2
  },
  {
    title: "Review reports quickly",
    description: "Payment, access, or listing reports should be addressed before more viewings.",
    icon: Flag
  },
  {
    title: "Use platform communication",
    description: "Keep tenant communication inside verified UrbanRentisha channels.",
    icon: MessageCircle
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
\n```\n\n## `components/property-manager-dashboard/logo-mark.tsx`\n\n```tsx\nimport Link from "next/link";
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
\n```\n\n## `components/property-manager-dashboard/status-badge.tsx`\n\n```tsx\nimport { Badge } from "@/components/ui/badge";

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
\n```\n\n## `components/property-manager-dashboard/manager-sidebar.tsx`\n\n```tsx\nimport Link from "next/link";
import { LogOut, UserRound } from "lucide-react";
import { managerProfile, sidebarItems } from "@/lib/property-manager-data";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/property-manager-dashboard/logo-mark";

export function ManagerSidebar() {
  return (
    <aside className="hidden min-h-screen w-[280px] shrink-0 border-r border-white/10 bg-ur-sidebar/90 p-5 backdrop-blur-xl xl:block">
      <LogoMark />

      <nav className="mt-9 space-y-1" aria-label="Property manager dashboard navigation">
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
        <p className="text-sm font-black text-white">Manager trust score</p>
        <p className="mt-2 text-4xl font-black tracking-[-0.06em] text-white">
          {managerProfile.trustScore}%
        </p>
        <p className="mt-2 text-xs leading-5 text-white/56">
          Based on listings, reports, holds, verified requests, and tenant experience.
        </p>
      </div>

      <div className="mt-8 border-t border-white/10 pt-5">
        <div className="flex items-center gap-3 rounded-ur-lg border border-white/10 bg-black/16 p-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-ur-primary/15 text-ur-primary">
            <UserRound className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-black text-white">{managerProfile.name}</p>
            <p className="text-xs text-white/46">{managerProfile.role}</p>
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
\n```\n\n## `components/property-manager-dashboard/manager-topbar.tsx`\n\n```tsx\nimport Link from "next/link";
import { Bell, Menu, Plus, Search, UserRound } from "lucide-react";
import { LogoMark } from "@/components/property-manager-dashboard/logo-mark";
import { Button } from "@/components/ui/button";

export function ManagerTopbar() {
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
          <span className="sr-only">Search manager dashboard</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/42" />
          <input
            placeholder="Search listing, tenant, request, report, code, or payment hold..."
            className="h-11 w-full max-w-[660px] rounded-ur-sm border border-white/10 bg-black/18 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-ur-primary"
          />
        </label>

        <div className="flex items-center gap-2">
          <Link
            href="/manager/reports"
            className="relative grid h-10 w-10 place-items-center rounded-ur-sm border border-white/10 text-white/70 transition-colors hover:border-ur-primary/50 hover:bg-white/5 hover:text-white ur-focus"
            aria-label="Open reports"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-ur-warning px-1 text-[10px] font-black text-black">
              2
            </span>
          </Link>

          <Link href="/manager/listings/new">
            <Button className="hidden sm:inline-flex">
              <Plus className="h-4 w-4" />
              Add listing
            </Button>
          </Link>

          <Link
            href="/manager/profile"
            className="grid h-10 w-10 place-items-center rounded-ur-sm border border-white/10 text-white/70 transition-colors hover:border-ur-primary/50 hover:bg-white/5 hover:text-white ur-focus"
            aria-label="Manager profile"
          >
            <UserRound className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
\n```\n\n## `components/property-manager-dashboard/property-manager-dashboard-page.tsx`\n\n```tsx\nimport { BadgeCheck, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ManagerSidebar } from "@/components/property-manager-dashboard/manager-sidebar";
import { ManagerTopbar } from "@/components/property-manager-dashboard/manager-topbar";
import { ManagerStatsGrid } from "@/components/property-manager-dashboard/manager-stats-grid";
import { ManagerOverviewHero } from "@/components/property-manager-dashboard/manager-overview-hero";
import { ListingsOverviewCard } from "@/components/property-manager-dashboard/listings-overview-card";
import { ViewingRequestsPanel } from "@/components/property-manager-dashboard/viewing-requests-panel";
import { VerifiedTenantsPanel } from "@/components/property-manager-dashboard/verified-tenants-panel";
import { PaymentHoldStatusPanel } from "@/components/property-manager-dashboard/payment-hold-status-panel";
import { ViewingCodesPanel } from "@/components/property-manager-dashboard/viewing-codes-panel";
import { ReportsCenterPanel } from "@/components/property-manager-dashboard/reports-center-panel";
import { TrustScorePanel } from "@/components/property-manager-dashboard/trust-score-panel";
import { QuickActionsPanel } from "@/components/property-manager-dashboard/quick-actions-panel";
import { ManagerActivityFeed } from "@/components/property-manager-dashboard/manager-activity-feed";
import { ManagerFlowTimelineCard } from "@/components/property-manager-dashboard/manager-flow-timeline-card";
import { ManagerSafetyRulesCard } from "@/components/property-manager-dashboard/manager-safety-rules-card";
import { AuditReferencesCard } from "@/components/property-manager-dashboard/audit-references-card";

export function PropertyManagerDashboardPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 manager-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-mint/10 blur-[130px]" />

      <div className="relative z-10 flex min-h-screen">
        <ManagerSidebar />

        <div className="min-w-0 flex-1">
          <ManagerTopbar />

          <section className="px-5 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1440px]">
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="success">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Verified manager
                  </Badge>
                  <Badge variant="outline">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Trust operations center
                  </Badge>
                </div>

                <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
                  Property manager dashboard
                </p>
                <h1 className="mt-3 max-w-[980px] text-[42px] font-black leading-[1.02] tracking-[-0.07em] text-white sm:text-[56px]">
                  Manage listings, requests, holds, codes, and trust.
                </h1>
                <p className="mt-4 max-w-[900px] text-base leading-7 text-white/66">
                  Monitor manager listings, proof-backed viewing requests, verified tenants, escrow/payment-hold statuses, safety reports, viewing codes, and trust score from one control center.
                </p>
              </div>

              <ManagerOverviewHero />
              <ManagerStatsGrid />

              <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_400px]">
                <section className="space-y-6">
                  <ListingsOverviewCard />
                  <ViewingRequestsPanel />

                  <div className="grid gap-6 lg:grid-cols-2">
                    <VerifiedTenantsPanel />
                    <PaymentHoldStatusPanel />
                  </div>

                  <div className="grid gap-6 lg:grid-cols-2">
                    <ViewingCodesPanel />
                    <ReportsCenterPanel />
                  </div>
                </section>

                <aside className="space-y-5 xl:sticky xl:top-24 xl:self-start">
                  <TrustScorePanel />
                  <QuickActionsPanel />
                  <ManagerActivityFeed />
                  <ManagerFlowTimelineCard />
                  <ManagerSafetyRulesCard />
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
\n```\n\n## `components/property-manager-dashboard/manager-overview-hero.tsx`\n\n```tsx\nimport Link from "next/link";
import { ArrowRight, Building2, ShieldCheck, Star, UsersRound } from "lucide-react";
import { managerProfile } from "@/lib/property-manager-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ManagerOverviewHero() {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
        <div>
          <Badge variant="success">
            <ShieldCheck className="h-3.5 w-3.5" />
            Manager verified
          </Badge>

          <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] text-white">
            {managerProfile.company}
          </h2>

          <p className="mt-2 max-w-[760px] text-sm leading-6 text-white/62">
            Control verified rental listings, review proof-backed tenants, issue viewing codes, monitor reports, and keep payment-hold records aligned with trust rules.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <InfoTile icon={<Building2 className="h-4 w-4" />} label="Manager ID" value={managerProfile.id} />
            <InfoTile icon={<UsersRound className="h-4 w-4" />} label="Verified tenants" value={`${managerProfile.verifiedTenants}`} />
            <InfoTile icon={<Star className="h-4 w-4" />} label="Trust score" value={`${managerProfile.trustScore}%`} />
          </div>
        </div>

        <div className="min-w-[280px] rounded-ur-lg border border-ur-success/20 bg-ur-success-bg p-5">
          <Star className="h-8 w-8 text-ur-success" />
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-ur-success/72">
            Trust health
          </p>
          <p className="mt-2 text-3xl font-black text-white">Stable</p>
          <p className="mt-2 text-sm leading-6 text-ur-success/72">
            Listing quality, tenant proof flow, and report handling are currently healthy.
          </p>

          <Link href="/manager/trust-score" className="mt-5 block">
            <Button className="w-full">
              Review trust score
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
\n```\n\n## `components/property-manager-dashboard/manager-stats-grid.tsx`\n\n```tsx\nimport { dashboardStats } from "@/lib/property-manager-data";
import { cn } from "@/lib/utils";

export function ManagerStatsGrid() {
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
\n```\n\n## `components/property-manager-dashboard/listings-overview-card.tsx`\n\n```tsx\nimport Link from "next/link";
import { ArrowRight, Building2, MapPin } from "lucide-react";
import { managerListings, statusVisuals, type ListingStatus } from "@/lib/property-manager-data";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/property-manager-dashboard/status-badge";

export function ListingsOverviewCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Manager listings
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            Active verified rental inventory
          </h2>
          <p className="mt-2 text-sm leading-6 text-white/56">
            Track listing verification, request volume, verified viewings, rent, and viewing fees.
          </p>
        </div>

        <Link href="/manager/listings">
          <Button variant="outline" size="sm">
            View listings
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="mt-5 overflow-hidden rounded-ur-lg border border-white/10">
        <div className="hidden grid-cols-[1.35fr_130px_130px_135px_135px_120px] gap-4 border-b border-white/10 bg-black/20 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white/38 xl:grid">
          <span>Property</span>
          <span>Rent</span>
          <span>Viewing fee</span>
          <span>Requests</span>
          <span>Verified views</span>
          <span>Status</span>
        </div>

        <div className="divide-y divide-white/10">
          {managerListings.map((listing) => {
            const status = statusVisuals.listing[listing.status as ListingStatus];

            return (
              <article
                key={listing.id}
                className="grid gap-4 bg-black/10 px-4 py-4 xl:grid-cols-[1.35fr_130px_130px_135px_135px_120px] xl:items-center"
              >
                <div className="flex gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div>
                    <Link
                      href={`/properties/${listing.id}`}
                      className="font-black text-white transition-colors hover:text-ur-mint ur-focus"
                    >
                      {listing.title}
                    </Link>
                    <p className="mt-1 flex items-center gap-2 text-sm text-white/52">
                      <MapPin className="h-4 w-4 text-ur-primary" />
                      {listing.location}
                    </p>
                    <p className="mt-2 font-mono text-xs font-bold text-ur-mint">
                      {listing.id}
                    </p>
                  </div>
                </div>

                <p className="font-bold text-white">KES {listing.rentKes.toLocaleString()}</p>
                <p className="font-bold text-white">KES {listing.viewingFeeKes.toLocaleString()}</p>
                <p className="font-bold text-white">{listing.requests}</p>
                <p className="font-bold text-white">{listing.verifiedViews}</p>
                <StatusBadge label={status.label} variant={status.variant} icon={status.icon} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
\n```\n\n## `components/property-manager-dashboard/viewing-requests-panel.tsx`\n\n```tsx\nimport Link from "next/link";
import { ArrowRight, CalendarCheck2, ShieldCheck, UserRound } from "lucide-react";
import { viewingRequests, statusVisuals, type RequestStatus } from "@/lib/property-manager-data";
import { StatusBadge } from "@/components/property-manager-dashboard/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ViewingRequestsPanel() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Viewing requests
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            Tenant request queue
          </h2>
          <p className="mt-2 text-sm leading-6 text-white/56">
            Review tenants, proof status, payment state, and scheduled viewing slots.
          </p>
        </div>

        <Link href="/manager/requests">
          <Button variant="outline" size="sm">
            View all
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        {viewingRequests.map((request) => {
          const status = statusVisuals.request[request.status as RequestStatus];

          return (
            <article
              key={request.id}
              className="rounded-ur-lg border border-white/10 bg-black/16 p-4 transition-colors hover:border-ur-primary/40 hover:bg-white/[0.04]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                  <CalendarCheck2 className="h-5 w-5" />
                </div>
                <StatusBadge label={status.label} variant={status.variant} icon={status.icon} />
              </div>

              <h3 className="mt-4 font-black text-white">{request.propertyTitle}</h3>
              <p className="mt-2 flex items-center gap-2 text-sm text-white/52">
                <UserRound className="h-4 w-4 text-ur-primary" />
                {request.tenantName}
              </p>
              <p className="mt-3 font-mono text-xs font-bold text-ur-mint">{request.id}</p>

              <div className="mt-4 rounded-ur-sm border border-white/10 bg-black/20 p-3">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
                  Viewing slot
                </p>
                <p className="mt-1 text-sm font-bold text-white">{request.viewingSlot}</p>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant={request.paymentStatus === "pending" ? "warning" : "success"}>
                  {request.paymentStatus}
                </Badge>
                {request.proofHash ? (
                  <Badge variant="success">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Proof attached
                  </Badge>
                ) : (
                  <Badge variant="warning">No proof yet</Badge>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/property-manager-dashboard/verified-tenants-panel.tsx`\n\n```tsx\nimport { UserCheck, WalletCards } from "lucide-react";
import { statusVisuals, type TenantStatus, verifiedTenants } from "@/lib/property-manager-data";
import { StatusBadge } from "@/components/property-manager-dashboard/status-badge";

export function VerifiedTenantsPanel() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Verified tenants
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        Tenant trust profile
      </h2>

      <div className="mt-5 space-y-3">
        {verifiedTenants.map((tenant) => {
          const status = statusVisuals.tenant[tenant.verification as TenantStatus];

          return (
            <article key={tenant.id} className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                    <UserCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-black text-white">{tenant.name}</p>
                    <p className="mt-1 text-sm text-white/52">{tenant.propertyTitle}</p>
                    <p className="mt-2 font-mono text-xs font-bold text-ur-mint">{tenant.id}</p>
                  </div>
                </div>
                <StatusBadge label={status.label} variant={status.variant} icon={status.icon} />
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-ur-sm border border-white/10 bg-black/20 p-3">
                <WalletCards className="h-4 w-4 text-ur-primary" />
                <p className="font-mono text-xs font-bold text-white">{tenant.walletAddress}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/property-manager-dashboard/payment-hold-status-panel.tsx`\n\n```tsx\nimport { ReceiptText } from "lucide-react";
import { paymentHolds, statusVisuals, type HoldStatus } from "@/lib/property-manager-data";
import { StatusBadge } from "@/components/property-manager-dashboard/status-badge";

export function PaymentHoldStatusPanel() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Escrow / payment-hold status
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        Holds and reservation payments
      </h2>

      <div className="mt-5 space-y-3">
        {paymentHolds.map((hold) => {
          const status = statusVisuals.hold[hold.status as HoldStatus];

          return (
            <article key={hold.id} className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-ur bg-ur-warning-bg text-ur-warning">
                    <ReceiptText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-black text-white">{hold.propertyTitle}</p>
                    <p className="mt-1 text-sm text-white/52">{hold.tenantName}</p>
                    <p className="mt-2 font-mono text-xs font-bold text-ur-mint">{hold.id}</p>
                  </div>
                </div>
                <StatusBadge label={status.label} variant={status.variant} icon={status.icon} />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-ur-sm border border-white/10 bg-black/20 p-3">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
                    Amount
                  </p>
                  <p className="mt-1 text-sm font-black text-white">KES {hold.amountKes.toLocaleString()}</p>
                </div>
                <div className="rounded-ur-sm border border-white/10 bg-black/20 p-3">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
                    Hold until
                  </p>
                  <p className="mt-1 text-sm font-black text-white">{hold.holdUntil}</p>
                </div>
              </div>

              <p className="mt-3 truncate font-mono text-xs font-bold text-white/62">
                TX: {hold.txHash}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/property-manager-dashboard/viewing-codes-panel.tsx`\n\n```tsx\nimport { Copy, KeyRound } from "lucide-react";
import { statusVisuals, type CodeStatus, viewingCodes } from "@/lib/property-manager-data";
import { StatusBadge } from "@/components/property-manager-dashboard/status-badge";
import { Button } from "@/components/ui/button";

export function ViewingCodesPanel() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Viewing codes
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        Access code management
      </h2>

      <div className="mt-5 space-y-3">
        {viewingCodes.map((code) => {
          const status = statusVisuals.code[code.status as CodeStatus];

          return (
            <article key={code.id} className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                    <KeyRound className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-black text-white">{code.propertyTitle}</p>
                    <p className="mt-1 text-sm text-white/52">{code.tenantName}</p>
                    <p className="mt-2 font-mono text-xs font-bold text-ur-mint">{code.id}</p>
                  </div>
                </div>
                <StatusBadge label={status.label} variant={status.variant} icon={status.icon} />
              </div>

              <div className="mt-4 rounded-ur-sm border border-white/10 bg-black/20 p-3">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
                  Code
                </p>
                <p className="mt-1 break-all font-mono text-lg font-black tracking-[0.08em] text-white">
                  {code.code}
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-xs text-white/46">{code.expiresAt}</p>
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/property-manager-dashboard/reports-center-panel.tsx`\n\n```tsx\nimport Link from "next/link";
import { ArrowRight, Flag } from "lucide-react";
import { managerReports, statusVisuals, type ReportStatus } from "@/lib/property-manager-data";
import { StatusBadge } from "@/components/property-manager-dashboard/status-badge";
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
            Safety and trust reports
          </h2>
        </div>
        <Flag className="h-6 w-6 text-ur-primary" />
      </div>

      <div className="mt-5 space-y-3">
        {managerReports.map((report) => {
          const status = statusVisuals.report[report.status as ReportStatus];

          return (
            <article key={report.id} className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-black text-white">{report.propertyTitle}</p>
                  <p className="mt-1 text-sm text-white/52">
                    {report.type} report by {report.submittedBy}
                  </p>
                  <p className="mt-2 font-mono text-xs font-bold text-ur-mint">{report.id}</p>
                </div>
                <StatusBadge label={status.label} variant={status.variant} icon={status.icon} />
              </div>
            </article>
          );
        })}
      </div>

      <Link href="/manager/reports" className="mt-5 block">
        <Button variant="danger" className="w-full">
          Open report center
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </section>
  );
}
\n```\n\n## `components/property-manager-dashboard/trust-score-panel.tsx`\n\n```tsx\nimport { Star, TrendingUp } from "lucide-react";
import { managerProfile } from "@/lib/property-manager-data";
import { Badge } from "@/components/ui/badge";

export function TrustScorePanel() {
  return (
    <section className="rounded-ur-xl border border-ur-success/25 bg-ur-success-bg p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-success">
            Trust score
          </p>
          <h2 className="mt-2 text-lg font-black text-white">Manager trust health</h2>
        </div>

        <Badge variant="success">
          <Star className="h-3.5 w-3.5" />
          Stable
        </Badge>
      </div>

      <p className="mt-5 text-5xl font-black tracking-[-0.07em] text-white">
        {managerProfile.trustScore}%
      </p>

      <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-ur-primary"
          style={{ width: `${managerProfile.trustScore}%` }}
        />
      </div>

      <div className="mt-4 rounded-ur-lg border border-ur-success/20 bg-black/16 p-4">
        <div className="flex gap-3">
          <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-ur-success" />
          <p className="text-sm leading-6 text-ur-success/78">
            Score improves when listings remain accurate, reports are resolved, holds are clean, and verified tenants complete viewings safely.
          </p>
        </div>
      </div>
    </section>
  );
}
\n```\n\n## `components/property-manager-dashboard/quick-actions-panel.tsx`\n\n```tsx\nimport Link from "next/link";
import { ArrowRight } from "lucide-react";
import { quickActions } from "@/lib/property-manager-data";

export function QuickActionsPanel() {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Quick actions
      </p>
      <h2 className="mt-2 text-lg font-black text-white">Manage trust operations</h2>

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
\n```\n\n## `components/property-manager-dashboard/manager-activity-feed.tsx`\n\n```tsx\nimport { Bell, Flag, LockKeyhole, WalletCards } from "lucide-react";
import { recentActivity } from "@/lib/property-manager-data";

const icons = {
  listing: Bell,
  request: Bell,
  payment: WalletCards,
  proof: LockKeyhole,
  report: Flag
};

export function ManagerActivityFeed() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Recent activity
      </p>

      <div className="mt-4 space-y-3">
        {recentActivity.map((item) => {
          const Icon = icons[item.type];

          return (
            <article key={item.id} className="flex gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-black text-white">{item.title}</p>
                <p className="mt-1 text-xs leading-5 text-white/52">{item.description}</p>
                <p className="mt-2 text-xs font-bold text-white/38">{item.time}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/property-manager-dashboard/manager-flow-timeline-card.tsx`\n\n```tsx\nimport { CheckCircle2 } from "lucide-react";
import { managerFlowSteps } from "@/lib/property-manager-data";
import { Badge } from "@/components/ui/badge";

export function ManagerFlowTimelineCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Manager trust flow
      </p>

      <div className="mt-4 space-y-3">
        {managerFlowSteps.map((step) => {
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
\n```\n\n## `components/property-manager-dashboard/manager-safety-rules-card.tsx`\n\n```tsx\nimport { safetyRules } from "@/lib/property-manager-data";

export function ManagerSafetyRulesCard() {
  return (
    <section className="rounded-ur-xl border border-ur-warning/25 bg-ur-warning-bg p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-warning">
        Manager safety rules
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
\n```\n\n## `components/property-manager-dashboard/audit-references-card.tsx`\n\n```tsx\nimport { auditReferences } from "@/lib/property-manager-data";

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
The route /manager/dashboard works.
Google Fonts are loaded.
Inter is used for UI text.
JetBrains Mono is used for manager ID, listing IDs, tenant IDs, request IDs, codes, hashes, and audit references.
UrbanRentisha dark green theme is applied.
Left sidebar is visible on desktop.
Topbar is visible.
Dashboard title and trust badges are visible.
Manager overview hero is visible.
Stats grid is visible.
Manager listings are visible.
Viewing request queue is visible.
Verified tenants panel is visible.
Escrow/payment-hold status panel is visible.
Viewing codes panel is visible.
Reports center is visible.
Trust score panel is visible.
Quick actions panel is visible.
Recent activity is visible.
Manager trust flow is visible.
Manager safety rules are visible.
Audit references are visible.
Mobile layout is stacked and readable.
All controls have visible focus states.
```

---

# 15. Final UX Summary

```text
The Property Manager Dashboard is the manager's trust operations center.
It should make every property, tenant request, payment hold, viewing code, report, and trust-score signal easy to monitor and act on without bypassing verified payment-proof flow.
```
