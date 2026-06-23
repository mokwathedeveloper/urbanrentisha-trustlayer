import { useEffect, useState } from "react";
import { api, type NotificationItem } from "./api";
import { useRealtimeEvent } from "./realtime";

/**
 * Resolves where clicking a notification should navigate to, based on
 * whichever entity it references. Returns null for notifications with no
 * concrete destination (e.g. a generic "Report Received" confirmation).
 */
export function getNotificationLink(notification: NotificationItem): string | null {
  if (notification.title === "New Message") return "/messages";
  if (notification.listingId) return `/listings/${notification.listingId}`;
  if (notification.viewingRequest?.listingId) return `/listings/${notification.viewingRequest.listingId}`;
  if (notification.type === "REPORT") return "/reports";
  if (notification.title.includes("Agent Invite")) return "/admin/verifications";
  return null;
}

/**
 * Fired whenever notifications are marked read anywhere in the app, so the
 * Topbar's unread badge updates immediately instead of waiting for its
 * next poll.
 */
export const NOTIFICATIONS_CHANGED_EVENT = "ur:notifications-changed";

export function broadcastNotificationsChanged() {
  window.dispatchEvent(new Event(NOTIFICATIONS_CHANGED_EVENT));
}

const POLL_INTERVAL_MS = 30000;

/**
 * Single source of truth for the unread notification count, shared by the
 * Topbar bell, the sidebar nav badge, and anywhere else that needs it - so
 * they can never drift out of sync with each other. Real-time push keeps it
 * instant; polling is only the fallback if the socket connection drops.
 */
export function useUnreadNotificationsCount(token: string | null): number {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    if (!token) return;
    const load = () => api.notifications.findMine(token).then(setNotifications);
    load();
    const interval = setInterval(load, POLL_INTERVAL_MS);
    window.addEventListener(NOTIFICATIONS_CHANGED_EVENT, load);
    return () => {
      clearInterval(interval);
      window.removeEventListener(NOTIFICATIONS_CHANGED_EVENT, load);
    };
  }, [token]);

  useRealtimeEvent(token, "notification:new", (notification: NotificationItem) => {
    setNotifications((prev) => [notification, ...prev]);
  });

  return notifications.filter((n) => !n.readAt).length;
}
