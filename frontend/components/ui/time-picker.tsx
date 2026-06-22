"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";

const START_HOUR = 8;
const END_HOUR = 18;
const STEP_MINUTES = 30;

function buildSlots(): string[] {
  const slots: string[] = [];
  for (let hour = START_HOUR; hour <= END_HOUR; hour++) {
    for (let minute = 0; minute < 60; minute += STEP_MINUTES) {
      if (hour === END_HOUR && minute > 0) continue;
      slots.push(`${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`);
    }
  }
  return slots;
}

function formatDisplayTime(value: string): string {
  const [hourStr, minuteStr] = value.split(":");
  const hour = Number(hourStr);
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${minuteStr} ${period}`;
}

const SLOTS = buildSlots();

export function TimePicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (time: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative space-y-2" ref={containerRef}>
      <label className="block text-xs font-semibold tracking-[0.04em] text-white/78">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-11 w-full items-center justify-between rounded-ur-sm border border-white/12 bg-ur-input px-3 text-sm text-white outline-none transition-colors focus:border-ur-primary"
      >
        <span className={value ? "text-white" : "text-white/32"}>{value ? formatDisplayTime(value) : "Select a time"}</span>
        <Icon name="schedule" size={16} className="text-ur-text-muted" />
      </button>

      {open ? (
        <div className="absolute z-20 mt-1 max-h-60 w-full overflow-y-auto rounded-ur-sm border border-ur-border bg-ur-card p-2 shadow-lg">
          {SLOTS.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => {
                onChange(slot);
                setOpen(false);
              }}
              className={`block w-full rounded-ur-sm px-3 py-2 text-left text-sm ${
                slot === value ? "bg-ur-primary font-bold text-white" : "text-ur-text-secondary hover:bg-ur-card-soft"
              }`}
            >
              {formatDisplayTime(slot)}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
