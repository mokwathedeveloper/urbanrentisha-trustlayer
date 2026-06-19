# UrbanRentisha TrustLayer Notifications Screen UI/UX Blueprint and Starter Code

## 1. Screen Covered

```text
13. Notifications Screen only
```

## 2. Page Purpose

The **Notifications Screen** shows payment, proof, access, report, and viewing-code updates.

This screen helps tenants:

```text
Track payment updates
Track private proof generation updates
Track proof verification and access unlock updates
Track suspicious listing/report updates
Track viewing-code readiness, expiry, and access updates
Open the correct screen from each notification
Mark individual notifications as read
Mark all notifications as read
Search and filter notifications
Review notification preferences
```

---

## 3. Design Inspiration Rule

The provided MantleMandate design system is used only as structural inspiration for:

```text
Strict spacing
Dark SaaS interface
Precise notification cards
Readable states
Clean filters
Accessible actions
Minimal motion
Technical trust tone
```

Do not copy MantleMandate branding, logo, or blue palette.

UrbanRentisha must keep its own identity:

```text
Dark green trust UI
Eco-friendly real estate trust
Verified property access
Payment-proof workflow
Stellar and ZK trust flow
Tenant safety
Professional B2B SaaS clarity
```

---

## 4. UX Goal

The tenant should understand this immediately:

```text
This is the central notification inbox.
Every payment, proof, access, report, and viewing-code update is shown here.
Unread and urgent updates are visually clear.
Every notification has a direct next action.
```

---

## 5. Notification Categories

Use these exact categories:

```text
Payment
Proof
Access
Report
Viewing Code
```

Category meaning:

```text
Payment = Stellar payment received, failed, hold updated, release/refund changed
Proof = ZK proof generated, failed, submitted, verification ready
Access = proof verified, access unlocked, access expired, access revoked
Report = listing report submitted, reviewed, escalated, resolved
Viewing Code = code created, copied, expired, refreshed, used
```

---

## 6. Final Folder Structure

```text
urbanrentisha-notifications-screen/
├── app/
│   ├── notifications/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── notifications/
│   │   ├── logo-mark.tsx
│   │   ├── notification-detail-panel.tsx
│   │   ├── notification-filters.tsx
│   │   ├── notification-list-item.tsx
│   │   ├── notification-list.tsx
│   │   ├── notification-preferences-card.tsx
│   │   ├── notification-stats-grid.tsx
│   │   ├── notification-timeline-card.tsx
│   │   ├── notifications-header.tsx
│   │   ├── notifications-page.tsx
│   │   └── safety-highlights-card.tsx
│   │
│   └── ui/
│       ├── badge.tsx
│       └── button.tsx
│
├── lib/
│   ├── notifications-data.ts
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
Page title and unread badge
Action buttons:
  - Preferences
  - Mark all read
Stats grid
Main two-column layout:
  Left:
    - filter tabs
    - search field
    - notification list
  Right sticky:
    - selected notification detail
    - notification preferences
    - recent trust-flow timeline
    - notification UX rules
```

Mobile:

```text
Header
Title
Unread badge
Mark all read
Stats grid
Filter tabs
Search
Notification cards
Detail panel below list
Preferences
Timeline
Safety rules
```

---

## 8. Interaction Rules

```text
Clicking a notification selects it and marks it as read.
Clicking Read marks only that notification as read.
Clicking Mark all read marks every notification as read.
Filter tabs show notifications by category.
Search filters by title, description, and request ID.
Detail panel updates when selected notification changes.
Every notification has an action button routing to the relevant screen.
Urgent notifications use warning/error visual treatment and must include text.
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
JetBrains Mono = request IDs, transaction hashes, proof hashes, verification hashes, viewing codes, hold IDs
```

Use JetBrains Mono for:

```text
REQ-UR-9084
RPT-UR-3310
UR-4829-LOCK
HOLD-UR-7712
4f7a8b2c...b3c4d5
zkp_0x9f12...c44190
soro_0x7ab...2c109
```

---

## 11. Accessibility Requirements

```text
Unread state must use text and visual marker.
Urgent state must use text and icon, not color only.
Filter buttons must have aria-selected and role tab.
Search input must have accessible label.
Notification cards must be keyboard selectable.
All action buttons must have visible focus states.
Long hash/reference values must truncate safely.
Minimum mobile touch target should be 44px.
```

