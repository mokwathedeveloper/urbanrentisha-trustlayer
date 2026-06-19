import type { PropertyDetail } from "@/lib/property-detail-data";

type PropertyFactsProps = { property: PropertyDetail };

export function PropertyFacts({ property }: PropertyFactsProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">Property information</p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">Full property details</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{property.facts.map((fact) => <div key={fact.label} className="rounded-ur-lg border border-white/10 bg-black/16 p-4"><p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">{fact.label}</p><p className="mt-2 text-sm font-black text-white">{fact.value}</p></div>)}</div>
    </section>
  );
}
