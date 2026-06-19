import Link from "next/link";
import { ArrowRight, Dot } from "lucide-react";
import { tenantNotifications } from "@/lib/tenant-dashboard-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function NotificationSummaryPanel() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Notifications
          </p>
          <h2 className="mt-2 text-lg font-black text-white">Recent updates</h2>
        </div>
        <Badge variant="warning">5 unread</Badge>
      </div>

      <div className="mt-4 space-y-3">
        {tenantNotifications.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="block rounded-ur-sm border border-white/10 bg-black/16 p-3 transition-colors hover:border-ur-primary/40 hover:bg-white/[0.04] ur-focus"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-black text-white">{item.title}</p>
                <p className="mt-1 text-xs leading-5 text-white/52">{item.description}</p>
                <p className="mt-2 text-xs font-bold text-white/38">{item.time}</p>
              </div>
              {item.unread ? (
                <span className="inline-flex shrink-0 items-center rounded-full bg-ur-primary/14 px-2 py-0.5 text-[11px] font-black text-ur-mint">
                  <Dot className="h-4 w-4" />
                  New
                </span>
              ) : null}
            </div>
          </Link>
        ))}
      </div>

      <Link href="/notifications" className="mt-4 block">
        <Button variant="outline" className="w-full">
          View notifications
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </section>
  );
}
