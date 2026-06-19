import { LogOut, ShieldCheck, UserRound } from "lucide-react";
import { appSidebarItems, sidebarItems } from "@/lib/help-faq-data";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/help-faq/logo-mark";

export function HelpSidebar() {
  return (
    <aside className="hidden min-h-screen w-[292px] shrink-0 border-r border-white/10 bg-ur-sidebar/90 p-5 backdrop-blur-xl xl:block">
      <LogoMark />

      <nav className="mt-9 space-y-1" aria-label="Main app navigation">
        {appSidebarItems.map((item) => {
          const Icon = item.icon;

          return (
            <a
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
            </a>
          );
        })}
      </nav>

      <div className="mt-8 border-t border-white/10 pt-5">
        <p className="px-3 text-xs font-black uppercase tracking-[0.16em] text-white/32">
          Help topics
        </p>

        <nav className="mt-3 space-y-1" aria-label="Help page navigation">
          {sidebarItems.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "flex h-10 items-center gap-3 rounded-ur-sm px-3 text-xs font-bold transition-colors ur-focus",
                  item.active
                    ? "bg-ur-primary/10 text-white"
                    : "text-white/48 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className={cn("h-4 w-4", item.active ? "text-ur-primary" : "text-white/34")} />
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>

      <div className="mt-8 rounded-ur-xl border border-ur-success/25 bg-ur-success-bg p-4">
        <ShieldCheck className="h-6 w-6 text-ur-success" />
        <p className="mt-3 text-sm font-black text-white">Safety-first help</p>
        <p className="mt-2 text-xs leading-5 text-ur-success/74">
          Learn how proof, payment status, reports, and viewing codes protect the rental flow.
        </p>
      </div>

      <div className="mt-8 border-t border-white/10 pt-5">
        <div className="flex items-center gap-3 rounded-ur-lg border border-white/10 bg-black/16 p-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-ur-primary/15 text-ur-primary">
            <UserRound className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-black text-white">John Tenant</p>
            <p className="text-xs text-white/46">Tenant</p>
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
