# UrbanRentisha TrustLayer Tenant Onboarding Page UI/UX Blueprint and Starter Code

## 1. Screen Covered

```text
3. Tenant Onboarding Page only
```

## 2. Page Purpose

The **Tenant Onboarding Page** explains how verified viewing works and why payment proof is required before access unlocks.

This page teaches tenants the trust sequence:

```text
Choose verified property
Request viewing
Pay through Stellar testnet
Generate private ZK payment proof
Verify proof status
Unlock viewing code
```

The page must make it clear that private viewing details are not released until proof verification succeeds.

---

## 3. Design Inspiration Rule

The provided MantleMandate design system is used only as structural inspiration for:

```text
Strict spacing
Dark technical SaaS feeling
Clear card hierarchy
Precise onboarding steps
Accessible interaction states
Focused trust messaging
```

Do not copy MantleMandate branding, logo, or blue palette.

UrbanRentisha must keep its own identity:

```text
Dark green trust UI
Eco-friendly real estate trust
ZK/Stellar verification
Tenant safety
Verified property access
Professional B2B SaaS clarity
```

---

## 4. UX Goal

The tenant should understand this within 10 seconds:

```text
Viewing access stays locked until the required payment condition is proven.
ZK protects privacy.
Stellar/Soroban supports verification.
The viewing code unlocks only after proof verification succeeds.
```

---

## 5. Final Folder Structure

```text
urbanrentisha-tenant-onboarding/
├── app/
│   ├── tenant/
│   │   └── onboarding/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── onboarding/
│   │   ├── access-unlock-rules.tsx
│   │   ├── demo-viewing-preview.tsx
│   │   ├── logo-mark.tsx
│   │   ├── onboarding-hero-card.tsx
│   │   ├── onboarding-progress.tsx
│   │   ├── payment-proof-explainer.tsx
│   │   ├── tenant-onboarding-page.tsx
│   │   ├── tenant-trust-checklist.tsx
│   │   └── verified-viewing-flow.tsx
│   │
│   └── ui/
│       ├── badge.tsx
│       └── button.tsx
│
├── lib/
│   ├── onboarding-data.ts
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
Header with UrbanRentisha logo
Left sticky panel:
  - page badge
  - large headline
  - explanation
  - onboarding progress list
  - next/back controls
  - progress bar

Right content:
  - active step hero card
  - verified viewing flow
  - payment proof explainer
  - access unlock rules
  - tenant safety checklist
  - demo viewing preview
```

Mobile:

```text
Logo at top
Single-column layout
Progress list first
Content cards stacked
CTA buttons full width
No sticky behavior
```

---

## 7. Interaction Rules

```text
Clicking a progress step changes the active explanation card.
Next button advances the onboarding step.
Previous button moves backward.
Progress bar updates automatically.
Active step card changes icon, title, and explanation.
CTA buttons route to listings and demo request.
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
JetBrains Mono = viewing codes, hashes, proof logic snippets only
```

Use JetBrains Mono for:

```text
VIEW-8K29XQ
accessStatus = proofStatus === "VERIFIED" ? "UNLOCKED" : "LOCKED"
```

---

## 10. Accessibility Requirements

```text
Progress step buttons must be keyboard focusable.
Buttons must have visible focus rings.
Color cannot be the only indicator of status.
Every card must have readable contrast.
Icons must support text, not replace it.
Viewing code must be readable and copyable in future implementation.
No private key or seed phrase language should appear.
```

---

## 11. Implementation Notes

This starter is UI-only.

Connect it later to:

```text
Tenant session
Onboarding completion flag
Listings route
Demo route
Payment request creation
Proof status tracker
Dashboard redirect
```

Recommended completion storage:

```text
tenant.onboardingCompleted = true
```

Recommended redirect after completion:

```text
/tenant/dashboard
```

---

# 12. Full Starter Code


## `package.json`

