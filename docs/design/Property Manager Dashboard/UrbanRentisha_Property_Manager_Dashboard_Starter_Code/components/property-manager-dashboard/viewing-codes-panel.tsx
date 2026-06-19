import { Copy, KeyRound } from "lucide-react";
import { statusVisuals, type CodeStatus, viewingCodes } from "@/lib/property-manager-data";
import { StatusBadge } from "@/components/property-manager-dashboard/status-badge";
import { Button } from "@/components/ui/button";

export function ViewingCodesPanel() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Viewing codes
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        Access code management
      </h2>

      <div className="mt-5 space-y-3">
        {viewingCodes.map((code) => {
          const status = statusVisuals.code[code.status as CodeStatus];

          return (
            <article key={code.id} className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                    <KeyRound className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-black text-white">{code.propertyTitle}</p>
                    <p className="mt-1 text-sm text-white/52">{code.tenantName}</p>
                    <p className="mt-2 font-mono text-xs font-bold text-ur-mint">{code.id}</p>
                  </div>
                </div>
                <StatusBadge label={status.label} variant={status.variant} icon={status.icon} />
              </div>

              <div className="mt-4 rounded-ur-sm border border-white/10 bg-black/20 p-3">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
                  Code
                </p>
                <p className="mt-1 break-all font-mono text-lg font-black tracking-[0.08em] text-white">
                  {code.code}
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-xs text-white/46">{code.expiresAt}</p>
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
