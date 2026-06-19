# UrbanRentisha TrustLayer Signup / Login Page UI/UX Blueprint and Starter Code

## 1. Screen Covered

```text
2. Signup / Login Page only
```

## 2. Purpose

This document defines the full UI/UX blueprint and starter implementation for the **UrbanRentisha TrustLayer Signup / Login Page**.

This screen allows:

```text
Demo login
Email login
Signup account creation
Wallet-based access
```

It is designed as a blueprint for AI/developer implementation so the exact UI, spacing, behavior, hierarchy, and interactions remain consistent.

---

## 3. Design Inspiration Rule

The provided MantleMandate design system is used only as structural inspiration for:

```text
Strict spacing
Technical trust tone
Dark SaaS layout
Clear cards
Precise button hierarchy
Accessible inputs
Status notices
```

Do not copy MantleMandate branding or blue palette.

UrbanRentisha must keep its own identity:

```text
Dark green trust UI
Eco-friendly real estate trust
Stellar-ready security layer
Privacy-preserving access
Professional B2B SaaS credibility
```

---

## 4. UX Goal

The user must understand three access paths immediately:

```text
1. Demo login for judges and fast testing
2. Email login/signup for standard account access
3. Wallet-based access for Stellar payment and proof flows
```

The page must feel secure, simple, and trustworthy.

---

## 5. Final Folder Structure

```text
urbanrentisha-auth-page/
├── app/
│   ├── auth/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── auth/
│   │   ├── auth-card.tsx
│   │   ├── auth-page.tsx
│   │   ├── auth-side-panel.tsx
│   │   ├── auth-tabs.tsx
│   │   ├── demo-login-panel.tsx
│   │   ├── divider.tsx
│   │   ├── email-auth-form.tsx
│   │   ├── logo-mark.tsx
│   │   ├── password-input.tsx
│   │   ├── role-selector.tsx
│   │   ├── status-notice.tsx
│   │   └── wallet-login-panel.tsx
│   │
│   └── ui/
│       ├── badge.tsx
│       ├── button.tsx
│       └── input.tsx
│
├── lib/
│   ├── auth-data.ts
│   └── utils.ts
│
├── next.config.ts
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 6. Visual Layout

Desktop layout:

```text
Left side:
Trust explanation panel
Security checklist
Privacy/ZK/Stellar explanation

Right side:
Signup/Login card
Tabs
Demo login panel
Email form
Wallet access panel
```

Mobile layout:

```text
Logo
Auth card only
Side explanation hidden
All panels stacked
Buttons full width
```

---

## 7. Interaction Rules

```text
Login / Sign up tabs switch card copy and email form fields.
Demo role selector behaves like a radio group.
Demo login button shows temporary loading state.
Password input supports show/hide.
Email form displays a success notice after submit.
Wallet connect button shows temporary connecting state.
All buttons and inputs have focus states.
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
Error: #EF4444
Success: #22C55E
Text: #F8FAFC
Muted: #94A3B8
Subtle: #64748B
```

---

## 9. Typography

Google Fonts are mandatory.

```text
Inter: all UI text
JetBrains Mono: technical values only
```

Use Inter for:

```text
Headings
Labels
Buttons
Descriptions
Navigation
Form text
```

Use JetBrains Mono only for:

```text
Wallet addresses
Viewing codes
Transaction hashes
API keys
```

---

## 10. Accessibility Requirements

```text
All inputs must have labels.
Password visibility toggle must have aria-label.
Tabs must expose selected state.
Role selector must behave as radiogroup/radio.
Color must not be the only status indicator.
All focusable elements must have visible focus rings.
Minimum mobile touch target should be 44px.
Do not ask for wallet seed phrase or private key.
```

---

## 11. Implementation Notes

This starter is UI-only.

Connect actions later to:

```text
Supabase Auth
NestJS auth API
Demo login endpoint
Stellar wallet connector
Session management
RBAC redirect system
```

Recommended redirects after login:

```text
Tenant -> /tenant/dashboard
Property Manager -> /manager/dashboard
Admin -> /admin/dashboard
```

---

# 12. Full Starter Code


## `package.json`

```json
{
  "name": "urbanrentisha-auth-page",
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
        "soft-dark": "0 24px 80px rgba(0, 0, 0, 0.35)"
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
  title: "Login | UrbanRentisha TrustLayer",
  description: "Access UrbanRentisha TrustLayer through demo login, email login, or wallet-based access."
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
    @apply mx-auto w-full max-w-[1180px] px-5 sm:px-6 lg:px-8;
  }

  .ur-focus {
    @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ur-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ur-bg;
  }

  .auth-grid-bg {
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
  redirect("/auth");
}

