import { CalendarCheck2, Filter, Search } from "lucide-react";
import { auditFilterTabs } from "@/lib/audit-log-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AuditFilterBar() {
  return (
    <section className="mt-6 rounded-ur-xl border border-white/10 bg-white/[0.035] p-4 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">Search audit events</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/42" />
          <input
            placeholder="Search event ID, actor, target, request ID, proof hash, TX hash..."
            className="h-11 w-full rounded-ur-sm border border-white/10 bg-black/18 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-ur-primary"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <CalendarCheck2 className="h-4 w-4" />
            Last 7 days
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 audit-scrollbar">
        {auditFilterTabs.map((tab, index) => (
          <button
            key={tab}
            type="button"
            className={cn(
              "h-9 shrink-0 rounded-full border px-4 text-sm font-bold transition-colors ur-focus",
              index === 0
                ? "border-ur-primary bg-ur-primary text-white"
                : "border-white/10 bg-black/16 text-white/58 hover:border-ur-primary/40 hover:text-white"
            )}
          >
            {tab}
          </button>
        ))}
      </div>
    </section>
  );
}
