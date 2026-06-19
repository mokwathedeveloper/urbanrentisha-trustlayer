# UrbanRentisha TrustLayer Search and Filter Page UI/UX Blueprint and Starter Code

## 1. Screen Covered

```text
6. Search and Filter Page only
```

## 2. Page Purpose

The **Search and Filter Page** allows tenants to filter properties by:

```text
Location
Rent range
Verification status
Property type
Viewing fee
Bedrooms
Keyword search
```

The page must help tenants quickly identify verified listings that can proceed to the UrbanRentisha payment-proof viewing workflow.

---

## 3. Design Inspiration Rule

The MantleMandate system is used only as structural inspiration for:

```text
Strict spacing
Dark technical SaaS layout
Clear filters
Card hierarchy
Accessible controls
Professional interaction states
```

Do not copy MantleMandate branding, logo, or blue palette.

UrbanRentisha must keep:

```text
Dark green trust UI
Eco-friendly real estate trust
Verified property search
Stellar payment-proof workflow
Tenant safety
```

---

## 4. UX Goal

The tenant should understand this immediately:

```text
Filters are trust-aware.
Verified listings are prioritized.
Viewing fee is visible before requesting access.
Only verified listings can proceed to the viewing workflow.
```

---

## 5. Final Folder Structure

```text
urbanrentisha-search-filter/
├── app/
│   ├── search/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── search-filter/
│   │   ├── active-filter-chips.tsx
│   │   ├── advanced-filter-panel.tsx
│   │   ├── empty-state.tsx
│   │   ├── logo-mark.tsx
│   │   ├── mobile-filter-drawer.tsx
│   │   ├── results-toolbar.tsx
│   │   ├── saved-search-panel.tsx
│   │   ├── search-control-bar.tsx
│   │   ├── search-filter-page.tsx
│   │   ├── search-header.tsx
│   │   ├── search-hero.tsx
│   │   ├── search-result-card.tsx
│   │   └── search-results-grid.tsx
│   │
│   └── ui/
│       ├── badge.tsx
│       └── button.tsx
│
├── lib/
│   ├── search-filter-data.ts
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
Sticky header
Hero explanation panel
Search bar
Left advanced filters
Middle active chips, toolbar, results grid
Right saved-search and trust summary panel
```

Mobile:

```text
Header
Hero panel
Search bar
Filters button opens drawer
Active filter chips
Results grid one column
```

---

## 7. Interaction Rules

```text
Search input filters title, location, and tags.
Location filter narrows by neighborhood.
Rent range filter narrows by monthly rent.
Viewing fee filter narrows by viewing cost.
Verification status filter narrows by trust status.
Property type filter narrows by listing type.
Verified-only toggle hides pending listings.
Bedroom pills update minimum bedroom count.
Sort control updates result order.
Active chips remove individual filters.
Reset returns default verified-only search.
Mobile filter drawer opens and closes.
Save search button is UI-ready.
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
JetBrains Mono = listing IDs, trust values, hashes, viewing codes only
```

---

## 10. Accessibility Requirements

```text
Search input must have accessible label.
Filter selects must have visible labels.
Mobile drawer must have visible close button.
Chips must have remove labels.
Badges must include text and icons.
Color cannot be the only verification indicator.
All interactive controls must have visible focus rings.
Minimum mobile touch target should be 44px.
```

---

## 11. Implementation Notes

This starter is UI-only.

Connect it later to:

```text
Listings API
Search query params
Supabase/PostgreSQL filtering
Saved searches table
Verified listings index
Request-viewing route
```

Recommended URL query pattern:

```text
/search?location=Kilimani&type=Apartment&verified=true&rent=60-100k
```

---

# 12. Full Starter Code

\n## `package.json`\n\n```json\n{
  "name": "urbanrentisha-search-filter-page",
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
    autoprefixer: {},
  },
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
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
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
          subtle: "#64748B"
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
  title: "Search Properties | UrbanRentisha TrustLayer",
  description: "Search and filter verified rentals by location, rent, verification status, property type, and viewing fee."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
    @apply mx-auto w-full max-w-[1380px] px-5 sm:px-6 lg:px-8;
  }

  .ur-focus {
    @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ur-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ur-bg;
  }

  .search-grid-bg {
    background-image:
      linear-gradient(rgba(22, 163, 74, 0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(22, 163, 74, 0.045) 1px, transparent 1px);
    background-size: 38px 38px;
  }
}
\n```\n\n## `app/page.tsx`\n\n```tsx\nimport { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/search");
}
\n```\n\n## `app/search/page.tsx`\n\n```tsx\nimport { SearchFilterPage } from "@/components/search-filter/search-filter-page";

