# UrbanRentisha TrustLayer Viewing Code Success Screen UI/UX Blueprint and Starter Code

## 1. Screen Covered

```text
Viewing Code Success Screen only
```

## 2. Page Purpose

The **Viewing Code Success Screen** displays the unlocked viewing code after successful proof verification.

This screen helps tenants:

```text
See that payment proof verification succeeded
View the unlocked property access code
Copy the viewing code
Show or hide the viewing code
Review property access details
Review the viewing date and time
Contact the verified agent
Follow safe access instructions
View audit references
Proceed to dashboard, directions, calendar, or support actions
```

---

## 3. Design Inspiration Rule

The provided MantleMandate design system is used only as structural inspiration for:

```text
Strict spacing
Dark SaaS layout
Clear technical trust state
Readable status cards
Accessible copy interactions
Precise hierarchy
Minimal but polished interaction states
```

Do not copy MantleMandate branding, logo, or blue palette.

UrbanRentisha must keep its own identity:

```text
Dark green trust UI
Eco-friendly real estate trust
Verified property access
Stellar payment proof
ZK verification success
Tenant safety
Professional B2B SaaS clarity
```

---

## 4. UX Goal

The tenant should understand this immediately:

```text
Proof verification succeeded.
Viewing access is unlocked.
The viewing code is now active.
The code should be used only for the selected property, verified agent, and scheduled viewing window.
```

---

## 5. Final Folder Structure

```text
urbanrentisha-viewing-code-success/
├── app/
│   ├── viewing-code/
│   │   └── [requestId]/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── viewing-code/
│   │   ├── access-details-card.tsx
│   │   ├── agent-contact-card.tsx
│   │   ├── audit-references-card.tsx
│   │   ├── instructions-checklist-card.tsx
│   │   ├── logo-mark.tsx
│   │   ├── security-notice-card.tsx
│   │   ├── tenant-next-actions-card.tsx
│   │   ├── unlock-progress.tsx
│   │   ├── verification-summary-card.tsx
│   │   ├── viewing-code-header.tsx
│   │   ├── viewing-code-hero-card.tsx
│   │   ├── viewing-code-success-page.tsx
│   │   └── viewing-schedule-card.tsx
│   │
│   └── ui/
│       ├── badge.tsx
│       └── button.tsx
│
├── lib/
│   ├── utils.ts
│   └── viewing-code-data.ts
│
├── next.config.ts
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 6. Page Layout

Desktop:

```text
Sticky top header
Back-to-proof-verification link
Screen title and success badges
Unlock progress stepper
Left main column:
  - unlocked viewing code hero card
  - property access details
  - viewing schedule
  - access checklist
  - security notice
Right sticky sidebar:
  - verified agent contact
  - verification summary
  - audit references
  - tenant next actions
