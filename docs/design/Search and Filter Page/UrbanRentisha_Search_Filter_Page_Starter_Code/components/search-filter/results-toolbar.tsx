"use client";

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
