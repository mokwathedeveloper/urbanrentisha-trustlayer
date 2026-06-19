# UrbanRentisha TrustLayer Property Listing Page UI/UX Blueprint and Starter Code

## 1. Screen Covered

```text
4. Property Listing Page only
```

## 2. Page Purpose

The **Property Listing Page** shows verified rental listings with property cards, search, filters, and request-viewing buttons.

This page helps tenants:

```text
Search verified rentals
Filter by location, type, price, and bedrooms
See trust score and verification status
Save listings
Request viewing through the secure proof-based access flow
```

---

## 3. Design Inspiration Rule

The provided MantleMandate design system is used only as structural inspiration for:

```text
Strict spacing
Dark SaaS layout
Technical trust tone
Precise filters
Card hierarchy
Accessible interactions
Clean status badges
```

Do not copy MantleMandate branding, logo, or blue palette.

UrbanRentisha must keep its own identity:

```text
Dark green trust UI
Eco-friendly real estate trust
Verified property marketplace
Stellar payment-proof access
Tenant safety
Professional B2B SaaS clarity
```

---

## 4. UX Goal

The tenant should understand this immediately:

```text
Only verified listings are safe for request-viewing.
Request viewing is not ordinary booking.
It starts a secure flow: property → viewing request → Stellar payment → ZK proof → access unlock.
```

---

## 5. Final Folder Structure

```text
urbanrentisha-property-listing/
├── app/
│   ├── listings/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── listings/
│   │   ├── empty-state.tsx
│   │   ├── listing-filter-panel.tsx
│   │   ├── listing-header.tsx
│   │   ├── listing-search-bar.tsx
│   │   ├── listing-stats-bar.tsx
│   │   ├── logo-mark.tsx
│   │   ├── property-card.tsx
│   │   ├── property-grid.tsx
│   │   ├── property-listing-page.tsx
│   │   ├── request-viewing-panel.tsx
│   │   └── verified-badge.tsx
│   │
│   └── ui/
│       ├── badge.tsx
│       ├── button.tsx
│       └── input.tsx
│
├── lib/
│   ├── listings-data.ts
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
Hero title and trust stats
Search and sort bar
Left filter panel
Right property grid
Request-viewing side panel
```

Mobile:

```text
Header
Hero title
Search bar
Filters stacked above listings
Property cards in one column
Request-viewing panel becomes full-width drawer
```

---

## 7. Interaction Rules

```text
Search filters property title, location, and tags.
Location filter narrows by neighborhood.
Property type filter narrows by rental type.
Price filter narrows by price range.
Bedroom filter narrows by bedroom count.
Verified-only toggle hides pending listings.
Sort control changes listing order.
Save button toggles saved state.
Request viewing opens side panel.
Pending listings disable request-viewing button.
Reset button restores default filters.
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
JetBrains Mono = listing IDs, trust score values, hashes, proof codes only
```

Use JetBrains Mono for:

```text
UR-LST-1001
97%
VIEW-8K29XQ
TX hashes later
```

---

## 10. Accessibility Requirements

```text
Search input must have accessible label.
Sort select must have accessible label.
All filters must have visible labels.
Request-viewing drawer must have close button.
Disabled pending-listing buttons must be visually clear.
Color must not be the only verification indicator.
Badges must include text and icons.
All interactive elements must have focus rings.
Minimum mobile touch target should be 44px.
```

---

## 11. Implementation Notes

This starter is UI-only.

Connect it later to:

```text
Listings API
Supabase/PostgreSQL property table
Agent verification status
Tenant session
Request viewing endpoint
Stellar payment creation endpoint
Proof status tracker
Saved listings table
```

Recommended next route after request viewing:

```text
/request-viewing/:propertyId
```

---

# 12. Full Starter Code


## `package.json`

```json
{
  "name": "urbanrentisha-property-listing-page",
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
  title: "Verified Listings | UrbanRentisha TrustLayer",
  description:
    "Browse verified rental listings, filter properties, and request secure viewing access."
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

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  min-height: 100vh;
  background: #060B0A;
  color: #F8FAFC;
  font-family: var(--font-inter);
}
code, pre, .font-mono { font-family: var(--font-mono); }
::selection { background: rgba(22, 163, 74, 0.35); }

@layer utilities {
  .ur-container { @apply mx-auto w-full max-w-[1380px] px-5 sm:px-6 lg:px-8; }
  .ur-focus { @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ur-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ur-bg; }
  .listing-grid-bg {
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
  redirect("/listings");
}

```

## `app/listings/page.tsx`

