import { UserCheck, WalletCards } from "lucide-react";
import { statusVisuals, type TenantStatus, verifiedTenants } from "@/lib/property-manager-data";
import { StatusBadge } from "@/components/property-manager-dashboard/status-badge";

export function VerifiedTenantsPanel() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Verified tenants
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        Tenant trust profile
      </h2>

      <div className="mt-5 space-y-3">
        {verifiedTenants.map((tenant) => {
          const status = statusVisuals.tenant[tenant.verification as TenantStatus];

          return (
            <article key={tenant.id} className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                    <UserCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-black text-white">{tenant.name}</p>
                    <p className="mt-1 text-sm text-white/52">{tenant.propertyTitle}</p>
                    <p className="mt-2 font-mono text-xs font-bold text-ur-mint">{tenant.id}</p>
                  </div>
                </div>
                <StatusBadge label={status.label} variant={status.variant} icon={status.icon} />
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-ur-sm border border-white/10 bg-black/20 p-3">
                <WalletCards className="h-4 w-4 text-ur-primary" />
                <p className="font-mono text-xs font-bold text-white">{tenant.walletAddress}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
