# UrbanRentisha TrustLayer Agent Verification Profile Page UI/UX Blueprint and Starter Code

## 1. Screen Covered

```text
15. Agent Verification Profile Page only
```

## 2. Page Purpose

The **Agent Verification Profile Page** shows agent verification status, trust score, report count, listed properties, and verified viewing requests.

This screen helps tenants:

```text
Confirm whether an agent is verified
Understand the agent trust score
Review report count with context
Review listed properties managed by the agent
Review verified viewing request activity
Check verification documents and trust checks
Contact the agent through verified channels
Report concerns if something feels suspicious
```

---

## 3. Design Inspiration Rule

The provided MantleMandate design system is used only as structural inspiration for:

```text
Strict spacing
Dark SaaS layout
Technical profile trust cards
Readable tables
Accessible status states
Minimal motion
Clear hierarchy
Trust-oriented UX
```

Do not copy MantleMandate branding, logo, or blue palette.

UrbanRentisha must keep its own identity:

```text
Dark green trust UI
Eco-friendly real estate trust
Verified agent profile
Rental safety
Proof-backed viewing requests
Stellar trust references
Professional B2B SaaS clarity
```

---

## 4. UX Goal

The tenant should understand this immediately:

```text
This agent has a verified trust profile.
The trust score is high but not a legal guarantee.
Report count is shown with resolved/active context.
Listed properties and verified viewing requests show real platform activity.
Tenants should contact the agent through verified channels.
```

---

## 5. Key Screen Content

Required sections:

```text
Agent verification status
Trust score
Report count
Listed properties
Verified viewing requests
Verification documents/checks
Agent profile references
Contact and safety actions
```

Important wording:

```text
Verified agent
Trust score
Report count
Resolved reports
Active flags
Listed properties
Verified viewing requests
Proof-backed activity
```

Avoid overpromising:

```text
Guaranteed safe agent
No fraud possible
Legally certified agent
Risk-free viewing
```

---

## 6. Final Folder Structure

```text
urbanrentisha-agent-verification-profile/
├── app/
│   ├── agents/
│   │   └── [agentId]/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── agent-profile/
│   │   ├── agent-contact-actions-card.tsx
│   │   ├── agent-hero-card.tsx
│   │   ├── agent-profile-header.tsx
│   │   ├── agent-stats-grid.tsx
│   │   ├── agent-verification-profile-page.tsx
│   │   ├── listed-properties-card.tsx
│   │   ├── logo-mark.tsx
│   │   ├── profile-references-card.tsx
│   │   ├── report-summary-card.tsx
│   │   ├── safety-notes-card.tsx
│   │   ├── trust-score-card.tsx
│   │   ├── trust-timeline-card.tsx
│   │   ├── verification-documents-card.tsx
│   │   ├── verification-status-card.tsx
│   │   └── verified-viewing-requests-card.tsx
│   │
│   └── ui/
│       ├── badge.tsx
│       └── button.tsx
│
├── lib/
│   ├── agent-profile-data.ts
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
Sticky top header
Back-to-agents link
Page title and trust badges
Agent hero card
Stats grid
Main two-column layout:
  Left:
    - trust score card
    - verification status card
    - listed properties
    - verified viewing requests
    - verification documents/checks
    - trust timeline
  Right sticky:
    - report summary
    - contact/actions
    - profile references
    - safety/UX notes
```

Mobile:

```text
Header
Back link
Title
Agent hero
Stats
Trust score
Verification status
Report summary
Contact actions
Listed properties
Viewing requests
Documents
Timeline
References
Safety notes
```

---

## 8. Interaction Rules

```text
Message agent button is UI-ready for in-app messaging.
Call verified number button is UI-ready for phone integration.
Email agent button is UI-ready for email action.
Report concern button is UI-ready for fake-listing/report flow.
Listed property titles link to property details.
Verified viewing request rows show request ID and proof reference.
Trust score is shown as a score and progress bar.
Report count must include resolved and active flag context.
```

---

## 9. Color Tokens

```text
Background: #060B0A
Soft background: #0B1512
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
JetBrains Mono = agent ID, wallet address, license reference, profile hash, listing IDs, viewing request IDs, proof hashes
```

Use JetBrains Mono for:

```text
AGT-UR-2048
GCDK...9X2P
REA-KE-2026-4481
agt_0x9f12...1dc88
UR-LST-1001
REQ-UR-9084
soro_0x7ab...2c109
```

