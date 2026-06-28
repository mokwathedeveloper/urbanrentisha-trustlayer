"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { Icon } from "@/components/ui/icon";
import { useUnreadNotificationsCount } from "@/lib/notifications";
import { LogoMark } from "@/components/landing/logo-mark";
import { MobileNavDrawer } from "@/components/app-shell/mobile-nav-drawer";

export function Topbar() {
  const { user, token, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const unreadCount = useUnreadNotificationsCount(token);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex h-16 items-center gap-4 border-b border-ur-border bg-ur-bg px-4 sm:px-6">
      <div className="flex items-center gap-3 lg:hidden">
        <button
          type="button"
          onClick={() => setNavOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={navOpen}
          className="ur-focus grid h-10 w-10 place-items-center rounded-ur-sm text-ur-text-secondary hover:bg-ur-card-hover hover:text-ur-navy"
        >
          <Icon name="menu" size={22} />
        </button>
        <LogoMark className="h-8 w-auto" />
      </div>

      <MobileNavDrawer open={navOpen} onClose={() => setNavOpen(false)} />

      <div className="ml-auto flex items-center gap-4">
        <button
          type="button"
          onClick={() => router.push("/notifications")}
          className="relative text-ur-text-secondary hover:text-ur-navy"
          aria-label="Notifications"
        >
          <Icon name="notifications" size={20} />
          {unreadCount > 0 ? (
            <span className="absolute -right-1.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-ur-mint px-1 text-[10px] font-bold text-ur-bg">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          ) : null}
        </button>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex items-center gap-2"
          >
            <div className="grid h-9 w-9 place-items-center rounded-full bg-ur-card-soft text-sm font-bold text-ur-primary">
              {(user?.name ?? "?").charAt(0)}
            </div>
            <div className="text-left leading-tight">
              <p className="text-sm font-semibold text-ur-navy">{user?.name ?? "Guest"}</p>
              <p className="text-xs capitalize text-ur-primary">{(user?.role ?? "").toLowerCase()}</p>
            </div>
            <Icon name="expand_more" size={16} className="text-ur-text-muted" />
          </button>

          {menuOpen ? (
            <div className="absolute right-0 top-full z-20 mt-2 w-44 overflow-hidden rounded-ur-sm border border-ur-border bg-ur-card shadow-lg">
              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-ur-text-secondary hover:bg-ur-card-soft"
              >
                <Icon name="person" size={16} />
                Profile
              </Link>
              <Link
                href="/settings"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-ur-text-secondary hover:bg-ur-card-soft"
              >
                <Icon name="settings" size={16} />
                Settings
              </Link>
              <button
                type="button"
                onClick={logout}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-ur-error hover:bg-ur-card-soft"
              >
                <Icon name="logout" size={16} />
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
