"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, type ReportItem } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { formatDate } from "@/components/dashboard/dashboard-ui";
import { Icon } from "@/components/ui/icon";

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
  HIGH: "border-ur-error/40 text-ur-error",
  MEDIUM: "border-ur-warning/40 text-ur-warning",
  LOW: "border-ur-primary/40 text-ur-primary",
};

const respondableStatuses = ["UNDER_REVIEW", "RESOLVED", "DISMISSED", "ESCALATED"];

function useNow(intervalMs: number): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(interval);
  }, [intervalMs]);
  return now;
}

function SlaBadge({ report }: { report: ReportItem }) {
  const now = useNow(60000);

  if (report.firstRespondedAt) {
    return (
      <span className="flex items-center gap-1 rounded-full border border-ur-primary/40 px-2.5 py-0.5 text-xs font-semibold text-ur-primary">
        <Icon name="check_circle" size={12} />
        Responded {formatDate(report.firstRespondedAt)}
      </span>
    );
  }

  const remainingMs = new Date(report.responseDeadline).getTime() - now;
  const overdue = remainingMs <= 0;
  const hours = Math.max(0, Math.floor(Math.abs(remainingMs) / 3600000));
  const minutes = Math.max(0, Math.floor((Math.abs(remainingMs) % 3600000) / 60000));

  return (
    <span
      className={`flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
        overdue ? "border-ur-error/40 text-ur-error" : "border-ur-warning/40 text-ur-warning"
      }`}
    >
      <Icon name="hourglass_empty" size={12} />
      {overdue ? `Overdue by ${hours}h ${minutes}m` : `Response due in ${hours}h ${minutes}m`}
    </span>
  );
}

export default function ReportsListPage() {
  const { token, user } = useAuth();
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [respondingId, setRespondingId] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isAdmin = user?.role === "ADMIN" || user?.role === "PLATFORM";

  function load() {
    if (!token) return;
    const fetcher = isAdmin ? api.reports.findAll(token) : api.reports.findMine(token);
    fetcher.then((response) => setReports(response.items)).finally(() => setLoading(false));
  }

  useEffect(load, [token, isAdmin]);

  async function handleRespond(reportId: string, status: string) {
    if (!token) return;
    setSubmitting(true);
    try {
      const updated = await api.reports.respond(token, reportId, { status, note: note.trim() || undefined });
      setReports((prev) => prev.map((r) => (r.id === reportId ? updated : r)));
      setRespondingId(null);
      setNote("");
    } catch {
      // Best-effort: leave the response form open so the user can retry.
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="px-6 py-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black tracking-[-0.02em] text-ur-navy">{isAdmin ? "All Reports" : "Reports"}</h1>
          <p className="mt-1 text-sm text-ur-text-secondary">
            {isAdmin ? "Reports filed by users across the platform." : "Reports you have filed against listings or agents."}
          </p>
        </div>
        {!isAdmin ? (
          <Link
            href="/reports/new"
            className="flex items-center gap-2 rounded-ur-sm bg-ur-primary px-4 py-2 text-sm font-bold text-white hover:bg-ur-primary-hover"
          >
            <Icon name="add" size={16} />
            File a Report
          </Link>
        ) : null}
      </div>

      <div className="mt-6 ur-card">
        {loading ? <p className="p-5 text-sm text-ur-text-muted">Loading...</p> : null}
        {!loading && reports.length === 0 ? (
          <div className="flex flex-col items-center gap-3 p-10 text-center">
            <Icon name="flag" size={32} className="text-ur-text-muted" />
            <p className="text-sm text-ur-text-muted">
              {isAdmin ? "No reports have been filed yet." : "You haven't filed any reports yet."}
            </p>
            {!isAdmin ? (
              <Link href="/reports/new" className="text-sm font-semibold text-ur-primary hover:underline">
                Report a fake listing or suspicious agent &rarr;
              </Link>
            ) : null}
          </div>
        ) : null}
        <div className="divide-y divide-ur-border">
          {reports.map((report) => (
            <div key={report.id} className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ur-card-soft text-ur-warning">
                    <Icon name="warning" size={16} />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ur-navy">{report.listing?.title ?? "Listing report"}</p>
                    <p className="mt-0.5 text-xs text-ur-text-secondary">{reportTypeLabels[report.reportType] ?? report.reportType}</p>
                    {isAdmin && report.reporter ? (
                      <p className="mt-0.5 text-xs text-ur-text-muted">Filed by {report.reporter.name}</p>
                    ) : null}
                    <p className="mt-1 text-sm text-ur-text-secondary">{report.description}</p>
                    <p className="mt-1 text-xs text-ur-text-muted">{formatDate(report.createdAt)}</p>
                    {report.respondedBy ? (
                      <p className="mt-1 text-xs text-ur-text-muted">Handled by {report.respondedBy.name}</p>
                    ) : null}
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusTone[report.status] ?? "border-ur-border text-ur-text-muted"}`}>
                    {report.status === "OPEN" ? "Under Review" : report.status.replace(/_/g, " ")}
                  </span>
                  <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${severityTone[report.severity] ?? "border-ur-border text-ur-text-muted"}`}>
                    {report.severity.toLowerCase()} severity
                  </span>
                  <SlaBadge report={report} />
                </div>
              </div>

              {isAdmin ? (
                respondingId === report.id ? (
                  <div className="mt-3 space-y-2 rounded-ur border border-ur-border bg-ur-card-soft p-3">
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Optional note to the reporter..."
                      className="h-16 w-full rounded-ur-sm border border-ur-border bg-ur-input px-3 py-2 text-sm text-ur-text outline-none focus:border-ur-primary"
                    />
                    <div className="flex flex-wrap gap-2">
                      {respondableStatuses.map((status) => (
                        <button
                          key={status}
                          type="button"
                          disabled={submitting}
                          onClick={() => handleRespond(report.id, status)}
                          className="rounded-ur-sm border border-ur-border px-3 py-1.5 text-xs font-semibold text-ur-navy hover:bg-ur-card-hover disabled:opacity-50"
                        >
                          {status.replace(/_/g, " ")}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          setRespondingId(null);
                          setNote("");
                        }}
                        className="rounded-ur-sm px-3 py-1.5 text-xs font-semibold text-ur-text-muted hover:text-ur-navy"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setRespondingId(report.id)}
                    className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-ur-primary hover:underline"
                  >
                    <Icon name="chat_bubble" size={14} />
                    {report.firstRespondedAt ? "Update Status" : "Respond"}
                  </button>
                )
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
