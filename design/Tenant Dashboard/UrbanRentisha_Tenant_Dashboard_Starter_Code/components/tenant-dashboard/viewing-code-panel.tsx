import Link from "next/link";
import { ArrowRight, Copy, KeyRound, TimerReset } from "lucide-react";
import { tenantRequests } from "@/lib/tenant-dashboard-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ViewingCodePanel() {
  const request = tenantRequests[0];

  return (
    <section className="rounded-ur-xl border border-ur-success/25 bg-ur-success-bg p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-success">
            Viewing code
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            Access code unlocked
          </h2>
        </div>
        <Badge variant="success">
          <KeyRound className="h-3.5 w-3.5" />
          Ready
        </Badge>
      </div>

      <div className="mt-5 rounded-ur-xl border border-ur-success/20 bg-black/24 p-5 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-ur-success/70">
          Latest code
        </p>
        <p className="mt-3 break-all font-mono text-3xl font-black tracking-[0.08em] text-white">
          {request.viewingCode}
        </p>
      </div>

      <div className="mt-4 rounded-ur-lg border border-ur-success/20 bg-black/16 p-4">
        <div className="flex gap-3">
          <TimerReset className="mt-0.5 h-5 w-5 shrink-0 text-ur-success" />
          <p className="text-sm leading-6 text-ur-success/78">
            Valid for {request.viewingDate} at {request.viewingTime}. Share only with the verified agent or access desk.
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Button variant="outline" className="w-full">
          <Copy className="h-4 w-4" />
          Copy code
        </Button>
        <Link href={`/viewing-code/${request.id}`} className="w-full">
          <Button className="w-full">
            Open code
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
