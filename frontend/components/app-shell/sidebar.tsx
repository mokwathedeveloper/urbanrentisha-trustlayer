"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "@/components/ui/icon";

const propertiesGroup = [{ label: "All Listings", href: "/listings" }];

const navItems: { label: string; href: string; icon: IconName }[] = [
  { label: "My Bookings", href: "/bookings", icon: "description" },
  { label: "Saved Properties", href: "/saved", icon: "favorite" },
  { label: "Messages", href: "/messages", icon: "mail" },
  { label: "Applications", href: "/applications", icon: "description" },
  { label: "Payments", href: "/payments", icon: "credit_card" },
  { label: "Escrow / Holds", href: "/escrow", icon: "lock" },
  { label: "Verifications", href: "/verifications", icon: "verified_user" },
  { label: "Viewing Code", href: "/viewing-code", icon: "lock" },
  { label: "Reports", href: "/reports", icon: "flag" },
  { label: "Report Fake Listing", href: "/reports/new", icon: "warning" },
  { label: "Notifications", href: "/notifications", icon: "notifications" },
  { label: "Audit Logs", href: "/audit-logs", icon: "assignment" },
  { label: "Profile", href: "/profile", icon: "person" },
  { label: "Settings", href: "/settings", icon: "settings" },
];

const supportItems: { label: string; href: string; icon: IconName }[] = [
  { label: "Help & Support", href: "/help", icon: "help" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [propertiesOpen, setPropertiesOpen] = useState(true);

  return (
    <aside className="hidden h-screen w-60 shrink-0 flex-col border-r border-ur-border bg-ur-sidebar lg:flex">
      <div className="flex items-center gap-2 px-5 py-6">
        <Icon name="home" size={28} className="text-ur-primary" />
        <p className="text-sm font-black leading-tight tracking-[-0.02em]">
          <span className="text-white">URBAN</span>
          <br />
          <span className="text-ur-primary">RENTISHA</span>
        </p>
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

        <button
          type="button"
          onClick={() => setPropertiesOpen((open) => !open)}
          className="flex w-full items-center gap-3 rounded-ur-sm px-3 py-2.5 text-sm font-medium text-ur-primary"
        >
          <Icon name="home" size={16} />
          <span className="flex-1 text-left">Properties</span>
          <Icon name="expand_less" className={cn("h-4 w-4 transition-transform", !propertiesOpen && "rotate-180")} />
        </button>

        {propertiesOpen
          ? propertiesGroup.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-ur-sm px-3 py-2.5 pl-9 text-sm font-medium transition-colors",
                    active
                      ? "border-l-2 border-ur-primary bg-ur-success-bg text-ur-primary"
                      : "text-ur-text-secondary hover:bg-ur-card-hover hover:text-ur-navy",
                  )}
                >
                  <Icon name="home" size={14} />
                  {item.label}
                </Link>
              );
            })
          : null}

        {navItems.map((item) => {
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
    </aside>
  );
}
