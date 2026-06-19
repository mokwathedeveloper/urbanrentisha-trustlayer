import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

type EmptyStateProps = {
  onReset: () => void;
};

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-10 text-center backdrop-blur-xl">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-ur-lg bg-ur-primary/10 text-ur-primary">
        <SearchX className="h-7 w-7" />
      </div>
      <h2 className="mt-5 text-2xl font-black tracking-[-0.04em] text-white">
        No properties match these filters.
      </h2>
      <p className="mx-auto mt-3 max-w-[440px] text-sm leading-6 text-white/56">
        Clear filters or broaden your rent, location, verification, or viewing-fee selection.
      </p>
      <Button className="mt-6" onClick={onReset}>
        Reset filters
      </Button>
    </div>
  );
}