```tsx
import { PropertyListingPage } from "@/components/listings/property-listing-page";

export default function Page() {
  return <PropertyListingPage />;
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

## `lib/listings-data.ts`

```ts
export type PropertyType = "Apartment" | "Studio" | "Townhouse" | "Bedsitter" | "Maisonette";
export type VerificationStatus = "Verified" | "Pending Review";

export type PropertyListing = {
  id: string;
  title: string;
  location: string;
  neighborhood: string;
  priceKes: number;
  bedrooms: number;
  bathrooms: number;
  type: PropertyType;
  sizeSqm: number;
  agentName: string;
  agentVerified: boolean;
  verificationStatus: VerificationStatus;
  trustScore: number;
  viewingFeeKes: number;
  imageTone: "emerald" | "mint" | "forest" | "cyan" | "lime" | "dark";
  tags: string[];
  availableFrom: string;
  description: string;
};

export const propertyListings: PropertyListing[] = [
  {
    id: "UR-LST-1001",
    title: "Kilimani Green View Apartment",
    location: "Kilimani, Nairobi",
    neighborhood: "Kilimani",
    priceKes: 68000,
    bedrooms: 2,
    bathrooms: 2,
    type: "Apartment",
    sizeSqm: 92,
    agentName: "Amina Realty Group",
    agentVerified: true,
    verificationStatus: "Verified",
    trustScore: 97,
    viewingFeeKes: 500,
    imageTone: "emerald",
    tags: ["Balcony", "Secure parking", "Near malls"],
    availableFrom: "Available now",
    description: "Verified two-bedroom apartment with controlled viewing access and agent verification."
  },
  {
    id: "UR-LST-1002",
    title: "Westlands Executive Studio",
    location: "Westlands, Nairobi",
    neighborhood: "Westlands",
    priceKes: 42000,
    bedrooms: 1,
    bathrooms: 1,
    type: "Studio",
    sizeSqm: 48,
    agentName: "Urban Nest Agents",
    agentVerified: true,
    verificationStatus: "Verified",
    trustScore: 94,
    viewingFeeKes: 300,
    imageTone: "mint",
    tags: ["Lift", "Backup power", "Fiber ready"],
    availableFrom: "Available in 5 days",
    description: "Compact verified studio for tenants needing secure access near business hubs."
  },
  {
    id: "UR-LST-1003",
    title: "Rongai Family Townhouse",
    location: "Ongata Rongai, Kajiado",
    neighborhood: "Rongai",
    priceKes: 85000,
    bedrooms: 3,
    bathrooms: 3,
    type: "Townhouse",
    sizeSqm: 156,
    agentName: "Savanna Homes",
    agentVerified: true,
    verificationStatus: "Verified",
    trustScore: 91,
    viewingFeeKes: 700,
    imageTone: "forest",
    tags: ["Compound", "Water storage", "Family friendly"],
    availableFrom: "Available now",
    description: "Verified townhouse with clear agent accountability and payment-proof viewing request."
  },
  {
    id: "UR-LST-1004",
    title: "Kasarani Smart Bedsitter",
    location: "Kasarani, Nairobi",
    neighborhood: "Kasarani",
    priceKes: 18000,
    bedrooms: 1,
    bathrooms: 1,
    type: "Bedsitter",
    sizeSqm: 28,
    agentName: "Metro Lets Kenya",
    agentVerified: true,
    verificationStatus: "Verified",
    trustScore: 89,
    viewingFeeKes: 200,
    imageTone: "lime",
    tags: ["Affordable", "Close to road", "Prepaid meter"],
    availableFrom: "Available now",
    description: "Affordable verified bedsitter with low viewing fee and controlled access unlock."
  },
  {
    id: "UR-LST-1005",
    title: "Lavington Maisonette Residence",
    location: "Lavington, Nairobi",
    neighborhood: "Lavington",
    priceKes: 145000,
    bedrooms: 4,
    bathrooms: 4,
    type: "Maisonette",
    sizeSqm: 230,
    agentName: "Prime Habitat",
    agentVerified: true,
    verificationStatus: "Verified",
    trustScore: 98,
    viewingFeeKes: 1000,
    imageTone: "dark",
    tags: ["DSQ", "Garden", "Gated community"],
    availableFrom: "Available in 2 weeks",
    description: "Premium verified residence with strong trust score and secure viewing workflow."
  },
  {
    id: "UR-LST-1006",
    title: "Thika Road Two Bedroom",
    location: "Thika Road, Nairobi",
    neighborhood: "Thika Road",
    priceKes: 35000,
    bedrooms: 2,
    bathrooms: 1,
    type: "Apartment",
    sizeSqm: 72,
    agentName: "Greenline Properties",
    agentVerified: false,
    verificationStatus: "Pending Review",
    trustScore: 74,
    viewingFeeKes: 300,
    imageTone: "cyan",
    tags: ["Road access", "Water included", "Shops nearby"],
    availableFrom: "Pending verification",
    description: "Listing pending final agent verification. Viewing request should remain disabled until verified."
  }
];

