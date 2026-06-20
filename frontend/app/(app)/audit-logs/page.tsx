"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  CreditCard,
  Download,
  FileText,
  Flag,
  KeyRound,
  Search,
  Settings,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { api, type AuditLogEntry, type AuditLogStats } from "@/lib/api";
import { useAuth } from "@/lib/auth";

const entityIcons: Record<string, typeof FileText> = {
  listing: FileText,
  viewing_request: FileText,
  payment: CreditCard,
  proof_verification: ShieldCheck,
  zk_proof: ShieldCheck,
  viewing_code: KeyRound,
  report: Flag,
};

const severityTone: Record<string, string> = {
  INFO: "border-ur-cyan/40 text-ur-cyan",
  SUCCESS: "border-ur-primary/40 text-ur-primary",
  WARNING: "border-ur-warning/40 text-ur-warning",
  CRITICAL: "border-ur-error/40 text-ur-error",
};

function humanize(action: string): string {
  return action
    .split(/[._]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function AuditLogsPage() {
  const { token } = useAuth();
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [stats, setStats] = useState<AuditLogStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [entityFilter, setEntityFilter] = useState("ALL");
  const [severityFilter, setSeverityFilter] = useState("ALL");
  const [selected, setSelected] = useState<AuditLogEntry | null>(null);

  useEffect(() => {
    if (!token) return;
    Promise.all([api.auditLogs.findAll(token), api.auditLogs.stats(token)])
      .then(([logRows, statRow]) => {
        setLogs(logRows);
        setStats(statRow);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const entityTypes = useMemo(() => Array.from(new Set(logs.map((l) => l.entityType))), [logs]);

  const filtered = logs.filter((log) => {
    if (entityFilter !== "ALL" && log.entityType !== entityFilter) return false;
    if (severityFilter !== "ALL" && log.severity !== severityFilter) return false;
    if (search) {
      const haystack = `${log.action} ${log.actor?.name ?? ""} ${log.entityId ?? ""}`.toLowerCase();
      if (!haystack.includes(search.toLowerCase())) return false;
    }
    return true;
  });

  function exportEvent(log: AuditLogEntry) {
    const blob = new Blob([JSON.stringify(log, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit-event-${log.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-black tracking-[-0.02em] text-ur-navy">Audit Log</h1>
      <p className="mt-1 text-sm text-ur-text-secondary">
        Track important system events, user actions, and trust activity across the platform.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
        <StatCard icon={FileText} label="Total Events" value={stats?.totalEvents ?? 0} color="text-ur-cyan" loading={loading} />
        <StatCard icon={Settings} label="System Events" value={stats?.systemEvents ?? 0} color="text-ur-cyan" loading={loading} />
        <StatCard icon={ShieldCheck} label="Trust Activity" value={stats?.trustActivity ?? 0} color="text-ur-primary" loading={loading} />
        <StatCard icon={Users} label="User Actions" value={stats?.userActions ?? 0} color="text-ur-mint" loading={loading} />
        <StatCard icon={AlertTriangle} label="Security Events" value={stats?.securityEvents ?? 0} color="text-ur-error" loading={loading} />
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ur-text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search audit logs..."
            className="w-full rounded-ur-sm border border-ur-border bg-ur-input py-2 pl-9 pr-3 text-sm text-ur-text"
          />
        </div>
        <select
          value={entityFilter}
          onChange={(e) => setEntityFilter(e.target.value)}
          className="rounded-ur-sm border border-ur-border bg-ur-input px-3 py-2 text-sm text-ur-text"
        >
          <option value="ALL">All Event Types</option>
          {entityTypes.map((type) => (
            <option key={type} value={type}>
              {humanize(type)}
            </option>
          ))}
        </select>
        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          className="rounded-ur-sm border border-ur-border bg-ur-input px-3 py-2 text-sm text-ur-text"
        >
          <option value="ALL">All Severity</option>
          <option value="INFO">Info</option>
          <option value="SUCCESS">Success</option>
          <option value="WARNING">Warning</option>
          <option value="CRITICAL">Critical</option>
        </select>
      </div>

      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="ur-card overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ur-border text-xs uppercase text-ur-text-muted">
              <tr>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Event</th>
                <th className="px-4 py-3">Actor</th>
                <th className="px-4 py-3">Entity</th>
                <th className="px-4 py-3">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ur-border">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-ur-text-muted">
                    Loading...
                  </td>
                </tr>
              ) : null}
              {!loading && filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-ur-text-muted">
                    No audit log entries found.
                  </td>
                </tr>
              ) : null}
              {filtered.map((log) => {
                const Icon = entityIcons[log.entityType] ?? FileText;
                return (
                  <tr
                    key={log.id}
                    onClick={() => setSelected(log)}
                    className={`cursor-pointer hover:bg-ur-card-hover ${selected?.id === log.id ? "bg-ur-card-hover" : ""}`}
                  >
                    <td className="px-4 py-3 font-mono text-xs text-ur-text-muted">{formatDateTime(log.createdAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-ur-cyan" />
                        <span className="font-semibold text-ur-text">{humanize(log.action)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ur-text-secondary">{log.actor?.name ?? "System"}</td>
                    <td className="px-4 py-3 font-mono text-xs text-ur-text-muted">
                      {humanize(log.entityType)} · {log.entityId?.slice(0, 10) ?? "—"}...
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${severityTone[log.severity] ?? ""}`}>
                        {log.severity}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="ur-card p-5">
          {selected ? (
            <>
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-ur-navy">Event Details</p>
                <button type="button" onClick={() => setSelected(null)} className="text-ur-text-muted hover:text-ur-navy">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-3 flex items-center gap-3">
                {(() => {
                  const Icon = entityIcons[selected.entityType] ?? FileText;
                  return (
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-ur-card-soft text-ur-cyan">
                      <Icon className="h-5 w-5" />
                    </span>
                  );
                })()}
                <div>
                  <p className="font-bold text-ur-navy">{humanize(selected.action)}</p>
                  <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${severityTone[selected.severity] ?? ""}`}>
                    {selected.severity}
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-2 border-t border-ur-border pt-4 text-sm">
                <DetailRow label="Event ID" value={selected.id} mono />
                <DetailRow label="Timestamp" value={formatDateTime(selected.createdAt)} />
                <DetailRow label="Actor" value={selected.actor ? `${selected.actor.name} (${selected.actor.role})` : "System (Automated)"} />
                <DetailRow label="Entity Type" value={humanize(selected.entityType)} />
                <DetailRow label="Entity ID" value={selected.entityId ?? "—"} mono />
              </div>

              {selected.metadata && Object.keys(selected.metadata).length > 0 ? (
                <div className="mt-4 border-t border-ur-border pt-4">
                  <p className="mb-2 text-sm font-bold text-ur-navy">Metadata</p>
                  <div className="space-y-2 text-sm">
                    {Object.entries(selected.metadata).map(([key, value]) => (
                      <DetailRow key={key} label={humanize(key)} value={String(value)} mono />
                    ))}
                  </div>
                </div>
              ) : null}

              <button
                type="button"
                onClick={() => exportEvent(selected)}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-ur-sm border border-ur-border px-4 py-2 text-sm font-semibold text-ur-navy"
              >
                <Download className="h-4 w-4" />
                Export Event Details
              </button>
            </>
          ) : (
            <p className="text-sm text-ur-text-muted">Select an event to see details.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  loading,
}: {
  icon: typeof FileText;
  label: string;
  value: number;
  color: string;
  loading: boolean;
}) {
  return (
    <div className="ur-card p-4">
      <Icon className={`h-4 w-4 ${color}`} />
      <p className="mt-2 text-xs text-ur-text-secondary">{label}</p>
      <p className="text-xl font-black text-ur-navy">{loading ? "—" : value.toLocaleString()}</p>
    </div>
  );
}

function DetailRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-ur-text-secondary">{label}</span>
      <span className={`text-right text-ur-text ${mono ? "font-mono text-xs" : "font-semibold"}`}>{value}</span>
    </div>
  );
}
