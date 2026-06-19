"use client";

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