export default function Page() {
  return <SearchFilterPage />;
}
\n```\n\n## `lib/utils.ts`\n\n```ts\nimport { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
\n```\n\n## `lib/search-filter-data.ts`\n\n```ts\nexport type VerificationStatus = "Verified" | "Pending Review" | "Flagged";
export type PropertyType = "Apartment" | "Studio" | "Townhouse" | "Bedsitter" | "Maisonette";
export type SortMode = "recommended" | "rent-low" | "rent-high" | "trust-high" | "viewing-fee-low";

export type SearchProperty = {
  id: string;
  title: string;
  location: string;
  neighborhood: string;
  rentKes: number;
  viewingFeeKes: number;
  bedrooms: number;
  bathrooms: number;
  sizeSqm: number;
  type: PropertyType;
  verificationStatus: VerificationStatus;
  trustScore: number;
  agentVerified: boolean;
  imageTone: "emerald" | "mint" | "forest" | "cyan" | "lime" | "dark";
  tags: string[];
};

export const searchProperties: SearchProperty[] = [
  {
    id: "UR-LST-1001",
    title: "Kilimani Green View Apartment",
    location: "Kilimani, Nairobi",
    neighborhood: "Kilimani",
    rentKes: 68000,
    viewingFeeKes: 500,
    bedrooms: 2,
    bathrooms: 2,
    sizeSqm: 92,
    type: "Apartment",
    verificationStatus: "Verified",
    trustScore: 97,
    agentVerified: true,
    imageTone: "emerald",
    tags: ["Balcony", "Secure parking", "Near malls"]
  },
  {
    id: "UR-LST-1002",
    title: "Westlands Executive Studio",
    location: "Westlands, Nairobi",
    neighborhood: "Westlands",
    rentKes: 42000,
    viewingFeeKes: 300,
    bedrooms: 1,
    bathrooms: 1,
    sizeSqm: 48,
    type: "Studio",
    verificationStatus: "Verified",
    trustScore: 94,
    agentVerified: true,
    imageTone: "mint",
    tags: ["Lift", "Backup power", "Fiber ready"]
  },
  {
    id: "UR-LST-1003",
    title: "Rongai Family Townhouse",
    location: "Ongata Rongai, Kajiado",
    neighborhood: "Rongai",
    rentKes: 85000,
    viewingFeeKes: 700,
    bedrooms: 3,
    bathrooms: 3,
    sizeSqm: 156,
    type: "Townhouse",
    verificationStatus: "Verified",
    trustScore: 91,
    agentVerified: true,
    imageTone: "forest",
    tags: ["Compound", "Water storage", "Family friendly"]
  },
  {
    id: "UR-LST-1004",
    title: "Kasarani Smart Bedsitter",
    location: "Kasarani, Nairobi",
    neighborhood: "Kasarani",
    rentKes: 18000,
    viewingFeeKes: 200,
    bedrooms: 1,
    bathrooms: 1,
    sizeSqm: 28,
    type: "Bedsitter",
    verificationStatus: "Verified",
    trustScore: 89,
    agentVerified: true,
    imageTone: "lime",
    tags: ["Affordable", "Close to road", "Prepaid meter"]
  },
  {
    id: "UR-LST-1005",
    title: "Lavington Maisonette Residence",
    location: "Lavington, Nairobi",
    neighborhood: "Lavington",
    rentKes: 145000,
    viewingFeeKes: 1000,
    bedrooms: 4,
    bathrooms: 4,
    sizeSqm: 230,
    type: "Maisonette",
    verificationStatus: "Verified",
    trustScore: 98,
    agentVerified: true,
    imageTone: "dark",
    tags: ["DSQ", "Garden", "Gated community"]
  },
  {
    id: "UR-LST-1006",
    title: "Thika Road Two Bedroom",
    location: "Thika Road, Nairobi",
    neighborhood: "Thika Road",
    rentKes: 35000,
    viewingFeeKes: 300,
    bedrooms: 2,
    bathrooms: 1,
    sizeSqm: 72,
    type: "Apartment",
    verificationStatus: "Pending Review",
    trustScore: 74,
    agentVerified: false,
    imageTone: "cyan",
    tags: ["Road access", "Water included", "Shops nearby"]
  }
];

export const locations = ["All locations", "Kilimani", "Westlands", "Rongai", "Kasarani", "Lavington", "Thika Road"];
export const propertyTypes = ["All types", "Apartment", "Studio", "Townhouse", "Bedsitter", "Maisonette"];
export const verificationStatuses = ["Any status", "Verified", "Pending Review", "Flagged"];
export const rentRanges = [
  { label: "Any rent", min: 0, max: Number.MAX_SAFE_INTEGER },
  { label: "Below KES 30K", min: 0, max: 30000 },
  { label: "KES 30K–60K", min: 30000, max: 60000 },
  { label: "KES 60K–100K", min: 60000, max: 100000 },
  { label: "Above KES 100K", min: 100000, max: Number.MAX_SAFE_INTEGER }
];
export const viewingFeeRanges = [
  { label: "Any viewing fee", min: 0, max: Number.MAX_SAFE_INTEGER },
  { label: "KES 0–300", min: 0, max: 300 },
  { label: "KES 301–700", min: 301, max: 700 },
  { label: "KES 701–1,000", min: 701, max: 1000 },
  { label: "Above KES 1,000", min: 1001, max: Number.MAX_SAFE_INTEGER }
];
export const bedroomOptions = ["Any", "1+", "2+", "3+", "4+"];
export const sortOptions: { label: string; value: SortMode }[] = [
  { label: "Recommended", value: "recommended" },
  { label: "Rent: low to high", value: "rent-low" },
  { label: "Rent: high to low", value: "rent-high" },
  { label: "Highest trust score", value: "trust-high" },
  { label: "Lowest viewing fee", value: "viewing-fee-low" }
];
\n```\n\n## `components/ui/button.tsx`\n\n```tsx\nimport * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variants: Record<ButtonVariant, string> = {
  primary: "border border-ur-primary bg-ur-primary text-white hover:bg-ur-primary-hover",
  secondary: "border border-ur-border-strong bg-ur-card text-ur-text hover:bg-ur-card-hover",
  ghost: "border border-transparent bg-transparent text-ur-muted hover:bg-white/5 hover:text-white",
  outline: "border border-white/14 bg-transparent text-white hover:border-ur-primary/60 hover:bg-white/5"
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

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold", variants[variant], className)} {...props} />
  );
}
\n```\n\n## `components/search-filter/logo-mark.tsx`\n\n```tsx\nimport Link from "next/link";
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
\n```\n\n## `components/search-filter/search-filter-page.tsx`\n\n```tsx\n"use client";

