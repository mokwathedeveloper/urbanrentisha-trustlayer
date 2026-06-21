"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, Flag, Plus } from "lucide-react";
import { api, type ReportItem } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { formatDate } from "@/components/dashboard/dashboard-ui";

const reportTypeLabels: Record<string, string> = {
  FAKE_LISTING: "Fake Listing",
  UNSAFE_PAYMENT: "Unsafe Payment",
  AGENT_MISMATCH: "Agent Mismatch",
  WRONG_PROPERTY: "Wrong Property",
  SUSPICIOUS_BEHAVIOR: "Suspicious Behavior",
  OTHER: "Other",
};

const statusTone: Record<string, string> = {
  OPEN: "border-ur-warning/40 text-ur-warning",
  UNDER_REVIEW: "border-ur-cyan/40 text-ur-cyan",
  RESOLVED: "border-ur-primary/40 text-ur-primary",
  DISMISSED: "border-ur-text-muted text-ur-text-muted",
  ESCALATED: "border-ur-error/40 text-ur-error",
};

const severityTone: Record<string, string> = {
  high: "border-ur-error/40 text-ur-error",
  medium: "border-ur-warning/40 text-ur-warning",
  low: "border-ur-primary/40 text-ur-primary",
};

export default function ReportsListPage() {
  const { token } = useAuth();
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    api.reports
      .findMine(token)
      .then(setReports)
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="px-6 py-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black tracking-[-0.02em] text-ur-navy">Reports</h1>
          <p className="mt-1 text-sm text-ur-text-secondary">Reports you have filed against listings or agents.</p>
        </div>
        <Link
          href="/reports/new"
          className="flex items-center gap-2 rounded-ur-sm bg-ur-primary px-4 py-2 text-sm font-bold text-white hover:bg-ur-primary-hover"
        >
          <Plus className="h-4 w-4" />
          File a Report
        </Link>
      </div>

      <div className="mt-6 ur-card">
        {loading ? <p className="p-5 text-sm text-ur-text-muted">Loading...</p> : null}
        {!loading && reports.length === 0 ? (
          <div className="flex flex-col items-center gap-3 p-10 text-center">
            <Flag className="h-8 w-8 text-ur-text-muted" />
            <p className="text-sm text-ur-text-muted">You haven&apos;t filed any reports yet.</p>
            <Link href="/reports/new" className="text-sm font-semibold text-ur-primary hover:underline">
              Report a fake listing or suspicious agent &rarr;
            </Link>
          </div>
        ) : null}
        <div className="divide-y divide-ur-border">
          {reports.map((report) => (
            <div key={report.id} className="flex items-start justify-between gap-4 p-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ur-card-soft text-ur-warning">
                  <AlertTriangle className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-bold text-ur-navy">{report.listing?.title ?? "Listing report"}</p>
                  <p className="mt-0.5 text-xs text-ur-text-secondary">{reportTypeLabels[report.reportType] ?? report.reportType}</p>
                  <p className="mt-1 text-sm text-ur-text-secondary">{report.description}</p>
                  <p className="mt-1 text-xs text-ur-text-muted">{formatDate(report.createdAt)}</p>
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusTone[report.status] ?? "border-ur-border text-ur-text-muted"}`}>
                  {report.status === "OPEN" ? "Under Review" : report.status.replace(/_/g, " ")}
                </span>
                <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${severityTone[report.severity] ?? "border-ur-border text-ur-text-muted"}`}>
                  {report.severity} severity
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
