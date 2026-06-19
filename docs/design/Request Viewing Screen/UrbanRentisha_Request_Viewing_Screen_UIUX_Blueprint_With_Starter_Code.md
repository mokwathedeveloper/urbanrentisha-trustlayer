# UrbanRentisha TrustLayer Request Viewing Screen UI/UX Blueprint and Starter Code

## 1. Screen Covered

```text
7. Request Viewing Screen only
```

## 2. Page Purpose

The **Request Viewing Screen** creates a viewing request for a selected verified property and shows the required viewing fee before the tenant proceeds to payment and proof verification.

This screen helps tenants:

```text
Confirm the selected property
Review the required viewing fee
Choose a preferred viewing date
Choose a preferred viewing time
Select a contact preference
Add optional notes for the verified agent
Accept the proof-gated access rule
Create the viewing request
Continue to Stellar payment
```

---

## 3. Design Inspiration Rule

The provided MantleMandate design system is used only as structural inspiration for:

```text
Strict spacing
Dark SaaS layout
Clear form hierarchy
Technical trust tone
Status cards
Accessible controls
Minimal interaction states
```

Do not copy MantleMandate branding, logo, or blue palette.

UrbanRentisha must keep its own identity:

```text
Dark green trust UI
Eco-friendly real estate trust
Verified property access
Stellar payment-proof workflow
Tenant safety
Professional B2B SaaS clarity
```

---

## 4. UX Goal

The tenant should understand this immediately:

```text
This screen creates the request only.
Viewing access is still locked.
The required viewing fee is visible.
The next step is Stellar payment and ZK proof verification.
```

---

## 5. Final Folder Structure

```text
urbanrentisha-request-viewing/
├── app/
│   ├── request-viewing/
│   │   └── [propertyId]/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── request-viewing/
│   │   ├── agent-safety-card.tsx
│   │   ├── fee-breakdown-card.tsx
│   │   ├── logo-mark.tsx
│   │   ├── payment-proof-explainer.tsx
│   │   ├── property-summary-card.tsx
│   │   ├── request-header.tsx
│   │   ├── request-progress.tsx
│   │   ├── request-success-panel.tsx
│   │   ├── request-viewing-page.tsx
│   │   ├── viewing-fee-card.tsx
│   │   └── viewing-request-form.tsx
│   │
│   └── ui/
│       ├── badge.tsx
│       └── button.tsx
│
├── lib/
│   ├── request-viewing-data.ts
│   └── utils.ts
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
Back-to-property link
Request title and explanation
Progress stepper
Left main column:
  - selected property summary
  - viewing request form
  - payment-proof explainer
Right sticky sidebar:
  - required viewing fee
  - fee breakdown
  - agent and safety panel
```

Mobile:

```text
Header
Back link
Progress stepper
Property summary
Fee card
Form
Safety cards
Proof explanation
Success state
```

---

## 7. Interaction Rules

```text
Date buttons update selected date.
Time buttons update selected time.
Contact preference buttons update selected method.
Textarea accepts optional tenant note.
Terms checkbox must be checked before submit.
Submit button is disabled until required fields are complete.
Successful submit replaces form with success state.
Success state shows request ID.
Success state links to Stellar payment.
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
JetBrains Mono = request IDs, transaction hashes, wallet addresses, proof codes only
```

Use JetBrains Mono for:

```text
REQ-UR-9084
UR-LST-1001
TX hashes later
```

---

## 10. Accessibility Requirements

```text
All form controls must have visible labels.
Option buttons must be keyboard focusable.
Submit must be disabled until required consent is checked.
Textarea must have an accessible label.
Color cannot be the only status indicator.
All status cards must include text and icons.
All interactive elements must have visible focus rings.
Minimum mobile touch target should be 44px.
```

---

## 11. Implementation Notes

This starter is UI-only.

Connect it later to:

```text
Create viewing request API
Tenant session
Selected property API
Agent profile API
Stellar payment creation endpoint
Proof status tracker
Notification system
```

Recommended API action:

```text
POST /api/v1/viewing-requests
```

Recommended next route after request creation:

```text
/stellar-payment/REQ-UR-9084
```

---

# 12. Full Starter Code

