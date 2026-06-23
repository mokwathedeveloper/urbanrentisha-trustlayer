"use client";

import { useAuth } from "@/lib/auth";
import { useRealtimeEvent } from "@/lib/realtime";
import { playSound } from "@/lib/sound";
import type { NotificationItem } from "@/lib/api";

const RESERVATION_TITLES = ["Property Reserved by Another Tenant", "Property Available Again", "Listing Reservation Conflict"];

/**
 * Mounted once in the authenticated app shell - this is the single place
 * that plays alert sounds, so the badge components (Topbar, Sidebar) can
 * each subscribe to the same real-time events for counting without also
 * triggering a duplicate sound per mounted component.
 */
export function SoundEffects() {
  const { token } = useAuth();

  useRealtimeEvent(token, "message:new", () => {
    playSound("message");
  });

  useRealtimeEvent(token, "notification:new", (notification: NotificationItem) => {
    if (notification.title === "New Message") return; // already covered by message:new
    if (notification.type === "REPORT") {
      playSound("report");
      return;
    }
    if (RESERVATION_TITLES.includes(notification.title)) {
      playSound("reservation");
      return;
    }
    playSound("general");
  });

  return null;
}
