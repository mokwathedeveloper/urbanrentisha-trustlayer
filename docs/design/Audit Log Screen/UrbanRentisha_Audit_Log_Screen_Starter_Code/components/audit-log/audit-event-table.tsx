import { auditEvents, eventTypeLabels, statusVisuals, type AuditEventType, type AuditIntegrity, type AuditSeverity } from "@/lib/audit-log-data";
import { StatusBadge } from "@/components/audit-log/status-badge";
import { Button } from "@/components/ui/button";

export function AuditEventTable() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
          Audit table
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
          Important system events
        </h2>
        <p className="mt-2 text-sm leading-6 text-white/56">
          A compact audit view for IDs, actors, targets, severity, integrity, and action review.
        </p>
      </div>

      <div className="mt-5 overflow-hidden rounded-ur-lg border border-white/10">
        <div className="hidden grid-cols-[1.05fr_1fr_0.85fr_135px_135px_100px] gap-4 border-b border-white/10 bg-black/20 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white/38 xl:grid">
          <span>Event</span>
          <span>Actor</span>
          <span>Target</span>
          <span>Severity</span>
          <span>Integrity</span>
          <span>Action</span>
        </div>

        <div className="divide-y divide-white/10">
          {auditEvents.map((event) => {
            const TypeIcon = statusVisuals.eventTypeIcon[event.type as AuditEventType];
            const severity = statusVisuals.severity[event.severity as AuditSeverity];
            const integrity = statusVisuals.integrity[event.integrity as AuditIntegrity];

            return (
              <article
                key={event.id}
                className="grid gap-4 bg-black/10 px-4 py-4 xl:grid-cols-[1.05fr_1fr_0.85fr_135px_135px_100px] xl:items-center"
              >
                <div className="flex gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                    <TypeIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-black text-white">{event.title}</p>
                    <p className="mt-1 font-mono text-xs font-bold text-ur-mint">{event.id}</p>
                    <p className="mt-1 text-xs text-white/42">{eventTypeLabels[event.type]}</p>
                  </div>
                </div>

                <div>
                  <p className="font-mono text-xs font-bold text-white">{event.actor}</p>
                  <p className="mt-1 text-xs capitalize text-white/42">{event.actorType}</p>
                </div>

                <div>
                  <p className="font-mono text-xs font-bold text-white">{event.target}</p>
                  <p className="mt-1 text-xs capitalize text-white/42">{event.targetType.replace("_", " ")}</p>
                </div>

                <StatusBadge label={severity.label} variant={severity.variant} icon={severity.icon} />
                <StatusBadge label={integrity.label} variant={integrity.variant} icon={integrity.icon} />

                <Button size="sm" variant="outline">
                  View
                </Button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
