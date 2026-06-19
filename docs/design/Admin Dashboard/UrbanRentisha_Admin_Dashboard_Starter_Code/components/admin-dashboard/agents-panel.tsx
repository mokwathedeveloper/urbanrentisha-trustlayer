import Link from "next/link";
import { ArrowRight, Star, UserCheck } from "lucide-react";
import { agentRecords, statusVisuals, type AgentStatus } from "@/lib/admin-dashboard-data";
import { StatusBadge } from "@/components/admin-dashboard/status-badge";
import { Button } from "@/components/ui/button";

export function AgentsPanel() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Agents
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            Agent trust monitor
          </h2>
        </div>
        <UserCheck className="h-6 w-6 text-ur-primary" />
      </div>

      <div className="mt-5 space-y-3">
        {agentRecords.map((agent) => {
          const status = statusVisuals.agent[agent.status as AgentStatus];

          return (
            <article key={agent.id} className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Link href={`/admin/agents/${agent.id}`} className="font-black text-white hover:text-ur-mint ur-focus">
                    {agent.name}
                  </Link>
                  <p className="mt-1 text-sm text-white/52">{agent.company}</p>
                  <p className="mt-2 font-mono text-xs font-bold text-ur-mint">{agent.id}</p>
                </div>
                <StatusBadge label={status.label} variant={status.variant} icon={status.icon} />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <Metric label="Trust" value={`${agent.trustScore}%`} icon={<Star className="h-4 w-4" />} />
                <Metric label="Reports" value={`${agent.reports}`} />
                <Metric label="Listings" value={`${agent.listedProperties}`} />
              </div>
            </article>
          );
        })}
      </div>

      <Link href="/admin/agents" className="mt-5 block">
        <Button variant="outline" className="w-full">
          View agents
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </section>
  );
}

function Metric({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-ur-sm border border-white/10 bg-black/20 p-3">
      <div className="flex items-center gap-2 text-ur-primary">{icon}</div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">{label}</p>
      <p className="mt-1 text-sm font-black text-white">{value}</p>
    </div>
  );
}
