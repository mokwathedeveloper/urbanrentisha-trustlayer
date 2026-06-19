import { CalendarCheck2, MapPin, ShieldCheck, UserRound } from "lucide-react";
import { reservationFacts, type PaymentHoldRecord } from "@/lib/payment-hold-data";

type ReservationSummaryCardProps = {
  record: PaymentHoldRecord;
};

export function ReservationSummaryCard({ record }: ReservationSummaryCardProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Reservation summary
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            {record.propertyTitle}
          </h2>
          <p className="mt-2 flex items-center gap-2 text-sm text-white/58">
            <MapPin className="h-4 w-4 text-ur-primary" />
            {record.propertyLocation}
          </p>
        </div>

        <div className="rounded-ur-lg border border-ur-success/20 bg-ur-success-bg p-4 text-right">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-ur-success">
            Access status
          </p>
          <p className="mt-1 text-xl font-black text-white">{record.accessStatus}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryTile icon={<CalendarCheck2 className="h-5 w-5" />} label="Viewing" value={`${record.viewingDate}, ${record.viewingTime}`} />
        <SummaryTile icon={<UserRound className="h-5 w-5" />} label="Agent" value={record.agentName} />
        <SummaryTile icon={<ShieldCheck className="h-5 w-5" />} label="Proof" value={record.verificationStatus} />
        <SummaryTile icon={<CalendarCheck2 className="h-5 w-5" />} label="Reservation" value={record.reservationId} mono />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {reservationFacts.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
              <Icon className="mb-3 h-5 w-5 text-ur-primary" />
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">{item.label}</p>
              <p className="mt-1 text-sm font-black text-white">{item.value}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function SummaryTile({
  icon,
  label,
  value,
  mono
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
      <div className="mb-3 text-ur-primary">{icon}</div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">{label}</p>
      <p className={mono ? "mt-1 font-mono text-sm font-bold text-ur-mint" : "mt-1 text-sm font-black text-white"}>
        {value}
      </p>
    </div>
  );
}
