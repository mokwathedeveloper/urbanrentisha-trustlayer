import { Database, LockKeyhole, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AuditHero() {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
        <div>
          <Badge variant="success">
            <ShieldCheck className="h-3.5 w-3.5" />
            Verified audit trail
          </Badge>

          <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] text-white">
            Every trust decision should leave a trail.
          </h2>

          <p className="mt-3 max-w-[760px] text-sm leading-6 text-white/62">
            The audit log captures proof verification, payment receipt, viewing code unlocks, suspicious activity, report escalation, listing approval, agent verification, and access changes.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <InfoTile label="Primary scope" value="trust_activity" />
            <InfoTile label="Network" value="Stellar Testnet" />
            <InfoTile label="Retention" value="immutable_ready" />
          </div>
        </div>

        <div className="rounded-ur-lg border border-white/10 bg-black/18 p-5">
          <Database className="h-9 w-9 text-ur-primary" />
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-white/38">
            Latest verified proof
          </p>
          <p className="mt-2 break-all font-mono text-sm font-black text-ur-mint">
            soro_0x7ab42d3c...2c109
          </p>
          <div className="mt-4 flex items-center gap-3 rounded-ur-sm border border-ur-success/20 bg-ur-success-bg p-3">
            <LockKeyhole className="h-4 w-4 text-ur-success" />
            <p className="text-sm font-bold text-ur-success">
              Proof accepted before viewing access unlock.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
        {label}
      </p>
      <p className="mt-2 truncate font-mono text-sm font-bold text-ur-mint">
        {value}
      </p>
    </div>
  );
}