export const neighborhoods = ["All locations", "Kilimani", "Westlands", "Rongai", "Kasarani", "Lavington", "Thika Road"];
export const propertyTypes = ["All types", "Apartment", "Studio", "Townhouse", "Bedsitter", "Maisonette"] as const;
export const priceRanges = [
  { label: "Any price", min: 0, max: Number.MAX_SAFE_INTEGER },
  { label: "Below KES 30K", min: 0, max: 30000 },
  { label: "KES 30K–60K", min: 30000, max: 60000 },
  { label: "KES 60K–100K", min: 60000, max: 100000 },
  { label: "Above KES 100K", min: 100000, max: Number.MAX_SAFE_INTEGER }
];
export const bedroomFilters = ["Any", "1+", "2+", "3+", "4+"] as const;
export type SortOption = "recommended" | "price-low" | "price-high" | "trust-high";
export const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Recommended", value: "recommended" },
  { label: "Lowest price", value: "price-low" },
  { label: "Highest price", value: "price-high" },
  { label: "Highest trust score", value: "trust-high" }
];

```

## `components/ui/button.tsx`

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "warning";
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
  warning: "border border-ur-warning/30 bg-ur-warning-bg text-ur-warning hover:bg-ur-warning/15"
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-10 px-5 text-sm",
  lg: "h-[52px] px-8 text-base"
};

export function Button({ className, variant = "primary", size = "md", type = "button", ...props }: ButtonProps) {
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

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold", variants[variant], className)} {...props} />
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
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, helperText, id, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className="space-y-2">
        <label htmlFor={inputId} className="block text-xs font-semibold tracking-[0.04em] text-white/78">
          {label}
        </label>
        <input
          id={inputId}
          ref={ref}
          className={cn("h-11 w-full rounded-ur-sm border border-white/12 bg-ur-input px-3 text-sm text-white outline-none transition-colors placeholder:text-white/32 focus:border-ur-primary", className)}
          {...props}
        />
        {helperText ? <p className="text-xs text-ur-subtle">{helperText}</p> : null}
      </div>
    );
  }
);
Input.displayName = "Input";

```

## `components/listings/logo-mark.tsx`

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
        <p className="text-xl font-black tracking-[-0.04em] text-white">Urban<span className="text-ur-primary">Rentisha</span></p>
        <p className="text-sm font-semibold text-ur-muted">TrustLayer</p>
      </div>
    </Link>
  );
}

```

## `components/listings/property-listing-page.tsx`

```tsx
"use client";

import { useMemo, useState } from "react";
import { bedroomFilters, neighborhoods, priceRanges, propertyListings, propertyTypes, type PropertyListing, type SortOption } from "@/lib/listings-data";
import { ListingHeader } from "@/components/listings/listing-header";
import { ListingStatsBar } from "@/components/listings/listing-stats-bar";
import { ListingSearchBar } from "@/components/listings/listing-search-bar";
import { ListingFilterPanel } from "@/components/listings/listing-filter-panel";
import { PropertyGrid } from "@/components/listings/property-grid";
import { RequestViewingPanel } from "@/components/listings/request-viewing-panel";
import { EmptyState } from "@/components/listings/empty-state";

export type ListingFilters = {
  search: string;
  neighborhood: string;
  type: string;
  priceRange: string;
  bedrooms: string;
  verifiedOnly: boolean;
  sort: SortOption;
};

const defaultFilters: ListingFilters = {
  search: "",
  neighborhood: neighborhoods[0],
  type: propertyTypes[0],
  priceRange: priceRanges[0].label,
  bedrooms: bedroomFilters[0],
  verifiedOnly: true,
  sort: "recommended"
};

