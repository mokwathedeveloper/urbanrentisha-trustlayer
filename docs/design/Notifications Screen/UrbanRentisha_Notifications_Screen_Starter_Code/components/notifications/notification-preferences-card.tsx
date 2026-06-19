import { notificationPreferences } from "@/lib/notifications-data";

export function NotificationPreferencesCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Notification preferences
      </p>

      <div className="mt-4 space-y-3">
        {notificationPreferences.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center justify-between gap-4 rounded-ur-sm border border-white/10 bg-black/16 p-3"
            >
              <div className="flex gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-black text-white">{item.title}</p>
                  <p className="mt-1 text-xs leading-5 text-white/52">{item.description}</p>
                </div>
              </div>

              <button
                type="button"
                className="relative h-6 w-11 shrink-0 rounded-full bg-ur-primary transition-colors ur-focus"
                aria-label={`${item.title} enabled`}
              >
                <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
