import { auditEvents, eventTypeLabels, statusVisuals, type AuditEventType, type AuditSeverity } from "@/lib/audit-log-data";
import { StatusBadge } from "@/components/audit-log/status-badge";

export function AuditTimeline() {
  const groups = ["Today", "Yesterday", "Earlier"] as const;

  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Event timeline
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        Trust activity by time
      </h2>

      <div className="mt-5 space-y-8">
        {groups.map((group) => {
          const events = auditEvents.filter((event) => event.dateGroup === group);

          return (
            <div key={group}>
              <div className="mb-3 flex items-center gap-3">
                <div className="h-px flex-1 bg-white/10" />
                <p className="text-xs font-black uppercase tracking-[0.16em] text-white/42">{group}</p>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <div className="space-y-3">
                {events.map((event) => {
                  const TypeIcon = statusVisuals.eventTypeIcon[event.type as AuditEventType];
                  const severity = statusVisuals.severity[event.severity as AuditSeverity];

                  return (
                    <article
                      key={event.id}
                      className="relative rounded-ur-lg border border-white/10 bg-black/16 p-4 transition-colors hover:border-ur-primary/40 hover:bg-white/[0.04]"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex gap-4">
                          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                            <TypeIcon className="h-6 w-6" />
                          </div>

                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-ur-mint">
                              {eventTypeLabels[event.type]}
                            </p>
                            <h3 className="mt-1 font-black text-white">{event.title}</h3>
                            <p className="mt-2 max-w-[760px] text-sm leading-6 text-white/56">
                              {event.description}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <span className="font-mono text-xs font-bold text-ur-mint">{event.id}</span>
                              <span className="text-xs text-white/32">•</span>
                              <span className="font-mono text-xs font-bold text-white/58">{event.target}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                          <StatusBadge label={severity.label} variant={severity.variant} icon={severity.icon} />
                          <p className="w-full text-left text-xs text-white/42 sm:text-right">
                            {event.timestamp}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
