import { limitations, statusVisuals } from "@/lib/help-faq-data";
import { StatusBadge } from "@/components/help-faq/status-badge";

export function KnownLimitationsPanel() {
  return (
    <section id="known-limitations" className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Known limitations
      </p>
      <h2 className="mt-2 text-lg font-black text-white">MVP boundaries and honest scope</h2>
      <p className="mt-2 text-sm leading-6 text-white/56">
        These points should remain visible so users understand what is demo-ready and what requires production hardening.
      </p>

      <div className="mt-4 space-y-3">
        {limitations.map((item) => {
          const visual = statusVisuals.limitation[item.status];

          return (
            <article key={item.title} className="rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-black text-white">{item.title}</p>
                <StatusBadge label={visual.label} variant={visual.variant} icon={visual.icon} />
              </div>
              <p className="mt-2 text-xs leading-5 text-white/52">{item.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