import { useMemo, useState } from "react";
import {
  bedroomOptions,
  rentRanges,
  searchProperties,
  viewingFeeRanges,
  type SearchProperty,
  type SortMode
} from "@/lib/search-filter-data";
import { SearchHeader } from "@/components/search-filter/search-header";
import { SearchHero } from "@/components/search-filter/search-hero";
import { SearchControlBar } from "@/components/search-filter/search-control-bar";
import { AdvancedFilterPanel } from "@/components/search-filter/advanced-filter-panel";
import { ActiveFilterChips } from "@/components/search-filter/active-filter-chips";
import { ResultsToolbar } from "@/components/search-filter/results-toolbar";
import { SearchResultsGrid } from "@/components/search-filter/search-results-grid";
import { SavedSearchPanel } from "@/components/search-filter/saved-search-panel";
import { EmptyState } from "@/components/search-filter/empty-state";
import { MobileFilterDrawer } from "@/components/search-filter/mobile-filter-drawer";

export type Filters = {
  query: string;
  location: string;
  propertyType: string;
  verificationStatus: string;
  rentRange: string;
  viewingFeeRange: string;
  bedrooms: string;
  verifiedOnly: boolean;
  sort: SortMode;
};

const defaultFilters: Filters = {
  query: "",
  location: "All locations",
  propertyType: "All types",
  verificationStatus: "Verified",
  rentRange: "Any rent",
  viewingFeeRange: "Any viewing fee",
  bedrooms: "Any",
  verifiedOnly: true,
  sort: "recommended"
};

