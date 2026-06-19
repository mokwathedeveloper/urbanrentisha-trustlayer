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
