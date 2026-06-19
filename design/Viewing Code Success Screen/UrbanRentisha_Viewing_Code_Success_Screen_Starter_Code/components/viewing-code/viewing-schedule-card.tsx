import { CalendarCheck2, Clock3, TimerReset } from "lucide-react";
import type { ViewingCodeRecord } from "@/lib/viewing-code-data";

type ViewingScheduleCardProps = {
  record: ViewingCodeRecord;
};

export function ViewingScheduleCard({ record }: ViewingScheduleCardProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Viewing schedule
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        Your viewing slot is confirmed.
      </h2>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <ScheduleTile icon={<CalendarCheck2 className="h-5 w-5" />} label="Date" value={record.viewingDate} />
        <ScheduleTile icon={<Clock3 className="h-5 w-5" />} label="Time" value={record.viewingTime} />
        <ScheduleTile icon={<TimerReset className="h-5 w-5" />} label="Code expiry" value={record.codeExpiresAt} />
      </div>
    </section>
  );
}

function ScheduleTile({
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