```json
{
  "name": "urbanrentisha-tenant-onboarding-page",
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
    autoprefixer: {},
  },
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
  title: "Tenant Onboarding | UrbanRentisha TrustLayer",
  description:
    "Learn how verified viewing, payment proof, and access unlock work on UrbanRentisha TrustLayer."
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
    @apply mx-auto w-full max-w-[1240px] px-5 sm:px-6 lg:px-8;
  }

  .ur-focus {
    @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ur-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ur-bg;
  }

  .onboarding-grid-bg {
    background-image:
      linear-gradient(rgba(22, 163, 74, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(22, 163, 74, 0.05) 1px, transparent 1px);
    background-size: 38px 38px;
  }
}

```

## `app/page.tsx`

```tsx
import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/tenant/onboarding");
}

```

## `app/tenant/onboarding/page.tsx`

```tsx
import { TenantOnboardingPage } from "@/components/onboarding/tenant-onboarding-page";

export default function Page() {
  return <TenantOnboardingPage />;
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

## `lib/onboarding-data.ts`

```ts
import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  Clock3,
  Eye,
  FileCheck2,
  Home,
  KeyRound,
  LockKeyhole,
  ReceiptText,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Wallet,
  Zap
} from "lucide-react";

export const onboardingSteps = [
  {
    id: "verified-property",
    title: "Choose a verified property",
    eyebrow: "Step 01",
    description:
      "Start with a property that has passed UrbanRentisha listing and agent checks.",
    icon: Home,
    outcome: "You avoid random or unverified listings."
  },
  {
    id: "request-viewing",
    title: "Request viewing access",
    eyebrow: "Step 02",
    description:
      "Create a viewing request linked to the tenant, property, agent, and viewing fee.",
    icon: Eye,
    outcome: "The request is tracked before any access is released."
  },
  {
    id: "stellar-payment",
    title: "Pay through Stellar testnet",
    eyebrow: "Step 03",
    description:
      "Complete the required viewing payment through the controlled Stellar testnet flow.",
    icon: Wallet,
    outcome: "Payment status becomes visible and auditable."
  },
  {
    id: "zk-proof",
    title: "Generate private payment proof",
    eyebrow: "Step 04",
    description:
      "A zero-knowledge proof confirms the payment condition without exposing unrelated wallet history.",
    icon: LockKeyhole,
    outcome: "Privacy is preserved while trust is proven."
  },
  {
    id: "unlock-access",
    title: "Unlock viewing details",
    eyebrow: "Step 05",
    description:
      "After proof verification succeeds, UrbanRentisha unlocks the viewing code and access details.",
    icon: KeyRound,
    outcome: "Access unlocks only when the trust condition is satisfied."
  }
] as const;

export const proofReasons = [
  {
    title: "Prevents fake receipts",
    description:
      "Viewing access does not depend on screenshots or manually forwarded payment claims.",
    icon: ReceiptText
  },
  {
    title: "Protects private wallet activity",
    description:
      "The proof confirms the payment condition without revealing unrelated transactions.",
    icon: ShieldCheck
  },
  {
    title: "Creates an audit trail",
    description:
      "Payment status, proof status, and access status can be reviewed later.",
    icon: FileCheck2
  }
];

export const tenantBenefits = [
  {
    label: "Verified property first",
    icon: BadgeCheck
  },
  {
    label: "No private key request",
    icon: ShieldAlert
  },
  {
    label: "Payment status tracked",
    icon: Clock3
  },
  {
    label: "ZK proof before access",
    icon: Sparkles
  },
  {
    label: "Viewing code unlocked safely",
    icon: KeyRound
  },
  {
    label: "Agent and listing trust improved",
    icon: Building2
  }
];

export const flowSummary = [
  {
    label: "Property",
    value: "Verified",
    icon: Home
  },
  {
    label: "Payment",
    value: "Stellar",
    icon: Zap
  },
  {
    label: "Proof",
    value: "ZK",
    icon: LockKeyhole
  },
  {
    label: "Access",
    value: "Unlocked",
    icon: CheckCircle2
  }
];

