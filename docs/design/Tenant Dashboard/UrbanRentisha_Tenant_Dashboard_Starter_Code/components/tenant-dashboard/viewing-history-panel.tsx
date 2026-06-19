import { CalendarCheck2, MapPin } from "lucide-react";
import { viewingHistory } from "@/lib/tenant-dashboard-data";
import { Badge } from "@/components/ui/badge";

function historyVariant(status: string) {
  if (status === "completed") return "success";
  if (status === "expired") return "warning";
  return "danger";
}

export function ViewingHistoryPanel() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Viewing history
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        Recent property viewings
      </h2>

      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        {viewingHistory.map((item) => (
          <article key={item.id} className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                <CalendarCheck2 className="h-5 w-5" />
              </div>
              <Badge variant={historyVariant(item.status)}>{item.status}</Badge>
            </div>

            <h3 className="mt-4 font-black text-white">{item.propertyTitle}</h3>
            <p className="mt-2 flex items-center gap-2 text-sm text-white/52">
              <MapPin className="h-4 w-4 text-ur-primary" />
              {item.location}
            </p>
            <p className="mt-3 text-sm text-white/58">{item.date}</p>
            <p className="mt-2 text-xs text-white/42">Agent: {item.agentName}</p>
            <p className="mt-3 truncate font-mono text-xs font-bold text-ur-mint">
              {item.proofReference}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