```

## `app/auth/page.tsx`

```tsx
import { AuthPage } from "@/components/auth/auth-page";

export default function Page() {
  return <AuthPage />;
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

## `lib/auth-data.ts`

```ts
import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  Clock3,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  UserRound,
  Wallet
} from "lucide-react";

export const demoRoles = [
  {
    id: "tenant",
    label: "Tenant",
    email: "demo-tenant@urbanrentisha.app",
    description: "Request viewing, prove payment, unlock access.",
    icon: UserRound
  },
  {
    id: "manager",
    label: "Property Manager",
    email: "demo-manager@urbanrentisha.app",
    description: "Manage listings, requests, codes, and reports.",
    icon: Building2
  },
  {
    id: "admin",
    label: "Admin",
    email: "demo-admin@urbanrentisha.app",
    description: "Review agents, proofs, reports, and audit logs.",
    icon: ShieldCheck
  }
] as const;

export const trustItems = [
  {
    title: "Private proof",
    description: "Payment condition can be proven without exposing full wallet activity.",
    icon: LockKeyhole
  },
  {
    title: "Stellar-ready",
    description: "Prepared for Stellar testnet payment and Soroban verification flows.",
    icon: Sparkles
  },
  {
    title: "Access control",
    description: "Viewing details unlock after proof verification succeeds.",
    icon: KeyRound
  }
];

export const securityChecks = [
  {
    label: "No seed phrase required",
    icon: ShieldCheck
  },
  {
    label: "Demo mode available",
    icon: BadgeCheck
  },
  {
    label: "Proof status tracked",
    icon: Clock3
  },
  {
    label: "Wallet access supported",
    icon: Wallet
  },
  {
    label: "Audit-ready events",
    icon: CheckCircle2
  }
];

export type DemoRoleId = (typeof demoRoles)[number]["id"];

```

## `components/ui/button.tsx`

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger";
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
  danger:
    "border border-ur-error bg-ur-error text-white hover:bg-red-600"
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

## `components/ui/input.tsx`

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  helperText?: string;
  error?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, helperText, error, id, ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <div className="space-y-2">
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold tracking-[0.04em] text-white/78"
        >
          {label}
        </label>

        <input
          id={inputId}
          ref={ref}
          className={cn(
            "h-11 w-full rounded-ur-sm border border-white/12 bg-ur-input px-3 text-sm text-white outline-none transition-colors placeholder:text-white/32 focus:border-ur-primary",
            error && "border-ur-error focus:border-ur-error",
            className
          )}
          {...props}
        />

        {error ? (
          <p className="text-xs font-medium text-ur-error">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-ur-subtle">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

```

## `components/auth/logo-mark.tsx`

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

## `components/auth/auth-page.tsx`

```tsx
"use client";

import { useState } from "react";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthSidePanel } from "@/components/auth/auth-side-panel";
import { LogoMark } from "@/components/auth/logo-mark";

export type AuthMode = "login" | "signup";

export function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login");

  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 auth-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-mint/10 blur-[130px]" />

      <div className="relative z-10">
        <header className="ur-container flex h-20 items-center justify-between">
          <LogoMark />

          <a
            href="/"
            className="hidden rounded-ur-sm border border-white/14 px-4 py-2 text-sm font-bold text-white/80 transition-colors hover:border-ur-primary/60 hover:bg-white/5 hover:text-white ur-focus sm:inline-flex"
          >
            Back to home
          </a>
        </header>

        <section className="ur-container grid min-h-[calc(100vh-80px)] items-center gap-8 pb-12 pt-4 lg:grid-cols-[1.02fr_0.98fr]">
          <AuthSidePanel />
          <AuthCard mode={mode} onModeChange={setMode} />
        </section>
      </div>
    </main>
  );
}

```

## `components/auth/auth-card.tsx`

```tsx
"use client";

import type { AuthMode } from "@/components/auth/auth-page";
import { AuthTabs } from "@/components/auth/auth-tabs";
import { DemoLoginPanel } from "@/components/auth/demo-login-panel";
import { Divider } from "@/components/auth/divider";
import { EmailAuthForm } from "@/components/auth/email-auth-form";
import { WalletLoginPanel } from "@/components/auth/wallet-login-panel";