export function SearchFilterPage() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>(["UR-LST-1001"]);

  const results = useMemo(() => {
    const query = filters.query.trim().toLowerCase();
    const rentRange = rentRanges.find((item) => item.label === filters.rentRange) ?? rentRanges[0];
    const feeRange = viewingFeeRanges.find((item) => item.label === filters.viewingFeeRange) ?? viewingFeeRanges[0];
    const minBedrooms = filters.bedrooms === "Any" ? 0 : Number(filters.bedrooms.replace("+", ""));

    const filtered = searchProperties.filter((property) => {
      const matchesQuery =
        !query ||
        property.title.toLowerCase().includes(query) ||
        property.location.toLowerCase().includes(query) ||
        property.tags.some((tag) => tag.toLowerCase().includes(query));

      const matchesLocation =
        filters.location === "All locations" || property.neighborhood === filters.location;

      const matchesType =
        filters.propertyType === "All types" || property.type === filters.propertyType;

      const matchesStatus =
        filters.verificationStatus === "Any status" ||
        property.verificationStatus === filters.verificationStatus;

      const matchesVerifiedOnly =
        !filters.verifiedOnly || property.verificationStatus === "Verified";

      const matchesRent = property.rentKes >= rentRange.min && property.rentKes <= rentRange.max;
      const matchesFee = property.viewingFeeKes >= feeRange.min && property.viewingFeeKes <= feeRange.max;
      const matchesBedrooms = property.bedrooms >= minBedrooms;

      return matchesQuery && matchesLocation && matchesType && matchesStatus && matchesVerifiedOnly && matchesRent && matchesFee && matchesBedrooms;
    });

    return filtered.sort((a, b) => {
      if (filters.sort === "rent-low") return a.rentKes - b.rentKes;
      if (filters.sort === "rent-high") return b.rentKes - a.rentKes;
      if (filters.sort === "trust-high") return b.trustScore - a.trustScore;
      if (filters.sort === "viewing-fee-low") return a.viewingFeeKes - b.viewingFeeKes;
      return b.trustScore - a.trustScore || a.rentKes - b.rentKes;
    });
  }, [filters]);

  function updateFilter<Key extends keyof Filters>(key: Key, value: Filters[Key]) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  function resetFilters() {
    setFilters(defaultFilters);
  }

  function toggleSaved(property: SearchProperty) {
    setSavedIds((current) =>
      current.includes(property.id)
        ? current.filter((id) => id !== property.id)
        : [...current, property.id]
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 search-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-mint/10 blur-[130px]" />

      <div className="relative z-10">
        <SearchHeader />
        <section className="ur-container pb-12 pt-5">
          <SearchHero />
          <SearchControlBar
            filters={filters}
            resultCount={results.length}
            onFilterChange={updateFilter}
            onOpenMobileFilters={() => setMobileFiltersOpen(true)}
          />

          <div className="mt-5 grid gap-5 lg:grid-cols-[320px_1fr_280px]">
            <AdvancedFilterPanel filters={filters} onFilterChange={updateFilter} onReset={resetFilters} />

            <section>
              <ActiveFilterChips filters={filters} onFilterChange={updateFilter} onReset={resetFilters} />
              <ResultsToolbar resultCount={results.length} filters={filters} onFilterChange={updateFilter} />
              {results.length > 0 ? (
                <SearchResultsGrid
                  properties={results}
                  savedIds={savedIds}
                  onToggleSaved={toggleSaved}
                />
              ) : (
                <EmptyState onReset={resetFilters} />
              )}
            </section>

            <SavedSearchPanel filters={filters} resultCount={results.length} />
          </div>
        </section>
      </div>

      <MobileFilterDrawer
        open={mobileFiltersOpen}
        filters={filters}
        onClose={() => setMobileFiltersOpen(false)}
        onFilterChange={updateFilter}
        onReset={resetFilters}
      />
    </main>
  );
}
\n```\n\n## `components/search-filter/search-header.tsx`\n\n```tsx\nimport Link from "next/link";
import { Bell, LayoutDashboard, Menu, UserRound } from "lucide-react";
import { LogoMark } from "@/components/search-filter/logo-mark";

