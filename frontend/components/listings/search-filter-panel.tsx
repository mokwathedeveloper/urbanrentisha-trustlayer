"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface SearchFilters {
  location: string;
  minRent: number;
  maxRent: number;
  verification: "VERIFIED_ONLY" | "ALL" | "NOT_VERIFIED";
  propertyTypes: string[];
  bedrooms: string;
  maxViewingFee: number;
}

export const DEFAULT_SEARCH_FILTERS: SearchFilters = {
  location: "",
  minRent: 0,
  maxRent: 5_000_000,
  verification: "ALL",
  propertyTypes: [],
  bedrooms: "Any",
  maxViewingFee: 20_000,
};

const propertyTypeOptions = ["Apartment", "Duplex", "Flat", "Studio", "Bungalow", "Terrace"];
const bedroomOptions = ["Any", "1", "2", "3", "4+"];

export function SearchFilterPanel({
  filters,
  onChange,
  locations,
}: {
  filters: SearchFilters;
  onChange: (next: SearchFilters) => void;
  locations: string[];
}) {
  function toggleType(type: string) {
    const has = filters.propertyTypes.includes(type);
    onChange({
      ...filters,
      propertyTypes: has ? filters.propertyTypes.filter((t) => t !== type) : [...filters.propertyTypes, type],
    });
  }

  return (
    <div className="ur-card p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-ur-navy">Filters</h2>
        <button
          type="button"
          onClick={() => onChange(DEFAULT_SEARCH_FILTERS)}
          className="flex items-center gap-1 text-sm font-semibold text-ur-text-secondary hover:text-ur-navy"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
      </div>

      <div className="mt-5 space-y-5">
        <div>
          <label className="text-xs font-semibold text-ur-text-secondary" htmlFor="search-location">
            Location
          </label>
          <select
            id="search-location"
            value={filters.location}
            onChange={(e) => onChange({ ...filters, location: e.target.value })}
            className="mt-1.5 h-10 w-full rounded-ur-sm border border-ur-border bg-ur-input px-3 text-sm text-ur-text"
          >
            <option value="">All locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="text-xs font-semibold text-ur-text-secondary">Rent Range (Yearly)</p>
          <p className="mt-1 text-sm font-bold text-ur-navy">
            {filters.minRent.toLocaleString()} - {filters.maxRent.toLocaleString()}
          </p>
          <input
            type="range"
            min={0}
            max={5_000_000}
            step={50_000}
            value={filters.maxRent}
            onChange={(e) => onChange({ ...filters, maxRent: Number(e.target.value) })}
            className="mt-2 w-full accent-ur-primary"
          />
          <div className="flex justify-between text-xs text-ur-text-muted">
            <span>100,000</span>
            <span>5,000,000+</span>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-ur-text-secondary">Verification Status</p>
          <div className="mt-2 space-y-2">
            {(
              [
                ["VERIFIED_ONLY", "Verified Only"],
                ["ALL", "All Properties"],
                ["NOT_VERIFIED", "Not Verified"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => onChange({ ...filters, verification: value })}
                className={`flex w-full items-center gap-2 rounded-ur-sm border px-3 py-2 text-left text-sm font-semibold ${
                  filters.verification === value
                    ? "border-ur-primary bg-ur-success-bg text-ur-primary"
                    : "border-ur-border text-ur-text-secondary"
                }`}
              >
                <span
                  className={`h-3.5 w-3.5 rounded-full border ${
                    filters.verification === value ? "border-ur-primary bg-ur-primary" : "border-ur-border"
                  }`}
                />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-ur-text-secondary">Property Type</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {propertyTypeOptions.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => toggleType(type)}
                className={`rounded-ur-sm border px-3 py-2 text-xs font-semibold ${
                  filters.propertyTypes.includes(type)
                    ? "border-ur-primary bg-ur-primary text-white"
                    : "border-ur-border text-ur-text-secondary"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-ur-text-secondary">Bedrooms</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {bedroomOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onChange({ ...filters, bedrooms: option })}
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                  filters.bedrooms === option
                    ? "border-ur-primary bg-ur-primary text-white"
                    : "border-ur-border text-ur-text-secondary"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-ur-text-secondary">Viewing Fee (Per Visit)</p>
          <p className="mt-1 text-sm font-bold text-ur-navy">Up to {filters.maxViewingFee.toLocaleString()}</p>
          <input
            type="range"
            min={0}
            max={20_000}
            step={1_000}
            value={filters.maxViewingFee}
            onChange={(e) => onChange({ ...filters, maxViewingFee: Number(e.target.value) })}
            className="mt-2 w-full accent-ur-primary"
          />
          <div className="flex justify-between text-xs text-ur-text-muted">
            <span>Free</span>
            <span>10,000</span>
            <span>20,000+</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={() => onChange(DEFAULT_SEARCH_FILTERS)}>
            Reset Filters
          </Button>
          <Button className="flex-1">Apply Filters</Button>
        </div>
      </div>
    </div>
  );
}