type AuthCardProps = {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
};

export function AuthCard({ mode, onModeChange }: AuthCardProps) {
  return (
    <section
      className="mx-auto w-full max-w-[500px] rounded-ur-xl border border-white/10 bg-white/[0.045] p-5 shadow-soft-dark backdrop-blur-xl sm:p-6 lg:ml-auto"
      aria-labelledby="auth-title"
    >
      <div className="mb-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
          Secure access
        </p>
        <h1 id="auth-title" className="text-3xl font-black tracking-[-0.05em] text-white sm:text-4xl">
          {mode === "login" ? "Welcome back." : "Create your account."}
        </h1>
        <p className="mt-3 text-sm leading-6 text-white/66">
          {mode === "login"
            ? "Sign in with demo access, email, or wallet to continue the trust flow."
            : "Start with email access or connect a wallet for Stellar-based verification later."}
        </p>
      </div>

      <AuthTabs mode={mode} onModeChange={onModeChange} />
      <DemoLoginPanel />
      <Divider label="or continue with email" />
      <EmailAuthForm mode={mode} />
      <Divider label="or use wallet access" />
      <WalletLoginPanel />

      <p className="mt-6 text-center text-xs leading-5 text-white/45">
        By continuing, you agree to the UrbanRentisha demo terms and privacy-first access rules.
      </p>
    </section>
  );
}

```

## `components/auth/auth-tabs.tsx`

```tsx
"use client";

import type { AuthMode } from "@/components/auth/auth-page";
import { cn } from "@/lib/utils";

type AuthTabsProps = {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
};

export function AuthTabs({ mode, onModeChange }: AuthTabsProps) {
  return (
    <div className="mb-5 grid grid-cols-2 rounded-ur-sm border border-white/10 bg-black/18 p-1">
      {(["login", "signup"] as const).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onModeChange(item)}
          className={cn(
            "h-10 rounded-[7px] text-sm font-bold transition-colors ur-focus",
            mode === item
              ? "bg-ur-primary text-white shadow-green-glow"
              : "text-white/58 hover:bg-white/5 hover:text-white"
          )}
          aria-pressed={mode === item}
        >
          {item === "login" ? "Login" : "Sign up"}
        </button>
      ))}
    </div>
  );
}

```

## `components/auth/demo-login-panel.tsx`

```tsx
"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { demoRoles, type DemoRoleId } from "@/lib/auth-data";
import { Button } from "@/components/ui/button";
import { RoleSelector } from "@/components/auth/role-selector";
import { StatusNotice } from "@/components/auth/status-notice";

export function DemoLoginPanel() {
  const [selectedRole, setSelectedRole] = useState<DemoRoleId>("tenant");
  const [isLoading, setIsLoading] = useState(false);
  const selected = demoRoles.find((role) => role.id === selectedRole) ?? demoRoles[0];

  function handleDemoLogin() {
    setIsLoading(true);
    window.setTimeout(() => setIsLoading(false), 900);
  }

  return (
    <div className="rounded-ur-lg border border-ur-primary/20 bg-ur-primary/8 p-4">
      <div className="mb-4 flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-ur bg-ur-primary/12 text-ur-primary">
          <CheckCircle2 className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-base font-black tracking-[-0.02em] text-white">
            Fast demo login
          </h2>
          <p className="mt-1 text-sm leading-5 text-white/58">
            Best path for judges and quick testing. Choose a demo role and continue.
          </p>
        </div>
      </div>

      <RoleSelector value={selectedRole} onChange={setSelectedRole} />

      <Button
        className="mt-4 w-full"
        size="lg"
        onClick={handleDemoLogin}
        disabled={isLoading}
      >
        {isLoading ? "Opening demo workspace..." : `Continue as ${selected.label}`}
        {!isLoading ? <ArrowRight className="h-4 w-4" /> : null}
      </Button>

      <StatusNotice
        className="mt-4"
        tone="success"
        title="Demo account"
        description={selected.email}
      />
    </div>
  );
}

```

## `components/auth/role-selector.tsx`

```tsx
"use client";

import { demoRoles, type DemoRoleId } from "@/lib/auth-data";
import { cn } from "@/lib/utils";

type RoleSelectorProps = {
  value: DemoRoleId;
  onChange: (role: DemoRoleId) => void;
};

