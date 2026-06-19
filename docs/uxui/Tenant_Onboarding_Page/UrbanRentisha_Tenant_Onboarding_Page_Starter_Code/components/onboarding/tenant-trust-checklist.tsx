import { tenantBenefits } from "@/lib/onboarding-data";

export function TenantTrustChecklist() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Tenant safety checklist
      </p>

      <h2 className="mt-2 text-xl font-black tracking-[-0.03em] text-white">
        What the tenant should know before requesting a viewing.
      </h2>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tenantBenefits.map((benefit) => {
          const Icon = benefit.icon;

          return (
            <div key={benefit.label} className="flex items-center gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
                <Icon className="h-4.5 w-4.5" />
              </div>
              <p className="text-sm font-bold text-white/78">{benefit.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
