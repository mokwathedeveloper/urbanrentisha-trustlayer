import { DoorOpen, Home, MapPin, ShieldCheck } from "lucide-react";
import type { ViewingCodeRecord } from "@/lib/viewing-code-data";

type AccessDetailsCardProps = {
  record: ViewingCodeRecord;
};

export function AccessDetailsCard({ record }: AccessDetailsCardProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Access details
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        {record.propertyTitle}
      </h2>
      <p className="mt-2 flex items-center gap-2 text-sm text-white/58">
        <MapPin className="h-4 w-4 text-ur-primary" />
        {record.propertyLocation}
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <AccessTile icon={<Home className="h-5 w-5" />} label="Building" value={record.buildingName} />
        <AccessTile icon={<DoorOpen className="h-5 w-5" />} label="Access point" value={record.accessPoint} />
        <AccessTile icon={<ShieldCheck className="h-5 w-5" />} label="Access status" value={record.accessStatus} />
      </div>
    </section>
  );
}

function AccessTile({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
      <div className="mb-3 text-ur-primary">{icon}</div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">{label}</p>
      <p className="mt-1 text-sm font-black text-white">{value}</p>
    </div>
  );
}