```

Mobile:

```text
Header
Back link
Title
Unlock progress
Viewing code card
Agent contact
Property access details
Schedule
Checklist
Security notice
Audit references
Next actions
```

---

## 7. Interaction Rules

```text
Copy code button copies the viewing code and shows copied state.
Show / hide button masks or reveals the viewing code.
Call agent button is UI-ready for phone integration.
Message agent button is UI-ready for secure messaging.
Open property directions button is UI-ready for maps.
Add viewing to calendar button is UI-ready for calendar integration.
Report problem button is UI-ready for the fake listing/report flow.
```

---

## 8. Color Tokens

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

## 9. Typography

Google Fonts are mandatory.

```text
Inter = all UI text
JetBrains Mono = viewing code, request ID, property ID, phone number, transaction hash, proof hash, verification hash
```

Use JetBrains Mono for:

```text
UR-4829-LOCK
REQ-UR-9084
UR-LST-1001
+254 700 000 000
4f7a8b2c...
zkp_0x9f12...
soro_0x7ab...
```

---

## 10. Accessibility Requirements

```text
Viewing code must be readable and copyable.
Show / hide code button must use text and icon.
Copy code button must show copied state.
Do not rely on color alone for access state.
Agent contact actions must have clear labels.
Long audit references must truncate or wrap safely.
All interactive elements must have visible focus rings.
Minimum mobile touch target should be 44px.
```

---

## 11. Implementation Notes

This starter is UI-only.

Connect it later to:

```text
Viewing code generation API
Proof verification API
Access policy API
Agent profile API
Secure messaging API
Calendar integration
Maps/directions integration
Report issue flow
Audit log service
```

Recommended API endpoints:

```text
GET /api/v1/viewing-codes/:requestId
POST /api/v1/viewing-codes/:requestId/reveal
GET /api/v1/viewing-codes/:requestId/audit
POST /api/v1/support/report-viewing-issue
```

Recommended route:

```text
/viewing-code/REQ-UR-9084
```

---

# 12. Full Starter Code

## `package.json`

```json
{
  "name": "urbanrentisha-viewing-code-success-screen",
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
        "card-hover": "0 18px 55px rgba(22, 163, 74, 0.13)"
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
  title: "Viewing Code Unlocked | UrbanRentisha TrustLayer",
  description: "View the unlocked property viewing code after successful private payment proof verification."
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

  .code-grid-bg {
    background-image:
      linear-gradient(rgba(22, 163, 74, 0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(22, 163, 74, 0.045) 1px, transparent 1px);
    background-size: 38px 38px;
  }
}

```

## `app/page.tsx`

```tsx
import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/viewing-code/REQ-UR-9084");
}

```

## `app/viewing-code/[requestId]/page.tsx`

```tsx
import { ViewingCodeSuccessPage } from "@/components/viewing-code/viewing-code-success-page";

type PageProps = {
  params: {
    requestId: string;
  };
};

