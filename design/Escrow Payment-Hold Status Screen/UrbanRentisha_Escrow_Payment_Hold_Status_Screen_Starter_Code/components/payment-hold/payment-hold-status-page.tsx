"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, LockKeyhole, ShieldCheck } from "lucide-react";
import {
  paymentHoldRecord,
  type HoldStatus
} from "@/lib/payment-hold-data";
import { PaymentHoldHeader } from "@/components/payment-hold/payment-hold-header";
import { PaymentHoldProgress } from "@/components/payment-hold/payment-hold-progress";
import { HoldStatusHeroCard } from "@/components/payment-hold/hold-status-hero-card";
import { ReservationSummaryCard } from "@/components/payment-hold/reservation-summary-card";
import { HoldBreakdownCard } from "@/components/payment-hold/hold-breakdown-card";
import { HoldTimelineCard } from "@/components/payment-hold/hold-timeline-card";
import { ReleaseRulesCard } from "@/components/payment-hold/release-rules-card";
import { TenantActionsCard } from "@/components/payment-hold/tenant-actions-card";
import { ContractHoldReferenceCard } from "@/components/payment-hold/contract-hold-reference-card";
import { HoldAuditTrailCard } from "@/components/payment-hold/hold-audit-trail-card";
import { SupportDisputeCard } from "@/components/payment-hold/support-dispute-card";
import { ReservationAccessCard } from "@/components/payment-hold/reservation-access-card";
import { Badge } from "@/components/ui/badge";

type PaymentHoldStatusPageProps = {
  requestId: string;
};

export function PaymentHoldStatusPage({ requestId }: PaymentHoldStatusPageProps) {
  const [status, setStatus] = useState<HoldStatus>("reserved");
  const [copied, setCopied] = useState(false);
  const record = { ...paymentHoldRecord, requestId, status };

  async function copyHoldId() {
    await navigator.clipboard.writeText(record.holdId);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  function markCompleted() {
    setStatus("release_eligible");
  }

  function requestRefundReview() {
    setStatus("refund_pending");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 hold-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-mint/10 blur-[130px]" />

      <div className="relative z-10">
        <PaymentHoldHeader />

        <section className="ur-container pb-12 pt-5">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <Link
              href={`/viewing-code/${record.requestId}`}
              className="inline-flex w-fit items-center gap-2 rounded-ur-sm text-sm font-bold text-white/60 transition-colors hover:text-white ur-focus"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to viewing access
            </Link>

            <div className="flex flex-wrap gap-2">
              <Badge variant="success">
                <ShieldCheck className="h-3.5 w-3.5" />
                Proof verified
              </Badge>
              <Badge variant="outline">
                <LockKeyhole className="h-3.5 w-3.5" />
                Payment-hold tracked
              </Badge>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
              Payment-hold status
            </p>
            <h1 className="mt-3 max-w-[900px] text-[42px] font-black leading-[1.02] tracking-[-0.07em] text-white sm:text-[56px]">
              Track the reservation and payment hold.
            </h1>
            <p className="mt-4 max-w-[790px] text-base leading-7 text-white/66">
              View the simplified hold state, reservation window, payment reference, and next actions for the verified viewing request.
            </p>
          </div>

          <PaymentHoldProgress status={status} />

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_390px]">
            <section className="space-y-6">
              <HoldStatusHeroCard
                record={record}
                copied={copied}
                onCopy={copyHoldId}
              />
              <ReservationSummaryCard record={record} />
              <HoldBreakdownCard record={record} />
              <HoldTimelineCard status={status} />
              <ReleaseRulesCard />
            </section>

            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <TenantActionsCard
                status={status}
                onMarkCompleted={markCompleted}
                onRequestRefund={requestRefundReview}
              />
              <ReservationAccessCard record={record} />
              <ContractHoldReferenceCard record={record} />
              <HoldAuditTrailCard status={status} />
              <SupportDisputeCard />
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