---

## 12. Implementation Notes

This starter is UI-only.

Connect it later to:

```text
Notifications API
WebSocket or polling updates
Payment status API
Proof generation API
Proof verification API
Viewing code API
Report/safety API
User notification preferences API
```

Recommended API endpoints:

```text
GET /api/v1/notifications
PATCH /api/v1/notifications/:notificationId/read
PATCH /api/v1/notifications/read-all
GET /api/v1/notifications/preferences
PATCH /api/v1/notifications/preferences
```

Recommended route:

```text
/notifications
```

---

# 13. Full Starter Code

\n## `package.json`\n\n```json\n{
  "name": "urbanrentisha-notifications-screen",
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
  title: "Notifications | UrbanRentisha TrustLayer",
  description:
    "View payment, proof, access, report, and viewing-code updates."
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

  .notifications-grid-bg {
    background-image:
      linear-gradient(rgba(22, 163, 74, 0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(22, 163, 74, 0.045) 1px, transparent 1px);
    background-size: 38px 38px;
  }
}
\n```\n\n## `app/page.tsx`\n\n```tsx\nimport { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/notifications");
}
\n```\n\n## `app/notifications/page.tsx`\n\n```tsx\nimport { NotificationsPage } from "@/components/notifications/notifications-page";

export default function Page() {
  return <NotificationsPage />;
}
\n```\n\n## `lib/utils.ts`\n\n```ts\nimport { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
\n```\n\n## `lib/notifications-data.ts`\n\n```ts\nimport {
  Bell,
  CalendarCheck2,
  CheckCircle2,
  Clock3,
  Eye,
  FileWarning,
  Flag,
  Hash,
  KeyRound,
  LockKeyhole,
  ReceiptText,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  WalletCards
} from "lucide-react";

export type NotificationType =
  | "all"
  | "payment"
  | "proof"
  | "access"
  | "report"
  | "viewing-code";

export type NotificationPriority = "normal" | "important" | "urgent";

export type NotificationRecord = {
  id: string;
  type: Exclude<NotificationType, "all">;
  title: string;
  description: string;
  timestamp: string;
  unread: boolean;
  priority: NotificationPriority;
  requestId: string;
  actionLabel: string;
  href: string;
  meta: {
    label: string;
    value: string;
  }[];
};

export const notificationFilters: {
  label: string;
  value: NotificationType;
}[] = [
  { label: "All", value: "all" },
  { label: "Payment", value: "payment" },
  { label: "Proof", value: "proof" },
  { label: "Access", value: "access" },
  { label: "Reports", value: "report" },
  { label: "Viewing Code", value: "viewing-code" }
];

export const initialNotifications: NotificationRecord[] = [
  {
    id: "NTF-1001",
    type: "payment",
    title: "Viewing fee payment confirmed",
    description:
      "KES 500 viewing fee was received on Stellar testnet for Kilimani Green View Apartment.",
    timestamp: "2 min ago",
    unread: true,
    priority: "important",
    requestId: "REQ-UR-9084",
    actionLabel: "View payment",
    href: "/stellar-payment/REQ-UR-9084",
    meta: [
      { label: "Amount", value: "KES 500" },
      { label: "Network", value: "Stellar Testnet" },
      { label: "TX", value: "4f7a8b2c...b3c4d5" }
    ]
  },
  {
    id: "NTF-1002",
    type: "proof",
    title: "Private payment proof generated",
    description:
      "A ZK payment proof was generated without exposing unrelated wallet history.",
    timestamp: "4 min ago",
    unread: true,
    priority: "normal",
    requestId: "REQ-UR-9084",
    actionLabel: "View proof",
    href: "/zk-proof-generation/REQ-UR-9084",
    meta: [
      { label: "Proof", value: "zkp_0x9f12...c44190" },
      { label: "Circuit", value: "payment_condition_v1" }
    ]
  },
  {
    id: "NTF-1003",
    type: "access",
    title: "Viewing access unlocked",
    description:
      "Proof verification succeeded. The viewing request is eligible for access unlock.",
    timestamp: "6 min ago",
    unread: true,
    priority: "important",
    requestId: "REQ-UR-9084",
    actionLabel: "Open access",
    href: "/viewing-code/REQ-UR-9084",
    meta: [
      { label: "Access", value: "Unlocked" },
      { label: "Verification", value: "soro_0x7ab...2c109" }
    ]
  },
  {
    id: "NTF-1004",
    type: "viewing-code",
    title: "Viewing code is ready",
    description:
      "Your property viewing code is active for Sat, 22 Jun at 11:30 AM.",
    timestamp: "8 min ago",
    unread: false,
    priority: "urgent",
    requestId: "REQ-UR-9084",
    actionLabel: "Copy code",
    href: "/viewing-code/REQ-UR-9084",
    meta: [
      { label: "Code", value: "UR-4829-LOCK" },
      { label: "Expires", value: "6:00 PM" }
    ]
  },
  {
    id: "NTF-1005",
    type: "report",
    title: "Report review update",
    description:
      "The listing report for Westlands Studio Loft was reviewed by the safety team.",
    timestamp: "1 hr ago",
    unread: false,
    priority: "normal",
    requestId: "RPT-UR-3310",
    actionLabel: "View report",
    href: "/reports/RPT-UR-3310",
    meta: [
      { label: "Report", value: "RPT-UR-3310" },
      { label: "Status", value: "Reviewed" }
    ]
  },
  {
    id: "NTF-1006",
    type: "payment",
    title: "Payment-hold status updated",
    description:
      "Your reservation status is active and the viewing fee hold remains visible.",
    timestamp: "2 hrs ago",
    unread: false,
    priority: "normal",
    requestId: "REQ-UR-9084",
    actionLabel: "View hold",
    href: "/payment-hold/REQ-UR-9084",
    meta: [
      { label: "Hold", value: "HOLD-UR-7712" },
      { label: "Status", value: "Reservation active" }
    ]
  }
];

export const notificationStats = [
  {
    label: "Unread",
    value: "3",
    icon: Bell
  },
  {
    label: "Payment",
    value: "2",
    icon: WalletCards
  },
  {
    label: "Proof",
    value: "1",
    icon: LockKeyhole
  },
  {
    label: "Access",
    value: "2",
    icon: KeyRound
  }
];

export const notificationPreferences = [
  {
    title: "Payment updates",
    description: "Notify when payment is received, held, released, or reviewed.",
    icon: ReceiptText,
    enabled: true
  },
  {
    title: "Proof updates",
    description: "Notify when ZK proof generation or verification changes state.",
    icon: ShieldCheck,
    enabled: true
  },
  {
    title: "Viewing-code updates",
    description: "Notify when access code is created, copied, expired, or refreshed.",
    icon: KeyRound,
    enabled: true
  },
  {
    title: "Report updates",
    description: "Notify when a suspicious listing report receives review action.",
    icon: Flag,
    enabled: true
  }
];

export const typeVisuals = {
  payment: {
    label: "Payment",
    icon: WalletCards,
    tone: "success"
  },
  proof: {
    label: "Proof",
    icon: LockKeyhole,
    tone: "success"
  },
  access: {
    label: "Access",
    icon: KeyRound,
    tone: "success"
  },
  report: {
    label: "Report",
    icon: ShieldAlert,
    tone: "danger"
  },
  "viewing-code": {
    label: "Viewing code",
    icon: Eye,
    tone: "warning"
  }
} as const;

export const notificationTimeline = [
  {
    title: "Payment received",
    description: "Stellar testnet transaction matched the viewing request.",
    icon: WalletCards,
    time: "10:07 AM"
  },
  {
    title: "Proof generated",
    description: "Private payment proof was created.",
    icon: LockKeyhole,
    time: "10:09 AM"
  },
  {
    title: "Proof verified",
    description: "Soroban verifier accepted proof payload.",
    icon: ShieldCheck,
    time: "10:11 AM"
  },
  {
    title: "Viewing code unlocked",
    description: "Tenant received verified access code.",
    icon: KeyRound,
    time: "10:12 AM"
  }
];

export const safetyHighlights = [
  {
    title: "Urgent notifications stay visible",
    description: "Viewing-code and safety issues should not disappear until acknowledged.",
    icon: FileWarning
  },
  {
    title: "Hash values use monospace",
    description: "TX, proof, and verification references must stay readable and copy-safe.",
    icon: Hash
  },
  {
    title: "Status uses text and icon",
    description: "Do not rely on green, yellow, or red alone.",
    icon: CheckCircle2
  },
  {
    title: "Time-sensitive updates are clear",
    description: "Viewing time and code expiry should always be readable.",
    icon: Clock3
  },
  {
    title: "Blockchain status is scoped",
    description: "Only relevant payment, proof, and verification references are shown.",
    icon: Sparkles
  },
  {
    title: "Viewing updates are actionable",
    description: "Every notification should lead to the relevant screen.",
    icon: CalendarCheck2
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
\n```\n\n## `components/notifications/logo-mark.tsx`\n\n```tsx\nimport Link from "next/link";
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
\n```\n\n## `components/notifications/notifications-page.tsx`\n\n```tsx\n"use client";

import { useMemo, useState } from "react";
import { Bell, CheckCheck, Search, SlidersHorizontal } from "lucide-react";
import {
  initialNotifications,
  type NotificationRecord,
  type NotificationType
} from "@/lib/notifications-data";
import { NotificationsHeader } from "@/components/notifications/notifications-header";
import { NotificationStatsGrid } from "@/components/notifications/notification-stats-grid";
import { NotificationFilters } from "@/components/notifications/notification-filters";
import { NotificationList } from "@/components/notifications/notification-list";
import { NotificationDetailPanel } from "@/components/notifications/notification-detail-panel";
import { NotificationPreferencesCard } from "@/components/notifications/notification-preferences-card";
import { NotificationTimelineCard } from "@/components/notifications/notification-timeline-card";
import { SafetyHighlightsCard } from "@/components/notifications/safety-highlights-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationRecord[]>(initialNotifications);
  const [activeFilter, setActiveFilter] = useState<NotificationType>("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(initialNotifications[0]?.id ?? "");

  const selectedNotification =
    notifications.find((notification) => notification.id === selectedId) ?? notifications[0];

  const unreadCount = notifications.filter((notification) => notification.unread).length;

  const filteredNotifications = useMemo(() => {
    const cleanedQuery = query.trim().toLowerCase();

    return notifications.filter((notification) => {
      const matchesType = activeFilter === "all" || notification.type === activeFilter;
      const matchesQuery =
        cleanedQuery.length === 0 ||
        notification.title.toLowerCase().includes(cleanedQuery) ||
        notification.description.toLowerCase().includes(cleanedQuery) ||
        notification.requestId.toLowerCase().includes(cleanedQuery);

      return matchesType && matchesQuery;
    });
  }, [activeFilter, notifications, query]);

  function markAsRead(id: string) {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id ? { ...notification, unread: false } : notification
      )
    );
  }

  function markAllAsRead() {
    setNotifications((current) =>
      current.map((notification) => ({ ...notification, unread: false }))
    );
  }

  function selectNotification(id: string) {
    setSelectedId(id);
    markAsRead(id);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 notifications-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-mint/10 blur-[130px]" />

      <div className="relative z-10">
        <NotificationsHeader unreadCount={unreadCount} />

        <section className="ur-container pb-12 pt-5">
          <div className="mb-6 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="success">
                  <Bell className="h-3.5 w-3.5" />
                  {unreadCount} unread
                </Badge>
                <Badge variant="outline">
                  Payment, proof, access, report, and viewing-code updates
                </Badge>
              </div>

              <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
                Notifications
              </p>
              <h1 className="mt-3 max-w-[900px] text-[42px] font-black leading-[1.02] tracking-[-0.07em] text-white sm:text-[56px]">
                Stay updated across the trust flow.
              </h1>
              <p className="mt-4 max-w-[820px] text-base leading-7 text-white/66">
                Track important updates for payments, ZK proofs, access unlocks, suspicious reports, and active viewing codes.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Button variant="outline">
                <SlidersHorizontal className="h-4 w-4" />
                Preferences
              </Button>
              <Button onClick={markAllAsRead}>
                <CheckCheck className="h-4 w-4" />
                Mark all read
              </Button>
            </div>
          </div>

          <NotificationStatsGrid unreadCount={unreadCount} />

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_390px]">
            <section className="space-y-5">
              <div className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                  <NotificationFilters
                    activeFilter={activeFilter}
                    onChange={setActiveFilter}
                  />

                  <label className="relative block xl:w-[360px]">
                    <span className="sr-only">Search notifications</span>
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/42" />
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search request, hash, update..."
                      className="h-11 w-full rounded-ur-sm border border-white/10 bg-black/18 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-ur-primary"
                    />
                  </label>
                </div>
              </div>

              <NotificationList
                notifications={filteredNotifications}
                selectedId={selectedNotification?.id}
                onSelect={selectNotification}
                onMarkAsRead={markAsRead}
              />
            </section>

            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <NotificationDetailPanel notification={selectedNotification} />
              <NotificationPreferencesCard />
              <NotificationTimelineCard />
              <SafetyHighlightsCard />
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
\n```\n\n## `components/notifications/notifications-header.tsx`\n\n```tsx\nimport Link from "next/link";
import { Bell, LayoutDashboard, Menu, UserRound } from "lucide-react";
import { LogoMark } from "@/components/notifications/logo-mark";
import { Badge } from "@/components/ui/badge";

type NotificationsHeaderProps = {
  unreadCount: number;
};

export function NotificationsHeader({ unreadCount }: NotificationsHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ur-bg/78 backdrop-blur-xl">
      <div className="ur-container flex h-20 items-center justify-between">
        <LogoMark />

        <nav className="hidden items-center gap-2 lg:flex" aria-label="Main navigation">
          {[
            { label: "Dashboard", href: "/tenant/dashboard" },
            { label: "Properties", href: "/listings" },
            { label: "Viewing Code", href: "/viewing-code/REQ-UR-9084" },
            { label: "Notifications", href: "/notifications", active: true }
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
            className="relative hidden h-10 w-10 place-items-center rounded-ur-sm border border-ur-primary/30 bg-ur-primary/10 text-ur-primary transition-colors hover:bg-ur-primary/15 ur-focus sm:grid"
            aria-label={`${unreadCount} unread notifications`}
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 ? (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-ur-primary px-1 text-[10px] font-black text-white">
                {unreadCount}
              </span>
            ) : null}
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

          <Badge variant="success" className="hidden xl:inline-flex">
            Live updates
          </Badge>
        </div>
      </div>
    </header>
  );
}
\n```\n\n## `components/notifications/notification-stats-grid.tsx`\n\n```tsx\nimport {
  Bell,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
  WalletCards
} from "lucide-react";

type NotificationStatsGridProps = {
  unreadCount: number;
};

const stats = [
  {
    label: "Unread",
    icon: Bell
  },
  {
    label: "Payments",
    icon: WalletCards
  },
  {
    label: "Proofs",
    icon: LockKeyhole
  },
  {
    label: "Access",
    icon: KeyRound
  }
];

export function NotificationStatsGrid({ unreadCount }: NotificationStatsGridProps) {
  const values = [unreadCount, 2, 1, 2];

  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
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
                  {values[index]}
                </p>
              </div>
              <div className="grid h-11 w-11 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                <Icon className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-ur-success">
              <ShieldCheck className="h-3.5 w-3.5" />
              Updated from trust flow
            </div>
          </article>
        );
      })}
    </section>
  );
}
\n```\n\n## `components/notifications/notification-filters.tsx`\n\n```tsx\nimport { notificationFilters, type NotificationType } from "@/lib/notifications-data";
import { cn } from "@/lib/utils";

