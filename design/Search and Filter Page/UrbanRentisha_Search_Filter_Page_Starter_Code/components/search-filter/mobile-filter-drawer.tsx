"use client";

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