export function PropertyListingPage() {
  const [filters, setFilters] = useState<ListingFilters>(defaultFilters);
  const [selectedProperty, setSelectedProperty] = useState<PropertyListing | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>(["UR-LST-1001"]);

  const filteredListings = useMemo(() => {
    const search = filters.search.trim().toLowerCase();
    const selectedPrice = priceRanges.find((range) => range.label === filters.priceRange) ?? priceRanges[0];
    const selectedBedrooms = filters.bedrooms === "Any" ? 0 : Number(filters.bedrooms.replace("+", ""));

    const result = propertyListings.filter((property) => {
      const matchesSearch = search.length === 0 || property.title.toLowerCase().includes(search) || property.location.toLowerCase().includes(search) || property.tags.some((tag) => tag.toLowerCase().includes(search));
      const matchesNeighborhood = filters.neighborhood === "All locations" || property.neighborhood === filters.neighborhood;
      const matchesType = filters.type === "All types" || property.type === filters.type;
      const matchesPrice = property.priceKes >= selectedPrice.min && property.priceKes <= selectedPrice.max;
      const matchesBedrooms = property.bedrooms >= selectedBedrooms;
      const matchesVerified = !filters.verifiedOnly || property.verificationStatus === "Verified";
      return matchesSearch && matchesNeighborhood && matchesType && matchesPrice && matchesBedrooms && matchesVerified;
    });

    return result.sort((a, b) => {
      if (filters.sort === "price-low") return a.priceKes - b.priceKes;
      if (filters.sort === "price-high") return b.priceKes - a.priceKes;
      if (filters.sort === "trust-high") return b.trustScore - a.trustScore;
      return b.trustScore - a.trustScore || a.priceKes - b.priceKes;
    });
  }, [filters]);

  function updateFilter<Key extends keyof ListingFilters>(key: Key, value: ListingFilters[Key]) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  function resetFilters() { setFilters(defaultFilters); }

  function toggleSaved(id: string) {
    setSavedIds((current) => current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id]);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 listing-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-mint/10 blur-[130px]" />
      <div className="relative z-10">
        <ListingHeader />
        <section className="ur-container pb-12 pt-5">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">Verified rental marketplace</p>
            <div className="mt-3 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
              <div>
                <h1 className="max-w-[780px] text-[42px] font-black leading-[1.02] tracking-[-0.07em] text-white sm:text-[56px]">Browse verified rentals before requesting access.</h1>
                <p className="mt-4 max-w-[700px] text-base leading-7 text-white/66">Search trusted listings, compare verification status, and request a viewing only through the payment-proof access flow.</p>
              </div>
              <ListingStatsBar listings={propertyListings} />
            </div>
          </div>
          <ListingSearchBar filters={filters} onFilterChange={updateFilter} />
          <div className="mt-5 grid gap-5 lg:grid-cols-[310px_1fr]">
            <ListingFilterPanel filters={filters} onFilterChange={updateFilter} onReset={resetFilters} />
            <section>
              <div className="mb-4 flex flex-col justify-between gap-3 rounded-ur-lg border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-black text-white">{filteredListings.length} verified-ready listings found</p>
                  <p className="mt-1 text-xs text-white/48">Request viewing is enabled only for verified listings.</p>
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-ur-mint">ZK payment proof before access</p>
              </div>
              {filteredListings.length > 0 ? (
                <PropertyGrid listings={filteredListings} savedIds={savedIds} onToggleSaved={toggleSaved} onRequestViewing={setSelectedProperty} />
              ) : (
                <EmptyState onReset={resetFilters} />
              )}
            </section>
          </div>
        </section>
      </div>
      <RequestViewingPanel property={selectedProperty} onClose={() => setSelectedProperty(null)} />
    </main>
  );
}

```

## `components/listings/listing-header.tsx`

```tsx
import Link from "next/link";
import { Bell, LayoutDashboard, Menu, UserRound } from "lucide-react";
import { LogoMark } from "@/components/listings/logo-mark";