export function RoleSelector({ value, onChange }: RoleSelectorProps) {
  return (
    <div className="grid gap-2" role="radiogroup" aria-label="Choose demo role">
      {demoRoles.map((role) => {
        const Icon = role.icon;
        const selected = value === role.id;

        return (
          <button
            key={role.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(role.id)}
            className={cn(
              "flex items-center gap-3 rounded-ur-sm border p-3 text-left transition-colors ur-focus",
              selected
                ? "border-ur-primary/70 bg-ur-primary/10"
                : "border-white/10 bg-black/12 hover:border-white/20 hover:bg-white/5"
            )}
          >
            <div
              className={cn(
                "grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm",
                selected ? "bg-ur-primary text-white" : "bg-white/5 text-ur-muted"
              )}
            >
              <Icon className="h-4.5 w-4.5" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-bold text-white">{role.label}</p>
              <p className="mt-0.5 text-xs leading-4 text-white/52">
                {role.description}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

```

## `components/auth/email-auth-form.tsx`

```tsx
"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import type { AuthMode } from "@/components/auth/auth-page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/auth/password-input";
import { StatusNotice } from "@/components/auth/status-notice";

type EmailAuthFormProps = {
  mode: AuthMode;
};

export function EmailAuthForm({ mode }: EmailAuthFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sent");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === "signup" ? (
        <Input
          label="Full name"
          name="fullName"
          type="text"
          placeholder="Enter your full name"
          autoComplete="name"
        />
      ) : null}

      <Input
        label="Email address"
        name="email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        helperText={mode === "signup" ? "Use an email you can access during the demo." : undefined}
      />

      <PasswordInput
        label="Password"
        name="password"
        placeholder={mode === "signup" ? "Create a secure password" : "Enter your password"}
        autoComplete={mode === "signup" ? "new-password" : "current-password"}
      />

      <div className="flex items-center justify-between gap-4">
        <label className="flex items-center gap-2 text-xs text-white/56">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-white/20 bg-ur-input accent-ur-primary"
          />
          Remember this device
        </label>

        {mode === "login" ? (
          <a href="/forgot-password" className="text-xs font-bold text-ur-mint hover:text-white ur-focus rounded-ur-sm">
            Forgot password?
          </a>
        ) : null}
      </div>

      <Button type="submit" className="w-full" size="lg">
        <Mail className="h-4 w-4" />
        {mode === "login" ? "Login with email" : "Create account"}
      </Button>

      {status === "sent" ? (
        <StatusNotice
          tone="success"
          title={mode === "login" ? "Email login submitted" : "Signup submitted"}
          description="Connect this action to Supabase Auth or your NestJS auth endpoint."
        />
      ) : null}
    </form>
  );
}

```

## `components/auth/password-input.tsx`

```tsx
"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function PasswordInput({ label, id, name, className, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const inputId = id ?? name;

  return (
    <div className="space-y-2">
      <label
        htmlFor={inputId}
        className="block text-xs font-semibold tracking-[0.04em] text-white/78"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={inputId}
          name={name}
          type={visible ? "text" : "password"}
          className={cn(
            "h-11 w-full rounded-ur-sm border border-white/12 bg-ur-input px-3 pr-11 text-sm text-white outline-none transition-colors placeholder:text-white/32 focus:border-ur-primary",
            className
          )}
          {...props}
        />

        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="absolute right-1.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-ur-sm text-white/45 transition-colors hover:bg-white/5 hover:text-white ur-focus"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

```

## `components/auth/wallet-login-panel.tsx`

```tsx
"use client";

import { useState } from "react";
import { ExternalLink, ShieldAlert, Wallet, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusNotice } from "@/components/auth/status-notice";

export function WalletLoginPanel() {
  const [status, setStatus] = useState<"idle" | "connecting">("idle");

  function connectWallet() {
    setStatus("connecting");
    window.setTimeout(() => setStatus("idle"), 1100);
  }

  return (
    <div className="rounded-ur-lg border border-white/10 bg-black/14 p-4">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-ur bg-white/5 text-ur-mint">
          <Wallet className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-base font-black tracking-[-0.02em] text-white">
            Wallet-based access
          </h2>
          <p className="mt-1 text-sm leading-5 text-white/58">
            Connect a Stellar-compatible wallet for payment and proof flows.
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Button variant="outline" onClick={connectWallet} disabled={status === "connecting"}>
          <Zap className="h-4 w-4" />
          {status === "connecting" ? "Connecting..." : "Connect wallet"}
        </Button>

        <Button variant="secondary">
          Wallet guide
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>

      <StatusNotice
        className="mt-4"
        tone="warning"
        title="Security rule"
        description="Never enter seed phrases or private keys. This screen should only request safe wallet connection."
        icon={<ShieldAlert className="h-4 w-4" />}
      />
    </div>
  );
}

```

## `components/auth/auth-side-panel.tsx`

```tsx
import { CheckCircle2, LockKeyhole, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { securityChecks, trustItems } from "@/lib/auth-data";

export function AuthSidePanel() {
  return (
    <aside className="hidden lg:block">
      <div className="max-w-[560px]">
        <Badge variant="success">
          <ShieldCheck className="h-3.5 w-3.5" />
          Private rental access
        </Badge>

        <h2 className="mt-6 text-[56px] font-black leading-[0.96] tracking-[-0.07em] text-white">
          Access verified rentals without exposing more than needed.
        </h2>

        <p className="mt-6 max-w-[500px] text-lg leading-8 text-white/66">
          Login with demo access, email, or wallet. UrbanRentisha keeps the
          product flow clear: request viewing, prove payment, verify status,
          and unlock access.
        </p>

        <div className="mt-8 grid gap-4">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-ur-lg border border-white/10 bg-white/[0.035] p-5 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-white/56">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-ur-lg border border-ur-primary/20 bg-ur-primary/8 p-5">
          <div className="mb-4 flex items-center gap-2">
            <LockKeyhole className="h-5 w-5 text-ur-primary" />
            <p className="font-black text-white">Security checklist</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {securityChecks.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-2 text-sm text-white/70">
                  <Icon className="h-4 w-4 text-ur-primary" />
                  {item.label}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3 text-sm text-white/48">
          <CheckCircle2 className="h-4 w-4 text-ur-primary" />
          Built for demo readiness, Supabase/Auth integration, and future Stellar wallet access.
        </div>
      </div>
    </aside>
  );
}

```

## `components/auth/divider.tsx`

```tsx
type DividerProps = {
  label: string;
};

export function Divider({ label }: DividerProps) {
  return (
    <div className="my-5 flex items-center gap-3">
      <div className="h-px flex-1 bg-white/10" />
      <span className="text-xs font-semibold text-white/38">{label}</span>
      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}

```

## `components/auth/status-notice.tsx`

```tsx
import { CheckCircle2, Info, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type StatusNoticeTone = "success" | "warning" | "info";

type StatusNoticeProps = {
  tone?: StatusNoticeTone;
  title: string;
  description: string;
  className?: string;
  icon?: React.ReactNode;
};

const toneStyles: Record<StatusNoticeTone, string> = {
  success: "border-ur-success/20 bg-ur-success-bg text-ur-success",
  warning: "border-ur-warning/25 bg-ur-warning-bg text-ur-warning",
  info: "border-ur-cyan/20 bg-ur-cyan/8 text-ur-cyan"
};

const defaultIcons: Record<StatusNoticeTone, React.ReactNode> = {
  success: <CheckCircle2 className="h-4 w-4" />,
  warning: <TriangleAlert className="h-4 w-4" />,
  info: <Info className="h-4 w-4" />
};

export function StatusNotice({
  tone = "info",
  title,
  description,
  className,
  icon
}: StatusNoticeProps) {
  return (
    <div className={cn("rounded-ur-sm border p-3", toneStyles[tone], className)}>
      <div className="flex gap-3">
        <div className="mt-0.5 shrink-0">{icon ?? defaultIcons[tone]}</div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.12em]">{title}</p>
          <p className="mt-1 text-xs leading-5 opacity-80">{description}</p>
        </div>
      </div>
    </div>
  );
}

```

---

# 13. Acceptance Checklist

Before approving the screen, confirm:

```text
The route /auth opens the Signup/Login page.
Google Fonts load correctly.
Inter is used for UI text.
JetBrains Mono is available for technical text.
The dark green UrbanRentisha theme is applied.
Demo login panel appears first.
Email login/signup form appears second.
Wallet access panel appears third.
Role selector is accessible.
Password visibility toggle works.
Email form success notice appears.
Wallet connect loading state appears.
Side panel is visible on desktop.
Side panel is hidden on mobile.
All buttons have hover and focus states.
No seed phrase or private key is requested.
```

---

# 14. Final Summary

The Signup / Login Page should communicate:

```text
UrbanRentisha is secure.
Demo mode is fast.
Email login is familiar.
Wallet access is available.
No sensitive wallet secrets are requested.
The product is ready for Stellar payment and ZK proof flows.
```
