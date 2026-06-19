"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";
import {
  proofVerificationRequest,
  type VerificationStatus
} from "@/lib/proof-verification-data";
import { VerificationHeader } from "@/components/proof-verification/verification-header";
import { VerificationProgress } from "@/components/proof-verification/verification-progress";
import { ProofReadyCard } from "@/components/proof-verification/proof-ready-card";
import { SubmitVerificationCard } from "@/components/proof-verification/submit-verification-card";
import { VerificationStatusPanel } from "@/components/proof-verification/verification-status-panel";
import { VerificationResultCard } from "@/components/proof-verification/verification-result-card";
import { VerificationSuccessActions } from "@/components/proof-verification/verification-success-actions";
import { ContractReferenceCard } from "@/components/proof-verification/contract-reference-card";
import { ProofPayloadCard } from "@/components/proof-verification/proof-payload-card";
import { AuditTrailCard } from "@/components/proof-verification/audit-trail-card";
import { VerificationSafetyCard } from "@/components/proof-verification/verification-safety-card";
import { Badge } from "@/components/ui/badge";

type ProofVerificationPageProps = {
  requestId: string;
};

export function ProofVerificationPage({ requestId }: ProofVerificationPageProps) {
  const [status, setStatus] = useState<VerificationStatus>("ready");
  const [copied, setCopied] = useState(false);
  const request = { ...proofVerificationRequest, requestId };

  function submitProof() {
    setStatus("submitting");
    window.setTimeout(() => setStatus("verifying"), 900);
    window.setTimeout(() => setStatus("verified"), 2100);
  }

  async function copyVerificationHash() {
    await navigator.clipboard.writeText(request.verificationHash);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 verification-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-mint/10 blur-[130px]" />

      <div className="relative z-10">
        <VerificationHeader />

        <section className="ur-container pb-12 pt-5">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <Link
              href={`/zk-proof-generation/${request.requestId}`}
              className="inline-flex w-fit items-center gap-2 rounded-ur-sm text-sm font-bold text-white/60 transition-colors hover:text-white ur-focus"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to ZK proof generation
            </Link>

            <div className="flex flex-wrap gap-2">
              <Badge variant="success">
                <ShieldCheck className="h-3.5 w-3.5" />
                Proof generated
              </Badge>
              <Badge variant="outline">
                <Sparkles className="h-3.5 w-3.5" />
                Soroban verification
              </Badge>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
              Proof verification
            </p>
            <h1 className="mt-3 max-w-[900px] text-[42px] font-black leading-[1.02] tracking-[-0.07em] text-white sm:text-[56px]">
              Verify the proof on Stellar/Soroban.
            </h1>
            <p className="mt-4 max-w-[780px] text-base leading-7 text-white/66">
              Submit the generated payment proof to the verifier contract, track verification status, and unlock eligibility for viewing access.
            </p>
          </div>

          <VerificationProgress status={status} />

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_390px]">
            <section className="space-y-6">
              <ProofReadyCard request={request} />
              <SubmitVerificationCard
                request={request}
                status={status}
                onSubmit={submitProof}
              />
              <VerificationStatusPanel status={status} request={request} />

              {status === "verified" ? (
                <>
                  <VerificationResultCard
                    request={request}
                    copied={copied}
                    onCopy={copyVerificationHash}
                  />
                  <VerificationSuccessActions request={request} />
                </>
              ) : null}
            </section>

            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <ContractReferenceCard request={request} />
              <ProofPayloadCard />
              <AuditTrailCard status={status} />
              <VerificationSafetyCard />
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
