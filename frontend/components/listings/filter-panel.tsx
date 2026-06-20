"use client";

import { Button } from "@/components/ui/button";

export interface ListingFilters {
  location: string;
  propertyType: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: string;
  bathrooms: string;
  furnished: "Any" | "Furnished" | "Unfurnished";
  verifiedOnly: boolean;
}

export const DEFAULT_FILTERS: ListingFilters = {
  location: "",
  propertyType: "",
  minPrice: 0,
  maxPrice: 5_000_000,
  bedrooms: "Any",
  bathrooms: "Any",
  furnished: "Any",
  verifiedOnly: false,
};

const roomOptions = ["Any", "1", "2", "3", "4+"];
const furnishedOptions: ListingFilters["furnished"][] = ["Any", "Furnished", "Unfurnished"];

export function FilterPanel({
  filters,
  onChange,
  locations,
  propertyTypes,
}: {
  filters: ListingFilters;
  onChange: (next: ListingFilters) => void;
  locations: string[];
  propertyTypes: string[];
}) {
  return (
    <div className="ur-card sticky top-6 p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-ur-navy">Filters</h2>
        <button
          type="button"
          onClick={() => onChange(DEFAULT_FILTERS)}
          className="text-sm font-semibold text-ur-mint hover:underline"
        >
          Clear All
        </button>
      </div>

      <div className="mt-5 space-y-5">
        <div>
          <label className="text-xs font-semibold text-ur-text-secondary" htmlFor="location-filter">
            Location
          </label>
          <select
            id="location-filter"
            value={filters.location}
            onChange={(e) => onChange({ ...filters, location: e.target.value })}
            className="mt-1.5 h-10 w-full rounded-ur-sm border border-ur-border bg-ur-input px-3 text-sm text-ur-text"
          >
            <option value="">Select Location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-ur-text-secondary" htmlFor="type-filter">
            Property Type
          </label>
          <select
            id="type-filter"
            value={filters.propertyType}
            onChange={(e) => onChange({ ...filters, propertyType: e.target.value })}
            className="mt-1.5 h-10 w-full rounded-ur-sm border border-ur-border bg-ur-input px-3 text-sm text-ur-text"
          >
            <option value="">Select Type</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="text-xs font-semibold text-ur-text-secondary">Price Range (Yearly)</p>
          <div className="relative mt-4 h-1">
            <div className="absolute inset-0 rounded-full bg-ur-border" />
            <div
              className="absolute h-1 rounded-full bg-ur-primary"
              style={{
                left: `${(filters.minPrice / 5_000_000) * 100}%`,
                right: `${100 - (filters.maxPrice / 5_000_000) * 100}%`,
              }}
            />
            <input
              type="range"
              min={0}
              max={5_000_000}
              step={50_000}
              value={filters.minPrice}
              onChange={(e) => onChange({ ...filters, minPrice: Math.min(Number(e.target.value), filters.maxPrice) })}
              className="pointer-events-none absolute inset-0 w-full appearance-none bg-transparent accent-ur-primary [&::-webkit-slider-thumb]:pointer-events-auto"
            />
            <input
              type="range"
              min={0}
              max={5_000_000}
              step={50_000}
              value={filters.maxPrice}
              onChange={(e) => onChange({ ...filters, maxPrice: Math.max(Number(e.target.value), filters.minPrice) })}
              className="pointer-events-none absolute inset-0 w-full appearance-none bg-transparent accent-ur-primary [&::-webkit-slider-thumb]:pointer-events-auto"
            />
          </div>
          <div className="mt-3 flex justify-between text-xs text-ur-text-muted">
            <span>&#8358;{filters.minPrice.toLocaleString()}</span>
            <span>&#8358;{filters.maxPrice.toLocaleString()}+</span>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-ur-text-secondary">Bedrooms</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {roomOptions.map((option) => (
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
          <p className="text-xs font-semibold text-ur-text-secondary">Bathrooms</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {roomOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onChange({ ...filters, bathrooms: option })}
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                  filters.bathrooms === option
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
          <p className="text-xs font-semibold text-ur-text-secondary">Furnished</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {furnishedOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onChange({ ...filters, furnished: option })}
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                  filters.furnished === option
                    ? "border-ur-primary bg-ur-primary text-white"
                    : "border-ur-border text-ur-text-secondary"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center justify-between">
          <span className="text-xs font-semibold text-ur-text-secondary">Verified Only</span>
          <input
            type="checkbox"
            checked={filters.verifiedOnly}
            onChange={(e) => onChange({ ...filters, verifiedOnly: e.target.checked })}
            className="h-5 w-9 accent-ur-primary"
          />
        </label>

        <Button className="w-full">Apply Filters</Button>
      </div>
    </div>
  );
}
