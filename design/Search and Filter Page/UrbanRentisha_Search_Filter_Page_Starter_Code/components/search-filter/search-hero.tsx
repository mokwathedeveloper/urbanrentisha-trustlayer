import { Filter, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function SearchHero() {
  return (
    <section className="mb-5 overflow-hidden rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl lg:p-8">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <Badge variant="success">
            <ShieldCheck className="h-3.5 w-3.5" />
            Verified search controls
          </Badge>
          <h1 className="mt-5 max-w-[820px] text-[42px] font-black leading-[1.02] tracking-[-0.07em] text-white sm:text-[56px]">
            Search rentals by trust, location, rent, and viewing fee.
          </h1>
          <p className="mt-4 max-w-[720px] text-base leading-7 text-white/66">
            Filter properties before starting the secure viewing workflow. Verified listings can move into payment proof and access unlock.
          </p>
        </div>

        <div className="rounded-ur-lg border border-ur-primary/20 bg-ur-primary/8 p-5">
          <Filter className="mb-3 h-6 w-6 text-ur-primary" />
          <p className="text-sm font-black text-white">Trust-first filtering</p>
          <p className="mt-1 max-w-[260px] text-sm leading-6 text-white/56">
            Default search prioritizes verified listings and high trust scores.
          </p>
        </div>
      </div>
    </section>
  );
}