export type OnboardingStepId = (typeof onboardingSteps)[number]["id"];

```

## `components/ui/button.tsx`

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
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
    "border border-white/14 bg-transparent text-white hover:border-ur-primary/60 hover:bg-white/5"
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

```

## `components/onboarding/logo-mark.tsx`

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

## `components/onboarding/tenant-onboarding-page.tsx`

```tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { LogoMark } from "@/components/onboarding/logo-mark";
import { OnboardingProgress } from "@/components/onboarding/onboarding-progress";
import { OnboardingHeroCard } from "@/components/onboarding/onboarding-hero-card";
import { VerifiedViewingFlow } from "@/components/onboarding/verified-viewing-flow";
import { PaymentProofExplainer } from "@/components/onboarding/payment-proof-explainer";
import { AccessUnlockRules } from "@/components/onboarding/access-unlock-rules";
import { TenantTrustChecklist } from "@/components/onboarding/tenant-trust-checklist";
import { DemoViewingPreview } from "@/components/onboarding/demo-viewing-preview";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { onboardingSteps } from "@/lib/onboarding-data";

export function TenantOnboardingPage() {
  const [activeStep, setActiveStep] = useState(0);
  const completedCount = activeStep + 1;
  const progress = useMemo(
    () => Math.round((completedCount / onboardingSteps.length) * 100),
    [completedCount]
  );

  function handleNext() {
    setActiveStep((current) =>
      current < onboardingSteps.length - 1 ? current + 1 : current
    );
  }

  function handleBack() {
    setActiveStep((current) => (current > 0 ? current - 1 : current));
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 onboarding-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-mint/10 blur-[130px]" />

      <div className="relative z-10">
        <header className="ur-container flex h-20 items-center justify-between">
          <LogoMark />

          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href="/auth"
              className="rounded-ur-sm px-4 py-2 text-sm font-bold text-white/64 transition-colors hover:bg-white/5 hover:text-white ur-focus"
            >
              Switch account
            </Link>

            <Link
              href="/tenant/dashboard"
              className="inline-flex h-10 items-center justify-center rounded-ur-sm border border-white/14 px-4 text-sm font-bold text-white transition-colors hover:border-ur-primary/60 hover:bg-white/5 ur-focus"
            >
              Skip for now
            </Link>
          </div>
        </header>

        <section className="ur-container pb-12 pt-4">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
            <section className="lg:sticky lg:top-8 lg:self-start">
              <Badge variant="success">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Tenant onboarding
              </Badge>

              <h1 className="mt-6 max-w-[620px] text-[46px] font-black leading-[0.98] tracking-[-0.07em] text-white sm:text-[60px]">
                Learn how verified viewing works before access unlocks.
              </h1>

              <p className="mt-6 max-w-[560px] text-lg leading-8 text-white/66">
                UrbanRentisha keeps viewing access locked until the required
                payment condition is proven. This protects tenants from fake
                listings, fake agents, and unsafe viewing-fee requests.
              </p>

              <div className="mt-8">
                <OnboardingProgress
                  activeStep={activeStep}
                  progress={progress}
                  onStepChange={setActiveStep}
                />
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  onClick={handleNext}
                  disabled={activeStep === onboardingSteps.length - 1}
                >
                  Next step
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  Previous
                </Button>
              </div>

              <div className="mt-8 rounded-ur-lg border border-white/10 bg-white/[0.035] p-5 backdrop-blur-sm">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
                  Progress
                </p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full bg-ur-primary transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-3 text-sm text-white/58">
                  {completedCount} of {onboardingSteps.length} onboarding points reviewed.
                </p>
              </div>
            </section>

            <section className="space-y-5">
              <OnboardingHeroCard activeStep={activeStep} />
              <VerifiedViewingFlow activeStep={activeStep} onStepChange={setActiveStep} />
              <PaymentProofExplainer />
              <AccessUnlockRules />
              <TenantTrustChecklist />
              <DemoViewingPreview />
            </section>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-5 sm:flex-row">
            <div>
              <h2 className="text-lg font-black text-white">Ready to view verified listings?</h2>
              <p className="mt-1 text-sm text-white/58">
                Continue to the property list and request access through the verified flow.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/listings"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-ur-sm bg-ur-primary px-5 text-sm font-bold text-white transition-colors hover:bg-ur-primary-hover ur-focus"
              >
                Browse verified properties
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/demo"
                className="inline-flex h-11 items-center justify-center rounded-ur-sm border border-white/14 px-5 text-sm font-bold text-white transition-colors hover:border-ur-primary/60 hover:bg-white/5 ur-focus"
              >
                Try demo request
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

```