export default function Page({ params }: PageProps) {
  return <ViewingCodeSuccessPage requestId={params.requestId} />;
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

## `lib/viewing-code-data.ts`

```ts
import {
  BadgeCheck,
  CalendarCheck2,
  CheckCircle2,
  Clock3,
  Copy,
  Database,
  DoorOpen,
  Eye,
  EyeOff,
  FileCheck2,
  Hash,
  HelpCircle,
  Home,
  KeyRound,
  LockKeyhole,
  MapPin,
  MessageCircle,
  Phone,
  ReceiptText,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TimerReset,
  UserRound,
  WalletCards
} from "lucide-react";

export type ViewingCodeRecord = {
  requestId: string;
  viewingCode: string;
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
  buildingName: string;
  accessPoint: string;
  viewingDate: string;
  viewingTime: string;
  codeExpiresAt: string;
  tenantName: string;
  agentName: string;
  agentPhone: string;
  agentCompany: string;
  agentVerified: boolean;
  paymentAmountKes: number;
  network: "Stellar Testnet";
  paymentStatus: "Paid";
  proofStatus: "Verified";
  accessStatus: "Unlocked";
  txHash: string;
  proofHash: string;
  verificationHash: string;
};

export const viewingCodeRecord: ViewingCodeRecord = {
  requestId: "REQ-UR-9084",
  viewingCode: "UR-4829-LOCK",
  propertyId: "UR-LST-1001",
  propertyTitle: "Kilimani Green View Apartment",
  propertyLocation: "Kilimani, Nairobi",
  buildingName: "Green View Residences",
  accessPoint: "Main gate security desk",
  viewingDate: "Sat, 22 Jun",
  viewingTime: "11:30 AM",
  codeExpiresAt: "22 Jun 2026, 6:00 PM",
  tenantName: "John Tenant",
  agentName: "Amina Njoroge",
  agentPhone: "+254 700 000 000",
  agentCompany: "Amina Realty Group",
  agentVerified: true,
  paymentAmountKes: 500,
  network: "Stellar Testnet",
  paymentStatus: "Paid",
  proofStatus: "Verified",
  accessStatus: "Unlocked",
  txHash:
    "4f7a8b2c9d1e6f0a3b5c7d8e9f102a4b6c8d0e1f2a3b4c5d6e7f8091a2b3c4d5",
  proofHash:
    "zkp_0x9f12e5ab4c8d7a63f20b1c44e9aa73f1dc8829b6e4107ac5d9ef2a13b0c44190",
  verificationHash:
    "soro_0x7ab11f9e44dc92a18f03b7e54c2a901f6bb7d3e8124a90cc1f0e55a7d4e2c109"
};

export const unlockSteps = [
  { label: "Payment", description: "Viewing fee paid", icon: WalletCards },
  { label: "Proof", description: "Proof generated", icon: LockKeyhole },
  { label: "Verified", description: "Proof accepted", icon: ShieldCheck },
  { label: "Unlocked", description: "Viewing code active", icon: KeyRound }
];

export const successMetrics = [
  { label: "Payment", value: "Paid", icon: ReceiptText },
  { label: "Proof", value: "Verified", icon: ShieldCheck },
  { label: "Access", value: "Unlocked", icon: DoorOpen },
  { label: "Expires", value: "6:00 PM", icon: TimerReset }
];

export const viewingInstructions = [
  {
    title: "Arrive on time",
    description: "Use the selected viewing slot and arrive 5–10 minutes early.",
    icon: Clock3
  },
  {
    title: "Show the code",
    description: "Share the viewing code only with the verified agent or gate security desk.",
    icon: KeyRound
  },
  {
    title: "Confirm agent identity",
    description: "Match the agent name and company shown on this screen before entering.",
    icon: BadgeCheck
  },
  {
    title: "Report anything suspicious",
    description: "Use the report button if anyone asks for extra payment outside the platform.",
    icon: ShieldAlert
  }
];

export const auditReferences = [
  { label: "Request ID", value: "REQ-UR-9084", icon: FileCheck2 },
  { label: "Property ID", value: "UR-LST-1001", icon: Home },
  { label: "Network", value: "Stellar Testnet", icon: Sparkles },
  { label: "TX hash", value: "4f7a8b2c...b3c4d5", icon: Hash },
  { label: "Proof hash", value: "zkp_0x9f12...c44190", icon: LockKeyhole },
  { label: "Verification", value: "soro_0x7ab...2c109", icon: Database }
];

export const accessRules = [
  {
    title: "Code is time-limited",
    description: "The viewing code expires after the reservation window.",
    icon: TimerReset
  },
  {
    title: "Do not share publicly",
    description: "Treat the code like a private access credential.",
    icon: EyeOff
  },
  {
    title: "Verified access only",
    description: "Access was unlocked only after proof verification succeeded.",
    icon: ShieldCheck
  }
];

export const supportActions = [
  {
    title: "Call verified agent",
    description: "Use the verified phone contact if you arrive at the property.",
    icon: Phone
  },
  {
    title: "Message agent",
    description: "Send a secure in-app message about the viewing appointment.",
    icon: MessageCircle
  },
  {
    title: "Contact support",
    description: "Ask UrbanRentisha support to review access or code problems.",
    icon: HelpCircle
  }
];

export const codeControls = [
  { label: "Copy code", icon: Copy },
  { label: "Show / hide code", icon: Eye }
];

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

```

## `components/viewing-code/logo-mark.tsx`

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
        <p className="text-xl font-black tracking-[-0.04em] text-white">
          Urban<span className="text-ur-primary">Rentisha</span>
        </p>
        <p className="text-sm font-semibold text-ur-muted">TrustLayer</p>
      </div>
    </Link>
  );
}

