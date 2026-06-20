"use client";

import { Bell, ChevronDown } from "lucide-react";
import { useAuth } from "@/lib/auth";

export function Topbar() {
  const { user } = useAuth();

  return (
    <header className="flex h-16 items-center justify-end gap-4 border-b border-ur-border bg-ur-bg px-6">
      <button type="button" className="relative text-ur-text-secondary hover:text-ur-navy" aria-label="Notifications">
        <Bell className="h-5 w-5" />
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-ur-mint" />
      </button>

      <div className="flex items-center gap-2">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-ur-card-soft text-sm font-bold text-ur-primary">
          {(user?.name ?? "?").charAt(0)}
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-ur-navy">{user?.name ?? "Guest"}</p>
          <p className="text-xs capitalize text-ur-primary">{(user?.role ?? "").toLowerCase()}</p>
        </div>
        <ChevronDown className="h-4 w-4 text-ur-text-muted" />
      </div>
    </header>
  );
}
