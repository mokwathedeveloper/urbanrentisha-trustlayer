import { auditExportOptions } from "@/lib/audit-log-data";
import { Button } from "@/components/ui/button";

export function AuditExportPanel() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Export and actions
      </p>

      <div className="mt-4 space-y-3">
        {auditExportOptions.map((option, index) => {
          const Icon = option.icon;

          return (
            <button
              key={option.label}
              type="button"
              className="flex w-full items-center justify-between gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3 text-left transition-colors hover:border-ur-primary/40 hover:bg-white/[0.04] ur-focus"
            >
              <div className="flex gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-black text-white">{option.label}</p>
                  <p className="mt-1 text-xs leading-5 text-white/52">{option.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <Button className="mt-4 w-full">
        Export filtered audit log
      </Button>
    </section>
  );
}
