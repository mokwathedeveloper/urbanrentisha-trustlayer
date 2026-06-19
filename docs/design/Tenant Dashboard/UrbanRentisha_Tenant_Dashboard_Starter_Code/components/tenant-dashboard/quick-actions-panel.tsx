import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { quickActions } from "@/lib/tenant-dashboard-data";

export function QuickActionsPanel() {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Quick actions
      </p>
      <h2 className="mt-2 text-lg font-black text-white">Continue your trust flow</h2>

      <div className="mt-4 space-y-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center justify-between gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3 transition-colors hover:border-ur-primary/40 hover:bg-white/[0.04] ur-focus"
            >
              <div className="flex gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-black text-white">{action.label}</p>
                  <p className="mt-1 text-xs leading-5 text-white/52">{action.description}</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-white/38" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
