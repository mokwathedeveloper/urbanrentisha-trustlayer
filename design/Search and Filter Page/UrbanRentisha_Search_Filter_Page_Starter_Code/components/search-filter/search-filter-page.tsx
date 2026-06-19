"use client";

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