## `components/onboarding/onboarding-progress.tsx`

```tsx
"use client";

import { CheckCircle2 } from "lucide-react";
import { onboardingSteps } from "@/lib/onboarding-data";
import { cn } from "@/lib/utils";

type OnboardingProgressProps = {
  activeStep: number;
  progress: number;
  onStepChange: (step: number) => void;
};

export function OnboardingProgress({
  activeStep,
  progress,
  onStepChange
}: OnboardingProgressProps) {
  return (
    <div className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-sm font-black text-white">Verified viewing path</p>
        <span className="rounded-full border border-ur-primary/20 bg-ur-primary/10 px-3 py-1 text-xs font-bold text-ur-mint">
          {progress}% complete
        </span>
      </div>

      <div className="grid gap-2">
        {onboardingSteps.map((step, index) => {
          const Icon = step.icon;
          const isActive = activeStep === index;
          const isDone = activeStep > index;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onStepChange(index)}
              className={cn(
                "flex items-center gap-3 rounded-ur-sm border p-3 text-left transition-colors ur-focus",
                isActive
                  ? "border-ur-primary/70 bg-ur-primary/10"
                  : "border-white/10 bg-black/12 hover:border-white/20 hover:bg-white/5"
              )}
            >
              <div
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm",
                  isActive || isDone ? "bg-ur-primary text-white" : "bg-white/5 text-ur-muted"
                )}
              >
                {isDone ? <CheckCircle2 className="h-4.5 w-4.5" /> : <Icon className="h-4.5 w-4.5" />}
              </div>

              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/40">
                  {step.eyebrow}
                </p>
                <p className="mt-0.5 text-sm font-bold text-white">{step.title}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

```

## `components/onboarding/onboarding-hero-card.tsx`

```tsx
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { onboardingSteps } from "@/lib/onboarding-data";

type OnboardingHeroCardProps = {
  activeStep: number;
};

export function OnboardingHeroCard({ activeStep }: OnboardingHeroCardProps) {
  const step = onboardingSteps[activeStep];
  const Icon = step.icon;

  return (
    <article className="relative overflow-hidden rounded-ur-xl border border-ur-primary/25 bg-ur-primary/8 p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="absolute right-[-70px] top-[-90px] h-64 w-64 rounded-full bg-ur-primary/16 blur-[80px]" />

      <div className="relative">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-ur-lg bg-ur-primary text-white shadow-green-glow">
            <Icon className="h-7 w-7" />
          </div>

          <span className="rounded-full border border-ur-primary/20 bg-ur-success-bg px-3 py-1 text-xs font-bold text-ur-success">
            {step.eyebrow}
          </span>
        </div>

        <h2 className="text-3xl font-black tracking-[-0.05em] text-white">
          {step.title}
        </h2>

        <p className="mt-4 max-w-2xl text-base leading-7 text-white/68">
          {step.description}
        </p>

        <div className="mt-6 flex items-start gap-3 rounded-ur-lg border border-white/10 bg-black/18 p-4">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-ur-primary" />
          <div>
            <p className="text-sm font-black text-white">What this protects</p>
            <p className="mt-1 text-sm leading-6 text-white/58">{step.outcome}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 text-sm font-bold text-ur-mint">
          Continue through the verified flow
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </article>
  );
}

```

