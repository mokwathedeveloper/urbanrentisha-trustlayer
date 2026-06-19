import { ShieldAlert } from "lucide-react";
import { suspiciousActivities, statusVisuals, type SuspiciousStatus } from "@/lib/admin-dashboard-data";
import { StatusBadge } from "@/components/admin-dashboard/status-badge";
import { Button } from "@/components/ui/button";

export function SuspiciousActivityPanel() {
  return (
    <section className="rounded-ur-xl border border-ur-error/25 bg-ur-error-bg p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-error">
            Suspicious activity
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            Risk queue
          </h2>
          <p className="mt-2 text-sm leading-6 text-ur-error/72">
            Investigate suspicious payment language, duplicate listings, proof mismatch, and unsafe access patterns.
          </p>
        </div>
        <ShieldAlert className="h-7 w-7 text-ur-error" />
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        {suspiciousActivities.map((activity) => {
          const status = statusVisuals.suspicious[activity.status as SuspiciousStatus];

          return (
            <article key={activity.id} className="rounded-ur-lg border border-ur-error/20 bg-black/20 p-4">
              <div className="flex items-start justify-between gap-4">
                <p className="font-black text-white">{activity.title}</p>
                <StatusBadge label={status.label} variant={status.variant} icon={status.icon} />
              </div>

              <p className="mt-2 text-sm text-ur-error/72">{activity.source}</p>
              <p className="mt-3 font-mono text-xs font-bold text-ur-mint">{activity.actor}</p>

              <div className="mt-4 rounded-ur-sm border border-ur-error/20 bg-black/24 p-3">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-ur-error/72">
                  Risk score
                </p>
                <p className="mt-1 text-2xl font-black text-white">{activity.riskScore}/100</p>
              </div>

              <Button variant="danger" size="sm" className="mt-4 w-full">
                Investigate
              </Button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
