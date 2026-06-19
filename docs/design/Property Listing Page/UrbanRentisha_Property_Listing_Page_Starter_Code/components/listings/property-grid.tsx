import type { PropertyListing } from "@/lib/listings-data";
import { PropertyCard } from "@/components/listings/property-card";

type PropertyGridProps = {
  listings: PropertyListing[];
  savedIds: string[];
  onToggleSaved: (id: string) => void;
  onRequestViewing: (property: PropertyListing) => void;
};

export function PropertyGrid({ listings, savedIds, onToggleSaved, onRequestViewing }: PropertyGridProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {listings.map((property) => (
        <PropertyCard key={property.id} property={property} saved={savedIds.includes(property.id)} onToggleSaved={() => onToggleSaved(property.id)} onRequestViewing={() => onRequestViewing(property)} />
      ))}
    </div>
  );
}