export function ListingHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ur-bg/78 backdrop-blur-xl">
      <div className="ur-container flex h-20 items-center justify-between">
        <LogoMark />
        <nav className="hidden items-center gap-2 lg:flex" aria-label="Main navigation">
          {[
            { label: "Listings", href: "/listings", active: true },
            { label: "How it works", href: "/tenant/onboarding", active: false },
            { label: "Proof tracker", href: "/proof-status", active: false },
            { label: "Help", href: "/help", active: false }
          ].map((item) => (
            <Link key={item.label} href={item.href} className={item.active ? "rounded-ur-sm bg-ur-primary/10 px-4 py-2 text-sm font-bold text-ur-mint ur-focus" : "rounded-ur-sm px-4 py-2 text-sm font-bold text-white/56 transition-colors hover:bg-white/5 hover:text-white ur-focus"}>{item.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button type="button" className="hidden h-10 w-10 place-items-center rounded-ur-sm border border-white/10 text-white/70 transition-colors hover:border-ur-primary/50 hover:bg-white/5 hover:text-white ur-focus sm:grid" aria-label="Notifications"><Bell className="h-4 w-4" /></button>
          <Link href="/tenant/dashboard" className="hidden h-10 items-center gap-2 rounded-ur-sm border border-white/10 px-4 text-sm font-bold text-white/70 transition-colors hover:border-ur-primary/50 hover:bg-white/5 hover:text-white ur-focus sm:inline-flex"><LayoutDashboard className="h-4 w-4" />Dashboard</Link>
          <button type="button" className="grid h-10 w-10 place-items-center rounded-ur-sm border border-white/10 text-white/70 transition-colors hover:border-ur-primary/50 hover:bg-white/5 hover:text-white ur-focus" aria-label="User menu"><UserRound className="h-4 w-4 sm:hidden" /><Menu className="hidden h-4 w-4 sm:block lg:hidden" /></button>
        </div>
      </div>
    </header>
  );
}

```

## `components/listings/listing-stats-bar.tsx`

```tsx
import { BadgeCheck, Building2, ShieldCheck } from "lucide-react";
import type { PropertyListing } from "@/lib/listings-data";

type ListingStatsBarProps = { listings: PropertyListing[] };

export function ListingStatsBar({ listings }: ListingStatsBarProps) {
  const verifiedCount = listings.filter((listing) => listing.verificationStatus === "Verified").length;
  const averageTrust = Math.round(listings.reduce((total, listing) => total + listing.trustScore, 0) / listings.length);
  return (
    <div className="grid min-w-[320px] grid-cols-3 gap-2 rounded-ur-lg border border-white/10 bg-white/[0.035] p-3 backdrop-blur-xl">
      <Stat icon={<Building2 className="h-4 w-4" />} label="Listings" value={listings.length.toString()} />
      <Stat icon={<BadgeCheck className="h-4 w-4" />} label="Verified" value={verifiedCount.toString()} />
      <Stat icon={<ShieldCheck className="h-4 w-4" />} label="Trust" value={`${averageTrust}%`} />
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-ur-sm border border-white/10 bg-black/16 p-3">
      <div className="mb-2 text-ur-primary">{icon}</div>
      <p className="text-lg font-black text-white">{value}</p>
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/38">{label}</p>
    </div>
  );
}

```

## `components/listings/listing-search-bar.tsx`

```tsx
"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import type { ListingFilters } from "@/components/listings/property-listing-page";
import { sortOptions } from "@/lib/listings-data";

type ListingSearchBarProps = {
  filters: ListingFilters;
  onFilterChange: <Key extends keyof ListingFilters>(key: Key, value: ListingFilters[Key]) => void;
};

export function ListingSearchBar({ filters, onFilterChange }: ListingSearchBarProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.045] p-4 shadow-soft-dark backdrop-blur-xl">
      <div className="grid gap-3 lg:grid-cols-[1fr_240px]">
        <div className="relative">
          <label htmlFor="listing-search" className="sr-only">Search listings</label>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/38" />
          <input id="listing-search" value={filters.search} onChange={(event) => onFilterChange("search", event.target.value)} placeholder="Search by property name, location, or feature" className="h-12 w-full rounded-ur-sm border border-white/12 bg-ur-input pl-12 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/32 focus:border-ur-primary" />
        </div>
        <div className="relative">
          <label htmlFor="sort" className="sr-only">Sort listings</label>
          <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/38" />
          <select id="sort" value={filters.sort} onChange={(event) => onFilterChange("sort", event.target.value as ListingFilters["sort"])} className="h-12 w-full appearance-none rounded-ur-sm border border-white/12 bg-ur-input pl-11 pr-4 text-sm font-bold text-white outline-none transition-colors focus:border-ur-primary">
            {sortOptions.map((option) => (<option key={option.value} value={option.value} className="bg-ur-card text-white">{option.label}</option>))}
          </select>
        </div>
      </div>
    </section>
  );
}

```

## `components/listings/listing-filter-panel.tsx`

```tsx
"use client";

import { RotateCcw, ShieldCheck } from "lucide-react";
import type { ListingFilters } from "@/components/listings/property-listing-page";
import { bedroomFilters, neighborhoods, priceRanges, propertyTypes } from "@/lib/listings-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ListingFilterPanelProps = {
  filters: ListingFilters;
  onFilterChange: <Key extends keyof ListingFilters>(key: Key, value: ListingFilters[Key]) => void;
  onReset: () => void;
};

