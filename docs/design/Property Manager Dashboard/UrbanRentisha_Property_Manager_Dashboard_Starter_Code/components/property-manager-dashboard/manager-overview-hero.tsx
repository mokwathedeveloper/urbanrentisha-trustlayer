import Link from "next/link";
import { ArrowRight, Building2, ShieldCheck, Star, UsersRound } from "lucide-react";
import { managerProfile } from "@/lib/property-manager-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ManagerOverviewHero() {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
        <div>
          <Badge variant="success">
            <ShieldCheck className="h-3.5 w-3.5" />
            Manager verified
          </Badge>

          <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] text-white">
            {managerProfile.company}
          </h2>

          <p className="mt-2 max-w-[760px] text-sm leading-6 text-white/62">
            Control verified rental listings, review proof-backed tenants, issue viewing codes, monitor reports, and keep payment-hold records aligned with trust rules.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <InfoTile icon={<Building2 className="h-4 w-4" />} label="Manager ID" value={managerProfile.id} />
            <InfoTile icon={<UsersRound className="h-4 w-4" />} label="Verified tenants" value={`${managerProfile.verifiedTenants}`} />
            <InfoTile icon={<Star className="h-4 w-4" />} label="Trust score" value={`${managerProfile.trustScore}%`} />
          </div>
        </div>

        <div className="min-w-[280px] rounded-ur-lg border border-ur-success/20 bg-ur-success-bg p-5">
          <Star className="h-8 w-8 text-ur-success" />
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-ur-success/72">
            Trust health
          </p>
          <p className="mt-2 text-3xl font-black text-white">Stable</p>
          <p className="mt-2 text-sm leading-6 text-ur-success/72">
            Listing quality, tenant proof flow, and report handling are currently healthy.
          </p>

          <Link href="/manager/trust-score" className="mt-5 block">
            <Button className="w-full">
              Review trust score
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function InfoTile({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
      <div className="mb-3 text-ur-primary">{icon}</div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
        {label}
      </p>
      <p className="mt-2 truncate font-mono text-sm font-bold text-ur-mint">
        {value}
      </p>
    </div>
  );
}
