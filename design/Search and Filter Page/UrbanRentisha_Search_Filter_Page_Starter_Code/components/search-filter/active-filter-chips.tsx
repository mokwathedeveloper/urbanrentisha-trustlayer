"use client";

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
