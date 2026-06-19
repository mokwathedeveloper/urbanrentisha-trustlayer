import { Star, TrendingUp } from "lucide-react";
import { managerProfile } from "@/lib/property-manager-data";
import { Badge } from "@/components/ui/badge";

export function TrustScorePanel() {
  return (
    <section className="rounded-ur-xl border border-ur-success/25 bg-ur-success-bg p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-success">
            Trust score
          </p>
          <h2 className="mt-2 text-lg font-black text-white">Manager trust health</h2>
        </div>

        <Badge variant="success">
          <Star className="h-3.5 w-3.5" />
          Stable
        </Badge>
      </div>

      <p className="mt-5 text-5xl font-black tracking-[-0.07em] text-white">
        {managerProfile.trustScore}%
      </p>

      <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-ur-primary"
          style={{ width: `${managerProfile.trustScore}%` }}
        />
      </div>

      <div className="mt-4 rounded-ur-lg border border-ur-success/20 bg-black/16 p-4">
        <div className="flex gap-3">
          <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-ur-success" />
          <p className="text-sm leading-6 text-ur-success/78">
            Score improves when listings remain accurate, reports are resolved, holds are clean, and verified tenants complete viewings safely.
          </p>
        </div>
      </div>
    </section>
  );
}
