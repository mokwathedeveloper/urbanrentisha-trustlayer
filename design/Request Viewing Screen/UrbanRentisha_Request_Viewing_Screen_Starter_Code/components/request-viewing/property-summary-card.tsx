import { Bath, BedDouble, MapPin, Ruler, ShieldCheck } from "lucide-react";
import type { ViewingProperty } from "@/lib/request-viewing-data";
import { Badge } from "@/components/ui/badge";

type PropertySummaryCardProps = {
  property: ViewingProperty;
};

export function PropertySummaryCard({ property }: PropertySummaryCardProps) {
  return (
    <section className="overflow-hidden rounded-ur-xl border border-white/10 bg-white/[0.035] shadow-soft-dark backdrop-blur-xl">
      <div className="grid gap-0 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="relative min-h-[280px] bg-gradient-to-br from-emerald-950 via-emerald-800/45 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_34%,rgba(52,211,153,0.30),transparent_30%)]" />
          <div className="absolute left-5 top-5 flex gap-2">
            <Badge variant="success">
              <ShieldCheck className="h-3.5 w-3.5" />
              Verified property
            </Badge>
          </div>
          <div className="absolute bottom-5 left-5 right-5 rounded-ur-lg border border-white/10 bg-black/30 p-5 backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/44">
              Selected property
            </p>
            <h2 className="mt-1 text-2xl font-black tracking-[-0.04em] text-white">
              {property.title}
            </h2>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col justify-between gap-5 sm:flex-row">
            <div>
              <h2 className="text-2xl font-black tracking-[-0.04em] text-white">
                {property.title}
              </h2>
              <p className="mt-2 flex items-center gap-2 text-sm text-white/58">
                <MapPin className="h-4 w-4 text-ur-primary" />
                {property.location}
              </p>
            </div>

            <div className="rounded-ur-lg border border-ur-primary/20 bg-ur-success-bg p-4 text-right">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-ur-success">
                Trust score
              </p>
              <p className="mt-1 font-mono text-2xl font-black text-ur-success">
                {property.trustScore}%
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <Metric label="Rent" value={`KES ${property.rentKes.toLocaleString()}`} />
            <Metric icon={<BedDouble className="h-4 w-4" />} label="Beds" value={`${property.bedrooms}`} />
            <Metric icon={<Bath className="h-4 w-4" />} label="Baths" value={`${property.bathrooms}`} />
            <Metric icon={<Ruler className="h-4 w-4" />} label="Size" value={`${property.sizeSqm} sqm`} />
          </div>

          <div className="mt-6 rounded-ur-lg border border-white/10 bg-black/16 p-4">
            <p className="text-sm font-black text-white">Important access rule</p>
            <p className="mt-2 text-sm leading-6 text-white/58">
              Creating a request does not reveal the viewing code. Access details unlock only after the required viewing fee is paid and proof verification succeeds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({
  icon,
  label,
  value
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-ur-sm border border-white/10 bg-black/16 p-3">
      {icon ? <div className="mb-1 text-ur-primary">{icon}</div> : null}
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/38">{label}</p>
      <p className="mt-1 text-sm font-black text-white">{value}</p>
    </div>
  );
}
