"use client";

import { X } from "lucide-react";
import { DEFAULT_SEARCH_FILTERS, type SearchFilters } from "./search-filter-panel";

export function FilterChips({
  filters,
  onChange,
}: {
  filters: SearchFilters;
  onChange: (next: SearchFilters) => void;
}) {
  const chips: { label: string; clear: () => void }[] = [];

  if (filters.location) {
    chips.push({ label: filters.location, clear: () => onChange({ ...filters, location: "" }) });
  }
  if (filters.maxRent !== DEFAULT_SEARCH_FILTERS.maxRent) {
    chips.push({
      label: `Up to ${filters.maxRent.toLocaleString()}`,
      clear: () => onChange({ ...filters, maxRent: DEFAULT_SEARCH_FILTERS.maxRent }),
    });
  }
  if (filters.verification !== "ALL") {
    chips.push({
      label: filters.verification === "VERIFIED_ONLY" ? "Verified Only" : "Not Verified",
      clear: () => onChange({ ...filters, verification: "ALL" }),
    });
  }
  if (filters.bedrooms !== "Any") {
    chips.push({
      label: `${filters.bedrooms} Bedroom${filters.bedrooms === "1" ? "" : "s"}`,
      clear: () => onChange({ ...filters, bedrooms: "Any" }),
    });
  }
  if (filters.maxViewingFee !== DEFAULT_SEARCH_FILTERS.maxViewingFee) {
    chips.push({
      label: `Viewing Fee: Up to ${filters.maxViewingFee.toLocaleString()}`,
      clear: () => onChange({ ...filters, maxViewingFee: DEFAULT_SEARCH_FILTERS.maxViewingFee }),
    });
  }
  filters.propertyTypes.forEach((type) => {
    chips.push({
      label: type,
      clear: () => onChange({ ...filters, propertyTypes: filters.propertyTypes.filter((t) => t !== type) }),
    });
  });

  if (chips.length === 0) return null;

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <span
          key={chip.label}
          className="flex items-center gap-2 rounded-full border border-ur-border bg-ur-card px-3 py-1.5 text-xs font-semibold text-ur-text-secondary"
        >
          {chip.label}
          <button type="button" onClick={chip.clear} aria-label={`Remove ${chip.label}`}>
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      <button
        type="button"
        onClick={() => onChange(DEFAULT_SEARCH_FILTERS)}
        className="text-xs font-semibold text-ur-mint hover:underline"
      >
        Clear All
      </button>
    </div>
  );
}
