import { ArrowRight, Check, Dot } from "lucide-react";
import type { NotificationRecord } from "@/lib/notifications-data";
import { typeVisuals } from "@/lib/notifications-data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type NotificationListItemProps = {
  notification: NotificationRecord;
  selected: boolean;
  onSelect: () => void;
  onMarkAsRead: () => void;
};

export function NotificationListItem({
  notification,
  selected,
  onSelect,
  onMarkAsRead
}: NotificationListItemProps) {
  const visual = typeVisuals[notification.type];
  const Icon = visual.icon;

  const badgeVariant =
    notification.priority === "urgent"
      ? "danger"
      : notification.priority === "important"
        ? "warning"
        : "neutral";

  return (
    <article
      className={cn(
        "rounded-ur-xl border bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl transition-colors",
        selected
          ? "border-ur-primary/70 bg-ur-primary/8"
          : notification.unread
            ? "border-ur-primary/25"
            : "border-white/10 hover:border-white/20 hover:bg-white/[0.045]"
      )}
    >
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <button
          type="button"
          onClick={onSelect}
          className="flex flex-1 gap-4 text-left ur-focus"
        >
          <div
            className={cn(
              "grid h-12 w-12 shrink-0 place-items-center rounded-ur-lg",
              notification.type === "report"
                ? "bg-ur-error-bg text-ur-error"
                : notification.type === "viewing-code"
                  ? "bg-ur-warning-bg text-ur-warning"
                  : "bg-ur-success-bg text-ur-success"
            )}
          >
            <Icon className="h-6 w-6" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-black text-white">{notification.title}</p>
              {notification.unread ? (
                <span className="inline-flex items-center rounded-full bg-ur-primary/14 px-2 py-0.5 text-[11px] font-black text-ur-mint">
                  <Dot className="h-4 w-4" />
                  New
                </span>
              ) : null}
              <Badge variant={badgeVariant}>
                {notification.priority}
              </Badge>
            </div>

            <p className="mt-2 max-w-[720px] text-sm leading-6 text-white/58">
              {notification.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="font-mono text-xs font-bold text-ur-mint">
                {notification.requestId}
              </span>
              <span className="text-xs font-bold text-white/38">•</span>
              <span className="text-xs font-bold text-white/42">
                {notification.timestamp}
              </span>
              <span className="text-xs font-bold text-white/38">•</span>
              <span className="text-xs font-bold text-white/50">
                {visual.label}
              </span>
            </div>
          </div>
        </button>

        <div className="flex gap-2 xl:flex-col">
          {notification.unread ? (
            <Button size="sm" variant="outline" onClick={onMarkAsRead}>
              <Check className="h-4 w-4" />
              Read
            </Button>
          ) : null}

          <Button size="sm" onClick={onSelect}>
            Open
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </article>
  );
}
