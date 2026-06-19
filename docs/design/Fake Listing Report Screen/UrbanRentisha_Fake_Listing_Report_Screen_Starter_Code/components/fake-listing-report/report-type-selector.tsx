import { reportTypes, type ReportType } from "@/lib/report-data";
import { cn } from "@/lib/utils";

type ReportTypeSelectorProps = {
  value: ReportType;
  onChange: (value: ReportType) => void;
};

export function ReportTypeSelector({
  value,
  onChange
}: ReportTypeSelectorProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Report type
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        What are you reporting?
      </h2>
      <p className="mt-2 text-sm leading-6 text-white/56">
        Select the closest category. The safety team can reclassify it during review.
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {reportTypes.map((item) => {
          const Icon = item.icon;
          const active = item.value === value;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => onChange(item.value)}
              className={cn(
                "rounded-ur-lg border p-4 text-left transition-colors ur-focus",
                active
                  ? "border-ur-primary bg-ur-primary/10"
                  : "border-white/10 bg-black/16 hover:border-ur-primary/40 hover:bg-white/[0.04]"
              )}
            >
              <div className={cn(
                "mb-4 grid h-11 w-11 place-items-center rounded-ur",
                active ? "bg-ur-primary text-white" : "bg-white/5 text-white/52"
              )}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="font-black text-white">{item.label}</p>
              <p className="mt-2 text-sm leading-6 text-white/52">{item.description}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