---

## 11. Accessibility Requirements

```text
Trust score must be shown with text and progress bar.
Verification status must use text and icon, not color only.
Report count must explain active/resolved context.
Tables must remain readable on mobile.
Action buttons must have visible labels.
Long hash/reference values must truncate safely.
All interactive elements must have visible focus rings.
Minimum mobile touch target should be 44px.
```

---

## 12. Implementation Notes

This starter is UI-only.

Connect it later to:

```text
Agent profile API
Agent verification API
Agent listed properties API
Verified viewing requests API
Report count API
Trust score service
Messaging API
Safety report API
```

Recommended API endpoints:

```text
GET /api/v1/agents/:agentId
GET /api/v1/agents/:agentId/properties
GET /api/v1/agents/:agentId/viewing-requests
GET /api/v1/agents/:agentId/reports
POST /api/v1/agents/:agentId/message
POST /api/v1/reports
```

Recommended route:

```text
/agents/AGT-UR-2048
```

---

# 13. Full Starter Code

\n## `package.json`\n\n```json\n{
  "name": "urbanrentisha-agent-verification-profile-screen",
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
  title: "Agent Verification Profile | UrbanRentisha TrustLayer",
  description:
    "View agent verification status, trust score, reports, properties, and verified viewing requests."
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
    @apply mx-auto w-full max-w-[1320px] px-5 sm:px-6 lg:px-8;
  }

  .ur-focus {
    @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ur-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ur-bg;
  }

  .agent-grid-bg {
    background-image:
      linear-gradient(rgba(22, 163, 74, 0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(22, 163, 74, 0.045) 1px, transparent 1px);
    background-size: 38px 38px;
  }
}
\n```\n\n## `app/page.tsx`\n\n```tsx\nimport { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/agents/AGT-UR-2048");
}
\n```\n\n## `app/agents/[agentId]/page.tsx`\n\n```tsx\nimport { AgentVerificationProfilePage } from "@/components/agent-profile/agent-verification-profile-page";

type PageProps = {
  params: {
    agentId: string;
  };
};

