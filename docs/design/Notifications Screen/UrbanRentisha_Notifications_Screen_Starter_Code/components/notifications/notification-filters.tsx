import { notificationFilters, type NotificationType } from "@/lib/notifications-data";
import { cn } from "@/lib/utils";

type NotificationFiltersProps = {
  activeFilter: NotificationType;
  onChange: (filter: NotificationType) => void;
};

export function NotificationFilters({
  activeFilter,
  onChange
}: NotificationFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Notification filters">
      {notificationFilters.map((filter) => {
        const active = filter.value === activeFilter;

        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onChange(filter.value)}
            className={cn(
              "h-10 rounded-ur-sm border px-4 text-sm font-bold transition-colors ur-focus",
              active
                ? "border-ur-primary bg-ur-primary text-white"
                : "border-white/10 bg-black/16 text-white/56 hover:border-ur-primary/50 hover:bg-white/5 hover:text-white"
            )}
            aria-selected={active}
            role="tab"
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
