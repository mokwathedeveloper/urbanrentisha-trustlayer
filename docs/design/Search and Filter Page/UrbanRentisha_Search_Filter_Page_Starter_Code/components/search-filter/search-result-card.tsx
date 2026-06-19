import Link from "next/link";
import { Bath, BedDouble, Bookmark, Eye, Heart, MapPin, Ruler, ShieldAlert, ShieldCheck, WalletCards } from "lucide-react";
import type { SearchProperty } from "@/lib/search-filter-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SearchResultCardProps = {
  property: SearchProperty;
  saved: boolean;
  onToggleSaved: () => void;
};

const toneStyles: Record<SearchProperty["imageTone"], string> = {
  emerald: "from-emerald-950 via-emerald-800/50 to-black",
  mint: "from-green-950 via-teal-800/45 to-black",
  forest: "from-lime-950 via-green-900/50 to-black",
  cyan: "from-cyan-950 via-emerald-900/40 to-black",
  lime: "from-lime-950 via-emerald-900/45 to-black",
  dark: "from-slate-950 via-emerald-950/55 to-black"
};

export function SearchResultCard({ property, saved, onToggleSaved }: SearchResultCardProps) {
  const verified = property.verificationStatus === "Verified";

  return (
    <article className="group overflow-hidden rounded-ur-xl border border-white/10 bg-white/[0.035] shadow-soft-dark backdrop-blur-xl transition-all duration-150 hover:border-ur-primary/35 hover:bg-white/[0.055] hover:shadow-card-hover">
      <div className={cn("relative h-48 bg-gradient-to-br", toneStyles[property.imageTone])}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_28%,rgba(52,211,153,0.28),transparent_30%)]" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {verified ? (
            <Badge variant="success"><ShieldCheck className="h-3.5 w-3.5" />Verified</Badge>
          ) : (
            <Badge variant="warning"><ShieldAlert className="h-3.5 w-3.5" />Pending</Badge>
          )}
          <Badge variant="neutral">{property.type}</Badge>
        </div>
        <button
          type="button"
          onClick={onToggleSaved}
          aria-label={saved ? "Remove saved property" : "Save property"}
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-ur-sm border border-white/14 bg-black/24 text-white backdrop-blur transition-colors hover:border-ur-primary/60 hover:bg-white/10 ur-focus"
        >
          {saved ? <Heart className="h-4 w-4 fill-ur-primary text-ur-primary" /> : <Bookmark className="h-4 w-4" />}
        </button>
      </div>

      <div className="p-5">
        <div className="mb-4">
          <h2 className="text-lg font-black tracking-[-0.03em] text-white">{property.title}</h2>
          <p className="mt-2 flex items-center gap-2 text-sm text-white/56">
            <MapPin className="h-4 w-4 text-ur-primary" />
            {property.location}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Info label="Rent" value={`KES ${property.rentKes.toLocaleString()}`} />
          <Info label="Viewing fee" value={`KES ${property.viewingFeeKes.toLocaleString()}`} />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <Metric icon={<BedDouble className="h-4 w-4" />} label={`${property.bedrooms} beds`} />
          <Metric icon={<Bath className="h-4 w-4" />} label={`${property.bathrooms} baths`} />
          <Metric icon={<Ruler className="h-4 w-4" />} label={`${property.sizeSqm} sqm`} />
        </div>

        <div className="mt-4 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
          <div className="flex items-center gap-2 text-xs font-bold text-ur-mint">
            <WalletCards className="h-3.5 w-3.5" />
            Proof-ready viewing
          </div>
          <p className="font-mono text-sm font-black text-ur-success">{property.trustScore}%</p>
        </div>

        <Link href={`/properties/${property.id}`} className="mt-5 block">
          <Button className="w-full" disabled={!verified}>
            <Eye className="h-4 w-4" />
            {verified ? "View details" : "Verification pending"}
          </Button>
        </Link>
      </div>
    </article>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-ur-sm border border-white/10 bg-black/16 p-3">
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/38">{label}</p>
      <p className="mt-1 text-sm font-black text-white">{value}</p>
    </div>
  );
}

function Metric({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="rounded-ur-sm border border-white/10 bg-black/16 p-3">
      <div className="mb-1 text-ur-primary">{icon}</div>
      <p className="text-xs font-bold text-white/66">{label}</p>
    </div>
  );
}