export function ListingFilterPanel({ filters, onFilterChange, onReset }: ListingFilterPanelProps) {
  return (
    <aside className="h-fit rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl lg:sticky lg:top-24">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div><p className="text-sm font-black text-white">Filters</p><p className="mt-1 text-xs text-white/42">Refine verified rental search.</p></div>
        <Button variant="ghost" size="sm" onClick={onReset}><RotateCcw className="h-4 w-4" />Reset</Button>
      </div>
      <div className="space-y-5">
        <SelectField label="Location" value={filters.neighborhood} options={neighborhoods} onChange={(value) => onFilterChange("neighborhood", value)} />
        <SelectField label="Property type" value={filters.type} options={[...propertyTypes]} onChange={(value) => onFilterChange("type", value)} />
        <SelectField label="Price range" value={filters.priceRange} options={priceRanges.map((range) => range.label)} onChange={(value) => onFilterChange("priceRange", value)} />
        <div>
          <p className="mb-2 text-xs font-semibold tracking-[0.04em] text-white/78">Bedrooms</p>
          <div className="grid grid-cols-5 gap-2">
            {bedroomFilters.map((item) => (
              <button key={item} type="button" onClick={() => onFilterChange("bedrooms", item)} className={cn("h-10 rounded-ur-sm border text-sm font-bold transition-colors ur-focus", filters.bedrooms === item ? "border-ur-primary bg-ur-primary text-white" : "border-white/10 bg-black/16 text-white/58 hover:border-white/20 hover:bg-white/5 hover:text-white")}>{item}</button>
            ))}
          </div>
        </div>
        <label className="flex cursor-pointer items-center justify-between gap-4 rounded-ur-lg border border-ur-primary/20 bg-ur-primary/8 p-4">
          <span className="flex items-start gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 text-ur-primary" /><span><span className="block text-sm font-black text-white">Verified only</span><span className="mt-1 block text-xs leading-5 text-white/48">Hide listings that are still pending agent or property verification.</span></span></span>
          <input type="checkbox" checked={filters.verifiedOnly} onChange={(event) => onFilterChange("verifiedOnly", event.target.checked)} className="h-5 w-5 rounded border-white/20 bg-ur-input accent-ur-primary" />
        </label>
      </div>
    </aside>
  );
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  const id = label.toLowerCase().replaceAll(" ", "-");
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-xs font-semibold tracking-[0.04em] text-white/78">{label}</label>
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)} className="h-11 w-full rounded-ur-sm border border-white/12 bg-ur-input px-3 text-sm text-white outline-none transition-colors focus:border-ur-primary">
        {options.map((option) => (<option key={option} value={option} className="bg-ur-card text-white">{option}</option>))}
      </select>
    </div>
  );
}

```

## `components/listings/property-grid.tsx`

```tsx
import type { PropertyListing } from "@/lib/listings-data";
import { PropertyCard } from "@/components/listings/property-card";

type PropertyGridProps = {
  listings: PropertyListing[];
  savedIds: string[];
  onToggleSaved: (id: string) => void;
  onRequestViewing: (property: PropertyListing) => void;
};

export function PropertyGrid({ listings, savedIds, onToggleSaved, onRequestViewing }: PropertyGridProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {listings.map((property) => (
        <PropertyCard key={property.id} property={property} saved={savedIds.includes(property.id)} onToggleSaved={() => onToggleSaved(property.id)} onRequestViewing={() => onRequestViewing(property)} />
      ))}
    </div>
  );
}

```

## `components/listings/property-card.tsx`

```tsx
import { Bath, BedDouble, Bookmark, CalendarDays, Eye, Heart, MapPin, Ruler, ShieldCheck } from "lucide-react";
import type { PropertyListing } from "@/lib/listings-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VerifiedBadge } from "@/components/listings/verified-badge";
import { cn } from "@/lib/utils";

type PropertyCardProps = {
  property: PropertyListing;
  saved: boolean;
  onToggleSaved: () => void;
  onRequestViewing: () => void;
};

const toneStyles: Record<PropertyListing["imageTone"], string> = {
  emerald: "from-emerald-950 via-emerald-800/50 to-black",
  mint: "from-green-950 via-teal-800/45 to-black",
  forest: "from-lime-950 via-green-900/50 to-black",
  cyan: "from-cyan-950 via-emerald-900/40 to-black",
  lime: "from-lime-950 via-emerald-900/45 to-black",
  dark: "from-slate-950 via-emerald-950/55 to-black"
};

