"use client";

import { RotateCcw, ShieldCheck } from "lucide-react";
import type { ListingFilters } from "@/components/listings/property-listing-page";
import { bedroomFilters, neighborhoods, priceRanges, propertyTypes } from "@/lib/listings-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ListingFilterPanelProps = {
  filters: ListingFilters;
  onFilterChange: <Key extends keyof ListingFilters>(key: Key, value: ListingFilters[Key]) => void;
  onReset: () => void;
};

export function ListingFilterPanel({ filters, onFilterChange, onReset }: ListingFilterPanelProps) {
  return (
    <aside className="h-fit rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl lg:sticky lg:top-24">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div><p className="text-sm font-black text-white">Filters</p><p className="mt-1 text-xs text-white/42">Refine verified rental search.</p></div>
        <Button variant="ghost" size="sm" onClick={onReset}><RotateCcw className="h-4 w-4" />Reset</Button>
      </div>
      <div className="space-y-5">
        <SelectField label="Location" value={filters.neighborhood} options={neighborhoods} onChange={(value) => onFilterChange("neighborhood", value)} />
        <SelectField label="Property type" value={filters.type} options={[...propertyTypes]} onChange={(value) => onFilterChange("type", value)} />
        <SelectField label="Price range" value={filters.priceRange} options={priceRanges.map((range) => range.label)} onChange={(value) => onFilterChange("priceRange", value)} />
        <div>
          <p className="mb-2 text-xs font-semibold tracking-[0.04em] text-white/78">Bedrooms</p>
          <div className="grid grid-cols-5 gap-2">
            {bedroomFilters.map((item) => (
              <button key={item} type="button" onClick={() => onFilterChange("bedrooms", item)} className={cn("h-10 rounded-ur-sm border text-sm font-bold transition-colors ur-focus", filters.bedrooms === item ? "border-ur-primary bg-ur-primary text-white" : "border-white/10 bg-black/16 text-white/58 hover:border-white/20 hover:bg-white/5 hover:text-white")}>{item}</button>
            ))}
          </div>
        </div>
        <label className="flex cursor-pointer items-center justify-between gap-4 rounded-ur-lg border border-ur-primary/20 bg-ur-primary/8 p-4">
          <span className="flex items-start gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 text-ur-primary" /><span><span className="block text-sm font-black text-white">Verified only</span><span className="mt-1 block text-xs leading-5 text-white/48">Hide listings that are still pending agent or property verification.</span></span></span>
          <input type="checkbox" checked={filters.verifiedOnly} onChange={(event) => onFilterChange("verifiedOnly", event.target.checked)} className="h-5 w-5 rounded border-white/20 bg-ur-input accent-ur-primary" />
        </label>
      </div>
    </aside>
  );
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  const id = label.toLowerCase().replaceAll(" ", "-");
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-xs font-semibold tracking-[0.04em] text-white/78">{label}</label>
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)} className="h-11 w-full rounded-ur-sm border border-white/12 bg-ur-input px-3 text-sm text-white outline-none transition-colors focus:border-ur-primary">
        {options.map((option) => (<option key={option} value={option} className="bg-ur-card text-white">{option}</option>))}
      </select>
    </div>
  );
}