export default function Page({ params }: PageProps) {
  return <AgentVerificationProfilePage agentId={params.agentId} />;
}
\n```\n\n## `lib/utils.ts`\n\n```ts\nimport { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
\n```\n\n## `lib/agent-profile-data.ts`\n\n```ts\nimport {
  BadgeCheck,
  Bell,
  Building2,
  CalendarCheck2,
  CheckCircle2,
  ClipboardCheck,
  Database,
  FileCheck2,
  Flag,
  Hash,
  Home,
  IdCard,
  KeyRound,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ReceiptText,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  UserCheck,
  UserRound,
  WalletCards
} from "lucide-react";

export type VerificationStatus = "verified" | "under_review" | "restricted";
export type PropertyStatus = "verified" | "review_needed" | "paused";
export type ViewingStatus = "completed" | "scheduled" | "verified";

export type AgentProfile = {
  agentId: string;
  name: string;
  company: string;
  role: string;
  location: string;
  phone: string;
  email: string;
  joinedAt: string;
  verificationStatus: VerificationStatus;
  trustScore: number;
  reportCount: number;
  resolvedReports: number;
  listedProperties: number;
  verifiedViewingRequests: number;
  successfulViewings: number;
  walletAddress: string;
  licenseReference: string;
  profileHash: string;
};

export type ListedProperty = {
  id: string;
  title: string;
  location: string;
  rentKes: number;
  viewingFeeKes: number;
  status: PropertyStatus;
  requests: number;
};

export type VerifiedViewingRequest = {
  id: string;
  property: string;
  tenant: string;
  date: string;
  status: ViewingStatus;
  proof: string;
};

export const agentProfile: AgentProfile = {
  agentId: "AGT-UR-2048",
  name: "Amina Njoroge",
  company: "Amina Realty Group",
  role: "Verified Property Agent",
  location: "Nairobi, Kenya",
  phone: "+254 700 000 000",
  email: "amina@aminarealty.example",
  joinedAt: "12 Mar 2026",
  verificationStatus: "verified",
  trustScore: 96,
  reportCount: 2,
  resolvedReports: 2,
  listedProperties: 12,
  verifiedViewingRequests: 148,
  successfulViewings: 136,
  walletAddress: "GCDK...9X2P",
  licenseReference: "REA-KE-2026-4481",
  profileHash: "agt_0x9f12e5ab4c8d7a63f20b1c44e9aa73f1dc88"
};

export const listedProperties: ListedProperty[] = [
  {
    id: "UR-LST-1001",
    title: "Kilimani Green View Apartment",
    location: "Kilimani, Nairobi",
    rentKes: 85000,
    viewingFeeKes: 500,
    status: "verified",
    requests: 42
  },
  {
    id: "UR-LST-1024",
    title: "Westlands Studio Loft",
    location: "Westlands, Nairobi",
    rentKes: 52000,
    viewingFeeKes: 400,
    status: "verified",
    requests: 29
  },
  {
    id: "UR-LST-1042",
    title: "Lavington Garden Maisonette",
    location: "Lavington, Nairobi",
    rentKes: 145000,
    viewingFeeKes: 700,
    status: "review_needed",
    requests: 18
  },
  {
    id: "UR-LST-1055",
    title: "Runda Family Home",
    location: "Runda, Nairobi",
    rentKes: 280000,
    viewingFeeKes: 1000,
    status: "verified",
    requests: 11
  }
];

export const verifiedViewingRequests: VerifiedViewingRequest[] = [
  {
    id: "REQ-UR-9084",
    property: "Kilimani Green View Apartment",
    tenant: "John Tenant",
    date: "22 Jun, 11:30 AM",
    status: "verified",
    proof: "soro_0x7ab...2c109"
  },
  {
    id: "REQ-UR-9019",
    property: "Westlands Studio Loft",
    tenant: "Maya Tenant",
    date: "21 Jun, 2:00 PM",
    status: "completed",
    proof: "soro_0x3ed...7f991"
  },
  {
    id: "REQ-UR-8976",
    property: "Lavington Garden Maisonette",
    tenant: "Brian Tenant",
    date: "24 Jun, 10:00 AM",
    status: "scheduled",
    proof: "soro_0xa18...4bc22"
  }
];

export const agentStats = [
  {
    label: "Trust score",
    value: "96%",
    helper: "Verified agent rating",
    icon: Star,
    tone: "success"
  },
  {
    label: "Reports",
    value: "2",
    helper: "2 resolved, 0 active",
    icon: Flag,
    tone: "warning"
  },
  {
    label: "Properties",
    value: "12",
    helper: "Active listed properties",
    icon: Building2,
    tone: "success"
  },
  {
    label: "Verified viewings",
    value: "148",
    helper: "Proof-backed requests",
    icon: CalendarCheck2,
    tone: "success"
  }
];

export const verificationChecks = [
  {
    title: "Identity verified",
    description: "Government ID and agent profile match platform records.",
    status: "Passed",
    icon: IdCard
  },
  {
    title: "License checked",
    description: "License reference is linked to the listed company profile.",
    status: "Passed",
    icon: FileCheck2
  },
  {
    title: "Wallet linked",
    description: "Agent wallet is linked to Stellar testnet verification records.",
    status: "Passed",
    icon: WalletCards
  },
  {
    title: "Listing quality",
    description: "Listed properties are reviewed for location and access consistency.",
    status: "Monitored",
    icon: ClipboardCheck
  }
];

export const trustTimeline = [
  {
    title: "Agent profile created",
    description: "Profile and company details submitted.",
    time: "12 Mar 2026",
    icon: UserRound
  },
  {
    title: "Identity verified",
    description: "Identity and license details passed review.",
    time: "14 Mar 2026",
    icon: BadgeCheck
  },
  {
    title: "Wallet linked",
    description: "Stellar testnet wallet added to verification profile.",
    time: "16 Mar 2026",
    icon: WalletCards
  },
  {
    title: "First verified viewing",
    description: "First proof-backed viewing request completed.",
    time: "20 Mar 2026",
    icon: KeyRound
  }
];

export const reportSummary = [
  {
    label: "Total reports",
    value: "2",
    icon: Flag
  },
  {
    label: "Resolved",
    value: "2",
    icon: CheckCircle2
  },
  {
    label: "Active flags",
    value: "0",
    icon: ShieldCheck
  },
  {
    label: "Last review",
    value: "18 Jun",
    icon: Bell
  }
];

export const profileReferences = [
  {
    label: "Agent ID",
    value: "AGT-UR-2048",
    icon: UserCheck
  },
  {
    label: "License",
    value: "REA-KE-2026-4481",
    icon: IdCard
  },
  {
    label: "Wallet",
    value: "GCDK...9X2P",
    icon: WalletCards
  },
  {
    label: "Profile hash",
    value: "agt_0x9f12...1dc88",
    icon: Hash
  },
  {
    label: "Network",
    value: "Stellar Testnet",
    icon: Sparkles
  },
  {
    label: "Verification DB",
    value: "active_record",
    icon: Database
  }
];

export const safetyNotes = [
  {
    title: "Reports are visible but contextual",
    description: "Report count should be shown with resolved and active status, not as a raw accusation.",
    icon: ShieldAlert
  },
  {
    title: "Trust score is not a guarantee",
    description: "Use score language as a platform signal, not a legal promise.",
    icon: Star
  },
  {
    title: "Verified viewing requests matter",
    description: "Proof-backed viewings show completed platform activity.",
    icon: ReceiptText
  },
  {
    title: "Contact through platform first",
    description: "Tenants should prefer verified in-app contact and safe viewing flow.",
    icon: MessageCircle
  }
];

export const contactActions = [
  {
    label: "Message agent",
    icon: MessageCircle
  },
  {
    label: "Call verified number",
    icon: Phone
  },
  {
    label: "Email agent",
    icon: Mail
  },
  {
    label: "Report concern",
    icon: Flag
  }
];

export const trustSignals = [
  {
    label: "Identity",
    value: "Verified",
    icon: BadgeCheck
  },
  {
    label: "Wallet",
    value: "Linked",
    icon: WalletCards
  },
  {
    label: "Listings",
    value: "Monitored",
    icon: Home
  },
  {
    label: "Trend",
    value: "Stable",
    icon: TrendingUp
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
\n```\n\n## `components/agent-profile/logo-mark.tsx`\n\n```tsx\nimport Link from "next/link";
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
\n```\n\n## `components/agent-profile/agent-profile-header.tsx`\n\n```tsx\nimport Link from "next/link";
import { Bell, LayoutDashboard, Menu, UserRound } from "lucide-react";
import { LogoMark } from "@/components/agent-profile/logo-mark";

export function AgentProfileHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ur-bg/78 backdrop-blur-xl">
      <div className="ur-container flex h-20 items-center justify-between">
        <LogoMark />

        <nav className="hidden items-center gap-2 lg:flex" aria-label="Main navigation">
          {[
            { label: "Properties", href: "/listings" },
            { label: "Agents", href: "/agents", active: true },
            { label: "Reports", href: "/reports" },
            { label: "Notifications", href: "/notifications" }
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={
                item.active
                  ? "rounded-ur-sm bg-ur-primary/10 px-4 py-2 text-sm font-bold text-ur-mint ur-focus"
                  : "rounded-ur-sm px-4 py-2 text-sm font-bold text-white/56 transition-colors hover:bg-white/5 hover:text-white ur-focus"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/notifications"
            className="hidden h-10 w-10 place-items-center rounded-ur-sm border border-white/10 text-white/70 transition-colors hover:border-ur-primary/50 hover:bg-white/5 hover:text-white ur-focus sm:grid"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
          </Link>

          <Link
            href="/tenant/dashboard"
            className="hidden h-10 items-center gap-2 rounded-ur-sm border border-white/10 px-4 text-sm font-bold text-white/70 transition-colors hover:border-ur-primary/50 hover:bg-white/5 hover:text-white ur-focus sm:inline-flex"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-ur-sm border border-white/10 text-white/70 transition-colors hover:border-ur-primary/50 hover:bg-white/5 hover:text-white ur-focus"
            aria-label="User menu"
          >
            <UserRound className="h-4 w-4 sm:hidden" />
            <Menu className="hidden h-4 w-4 sm:block lg:hidden" />
          </button>
        </div>
      </div>
    </header>
  );
}
\n```\n\n## `components/agent-profile/agent-verification-profile-page.tsx`\n\n```tsx\nimport Link from "next/link";
import { ArrowLeft, BadgeCheck, ShieldCheck } from "lucide-react";
import { agentProfile } from "@/lib/agent-profile-data";
import { AgentProfileHeader } from "@/components/agent-profile/agent-profile-header";
import { AgentHeroCard } from "@/components/agent-profile/agent-hero-card";
import { AgentStatsGrid } from "@/components/agent-profile/agent-stats-grid";
import { TrustScoreCard } from "@/components/agent-profile/trust-score-card";
import { VerificationStatusCard } from "@/components/agent-profile/verification-status-card";
import { ListedPropertiesCard } from "@/components/agent-profile/listed-properties-card";
import { VerifiedViewingRequestsCard } from "@/components/agent-profile/verified-viewing-requests-card";
import { VerificationDocumentsCard } from "@/components/agent-profile/verification-documents-card";
import { TrustTimelineCard } from "@/components/agent-profile/trust-timeline-card";
import { ReportSummaryCard } from "@/components/agent-profile/report-summary-card";
import { AgentContactActionsCard } from "@/components/agent-profile/agent-contact-actions-card";
import { ProfileReferencesCard } from "@/components/agent-profile/profile-references-card";
import { SafetyNotesCard } from "@/components/agent-profile/safety-notes-card";
import { Badge } from "@/components/ui/badge";

type AgentVerificationProfilePageProps = {
  agentId: string;
};

export function AgentVerificationProfilePage({
  agentId
}: AgentVerificationProfilePageProps) {
  const profile = { ...agentProfile, agentId };

  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 agent-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-mint/10 blur-[130px]" />

      <div className="relative z-10">
        <AgentProfileHeader />

        <section className="ur-container pb-12 pt-5">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <Link
              href="/agents"
              className="inline-flex w-fit items-center gap-2 rounded-ur-sm text-sm font-bold text-white/60 transition-colors hover:text-white ur-focus"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to agents
            </Link>

            <div className="flex flex-wrap gap-2">
              <Badge variant="success">
                <BadgeCheck className="h-3.5 w-3.5" />
                Verified agent
              </Badge>
              <Badge variant="outline">
                <ShieldCheck className="h-3.5 w-3.5" />
                Trust profile
              </Badge>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
              Agent verification profile
            </p>
            <h1 className="mt-3 max-w-[920px] text-[42px] font-black leading-[1.02] tracking-[-0.07em] text-white sm:text-[56px]">
              Verify the agent before viewing.
            </h1>
            <p className="mt-4 max-w-[820px] text-base leading-7 text-white/66">
              Review agent verification status, trust score, report history, listed properties, and proof-backed viewing activity before engaging.
            </p>
          </div>

          <AgentHeroCard profile={profile} />
          <AgentStatsGrid />

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_390px]">
            <section className="space-y-6">
              <div className="grid gap-6 xl:grid-cols-2">
                <TrustScoreCard profile={profile} />
                <VerificationStatusCard profile={profile} />
              </div>
              <ListedPropertiesCard />
              <VerifiedViewingRequestsCard />
              <VerificationDocumentsCard />
              <TrustTimelineCard />
            </section>

            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <ReportSummaryCard profile={profile} />
              <AgentContactActionsCard profile={profile} />
              <ProfileReferencesCard />
              <SafetyNotesCard />
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
\n```\n\n## `components/agent-profile/agent-hero-card.tsx`\n\n```tsx\nimport { BadgeCheck, CalendarCheck2, MapPin, UserRound, WalletCards } from "lucide-react";
import type { AgentProfile } from "@/lib/agent-profile-data";
import { trustSignals } from "@/lib/agent-profile-data";
import { Badge } from "@/components/ui/badge";

type AgentHeroCardProps = {
  profile: AgentProfile;
};

export function AgentHeroCard({ profile }: AgentHeroCardProps) {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
        <div className="flex gap-5">
          <div className="grid h-20 w-20 shrink-0 place-items-center rounded-ur-xl border border-ur-primary/30 bg-ur-primary/12 shadow-green-glow">
            <UserRound className="h-10 w-10 text-ur-primary" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-3xl font-black tracking-[-0.05em] text-white">
                {profile.name}
              </h2>
              <Badge variant="success">
                <BadgeCheck className="h-3.5 w-3.5" />
                Verified
              </Badge>
            </div>

            <p className="mt-2 text-lg font-bold text-white/72">{profile.company}</p>
            <p className="mt-2 text-sm text-white/52">{profile.role}</p>

            <div className="mt-4 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/16 px-3 py-1.5 text-sm text-white/62">
                <MapPin className="h-4 w-4 text-ur-primary" />
                {profile.location}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/16 px-3 py-1.5 text-sm text-white/62">
                <CalendarCheck2 className="h-4 w-4 text-ur-primary" />
                Joined {profile.joinedAt}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/16 px-3 py-1.5 font-mono text-sm text-ur-mint">
                <WalletCards className="h-4 w-4 text-ur-primary" />
                {profile.walletAddress}
              </span>
            </div>
          </div>
        </div>

        <div className="min-w-[260px] rounded-ur-lg border border-ur-success/20 bg-ur-success-bg p-5 text-right">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-ur-success/72">
            Trust score
          </p>
          <p className="mt-2 text-5xl font-black tracking-[-0.07em] text-white">
            {profile.trustScore}%
          </p>
          <p className="mt-2 text-sm text-ur-success/72">Stable verified profile</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {trustSignals.map((signal) => {
          const Icon = signal.icon;
          return (
            <div key={signal.label} className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
              <Icon className="mb-3 h-5 w-5 text-ur-primary" />
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
                {signal.label}
              </p>
              <p className="mt-1 text-sm font-black text-white">{signal.value}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/agent-profile/agent-stats-grid.tsx`\n\n```tsx\nimport { agentStats } from "@/lib/agent-profile-data";
import { cn } from "@/lib/utils";

export function AgentStatsGrid() {
  return (
    <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {agentStats.map((stat) => {
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
\n```\n\n## `components/agent-profile/trust-score-card.tsx`\n\n```tsx\nimport { Star, TrendingUp } from "lucide-react";
import type { AgentProfile } from "@/lib/agent-profile-data";

type TrustScoreCardProps = {
  profile: AgentProfile;
};

export function TrustScoreCard({ profile }: TrustScoreCardProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Trust score
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            {profile.trustScore}% verified trust
          </h2>
        </div>
        <Star className="h-7 w-7 text-ur-success" />
      </div>

      <div className="mt-6">
        <div className="h-3 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-ur-primary"
            style={{ width: `${profile.trustScore}%` }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-xs font-bold">
          <span className="text-white/40">Review needed</span>
          <span className="text-ur-mint">Strong</span>
        </div>
      </div>

      <div className="mt-6 rounded-ur-lg border border-ur-success/20 bg-ur-success-bg p-4">
        <div className="flex gap-3">
          <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-ur-success" />
          <p className="text-sm leading-6 text-ur-success/78">
            Trust score is based on verification checks, report history, listing quality, and verified viewing activity.
          </p>
        </div>
      </div>
    </section>
  );
}
\n```\n\n## `components/agent-profile/verification-status-card.tsx`\n\n```tsx\nimport { BadgeCheck, ShieldCheck } from "lucide-react";
import type { AgentProfile } from "@/lib/agent-profile-data";
import { Badge } from "@/components/ui/badge";

type VerificationStatusCardProps = {
  profile: AgentProfile;
};

export function VerificationStatusCard({ profile }: VerificationStatusCardProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Verification status
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            Agent identity verified
          </h2>
        </div>

        <Badge variant="success">
          <BadgeCheck className="h-3.5 w-3.5" />
          {profile.verificationStatus}
        </Badge>
      </div>

      <div className="mt-6 rounded-ur-lg border border-ur-primary/20 bg-ur-primary/8 p-5">
        <ShieldCheck className="mb-4 h-8 w-8 text-ur-primary" />
        <p className="font-black text-white">Verification is active</p>
        <p className="mt-2 text-sm leading-6 text-white/58">
          Identity, license reference, wallet linkage, and listing activity are attached to this trust profile.
        </p>
      </div>

      <div className="mt-4 rounded-ur-lg border border-white/10 bg-black/16 p-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
          License reference
        </p>
        <p className="mt-2 font-mono text-sm font-bold text-ur-mint">
          {profile.licenseReference}
        </p>
      </div>
    </section>
  );
}
\n```\n\n## `components/agent-profile/listed-properties-card.tsx`\n\n```tsx\nimport Link from "next/link";
import { ArrowRight, Building2, MapPin } from "lucide-react";
import { listedProperties, type PropertyStatus } from "@/lib/agent-profile-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function propertyVariant(status: PropertyStatus) {
  if (status === "verified") return "success";
  if (status === "review_needed") return "warning";
  return "danger";
}

export function ListedPropertiesCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Listed properties
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            Active properties managed by this agent
          </h2>
        </div>

        <Button variant="outline" size="sm">
          View all
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-5 space-y-3">
        {listedProperties.map((property) => (
          <article
            key={property.id}
            className="rounded-ur-lg border border-white/10 bg-black/16 p-4 transition-colors hover:border-ur-primary/40 hover:bg-white/[0.04]"
          >
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div className="flex gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                  <Building2 className="h-6 w-6" />
                </div>

                <div>
                  <Link
                    href={`/properties/${property.id}`}
                    className="font-black text-white transition-colors hover:text-ur-mint ur-focus"
                  >
                    {property.title}
                  </Link>
                  <p className="mt-1 flex items-center gap-2 text-sm text-white/52">
                    <MapPin className="h-4 w-4 text-ur-primary" />
                    {property.location}
                  </p>
                  <p className="mt-2 font-mono text-xs font-bold text-ur-mint">
                    {property.id}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[360px]">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/38">Rent</p>
                  <p className="mt-1 text-sm font-black text-white">KES {property.rentKes.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/38">Requests</p>
                  <p className="mt-1 text-sm font-black text-white">{property.requests}</p>
                </div>
                <div>
                  <Badge variant={propertyVariant(property.status)}>
                    {property.status.replace("_", " ")}
                  </Badge>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
\n```\n\n## `components/agent-profile/verified-viewing-requests-card.tsx`\n\n```tsx\nimport { CalendarCheck2, KeyRound, ShieldCheck } from "lucide-react";
import { verifiedViewingRequests, type ViewingStatus } from "@/lib/agent-profile-data";
import { Badge } from "@/components/ui/badge";

function statusVariant(status: ViewingStatus) {
  if (status === "completed") return "success";
  if (status === "verified") return "success";
  return "warning";
}

export function VerifiedViewingRequestsCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Verified viewing requests
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        Proof-backed viewing activity
      </h2>

      <div className="mt-5 overflow-hidden rounded-ur-lg border border-white/10">
        <div className="hidden grid-cols-[1fr_1fr_140px_130px] gap-4 border-b border-white/10 bg-black/20 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white/38 lg:grid">
          <span>Request</span>
          <span>Property</span>
          <span>Date</span>
          <span>Status</span>
        </div>

        <div className="divide-y divide-white/10">
          {verifiedViewingRequests.map((request) => (
            <div
              key={request.id}
              className="grid gap-4 bg-black/10 px-4 py-4 lg:grid-cols-[1fr_1fr_140px_130px] lg:items-center"
            >
              <div>
                <p className="font-mono text-sm font-bold text-ur-mint">{request.id}</p>
                <p className="mt-1 flex items-center gap-2 text-xs text-white/46">
                  <ShieldCheck className="h-3.5 w-3.5 text-ur-primary" />
                  {request.proof}
                </p>
              </div>

              <div>
                <p className="font-bold text-white">{request.property}</p>
                <p className="mt-1 flex items-center gap-2 text-xs text-white/46">
                  <KeyRound className="h-3.5 w-3.5 text-ur-primary" />
                  Tenant: {request.tenant}
                </p>
              </div>

              <p className="flex items-center gap-2 text-sm text-white/62">
                <CalendarCheck2 className="h-4 w-4 text-ur-primary" />
                {request.date}
              </p>

              <Badge variant={statusVariant(request.status)}>
                {request.status}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
\n```\n\n## `components/agent-profile/verification-documents-card.tsx`\n\n```tsx\nimport { CheckCircle2 } from "lucide-react";
import { verificationChecks } from "@/lib/agent-profile-data";
import { Badge } from "@/components/ui/badge";

export function VerificationDocumentsCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Verification checks
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        Documents and trust checks
      </h2>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {verificationChecks.map((check) => {
          const Icon = check.icon;
          return (
            <article key={check.title} className="rounded-ur-lg border border-white/10 bg-black/16 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <Badge variant={check.status === "Passed" ? "success" : "warning"}>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {check.status}
                </Badge>
              </div>

              <h3 className="mt-4 font-black text-white">{check.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/56">{check.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/agent-profile/trust-timeline-card.tsx`\n\n```tsx\nimport { CheckCircle2 } from "lucide-react";
import { trustTimeline } from "@/lib/agent-profile-data";

export function TrustTimelineCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Trust timeline
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        Agent verification history
      </h2>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {trustTimeline.map((event) => {
          const Icon = event.icon;
          return (
            <article key={event.title} className="flex gap-4 rounded-ur-lg border border-white/10 bg-black/16 p-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-ur bg-ur-success-bg text-ur-success">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="font-black text-white">{event.title}</p>
                <p className="mt-1 text-sm leading-6 text-white/56">{event.description}</p>
                <p className="mt-2 flex items-center gap-2 font-mono text-xs font-bold text-ur-mint">
                  <Icon className="h-3.5 w-3.5" />
                  {event.time}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/agent-profile/report-summary-card.tsx`\n\n```tsx\nimport type { AgentProfile } from "@/lib/agent-profile-data";
import { reportSummary } from "@/lib/agent-profile-data";
import { Badge } from "@/components/ui/badge";

type ReportSummaryCardProps = {
  profile: AgentProfile;
};

export function ReportSummaryCard({ profile }: ReportSummaryCardProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Report count
          </p>
          <h2 className="mt-2 text-lg font-black text-white">
            {profile.reportCount} total reports
          </h2>
        </div>

        <Badge variant="success">0 active flags</Badge>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {reportSummary.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <Icon className="mb-2 h-4 w-4 text-ur-primary" />
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/38">{item.label}</p>
              <p className="mt-1 text-sm font-black text-white">{item.value}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-ur-lg border border-ur-warning/20 bg-ur-warning-bg p-4">
        <p className="text-sm leading-6 text-ur-warning/78">
          Report count is shown with context. Resolved reports do not automatically mean the agent is unsafe.
        </p>
      </div>
    </section>
  );
}
\n```\n\n## `components/agent-profile/agent-contact-actions-card.tsx`\n\n```tsx\nimport type { AgentProfile } from "@/lib/agent-profile-data";
import { contactActions } from "@/lib/agent-profile-data";
import { Button } from "@/components/ui/button";

type AgentContactActionsCardProps = {
  profile: AgentProfile;
};

export function AgentContactActionsCard({ profile }: AgentContactActionsCardProps) {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Contact and actions
      </p>

      <h2 className="mt-2 text-lg font-black text-white">{profile.name}</h2>
      <p className="mt-2 text-sm leading-6 text-white/58">
        Use verified platform channels first when arranging property viewing.
      </p>

      <div className="mt-5 space-y-3">
        {contactActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.label}
              variant={index === 3 ? "danger" : index === 0 ? "primary" : "outline"}
              className="w-full"
            >
              <Icon className="h-4 w-4" />
              {action.label}
            </Button>
          );
        })}
      </div>

      <div className="mt-5 rounded-ur-lg border border-white/10 bg-black/16 p-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
          Verified phone
        </p>
        <p className="mt-2 font-mono text-sm font-bold text-ur-mint">{profile.phone}</p>
      </div>
    </section>
  );
}
\n```\n\n## `components/agent-profile/profile-references-card.tsx`\n\n```tsx\nimport { profileReferences } from "@/lib/agent-profile-data";

export function ProfileReferencesCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Profile references
      </p>

      <div className="mt-4 space-y-3">
        {profileReferences.map((item) => {
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
\n```\n\n## `components/agent-profile/safety-notes-card.tsx`\n\n```tsx\nimport { safetyNotes } from "@/lib/agent-profile-data";

export function SafetyNotesCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Agent profile UX rules
      </p>

      <div className="mt-4 space-y-3">
        {safetyNotes.map((note) => {
          const Icon = note.icon;
          return (
            <div key={note.title} className="flex gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-black text-white">{note.title}</p>
                <p className="mt-1 text-xs leading-5 text-white/52">{note.description}</p>
              </div>
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
The route /agents/AGT-UR-2048 works.
Google Fonts are loaded.
Inter is used for UI text.
JetBrains Mono is used for agent ID, wallet address, license reference, profile hash, listing IDs, viewing request IDs, and proof hashes.
UrbanRentisha dark green theme is applied.
Agent hero card is visible.
Verification badge is visible.
Trust score is visible with progress bar.
Report count is visible with resolved and active context.
Stats grid is visible.
Listed properties are visible.
Verified viewing requests are visible.
Verification checks are visible.
Trust timeline is visible.
Contact action panel is visible.
Profile references card is visible.
Safety/UX notes are visible.
Mobile layout is stacked and readable.
All controls have visible focus states.
```

---

# 15. Final UX Summary

```text
The Agent Verification Profile Page is a trust decision screen.
It should help tenants quickly confirm who they are dealing with, understand trust signals, review report context, and proceed through safe platform-controlled communication.
```
