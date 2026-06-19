import Link from "next/link";
import { ArrowRight, Flag } from "lucide-react";
import { managerReports, statusVisuals, type ReportStatus } from "@/lib/property-manager-data";
import { StatusBadge } from "@/components/property-manager-dashboard/status-badge";
import { Button } from "@/components/ui/button";

export function ReportsCenterPanel() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Reports
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            Safety and trust reports
          </h2>
        </div>
        <Flag className="h-6 w-6 text-ur-primary" />
      </div>

      <div className="mt-5 space-y-3">
        {managerReports.map((report) => {
          const status = statusVisuals.report[report.status as ReportStatus];

          return (
            <article key={report.id} className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-black text-white">{report.propertyTitle}</p>
                  <p className="mt-1 text-sm text-white/52">
                    {report.type} report by {report.submittedBy}
                  </p>
                  <p className="mt-2 font-mono text-xs font-bold text-ur-mint">{report.id}</p>
                </div>
                <StatusBadge label={status.label} variant={status.variant} icon={status.icon} />
              </div>
            </article>
          );
        })}
      </div>

      <Link href="/manager/reports" className="mt-5 block">
        <Button variant="danger" className="w-full">
          Open report center
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </section>
  );
}
