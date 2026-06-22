"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";

const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function toDateOnly(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function formatISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function Calendar({
  label,
  value,
  onChange,
  minDate,
}: {
  label: string;
  value: string;
  onChange: (isoDate: string) => void;
  minDate?: Date;
}) {
  const [open, setOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(() => (value ? new Date(value) : new Date()));
  const containerRef = useRef<HTMLDivElement>(null);
  const earliest = toDateOnly(minDate ?? new Date());

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedDate = value ? toDateOnly(new Date(value)) : null;
  const firstOfMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
  const leadingBlanks = firstOfMonth.getDay();

  const days: (Date | null)[] = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(viewMonth.getFullYear(), viewMonth.getMonth(), i + 1)),
  ];

  function selectDay(day: Date) {
    onChange(formatISODate(day));
    setOpen(false);
  }

  return (
    <div className="relative space-y-2" ref={containerRef}>
      <label className="block text-xs font-semibold tracking-[0.04em] text-white/78">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-11 w-full items-center justify-between rounded-ur-sm border border-white/12 bg-ur-input px-3 text-sm text-white outline-none transition-colors focus:border-ur-primary"
      >
        <span className={selectedDate ? "text-white" : "text-white/32"}>
          {selectedDate ? formatDisplayDate(selectedDate) : "Select a date"}
        </span>
        <Icon name="calendar_month" size={16} className="text-ur-text-muted" />
      </button>

      {open ? (
        <div className="absolute z-20 mt-1 w-72 rounded-ur-sm border border-ur-border bg-ur-card p-3 shadow-lg">
          <div className="flex items-center justify-between pb-2">
            <button
              type="button"
              aria-label="Previous month"
              onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))}
              className="grid h-8 w-8 place-items-center rounded-full text-ur-text-secondary hover:bg-ur-card-soft"
            >
              <Icon name="arrow_back" size={14} />
            </button>
            <p className="text-sm font-bold text-ur-navy">
              {viewMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>
            <button
              type="button"
              aria-label="Next month"
              onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))}
              className="grid h-8 w-8 place-items-center rounded-full text-ur-text-secondary hover:bg-ur-card-soft"
            >
              <Icon name="arrow_forward" size={14} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-ur-text-muted">
            {WEEKDAY_LABELS.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className="mt-1 grid grid-cols-7 gap-1">
            {days.map((day, i) => {
              if (!day) return <span key={`blank-${i}`} />;
              const disabled = day < earliest;
              const isSelected = selectedDate && day.getTime() === selectedDate.getTime();
              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  disabled={disabled}
                  onClick={() => selectDay(day)}
                  className={`grid h-9 w-9 place-items-center rounded-full text-sm ${
                    isSelected
                      ? "bg-ur-primary font-bold text-white"
                      : disabled
                        ? "text-ur-text-muted/40"
                        : "text-ur-text-secondary hover:bg-ur-card-soft"
                  }`}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
