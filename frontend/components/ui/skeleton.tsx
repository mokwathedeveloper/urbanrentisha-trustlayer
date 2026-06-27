import { cn } from "@/lib/utils";

/**
 * Base shimmer block. The shimmer keyframe itself lives in globals.css
 * (`.ur-shimmer`) so every skeleton in the app pulses in sync and reduced-
 * motion users get a single, app-wide override instead of needing it
 * re-declared per component.
 */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("ur-shimmer rounded-ur-sm bg-ur-card-soft", className)} />;
}

/** Matches PropertyCard's layout (components/listings/property-card.tsx): h-44 image + title/meta rows. */
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("ur-card overflow-hidden", className)}>
      <Skeleton className="h-44 w-full rounded-none" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex items-center justify-between pt-1">
          <Skeleton className="h-3 w-1/4" />
          <Skeleton className="h-7 w-16 rounded-ur-sm" />
        </div>
      </div>
    </div>
  );
}

/** Matches Row's layout (components/dashboard/dashboard-ui.tsx): title + meta on the left, a badge-shaped block on the right. */
export function ListRowSkeleton() {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5">
      <div className="min-w-0 flex-1 space-y-1.5">
        <Skeleton className="h-3.5 w-2/5" />
        <Skeleton className="h-3 w-1/3" />
      </div>
      <Skeleton className="h-5 w-20 shrink-0 rounded-full" />
    </div>
  );
}

/** Drop in place of a Panel's children while its data is still loading. */
export function ListRowSkeletonGroup({ rows = 3 }: { rows?: number }) {
  return (
    <div className="divide-y divide-ur-border">
      {Array.from({ length: rows }).map((_, i) => (
        <ListRowSkeleton key={i} />
      ))}
    </div>
  );
}

/** Matches StatCard's layout (components/dashboard/dashboard-ui.tsx). */
export function StatCardSkeleton() {
  return (
    <div className="ur-card p-4">
      <Skeleton className="h-4 w-4" />
      <Skeleton className="mt-3 h-3 w-2/3" />
      <Skeleton className="mt-2 h-5 w-1/2" />
    </div>
  );
}
