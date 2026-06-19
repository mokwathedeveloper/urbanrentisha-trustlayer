import { Inbox } from "lucide-react";
import type { NotificationRecord } from "@/lib/notifications-data";
import { NotificationListItem } from "@/components/notifications/notification-list-item";

type NotificationListProps = {
  notifications: NotificationRecord[];
  selectedId?: string;
  onSelect: (id: string) => void;
  onMarkAsRead: (id: string) => void;
};

export function NotificationList({
  notifications,
  selectedId,
  onSelect,
  onMarkAsRead
}: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-8 text-center shadow-soft-dark backdrop-blur-xl">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-ur-lg bg-white/5 text-white/42">
          <Inbox className="h-7 w-7" />
        </div>
        <h2 className="mt-4 text-xl font-black text-white">No notifications found</h2>
        <p className="mt-2 text-sm text-white/52">
          Try another filter or search term.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-3">
      {notifications.map((notification) => (
        <NotificationListItem
          key={notification.id}
          notification={notification}
          selected={notification.id === selectedId}
          onSelect={() => onSelect(notification.id)}
          onMarkAsRead={() => onMarkAsRead(notification.id)}
        />
      ))}
    </section>
  );
}