export function SearchHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ur-bg/78 backdrop-blur-xl">
      <div className="ur-container flex h-20 items-center justify-between">
        <LogoMark />
        <nav className="hidden items-center gap-2 lg:flex" aria-label="Main navigation">
          {[
            { label: "Listings", href: "/listings" },
            { label: "Search", href: "/search", active: true },
            { label: "Proof tracker", href: "/proof-status" },
            { label: "Help", href: "/help" }
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
          <button className="hidden h-10 w-10 place-items-center rounded-ur-sm border border-white/10 text-white/70 transition-colors hover:border-ur-primary/50 hover:bg-white/5 hover:text-white ur-focus sm:grid" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </button>
          <Link href="/tenant/dashboard" className="hidden h-10 items-center gap-2 rounded-ur-sm border border-white/10 px-4 text-sm font-bold text-white/70 transition-colors hover:border-ur-primary/50 hover:bg-white/5 hover:text-white ur-focus sm:inline-flex">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <button className="grid h-10 w-10 place-items-center rounded-ur-sm border border-white/10 text-white/70 transition-colors hover:border-ur-primary/50 hover:bg-white/5 hover:text-white ur-focus" aria-label="User menu">
            <UserRound className="h-4 w-4 sm:hidden" />
            <Menu className="hidden h-4 w-4 sm:block lg:hidden" />
          </button>
        </div>
      </div>
    </header>
  );
}
\n```\n\n## `components/search-filter/search-hero.tsx`\n\n```tsx\nimport { Filter, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function SearchHero() {
  return (
    <section className="mb-5 overflow-hidden rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl lg:p-8">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <Badge variant="success">
            <ShieldCheck className="h-3.5 w-3.5" />
            Verified search controls
          </Badge>
          <h1 className="mt-5 max-w-[820px] text-[42px] font-black leading-[1.02] tracking-[-0.07em] text-white sm:text-[56px]">
            Search rentals by trust, location, rent, and viewing fee.
          </h1>
          <p className="mt-4 max-w-[720px] text-base leading-7 text-white/66">
            Filter properties before starting the secure viewing workflow. Verified listings can move into payment proof and access unlock.
          </p>
        </div>

        <div className="rounded-ur-lg border border-ur-primary/20 bg-ur-primary/8 p-5">
          <Filter className="mb-3 h-6 w-6 text-ur-primary" />
          <p className="text-sm font-black text-white">Trust-first filtering</p>
          <p className="mt-1 max-w-[260px] text-sm leading-6 text-white/56">
            Default search prioritizes verified listings and high trust scores.
          </p>
        </div>
      </div>
    </section>
  );
}
\n```\n\n## `components/search-filter/search-control-bar.tsx`\n\n```tsx\n"use client";

import { Filter, Search } from "lucide-react";
import type { Filters } from "@/components/search-filter/search-filter-page";
import { Button } from "@/components/ui/button";

type SearchControlBarProps = {
  filters: Filters;
  resultCount: number;
  onFilterChange: <Key extends keyof Filters>(key: Key, value: Filters[Key]) => void;
  onOpenMobileFilters: () => void;
};

export function SearchControlBar({ filters, resultCount, onFilterChange, onOpenMobileFilters }: SearchControlBarProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.045] p-4 shadow-soft-dark backdrop-blur-xl">
      <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
        <div className="relative">
          <label htmlFor="search-query" className="sr-only">Search property keyword</label>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/38" />
          <input
            id="search-query"
            value={filters.query}
            onChange={(event) => onFilterChange("query", event.target.value)}
            placeholder="Search by location, property name, amenity, or keyword"
            className="h-12 w-full rounded-ur-sm border border-white/12 bg-ur-input pl-12 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/32 focus:border-ur-primary"
          />
        </div>

        <Button variant="outline" className="lg:hidden" onClick={onOpenMobileFilters}>
          <Filter className="h-4 w-4" />
          Filters
        </Button>

        <div className="hidden items-center rounded-ur-sm border border-ur-primary/20 bg-ur-primary/8 px-4 text-sm font-bold text-ur-mint lg:flex">
          {resultCount} matching listings
        </div>
      </div>
    </section>
  );
}
\n```\n\n## `components/search-filter/advanced-filter-panel.tsx`\n\n```tsx\n"use client";

import { RotateCcw, ShieldCheck } from "lucide-react";
import {
  bedroomOptions,
  locations,
  propertyTypes,
  rentRanges,
  verificationStatuses,
  viewingFeeRanges
} from "@/lib/search-filter-data";
import type { Filters } from "@/components/search-filter/search-filter-page";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  filters: Filters;
  onFilterChange: <Key extends keyof Filters>(key: Key, value: Filters[Key]) => void;
  onReset: () => void;
  compact?: boolean;
};

