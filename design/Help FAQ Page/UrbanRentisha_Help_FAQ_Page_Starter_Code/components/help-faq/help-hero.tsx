import { ArrowRight, Flag, LockKeyhole, Network, Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HelpHero() {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <Badge variant="success">
            <ShieldCheck className="h-3.5 w-3.5" />
            Verified viewing guide
          </Badge>

          <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] text-white">
            A safer rental flow needs clear rules.
          </h2>

          <p className="mt-3 max-w-[760px] text-sm leading-6 text-white/62">
            This help center explains the trust flow in simple terms: payment is checked, proof is generated, verification is recorded, and viewing access unlocks only when the request is safe.
          </p>

          <label className="relative mt-5 block max-w-[760px]">
            <span className="sr-only">Search help center</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/42" />
            <input
              placeholder="Search for payment proof, Stellar, viewing code, reports, safety..."
              className="h-12 w-full rounded-ur-sm border border-white/10 bg-black/18 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-ur-primary"
            />
          </label>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button>
              Start with FAQ
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline">
              Report a listing
              <Flag className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="rounded-ur-lg border border-white/10 bg-black/18 p-5">
          <div className="grid gap-3">
            <HeroSignal icon={<Network className="h-4 w-4" />} label="Payment network" value="Stellar testnet" />
            <HeroSignal icon={<LockKeyhole className="h-4 w-4" />} label="Privacy layer" value="ZK payment proof" />
            <HeroSignal icon={<ShieldCheck className="h-4 w-4" />} label="Access status" value="Verified before unlock" />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroSignal({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-ur-sm border border-white/10 bg-black/20 p-3">
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
          {icon}
        </div>
        <p className="text-sm font-bold text-white/70">{label}</p>
      </div>
      <p className="max-w-[190px] truncate font-mono text-xs font-bold text-ur-mint">{value}</p>
    </div>
  );
}
