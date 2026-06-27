import { Spinner } from "@/components/ui/spinner";

/**
 * Replaces the bare `<p>Loading...</p>` previously returned by most pages
 * while their initial fetch is in flight. Centered and full-width so it
 * doesn't read as a smaller, secondary state next to the page it's about
 * to become.
 */
export function PageLoader({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 px-8 py-8 text-center">
      <Spinner size="lg" className="text-ur-primary" aria-label={label} />
      <p className="text-sm text-ur-text-muted">{label}</p>
    </div>
  );
}