type NotificationFiltersProps = {
  activeFilter: NotificationType;
  onChange: (filter: NotificationType) => void;
};

export function NotificationFilters({
  activeFilter,
  onChange
}: NotificationFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Notification filters">
      {notificationFilters.map((filter) => {
        const active = filter.value === activeFilter;

        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onChange(filter.value)}
            className={cn(
              "h-10 rounded-ur-sm border px-4 text-sm font-bold transition-colors ur-focus",
              active
                ? "border-ur-primary bg-ur-primary text-white"
                : "border-white/10 bg-black/16 text-white/56 hover:border-ur-primary/50 hover:bg-white/5 hover:text-white"
            )}
            aria-selected={active}
            role="tab"
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
\n```\n\n## `components/notifications/notification-list.tsx`\n\n```tsx\nimport { Inbox } from "lucide-react";
import type { NotificationRecord } from "@/lib/notifications-data";
import { NotificationListItem } from "@/components/notifications/notification-list-item";

type NotificationListProps = {
  notifications: NotificationRecord[];
  selectedId?: string;
  onSelect: (id: string) => void;
  onMarkAsRead: (id: string) => void;
};

export function NotificationList({
  notifications,
  selectedId,
  onSelect,
  onMarkAsRead
}: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-8 text-center shadow-soft-dark backdrop-blur-xl">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-ur-lg bg-white/5 text-white/42">
          <Inbox className="h-7 w-7" />
        </div>
        <h2 className="mt-4 text-xl font-black text-white">No notifications found</h2>
        <p className="mt-2 text-sm text-white/52">
          Try another filter or search term.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-3">
      {notifications.map((notification) => (
        <NotificationListItem
          key={notification.id}
          notification={notification}
          selected={notification.id === selectedId}
          onSelect={() => onSelect(notification.id)}
          onMarkAsRead={() => onMarkAsRead(notification.id)}
        />
      ))}
    </section>
  );
}
\n```\n\n## `components/notifications/notification-list-item.tsx`\n\n```tsx\nimport { ArrowRight, Check, Dot } from "lucide-react";
import type { NotificationRecord } from "@/lib/notifications-data";
import { typeVisuals } from "@/lib/notifications-data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type NotificationListItemProps = {
  notification: NotificationRecord;
  selected: boolean;
  onSelect: () => void;
  onMarkAsRead: () => void;
};

export function NotificationListItem({
  notification,
  selected,
  onSelect,
  onMarkAsRead
}: NotificationListItemProps) {
  const visual = typeVisuals[notification.type];
  const Icon = visual.icon;

  const badgeVariant =
    notification.priority === "urgent"
      ? "danger"
      : notification.priority === "important"
        ? "warning"
        : "neutral";

  return (
    <article
      className={cn(
        "rounded-ur-xl border bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl transition-colors",
        selected
          ? "border-ur-primary/70 bg-ur-primary/8"
          : notification.unread
            ? "border-ur-primary/25"
            : "border-white/10 hover:border-white/20 hover:bg-white/[0.045]"
      )}
    >
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <button
          type="button"
          onClick={onSelect}
          className="flex flex-1 gap-4 text-left ur-focus"
        >
          <div
            className={cn(
              "grid h-12 w-12 shrink-0 place-items-center rounded-ur-lg",
              notification.type === "report"
                ? "bg-ur-error-bg text-ur-error"
                : notification.type === "viewing-code"
                  ? "bg-ur-warning-bg text-ur-warning"
                  : "bg-ur-success-bg text-ur-success"
            )}
          >
            <Icon className="h-6 w-6" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-black text-white">{notification.title}</p>
              {notification.unread ? (
                <span className="inline-flex items-center rounded-full bg-ur-primary/14 px-2 py-0.5 text-[11px] font-black text-ur-mint">
                  <Dot className="h-4 w-4" />
                  New
                </span>
              ) : null}
              <Badge variant={badgeVariant}>
                {notification.priority}
              </Badge>
            </div>

            <p className="mt-2 max-w-[720px] text-sm leading-6 text-white/58">
              {notification.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="font-mono text-xs font-bold text-ur-mint">
                {notification.requestId}
              </span>
              <span className="text-xs font-bold text-white/38">•</span>
              <span className="text-xs font-bold text-white/42">
                {notification.timestamp}
              </span>
              <span className="text-xs font-bold text-white/38">•</span>
              <span className="text-xs font-bold text-white/50">
                {visual.label}
              </span>
            </div>
          </div>
        </button>

        <div className="flex gap-2 xl:flex-col">
          {notification.unread ? (
            <Button size="sm" variant="outline" onClick={onMarkAsRead}>
              <Check className="h-4 w-4" />
              Read
            </Button>
          ) : null}

          <Button size="sm" onClick={onSelect}>
            Open
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </article>
  );
}
\n```\n\n## `components/notifications/notification-detail-panel.tsx`\n\n```tsx\nimport Link from "next/link";
import { ArrowRight, Bell, Clock3 } from "lucide-react";
import type { NotificationRecord } from "@/lib/notifications-data";
import { typeVisuals } from "@/lib/notifications-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type NotificationDetailPanelProps = {
  notification?: NotificationRecord;
};

export function NotificationDetailPanel({
  notification
}: NotificationDetailPanelProps) {
  if (!notification) {
    return (
      <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
        <p className="text-sm text-white/52">Select a notification to view details.</p>
      </section>
    );
  }

  const visual = typeVisuals[notification.type];
  const Icon = visual.icon;

  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-ur-lg bg-ur-primary text-white shadow-green-glow">
          <Icon className="h-6 w-6" />
        </div>

        <Badge variant={notification.unread ? "success" : "outline"}>
          {notification.unread ? "Unread" : "Read"}
        </Badge>
      </div>

      <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Notification detail
      </p>
      <h2 className="mt-2 text-xl font-black tracking-[-0.03em] text-white">
        {notification.title}
      </h2>
      <p className="mt-3 text-sm leading-6 text-white/60">
        {notification.description}
      </p>

      <div className="mt-5 rounded-ur-lg border border-white/10 bg-black/16 p-4">
        <div className="flex items-center gap-2 text-sm font-bold text-white/70">
          <Clock3 className="h-4 w-4 text-ur-primary" />
          {notification.timestamp}
        </div>
        <div className="mt-2 flex items-center gap-2 text-sm font-bold text-white/70">
          <Bell className="h-4 w-4 text-ur-primary" />
          {visual.label} update
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {notification.meta.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3"
          >
            <p className="text-sm font-bold text-white/58">{item.label}</p>
            <p className="max-w-[180px] truncate font-mono text-xs font-bold text-ur-mint">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <Link href={notification.href} className="mt-5 block">
        <Button className="w-full">
          {notification.actionLabel}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </section>
  );
}
\n```\n\n## `components/notifications/notification-preferences-card.tsx`\n\n```tsx\nimport { notificationPreferences } from "@/lib/notifications-data";

export function NotificationPreferencesCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Notification preferences
      </p>

      <div className="mt-4 space-y-3">
        {notificationPreferences.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center justify-between gap-4 rounded-ur-sm border border-white/10 bg-black/16 p-3"
            >
              <div className="flex gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-black text-white">{item.title}</p>
                  <p className="mt-1 text-xs leading-5 text-white/52">{item.description}</p>
                </div>
              </div>

              <button
                type="button"
                className="relative h-6 w-11 shrink-0 rounded-full bg-ur-primary transition-colors ur-focus"
                aria-label={`${item.title} enabled`}
              >
                <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/notifications/notification-timeline-card.tsx`\n\n```tsx\nimport { CheckCircle2 } from "lucide-react";
import { notificationTimeline } from "@/lib/notifications-data";

export function NotificationTimelineCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Recent trust flow
      </p>

      <div className="mt-4 space-y-3">
        {notificationTimeline.map((event) => {
          const Icon = event.icon;

          return (
            <div key={event.title} className="flex gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm bg-ur-success-bg text-ur-success">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-black text-white">{event.title}</p>
                  <p className="font-mono text-xs font-bold text-ur-mint">{event.time}</p>
                </div>
                <p className="mt-1 text-xs leading-5 text-white/52">{event.description}</p>
                <Icon className="mt-2 h-4 w-4 text-ur-primary" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
\n```\n\n## `components/notifications/safety-highlights-card.tsx`\n\n```tsx\nimport { safetyHighlights } from "@/lib/notifications-data";

export function SafetyHighlightsCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Notification UX rules
      </p>

      <div className="mt-4 grid gap-3">
        {safetyHighlights.map((item) => {
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
The route /notifications works.
Google Fonts are loaded.
Inter is used for UI text.
JetBrains Mono is used for request IDs, hashes, viewing codes, and hold IDs.
UrbanRentisha dark green theme is applied.
Page title and unread badge are visible.
Stats grid is visible.
Filter tabs work.
Search field filters notifications.
Notification list shows payment, proof, access, report, and viewing-code updates.
Unread notifications are clearly marked.
Priority badges are visible.
Clicking a notification selects it.
Clicking a notification marks it as read.
Read button marks one notification as read.
Mark all read button marks all notifications as read.
Detail panel updates from selected notification.
Preferences panel is visible.
Recent trust-flow timeline is visible.
Safety/UX rules card is visible.
Mobile layout is stacked and readable.
All controls have visible focus states.
```

---

# 15. Final UX Summary

```text
The Notifications Screen is the tenant's trust-flow inbox.
It should make every important update visible, actionable, and easy to understand.
The screen must connect payment, proof, access, report, and viewing-code events into one clear notification center.
```