## `components/onboarding/verified-viewing-flow.tsx`

```tsx
"use client";

import { ArrowRight } from "lucide-react";
import { onboardingSteps } from "@/lib/onboarding-data";
import { cn } from "@/lib/utils";

type VerifiedViewingFlowProps = {
  activeStep: number;
  onStepChange: (step: number) => void;
};

export function VerifiedViewingFlow({
  activeStep,
  onStepChange
}: VerifiedViewingFlowProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
          Verified viewing flow
        </p>
        <h2 className="mt-2 text-xl font-black tracking-[-0.03em] text-white">
          Access stays locked until proof verification succeeds.
        </h2>
      </div>

      <div className="grid gap-3 lg:grid-cols-5">
        {onboardingSteps.map((step, index) => {
          const Icon = step.icon;
          const selected = activeStep === index;

          return (
            <div key={step.id} className="relative">
              <button
                type="button"
                onClick={() => onStepChange(index)}
                className={cn(
                  "h-full w-full rounded-ur-lg border p-4 text-left transition-all ur-focus",
                  selected
                    ? "border-ur-primary/75 bg-ur-primary/10 shadow-card-hover"
                    : "border-white/10 bg-black/12 hover:border-white/20 hover:bg-white/5"
                )}
              >
                <div
                  className={cn(
                    "mb-4 grid h-11 w-11 place-items-center rounded-ur",
                    selected ? "bg-ur-primary text-white" : "bg-white/5 text-ur-muted"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
                  {step.eyebrow}
                </p>
                <h3 className="mt-1 text-sm font-black leading-5 text-white">
                  {step.title}
                </h3>
              </button>

              {index < onboardingSteps.length - 1 ? (
                <ArrowRight className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-ur-primary lg:block" />
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

```

## `components/onboarding/payment-proof-explainer.tsx`

```tsx
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { proofReasons } from "@/lib/onboarding-data";

export function PaymentProofExplainer() {
  return (
    <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">
        <div className="grid h-12 w-12 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
          <LockKeyhole className="h-6 w-6" />
        </div>

        <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
          Why payment proof is required
        </p>

        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
          The platform must confirm the viewing payment condition before showing private access details.
        </h2>

        <p className="mt-4 text-sm leading-6 text-white/62">
          A payment proof protects the tenant and the platform. It confirms the
          required condition was met before releasing the viewing code, agent
          instructions, or private appointment details.
        </p>

        <div className="mt-5 rounded-ur-lg border border-ur-primary/20 bg-ur-success-bg p-4">
          <div className="flex gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-ur-success" />
            <div>
              <p className="text-sm font-black text-ur-success">Privacy rule</p>
              <p className="mt-1 text-sm leading-6 text-ur-success/78">
                Prove the payment condition. Do not expose unrelated wallet activity.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {proofReasons.map((reason) => {
          const Icon = reason.icon;

          return (
            <article key={reason.title} className="rounded-ur-lg border border-white/10 bg-black/16 p-5 transition-colors hover:bg-white/[0.045]">
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-black text-white">{reason.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/58">{reason.description}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

```

## `components/onboarding/access-unlock-rules.tsx`