```

## `components/viewing-code/viewing-code-success-page.tsx`

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, DoorOpen, ShieldCheck } from "lucide-react";
import { viewingCodeRecord } from "@/lib/viewing-code-data";
import { ViewingCodeHeader } from "@/components/viewing-code/viewing-code-header";
import { UnlockProgress } from "@/components/viewing-code/unlock-progress";
import { ViewingCodeHeroCard } from "@/components/viewing-code/viewing-code-hero-card";
import { AccessDetailsCard } from "@/components/viewing-code/access-details-card";
import { ViewingScheduleCard } from "@/components/viewing-code/viewing-schedule-card";
import { AgentContactCard } from "@/components/viewing-code/agent-contact-card";
import { InstructionsChecklistCard } from "@/components/viewing-code/instructions-checklist-card";
import { SecurityNoticeCard } from "@/components/viewing-code/security-notice-card";
import { VerificationSummaryCard } from "@/components/viewing-code/verification-summary-card";
import { AuditReferencesCard } from "@/components/viewing-code/audit-references-card";
import { TenantNextActionsCard } from "@/components/viewing-code/tenant-next-actions-card";
import { Badge } from "@/components/ui/badge";

type ViewingCodeSuccessPageProps = {
  requestId: string;
};

export function ViewingCodeSuccessPage({ requestId }: ViewingCodeSuccessPageProps) {
  const [visible, setVisible] = useState(true);
  const [copied, setCopied] = useState(false);
  const record = { ...viewingCodeRecord, requestId };

  async function copyCode() {
    await navigator.clipboard.writeText(record.viewingCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 code-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-mint/10 blur-[130px]" />

      <div className="relative z-10">
        <ViewingCodeHeader />

        <section className="ur-container pb-12 pt-5">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <Link
              href={`/proof-verification/${record.requestId}`}
              className="inline-flex w-fit items-center gap-2 rounded-ur-sm text-sm font-bold text-white/60 transition-colors hover:text-white ur-focus"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to proof verification
            </Link>

            <div className="flex flex-wrap gap-2">
              <Badge variant="success">
                <ShieldCheck className="h-3.5 w-3.5" />
                Proof verified
              </Badge>
              <Badge variant="success">
                <DoorOpen className="h-3.5 w-3.5" />
                Access unlocked
              </Badge>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
              Viewing code success
            </p>
            <h1 className="mt-3 max-w-[900px] text-[42px] font-black leading-[1.02] tracking-[-0.07em] text-white sm:text-[56px]">
              Viewing access unlocked successfully.
            </h1>
            <p className="mt-4 max-w-[800px] text-base leading-7 text-white/66">
              Your private payment proof has been verified. Use this viewing code only for the selected property, verified agent, and scheduled viewing window.
            </p>
          </div>

          <UnlockProgress />

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_390px]">
            <section className="space-y-6">
              <ViewingCodeHeroCard
                record={record}
                visible={visible}
                copied={copied}
                onToggleVisible={() => setVisible((current) => !current)}
                onCopy={copyCode}
              />
              <AccessDetailsCard record={record} />
              <ViewingScheduleCard record={record} />
              <InstructionsChecklistCard />
              <SecurityNoticeCard />
            </section>

            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <AgentContactCard record={record} />
              <VerificationSummaryCard record={record} />
              <AuditReferencesCard />
              <TenantNextActionsCard record={record} />
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}

```

## `components/viewing-code/viewing-code-header.tsx`

```tsx
import Link from "next/link";
import { Bell, LayoutDashboard, Menu, UserRound } from "lucide-react";
import { LogoMark } from "@/components/viewing-code/logo-mark";

export function ViewingCodeHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ur-bg/78 backdrop-blur-xl">
      <div className="ur-container flex h-20 items-center justify-between">
        <LogoMark />

        <nav className="hidden items-center gap-2 lg:flex" aria-label="Main navigation">
          {[
            { label: "Verify proof", href: "/proof-verification/REQ-UR-9084" },
            { label: "Viewing code", href: "/viewing-code/REQ-UR-9084", active: true },
            { label: "Payment hold", href: "/payment-hold/REQ-UR-9084" },
            { label: "Dashboard", href: "/tenant/dashboard" }
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
          <button
            type="button"
            className="hidden h-10 w-10 place-items-center rounded-ur-sm border border-white/10 text-white/70 transition-colors hover:border-ur-primary/50 hover:bg-white/5 hover:text-white ur-focus sm:grid"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
          </button>

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

```

## `components/viewing-code/unlock-progress.tsx`

