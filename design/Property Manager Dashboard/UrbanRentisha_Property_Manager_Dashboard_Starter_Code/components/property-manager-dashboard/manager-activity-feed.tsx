import { Bell, Flag, LockKeyhole, WalletCards } from "lucide-react";
import { recentActivity } from "@/lib/property-manager-data";

const icons = {
  listing: Bell,
  request: Bell,
  payment: WalletCards,
  proof: LockKeyhole,
  report: Flag
};

export function ManagerActivityFeed() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Recent activity
      </p>

      <div className="mt-4 space-y-3">
        {recentActivity.map((item) => {
          const Icon = icons[item.type];

          return (
            <article key={item.id} className="flex gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-black text-white">{item.title}</p>
                <p className="mt-1 text-xs leading-5 text-white/52">{item.description}</p>
                <p className="mt-2 text-xs font-bold text-white/38">{item.time}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
