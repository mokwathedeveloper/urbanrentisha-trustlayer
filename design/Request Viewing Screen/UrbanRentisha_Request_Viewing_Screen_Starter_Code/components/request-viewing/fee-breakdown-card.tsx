import type { ViewingProperty } from "@/lib/request-viewing-data";
import { feeBreakdown } from "@/lib/request-viewing-data";

type FeeBreakdownCardProps = {
  property: ViewingProperty;
};

export function FeeBreakdownCard({ property }: FeeBreakdownCardProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Fee breakdown
      </p>

      <div className="mt-4 space-y-3">
        {feeBreakdown.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center justify-between gap-4 rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-sm font-bold text-white/70">{item.label}</p>
              </div>
              <p className="text-sm font-black text-white">
                {item.label === "Viewing fee" ? `KES ${property.viewingFeeKes.toLocaleString()}` : item.value}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
