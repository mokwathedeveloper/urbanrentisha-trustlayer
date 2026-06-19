import { Bath, BedDouble, Bookmark, CalendarDays, Eye, Heart, MapPin, Ruler, ShieldCheck } from "lucide-react";
import type { PropertyListing } from "@/lib/listings-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VerifiedBadge } from "@/components/listings/verified-badge";
import { cn } from "@/lib/utils";

type PropertyCardProps = {
  property: PropertyListing;
  saved: boolean;
  onToggleSaved: () => void;
  onRequestViewing: () => void;
};

const toneStyles: Record<PropertyListing["imageTone"], string> = {
  emerald: "from-emerald-950 via-emerald-800/50 to-black",
  mint: "from-green-950 via-teal-800/45 to-black",
  forest: "from-lime-950 via-green-900/50 to-black",
  cyan: "from-cyan-950 via-emerald-900/40 to-black",
  lime: "from-lime-950 via-emerald-900/45 to-black",
  dark: "from-slate-950 via-emerald-950/55 to-black"
};

export function PropertyCard({ property, saved, onToggleSaved, onRequestViewing }: PropertyCardProps) {
  const verified = property.verificationStatus === "Verified";
  return (
    <article className="group overflow-hidden rounded-ur-xl border border-white/10 bg-white/[0.035] shadow-soft-dark backdrop-blur-xl transition-all duration-150 hover:border-ur-primary/35 hover:bg-white/[0.055] hover:shadow-card-hover">
      <div className={cn("relative h-52 bg-gradient-to-br", toneStyles[property.imageTone])}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_28%,rgba(52,211,153,0.28),transparent_30%)]" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2"><VerifiedBadge status={property.verificationStatus} /><Badge variant="neutral">{property.type}</Badge></div>
        <button type="button" onClick={onToggleSaved} aria-label={saved ? "Remove saved listing" : "Save listing"} className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-ur-sm border border-white/14 bg-black/24 text-white backdrop-blur transition-colors hover:border-ur-primary/60 hover:bg-white/10 ur-focus">
          {saved ? <Heart className="h-4 w-4 fill-ur-primary text-ur-primary" /> : <Bookmark className="h-4 w-4" />}
        </button>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="rounded-ur-lg border border-white/10 bg-black/30 p-4 backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-white/44">Monthly rent</p><p className="mt-1 text-2xl font-black text-white">KES {property.priceKes.toLocaleString()}</p></div>
              <div className="rounded-ur-sm border border-ur-primary/25 bg-ur-success-bg px-3 py-2 text-right"><p className="text-[11px] font-bold uppercase tracking-[0.12em] text-ur-success">Trust</p><p className="font-mono text-lg font-bold text-ur-success">{property.trustScore}%</p></div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="mb-4"><h2 className="text-lg font-black tracking-[-0.03em] text-white">{property.title}</h2><p className="mt-2 flex items-center gap-2 text-sm text-white/56"><MapPin className="h-4 w-4 text-ur-primary" />{property.location}</p></div>
        <p className="line-clamp-2 text-sm leading-6 text-white/58">{property.description}</p>
        <div className="mt-4 grid grid-cols-3 gap-2"><Metric icon={<BedDouble className="h-4 w-4" />} label={`${property.bedrooms} beds`} /><Metric icon={<Bath className="h-4 w-4" />} label={`${property.bathrooms} baths`} /><Metric icon={<Ruler className="h-4 w-4" />} label={`${property.sizeSqm} sqm`} /></div>
        <div className="mt-4 flex flex-wrap gap-2">{property.tags.slice(0, 3).map((tag) => (<span key={tag} className="rounded-full border border-white/10 bg-black/14 px-3 py-1 text-xs font-semibold text-white/52">{tag}</span>))}</div>
        <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
          <div><p className="flex items-center gap-2 text-xs font-bold text-white/72"><CalendarDays className="h-3.5 w-3.5 text-ur-primary" />{property.availableFrom}</p><p className="mt-1 text-xs text-white/42">Viewing fee: KES {property.viewingFeeKes.toLocaleString()}</p></div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-ur-mint"><ShieldCheck className="h-3.5 w-3.5" />{property.agentVerified ? "Agent verified" : "Agent pending"}</div>
        </div>
        <Button className="mt-5 w-full" disabled={!verified} onClick={onRequestViewing}><Eye className="h-4 w-4" />{verified ? "Request viewing" : "Verification pending"}</Button>
      </div>
    </article>
  );
}

function Metric({ icon, label }: { icon: React.ReactNode; label: string }) {
  return <div className="rounded-ur-sm border border-white/10 bg-black/16 p-3"><div className="mb-1 text-ur-primary">{icon}</div><p className="text-xs font-bold text-white/66">{label}</p></div>;
}
