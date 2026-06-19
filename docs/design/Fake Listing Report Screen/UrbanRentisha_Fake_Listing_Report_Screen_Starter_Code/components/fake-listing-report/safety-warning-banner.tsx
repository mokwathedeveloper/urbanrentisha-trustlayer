import { AlertTriangle, Banknote, ShieldAlert } from "lucide-react";

export function SafetyWarningBanner() {
  return (
    <section className="rounded-ur-xl border border-ur-warning/25 bg-ur-warning-bg p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-ur-lg bg-ur-warning/15 text-ur-warning">
            <ShieldAlert className="h-6 w-6" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-warning">
              Safety first
            </p>
            <h2 className="mt-2 text-xl font-black tracking-[-0.03em] text-white">
              Do not send money outside the verified UrbanRentisha flow.
            </h2>
            <p className="mt-2 max-w-[760px] text-sm leading-6 text-ur-warning/78">
              If an agent asks for cash, mobile money, bank transfer, or another viewing fee outside the platform, stop and report it here.
            </p>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 md:min-w-[290px]">
          <div className="rounded-ur-sm border border-ur-warning/20 bg-black/16 p-3">
            <Banknote className="mb-2 h-4 w-4 text-ur-warning" />
            <p className="text-xs font-bold text-white">No extra fees</p>
          </div>
          <div className="rounded-ur-sm border border-ur-warning/20 bg-black/16 p-3">
            <AlertTriangle className="mb-2 h-4 w-4 text-ur-warning" />
            <p className="text-xs font-bold text-white">Report pressure</p>
          </div>
        </div>
      </div>
    </section>
  );
}
