"use client";

import { AlertTriangle, MessageSquareText } from "lucide-react";
import {
  severityOptions,
  type ReportSeverity
} from "@/lib/report-data";
import { cn } from "@/lib/utils";

type ReportDetailsFormCardProps = {
  severity: ReportSeverity;
  description: string;
  contactBack: boolean;
  onSeverityChange: (value: ReportSeverity) => void;
  onDescriptionChange: (value: string) => void;
  onContactBackChange: (value: boolean) => void;
};

export function ReportDetailsFormCard({
  severity,
  description,
  contactBack,
  onSeverityChange,
  onDescriptionChange,
  onContactBackChange
}: ReportDetailsFormCardProps) {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Report details
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        Explain what happened.
      </h2>

      <div className="mt-5">
        <label htmlFor="report-description" className="text-sm font-bold text-white">
          Description
        </label>
        <textarea
          id="report-description"
          value={description}
          onChange={(event) => onDescriptionChange(event.target.value)}
          placeholder="Describe the suspicious behaviour, payment request, address mismatch, or agent concern."
          className="report-textarea mt-2 w-full rounded-ur-sm border border-white/10 bg-black/18 px-4 py-3 text-sm leading-6 text-white outline-none transition-colors placeholder:text-white/30 focus:border-ur-primary"
        />
        <p className="mt-2 text-xs text-white/42">
          Minimum 10 characters. Do not include passwords, wallet secret keys, or full personal documents.
        </p>
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-ur-warning" />
          <p className="text-sm font-bold text-white">Severity</p>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-4">
          {severityOptions.map((item) => {
            const Icon = item.icon;
            const active = item.value === severity;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => onSeverityChange(item.value)}
                className={cn(
                  "rounded-ur-lg border p-4 text-left transition-colors ur-focus",
                  active
                    ? item.value === "urgent"
                      ? "border-ur-error bg-ur-error-bg"
                      : "border-ur-primary bg-ur-primary/10"
                    : "border-white/10 bg-black/16 hover:border-ur-primary/40"
                )}
              >
                <Icon className={cn("mb-3 h-5 w-5", item.value === "urgent" ? "text-ur-error" : "text-ur-primary")} />
                <p className="text-sm font-black text-white">{item.label}</p>
                <p className="mt-2 text-xs leading-5 text-white/52">{item.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 rounded-ur-lg border border-white/10 bg-black/16 p-4">
        <div className="flex gap-3">
          <MessageSquareText className="mt-0.5 h-5 w-5 shrink-0 text-ur-primary" />
          <div>
            <p className="text-sm font-black text-white">Allow safety team to contact you</p>
            <p className="mt-1 text-xs leading-5 text-white/52">
              Used only if more details are needed to review the report.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onContactBackChange(!contactBack)}
          className={cn(
            "relative h-6 w-11 shrink-0 rounded-full transition-colors ur-focus",
            contactBack ? "bg-ur-primary" : "bg-white/12"
          )}
          aria-pressed={contactBack}
          aria-label="Allow safety team to contact you"
        >
          <span
            className={cn(
              "absolute top-1 h-4 w-4 rounded-full bg-white transition-transform",
              contactBack ? "translate-x-6" : "translate-x-1"
            )}
          />
        </button>
      </div>
    </section>
  );
}
