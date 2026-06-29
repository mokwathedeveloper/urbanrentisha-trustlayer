import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { api, type NotificationItem } from "./api";
import { useRealtimeEvent } from "./realtime";
import type { IconName } from "@/components/ui/icon";

// Mirrors ViewingRequestStatus in prisma/schema.prisma minus the terminal
// statuses (ACCESS_UNLOCKED/EXPIRED/REVOKED/CANCELLED) and QUEUED, which has
// no single next-step page since the tenant doesn't hold the turn yet.
// Shared by the homepage "Continue Booking" CTA and the notification
// routing map below, so the two can never disagree about where a given
// request status should go.
export const REQUEST_STATUS_TO_HREF: Record<string, (id: string) => string> = {
  CREATED: (id) => `/requests/${id}/payment`,
  AWAITING_PAYMENT: (id) => `/requests/${id}/payment`,
  PAYMENT_RECEIVED: (id) => `/requests/${id}/proof`,
  PROOF_GENERATING: (id) => `/requests/${id}/proof`,
  PROOF_READY: (id) => `/requests/${id}/verify`,
  PROOF_VERIFIED: (id) => `/requests/${id}/code`,
};

/**
 * Resolves where clicking a notification should navigate to, based on its
 * type, title, and whichever entity it references - verified against every
 * real `NotificationsService.create()` call site in the backend (payments,
 * proof-verification, viewing-codes, reports, viewing-requests, listings,
 * admin-verification, reconciliation), not guessed. Returns null only for
 * notifications with genuinely no concrete destination (e.g. "New Signup",
 * sent to admins with no entity reference at all).
 */
export function getNotificationLink(notification: NotificationItem): string | null {
  if (notification.title === "New Message") return "/messages";

  const requestId = notification.viewingRequestId;

  if (notification.type === "PAYMENT" && requestId) {
    return notification.title.includes("Escrow") ? `/requests/${requestId}/escrow` : `/requests/${requestId}/payment`;
  }

  if (notification.type === "PROOF" && requestId) {
    return `/requests/${requestId}/verify`;
  }

  if (notification.type === "VIEWING_CODE" && requestId) {
    return `/requests/${requestId}/code`;
  }

  if (notification.type === "REPORT") return "/reports";

  if (notification.type === "SYSTEM") {
    // Sent to the landlord who invited the agent ("Agent Invite Approved")
    // - distinct from "New Agent Invite Pending Review", sent to admins,
    // which genuinely belongs on the admin verification queue.
    if (notification.title === "Agent Invite Approved") return "/team";
    if (notification.title.includes("Agent Invite")) return "/admin/verifications";

    // Admin-only reconciliation alerts (reconciliation.service.ts) carry no
    // entityId at all - the payment/listing id only appears inside the
    // free-text message - so the audit log is the closest real destination.
    if (notification.title.startsWith("Reconciliation:")) return "/audit-logs";

    // Queue-position updates (viewing-requests.service.ts) - all four carry
    // viewingRequestId and are about the same payment-turn flow, whether the
    // outcome was positive ("It's Your Turn!") or not ("Turn Has Expired").
    if (requestId) return `/requests/${requestId}/payment`;
  }

  if (notification.listingId) return `/listings/${notification.listingId}`;
  if (notification.viewingRequest?.listingId) return `/listings/${notification.viewingRequest.listingId}`;

  // Last resort: route to whatever the linked request's *current* status
  // says is the next actionable step, same mapping the homepage CTA uses -
  // covers any notification type/title not explicitly handled above as
  // long as it at least references a request.
  if (requestId && notification.viewingRequest?.status) {
    const toHref = REQUEST_STATUS_TO_HREF[notification.viewingRequest.status];
    if (toHref) return toHref(requestId);
  }

  return null;
}

/**
 * Unread notifications first (newest first within that group), then read
 * notifications (also newest first) - Array.prototype.sort is a stable
 * sort (guaranteed since ES2019), so this is a straightforward partition
 * by read state, not a full re-sort that could reorder same-state items.
 */
export function sortNotifications(items: NotificationItem[]): NotificationItem[] {
  return [...items].sort((a, b) => {
    const aUnread = a.readAt ? 0 : 1;
    const bUnread = b.readAt ? 0 : 1;
    if (aUnread !== bUnread) return bUnread - aUnread;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

export const NOTIFICATION_TYPE_META: Record<string, { label: string; icon: IconName; color: string }> = {
  PAYMENT: { label: "Payment", icon: "account_balance_wallet", color: "text-ur-primary" },
  PROOF: { label: "Proof", icon: "verified_user", color: "text-ur-cyan" },
  VIEWING_CODE: { label: "Viewing Code", icon: "key", color: "text-ur-mint" },
  REPORT: { label: "Report", icon: "flag", color: "text-ur-warning" },
  SYSTEM: { label: "System", icon: "settings", color: "text-ur-muted" },
};

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
 * Single source of truth for the notification list, shared by the Topbar
 * bell badge, the bell's dropdown preview, the sidebar nav badge, and
 * anywhere else that needs it - so they can never drift out of sync with
 * each other, and never trigger more than one fetch/poll cycle between
 * them. Real-time push keeps it instant; polling is only the fallback if
 * the socket connection drops.
 */
export function useNotifications(token: string | null): {
  notifications: NotificationItem[];
  setNotifications: Dispatch<SetStateAction<NotificationItem[]>>;
} {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    if (!token) return;
    const load = () =>
      api.notifications.findMine(token).then((response) => setNotifications(response.items));
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

  return { notifications, setNotifications };
}

export function useUnreadNotificationsCount(token: string | null): number {
  const { notifications } = useNotifications(token);
  return notifications.filter((n) => !n.readAt).length;
}
