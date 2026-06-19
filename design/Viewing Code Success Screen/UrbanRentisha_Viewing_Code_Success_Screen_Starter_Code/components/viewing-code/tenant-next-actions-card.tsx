import Link from "next/link";
import { CalendarDays, Flag, LayoutDashboard, MapPin } from "lucide-react";
import type { ViewingCodeRecord } from "@/lib/viewing-code-data";
import { Button } from "@/components/ui/button";

type TenantNextActionsCardProps = {
  record: ViewingCodeRecord;
};

export function TenantNextActionsCard({ record }: TenantNextActionsCardProps) {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Next actions
      </p>

      <h2 className="mt-2 text-lg font-black text-white">
        Manage your viewing
      </h2>

      <p className="mt-2 text-sm leading-6 text-white/58">
        Keep the viewing code safe and use the dashboard for updates.
      </p>

      <div className="mt-5 space-y-3">
        <Button className="w-full">
          <MapPin className="h-4 w-4" />
          Open property directions
        </Button>

        <Button variant="outline" className="w-full">
          <CalendarDays className="h-4 w-4" />
          Add viewing to calendar
        </Button>

        <Link href="/tenant/dashboard" className="block">
          <Button variant="outline" className="w-full">
            <LayoutDashboard className="h-4 w-4" />
            Go to dashboard
          </Button>
        </Link>

        <Button variant="danger" className="w-full">
          <Flag className="h-4 w-4" />
          Report a problem
        </Button>
      </div>

      <p className="mt-4 text-xs leading-5 text-white/42">
        Linked request: <span className="font-mono text-ur-mint">{record.requestId}</span>
      </p>
    </section>
  );
}
