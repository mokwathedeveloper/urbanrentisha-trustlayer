"use client";

import { CalendarDays, CheckCircle2, RefreshCcw, ShieldAlert } from "lucide-react";
import type { HoldStatus } from "@/lib/payment-hold-data";
import { Button } from "@/components/ui/button";

type TenantActionsCardProps = {
  status: HoldStatus;
  onMarkCompleted: () => void;
  onRequestRefund: () => void;
};

export function TenantActionsCard({
  status,
  onMarkCompleted,
  onRequestRefund
}: TenantActionsCardProps) {
  const completed = status === "release_eligible" || status === "released";
  const refundPending = status === "refund_pending";

  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
        Tenant actions
      </p>

      <h2 className="mt-2 text-lg font-black text-white">
        Manage this reservation
      </h2>

      <p className="mt-2 text-sm leading-6 text-white/58">
        Use these actions to move the simplified hold state during the demo.
      </p>

      <div className="mt-5 space-y-3">
        <Button className="w-full" onClick={onMarkCompleted} disabled={completed || refundPending}>
          <CheckCircle2 className="h-4 w-4" />
          Mark viewing completed
        </Button>

        <Button variant="warning" className="w-full" onClick={onRequestRefund} disabled={completed || refundPending}>
          <RefreshCcw className="h-4 w-4" />
          Request refund review
        </Button>

        <Button variant="outline" className="w-full">
          <CalendarDays className="h-4 w-4" />
          Request reschedule
        </Button>

        <Button variant="danger" className="w-full">
          <ShieldAlert className="h-4 w-4" />
          Report issue
        </Button>
      </div>
    </section>
  );
}