export function AdvancedFilterPanel({ filters, onFilterChange, onReset, compact = false }: Props) {
  return (
    <aside className={cn("h-fit rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl", !compact && "hidden lg:block lg:sticky lg:top-24")}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black text-white">Advanced filters</p>
          <p className="mt-1 text-xs text-white/42">Filter by trust and viewing cost.</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onReset}>
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>

      <div className="space-y-5">
        <SelectField label="Location" value={filters.location} options={locations} onChange={(value) => onFilterChange("location", value)} />
        <SelectField label="Property type" value={filters.propertyType} options={propertyTypes} onChange={(value) => onFilterChange("propertyType", value)} />
        <SelectField label="Rent range" value={filters.rentRange} options={rentRanges.map((item) => item.label)} onChange={(value) => onFilterChange("rentRange", value)} />
        <SelectField label="Viewing fee" value={filters.viewingFeeRange} options={viewingFeeRanges.map((item) => item.label)} onChange={(value) => onFilterChange("viewingFeeRange", value)} />
        <SelectField label="Verification status" value={filters.verificationStatus} options={verificationStatuses} onChange={(value) => onFilterChange("verificationStatus", value)} />

        <div>
          <p className="mb-2 text-xs font-semibold tracking-[0.04em] text-white/78">Bedrooms</p>
          <div className="grid grid-cols-5 gap-2">
            {bedroomOptions.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onFilterChange("bedrooms", item)}
                className={cn(
                  "h-10 rounded-ur-sm border text-sm font-bold transition-colors ur-focus",
                  filters.bedrooms === item
                    ? "border-ur-primary bg-ur-primary text-white"
                    : "border-white/10 bg-black/16 text-white/58 hover:border-white/20 hover:bg-white/5 hover:text-white"
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <label className="flex cursor-pointer items-center justify-between gap-4 rounded-ur-lg border border-ur-primary/20 bg-ur-primary/8 p-4">
          <span className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 text-ur-primary" />
            <span>
              <span className="block text-sm font-black text-white">Verified only</span>
              <span className="mt-1 block text-xs leading-5 text-white/48">
                Show only listings that can proceed to request viewing.
              </span>
            </span>
          </span>
          <input
            type="checkbox"
            checked={filters.verifiedOnly}
            onChange={(event) => onFilterChange("verifiedOnly", event.target.checked)}
            className="h-5 w-5 rounded border-white/20 bg-ur-input accent-ur-primary"
          />
        </label>
      </div>
    </aside>
  );
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  const id = label.toLowerCase().replaceAll(" ", "-");
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-xs font-semibold tracking-[0.04em] text-white/78">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-ur-sm border border-white/12 bg-ur-input px-3 text-sm text-white outline-none transition-colors focus:border-ur-primary"
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-ur-card text-white">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
\n```\n\n## `components/search-filter/active-filter-chips.tsx`\n\n```tsx\n"use client";

import { X } from "lucide-react";
import type { Filters } from "@/components/search-filter/search-filter-page";
import { Button } from "@/components/ui/button";

type Props = {
  filters: Filters;
  onFilterChange: <Key extends keyof Filters>(key: Key, value: Filters[Key]) => void;
  onReset: () => void;
};

export function ActiveFilterChips({ filters, onFilterChange, onReset }: Props) {
  const chips = [
    filters.query ? { key: "query", label: `Search: ${filters.query}`, reset: "" } : null,
    filters.location !== "All locations" ? { key: "location", label: filters.location, reset: "All locations" } : null,
    filters.propertyType !== "All types" ? { key: "propertyType", label: filters.propertyType, reset: "All types" } : null,
    filters.verificationStatus !== "Any status" ? { key: "verificationStatus", label: filters.verificationStatus, reset: "Any status" } : null,
    filters.rentRange !== "Any rent" ? { key: "rentRange", label: filters.rentRange, reset: "Any rent" } : null,
    filters.viewingFeeRange !== "Any viewing fee" ? { key: "viewingFeeRange", label: filters.viewingFeeRange, reset: "Any viewing fee" } : null,
    filters.bedrooms !== "Any" ? { key: "bedrooms", label: `${filters.bedrooms} bedrooms`, reset: "Any" } : null
  ].filter(Boolean) as { key: keyof Filters; label: string; reset: string }[];

  if (chips.length === 0 && !filters.verifiedOnly) return null;

  return (
    <div className="mb-4 rounded-ur-lg border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl">
      <div className="flex flex-wrap items-center gap-2">
        {filters.verifiedOnly ? (
          <Chip label="Verified only" onRemove={() => onFilterChange("verifiedOnly", false)} />
        ) : null}
        {chips.map((chip) => (
          <Chip
            key={chip.key}
            label={chip.label}
            onRemove={() => onFilterChange(chip.key, chip.reset as never)}
          />
        ))}
        <Button variant="ghost" size="sm" onClick={onReset}>
          Clear all
        </Button>
      </div>
    </div>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-ur-primary/20 bg-ur-primary/10 px-3 py-1 text-xs font-bold text-ur-mint">
      {label}
      <button type="button" onClick={onRemove} className="rounded-full text-ur-mint hover:text-white ur-focus" aria-label={`Remove ${label} filter`}>
        <X className="h-3.5 w-3.5" />
      </button>
    </span>
  );
}
\n```\n\n## `components/search-filter/results-toolbar.tsx`\n\n```tsx\n"use client";

import { SlidersHorizontal } from "lucide-react";
import type { Filters } from "@/components/search-filter/search-filter-page";
import { sortOptions } from "@/lib/search-filter-data";

type ResultsToolbarProps = {
  resultCount: number;
  filters: Filters;
  onFilterChange: <Key extends keyof Filters>(key: Key, value: Filters[Key]) => void;
};

export function ResultsToolbar({ resultCount, filters, onFilterChange }: ResultsToolbarProps) {
  return (
    <div className="mb-4 flex flex-col justify-between gap-3 rounded-ur-lg border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl sm:flex-row sm:items-center">
      <div>
        <p className="text-sm font-black text-white">{resultCount} matching properties</p>
        <p className="mt-1 text-xs text-white/48">Verified results can proceed to payment-proof viewing.</p>
      </div>

      <div className="relative">
        <label htmlFor="sort-mode" className="sr-only">Sort properties</label>
        <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/38" />
        <select
          id="sort-mode"
          value={filters.sort}
          onChange={(event) => onFilterChange("sort", event.target.value as Filters["sort"])}
          className="h-10 min-w-[220px] rounded-ur-sm border border-white/12 bg-ur-input pl-10 pr-3 text-sm font-bold text-white outline-none transition-colors focus:border-ur-primary"
        >
          {sortOptions.map((item) => (
            <option key={item.value} value={item.value} className="bg-ur-card text-white">
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
\n```\n\n## `components/search-filter/search-results-grid.tsx`\n\n```tsx\nimport type { SearchProperty } from "@/lib/search-filter-data";
import { SearchResultCard } from "@/components/search-filter/search-result-card";

type SearchResultsGridProps = {
  properties: SearchProperty[];
  savedIds: string[];
  onToggleSaved: (property: SearchProperty) => void;
};

export function SearchResultsGrid({ properties, savedIds, onToggleSaved }: SearchResultsGridProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {properties.map((property) => (
        <SearchResultCard
          key={property.id}
          property={property}
          saved={savedIds.includes(property.id)}
          onToggleSaved={() => onToggleSaved(property)}
        />
      ))}
    </div>
  );
}
\n```\n\n## `components/search-filter/search-result-card.tsx`\n\n```tsx\nimport Link from "next/link";
import { Bath, BedDouble, Bookmark, Eye, Heart, MapPin, Ruler, ShieldAlert, ShieldCheck, WalletCards } from "lucide-react";
import type { SearchProperty } from "@/lib/search-filter-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SearchResultCardProps = {
  property: SearchProperty;
  saved: boolean;
  onToggleSaved: () => void;
};

const toneStyles: Record<SearchProperty["imageTone"], string> = {
  emerald: "from-emerald-950 via-emerald-800/50 to-black",
  mint: "from-green-950 via-teal-800/45 to-black",
  forest: "from-lime-950 via-green-900/50 to-black",
  cyan: "from-cyan-950 via-emerald-900/40 to-black",
  lime: "from-lime-950 via-emerald-900/45 to-black",
  dark: "from-slate-950 via-emerald-950/55 to-black"
};

export function SearchResultCard({ property, saved, onToggleSaved }: SearchResultCardProps) {
  const verified = property.verificationStatus === "Verified";

  return (
    <article className="group overflow-hidden rounded-ur-xl border border-white/10 bg-white/[0.035] shadow-soft-dark backdrop-blur-xl transition-all duration-150 hover:border-ur-primary/35 hover:bg-white/[0.055] hover:shadow-card-hover">
      <div className={cn("relative h-48 bg-gradient-to-br", toneStyles[property.imageTone])}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_28%,rgba(52,211,153,0.28),transparent_30%)]" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {verified ? (
            <Badge variant="success"><ShieldCheck className="h-3.5 w-3.5" />Verified</Badge>
          ) : (
            <Badge variant="warning"><ShieldAlert className="h-3.5 w-3.5" />Pending</Badge>
          )}
          <Badge variant="neutral">{property.type}</Badge>
        </div>
        <button
          type="button"
          onClick={onToggleSaved}
          aria-label={saved ? "Remove saved property" : "Save property"}
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-ur-sm border border-white/14 bg-black/24 text-white backdrop-blur transition-colors hover:border-ur-primary/60 hover:bg-white/10 ur-focus"
        >
          {saved ? <Heart className="h-4 w-4 fill-ur-primary text-ur-primary" /> : <Bookmark className="h-4 w-4" />}
        </button>
      </div>

      <div className="p-5">
        <div className="mb-4">
          <h2 className="text-lg font-black tracking-[-0.03em] text-white">{property.title}</h2>
          <p className="mt-2 flex items-center gap-2 text-sm text-white/56">
            <MapPin className="h-4 w-4 text-ur-primary" />
            {property.location}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Info label="Rent" value={`KES ${property.rentKes.toLocaleString()}`} />
          <Info label="Viewing fee" value={`KES ${property.viewingFeeKes.toLocaleString()}`} />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <Metric icon={<BedDouble className="h-4 w-4" />} label={`${property.bedrooms} beds`} />
          <Metric icon={<Bath className="h-4 w-4" />} label={`${property.bathrooms} baths`} />
          <Metric icon={<Ruler className="h-4 w-4" />} label={`${property.sizeSqm} sqm`} />
        </div>

        <div className="mt-4 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
          <div className="flex items-center gap-2 text-xs font-bold text-ur-mint">
            <WalletCards className="h-3.5 w-3.5" />
            Proof-ready viewing
          </div>
          <p className="font-mono text-sm font-black text-ur-success">{property.trustScore}%</p>
        </div>

        <Link href={`/properties/${property.id}`} className="mt-5 block">
          <Button className="w-full" disabled={!verified}>
            <Eye className="h-4 w-4" />
            {verified ? "View details" : "Verification pending"}
          </Button>
        </Link>
      </div>
    </article>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-ur-sm border border-white/10 bg-black/16 p-3">
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/38">{label}</p>
      <p className="mt-1 text-sm font-black text-white">{value}</p>
    </div>
  );
}

function Metric({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="rounded-ur-sm border border-white/10 bg-black/16 p-3">
      <div className="mb-1 text-ur-primary">{icon}</div>
      <p className="text-xs font-bold text-white/66">{label}</p>
    </div>
  );
}
\n```\n\n## `components/search-filter/saved-search-panel.tsx`\n\n```tsx\nimport { BellRing, BookmarkCheck, ShieldCheck } from "lucide-react";
import type { Filters } from "@/components/search-filter/search-filter-page";
import { Button } from "@/components/ui/button";

type SavedSearchPanelProps = {
  filters: Filters;
  resultCount: number;
};

export function SavedSearchPanel({ filters, resultCount }: SavedSearchPanelProps) {
  return (
    <aside className="hidden h-fit space-y-5 lg:block lg:sticky lg:top-24">
      <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
        <div className="grid h-12 w-12 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
          <BookmarkCheck className="h-6 w-6" />
        </div>
        <h2 className="mt-4 text-lg font-black text-white">Save this search</h2>
        <p className="mt-2 text-sm leading-6 text-white/56">
          Save the current filter combination and reuse it during future property searches.
        </p>
        <Button className="mt-5 w-full">
          Save search
        </Button>
      </section>

      <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-5 shadow-soft-dark backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 text-ur-primary" />
          <div>
            <p className="font-black text-white">Search trust summary</p>
            <p className="mt-2 text-sm leading-6 text-white/58">
              {resultCount} listings match. Verified-only is {filters.verifiedOnly ? "enabled" : "disabled"}.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <BellRing className="mt-0.5 h-5 w-5 text-ur-primary" />
          <div>
            <p className="font-black text-white">Search alerts</p>
            <p className="mt-2 text-sm leading-6 text-white/58">
              Later, tenants can receive alerts when new verified listings match these filters.
            </p>
          </div>
        </div>
      </section>
    </aside>
  );
}
\n```\n\n## `components/search-filter/mobile-filter-drawer.tsx`\n\n```tsx\n"use client";

import { X } from "lucide-react";
import type { Filters } from "@/components/search-filter/search-filter-page";
import { AdvancedFilterPanel } from "@/components/search-filter/advanced-filter-panel";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  filters: Filters;
  onClose: () => void;
  onFilterChange: <Key extends keyof Filters>(key: Key, value: Filters[Key]) => void;
  onReset: () => void;
};

