import type { AgentProfile } from "@/lib/agent-profile-data";
import { reportSummary } from "@/lib/agent-profile-data";
import { Badge } from "@/components/ui/badge";

type ReportSummaryCardProps = {
  profile: AgentProfile;
};

export function ReportSummaryCard({ profile }: ReportSummaryCardProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Report count
          </p>
          <h2 className="mt-2 text-lg font-black text-white">
            {profile.reportCount} total reports
          </h2>
        </div>

        <Badge variant="success">0 active flags</Badge>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {reportSummary.map((item) => {
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

      <div className="mt-5 rounded-ur-lg border border-ur-warning/20 bg-ur-warning-bg p-4">
        <p className="text-sm leading-6 text-ur-warning/78">
          Report count is shown with context. Resolved reports do not automatically mean the agent is unsafe.
        </p>
      </div>
    </section>
  );
}
