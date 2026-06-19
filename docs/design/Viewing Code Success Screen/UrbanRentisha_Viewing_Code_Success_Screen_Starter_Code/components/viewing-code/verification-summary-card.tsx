import type { ViewingCodeRecord } from "@/lib/viewing-code-data";
import { successMetrics } from "@/lib/viewing-code-data";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck } from "lucide-react";

type VerificationSummaryCardProps = {
  record: ViewingCodeRecord;
};

export function VerificationSummaryCard({ record }: VerificationSummaryCardProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Verification summary
          </p>
          <h2 className="mt-2 text-lg font-black text-white">Access requirements complete</h2>
        </div>

        <Badge variant="success">
          <ShieldCheck className="h-3.5 w-3.5" />
          Complete
        </Badge>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {successMetrics.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <Icon className="mb-2 h-4 w-4 text-ur-primary" />
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/38">{item.label}</p>
              <p className="mt-1 text-sm font-black text-white">{item.value}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-ur-lg border border-ur-primary/20 bg-ur-primary/8 p-4">
        <p className="text-sm leading-6 text-white/60">
          Request <span className="font-mono text-ur-mint">{record.requestId}</span> is now eligible for verified property viewing.
        </p>
      </div>
    </section>
  );
}
