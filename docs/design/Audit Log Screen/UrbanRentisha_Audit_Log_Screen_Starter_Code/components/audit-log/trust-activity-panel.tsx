import { trustActivity } from "@/lib/audit-log-data";
import { cn } from "@/lib/utils";

export function TrustActivityPanel() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Trust activity
      </p>
      <h2 className="mt-2 text-lg font-black text-white">Key trust signals</h2>

      <div className="mt-4 space-y-3">
        {trustActivity.map((item) => {
          const Icon = item.icon;

          return (
            <article key={item.id} className="flex gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <div
                className={cn(
                  "grid h-10 w-10 shrink-0 place-items-center rounded-ur-sm",
                  item.tone === "danger"
                    ? "bg-ur-error-bg text-ur-error"
                    : item.tone === "warning"
                      ? "bg-ur-warning-bg text-ur-warning"
                      : "bg-ur-success-bg text-ur-success"
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-black text-white">{item.title}</p>
                <p className="mt-1 text-xs leading-5 text-white/52">{item.description}</p>
                <p className="mt-2 font-mono text-xs font-bold text-ur-mint">{item.reference}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
