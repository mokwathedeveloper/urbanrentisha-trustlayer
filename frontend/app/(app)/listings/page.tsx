"use client";

import { useEffect, useMemo, useState } from "react";
import { api, type Listing } from "@/lib/api";
import { PropertyCard } from "@/components/listings/property-card";
import { FilterPanel, DEFAULT_FILTERS, type ListingFilters } from "@/components/listings/filter-panel";
import { Icon } from "@/components/ui/icon";

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState<"newest" | "price-asc" | "price-desc">("newest");
  const [filters, setFilters] = useState<ListingFilters>(DEFAULT_FILTERS);

  useEffect(() => {
    api.listings
      .findAll()
      .then(setListings)
      .catch(() => setError("Could not load listings."))
      .finally(() => setLoading(false));
  }, []);

  const locations = useMemo(() => Array.from(new Set(listings.map((l) => l.location))), [listings]);
  const propertyTypes = useMemo(() => Array.from(new Set(listings.map((l) => l.propertyType))), [listings]);

  const filtered = useMemo(() => {
    let result = listings.filter((listing) => {
      const matchesSearch =
        !search ||
        listing.title.toLowerCase().includes(search.toLowerCase()) ||
        listing.location.toLowerCase().includes(search.toLowerCase());
      const matchesLocation = !filters.location || listing.location === filters.location;
      const matchesType = !filters.propertyType || listing.propertyType === filters.propertyType;
      const matchesPrice = listing.rentAmount >= filters.minPrice && listing.rentAmount <= filters.maxPrice;
      const matchesBedrooms =
        filters.bedrooms === "Any" ||
        (filters.bedrooms === "4+" ? (listing.bedrooms ?? 0) >= 4 : listing.bedrooms === Number(filters.bedrooms));
      const matchesBathrooms =
        filters.bathrooms === "Any" ||
        (filters.bathrooms === "4+" ? (listing.bathrooms ?? 0) >= 4 : listing.bathrooms === Number(filters.bathrooms));
      const matchesVerified = !filters.verifiedOnly || listing.verificationStatus === "VERIFIED";
      // Furnished has no backing field on Listing yet, so it's not filtered on.
      return (
        matchesSearch &&
        matchesLocation &&
        matchesType &&
        matchesPrice &&
        matchesBedrooms &&
        matchesBathrooms &&
        matchesVerified
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
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-[-0.02em] text-ur-navy">Property Listings</h1>
          <p className="mt-1 text-sm text-ur-text-secondary">Discover verified rental properties with confidence.</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[260px]">
          <Icon name="search" size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ur-text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by location, property name or keyword..."
            className="h-11 w-full rounded-ur-sm border border-ur-border bg-ur-input pl-9 pr-3 text-sm text-ur-text outline-none focus:border-ur-primary"
          />
        </div>
        <button
          type="button"
          onClick={() => setShowFilters((s) => !s)}
          className="flex h-11 items-center gap-2 rounded-ur-sm border border-ur-border bg-ur-card px-4 text-sm font-semibold text-ur-navy lg:hidden"
        >
          <Icon name="tune" size={16} />
          Filters
        </button>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          className="h-11 rounded-ur-sm border border-ur-border bg-ur-card px-3 text-sm font-semibold text-ur-navy"
        >
          <option value="newest">Sort by: Newest First</option>
          <option value="price-asc">Sort by: Price (Low to High)</option>
          <option value="price-desc">Sort by: Price (High to Low)</option>
        </select>
      </div>

      <p className="mt-4 text-sm font-semibold text-ur-text-secondary">
        {loading ? "Loading..." : `${filtered.length} Properties Found`}
      </p>

      {error ? <p className="mt-4 text-sm text-ur-error">{error}</p> : null}

      <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((listing) => (
            <PropertyCard key={listing.id} listing={listing} />
          ))}
          {!loading && filtered.length === 0 ? (
            <p className="col-span-full py-12 text-center text-sm text-ur-text-muted">
              No properties match your filters.
            </p>
          ) : null}
        </div>

        <div className={showFilters ? "block" : "hidden lg:block"}>
          <FilterPanel filters={filters} onChange={setFilters} locations={locations} propertyTypes={propertyTypes} />
        </div>
      </div>
    </div>
  );
}
