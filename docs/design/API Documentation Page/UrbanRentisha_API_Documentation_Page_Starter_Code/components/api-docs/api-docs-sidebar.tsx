import Link from "next/link";
import { ExternalLink, Github, LogOut, ShieldCheck, UserRound } from "lucide-react";
import { sidebarItems } from "@/lib/api-docs-data";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/api-docs/logo-mark";

export function ApiDocsSidebar() {
  return (
    <aside className="hidden min-h-screen w-[292px] shrink-0 border-r border-white/10 bg-ur-sidebar/90 p-5 backdrop-blur-xl xl:block">
      <LogoMark />
      <nav className="mt-9 space-y-1" aria-label="API documentation navigation">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <a key={item.label} href={item.href} className={cn("flex h-11 items-center gap-3 rounded-ur-sm px-3 text-sm font-bold transition-colors ur-focus", item.active ? "border border-ur-primary/25 bg-ur-primary/12 text-white" : "text-white/56 hover:bg-white/5 hover:text-white")}>
              <Icon className={cn("h-4 w-4", item.active ? "text-ur-primary" : "text-white/44")} />
              {item.label}
            </a>
          );
        })}
      </nav>
      <div className="mt-8 rounded-ur-xl border border-ur-primary/25 bg-ur-primary/8 p-4">
        <ShieldCheck className="h-6 w-6 text-ur-primary" />
        <p className="mt-3 text-sm font-black text-white">External API ready</p>
        <p className="mt-2 text-xs leading-5 text-white/58">Use server-side API keys, signed webhooks, and proof-aware viewing access.</p>
        <div className="mt-4 grid gap-2">
          <Link href="/api-docs/openapi.json" className="inline-flex h-9 items-center justify-center gap-2 rounded-ur-sm border border-white/10 text-xs font-bold text-white/70 hover:border-ur-primary/40 hover:bg-white/5 ur-focus">
            OpenAPI JSON <ExternalLink className="h-3.5 w-3.5" />
          </Link>
          <Link href="https://github.com" className="inline-flex h-9 items-center justify-center gap-2 rounded-ur-sm border border-white/10 text-xs font-bold text-white/70 hover:border-ur-primary/40 hover:bg-white/5 ur-focus">
            GitHub examples <Github className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
      <div className="mt-8 border-t border-white/10 pt-5">
        <div className="flex items-center gap-3 rounded-ur-lg border border-white/10 bg-black/16 p-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-ur-primary/15 text-ur-primary"><UserRound className="h-5 w-5" /></div>
          <div className="min-w-0"><p className="truncate text-sm font-black text-white">Developer Admin</p><p className="text-xs text-white/46">API Integration</p></div>
        </div>
        <button type="button" className="mt-3 flex h-10 w-full items-center gap-3 rounded-ur-sm px-3 text-sm font-bold text-white/56 transition-colors hover:bg-white/5 hover:text-white ur-focus">
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>
    </aside>
  );
}