```tsx
import { CheckCircle2 } from "lucide-react";
import { unlockSteps } from "@/lib/viewing-code-data";

export function UnlockProgress() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="grid gap-3 md:grid-cols-4">
        {unlockSteps.map((step) => {
          const Icon = step.icon;

          return (
            <div
              key={step.label}
              className="rounded-ur-lg border border-ur-success/25 bg-ur-success-bg p-4"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-ur bg-ur-primary text-white">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-black text-white">{step.label}</p>
                    <Icon className="h-3.5 w-3.5 text-ur-success" />
                  </div>
                  <p className="mt-1 text-xs text-ur-success/70">{step.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

```

## `components/viewing-code/viewing-code-hero-card.tsx`

```tsx
"use client";

import { Check, Copy, Eye, EyeOff, KeyRound, LockKeyhole, TimerReset } from "lucide-react";
import type { ViewingCodeRecord } from "@/lib/viewing-code-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type ViewingCodeHeroCardProps = {
  record: ViewingCodeRecord;
  visible: boolean;
  copied: boolean;
  onToggleVisible: () => void;
  onCopy: () => void;
};

export function ViewingCodeHeroCard({
  record,
  visible,
  copied,
  onToggleVisible,
  onCopy
}: ViewingCodeHeroCardProps) {
  const displayedCode = visible ? record.viewingCode : "•••• •••• ••••";

  return (
    <section className="overflow-hidden rounded-ur-xl border border-ur-success/25 bg-ur-success-bg p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
        <div>
          <Badge variant="success">
            <KeyRound className="h-3.5 w-3.5" />
            Viewing code unlocked
          </Badge>

          <h2 className="mt-5 text-3xl font-black tracking-[-0.05em] text-white">
            Use this code for property access.
          </h2>

          <p className="mt-3 max-w-[680px] text-sm leading-6 text-ur-success/78">
            The code is active for the selected property and viewing time only. Share it with the verified agent or the designated access point.
          </p>
        </div>

        <div className="min-w-[260px] rounded-ur-lg border border-ur-success/20 bg-black/18 p-5 text-right">
          <TimerReset className="ml-auto h-7 w-7 text-ur-success" />
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-ur-success/64">
            Code expires
          </p>
          <p className="mt-2 text-sm font-black text-white">{record.codeExpiresAt}</p>
        </div>
      </div>

      <div className="mt-6 rounded-ur-xl border border-ur-success/20 bg-black/24 p-6 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-success/70">
          Viewing access code
        </p>
        <p className="mt-3 break-all font-mono text-[38px] font-black tracking-[0.08em] text-white sm:text-[54px]">
          {displayedCode}
        </p>

        <div className="mx-auto mt-5 flex max-w-[520px] flex-col gap-3 sm:flex-row">
          <Button className="w-full" onClick={onCopy}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy code"}
          </Button>

          <Button variant="outline" className="w-full" onClick={onToggleVisible}>
            {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {visible ? "Hide code" : "Show code"}
          </Button>
        </div>
      </div>

      <div className="mt-5 rounded-ur-lg border border-ur-primary/20 bg-ur-primary/8 p-4">
        <div className="flex gap-3">
          <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-ur-primary" />
          <p className="text-sm leading-6 text-white/62">
            This code was unlocked only after Stellar payment, ZK proof generation, and proof verification were completed.
          </p>
        </div>
      </div>
    </section>
  );
}

```

## `components/viewing-code/access-details-card.tsx`

```tsx
import { DoorOpen, Home, MapPin, ShieldCheck } from "lucide-react";
import type { ViewingCodeRecord } from "@/lib/viewing-code-data";

type AccessDetailsCardProps = {
  record: ViewingCodeRecord;
};

export function AccessDetailsCard({ record }: AccessDetailsCardProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Access details
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        {record.propertyTitle}
      </h2>
      <p className="mt-2 flex items-center gap-2 text-sm text-white/58">
        <MapPin className="h-4 w-4 text-ur-primary" />
        {record.propertyLocation}
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <AccessTile icon={<Home className="h-5 w-5" />} label="Building" value={record.buildingName} />
        <AccessTile icon={<DoorOpen className="h-5 w-5" />} label="Access point" value={record.accessPoint} />
        <AccessTile icon={<ShieldCheck className="h-5 w-5" />} label="Access status" value={record.accessStatus} />
      </div>
    </section>
  );
}

function AccessTile({
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
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">{label}</p>
      <p className="mt-1 text-sm font-black text-white">{value}</p>
    </div>
  );
}

```

