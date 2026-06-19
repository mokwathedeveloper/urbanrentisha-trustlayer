import { CheckCircle2, Database, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function IntegrityStatusCard() {
  return (
    <section className="rounded-ur-xl border border-ur-success/25 bg-ur-success-bg p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-success">
            Integrity status
          </p>
          <h2 className="mt-2 text-lg font-black text-white">Audit records verified</h2>
        </div>
        <Badge variant="success">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Healthy
        </Badge>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-ur-sm border border-ur-success/20 bg-black/16 p-3">
          <ShieldCheck className="h-4 w-4 text-ur-success" />
          <p className="mt-2 text-2xl font-black text-white">98.7%</p>
          <p className="mt-1 text-xs text-ur-success/72">Verified records</p>
        </div>

        <div className="rounded-ur-sm border border-ur-success/20 bg-black/16 p-3">
          <Database className="h-4 w-4 text-ur-success" />
          <p className="mt-2 text-2xl font-black text-white">14.2K</p>
          <p className="mt-1 text-xs text-ur-success/72">Audit rows</p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-ur-success/78">
        Each important trust activity should include actor, target, timestamp, severity, integrity status, and linked proof or transaction metadata when available.
      </p>
    </section>
  );
}