\n## `package.json`\n\n```json\n{
  "name": "urbanrentisha-request-viewing-screen",
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
  title: "Request Viewing | UrbanRentisha TrustLayer",
  description:
    "Create a secure viewing request and review the required viewing fee before payment proof verification."
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

  .request-grid-bg {
    background-image:
      linear-gradient(rgba(22, 163, 74, 0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(22, 163, 74, 0.045) 1px, transparent 1px);
    background-size: 38px 38px;
  }
}
\n```\n\n## `app/page.tsx`\n\n```tsx\nimport { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/request-viewing/UR-LST-1001");
}
\n```\n\n## `app/request-viewing/[propertyId]/page.tsx`\n\n```tsx\nimport { RequestViewingPage } from "@/components/request-viewing/request-viewing-page";

type PageProps = {
  params: {
    propertyId: string;
  };
};

export default function Page({ params }: PageProps) {
  return <RequestViewingPage propertyId={params.propertyId} />;
}
\n```\n\n## `lib/utils.ts`\n\n```ts\nimport { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
\n```\n\n## `lib/request-viewing-data.ts`\n\n```ts\nimport {
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  FileCheck2,
  Home,
  KeyRound,
  LockKeyhole,
  MapPin,
  ReceiptText,
  ShieldCheck,
  UserRound,
  Wallet
} from "lucide-react";

export type ViewingProperty = {
  id: string;
  title: string;
  location: string;
  rentKes: number;
  viewingFeeKes: number;
  bedrooms: number;
  bathrooms: number;
  sizeSqm: number;
  trustScore: number;
  verificationStatus: "Verified";
  agent: {
    name: string;
    company: string;
    verified: boolean;
    responseTime: string;
  };
};

export const selectedProperty: ViewingProperty = {
  id: "UR-LST-1001",
  title: "Kilimani Green View Apartment",
  location: "Kilimani, Nairobi",
  rentKes: 68000,
  viewingFeeKes: 500,
  bedrooms: 2,
  bathrooms: 2,
  sizeSqm: 92,
  trustScore: 97,
  verificationStatus: "Verified",
  agent: {
    name: "Amina Njoroge",
    company: "Amina Realty Group",
    verified: true,
    responseTime: "Usually replies within 18 minutes"
  }
};

export const viewingDates = [
  "Today",
  "Tomorrow",
  "Fri, 21 Jun",
  "Sat, 22 Jun",
  "Mon, 24 Jun"
];

export const viewingTimes = [
  "09:00 AM",
  "11:30 AM",
  "02:00 PM",
  "04:30 PM"
];

export const contactPreferences = [
  "In-app notification",
  "Email update",
  "Phone call after proof",
  "WhatsApp after proof"
];

export const requestFlow = [
  {
    title: "Create request",
    description: "Tenant confirms property and preferred viewing slot.",
    icon: FileCheck2
  },
  {
    title: "Pay viewing fee",
    description: "The required viewing fee is paid through the Stellar payment step.",
    icon: Wallet
  },
  {
    title: "Generate proof",
    description: "A private payment proof confirms the payment condition.",
    icon: LockKeyhole
  },
  {
    title: "Unlock access",
    description: "Viewing code and private access details unlock after verification.",
    icon: KeyRound
  }
];

export const feeBreakdown = [
  {
    label: "Viewing fee",
    value: "KES 500",
    icon: ReceiptText
  },
  {
    label: "Payment network",
    value: "Stellar testnet",
    icon: CreditCard
  },
  {
    label: "Access status",
    value: "Locked until proof",
    icon: LockKeyhole
  }
];

export const safetyItems = [
  {
    title: "Property verified",
    description: "The property has a visible trust status before viewing.",
    icon: Home
  },
  {
    title: "Agent verified",
    description: "The assigned agent profile is connected to the request.",
    icon: UserRound
  },
  {
    title: "Private access protected",
    description: "Contact and viewing details are hidden until proof succeeds.",
    icon: ShieldCheck
  },
  {
    title: "Audit-ready request",
    description: "Request, payment, proof, and unlock status are tracked.",
    icon: CheckCircle2
  }
];

export const summaryStats = [
  {
    label: "Property",
    value: "Verified",
    icon: BadgeCheck
  },
  {
    label: "Location",
    value: "Kilimani",
    icon: MapPin
  },
  {
    label: "Fee",
    value: "KES 500",
    icon: ReceiptText
  },
  {
    label: "Slot",
    value: "Selectable",
    icon: CalendarDays
  },
  {
    label: "Proof",
    value: "Required",
    icon: LockKeyhole
  },
  {
    label: "Response",
    value: "18m",
    icon: Clock3
  }
];
\n```\n\n## `components/ui/button.tsx`\n\n```tsx\nimport * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "warning";
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
    "border border-ur-warning/30 bg-ur-warning-bg text-ur-warning hover:bg-ur-warning/15"
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

type BadgeVariant = "success" | "warning" | "neutral" | "outline";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const variants: Record<BadgeVariant, string> = {
  success: "border-ur-success/25 bg-ur-success-bg text-ur-success",
  warning: "border-ur-warning/25 bg-ur-warning-bg text-ur-warning",
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
\n```\n\n## `components/request-viewing/logo-mark.tsx`\n\n```tsx\nimport Link from "next/link";
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
\n```\n\n## `components/request-viewing/request-viewing-page.tsx`\n\n```tsx\n"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { selectedProperty } from "@/lib/request-viewing-data";
import { RequestHeader } from "@/components/request-viewing/request-header";
import { RequestProgress } from "@/components/request-viewing/request-progress";
import { PropertySummaryCard } from "@/components/request-viewing/property-summary-card";
import { ViewingFeeCard } from "@/components/request-viewing/viewing-fee-card";
import { ViewingRequestForm } from "@/components/request-viewing/viewing-request-form";
import { PaymentProofExplainer } from "@/components/request-viewing/payment-proof-explainer";
import { FeeBreakdownCard } from "@/components/request-viewing/fee-breakdown-card";
import { AgentSafetyCard } from "@/components/request-viewing/agent-safety-card";
import { RequestSuccessPanel } from "@/components/request-viewing/request-success-panel";
import { Badge } from "@/components/ui/badge";

type RequestViewingPageProps = {
  propertyId: string;
};

export type RequestFormState = {
  date: string;
  time: string;
  contactPreference: string;
  note: string;
  acceptedTerms: boolean;
};

export function RequestViewingPage({ propertyId }: RequestViewingPageProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState<RequestFormState>({
    date: "Tomorrow",
    time: "11:30 AM",
    contactPreference: "In-app notification",
    note: "",
    acceptedTerms: false
  });

  const requestId = "REQ-UR-9084";

  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 request-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-mint/10 blur-[130px]" />

      <div className="relative z-10">
        <RequestHeader />

        <section className="ur-container pb-12 pt-5">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <Link
              href={`/properties/${propertyId}`}
              className="inline-flex w-fit items-center gap-2 rounded-ur-sm text-sm font-bold text-white/60 transition-colors hover:text-white ur-focus"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to property details
            </Link>

            <Badge variant="success">
              <ShieldCheck className="h-3.5 w-3.5" />
              Viewing request is proof-gated
            </Badge>
          </div>

          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
              Create viewing request
            </p>
            <h1 className="mt-3 max-w-[820px] text-[42px] font-black leading-[1.02] tracking-[-0.07em] text-white sm:text-[56px]">
              Request access to view a verified property.
            </h1>
            <p className="mt-4 max-w-[760px] text-base leading-7 text-white/66">
              Confirm the property, select a preferred viewing slot, and review the required viewing fee before proceeding to Stellar payment and ZK proof verification.
            </p>
          </div>

          <RequestProgress activeStep={submitted ? 2 : 1} />

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_390px]">
            <section className="space-y-6">
              {submitted ? (
                <RequestSuccessPanel
                  requestId={requestId}
                  property={selectedProperty}
                  formState={formState}
                />
              ) : (
                <>
                  <PropertySummaryCard property={selectedProperty} />
                  <ViewingRequestForm
                    formState={formState}
                    onChange={setFormState}
                    onSubmit={() => setSubmitted(true)}
                  />
                </>
              )}

              <PaymentProofExplainer />
            </section>

            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <ViewingFeeCard property={selectedProperty} />
              <FeeBreakdownCard property={selectedProperty} />
              <AgentSafetyCard property={selectedProperty} />
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
\n```\n\n## `components/request-viewing/request-header.tsx`\n\n```tsx\nimport Link from "next/link";
import { Bell, LayoutDashboard, Menu, UserRound } from "lucide-react";
import { LogoMark } from "@/components/request-viewing/logo-mark";

export function RequestHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ur-bg/78 backdrop-blur-xl">
      <div className="ur-container flex h-20 items-center justify-between">
        <LogoMark />

        <nav className="hidden items-center gap-2 lg:flex" aria-label="Main navigation">
          {[
            { label: "Listings", href: "/listings" },
            { label: "Search", href: "/search" },
            { label: "Viewing request", href: "/request-viewing/UR-LST-1001", active: true },
            { label: "Proof tracker", href: "/proof-status" }
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
\n```\n\n## `components/request-viewing/request-progress.tsx`\n\n```tsx\nimport { CheckCircle2, CreditCard, FileCheck2, KeyRound, LockKeyhole } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { label: "Request", description: "Create viewing request", icon: FileCheck2 },
  { label: "Payment", description: "Pay viewing fee", icon: CreditCard },
  { label: "Proof", description: "Generate private proof", icon: LockKeyhole },
  { label: "Unlock", description: "Access viewing details", icon: KeyRound }
];

type RequestProgressProps = {
  activeStep: number;
};

export function RequestProgress({ activeStep }: RequestProgressProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="grid gap-3 md:grid-cols-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isDone = index < activeStep;
          const isActive = index === activeStep;

          return (
            <div
              key={step.label}
              className={cn(
                "rounded-ur-lg border p-4",
                isActive
                  ? "border-ur-primary/70 bg-ur-primary/10"
                  : isDone
                    ? "border-ur-success/25 bg-ur-success-bg"
                    : "border-white/10 bg-black/16"
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "grid h-10 w-10 place-items-center rounded-ur",
                    isActive || isDone ? "bg-ur-primary text-white" : "bg-white/5 text-white/40"
                  )}
                >
                  {isDone ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                </div>
                <div>
                  <p className="text-sm font-black text-white">{step.label}</p>
                  <p className="mt-1 text-xs text-white/45">{step.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/request-viewing/property-summary-card.tsx`\n\n```tsx\nimport { Bath, BedDouble, MapPin, Ruler, ShieldCheck } from "lucide-react";
import type { ViewingProperty } from "@/lib/request-viewing-data";
import { Badge } from "@/components/ui/badge";

type PropertySummaryCardProps = {
  property: ViewingProperty;
};

export function PropertySummaryCard({ property }: PropertySummaryCardProps) {
  return (
    <section className="overflow-hidden rounded-ur-xl border border-white/10 bg-white/[0.035] shadow-soft-dark backdrop-blur-xl">
      <div className="grid gap-0 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="relative min-h-[280px] bg-gradient-to-br from-emerald-950 via-emerald-800/45 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_34%,rgba(52,211,153,0.30),transparent_30%)]" />
          <div className="absolute left-5 top-5 flex gap-2">
            <Badge variant="success">
              <ShieldCheck className="h-3.5 w-3.5" />
              Verified property
            </Badge>
          </div>
          <div className="absolute bottom-5 left-5 right-5 rounded-ur-lg border border-white/10 bg-black/30 p-5 backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/44">
              Selected property
            </p>
            <h2 className="mt-1 text-2xl font-black tracking-[-0.04em] text-white">
              {property.title}
            </h2>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col justify-between gap-5 sm:flex-row">
            <div>
              <h2 className="text-2xl font-black tracking-[-0.04em] text-white">
                {property.title}
              </h2>
              <p className="mt-2 flex items-center gap-2 text-sm text-white/58">
                <MapPin className="h-4 w-4 text-ur-primary" />
                {property.location}
              </p>
            </div>

            <div className="rounded-ur-lg border border-ur-primary/20 bg-ur-success-bg p-4 text-right">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-ur-success">
                Trust score
              </p>
              <p className="mt-1 font-mono text-2xl font-black text-ur-success">
                {property.trustScore}%
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <Metric label="Rent" value={`KES ${property.rentKes.toLocaleString()}`} />
            <Metric icon={<BedDouble className="h-4 w-4" />} label="Beds" value={`${property.bedrooms}`} />
            <Metric icon={<Bath className="h-4 w-4" />} label="Baths" value={`${property.bathrooms}`} />
            <Metric icon={<Ruler className="h-4 w-4" />} label="Size" value={`${property.sizeSqm} sqm`} />
          </div>

          <div className="mt-6 rounded-ur-lg border border-white/10 bg-black/16 p-4">
            <p className="text-sm font-black text-white">Important access rule</p>
            <p className="mt-2 text-sm leading-6 text-white/58">
              Creating a request does not reveal the viewing code. Access details unlock only after the required viewing fee is paid and proof verification succeeds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({
  icon,
  label,
  value
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-ur-sm border border-white/10 bg-black/16 p-3">
      {icon ? <div className="mb-1 text-ur-primary">{icon}</div> : null}
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/38">{label}</p>
      <p className="mt-1 text-sm font-black text-white">{value}</p>
    </div>
  );
}
\n```\n\n## `components/request-viewing/viewing-request-form.tsx`\n\n```tsx\n"use client";

import { ArrowRight, CalendarDays, CheckCircle2, Clock3, MessageSquareText } from "lucide-react";
import type { RequestFormState } from "@/components/request-viewing/request-viewing-page";
import { contactPreferences, viewingDates, viewingTimes } from "@/lib/request-viewing-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ViewingRequestFormProps = {
  formState: RequestFormState;
  onChange: (state: RequestFormState) => void;
  onSubmit: () => void;
};

export function ViewingRequestForm({
  formState,
  onChange,
  onSubmit
}: ViewingRequestFormProps) {
  const canSubmit = formState.date && formState.time && formState.contactPreference && formState.acceptedTerms;

  function update<Key extends keyof RequestFormState>(key: Key, value: RequestFormState[Key]) {
    onChange({ ...formState, [key]: value });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (canSubmit) onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
          Viewing preferences
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
          Select when and how the agent should coordinate.
        </h2>
      </div>

      <div className="space-y-6">
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-black text-white">
            <CalendarDays className="h-4 w-4 text-ur-primary" />
            Preferred viewing date
          </div>
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {viewingDates.map((date) => (
              <OptionButton
                key={date}
                selected={formState.date === date}
                onClick={() => update("date", date)}
              >
                {date}
              </OptionButton>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-black text-white">
            <Clock3 className="h-4 w-4 text-ur-primary" />
            Preferred time
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {viewingTimes.map((time) => (
              <OptionButton
                key={time}
                selected={formState.time === time}
                onClick={() => update("time", time)}
              >
                {time}
              </OptionButton>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-black text-white">
            <MessageSquareText className="h-4 w-4 text-ur-primary" />
            Contact preference after proof
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {contactPreferences.map((preference) => (
              <OptionButton
                key={preference}
                selected={formState.contactPreference === preference}
                onClick={() => update("contactPreference", preference)}
              >
                {preference}
              </OptionButton>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="tenant-note" className="block text-xs font-semibold tracking-[0.04em] text-white/78">
            Optional note to agent
          </label>
          <textarea
            id="tenant-note"
            value={formState.note}
            onChange={(event) => update("note", event.target.value)}
            placeholder="Example: I prefer an afternoon viewing and would like to confirm parking access."
            className="min-h-[130px] w-full resize-y rounded-ur-sm border border-white/12 bg-ur-input p-3 text-sm text-white outline-none transition-colors placeholder:text-white/32 focus:border-ur-primary"
          />
        </div>

        <label className="flex cursor-pointer items-start gap-3 rounded-ur-lg border border-ur-primary/20 bg-ur-primary/8 p-4">
          <input
            type="checkbox"
            checked={formState.acceptedTerms}
            onChange={(event) => update("acceptedTerms", event.target.checked)}
            className="mt-1 h-5 w-5 rounded border-white/20 bg-ur-input accent-ur-primary"
          />
          <span>
            <span className="block text-sm font-black text-white">
              I understand the viewing fee is required before access unlocks.
            </span>
            <span className="mt-1 block text-sm leading-6 text-white/56">
              Viewing code and private agent access details remain locked until payment proof verification succeeds.
            </span>
          </span>
        </label>

        <Button type="submit" size="lg" className="w-full" disabled={!canSubmit}>
          <CheckCircle2 className="h-4 w-4" />
          Create viewing request
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}

function OptionButton({
  selected,
  onClick,
  children
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-ur-sm border px-3 py-2 text-sm font-bold transition-colors ur-focus",
        selected
          ? "border-ur-primary bg-ur-primary text-white"
          : "border-white/10 bg-black/16 text-white/62 hover:border-white/20 hover:bg-white/5 hover:text-white"
      )}
    >
      {children}
    </button>
  );
}
\n```\n\n## `components/request-viewing/viewing-fee-card.tsx`\n\n```tsx\nimport { LockKeyhole, ReceiptText, ShieldCheck } from "lucide-react";
import type { ViewingProperty } from "@/lib/request-viewing-data";

type ViewingFeeCardProps = {
  property: ViewingProperty;
};

export function ViewingFeeCard({ property }: ViewingFeeCardProps) {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Required viewing fee
      </p>

      <div className="mt-4 rounded-ur-lg border border-white/10 bg-black/18 p-5">
        <ReceiptText className="mb-4 h-6 w-6 text-ur-primary" />
        <p className="text-sm text-white/48">Amount due before proof</p>
        <p className="mt-1 text-4xl font-black tracking-[-0.05em] text-white">
          KES {property.viewingFeeKes.toLocaleString()}
        </p>
        <p className="mt-2 text-sm text-white/48">
          This fee starts the secure viewing workflow.
        </p>
      </div>

      <div className="mt-4 rounded-ur-lg border border-ur-success/20 bg-ur-success-bg p-4">
        <div className="flex gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-ur-success" />
          <div>
            <p className="text-sm font-black text-ur-success">Proof-gated access</p>
            <p className="mt-1 text-sm leading-6 text-ur-success/76">
              The platform verifies the payment condition before revealing private viewing details.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-ur-lg border border-white/10 bg-black/16 p-4">
        <div className="flex gap-3">
          <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-ur-primary" />
          <div>
            <p className="text-sm font-black text-white">Access status</p>
            <p className="mt-1 text-sm leading-6 text-white/56">
              Locked until Stellar payment and ZK proof verification are completed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
\n```\n\n## `components/request-viewing/fee-breakdown-card.tsx`\n\n```tsx\nimport type { ViewingProperty } from "@/lib/request-viewing-data";
import { feeBreakdown } from "@/lib/request-viewing-data";

type FeeBreakdownCardProps = {
  property: ViewingProperty;
};

export function FeeBreakdownCard({ property }: FeeBreakdownCardProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Fee breakdown
      </p>

      <div className="mt-4 space-y-3">
        {feeBreakdown.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center justify-between gap-4 rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-sm font-bold text-white/70">{item.label}</p>
              </div>
              <p className="text-sm font-black text-white">
                {item.label === "Viewing fee" ? `KES ${property.viewingFeeKes.toLocaleString()}` : item.value}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/request-viewing/payment-proof-explainer.tsx`\n\n```tsx\nimport { ArrowRight, ShieldCheck } from "lucide-react";
import { requestFlow } from "@/lib/request-viewing-data";

export function PaymentProofExplainer() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
          What happens after request creation
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
          Your request moves into payment and proof verification.
        </h2>
        <p className="mt-3 max-w-[760px] text-sm leading-6 text-white/58">
          The request is only the first step. Viewing access remains locked until the payment condition is verified privately.
        </p>
      </div>

      <div className="grid gap-3 lg:grid-cols-4">
        {requestFlow.map((item, index) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="relative">
              <article className="h-full rounded-ur-lg border border-white/10 bg-black/16 p-5">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
                  Step {index + 1}
                </p>
                <h3 className="mt-1 font-black text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/58">{item.description}</p>
              </article>

              {index < requestFlow.length - 1 ? (
                <ArrowRight className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-ur-primary lg:block" />
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-ur-lg border border-ur-primary/20 bg-ur-success-bg p-4">
        <div className="flex gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-ur-success" />
          <div>
            <p className="text-sm font-black text-ur-success">Tenant privacy note</p>
            <p className="mt-1 text-sm leading-6 text-ur-success/78">
              The proof confirms the payment condition without exposing unrelated wallet activity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
\n```\n\n## `components/request-viewing/agent-safety-card.tsx`\n\n```tsx\nimport { BadgeCheck } from "lucide-react";
import type { ViewingProperty } from "@/lib/request-viewing-data";
import { safetyItems } from "@/lib/request-viewing-data";

type AgentSafetyCardProps = {
  property: ViewingProperty;
};

export function AgentSafetyCard({ property }: AgentSafetyCardProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Agent and safety
      </p>

      <div className="mt-4 rounded-ur-lg border border-white/10 bg-black/16 p-4">
        <div className="flex items-start gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
            <BadgeCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="font-black text-white">{property.agent.name}</p>
            <p className="mt-1 text-sm text-white/52">{property.agent.company}</p>
            <p className="mt-2 text-xs font-bold text-ur-mint">{property.agent.responseTime}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {safetyItems.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="flex gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-black text-white">{item.title}</p>
                <p className="mt-1 text-xs leading-5 text-white/52">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/request-viewing/request-success-panel.tsx`\n\n```tsx\nimport Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, Clock3, KeyRound, ReceiptText } from "lucide-react";
import type { RequestFormState } from "@/components/request-viewing/request-viewing-page";
import type { ViewingProperty } from "@/lib/request-viewing-data";
import { Button } from "@/components/ui/button";

type RequestSuccessPanelProps = {
  requestId: string;
  property: ViewingProperty;
  formState: RequestFormState;
};

export function RequestSuccessPanel({
  requestId,
  property,
  formState
}: RequestSuccessPanelProps) {
  return (
    <section className="rounded-ur-xl border border-ur-success/25 bg-ur-success-bg p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="grid h-14 w-14 place-items-center rounded-ur-lg bg-ur-primary text-white shadow-green-glow">
        <CheckCircle2 className="h-7 w-7" />
      </div>

      <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-ur-success">
        Viewing request created
      </p>
      <h2 className="mt-2 text-3xl font-black tracking-[-0.05em] text-white">
        Request saved. Payment proof is next.
      </h2>
      <p className="mt-3 max-w-[720px] text-sm leading-6 text-ur-success/80">
        Your viewing request has been created for {property.title}. Access details are still locked until the viewing fee payment and proof verification are completed.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <SuccessMetric icon={<KeyRound className="h-4 w-4" />} label="Request ID" value={requestId} mono />
        <SuccessMetric icon={<ReceiptText className="h-4 w-4" />} label="Viewing fee" value={`KES ${property.viewingFeeKes.toLocaleString()}`} />
        <SuccessMetric icon={<CalendarDays className="h-4 w-4" />} label="Date" value={formState.date} />
        <SuccessMetric icon={<Clock3 className="h-4 w-4" />} label="Time" value={formState.time} />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link href={`/stellar-payment/${requestId}`} className="w-full sm:w-auto">
          <Button size="lg" className="w-full">
            Continue to Stellar payment
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>

        <Link href="/tenant/dashboard" className="w-full sm:w-auto">
          <Button size="lg" variant="outline" className="w-full">
            View dashboard
          </Button>
        </Link>
      </div>
    </section>
  );
}

function SuccessMetric({
  icon,
  label,
  value,
  mono
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-ur-sm border border-ur-success/20 bg-black/16 p-3">
      <div className="mb-2 text-ur-success">{icon}</div>
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-ur-success/64">{label}</p>
      <p className={mono ? "mt-1 font-mono text-sm font-bold text-white" : "mt-1 text-sm font-black text-white"}>
        {value}
      </p>
    </div>
  );
}
\n```\n
---

# 13. Acceptance Checklist

```text
The route /request-viewing/UR-LST-1001 works.
Google Fonts are loaded.
Inter is used for UI text.
JetBrains Mono is used for request ID.
UrbanRentisha dark green theme is applied.
Selected property summary is visible.
Required viewing fee is clearly shown.
Date selection works.
Time selection works.
Contact preference selection works.
Tenant note textarea works.
Terms checkbox controls submit availability.
Submit creates success state.
Success state displays request ID.
Next CTA routes to Stellar payment.
Access locked message is clear.
Payment-proof explanation is visible.
Mobile layout is stacked and readable.
All controls have focus states.
```

---

# 14. Final UX Summary

```text
The Request Viewing Screen is not a payment screen.
It creates the viewing request, explains the required viewing fee, and prepares the tenant for the Stellar payment and ZK proof flow.
The design must make the access rule clear: viewing details stay locked until proof verification succeeds.
```
