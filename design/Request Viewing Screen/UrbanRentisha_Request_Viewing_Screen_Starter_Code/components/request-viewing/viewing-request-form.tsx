"use client";

import { ArrowRight, CalendarDays, CheckCircle2, Clock3, MessageSquareText } from "lucide-react";
import type { RequestFormState } from "@/components/request-viewing/request-viewing-page";
import { contactPreferences, viewingDates, viewingTimes } from "@/lib/request-viewing-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ViewingRequestFormProps = {
  formState: RequestFormState;
  onChange: (state: RequestFormState) => void;
  onSubmit: () => void;
};

export function ViewingRequestForm({
  formState,
  onChange,
  onSubmit
}: ViewingRequestFormProps) {
  const canSubmit = formState.date && formState.time && formState.contactPreference && formState.acceptedTerms;

  function update<Key extends keyof RequestFormState>(key: Key, value: RequestFormState[Key]) {
    onChange({ ...formState, [key]: value });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (canSubmit) onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
          Viewing preferences
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
          Select when and how the agent should coordinate.
        </h2>
      </div>

      <div className="space-y-6">
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-black text-white">
            <CalendarDays className="h-4 w-4 text-ur-primary" />
            Preferred viewing date
          </div>
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {viewingDates.map((date) => (
              <OptionButton
                key={date}
                selected={formState.date === date}
                onClick={() => update("date", date)}
              >
                {date}
              </OptionButton>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-black text-white">
            <Clock3 className="h-4 w-4 text-ur-primary" />
            Preferred time
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {viewingTimes.map((time) => (
              <OptionButton
                key={time}
                selected={formState.time === time}
                onClick={() => update("time", time)}
              >
                {time}
              </OptionButton>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-black text-white">
            <MessageSquareText className="h-4 w-4 text-ur-primary" />
            Contact preference after proof
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {contactPreferences.map((preference) => (
              <OptionButton
                key={preference}
                selected={formState.contactPreference === preference}
                onClick={() => update("contactPreference", preference)}
              >
                {preference}
              </OptionButton>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="tenant-note" className="block text-xs font-semibold tracking-[0.04em] text-white/78">
            Optional note to agent
          </label>
          <textarea
            id="tenant-note"
            value={formState.note}
            onChange={(event) => update("note", event.target.value)}
            placeholder="Example: I prefer an afternoon viewing and would like to confirm parking access."
            className="min-h-[130px] w-full resize-y rounded-ur-sm border border-white/12 bg-ur-input p-3 text-sm text-white outline-none transition-colors placeholder:text-white/32 focus:border-ur-primary"
          />
        </div>

        <label className="flex cursor-pointer items-start gap-3 rounded-ur-lg border border-ur-primary/20 bg-ur-primary/8 p-4">
          <input
            type="checkbox"
            checked={formState.acceptedTerms}
            onChange={(event) => update("acceptedTerms", event.target.checked)}
            className="mt-1 h-5 w-5 rounded border-white/20 bg-ur-input accent-ur-primary"
          />
          <span>
            <span className="block text-sm font-black text-white">
              I understand the viewing fee is required before access unlocks.
            </span>
            <span className="mt-1 block text-sm leading-6 text-white/56">
              Viewing code and private agent access details remain locked until payment proof verification succeeds.
            </span>
          </span>
        </label>

        <Button type="submit" size="lg" className="w-full" disabled={!canSubmit}>
          <CheckCircle2 className="h-4 w-4" />
          Create viewing request
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}

function OptionButton({
  selected,
  onClick,
  children
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-ur-sm border px-3 py-2 text-sm font-bold transition-colors ur-focus",
        selected
          ? "border-ur-primary bg-ur-primary text-white"
          : "border-white/10 bg-black/16 text-white/62 hover:border-white/20 hover:bg-white/5 hover:text-white"
      )}
    >
      {children}
    </button>
  );
}
