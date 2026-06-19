import {
  Bell,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
  WalletCards
} from "lucide-react";

type NotificationStatsGridProps = {
  unreadCount: number;
};

const stats = [
  {
    label: "Unread",
    icon: Bell
  },
  {
    label: "Payments",
    icon: WalletCards
  },
  {
    label: "Proofs",
    icon: LockKeyhole
  },
  {
    label: "Access",
    icon: KeyRound
  }
];

export function NotificationStatsGrid({ unreadCount }: NotificationStatsGridProps) {
  const values = [unreadCount, 2, 1, 2];

  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <article
            key={stat.label}
            className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
                  {stat.label}
                </p>
                <p className="mt-2 text-3xl font-black tracking-[-0.05em] text-white">
                  {values[index]}
                </p>
              </div>
              <div className="grid h-11 w-11 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                <Icon className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-ur-success">
              <ShieldCheck className="h-3.5 w-3.5" />
              Updated from trust flow
            </div>
          </article>
        );
      })}
    </section>
  );
}
