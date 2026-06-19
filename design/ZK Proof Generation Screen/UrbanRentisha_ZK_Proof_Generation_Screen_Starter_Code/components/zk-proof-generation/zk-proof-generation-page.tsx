"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, EyeOff, ShieldCheck } from "lucide-react";
import { zkProofRequest, type ProofStatus } from "@/lib/zk-proof-data";
import { ZkHeader } from "@/components/zk-proof-generation/zk-header";
import { ZkProgress } from "@/components/zk-proof-generation/zk-progress";
import { PaymentConfirmedCard } from "@/components/zk-proof-generation/payment-confirmed-card";
import { GenerateProofCard } from "@/components/zk-proof-generation/generate-proof-card";
import { ProofStatusPanel } from "@/components/zk-proof-generation/proof-status-panel";
import { ProofOutputCard } from "@/components/zk-proof-generation/proof-output-card";
import { PublicInputsCard } from "@/components/zk-proof-generation/public-inputs-card";
import { PrivateInputsCard } from "@/components/zk-proof-generation/private-inputs-card";
import { PrivacyExplainerCard } from "@/components/zk-proof-generation/privacy-explainer-card";
import { ProofSummaryCard } from "@/components/zk-proof-generation/proof-summary-card";
import { ProofSuccessActions } from "@/components/zk-proof-generation/proof-success-actions";
import { Badge } from "@/components/ui/badge";

type ZkProofGenerationPageProps = {
  requestId: string;
};

export function ZkProofGenerationPage({ requestId }: ZkProofGenerationPageProps) {
  const [status, setStatus] = useState<ProofStatus>("ready");
  const [copied, setCopied] = useState(false);
  const request = { ...zkProofRequest, requestId };

  function generateProof() {
    setStatus("generating");
    window.setTimeout(() => setStatus("generated"), 1800);
  }

  async function copyProofHash() {
    await navigator.clipboard.writeText(request.proofHash);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 zk-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-mint/10 blur-[130px]" />

      <div className="relative z-10">
        <ZkHeader />

        <section className="ur-container pb-12 pt-5">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <Link
              href={`/stellar-payment/${request.requestId}`}
              className="inline-flex w-fit items-center gap-2 rounded-ur-sm text-sm font-bold text-white/60 transition-colors hover:text-white ur-focus"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Stellar payment
            </Link>

            <div className="flex flex-wrap gap-2">
              <Badge variant="success">
                <ShieldCheck className="h-3.5 w-3.5" />
                Payment received
              </Badge>
              <Badge variant="outline">
                <EyeOff className="h-3.5 w-3.5" />
                Private proof
              </Badge>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
              ZK proof generation
            </p>
            <h1 className="mt-3 max-w-[840px] text-[42px] font-black leading-[1.02] tracking-[-0.07em] text-white sm:text-[56px]">
              Generate a private payment proof.
            </h1>
            <p className="mt-4 max-w-[780px] text-base leading-7 text-white/66">
              The payment has been received. Generate a proof that confirms the viewing fee condition without exposing unrelated wallet history.
            </p>
          </div>

          <ZkProgress status={status} />

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_390px]">
            <section className="space-y-6">
              <PaymentConfirmedCard request={request} />
              <GenerateProofCard
                request={request}
                status={status}
                onGenerate={generateProof}
              />
              <ProofStatusPanel status={status} request={request} />

              {status === "generated" ? (
                <>
                  <ProofOutputCard
                    proofHash={request.proofHash}
                    copied={copied}
                    onCopy={copyProofHash}
                  />
                  <ProofSuccessActions request={request} />
                </>
              ) : null}

              <PrivacyExplainerCard />
            </section>

            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <ProofSummaryCard request={request} status={status} />
              <PublicInputsCard />
              <PrivateInputsCard />
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
