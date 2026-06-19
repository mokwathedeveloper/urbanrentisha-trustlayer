import { BellRing, BookmarkCheck, ShieldCheck } from "lucide-react";
import type { Filters } from "@/components/search-filter/search-filter-page";
import { Button } from "@/components/ui/button";

type SavedSearchPanelProps = {
  filters: Filters;
  resultCount: number;
};

export function SavedSearchPanel({ filters, resultCount }: SavedSearchPanelProps) {
  return (
    <aside className="hidden h-fit space-y-5 lg:block lg:sticky lg:top-24">
      <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
        <div className="grid h-12 w-12 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
          <BookmarkCheck className="h-6 w-6" />
        </div>
        <h2 className="mt-4 text-lg font-black text-white">Save this search</h2>
        <p className="mt-2 text-sm leading-6 text-white/56">
          Save the current filter combination and reuse it during future property searches.
        </p>
        <Button className="mt-5 w-full">
          Save search
        </Button>
      </section>

      <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-5 shadow-soft-dark backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 text-ur-primary" />
          <div>
            <p className="font-black text-white">Search trust summary</p>
            <p className="mt-2 text-sm leading-6 text-white/58">
              {resultCount} listings match. Verified-only is {filters.verifiedOnly ? "enabled" : "disabled"}.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <BellRing className="mt-0.5 h-5 w-5 text-ur-primary" />
          <div>
            <p className="font-black text-white">Search alerts</p>
            <p className="mt-2 text-sm leading-6 text-white/58">
              Later, tenants can receive alerts when new verified listings match these filters.
            </p>
          </div>
        </div>
      </section>
    </aside>
  );
}
