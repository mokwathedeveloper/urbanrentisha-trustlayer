import Link from "next/link";
import { ArrowRight, CalendarCheck2, MapPin, ShieldCheck } from "lucide-react";
import { tenantRequests } from "@/lib/tenant-dashboard-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ActiveRequestOverviewCard() {
  const activeRequest = tenantRequests[0];

  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
        <div>
          <Badge variant="success">
            <ShieldCheck className="h-3.5 w-3.5" />
            Access ready
          </Badge>

          <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] text-white">
            {activeRequest.propertyTitle}
          </h2>

          <p className="mt-2 flex items-center gap-2 text-sm text-white/60">
            <MapPin className="h-4 w-4 text-ur-primary" />
            {activeRequest.location}
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <InfoTile label="Request ID" value={activeRequest.id} />
            <InfoTile label="Viewing" value={`${activeRequest.viewingDate}, ${activeRequest.viewingTime}`} />
            <InfoTile label="Agent" value={activeRequest.agentName} />
          </div>
        </div>

        <div className="min-w-[270px] rounded-ur-lg border border-ur-success/20 bg-ur-success-bg p-5">
          <CalendarCheck2 className="h-8 w-8 text-ur-success" />
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-ur-success/72">
            Current status
          </p>
          <p className="mt-2 text-2xl font-black text-white">Viewing code unlocked</p>
          <p className="mt-2 text-sm leading-6 text-ur-success/72">
            Payment and proof verification are complete.
          </p>

          <Link href={`/viewing-code/${activeRequest.id}`} className="mt-5 block">
            <Button className="w-full">
              Open viewing code
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
        {label}
      </p>
      <p className="mt-2 truncate font-mono text-sm font-bold text-ur-mint">
        {value}
      </p>
    </div>
  );
}
