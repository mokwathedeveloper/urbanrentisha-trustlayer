# UrbanRentisha TrustLayer Fake Listing Report Screen UI/UX Blueprint and Starter Code

## 1. Screen Covered

```text
14. Fake Listing Report Screen only
```

## 2. Page Purpose

The **Fake Listing Report Screen** allows tenants to report suspicious listings or agents.

This screen helps tenants:

```text
Report fake or suspicious listings
Report suspicious agents
Report off-platform payment pressure
Report unsafe viewing conditions
Attach evidence
Choose severity
Choose private or named reporting
Understand what happens after submission
Track the submitted report reference
```

---

## 3. Design Inspiration Rule

The provided MantleMandate design system is used only as structural inspiration for:

```text
Strict spacing
Dark SaaS interface
Clear form hierarchy
Accessible controls
Precise cards
Minimal motion
Technical trust tone
Strong safety states
```

Do not copy MantleMandate branding, logo, or blue palette.

UrbanRentisha must keep its own identity:

```text
Dark green trust UI
Eco-friendly real estate trust
Verified property access
Tenant safety
Rental scam prevention
Suspicious listing reporting
Professional B2B SaaS clarity
```

---

## 4. UX Goal

The tenant should understand this immediately:

```text
This is a safe place to report suspicious listings or agents.
The tenant should not send off-platform money.
The report is reviewed by the safety team.
Submission starts a safety review; it does not automatically prove fraud.
```

---

## 5. Report Categories

Use these exact report type categories:

```text
Suspicious listing
Suspicious agent
Payment concern
Access issue
Other safety issue
```

Suspicious signals:

```text
Photos look fake or stolen
Location does not match
Agent is pressuring payment
Extra payment requested
Agent identity mismatch
Unsafe viewing condition
```

Severity options:

```text
Low
Medium
High
Urgent
```

Reporter privacy options:

```text
Report privately
Report with my account
```

---

## 6. Final Folder Structure

```text
urbanrentisha-fake-listing-report/
├── app/
│   ├── report-listing/
│   │   └── [listingId]/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── fake-listing-report/
│   │   ├── agent-safety-card.tsx
│   │   ├── evidence-upload-card.tsx
│   │   ├── fake-listing-report-page.tsx
│   │   ├── logo-mark.tsx
│   │   ├── property-under-review-card.tsx
│   │   ├── report-details-form-card.tsx
│   │   ├── report-header.tsx
│   │   ├── report-quality-tips-card.tsx
│   │   ├── report-reason-grid.tsx
│   │   ├── report-summary-card.tsx
│   │   ├── report-type-selector.tsx
│   │   ├── reporter-privacy-card.tsx
│   │   ├── review-process-card.tsx
│   │   ├── safety-guidelines-card.tsx
│   │   ├── safety-warning-banner.tsx
│   │   └── submission-success-card.tsx
│   │
│   └── ui/
│       ├── badge.tsx
│       └── button.tsx
│
├── lib/
│   ├── report-data.ts
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
Back-to-property-detail link
Page title and safety badges
Safety warning banner
Submission success card after submit
Main two-column layout:
  Left:
    - report type selector
    - suspicious reason grid
    - description and severity form
    - evidence upload UI
    - reporter privacy selector
    - submit/cancel action bar
  Right sticky:
    - listing being reported
    - agent profile
    - live report summary
    - review process
    - tenant safety guidance
    - strong report tips
```

Mobile:

```text
Header
Back link
Title
Safety warning
Report type selector
Reason grid
Report details
Evidence
Privacy
Submit
Listing summary
Agent card
Review process
Safety guidance
Tips
```

---

## 8. Interaction Rules

```text
Report type selector updates selected report type.
Reason cards can be selected and deselected.
At least one reason must be selected.
Description must be at least 10 characters before submit.
Severity cards update severity.
Contact-back toggle updates contact preference.
Privacy selector updates private/named reporting mode.
Submit shows success card with report reference and report hash.
Cancel returns to property detail.
Evidence upload is UI-ready for future file upload integration.
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
JetBrains Mono = listing ID, report reference, report hash, phone number, payment/reference values
```

Use JetBrains Mono for:

```text
UR-LST-1001
RPT-UR-3310
rpt_0x3c9d12ef7b4a6c8d91e402f77a12c6f8
+254 700 000 000
KES 500
```

---

## 11. Accessibility Requirements

```text
All selectable cards must be keyboard focusable.
Report type state must use visible card state plus text.
Reason selection must not rely on color only.
Urgent severity must use text, icon, and red state.
Textarea must have a visible label.
Toggle must include aria-pressed and accessible label.
Submit button must be disabled until minimum data is provided.
Evidence upload area must describe accepted file types.
All buttons must have visible focus states.
Minimum mobile touch target should be 44px.
```

---

## 12. Implementation Notes

This starter is UI-only.

Connect it later to:

```text
Report submission API
File upload API
Listing safety API
Agent verification API
Notification API
Admin review queue
Audit log service
```

Recommended API endpoints:

