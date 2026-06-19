import { Database, Hash, MapPin, Network, ShieldCheck, UserRound } from "lucide-react";
import { selectedEvent, statusVisuals, type AuditIntegrity, type AuditSeverity } from "@/lib/audit-log-data";
import { StatusBadge } from "@/components/audit-log/status-badge";

export function AuditDetailsPanel() {
  const severity = statusVisuals.severity[selectedEvent.severity as AuditSeverity];
  const integrity = statusVisuals.integrity[selectedEvent.integrity as AuditIntegrity];

  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Selected event
      </p>
      <h2 className="mt-2 text-lg font-black text-white">{selectedEvent.title}</h2>

      <div className="mt-4 flex flex-wrap gap-2">
        <StatusBadge label={severity.label} variant={severity.variant} icon={severity.icon} />
        <StatusBadge label={integrity.label} variant={integrity.variant} icon={integrity.icon} />
      </div>

      <p className="mt-4 text-sm leading-6 text-white/60">{selectedEvent.description}</p>

      <div className="mt-5 space-y-3">
        <DetailRow icon={<Database className="h-4 w-4" />} label="Event ID" value={selectedEvent.id} />
        <DetailRow icon={<UserRound className="h-4 w-4" />} label="Actor" value={selectedEvent.actor} />
        <DetailRow icon={<ShieldCheck className="h-4 w-4" />} label="Target" value={selectedEvent.target} />
        <DetailRow icon={<Hash className="h-4 w-4" />} label="Proof hash" value={selectedEvent.proofHash ?? "Not attached"} />
        <DetailRow icon={<Network className="h-4 w-4" />} label="TX hash" value={selectedEvent.txHash ?? "Not attached"} />
        <DetailRow icon={<MapPin className="h-4 w-4" />} label="Source" value={selectedEvent.ipAddress ?? "Not recorded"} />
      </div>
    </section>
  );
}

function DetailRow({
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
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
          {icon}
        </div>
        <p className="text-sm font-bold text-white/70">{label}</p>
      </div>
      <p className="max-w-[190px] truncate font-mono text-xs font-bold text-white">{value}</p>
    </div>
  );
}