## `components/viewing-code/viewing-schedule-card.tsx`

```tsx
import { CalendarCheck2, Clock3, TimerReset } from "lucide-react";
import type { ViewingCodeRecord } from "@/lib/viewing-code-data";

type ViewingScheduleCardProps = {
  record: ViewingCodeRecord;
};

export function ViewingScheduleCard({ record }: ViewingScheduleCardProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Viewing schedule
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        Your viewing slot is confirmed.
      </h2>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <ScheduleTile icon={<CalendarCheck2 className="h-5 w-5" />} label="Date" value={record.viewingDate} />
        <ScheduleTile icon={<Clock3 className="h-5 w-5" />} label="Time" value={record.viewingTime} />
        <ScheduleTile icon={<TimerReset className="h-5 w-5" />} label="Code expiry" value={record.codeExpiresAt} />
      </div>
    </section>
  );
}

function ScheduleTile({
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
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">{label}</p>
      <p className="mt-1 text-sm font-black text-white">{value}</p>
    </div>
  );
}

```

## `components/viewing-code/instructions-checklist-card.tsx`

```tsx
import { CheckCircle2 } from "lucide-react";
import { viewingInstructions } from "@/lib/viewing-code-data";

export function InstructionsChecklistCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Access checklist
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        Before you arrive
      </h2>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {viewingInstructions.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="rounded-ur-lg border border-white/10 bg-black/16 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <CheckCircle2 className="h-5 w-5 text-ur-success" />
              </div>
              <h3 className="font-black text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/58">{item.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

```

## `components/viewing-code/security-notice-card.tsx`

```tsx
import { ShieldAlert } from "lucide-react";
import { accessRules } from "@/lib/viewing-code-data";

export function SecurityNoticeCard() {
  return (
    <section className="rounded-ur-xl border border-ur-warning/25 bg-ur-warning-bg p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-ur-lg bg-ur-warning/15 text-ur-warning">
          <ShieldAlert className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-warning">
            Security notice
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            Keep this viewing code private.
          </h2>
          <p className="mt-2 text-sm leading-6 text-ur-warning/78">
            UrbanRentisha will never ask for extra off-platform payments to keep this viewing code active.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {accessRules.map((rule) => {
          const Icon = rule.icon;
          return (
            <article key={rule.title} className="rounded-ur-lg border border-ur-warning/20 bg-black/16 p-4">
              <Icon className="mb-3 h-5 w-5 text-ur-warning" />
              <h3 className="text-sm font-black text-white">{rule.title}</h3>
              <p className="mt-2 text-xs leading-5 text-ur-warning/74">{rule.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

```

## `components/viewing-code/agent-contact-card.tsx`

```tsx
import { BadgeCheck, MessageCircle, Phone, UserRound } from "lucide-react";
import type { ViewingCodeRecord } from "@/lib/viewing-code-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type AgentContactCardProps = {
  record: ViewingCodeRecord;
};

export function AgentContactCard({ record }: AgentContactCardProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Verified agent
          </p>
          <h2 className="mt-2 text-lg font-black text-white">{record.agentName}</h2>
          <p className="mt-1 text-sm text-white/52">{record.agentCompany}</p>
        </div>

        <Badge variant="success">
          <BadgeCheck className="h-3.5 w-3.5" />
          Verified
        </Badge>
      </div>

      <div className="mt-5 rounded-ur-lg border border-white/10 bg-black/16 p-4">
        <div className="flex gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
            <UserRound className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-black text-white">Contact for arrival</p>
            <p className="mt-1 font-mono text-sm text-ur-mint">{record.agentPhone}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        <Button className="w-full">
          <Phone className="h-4 w-4" />
          Call agent
        </Button>
        <Button variant="outline" className="w-full">
          <MessageCircle className="h-4 w-4" />
          Message agent
        </Button>
      </div>
    </section>
  );
}

```

