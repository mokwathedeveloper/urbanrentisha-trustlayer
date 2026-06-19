import Link from "next/link";
import { LogOut, UserRound } from "lucide-react";
import { managerProfile, sidebarItems } from "@/lib/property-manager-data";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/property-manager-dashboard/logo-mark";

export function ManagerSidebar() {
  return (
    <aside className="hidden min-h-screen w-[280px] shrink-0 border-r border-white/10 bg-ur-sidebar/90 p-5 backdrop-blur-xl xl:block">
      <LogoMark />

      <nav className="mt-9 space-y-1" aria-label="Property manager dashboard navigation">
        {sidebarItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex h-11 items-center gap-3 rounded-ur-sm px-3 text-sm font-bold transition-colors ur-focus",
                item.active
                  ? "border border-ur-primary/25 bg-ur-primary/12 text-white"
                  : "text-white/56 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className={cn("h-4 w-4", item.active ? "text-ur-primary" : "text-white/44")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-4">
        <p className="text-sm font-black text-white">Manager trust score</p>
        <p className="mt-2 text-4xl font-black tracking-[-0.06em] text-white">
          {managerProfile.trustScore}%
        </p>
        <p className="mt-2 text-xs leading-5 text-white/56">
          Based on listings, reports, holds, verified requests, and tenant experience.
        </p>
      </div>

      <div className="mt-8 border-t border-white/10 pt-5">
        <div className="flex items-center gap-3 rounded-ur-lg border border-white/10 bg-black/16 p-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-ur-primary/15 text-ur-primary">
            <UserRound className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-black text-white">{managerProfile.name}</p>
            <p className="text-xs text-white/46">{managerProfile.role}</p>
          </div>
        </div>

        <button
          type="button"
          className="mt-3 flex h-10 w-full items-center gap-3 rounded-ur-sm px-3 text-sm font-bold text-white/56 transition-colors hover:bg-white/5 hover:text-white ur-focus"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