```text
POST /api/v1/reports
POST /api/v1/reports/:reportId/evidence
GET /api/v1/reports/:reportId
GET /api/v1/listings/:listingId/safety-context
PATCH /api/v1/admin/reports/:reportId/status
```

Recommended route:

```text
/report-listing/UR-LST-1001
```

---

# 13. Full Starter Code

\n## `package.json`\n\n```json\n{
  "name": "urbanrentisha-fake-listing-report-screen",
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
        "danger-glow": "0 0 60px rgba(239, 68, 68, 0.16)"
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
  title: "Report Suspicious Listing | UrbanRentisha TrustLayer",
  description:
    "Report suspicious rental listings or agents to help protect tenants."
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

  .report-grid-bg {
    background-image:
      linear-gradient(rgba(22, 163, 74, 0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(22, 163, 74, 0.045) 1px, transparent 1px);
    background-size: 38px 38px;
  }

  .report-textarea {
    min-height: 152px;
    resize: vertical;
  }
}
\n```\n\n## `app/page.tsx`\n\n```tsx\nimport { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/report-listing/UR-LST-1001");
}
\n```\n\n## `app/report-listing/[listingId]/page.tsx`\n\n```tsx\nimport { FakeListingReportPage } from "@/components/fake-listing-report/fake-listing-report-page";

type PageProps = {
  params: {
    listingId: string;
  };
};

