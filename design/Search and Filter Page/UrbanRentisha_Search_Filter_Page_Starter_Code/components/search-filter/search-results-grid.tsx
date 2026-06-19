import type { SearchProperty } from "@/lib/search-filter-data";
import { SearchResultCard } from "@/components/search-filter/search-result-card";

type SearchResultsGridProps = {
  properties: SearchProperty[];
  savedIds: string[];
  onToggleSaved: (property: SearchProperty) => void;
};

export function SearchResultsGrid({ properties, savedIds, onToggleSaved }: SearchResultsGridProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {properties.map((property) => (
        <SearchResultCard
          key={property.id}
          property={property}
          saved={savedIds.includes(property.id)}
          onToggleSaved={() => onToggleSaved(property)}
        />
      ))}
    </div>
  );
}
