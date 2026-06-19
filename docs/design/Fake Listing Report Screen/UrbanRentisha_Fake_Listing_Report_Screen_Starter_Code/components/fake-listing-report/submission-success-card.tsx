import Link from "next/link";
import { ArrowRight, CheckCircle2, Flag } from "lucide-react";
import type { ListingReportTarget } from "@/lib/report-data";
import { sampleReportHash } from "@/lib/report-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type SubmissionSuccessCardProps = {
  reportReference: string;
  target: ListingReportTarget;
};

export function SubmissionSuccessCard({
  reportReference,
  target
}: SubmissionSuccessCardProps) {
  return (
    <section className="mt-6 rounded-ur-xl border border-ur-success/25 bg-ur-success-bg p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div className="flex gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-ur-lg bg-ur-primary text-white shadow-green-glow">
            <CheckCircle2 className="h-6 w-6" />
          </div>

          <div>
            <Badge variant="success">
              <Flag className="h-3.5 w-3.5" />
              Report submitted
            </Badge>
            <h2 className="mt-4 text-2xl font-black tracking-[-0.04em] text-white">
              Safety report received.
            </h2>
            <p className="mt-2 max-w-[720px] text-sm leading-6 text-ur-success/78">
              The UrbanRentisha safety team will review this report and update you through notifications.
            </p>
          </div>
        </div>

        <div className="rounded-ur-lg border border-ur-success/20 bg-black/18 p-4 text-right">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-ur-success/64">
            Report reference
          </p>
          <p className="mt-1 font-mono text-lg font-black text-white">{reportReference}</p>
        </div>
      </div>

      <div className="mt-5 rounded-ur-lg border border-ur-success/20 bg-black/18 p-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-ur-success/64">
          Report hash
        </p>
        <p className="mt-2 break-all font-mono text-sm leading-6 text-white">{sampleReportHash}</p>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Link href={`/reports/${reportReference}`} className="w-full sm:w-auto">
          <Button className="w-full">
            View report status
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <Link href={`/properties/${target.listingId}`} className="w-full sm:w-auto">
          <Button variant="outline" className="w-full">
            Return to listing
          </Button>
        </Link>
      </div>
    </section>
  );
}