export function PropertyCard({ property, saved, onToggleSaved, onRequestViewing }: PropertyCardProps) {
  const verified = property.verificationStatus === "Verified";
  return (
    <article className="group overflow-hidden rounded-ur-xl border border-white/10 bg-white/[0.035] shadow-soft-dark backdrop-blur-xl transition-all duration-150 hover:border-ur-primary/35 hover:bg-white/[0.055] hover:shadow-card-hover">
      <div className={cn("relative h-52 bg-gradient-to-br", toneStyles[property.imageTone])}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_28%,rgba(52,211,153,0.28),transparent_30%)]" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2"><VerifiedBadge status={property.verificationStatus} /><Badge variant="neutral">{property.type}</Badge></div>
        <button type="button" onClick={onToggleSaved} aria-label={saved ? "Remove saved listing" : "Save listing"} className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-ur-sm border border-white/14 bg-black/24 text-white backdrop-blur transition-colors hover:border-ur-primary/60 hover:bg-white/10 ur-focus">
          {saved ? <Heart className="h-4 w-4 fill-ur-primary text-ur-primary" /> : <Bookmark className="h-4 w-4" />}
        </button>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="rounded-ur-lg border border-white/10 bg-black/30 p-4 backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-white/44">Monthly rent</p><p className="mt-1 text-2xl font-black text-white">KES {property.priceKes.toLocaleString()}</p></div>
              <div className="rounded-ur-sm border border-ur-primary/25 bg-ur-success-bg px-3 py-2 text-right"><p className="text-[11px] font-bold uppercase tracking-[0.12em] text-ur-success">Trust</p><p className="font-mono text-lg font-bold text-ur-success">{property.trustScore}%</p></div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="mb-4"><h2 className="text-lg font-black tracking-[-0.03em] text-white">{property.title}</h2><p className="mt-2 flex items-center gap-2 text-sm text-white/56"><MapPin className="h-4 w-4 text-ur-primary" />{property.location}</p></div>
        <p className="line-clamp-2 text-sm leading-6 text-white/58">{property.description}</p>
        <div className="mt-4 grid grid-cols-3 gap-2"><Metric icon={<BedDouble className="h-4 w-4" />} label={`${property.bedrooms} beds`} /><Metric icon={<Bath className="h-4 w-4" />} label={`${property.bathrooms} baths`} /><Metric icon={<Ruler className="h-4 w-4" />} label={`${property.sizeSqm} sqm`} /></div>
        <div className="mt-4 flex flex-wrap gap-2">{property.tags.slice(0, 3).map((tag) => (<span key={tag} className="rounded-full border border-white/10 bg-black/14 px-3 py-1 text-xs font-semibold text-white/52">{tag}</span>))}</div>
        <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
          <div><p className="flex items-center gap-2 text-xs font-bold text-white/72"><CalendarDays className="h-3.5 w-3.5 text-ur-primary" />{property.availableFrom}</p><p className="mt-1 text-xs text-white/42">Viewing fee: KES {property.viewingFeeKes.toLocaleString()}</p></div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-ur-mint"><ShieldCheck className="h-3.5 w-3.5" />{property.agentVerified ? "Agent verified" : "Agent pending"}</div>
        </div>
        <Button className="mt-5 w-full" disabled={!verified} onClick={onRequestViewing}><Eye className="h-4 w-4" />{verified ? "Request viewing" : "Verification pending"}</Button>
      </div>
    </article>
  );
}

function Metric({ icon, label }: { icon: React.ReactNode; label: string }) {
  return <div className="rounded-ur-sm border border-white/10 bg-black/16 p-3"><div className="mb-1 text-ur-primary">{icon}</div><p className="text-xs font-bold text-white/66">{label}</p></div>;
}

```

## `components/listings/verified-badge.tsx`

```tsx
import { AlertTriangle, ShieldCheck } from "lucide-react";
import type { VerificationStatus } from "@/lib/listings-data";
import { Badge } from "@/components/ui/badge";

type VerifiedBadgeProps = { status: VerificationStatus };

export function VerifiedBadge({ status }: VerifiedBadgeProps) {
  if (status === "Verified") {
    return <Badge variant="success"><ShieldCheck className="h-3.5 w-3.5" />Verified</Badge>;
  }
  return <Badge variant="warning"><AlertTriangle className="h-3.5 w-3.5" />Pending</Badge>;
}

```

## `components/listings/request-viewing-panel.tsx`

```tsx
"use client";

import { X, ArrowRight, LockKeyhole, ReceiptText, ShieldCheck, Wallet } from "lucide-react";
import type { PropertyListing } from "@/lib/listings-data";
import { Button } from "@/components/ui/button";

type RequestViewingPanelProps = { property: PropertyListing | null; onClose: () => void };