export function MobileFilterDrawer({ open, filters, onClose, onFilterChange, onReset }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 p-4 backdrop-blur-sm lg:hidden">
      <section className="ml-auto h-full max-w-[420px] overflow-y-auto rounded-ur-xl border border-white/10 bg-ur-bg p-4 shadow-soft-dark">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-black text-white">Filters</h2>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-ur-sm border border-white/10 text-white/64 transition-colors hover:border-ur-primary/50 hover:bg-white/5 hover:text-white ur-focus"
            aria-label="Close filters"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <AdvancedFilterPanel compact filters={filters} onFilterChange={onFilterChange} onReset={onReset} />

        <Button className="mt-4 w-full" size="lg" onClick={onClose}>
          Apply filters
        </Button>
      </section>
    </div>
  );
}
\n```\n\n## `components/search-filter/empty-state.tsx`\n\n```tsx\nimport { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

type EmptyStateProps = {
  onReset: () => void;
};

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-10 text-center backdrop-blur-xl">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-ur-lg bg-ur-primary/10 text-ur-primary">
        <SearchX className="h-7 w-7" />
      </div>
      <h2 className="mt-5 text-2xl font-black tracking-[-0.04em] text-white">
        No properties match these filters.
      </h2>
      <p className="mx-auto mt-3 max-w-[440px] text-sm leading-6 text-white/56">
        Clear filters or broaden your rent, location, verification, or viewing-fee selection.
      </p>
      <Button className="mt-6" onClick={onReset}>
        Reset filters
      </Button>
    </div>
  );
}
\n```\n
---

# 13. Acceptance Checklist

```text
The route /search works.
Google Fonts are loaded.
Inter is used for UI text.
JetBrains Mono is available for technical values.
UrbanRentisha dark green theme is applied.
Search input works.
Location filter works.
Rent range filter works.
Viewing fee filter works.
Verification status filter works.
Property type filter works.
Bedroom filter works.
Verified-only toggle works.
Active chips appear and can remove filters.
Sort control works.
Mobile filter drawer opens and closes.
Empty state appears when no listings match.
Saved search panel is visible on desktop.
```

---

# 14. Final UX Summary

```text
The Search and Filter Page is a trust-aware rental search screen.
Tenants can narrow listings by cost, location, verification, property type, and viewing fee.
The design must make verified listings and proof-ready viewing access clear before the tenant proceeds.
```
