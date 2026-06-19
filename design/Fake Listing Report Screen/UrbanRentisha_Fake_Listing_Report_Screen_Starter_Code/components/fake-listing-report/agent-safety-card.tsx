import { PhoneCall, UserRound } from "lucide-react";
import type { ListingReportTarget } from "@/lib/report-data";
import { Badge } from "@/components/ui/badge";

type AgentSafetyCardProps = {
  target: ListingReportTarget;
};

export function AgentSafetyCard({ target }: AgentSafetyCardProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Agent profile
          </p>
          <h2 className="mt-2 text-lg font-black text-white">{target.agentName}</h2>
          <p className="mt-1 text-sm text-white/52">{target.agentCompany}</p>
        </div>

        <Badge variant="success">
          {target.agentStatus}
        </Badge>
      </div>

      <div className="mt-5 rounded-ur-lg border border-white/10 bg-black/16 p-4">
        <div className="flex gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
            <UserRound className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-black text-white">Contact shown on listing</p>
            <p className="mt-1 flex items-center gap-2 font-mono text-sm text-ur-mint">
              <PhoneCall className="h-4 w-4" />
              {target.agentPhone}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
