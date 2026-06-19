"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { selectedProperty } from "@/lib/request-viewing-data";
import { RequestHeader } from "@/components/request-viewing/request-header";
import { RequestProgress } from "@/components/request-viewing/request-progress";
import { PropertySummaryCard } from "@/components/request-viewing/property-summary-card";
import { ViewingFeeCard } from "@/components/request-viewing/viewing-fee-card";
import { ViewingRequestForm } from "@/components/request-viewing/viewing-request-form";
import { PaymentProofExplainer } from "@/components/request-viewing/payment-proof-explainer";
import { FeeBreakdownCard } from "@/components/request-viewing/fee-breakdown-card";
import { AgentSafetyCard } from "@/components/request-viewing/agent-safety-card";
import { RequestSuccessPanel } from "@/components/request-viewing/request-success-panel";
import { Badge } from "@/components/ui/badge";

type RequestViewingPageProps = {
  propertyId: string;
};

export type RequestFormState = {
  date: string;
  time: string;
  contactPreference: string;
  note: string;
  acceptedTerms: boolean;
};

export function RequestViewingPage({ propertyId }: RequestViewingPageProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState<RequestFormState>({
    date: "Tomorrow",
    time: "11:30 AM",
    contactPreference: "In-app notification",
    note: "",
    acceptedTerms: false
  });

  const requestId = "REQ-UR-9084";

  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 request-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-mint/10 blur-[130px]" />

      <div className="relative z-10">
        <RequestHeader />

        <section className="ur-container pb-12 pt-5">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <Link
              href={`/properties/${propertyId}`}
              className="inline-flex w-fit items-center gap-2 rounded-ur-sm text-sm font-bold text-white/60 transition-colors hover:text-white ur-focus"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to property details
            </Link>

            <Badge variant="success">
              <ShieldCheck className="h-3.5 w-3.5" />
              Viewing request is proof-gated
            </Badge>
          </div>

          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
              Create viewing request
            </p>
            <h1 className="mt-3 max-w-[820px] text-[42px] font-black leading-[1.02] tracking-[-0.07em] text-white sm:text-[56px]">
              Request access to view a verified property.
            </h1>
            <p className="mt-4 max-w-[760px] text-base leading-7 text-white/66">
              Confirm the property, select a preferred viewing slot, and review the required viewing fee before proceeding to Stellar payment and ZK proof verification.
            </p>
          </div>

          <RequestProgress activeStep={submitted ? 2 : 1} />

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_390px]">
            <section className="space-y-6">
              {submitted ? (
                <RequestSuccessPanel
                  requestId={requestId}
                  property={selectedProperty}
                  formState={formState}
                />
              ) : (
                <>
                  <PropertySummaryCard property={selectedProperty} />
                  <ViewingRequestForm
                    formState={formState}
                    onChange={setFormState}
                    onSubmit={() => setSubmitted(true)}
                  />
                </>
              )}

              <PaymentProofExplainer />
            </section>

            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <ViewingFeeCard property={selectedProperty} />
              <FeeBreakdownCard property={selectedProperty} />
              <AgentSafetyCard property={selectedProperty} />
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