## `components/viewing-code/verification-summary-card.tsx`

```tsx
import type { ViewingCodeRecord } from "@/lib/viewing-code-data";
import { successMetrics } from "@/lib/viewing-code-data";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck } from "lucide-react";

type VerificationSummaryCardProps = {
  record: ViewingCodeRecord;
};

export function VerificationSummaryCard({ record }: VerificationSummaryCardProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Verification summary
          </p>
          <h2 className="mt-2 text-lg font-black text-white">Access requirements complete</h2>
        </div>

        <Badge variant="success">
          <ShieldCheck className="h-3.5 w-3.5" />
          Complete
        </Badge>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {successMetrics.map((item) => {
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

      <div className="mt-5 rounded-ur-lg border border-ur-primary/20 bg-ur-primary/8 p-4">
        <p className="text-sm leading-6 text-white/60">
          Request <span className="font-mono text-ur-mint">{record.requestId}</span> is now eligible for verified property viewing.
        </p>
      </div>
    </section>
  );
}

```

## `components/viewing-code/audit-references-card.tsx`

```tsx
import { auditReferences } from "@/lib/viewing-code-data";

export function AuditReferencesCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Audit references
      </p>

      <p className="mt-2 text-sm leading-6 text-white/56">
        These references connect the viewing code to payment, proof, and verification records.
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
              <p className="max-w-[150px] truncate font-mono text-xs font-bold text-white">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

```

## `components/viewing-code/tenant-next-actions-card.tsx`

```tsx
import Link from "next/link";
import { CalendarDays, Flag, LayoutDashboard, MapPin } from "lucide-react";
import type { ViewingCodeRecord } from "@/lib/viewing-code-data";
import { Button } from "@/components/ui/button";

type TenantNextActionsCardProps = {
  record: ViewingCodeRecord;
};

export function TenantNextActionsCard({ record }: TenantNextActionsCardProps) {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Next actions
      </p>

      <h2 className="mt-2 text-lg font-black text-white">
        Manage your viewing
      </h2>

      <p className="mt-2 text-sm leading-6 text-white/58">
        Keep the viewing code safe and use the dashboard for updates.
      </p>

      <div className="mt-5 space-y-3">
        <Button className="w-full">
          <MapPin className="h-4 w-4" />
          Open property directions
        </Button>

        <Button variant="outline" className="w-full">
          <CalendarDays className="h-4 w-4" />
          Add viewing to calendar
        </Button>

        <Link href="/tenant/dashboard" className="block">
          <Button variant="outline" className="w-full">
            <LayoutDashboard className="h-4 w-4" />
            Go to dashboard
          </Button>
        </Link>

        <Button variant="danger" className="w-full">
          <Flag className="h-4 w-4" />
          Report a problem
        </Button>
      </div>

      <p className="mt-4 text-xs leading-5 text-white/42">
        Linked request: <span className="font-mono text-ur-mint">{record.requestId}</span>
      </p>
    </section>
  );
}

```

---

# 13. Acceptance Checklist

```text
The route /viewing-code/REQ-UR-9084 works.
Google Fonts are loaded.
Inter is used for UI text.
JetBrains Mono is used for viewing code, request ID, property ID, phone number, and hashes.
UrbanRentisha dark green theme is applied.
Viewing code hero card is visible.
Viewing code can be copied.
Viewing code can be shown and hidden.
Proof verified badge is visible.
Access unlocked badge is visible.
Property access details are visible.
Viewing schedule is visible.
Verified agent contact card is visible.
Access checklist is visible.
Security notice is visible.
Verification summary is visible.
Audit references are visible.
Tenant next actions are visible.
Mobile layout is stacked and readable.
All controls have visible focus states.
```

---

# 14. Final UX Summary

```text
The Viewing Code Success Screen is the reward moment after the proof flow.
It must make the tenant feel safe and confident while keeping the code private, time-limited, and tied to a verified property and agent.
The screen should be polished, calm, secure, and easy to use.
```
