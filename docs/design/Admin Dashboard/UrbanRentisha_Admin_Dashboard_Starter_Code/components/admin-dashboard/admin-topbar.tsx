import Link from "next/link";
import { Bell, Menu, Search, ShieldAlert, UserRound } from "lucide-react";
import { adminProfile } from "@/lib/admin-dashboard-data";
import { LogoMark } from "@/components/admin-dashboard/logo-mark";
import { Button } from "@/components/ui/button";

export function AdminTopbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ur-bg/78 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 xl:hidden">
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-ur-sm border border-white/10 text-white/70 transition-colors hover:border-ur-primary/50 hover:bg-white/5 hover:text-white ur-focus"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
          <LogoMark />
        </div>

        <label className="relative hidden flex-1 xl:block">
          <span className="sr-only">Search admin dashboard</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/42" />
          <input
            placeholder="Search approval, report, agent, proof, audit log, tenant, or listing..."
            className="h-11 w-full max-w-[720px] rounded-ur-sm border border-white/10 bg-black/18 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-ur-primary"
          />
        </label>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/risk"
            className="relative grid h-10 w-10 place-items-center rounded-ur-sm border border-white/10 text-white/70 transition-colors hover:border-ur-error/50 hover:bg-white/5 hover:text-white ur-focus"
            aria-label={`${adminProfile.suspiciousFlags} suspicious activity flags`}
          >
            <ShieldAlert className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-ur-error px-1 text-[10px] font-black text-white">
              {adminProfile.suspiciousFlags}
            </span>
          </Link>

          <Link
            href="/admin/reports"
            className="relative grid h-10 w-10 place-items-center rounded-ur-sm border border-white/10 text-white/70 transition-colors hover:border-ur-warning/50 hover:bg-white/5 hover:text-white ur-focus"
            aria-label={`${adminProfile.openReports} open reports`}
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-ur-warning px-1 text-[10px] font-black text-black">
              {adminProfile.openReports}
            </span>
          </Link>

          <Link href="/admin/approvals">
            <Button className="hidden sm:inline-flex">
              Review approvals
            </Button>
          </Link>

          <Link
            href="/admin/profile"
            className="grid h-10 w-10 place-items-center rounded-ur-sm border border-white/10 text-white/70 transition-colors hover:border-ur-primary/50 hover:bg-white/5 hover:text-white ur-focus"
            aria-label="Admin profile"
          >
            <UserRound className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
