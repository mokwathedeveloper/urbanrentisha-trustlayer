import Link from "next/link";
import { ArrowRight, Flag } from "lucide-react";
import { tenantReports } from "@/lib/tenant-dashboard-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function statusVariant(status: string) {
  if (status === "resolved") return "success";
  if (status === "reviewed") return "warning";
  return "neutral";
}

export function ReportsPanel() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Safety reports
          </p>
          <h2 className="mt-2 text-lg font-black text-white">Report activity</h2>
        </div>
        <Flag className="h-5 w-5 text-ur-primary" />
      </div>

      <div className="mt-4 space-y-3">
        {tenantReports.map((report) => (
          <article key={report.id} className="rounded-ur-sm border border-white/10 bg-black/16 p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-black text-white">{report.propertyTitle}</p>
                <p className="mt-1 text-xs leading-5 text-white/52">{report.reason}</p>
                <p className="mt-2 font-mono text-xs font-bold text-ur-mint">{report.id}</p>
              </div>
              <Badge variant={statusVariant(report.status)}>{report.status}</Badge>
            </div>
          </article>
        ))}
      </div>

      <Link href="/report-listing/UR-LST-1001" className="mt-4 block">
        <Button variant="danger" className="w-full">
          Report suspicious listing
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </section>
  );
}
