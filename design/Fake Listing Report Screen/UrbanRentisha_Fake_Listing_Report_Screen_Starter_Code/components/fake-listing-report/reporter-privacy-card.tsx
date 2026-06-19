import { EyeOff, UserRound } from "lucide-react";
import type { ReporterMode } from "@/lib/report-data";
import { cn } from "@/lib/utils";

type ReporterPrivacyCardProps = {
  value: ReporterMode;
  onChange: (value: ReporterMode) => void;
};

export function ReporterPrivacyCard({
  value,
  onChange
}: ReporterPrivacyCardProps) {
  const options = [
    {
      value: "private" as ReporterMode,
      title: "Report privately",
      description: "Your name is hidden from the reported agent or listing owner.",
      icon: EyeOff
    },
    {
      value: "named" as ReporterMode,
      title: "Report with my account",
      description: "Your account can be contacted for case follow-up by the safety team.",
      icon: UserRound
    }
  ];

  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Reporter privacy
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        Choose how this report appears.
      </h2>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {options.map((option) => {
          const Icon = option.icon;
          const active = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={cn(
                "rounded-ur-lg border p-4 text-left transition-colors ur-focus",
                active
                  ? "border-ur-primary bg-ur-primary/10"
                  : "border-white/10 bg-black/16 hover:border-ur-primary/40"
              )}
            >
              <div className={cn(
                "mb-4 grid h-11 w-11 place-items-center rounded-ur",
                active ? "bg-ur-primary text-white" : "bg-white/5 text-white/52"
              )}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="font-black text-white">{option.title}</p>
              <p className="mt-2 text-sm leading-6 text-white/52">{option.description}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
