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
