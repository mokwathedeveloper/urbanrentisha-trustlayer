import { trustStats } from "@/lib/landing-data";

export function TrustStrip() {
  return (
    <section className="border-b border-ur-border bg-white">
      <div className="ur-container grid gap-4 py-6 md:grid-cols-3">
        {trustStats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex items-center gap-4 rounded-ur-lg border border-ur-border bg-ur-surface p-5"
            >
              <div className="grid h-12 w-12 place-items-center rounded-ur bg-ur-success-bg text-ur-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-ur-text-muted">
                  {item.label}
                </p>
                <h3 className="mt-1 font-bold text-ur-navy">{item.value}</h3>
                <p className="mt-1 text-sm text-ur-text-secondary">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
