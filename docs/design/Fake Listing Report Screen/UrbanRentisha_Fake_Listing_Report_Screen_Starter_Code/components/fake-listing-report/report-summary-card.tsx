import {
  AlertTriangle,
  EyeOff,
  FileText,
  ShieldAlert
} from "lucide-react";
import type {
  ReportSeverity,
  ReportType,
  ReporterMode
} from "@/lib/report-data";
import { Badge } from "@/components/ui/badge";

type ReportSummaryCardProps = {
  reportType: ReportType;
  severity: ReportSeverity;
  reporterMode: ReporterMode;
  selectedReasonTitles: string[];
  description: string;
};

export function ReportSummaryCard({
  reportType,
  severity,
  reporterMode,
  selectedReasonTitles,
  description
}: ReportSummaryCardProps) {
  const severityVariant =
    severity === "urgent" || severity === "high"
      ? "danger"
      : severity === "medium"
        ? "warning"
        : "neutral";

  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Live summary
          </p>
          <h2 className="mt-2 text-lg font-black text-white">Report preview</h2>
        </div>

        <Badge variant={severityVariant}>{severity}</Badge>
      </div>

      <div className="mt-5 space-y-3">
        <SummaryRow icon={<ShieldAlert className="h-4 w-4" />} label="Type" value={reportType} />
        <SummaryRow icon={<AlertTriangle className="h-4 w-4" />} label="Severity" value={severity} />
        <SummaryRow icon={<EyeOff className="h-4 w-4" />} label="Privacy" value={reporterMode} />
      </div>

      <div className="mt-5 rounded-ur-lg border border-white/10 bg-black/16 p-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
          Selected reasons
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedReasonTitles.length > 0 ? (
            selectedReasonTitles.map((reason) => (
              <Badge key={reason} variant="outline">{reason}</Badge>
            ))
          ) : (
            <p className="text-sm text-white/42">No reason selected yet.</p>
          )}
        </div>
      </div>

      <div className="mt-3 rounded-ur-lg border border-white/10 bg-black/16 p-4">
        <FileText className="mb-2 h-4 w-4 text-ur-primary" />
        <p className="line-clamp-4 text-sm leading-6 text-white/58">
          {description || "No description added yet."}
        </p>
      </div>
    </section>
  );
}

function SummaryRow({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3">
      <div className="flex items-center gap-2 text-white/60">
        {icon}
        <p className="text-sm font-bold">{label}</p>
      </div>
      <p className="font-mono text-xs font-bold text-ur-mint">{value}</p>
    </div>
  );
}
