import { useEffect, useState } from "react";
import { api } from "./api";
import { useRealtimeEvent } from "./realtime";

const POLL_INTERVAL_MS = 10000;

/**
 * Fired whenever a thread is marked read locally, so the sidebar's unread
 * badge updates immediately instead of waiting for its next poll - mirrors
 * NOTIFICATIONS_CHANGED_EVENT in lib/notifications.ts.
 */
export const MESSAGES_CHANGED_EVENT = "ur:messages-changed";

export function broadcastMessagesChanged() {
  window.dispatchEvent(new Event(MESSAGES_CHANGED_EVENT));
}

/**
 * Single source of truth for the total unread message count across every
 * conversation, shared by the sidebar nav badge and anywhere else that
 * needs it. Real-time push (`message:new`/`message:read`) keeps it instant;
 * polling is only the fallback if the socket connection drops.
 */
export function useUnreadMessagesCount(token: string | null): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!token) return;
    const load = () =>
      api.messages
        .findInbox(token)
        .then((threads) => setCount(threads.reduce((sum, t) => sum + t.unreadCount, 0)));
    load();
    const interval = setInterval(load, POLL_INTERVAL_MS);
    window.addEventListener(MESSAGES_CHANGED_EVENT, load);
    return () => {
      clearInterval(interval);
      window.removeEventListener(MESSAGES_CHANGED_EVENT, load);
    };
  }, [token]);

  useRealtimeEvent(token, "message:new", () => {
    if (!token) return;
    api.messages
      .findInbox(token)
      .then((threads) => setCount(threads.reduce((sum, t) => sum + t.unreadCount, 0)));
  });

  useRealtimeEvent(token, "message:read", () => {
    if (!token) return;
    api.messages
      .findInbox(token)
      .then((threads) => setCount(threads.reduce((sum, t) => sum + t.unreadCount, 0)));
  });

  return count;
}