export default function Page({ params }: PageProps) {
  return <FakeListingReportPage listingId={params.listingId} />;
}
\n```\n\n## `lib/utils.ts`\n\n```ts\nimport { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
\n```\n\n## `lib/report-data.ts`\n\n```ts\nimport {
  AlertTriangle,
  BadgeCheck,
  Banknote,
  Building2,
  CalendarClock,
  Camera,
  CheckCircle2,
  Clock3,
  Database,
  EyeOff,
  FileText,
  Flag,
  Home,
  ImagePlus,
  KeyRound,
  LockKeyhole,
  MailWarning,
  MapPin,
  MessageSquareWarning,
  PhoneCall,
  ReceiptText,
  ShieldAlert,
  ShieldCheck,
  Siren,
  UploadCloud,
  UserRound,
  WalletCards,
  XCircle
} from "lucide-react";

export type ReportType = "listing" | "agent" | "payment" | "access" | "other";
export type ReportSeverity = "low" | "medium" | "high" | "urgent";
export type ReporterMode = "named" | "private";

export type ListingReportTarget = {
  listingId: string;
  listingTitle: string;
  location: string;
  monthlyRentKes: number;
  viewingFeeKes: number;
  verificationStatus: "Verified" | "Review needed";
  agentName: string;
  agentCompany: string;
  agentPhone: string;
  agentStatus: "Verified agent";
  propertyType: string;
  postedAt: string;
};

export const reportTarget: ListingReportTarget = {
  listingId: "UR-LST-1001",
  listingTitle: "Kilimani Green View Apartment",
  location: "Kilimani, Nairobi",
  monthlyRentKes: 85000,
  viewingFeeKes: 500,
  verificationStatus: "Verified",
  agentName: "Amina Njoroge",
  agentCompany: "Amina Realty Group",
  agentPhone: "+254 700 000 000",
  agentStatus: "Verified agent",
  propertyType: "2 Bedroom Apartment",
  postedAt: "12 Jun 2026"
};

export const reportTypes = [
  {
    value: "listing",
    label: "Suspicious listing",
    description: "Wrong photos, fake address, copied listing, or misleading details.",
    icon: Home
  },
  {
    value: "agent",
    label: "Suspicious agent",
    description: "Agent identity, contact, behaviour, or verification concern.",
    icon: UserRound
  },
  {
    value: "payment",
    label: "Payment concern",
    description: "Extra off-platform fee, cash demand, or suspicious payment request.",
    icon: WalletCards
  },
  {
    value: "access",
    label: "Access issue",
    description: "Viewing code rejected, wrong access point, or unsafe viewing condition.",
    icon: KeyRound
  },
  {
    value: "other",
    label: "Other safety issue",
    description: "Any other concern that could affect tenant safety or trust.",
    icon: ShieldAlert
  }
] as const;

export const reportReasons = [
  {
    id: "fake-photos",
    title: "Photos look fake or stolen",
    description: "Images appear copied, inconsistent, or unrelated to the property.",
    icon: Camera
  },
  {
    id: "wrong-location",
    title: "Location does not match",
    description: "Address, map pin, or viewing location does not match the listing.",
    icon: MapPin
  },
  {
    id: "agent-pressure",
    title: "Agent is pressuring payment",
    description: "Agent asks for fast payment, cash, or off-platform transfer.",
    icon: MessageSquareWarning
  },
  {
    id: "extra-payment",
    title: "Extra payment requested",
    description: "Someone asked for a fee outside the verified UrbanRentisha flow.",
    icon: Banknote
  },
  {
    id: "identity-mismatch",
    title: "Agent identity mismatch",
    description: "The person contacting you does not match the verified agent profile.",
    icon: BadgeCheck
  },
  {
    id: "unsafe-viewing",
    title: "Unsafe viewing condition",
    description: "Viewing location, timing, or access instruction feels unsafe.",
    icon: Siren
  }
];

export const severityOptions = [
  {
    value: "low",
    label: "Low",
    description: "Minor inconsistency or unclear information.",
    icon: FileText
  },
  {
    value: "medium",
    label: "Medium",
    description: "Potentially misleading listing or agent behaviour.",
    icon: AlertTriangle
  },
  {
    value: "high",
    label: "High",
    description: "Likely scam, suspicious payment request, or identity mismatch.",
    icon: ShieldAlert
  },
  {
    value: "urgent",
    label: "Urgent",
    description: "Immediate safety risk, threat, or active fraud attempt.",
    icon: Siren
  }
] as const;

export const evidenceTypes = [
  {
    title: "Screenshots",
    description: "Chat messages, payment requests, or conflicting listing photos.",
    icon: ImagePlus
  },
  {
    title: "Receipts",
    description: "Proof of payment request, invoice, or suspicious transaction reference.",
    icon: ReceiptText
  },
  {
    title: "Contact details",
    description: "Phone number, email, or username used by the suspicious person.",
    icon: PhoneCall
  },
  {
    title: "Viewing details",
    description: "Unsafe meeting instruction, wrong address, or changed access point.",
    icon: CalendarClock
  }
];

export const reviewSteps = [
  {
    title: "Report submitted",
    description: "Your report receives a case reference for tracking.",
    icon: Flag
  },
  {
    title: "Safety review",
    description: "The UrbanRentisha safety team reviews listing, agent, and payment signals.",
    icon: ShieldCheck
  },
  {
    title: "Listing action",
    description: "The listing may be paused, flagged, or escalated if risk is confirmed.",
    icon: XCircle
  },
  {
    title: "Tenant update",
    description: "You receive a notification when the report status changes.",
    icon: MailWarning
  }
];

export const safetyGuidelines = [
  {
    title: "Do not send extra money",
    description: "Keep payments inside the verified UrbanRentisha flow.",
    icon: Banknote
  },
  {
    title: "Do not meet alone if unsafe",
    description: "Cancel or reschedule if the viewing location feels suspicious.",
    icon: Siren
  },
  {
    title: "Keep evidence",
    description: "Screenshots and transaction details help the safety team review faster.",
    icon: UploadCloud
  },
  {
    title: "Protect your identity",
    description: "Use private reporting if you do not want your name shown in the case record.",
    icon: EyeOff
  }
];

export const targetFacts = [
  {
    label: "Listing ID",
    value: "UR-LST-1001",
    icon: Database
  },
  {
    label: "Property type",
    value: "2 Bedroom",
    icon: Building2
  },
  {
    label: "Verification",
    value: "Verified",
    icon: ShieldCheck
  },
  {
    label: "Viewing fee",
    value: "KES 500",
    icon: ReceiptText
  }
];

export const reportQualityTips = [
  {
    title: "Be specific",
    description: "Mention what happened, who contacted you, and when it happened.",
    icon: FileText
  },
  {
    title: "Attach evidence",
    description: "Screenshots and references make the report easier to review.",
    icon: UploadCloud
  },
  {
    title: "Avoid exposing private secrets",
    description: "Do not paste wallet secrets, passwords, or full personal documents.",
    icon: LockKeyhole
  }
];

export const sampleReportReference = "RPT-UR-3310";
export const sampleReportHash = "rpt_0x3c9d12ef7b4a6c8d91e402f77a12c6f8";
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
\n```\n\n## `components/fake-listing-report/logo-mark.tsx`\n\n```tsx\nimport Link from "next/link";
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
\n```\n\n## `components/fake-listing-report/report-header.tsx`\n\n```tsx\nimport Link from "next/link";
import { Bell, LayoutDashboard, Menu, UserRound } from "lucide-react";
import { LogoMark } from "@/components/fake-listing-report/logo-mark";

export function ReportHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ur-bg/78 backdrop-blur-xl">
      <div className="ur-container flex h-20 items-center justify-between">
        <LogoMark />

        <nav className="hidden items-center gap-2 lg:flex" aria-label="Main navigation">
          {[
            { label: "Properties", href: "/listings" },
            { label: "Viewing Code", href: "/viewing-code/REQ-UR-9084" },
            { label: "Reports", href: "/reports", active: true },
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
\n```\n\n## `components/fake-listing-report/fake-listing-report-page.tsx`\n\n```tsx\n"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Flag, ShieldAlert, ShieldCheck } from "lucide-react";
import {
  reportTarget,
  reportReasons,
  sampleReportReference,
  type ReportSeverity,
  type ReportType,
  type ReporterMode
} from "@/lib/report-data";
import { ReportHeader } from "@/components/fake-listing-report/report-header";
import { SafetyWarningBanner } from "@/components/fake-listing-report/safety-warning-banner";
import { ReportTypeSelector } from "@/components/fake-listing-report/report-type-selector";
import { ReportReasonGrid } from "@/components/fake-listing-report/report-reason-grid";
import { ReportDetailsFormCard } from "@/components/fake-listing-report/report-details-form-card";
import { EvidenceUploadCard } from "@/components/fake-listing-report/evidence-upload-card";
import { ReporterPrivacyCard } from "@/components/fake-listing-report/reporter-privacy-card";
import { SubmissionSuccessCard } from "@/components/fake-listing-report/submission-success-card";
import { PropertyUnderReviewCard } from "@/components/fake-listing-report/property-under-review-card";
import { AgentSafetyCard } from "@/components/fake-listing-report/agent-safety-card";
import { ReportSummaryCard } from "@/components/fake-listing-report/report-summary-card";
import { ReviewProcessCard } from "@/components/fake-listing-report/review-process-card";
import { SafetyGuidelinesCard } from "@/components/fake-listing-report/safety-guidelines-card";
import { ReportQualityTipsCard } from "@/components/fake-listing-report/report-quality-tips-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type FakeListingReportPageProps = {
  listingId: string;
};

export function FakeListingReportPage({ listingId }: FakeListingReportPageProps) {
  const [reportType, setReportType] = useState<ReportType>("listing");
  const [selectedReasons, setSelectedReasons] = useState<string[]>([
    "agent-pressure"
  ]);
  const [severity, setSeverity] = useState<ReportSeverity>("medium");
  const [reporterMode, setReporterMode] = useState<ReporterMode>("private");
  const [description, setDescription] = useState(
    "The agent asked me to send an extra fee outside UrbanRentisha before confirming the viewing."
  );
  const [contactBack, setContactBack] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const target = { ...reportTarget, listingId };

  const selectedReasonTitles = useMemo(() => {
    return reportReasons
      .filter((reason) => selectedReasons.includes(reason.id))
      .map((reason) => reason.title);
  }, [selectedReasons]);

  function toggleReason(reasonId: string) {
    setSelectedReasons((current) =>
      current.includes(reasonId)
        ? current.filter((id) => id !== reasonId)
        : [...current, reasonId]
    );
  }

  function submitReport() {
    setSubmitted(true);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 report-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-error/8 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-primary/10 blur-[130px]" />

      <div className="relative z-10">
        <ReportHeader />

        <section className="ur-container pb-12 pt-5">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <Link
              href={`/properties/${target.listingId}`}
              className="inline-flex w-fit items-center gap-2 rounded-ur-sm text-sm font-bold text-white/60 transition-colors hover:text-white ur-focus"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to property detail
            </Link>

            <div className="flex flex-wrap gap-2">
              <Badge variant="danger">
                <ShieldAlert className="h-3.5 w-3.5" />
                Safety report
              </Badge>
              <Badge variant="outline">
                <ShieldCheck className="h-3.5 w-3.5" />
                Tenant protected
              </Badge>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
              Fake listing report
            </p>
            <h1 className="mt-3 max-w-[920px] text-[42px] font-black leading-[1.02] tracking-[-0.07em] text-white sm:text-[56px]">
              Report a suspicious listing or agent.
            </h1>
            <p className="mt-4 max-w-[820px] text-base leading-7 text-white/66">
              Help protect tenants by reporting fake listings, unsafe viewing requests, agent identity issues, or off-platform payment pressure.
            </p>
          </div>

          <SafetyWarningBanner />

          {submitted ? (
            <SubmissionSuccessCard
              reportReference={sampleReportReference}
              target={target}
            />
          ) : null}

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_390px]">
            <section className="space-y-6">
              <ReportTypeSelector value={reportType} onChange={setReportType} />
              <ReportReasonGrid
                selectedReasons={selectedReasons}
                onToggle={toggleReason}
              />
              <ReportDetailsFormCard
                severity={severity}
                description={description}
                contactBack={contactBack}
                onSeverityChange={setSeverity}
                onDescriptionChange={setDescription}
                onContactBackChange={setContactBack}
              />
              <EvidenceUploadCard />
              <ReporterPrivacyCard
                value={reporterMode}
                onChange={setReporterMode}
              />

              <div className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={submitReport}
                    disabled={selectedReasons.length === 0 || description.trim().length < 10}
                  >
                    <Flag className="h-4 w-4" />
                    Submit safety report
                  </Button>

                  <Link href={`/properties/${target.listingId}`} className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full">
                      Cancel
                    </Button>
                  </Link>
                </div>

                <p className="mt-3 text-xs leading-5 text-white/42">
                  Reports are reviewed by the UrbanRentisha safety team. Submission does not automatically prove fraud; it starts a safety review.
                </p>
              </div>
            </section>

            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <PropertyUnderReviewCard target={target} />
              <AgentSafetyCard target={target} />
              <ReportSummaryCard
                reportType={reportType}
                severity={severity}
                reporterMode={reporterMode}
                selectedReasonTitles={selectedReasonTitles}
                description={description}
              />
              <ReviewProcessCard />
              <SafetyGuidelinesCard />
              <ReportQualityTipsCard />
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
\n```\n\n## `components/fake-listing-report/safety-warning-banner.tsx`\n\n```tsx\nimport { AlertTriangle, Banknote, ShieldAlert } from "lucide-react";

export function SafetyWarningBanner() {
  return (
    <section className="rounded-ur-xl border border-ur-warning/25 bg-ur-warning-bg p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-ur-lg bg-ur-warning/15 text-ur-warning">
            <ShieldAlert className="h-6 w-6" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-warning">
              Safety first
            </p>
            <h2 className="mt-2 text-xl font-black tracking-[-0.03em] text-white">
              Do not send money outside the verified UrbanRentisha flow.
            </h2>
            <p className="mt-2 max-w-[760px] text-sm leading-6 text-ur-warning/78">
              If an agent asks for cash, mobile money, bank transfer, or another viewing fee outside the platform, stop and report it here.
            </p>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 md:min-w-[290px]">
          <div className="rounded-ur-sm border border-ur-warning/20 bg-black/16 p-3">
            <Banknote className="mb-2 h-4 w-4 text-ur-warning" />
            <p className="text-xs font-bold text-white">No extra fees</p>
          </div>
          <div className="rounded-ur-sm border border-ur-warning/20 bg-black/16 p-3">
            <AlertTriangle className="mb-2 h-4 w-4 text-ur-warning" />
            <p className="text-xs font-bold text-white">Report pressure</p>
          </div>
        </div>
      </div>
    </section>
  );
}
\n```\n\n## `components/fake-listing-report/report-type-selector.tsx`\n\n```tsx\nimport { reportTypes, type ReportType } from "@/lib/report-data";
import { cn } from "@/lib/utils";

type ReportTypeSelectorProps = {
  value: ReportType;
  onChange: (value: ReportType) => void;
};

export function ReportTypeSelector({
  value,
  onChange
}: ReportTypeSelectorProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Report type
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        What are you reporting?
      </h2>
      <p className="mt-2 text-sm leading-6 text-white/56">
        Select the closest category. The safety team can reclassify it during review.
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {reportTypes.map((item) => {
          const Icon = item.icon;
          const active = item.value === value;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => onChange(item.value)}
              className={cn(
                "rounded-ur-lg border p-4 text-left transition-colors ur-focus",
                active
                  ? "border-ur-primary bg-ur-primary/10"
                  : "border-white/10 bg-black/16 hover:border-ur-primary/40 hover:bg-white/[0.04]"
              )}
            >
              <div className={cn(
                "mb-4 grid h-11 w-11 place-items-center rounded-ur",
                active ? "bg-ur-primary text-white" : "bg-white/5 text-white/52"
              )}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="font-black text-white">{item.label}</p>
              <p className="mt-2 text-sm leading-6 text-white/52">{item.description}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/fake-listing-report/report-reason-grid.tsx`\n\n```tsx\nimport { CheckCircle2 } from "lucide-react";
import { reportReasons } from "@/lib/report-data";
import { cn } from "@/lib/utils";

type ReportReasonGridProps = {
  selectedReasons: string[];
  onToggle: (reasonId: string) => void;
};

export function ReportReasonGrid({
  selectedReasons,
  onToggle
}: ReportReasonGridProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Suspicious signals
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        What made it suspicious?
      </h2>
      <p className="mt-2 text-sm leading-6 text-white/56">
        Select one or more reasons. This helps route the case correctly.
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {reportReasons.map((reason) => {
          const Icon = reason.icon;
          const selected = selectedReasons.includes(reason.id);

          return (
            <button
              key={reason.id}
              type="button"
              onClick={() => onToggle(reason.id)}
              className={cn(
                "rounded-ur-lg border p-4 text-left transition-colors ur-focus",
                selected
                  ? "border-ur-primary bg-ur-primary/10"
                  : "border-white/10 bg-black/16 hover:border-ur-primary/40 hover:bg-white/[0.04]"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className={cn(
                  "grid h-11 w-11 shrink-0 place-items-center rounded-ur",
                  selected ? "bg-ur-primary text-white" : "bg-white/5 text-white/52"
                )}>
                  <Icon className="h-5 w-5" />
                </div>

                {selected ? <CheckCircle2 className="h-5 w-5 text-ur-success" /> : null}
              </div>

              <p className="mt-4 font-black text-white">{reason.title}</p>
              <p className="mt-2 text-sm leading-6 text-white/52">{reason.description}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/fake-listing-report/report-details-form-card.tsx`\n\n```tsx\n"use client";

import { AlertTriangle, MessageSquareText } from "lucide-react";
import {
  severityOptions,
  type ReportSeverity
} from "@/lib/report-data";
import { cn } from "@/lib/utils";

type ReportDetailsFormCardProps = {
  severity: ReportSeverity;
  description: string;
  contactBack: boolean;
  onSeverityChange: (value: ReportSeverity) => void;
  onDescriptionChange: (value: string) => void;
  onContactBackChange: (value: boolean) => void;
};

export function ReportDetailsFormCard({
  severity,
  description,
  contactBack,
  onSeverityChange,
  onDescriptionChange,
  onContactBackChange
}: ReportDetailsFormCardProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Report details
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        Explain what happened.
      </h2>

      <div className="mt-5">
        <label htmlFor="report-description" className="text-sm font-bold text-white">
          Description
        </label>
        <textarea
          id="report-description"
          value={description}
          onChange={(event) => onDescriptionChange(event.target.value)}
          placeholder="Describe the suspicious behaviour, payment request, address mismatch, or agent concern."
          className="report-textarea mt-2 w-full rounded-ur-sm border border-white/10 bg-black/18 px-4 py-3 text-sm leading-6 text-white outline-none transition-colors placeholder:text-white/30 focus:border-ur-primary"
        />
        <p className="mt-2 text-xs text-white/42">
          Minimum 10 characters. Do not include passwords, wallet secret keys, or full personal documents.
        </p>
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-ur-warning" />
          <p className="text-sm font-bold text-white">Severity</p>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-4">
          {severityOptions.map((item) => {
            const Icon = item.icon;
            const active = item.value === severity;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => onSeverityChange(item.value)}
                className={cn(
                  "rounded-ur-lg border p-4 text-left transition-colors ur-focus",
                  active
                    ? item.value === "urgent"
                      ? "border-ur-error bg-ur-error-bg"
                      : "border-ur-primary bg-ur-primary/10"
                    : "border-white/10 bg-black/16 hover:border-ur-primary/40"
                )}
              >
                <Icon className={cn("mb-3 h-5 w-5", item.value === "urgent" ? "text-ur-error" : "text-ur-primary")} />
                <p className="text-sm font-black text-white">{item.label}</p>
                <p className="mt-2 text-xs leading-5 text-white/52">{item.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 rounded-ur-lg border border-white/10 bg-black/16 p-4">
        <div className="flex gap-3">
          <MessageSquareText className="mt-0.5 h-5 w-5 shrink-0 text-ur-primary" />
          <div>
            <p className="text-sm font-black text-white">Allow safety team to contact you</p>
            <p className="mt-1 text-xs leading-5 text-white/52">
              Used only if more details are needed to review the report.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onContactBackChange(!contactBack)}
          className={cn(
            "relative h-6 w-11 shrink-0 rounded-full transition-colors ur-focus",
            contactBack ? "bg-ur-primary" : "bg-white/12"
          )}
          aria-pressed={contactBack}
          aria-label="Allow safety team to contact you"
        >
          <span
            className={cn(
              "absolute top-1 h-4 w-4 rounded-full bg-white transition-transform",
              contactBack ? "translate-x-6" : "translate-x-1"
            )}
          />
        </button>
      </div>
    </section>
  );
}
\n```\n\n## `components/fake-listing-report/evidence-upload-card.tsx`\n\n```tsx\nimport { UploadCloud } from "lucide-react";
import { evidenceTypes } from "@/lib/report-data";

export function EvidenceUploadCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Evidence
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        Add evidence if available.
      </h2>
      <p className="mt-2 text-sm leading-6 text-white/56">
        This UI is ready for upload integration. For the MVP, it shows the intended upload and evidence categories.
      </p>

      <div className="mt-5 rounded-ur-xl border border-dashed border-ur-primary/35 bg-ur-primary/8 p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-ur-lg bg-ur-primary text-white shadow-green-glow">
          <UploadCloud className="h-7 w-7" />
        </div>
        <p className="mt-4 text-lg font-black text-white">Drag screenshots or receipts here</p>
        <p className="mt-2 text-sm leading-6 text-white/52">
          PNG, JPG, PDF, or screenshots up to 10MB each.
        </p>
        <button
          type="button"
          className="mt-5 h-10 rounded-ur-sm border border-white/14 px-5 text-sm font-bold text-white transition-colors hover:border-ur-primary/60 hover:bg-white/5 ur-focus"
        >
          Browse files
        </button>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {evidenceTypes.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
              <Icon className="mb-3 h-5 w-5 text-ur-primary" />
              <p className="text-sm font-black text-white">{item.title}</p>
              <p className="mt-2 text-xs leading-5 text-white/52">{item.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/fake-listing-report/reporter-privacy-card.tsx`\n\n```tsx\nimport { EyeOff, UserRound } from "lucide-react";
import type { ReporterMode } from "@/lib/report-data";
import { cn } from "@/lib/utils";

type ReporterPrivacyCardProps = {
  value: ReporterMode;
  onChange: (value: ReporterMode) => void;
};

export function ReporterPrivacyCard({
  value,
  onChange
}: ReporterPrivacyCardProps) {
  const options = [
    {
      value: "private" as ReporterMode,
      title: "Report privately",
      description: "Your name is hidden from the reported agent or listing owner.",
      icon: EyeOff
    },
    {
      value: "named" as ReporterMode,
      title: "Report with my account",
      description: "Your account can be contacted for case follow-up by the safety team.",
      icon: UserRound
    }
  ];

  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Reporter privacy
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        Choose how this report appears.
      </h2>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {options.map((option) => {
          const Icon = option.icon;
          const active = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={cn(
                "rounded-ur-lg border p-4 text-left transition-colors ur-focus",
                active
                  ? "border-ur-primary bg-ur-primary/10"
                  : "border-white/10 bg-black/16 hover:border-ur-primary/40"
              )}
            >
              <div className={cn(
                "mb-4 grid h-11 w-11 place-items-center rounded-ur",
                active ? "bg-ur-primary text-white" : "bg-white/5 text-white/52"
              )}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="font-black text-white">{option.title}</p>
              <p className="mt-2 text-sm leading-6 text-white/52">{option.description}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/fake-listing-report/submission-success-card.tsx`\n\n```tsx\nimport Link from "next/link";
import { ArrowRight, CheckCircle2, Flag } from "lucide-react";
import type { ListingReportTarget } from "@/lib/report-data";
import { sampleReportHash } from "@/lib/report-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type SubmissionSuccessCardProps = {
  reportReference: string;
  target: ListingReportTarget;
};

export function SubmissionSuccessCard({
  reportReference,
  target
}: SubmissionSuccessCardProps) {
  return (
    <section className="mt-6 rounded-ur-xl border border-ur-success/25 bg-ur-success-bg p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div className="flex gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-ur-lg bg-ur-primary text-white shadow-green-glow">
            <CheckCircle2 className="h-6 w-6" />
          </div>

          <div>
            <Badge variant="success">
              <Flag className="h-3.5 w-3.5" />
              Report submitted
            </Badge>
            <h2 className="mt-4 text-2xl font-black tracking-[-0.04em] text-white">
              Safety report received.
            </h2>
            <p className="mt-2 max-w-[720px] text-sm leading-6 text-ur-success/78">
              The UrbanRentisha safety team will review this report and update you through notifications.
            </p>
          </div>
        </div>

        <div className="rounded-ur-lg border border-ur-success/20 bg-black/18 p-4 text-right">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-ur-success/64">
            Report reference
          </p>
          <p className="mt-1 font-mono text-lg font-black text-white">{reportReference}</p>
        </div>
      </div>

      <div className="mt-5 rounded-ur-lg border border-ur-success/20 bg-black/18 p-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-ur-success/64">
          Report hash
        </p>
        <p className="mt-2 break-all font-mono text-sm leading-6 text-white">{sampleReportHash}</p>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Link href={`/reports/${reportReference}`} className="w-full sm:w-auto">
          <Button className="w-full">
            View report status
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <Link href={`/properties/${target.listingId}`} className="w-full sm:w-auto">
          <Button variant="outline" className="w-full">
            Return to listing
          </Button>
        </Link>
      </div>
    </section>
  );
}
\n```\n\n## `components/fake-listing-report/property-under-review-card.tsx`\n\n```tsx\nimport { BadgeCheck, Home, MapPin } from "lucide-react";
import { targetFacts, type ListingReportTarget } from "@/lib/report-data";
import { Badge } from "@/components/ui/badge";

type PropertyUnderReviewCardProps = {
  target: ListingReportTarget;
};

export function PropertyUnderReviewCard({ target }: PropertyUnderReviewCardProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Listing being reported
          </p>
          <h2 className="mt-2 text-lg font-black text-white">{target.listingTitle}</h2>
          <p className="mt-2 flex items-center gap-2 text-sm text-white/52">
            <MapPin className="h-4 w-4 text-ur-primary" />
            {target.location}
          </p>
        </div>

        <Badge variant="success">
          <BadgeCheck className="h-3.5 w-3.5" />
          {target.verificationStatus}
        </Badge>
      </div>

      <div className="mt-5 rounded-ur-lg border border-white/10 bg-black/16 p-4">
        <Home className="mb-3 h-5 w-5 text-ur-primary" />
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
          Monthly rent
        </p>
        <p className="mt-1 text-xl font-black text-white">
          KES {target.monthlyRentKes.toLocaleString()}
        </p>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        {targetFacts.map((fact) => {
          const Icon = fact.icon;
          return (
            <div key={fact.label} className="rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <Icon className="mb-2 h-4 w-4 text-ur-primary" />
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/38">{fact.label}</p>
              <p className="mt-1 truncate font-mono text-xs font-bold text-white">{fact.value}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/fake-listing-report/agent-safety-card.tsx`\n\n```tsx\nimport { PhoneCall, UserRound } from "lucide-react";
import type { ListingReportTarget } from "@/lib/report-data";
import { Badge } from "@/components/ui/badge";

type AgentSafetyCardProps = {
  target: ListingReportTarget;
};

export function AgentSafetyCard({ target }: AgentSafetyCardProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Agent profile
          </p>
          <h2 className="mt-2 text-lg font-black text-white">{target.agentName}</h2>
          <p className="mt-1 text-sm text-white/52">{target.agentCompany}</p>
        </div>

        <Badge variant="success">
          {target.agentStatus}
        </Badge>
      </div>

      <div className="mt-5 rounded-ur-lg border border-white/10 bg-black/16 p-4">
        <div className="flex gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
            <UserRound className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-black text-white">Contact shown on listing</p>
            <p className="mt-1 flex items-center gap-2 font-mono text-sm text-ur-mint">
              <PhoneCall className="h-4 w-4" />
              {target.agentPhone}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
\n```\n\n## `components/fake-listing-report/report-summary-card.tsx`\n\n```tsx\nimport {
  AlertTriangle,
  EyeOff,
  FileText,
  ShieldAlert
} from "lucide-react";
import type {
  ReportSeverity,
  ReportType,
  ReporterMode
} from "@/lib/report-data";
import { Badge } from "@/components/ui/badge";

type ReportSummaryCardProps = {
  reportType: ReportType;
  severity: ReportSeverity;
  reporterMode: ReporterMode;
  selectedReasonTitles: string[];
  description: string;
};

export function ReportSummaryCard({
  reportType,
  severity,
  reporterMode,
  selectedReasonTitles,
  description
}: ReportSummaryCardProps) {
  const severityVariant =
    severity === "urgent" || severity === "high"
      ? "danger"
      : severity === "medium"
        ? "warning"
        : "neutral";

  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Live summary
          </p>
          <h2 className="mt-2 text-lg font-black text-white">Report preview</h2>
        </div>

        <Badge variant={severityVariant}>{severity}</Badge>
      </div>

      <div className="mt-5 space-y-3">
        <SummaryRow icon={<ShieldAlert className="h-4 w-4" />} label="Type" value={reportType} />
        <SummaryRow icon={<AlertTriangle className="h-4 w-4" />} label="Severity" value={severity} />
        <SummaryRow icon={<EyeOff className="h-4 w-4" />} label="Privacy" value={reporterMode} />
      </div>

      <div className="mt-5 rounded-ur-lg border border-white/10 bg-black/16 p-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
          Selected reasons
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedReasonTitles.length > 0 ? (
            selectedReasonTitles.map((reason) => (
              <Badge key={reason} variant="outline">{reason}</Badge>
            ))
          ) : (
            <p className="text-sm text-white/42">No reason selected yet.</p>
          )}
        </div>
      </div>

      <div className="mt-3 rounded-ur-lg border border-white/10 bg-black/16 p-4">
        <FileText className="mb-2 h-4 w-4 text-ur-primary" />
        <p className="line-clamp-4 text-sm leading-6 text-white/58">
          {description || "No description added yet."}
        </p>
      </div>
    </section>
  );
}

function SummaryRow({
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
      <div className="flex items-center gap-2 text-white/60">
        {icon}
        <p className="text-sm font-bold">{label}</p>
      </div>
      <p className="font-mono text-xs font-bold text-ur-mint">{value}</p>
    </div>
  );
}
\n```\n\n## `components/fake-listing-report/review-process-card.tsx`\n\n```tsx\nimport { reviewSteps } from "@/lib/report-data";

export function ReviewProcessCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        What happens next
      </p>

      <div className="mt-4 space-y-3">
        {reviewSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="flex gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-black text-white">
                  {index + 1}. {step.title}
                </p>
                <p className="mt-1 text-xs leading-5 text-white/52">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/fake-listing-report/safety-guidelines-card.tsx`\n\n```tsx\nimport { safetyGuidelines } from "@/lib/report-data";

export function SafetyGuidelinesCard() {
  return (
    <section className="rounded-ur-xl border border-ur-warning/25 bg-ur-warning-bg p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-warning">
        Tenant safety guidance
      </p>

      <div className="mt-4 space-y-3">
        {safetyGuidelines.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="flex gap-3 rounded-ur-sm border border-ur-warning/20 bg-black/16 p-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm bg-ur-warning/15 text-ur-warning">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-black text-white">{item.title}</p>
                <p className="mt-1 text-xs leading-5 text-ur-warning/74">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/fake-listing-report/report-quality-tips-card.tsx`\n\n```tsx\nimport { reportQualityTips } from "@/lib/report-data";

export function ReportQualityTipsCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Strong report tips
      </p>

      <div className="mt-4 space-y-3">
        {reportQualityTips.map((item) => {
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
\n```\n
---

# 14. Acceptance Checklist

```text
The route /report-listing/UR-LST-1001 works.
Google Fonts are loaded.
Inter is used for UI text.
JetBrains Mono is used for listing ID, report reference, report hash, phone number, and reference values.
UrbanRentisha dark green theme is applied.
Safety warning banner is visible.
Report type selector works.
Suspicious reason cards can be selected and deselected.
Description textarea is visible and controlled.
Severity selector works.
Contact-back toggle works.
Evidence upload UI is visible.
Reporter privacy selector works.
Submit button is disabled when required data is missing.
Submit shows report success card.
Success card shows report reference.
Listing summary card is visible.
Agent safety card is visible.
Live report summary updates.
Review process card is visible.
Tenant safety guidance is visible.
Strong report tips are visible.
Mobile layout is stacked and readable.
All controls have visible focus states.
```

---

# 15. Final UX Summary

```text
The Fake Listing Report Screen is a safety-critical screen.
It should feel serious, calm, and precise.
The UI must make tenants confident that they can report suspicious listings or agents without exposing unnecessary personal information.
```