export function RequestViewingPanel({ property, onClose }: RequestViewingPanelProps) {
  const open = Boolean(property);
  return (
    <div className={open ? "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" : "pointer-events-none fixed inset-0 z-50 bg-black/0"} aria-hidden={!open}>
      <aside className={open ? "absolute right-0 top-0 h-full w-full max-w-[460px] translate-x-0 border-l border-white/10 bg-ur-bg p-5 shadow-soft-dark transition-transform duration-200" : "absolute right-0 top-0 h-full w-full max-w-[460px] translate-x-full border-l border-white/10 bg-ur-bg p-5 shadow-soft-dark transition-transform duration-200"} aria-label="Request viewing panel">
        {property ? (
          <div className="flex h-full flex-col">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">Secure viewing request</p><h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">Request viewing</h2></div>
              <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-ur-sm border border-white/10 text-white/64 transition-colors hover:border-ur-primary/50 hover:bg-white/5 hover:text-white ur-focus" aria-label="Close request viewing panel"><X className="h-4 w-4" /></button>
            </div>
            <div className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5">
              <p className="text-lg font-black text-white">{property.title}</p><p className="mt-2 text-sm text-white/56">{property.location}</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <InfoTile label="Rent" value={`KES ${property.priceKes.toLocaleString()}`} />
                <InfoTile label="Viewing fee" value={`KES ${property.viewingFeeKes.toLocaleString()}`} />
                <InfoTile label="Trust score" value={`${property.trustScore}%`} />
                <InfoTile label="Listing ID" value={property.id} mono />
              </div>
            </div>
            <div className="mt-5 space-y-3">
              <FlowItem icon={<ReceiptText className="h-5 w-5" />} title="1. Create viewing request" description="The request links the tenant, property, agent, and required viewing fee." />
              <FlowItem icon={<Wallet className="h-5 w-5" />} title="2. Pay through Stellar" description="The payment condition is tracked before viewing access is released." />
              <FlowItem icon={<LockKeyhole className="h-5 w-5" />} title="3. Generate ZK payment proof" description="Proof confirms payment without exposing unrelated wallet activity." />
              <FlowItem icon={<ShieldCheck className="h-5 w-5" />} title="4. Unlock viewing details" description="Viewing code unlocks only after proof verification succeeds." />
            </div>
            <div className="mt-auto pt-5"><Button className="w-full" size="lg">Continue to request<ArrowRight className="h-4 w-4" /></Button><p className="mt-3 text-center text-xs leading-5 text-white/42">Access details stay locked until payment proof verification is complete.</p></div>
          </div>
        ) : null}
      </aside>
    </div>
  );
}

function InfoTile({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return <div className="rounded-ur-sm border border-white/10 bg-black/16 p-3"><p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/38">{label}</p><p className={mono ? "mt-1 font-mono text-xs font-bold text-ur-mint" : "mt-1 text-sm font-black text-white"}>{value}</p></div>;
}

function FlowItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return <div className="rounded-ur-lg border border-white/10 bg-white/[0.035] p-4"><div className="flex gap-3"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">{icon}</div><div><p className="text-sm font-black text-white">{title}</p><p className="mt-1 text-sm leading-6 text-white/56">{description}</p></div></div></div>;
}

```

## `components/listings/empty-state.tsx`

```tsx
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

type EmptyStateProps = { onReset: () => void };

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-10 text-center backdrop-blur-xl">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-ur-lg bg-ur-primary/10 text-ur-primary"><SearchX className="h-7 w-7" /></div>
      <h2 className="mt-5 text-2xl font-black tracking-[-0.04em] text-white">No listings match these filters.</h2>
      <p className="mx-auto mt-3 max-w-[440px] text-sm leading-6 text-white/56">Clear filters or broaden the search to view more verified rental options.</p>
      <Button className="mt-6" onClick={onReset}>Reset filters</Button>
    </div>
  );
}

```

---

# 13. Acceptance Checklist

Before approving this page, confirm:

```text
The route /listings works.
Google Fonts are loaded.
Inter is used for UI text.
JetBrains Mono is used for listing IDs and trust values.
UrbanRentisha dark green theme is applied.
Search works.
Location filter works.
Property type filter works.
Price filter works.
Bedroom filter works.
Verified-only toggle works.
Sort control works.
Saved listing toggle works.
Request viewing panel opens.
Request viewing panel closes.
Pending listings cannot be requested.
Property cards show price, location, trust score, and verified status.
Mobile layout is readable and stacked.
All controls have focus states.
```

---

# 14. Final UX Summary

The Property Listing Page should communicate one clear message:

```text
These are not ordinary rental cards.
Each listing carries trust status.
The tenant can search and compare properties.
Viewing access starts only through the secure payment-proof workflow.
```
