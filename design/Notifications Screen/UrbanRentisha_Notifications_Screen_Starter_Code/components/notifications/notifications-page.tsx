"use client";

import { useMemo, useState } from "react";
import { Bell, CheckCheck, Search, SlidersHorizontal } from "lucide-react";
import {
  initialNotifications,
  type NotificationRecord,
  type NotificationType
} from "@/lib/notifications-data";
import { NotificationsHeader } from "@/components/notifications/notifications-header";
import { NotificationStatsGrid } from "@/components/notifications/notification-stats-grid";
import { NotificationFilters } from "@/components/notifications/notification-filters";
import { NotificationList } from "@/components/notifications/notification-list";
import { NotificationDetailPanel } from "@/components/notifications/notification-detail-panel";
import { NotificationPreferencesCard } from "@/components/notifications/notification-preferences-card";
import { NotificationTimelineCard } from "@/components/notifications/notification-timeline-card";
import { SafetyHighlightsCard } from "@/components/notifications/safety-highlights-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationRecord[]>(initialNotifications);
  const [activeFilter, setActiveFilter] = useState<NotificationType>("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(initialNotifications[0]?.id ?? "");

  const selectedNotification =
    notifications.find((notification) => notification.id === selectedId) ?? notifications[0];

  const unreadCount = notifications.filter((notification) => notification.unread).length;

  const filteredNotifications = useMemo(() => {
    const cleanedQuery = query.trim().toLowerCase();

    return notifications.filter((notification) => {
      const matchesType = activeFilter === "all" || notification.type === activeFilter;
      const matchesQuery =
        cleanedQuery.length === 0 ||
        notification.title.toLowerCase().includes(cleanedQuery) ||
        notification.description.toLowerCase().includes(cleanedQuery) ||
        notification.requestId.toLowerCase().includes(cleanedQuery);

      return matchesType && matchesQuery;
    });
  }, [activeFilter, notifications, query]);

  function markAsRead(id: string) {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id ? { ...notification, unread: false } : notification
      )
    );
  }

  function markAllAsRead() {
    setNotifications((current) =>
      current.map((notification) => ({ ...notification, unread: false }))
    );
  }

  function selectNotification(id: string) {
    setSelectedId(id);
    markAsRead(id);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 notifications-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-mint/10 blur-[130px]" />

      <div className="relative z-10">
        <NotificationsHeader unreadCount={unreadCount} />

        <section className="ur-container pb-12 pt-5">
          <div className="mb-6 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="success">
                  <Bell className="h-3.5 w-3.5" />
                  {unreadCount} unread
                </Badge>
                <Badge variant="outline">
                  Payment, proof, access, report, and viewing-code updates
                </Badge>
              </div>

              <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
                Notifications
              </p>
              <h1 className="mt-3 max-w-[900px] text-[42px] font-black leading-[1.02] tracking-[-0.07em] text-white sm:text-[56px]">
                Stay updated across the trust flow.
              </h1>
              <p className="mt-4 max-w-[820px] text-base leading-7 text-white/66">
                Track important updates for payments, ZK proofs, access unlocks, suspicious reports, and active viewing codes.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Button variant="outline">
                <SlidersHorizontal className="h-4 w-4" />
                Preferences
              </Button>
              <Button onClick={markAllAsRead}>
                <CheckCheck className="h-4 w-4" />
                Mark all read
              </Button>
            </div>
          </div>

          <NotificationStatsGrid unreadCount={unreadCount} />

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_390px]">
            <section className="space-y-5">
              <div className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                  <NotificationFilters
                    activeFilter={activeFilter}
                    onChange={setActiveFilter}
                  />

                  <label className="relative block xl:w-[360px]">
                    <span className="sr-only">Search notifications</span>
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/42" />
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search request, hash, update..."
                      className="h-11 w-full rounded-ur-sm border border-white/10 bg-black/18 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-ur-primary"
                    />
                  </label>
                </div>
              </div>

              <NotificationList
                notifications={filteredNotifications}
                selectedId={selectedNotification?.id}
                onSelect={selectNotification}
                onMarkAsRead={markAsRead}
              />
            </section>

            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <NotificationDetailPanel notification={selectedNotification} />
              <NotificationPreferencesCard />
              <NotificationTimelineCard />
              <SafetyHighlightsCard />
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