```tsx
import { AlertTriangle, CheckCircle2, KeyRound, XCircle } from "lucide-react";

const unlockRules = [
  {
    title: "Access locked",
    description: "Viewing code remains hidden while payment or proof status is incomplete.",
    icon: XCircle,
    tone: "locked"
  },
  {
    title: "Proof verified",
    description: "Soroban verification or verified proof status confirms the payment condition.",
    icon: CheckCircle2,
    tone: "verified"
  },
  {
    title: "Code unlocked",
    description: "The tenant receives a viewing code only after the trust condition succeeds.",
    icon: KeyRound,
    tone: "unlocked"
  }
] as const;

export function AccessUnlockRules() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Access unlock rules
          </p>
          <h2 className="mt-2 text-xl font-black tracking-[-0.03em] text-white">
            No proof, no viewing code.
          </h2>
        </div>

        <div className="hidden rounded-full border border-ur-warning/25 bg-ur-warning-bg px-3 py-1 text-xs font-bold text-ur-warning sm:inline-flex">
          <AlertTriangle className="mr-1.5 h-3.5 w-3.5" />
          Anti-scam rule
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {unlockRules.map((rule) => {
          const Icon = rule.icon;

          return (
            <article key={rule.title} className="rounded-ur-lg border border-white/10 bg-black/16 p-5">
              <div className="grid h-11 w-11 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-black text-white">{rule.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/58">{rule.description}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-5 rounded-ur-lg border border-white/10 bg-black/18 p-4">
        <code className="font-mono text-xs leading-6 text-ur-mint">
          accessStatus = proofStatus === "VERIFIED" ? "UNLOCKED" : "LOCKED"
        </code>
      </div>
    </section>
  );
}

```

## `components/onboarding/tenant-trust-checklist.tsx`

```tsx
import { tenantBenefits } from "@/lib/onboarding-data";

export function TenantTrustChecklist() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Tenant safety checklist
      </p>

      <h2 className="mt-2 text-xl font-black tracking-[-0.03em] text-white">
        What the tenant should know before requesting a viewing.
      </h2>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tenantBenefits.map((benefit) => {
          const Icon = benefit.icon;

          return (
            <div key={benefit.label} className="flex items-center gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
                <Icon className="h-4.5 w-4.5" />
              </div>
              <p className="text-sm font-bold text-white/78">{benefit.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

```

## `components/onboarding/demo-viewing-preview.tsx`

```tsx
import { CheckCircle2, Copy, KeyRound } from "lucide-react";
import { flowSummary } from "@/lib/onboarding-data";
import { Button } from "@/components/ui/button";

export function DemoViewingPreview() {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-5 backdrop-blur-xl">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Demo outcome preview
          </p>

          <h2 className="mt-2 text-xl font-black tracking-[-0.03em] text-white">
            This is what successful access unlock looks like.
          </h2>
        </div>

        <Button variant="outline">
          Copy demo code
          <Copy className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-4">
        {flowSummary.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="rounded-ur-lg border border-white/10 bg-black/18 p-4">
              <div className="mb-4 flex items-center justify-between">
                <Icon className="h-5 w-5 text-ur-primary" />
                <CheckCircle2 className="h-4 w-4 text-ur-success" />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/40">
                {item.label}
              </p>
              <p className="mt-1 text-lg font-black text-white">{item.value}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-ur-lg border border-ur-primary/20 bg-black/20 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-ur bg-ur-primary text-white">
              <KeyRound className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-black text-white">Viewing code</p>
              <p className="text-xs text-white/48">Unlocked after proof verification</p>
            </div>
          </div>

          <code className="w-fit rounded-ur-sm border border-ur-primary/20 bg-ur-success-bg px-4 py-2 font-mono text-sm font-bold text-ur-success">
            VIEW-8K29XQ
          </code>
        </div>
      </div>
    </section>
  );
}

```

---

# 13. Acceptance Checklist

Before approving this page, confirm:

```text
The route /tenant/onboarding works.
Google Fonts are loaded.
Inter is used for UI text.
JetBrains Mono is used for code/viewing code snippets.
The page uses UrbanRentisha dark green theme.
The progress stepper is clickable.
Next and Previous buttons work.
Progress bar updates.
Verified viewing flow is clear.
Payment proof explanation is clear.
Access unlock rule is explicit.
Viewing code preview is shown.
CTA to browse verified properties exists.
CTA to try demo request exists.
Mobile layout is stacked and readable.
No seed phrase or private key request appears.
```

---

# 14. Final UX Summary

The Tenant Onboarding Page should communicate one clear idea:

```text
UrbanRentisha does not unlock viewing access just because someone claims to have paid.
The tenant follows a verified flow.
Payment is tracked through Stellar.
A ZK proof protects privacy.
Access unlocks only after verification succeeds.
```
