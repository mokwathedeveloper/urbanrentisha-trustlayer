import type { NotificationItem } from "./api";

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
