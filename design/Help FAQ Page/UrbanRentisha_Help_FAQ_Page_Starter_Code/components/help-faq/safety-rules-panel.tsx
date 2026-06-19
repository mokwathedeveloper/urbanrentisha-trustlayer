import { safetyRules, statusVisuals } from "@/lib/help-faq-data";
import { StatusBadge } from "@/components/help-faq/status-badge";

export function SafetyRulesPanel() {
  return (
    <section id="safety-rules" className="rounded-ur-xl border border-ur-warning/25 bg-ur-warning-bg p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-warning">
        Safety rules
      </p>
      <h2 className="mt-2 text-lg font-black text-white">Rules that protect the rental flow</h2>

      <div className="mt-4 space-y-3">
        {safetyRules.map((rule) => {
          const Icon = rule.icon;
          const visual = statusVisuals.severity[rule.severity];

          return (
            <article key={rule.title} className="rounded-ur-sm border border-ur-warning/20 bg-black/16 p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm bg-ur-warning/15 text-ur-warning">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-white">{rule.title}</p>
                    <p className="mt-1 text-xs leading-5 text-ur-warning/74">{rule.description}</p>
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <StatusBadge label={visual.label} variant={visual.variant} icon={visual.icon} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
