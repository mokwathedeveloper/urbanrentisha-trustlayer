import Link from "next/link";
import { ArrowRight, Database } from "lucide-react";
import { auditLogs, statusVisuals, type AuditAction } from "@/lib/admin-dashboard-data";
import { StatusBadge } from "@/components/admin-dashboard/status-badge";
import { Button } from "@/components/ui/button";

export function AuditLogsPanel() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Audit logs
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            Admin and system audit trail
          </h2>
        </div>

        <Link href="/admin/audit-logs">
          <Button variant="outline" size="sm">
            View logs
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="mt-5 space-y-3">
        {auditLogs.map((log) => {
          const action = statusVisuals.audit[log.action as AuditAction];

          return (
            <article key={log.id} className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                    <Database className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-black text-white">{log.description}</p>
                    <p className="mt-1 text-sm text-white/52">Actor: {log.actor}</p>
                    <p className="mt-2 font-mono text-xs font-bold text-ur-mint">{log.id}</p>
                  </div>
                </div>

                <div className="text-right">
                  <StatusBadge label={action.label} variant={action.variant} icon={action.icon} />
                  <p className="mt-2 text-xs text-white/38">{log.time}</p>
                </div>
              </div>

              <p className="mt-3 truncate font-mono text-xs font-bold text-white/62">
                Ref: {log.reference}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
