"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  ChevronUp,
  ClipboardList,
  CreditCard,
  FileText,
  Flag,
  Heart,
  HelpCircle,
  Home,
  Lock,
  LogOut,
  Mail,
  Settings,
  ShieldCheck,
  User as UserIcon,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const propertiesGroup = [{ label: "All Listings", href: "/listings" }];

const navItems = [
  { label: "My Bookings", href: "/bookings", icon: FileText },
  { label: "Saved Properties", href: "/saved", icon: Heart },
  { label: "Messages", href: "/messages", icon: Mail },
  { label: "Applications", href: "/applications", icon: FileText },
  { label: "Payments", href: "/payments", icon: CreditCard },
  { label: "Escrow / Holds", href: "/escrow", icon: Lock },
  { label: "Verifications", href: "/verifications", icon: ShieldCheck },
  { label: "Viewing Code", href: "/viewing-code", icon: Lock },
  { label: "Reports", href: "/reports", icon: Flag },
  { label: "Report Fake Listing", href: "/reports/new", icon: AlertTriangle },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Audit Logs", href: "/audit-logs", icon: ClipboardList },
  { label: "Profile", href: "/profile", icon: UserIcon },
  { label: "Settings", href: "/settings", icon: Settings },
];

const supportItems = [{ label: "Help & Support", href: "/help", icon: HelpCircle }];

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [propertiesOpen, setPropertiesOpen] = useState(true);

  return (
    <aside className="hidden h-screen w-60 shrink-0 flex-col border-r border-ur-border bg-ur-sidebar lg:flex">
      <div className="flex items-center gap-2 px-5 py-6">
        <Home className="h-7 w-7 text-ur-primary" strokeWidth={1.75} />
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
          <Home className="h-4 w-4" />
          Dashboard
        </Link>

        <button
          type="button"
          onClick={() => setPropertiesOpen((open) => !open)}
          className="flex w-full items-center gap-3 rounded-ur-sm px-3 py-2.5 text-sm font-medium text-ur-primary"
        >
          <Home className="h-4 w-4" />
          <span className="flex-1 text-left">Properties</span>
          <ChevronUp className={cn("h-4 w-4 transition-transform", !propertiesOpen && "rotate-180")} />
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
                  <Home className="h-3.5 w-3.5" />
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
              <item.icon className="h-4 w-4" />
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
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}

        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-ur-sm px-3 py-2.5 text-sm font-medium text-ur-text-secondary transition-colors hover:bg-ur-card-hover hover:text-ur-navy"
        >
          <LogOut className="h-4 w-4" />
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
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </aside>
  );
}
