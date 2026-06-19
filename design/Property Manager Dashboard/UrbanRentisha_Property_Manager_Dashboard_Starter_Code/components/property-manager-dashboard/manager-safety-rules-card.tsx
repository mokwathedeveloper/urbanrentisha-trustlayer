import { safetyRules } from "@/lib/property-manager-data";

export function ManagerSafetyRulesCard() {
  return (
    <section className="rounded-ur-xl border border-ur-warning/25 bg-ur-warning-bg p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-warning">
        Manager safety rules
      </p>

      <div className="mt-4 space-y-3">
        {safetyRules.map((rule) => {
          const Icon = rule.icon;

          return (
            <div key={rule.title} className="flex gap-3 rounded-ur-sm border border-ur-warning/20 bg-black/16 p-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm bg-ur-warning/15 text-ur-warning">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-black text-white">{rule.title}</p>
                <p className="mt-1 text-xs leading-5 text-ur-warning/74">{rule.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
