import type { PropertyDetail } from "@/lib/property-detail-data";

type AmenitiesGridProps = { property: PropertyDetail };

export function AmenitiesGrid({ property }: AmenitiesGridProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">Amenities</p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">What is included</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{property.amenities.map((amenity) => { const Icon = amenity.icon; return <div key={amenity.label} className="flex items-center gap-3 rounded-ur-lg border border-white/10 bg-black/16 p-4"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary"><Icon className="h-5 w-5" /></div><p className="text-sm font-bold text-white/76">{amenity.label}</p></div>; })}</div>
    </section>
  );
}
