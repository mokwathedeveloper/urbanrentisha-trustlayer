"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { api, type NotificationItem } from "@/lib/api";
import {
  NOTIFICATION_TYPE_META,
  broadcastNotificationsChanged,
  getNotificationLink,
  sortNotifications,
} from "@/lib/notifications";
import { Icon } from "@/components/ui/icon";

const PREVIEW_LIMIT = 8;

function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/**
 * Quick preview panel opened from the Topbar's bell - same notification
 * list the badge count is derived from (passed in as a prop, not
 * re-fetched here), sorted unread-first. Clicking a row marks it read
 * (optimistic, matching the existing pattern in app/(app)/notifications)
 * and navigates via the same getNotificationLink used by the full page,
 * so the two surfaces can never disagree about where a notification goes.
 */
export function NotificationsDropdown({
  notifications,
  onNotificationsChange,
  onClose,
}: {
  notifications: NotificationItem[];
  onNotificationsChange: (updater: (prev: NotificationItem[]) => NotificationItem[]) => void;
  onClose: () => void;
}) {
  const { token } = useAuth();
  const router = useRouter();

  const sorted = sortNotifications(notifications).slice(0, PREVIEW_LIMIT);

  async function handleSelect(notification: NotificationItem) {
    if (!notification.readAt) {
      onNotificationsChange((prev) =>
        prev.map((n) => (n.id === notification.id ? { ...n, readAt: new Date().toISOString() } : n)),
      );
      if (token) {
        api.notifications
          .markRead(token, notification.id)
          .then(() => broadcastNotificationsChanged())
          .catch(() => {
            // Best-effort: the next poll/page visit will reconcile the read state.
          });
      }
    }

    onClose();
    const link = getNotificationLink(notification);
    if (link) router.push(link);
  }

  return (
    <div
      role="dialog"
      aria-label="Notifications"
      className="absolute right-0 top-full z-20 mt-2 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-ur-sm border border-ur-border bg-ur-card shadow-lg"
    >
      <div className="flex items-center justify-between border-b border-ur-border px-4 py-3">
        <p className="text-sm font-bold text-ur-navy">Notifications</p>
        <Link
          href="/notifications"
          onClick={onClose}
          className="text-xs font-semibold text-ur-mint hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="max-h-[70vh] overflow-y-auto sm:max-h-96">
        {sorted.length === 0 ? (
          <p className="p-5 text-center text-sm text-ur-text-muted">No notifications yet.</p>
        ) : (
          <ul className="divide-y divide-ur-border">
            {sorted.map((notification) => {
              const meta = NOTIFICATION_TYPE_META[notification.type] ?? NOTIFICATION_TYPE_META.SYSTEM;
              const unread = !notification.readAt;
              return (
                <li key={notification.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(notification)}
                    className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-ur-card-hover ${
                      unread ? "bg-ur-success-bg/40" : ""
                    }`}
                  >
                    <span
                      className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${unread ? "bg-ur-cyan" : "bg-transparent"}`}
                      aria-hidden="true"
                    />
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ur-card-soft ${meta.color}`}>
                      <Icon name={meta.icon} size={14} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block break-words text-sm ${unread ? "font-bold text-ur-text" : "font-semibold text-ur-text-secondary"}`}>
                        {notification.title}
                      </span>
                      <span className="mt-0.5 line-clamp-2 block break-words text-xs text-ur-text-secondary">
                        {notification.message}
                      </span>
                      <span className="mt-1 block text-xs text-ur-text-muted">{formatRelativeTime(notification.createdAt)}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
