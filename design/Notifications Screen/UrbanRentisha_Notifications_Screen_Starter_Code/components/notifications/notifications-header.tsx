import Link from "next/link";
import { Bell, LayoutDashboard, Menu, UserRound } from "lucide-react";
import { LogoMark } from "@/components/notifications/logo-mark";
import { Badge } from "@/components/ui/badge";

type NotificationsHeaderProps = {
  unreadCount: number;
};

export function NotificationsHeader({ unreadCount }: NotificationsHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ur-bg/78 backdrop-blur-xl">
      <div className="ur-container flex h-20 items-center justify-between">
        <LogoMark />

        <nav className="hidden items-center gap-2 lg:flex" aria-label="Main navigation">
          {[
            { label: "Dashboard", href: "/tenant/dashboard" },
            { label: "Properties", href: "/listings" },
            { label: "Viewing Code", href: "/viewing-code/REQ-UR-9084" },
            { label: "Notifications", href: "/notifications", active: true }
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={
                item.active
                  ? "rounded-ur-sm bg-ur-primary/10 px-4 py-2 text-sm font-bold text-ur-mint ur-focus"
                  : "rounded-ur-sm px-4 py-2 text-sm font-bold text-white/56 transition-colors hover:bg-white/5 hover:text-white ur-focus"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/notifications"
            className="relative hidden h-10 w-10 place-items-center rounded-ur-sm border border-ur-primary/30 bg-ur-primary/10 text-ur-primary transition-colors hover:bg-ur-primary/15 ur-focus sm:grid"
            aria-label={`${unreadCount} unread notifications`}
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 ? (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-ur-primary px-1 text-[10px] font-black text-white">
                {unreadCount}
              </span>
            ) : null}
          </Link>

          <Link
            href="/tenant/dashboard"
            className="hidden h-10 items-center gap-2 rounded-ur-sm border border-white/10 px-4 text-sm font-bold text-white/70 transition-colors hover:border-ur-primary/50 hover:bg-white/5 hover:text-white ur-focus sm:inline-flex"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-ur-sm border border-white/10 text-white/70 transition-colors hover:border-ur-primary/50 hover:bg-white/5 hover:text-white ur-focus"
            aria-label="User menu"
          >
            <UserRound className="h-4 w-4 sm:hidden" />
            <Menu className="hidden h-4 w-4 sm:block lg:hidden" />
          </button>

          <Badge variant="success" className="hidden xl:inline-flex">
            Live updates
          </Badge>
        </div>
      </div>
    </header>
  );
}
