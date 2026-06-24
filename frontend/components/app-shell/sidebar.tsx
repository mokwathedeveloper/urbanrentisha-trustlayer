"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "@/components/ui/icon";
import { LogoMark } from "@/components/landing/logo-mark";
import type { UserRole } from "@/lib/api";
import { useUnreadNotificationsCount } from "@/lib/notifications";
import { useUnreadMessagesCount } from "@/lib/messages";

type NavItem = { label: string; href: string; icon: IconName };

const ALL_LISTINGS: NavItem = { label: "All Listings", href: "/listings", icon: "apartment" };
const MY_LANDLORD_PROPERTIES: NavItem = { label: "My Properties", href: "/listings/mine", icon: "apartment" };
const MY_ASSIGNED_PROPERTIES: NavItem = { label: "Properties Assigned To Me", href: "/listings/mine", icon: "apartment" };
const MESSAGES: NavItem = { label: "Messages", href: "/messages", icon: "mail" };
const NOTIFICATIONS: NavItem = { label: "Notifications", href: "/notifications", icon: "notifications" };
const REPORTS: NavItem = { label: "Reports", href: "/reports", icon: "flag" };
const ESCROW_HOLDS: NavItem = { label: "Escrow / Holds", href: "/escrow", icon: "lock" };
const REPORT_FAKE_LISTING: NavItem = { label: "Report Fake Listing", href: "/reports/new", icon: "warning" };
const PROFILE: NavItem = { label: "Profile", href: "/profile", icon: "person" };
const SETTINGS: NavItem = { label: "Settings", href: "/settings", icon: "settings" };

const ROLE_NAV_ITEMS: Record<UserRole, NavItem[]> = {
  TENANT: [
    ALL_LISTINGS,
    { label: "My Bookings", href: "/bookings", icon: "description" },
    { label: "Saved Properties", href: "/saved", icon: "favorite" },
    MESSAGES,
    { label: "Applications", href: "/applications", icon: "description" },
    { label: "Payments", href: "/payments", icon: "credit_card" },
    ESCROW_HOLDS,
    { label: "Verifications", href: "/verifications", icon: "verified_user" },
    { label: "Viewing Code", href: "/viewing-code", icon: "lock" },
    REPORTS,
    REPORT_FAKE_LISTING,
    NOTIFICATIONS,
    PROFILE,
    SETTINGS,
  ],
  LANDLORD: [
    MY_LANDLORD_PROPERTIES,
    ALL_LISTINGS,
    ESCROW_HOLDS,
    MESSAGES,
    REPORTS,
    REPORT_FAKE_LISTING,
    NOTIFICATIONS,
    PROFILE,
    SETTINGS,
  ],
  AGENT: [
    MY_ASSIGNED_PROPERTIES,
    ALL_LISTINGS,
    ESCROW_HOLDS,
    MESSAGES,
    REPORTS,
    REPORT_FAKE_LISTING,
    NOTIFICATIONS,
    PROFILE,
    SETTINGS,
  ],
  MANAGER: [
    MY_ASSIGNED_PROPERTIES,
    ALL_LISTINGS,
    ESCROW_HOLDS,
    MESSAGES,
    REPORTS,
    REPORT_FAKE_LISTING,
    NOTIFICATIONS,
    PROFILE,
    SETTINGS,
  ],
  ADMIN: [
    ALL_LISTINGS,
    { label: "Verification Review", href: "/admin/verifications", icon: "verified_user" },
    { label: "Audit Logs", href: "/audit-logs", icon: "assignment" },
    REPORTS,
    MESSAGES,
    NOTIFICATIONS,
    PROFILE,
    SETTINGS,
  ],
  PLATFORM: [
    ALL_LISTINGS,
    { label: "Verification Review", href: "/admin/verifications", icon: "verified_user" },
    { label: "Audit Logs", href: "/audit-logs", icon: "assignment" },
    REPORTS,
    MESSAGES,
    NOTIFICATIONS,
    PROFILE,
    SETTINGS,
  ],
};

const supportItems: NavItem[] = [{ label: "Help & Support", href: "/help", icon: "help" }];

const CAN_LIST_PROPERTY: UserRole[] = ["LANDLORD", "AGENT", "MANAGER", "ADMIN", "PLATFORM"];

export function Sidebar() {
  const pathname = usePathname();
  const { user, token, logout } = useAuth();

  const role = user?.role ?? "TENANT";
  const navItems = ROLE_NAV_ITEMS[role];
  const showListPropertyCta = CAN_LIST_PROPERTY.includes(role);
  const unreadNotifications = useUnreadNotificationsCount(token);
  const unreadMessages = useUnreadMessagesCount(token);

  return (
    <aside className="hidden h-screen w-60 shrink-0 flex-col border-r border-ur-border bg-ur-sidebar lg:flex">
      <div className="flex items-center px-5 py-6">
        <LogoMark className="h-14 w-auto" />
      </div>

      <nav className="flex-1 space-y-1 px-3">
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-3 rounded-ur-sm px-3 py-2.5 text-sm font-medium transition-colors",
            pathname === "/dashboard"
              ? "border-l-2 border-ur-primary bg-ur-success-bg text-ur-primary"
              : "text-ur-text-secondary hover:bg-ur-card-hover hover:text-ur-navy",
          )}
        >
          <Icon name="home" size={16} />
          Dashboard
        </Link>

        {navItems.map((item) => {
          const active = pathname === item.href;
          const badgeCount =
            item.href === "/notifications"
              ? unreadNotifications
              : item.href === "/messages"
                ? unreadMessages
                : 0;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-ur-sm px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "border-l-2 border-ur-primary bg-ur-success-bg text-ur-primary"
                  : "text-ur-text-secondary hover:bg-ur-card-hover hover:text-ur-navy",
              )}
            >
              <Icon name={item.icon} size={16} />
              <span className="flex-1">{item.label}</span>
              {badgeCount > 0 ? (
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-ur-mint px-1 text-[10px] font-bold text-ur-bg">
                  {badgeCount > 99 ? "99+" : badgeCount}
                </span>
              ) : null}
            </Link>
          );
        })}

        <div className="my-2 border-t border-ur-border" />

        {supportItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-ur-sm px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "border-l-2 border-ur-primary bg-ur-success-bg text-ur-primary"
                  : "text-ur-text-secondary hover:bg-ur-card-hover hover:text-ur-navy",
              )}
            >
              <Icon name={item.icon} size={16} />
              {item.label}
            </Link>
          );
        })}

        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-ur-sm px-3 py-2.5 text-sm font-medium text-ur-text-secondary transition-colors hover:bg-ur-card-hover hover:text-ur-navy"
        >
          <Icon name="logout" size={16} />
          Logout
        </button>
      </nav>

      {showListPropertyCta ? (
        <div className="m-3 rounded-ur border border-ur-primary/20 bg-ur-success-bg p-4">
          <p className="text-sm font-bold text-ur-primary">List Your Property</p>
          <p className="mt-1 text-xs text-ur-text-secondary">
            Reach verified tenants faster and secure reliable rentals.
          </p>
          <Link
            href="/listings/new"
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-ur-sm bg-ur-primary px-4 py-2 text-sm font-bold text-white hover:bg-ur-primary-hover"
          >
            List a Property
            <Icon name="arrow_forward" size={16} />
          </Link>
        </div>
      ) : null}
    </aside>
  );
}
