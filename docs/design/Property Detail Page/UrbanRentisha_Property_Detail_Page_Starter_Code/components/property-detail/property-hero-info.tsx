import { Bath, BedDouble, Building2, MapPin, Ruler, ShieldCheck } from "lucide-react";
import type { PropertyDetail } from "@/lib/property-detail-data";
import { Badge } from "@/components/ui/badge";

type PropertyHeroInfoProps = { property: PropertyDetail; currentId: string };

export function PropertyHeroInfo({ property, currentId }: PropertyHeroInfoProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="mb-4 flex flex-wrap gap-2"><Badge variant="success"><ShieldCheck className="h-3.5 w-3.5" />Property verified</Badge><Badge variant="outline">{property.type}</Badge><Badge variant="neutral"><span className="font-mono">{currentId}</span></Badge></div>
          <h1 className="max-w-[820px] text-[40px] font-black leading-[1.04] tracking-[-0.06em] text-white sm:text-[54px]">{property.title}</h1>
          <p className="mt-4 flex items-center gap-2 text-base font-medium text-white/62"><MapPin className="h-5 w-5 text-ur-primary" />{property.location}</p>
          <p className="mt-5 max-w-[820px] text-base leading-7 text-white/62">{property.description}</p>
        </div>
        <div className="min-w-[190px] rounded-ur-lg border border-ur-primary/20 bg-ur-success-bg p-5 text-right"><p className="text-xs font-bold uppercase tracking-[0.14em] text-ur-success">Trust score</p><p className="mt-2 font-mono text-4xl font-black text-ur-success">{property.trustScore}%</p><p className="mt-2 text-xs leading-5 text-ur-success/76">Listing, agent, and access workflow verified.</p></div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Metric icon={<BedDouble className="h-5 w-5" />} label="Bedrooms" value={`${property.bedrooms}`} />
        <Metric icon={<Bath className="h-5 w-5" />} label="Bathrooms" value={`${property.bathrooms}`} />
        <Metric icon={<Ruler className="h-5 w-5" />} label="Size" value={`${property.sizeSqm} sqm`} />
        <Metric icon={<Building2 className="h-5 w-5" />} label="Neighborhood" value={property.neighborhood} />
      </div>
    </section>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="rounded-ur-lg border border-white/10 bg-black/16 p-4"><div className="mb-3 text-ur-primary">{icon}</div><p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">{label}</p><p className="mt-1 text-lg font-black text-white">{value}</p></div>;
}
