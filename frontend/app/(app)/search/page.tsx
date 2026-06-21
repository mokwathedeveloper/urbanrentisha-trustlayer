"use client";

import { useEffect, useMemo, useState } from "react";
import { api, type Listing } from "@/lib/api";
import { PropertyCard } from "@/components/listings/property-card";
import {
  SearchFilterPanel,
  DEFAULT_SEARCH_FILTERS,
  type SearchFilters,
} from "@/components/listings/search-filter-panel";
import { FilterChips } from "@/components/listings/filter-chips";
import { SavedSearchesPanel } from "@/components/listings/saved-searches-panel";
import { TrustStrip } from "@/components/listings/trust-strip";
import { Icon } from "@/components/ui/icon";

export default function SearchPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"newest" | "price-asc" | "price-desc">("newest");
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_SEARCH_FILTERS);

  useEffect(() => {
    api.listings
      .findAll()
      .then(setListings)
      .finally(() => setLoading(false));
  }, []);

  const locations = useMemo(() => Array.from(new Set(listings.map((l) => l.location))), [listings]);

  const filtered = useMemo(() => {
    let result = listings.filter((listing) => {
      const matchesSearch =
        !search ||
        listing.title.toLowerCase().includes(search.toLowerCase()) ||
        listing.location.toLowerCase().includes(search.toLowerCase());
      const matchesLocation = !filters.location || listing.location === filters.location;
      const matchesRent = listing.rentAmount >= filters.minRent && listing.rentAmount <= filters.maxRent;
      const matchesVerification =
        filters.verification === "ALL" ||
        (filters.verification === "VERIFIED_ONLY" && listing.verificationStatus === "VERIFIED") ||
        (filters.verification === "NOT_VERIFIED" && listing.verificationStatus !== "VERIFIED");
      const matchesType = filters.propertyTypes.length === 0 || filters.propertyTypes.includes(listing.propertyType);
      const matchesBedrooms =
        filters.bedrooms === "Any" ||
        (filters.bedrooms === "4+" ? (listing.bedrooms ?? 0) >= 4 : listing.bedrooms === Number(filters.bedrooms));
      const matchesViewingFee = listing.viewingFee <= filters.maxViewingFee;
      return (
        matchesSearch &&
        matchesLocation &&
        matchesRent &&
        matchesVerification &&
        matchesType &&
        matchesBedrooms &&
        matchesViewingFee
      );
    });

    result = [...result].sort((a, b) => {
      if (sort === "price-asc") return a.rentAmount - b.rentAmount;
      if (sort === "price-desc") return b.rentAmount - a.rentAmount;
      return 0;
    });

    return result;
  }, [listings, search, filters, sort]);

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-black tracking-[-0.02em] text-ur-navy">Search &amp; Filter Properties</h1>
      <p className="mt-1 text-sm text-ur-text-secondary">Find verified rental properties that match your preferences.</p>

      <div className="relative mt-5 max-w-xl">
        <Icon name="search" size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ur-text-muted" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by location, property name or keyword..."
          className="h-11 w-full rounded-ur-sm border border-ur-border bg-ur-input pl-9 pr-3 text-sm text-ur-text outline-none focus:border-ur-primary"
        />
      </div>

      <FilterChips filters={filters} onChange={setFilters} />

      <div className="mt-6 flex gap-6">
        <div className="hidden w-72 shrink-0 lg:block">
          <SearchFilterPanel filters={filters} onChange={setFilters} locations={locations} />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-ur-text-secondary">
              {loading ? "Loading..." : `${filtered.length} Properties Found`}
            </p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="h-10 rounded-ur-sm border border-ur-border bg-ur-card px-3 text-sm font-semibold text-ur-navy"
            >
              <option value="newest">Sort by: Newest First</option>
              <option value="price-asc">Sort by: Price (Low to High)</option>
              <option value="price-desc">Sort by: Price (High to Low)</option>
            </select>
          </div>

          <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((listing) => (
              <PropertyCard key={listing.id} listing={listing} variant="details" />
            ))}
            {!loading && filtered.length === 0 ? (
              <p className="col-span-full py-12 text-center text-sm text-ur-text-muted">
                No properties match your filters.
              </p>
            ) : null}
          </div>

          <TrustStrip />
        </div>

        <SavedSearchesPanel />
      </div>
    </div>
  );
}
