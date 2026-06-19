import Link from "next/link";
import { ArrowRight, Bell, Clock3 } from "lucide-react";
import type { NotificationRecord } from "@/lib/notifications-data";
import { typeVisuals } from "@/lib/notifications-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type NotificationDetailPanelProps = {
  notification?: NotificationRecord;
};

export function NotificationDetailPanel({
  notification
}: NotificationDetailPanelProps) {
  if (!notification) {
    return (
      <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
        <p className="text-sm text-white/52">Select a notification to view details.</p>
      </section>
    );
  }

  const visual = typeVisuals[notification.type];
  const Icon = visual.icon;

  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-ur-lg bg-ur-primary text-white shadow-green-glow">
          <Icon className="h-6 w-6" />
        </div>

        <Badge variant={notification.unread ? "success" : "outline"}>
          {notification.unread ? "Unread" : "Read"}
        </Badge>
      </div>

      <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Notification detail
      </p>
      <h2 className="mt-2 text-xl font-black tracking-[-0.03em] text-white">
        {notification.title}
      </h2>
      <p className="mt-3 text-sm leading-6 text-white/60">
        {notification.description}
      </p>

      <div className="mt-5 rounded-ur-lg border border-white/10 bg-black/16 p-4">
        <div className="flex items-center gap-2 text-sm font-bold text-white/70">
          <Clock3 className="h-4 w-4 text-ur-primary" />
          {notification.timestamp}
        </div>
        <div className="mt-2 flex items-center gap-2 text-sm font-bold text-white/70">
          <Bell className="h-4 w-4 text-ur-primary" />
          {visual.label} update
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {notification.meta.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3"
          >
            <p className="text-sm font-bold text-white/58">{item.label}</p>
            <p className="max-w-[180px] truncate font-mono text-xs font-bold text-ur-mint">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <Link href={notification.href} className="mt-5 block">
        <Button className="w-full">
          {notification.actionLabel}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </section>
  );
}
