import { safetyNotes, statusTiming } from "@/lib/proof-verification-data";

export function VerificationSafetyCard() {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Verification safety
      </p>

      <div className="mt-4 space-y-3">
        {safetyNotes.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="flex gap-3 rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm bg-ur-primary/10 text-ur-primary">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-black text-white">{item.title}</p>
                <p className="mt-1 text-xs leading-5 text-white/52">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {statusTiming.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-ur-sm border border-white/10 bg-black/16 p-3">
              <Icon className="mb-2 h-4 w-4 text-ur-primary" />
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/38">{item.label}</p>
              <p className="mt-1 text-xs font-black text-white">{item.value}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
