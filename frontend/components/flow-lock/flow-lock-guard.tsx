"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import type { FlowLockStatus } from "@/lib/tab-lock";

/**
 * Renders the "this flow is already open in another tab" warning (and the
 * smaller persistent banners for the read-only / taken-over states) on top
 * of a booking/payment/proof page. The page itself decides what `flowLabel`
 * to show (e.g. "this booking", "this payment") and is responsible for
 * disabling its own mutating actions when `readOnly` is true - see
 * `isFlowLockReadOnly` below.
 */
export function FlowLockGuard({
  status,
  flowLabel,
  onTakeOver,
  onContinueReadOnly,
}: {
  status: FlowLockStatus;
  flowLabel: string;
  onTakeOver: () => void;
  onContinueReadOnly: () => void;
}) {
  const router = useRouter();

  if (status === "warning") {
    return (
      <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4" role="dialog" aria-modal="true" aria-label="Duplicate tab warning">
        <div className="ur-card w-full max-w-md p-6">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-ur-warning-bg text-ur-warning">
            <Icon name="warning" size={22} />
          </div>
          <h2 className="mt-4 text-lg font-bold text-ur-navy">Already open in another tab</h2>
          <p className="mt-2 text-sm text-ur-text-secondary">
            {flowLabel} is already open in another browser tab. Please continue there, or take over this
            session here.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <Button onClick={onTakeOver} className="w-full">
              Take Over This Tab
            </Button>
            <Button variant="outline" onClick={onContinueReadOnly} className="w-full">
              Continue Read-Only
            </Button>
            <Button variant="ghost" onClick={() => router.back()} className="w-full">
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (status === "taken-over") {
    return (
      <div className="fixed inset-x-0 top-0 z-50 flex items-center gap-3 border-b border-ur-warning/40 bg-ur-warning-bg px-4 py-3 text-sm font-semibold text-ur-warning">
        <Icon name="warning" size={18} />
        This session was taken over in another tab. This tab is now read-only.
      </div>
    );
  }

  if (status === "readonly") {
    return (
      <div className="fixed inset-x-0 top-0 z-50 flex items-center gap-3 border-b border-ur-border-strong bg-ur-card px-4 py-3 text-sm font-semibold text-ur-text-secondary">
        <Icon name="visibility" size={18} />
        Read-only - {flowLabel} is active in another tab.
      </div>
    );
  }

  return null;
}

export function isFlowLockReadOnly(status: FlowLockStatus): boolean {
  return status === "readonly" || status === "taken-over";
}
