import { analyticsMetrics } from "@/lib/admin-dashboard-data";
import { cn } from "@/lib/utils";

export function AnalyticsPanel() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Analytics
      </p>
      <h2 className="mt-2 text-lg font-black text-white">Platform trust health</h2>

      <div className="mt-4 space-y-3">
        {analyticsMetrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <article key={metric.label} className="rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
                    {metric.label}
                  </p>
                  <p className="mt-1 text-2xl font-black tracking-[-0.04em] text-white">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-xs text-white/46">{metric.helper}</p>
                </div>

                <div
                  className={cn(
                    "grid h-10 w-10 shrink-0 place-items-center rounded-ur-sm",
                    metric.tone === "danger"
                      ? "bg-ur-error-bg text-ur-error"
                      : metric.tone === "warning"
                        ? "bg-ur-warning-bg text-ur-warning"
                        : "bg-ur-success-bg text-ur-success"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className={cn(
                    "h-full rounded-full",
                    metric.tone === "danger"
                      ? "w-[48%] bg-ur-error"
                      : metric.tone === "warning"
                        ? "w-[74%] bg-ur-warning"
                        : "w-[92%] bg-ur-primary"
                  )}
                />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
