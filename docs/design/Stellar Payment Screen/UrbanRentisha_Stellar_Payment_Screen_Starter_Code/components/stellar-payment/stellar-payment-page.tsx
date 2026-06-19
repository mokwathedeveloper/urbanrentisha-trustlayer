"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";
import { stellarPaymentRequest, type PaymentStatus } from "@/lib/stellar-payment-data";
import { PaymentHeader } from "@/components/stellar-payment/payment-header";
import { PaymentProgress } from "@/components/stellar-payment/payment-progress";
import { PaymentAmountCard } from "@/components/stellar-payment/payment-amount-card";
import { StellarWalletCard } from "@/components/stellar-payment/stellar-wallet-card";
import { TransactionStatusPanel } from "@/components/stellar-payment/transaction-status-panel";
import { TransactionHashCard } from "@/components/stellar-payment/transaction-hash-card";
import { PaymentSummaryCard } from "@/components/stellar-payment/payment-summary-card";
import { PaymentInstructions } from "@/components/stellar-payment/payment-instructions";
import { PaymentSuccessActions } from "@/components/stellar-payment/payment-success-actions";
import { SecurityNotesCard } from "@/components/stellar-payment/security-notes-card";
import { Badge } from "@/components/ui/badge";

type StellarPaymentPageProps = {
  requestId: string;
};

export function StellarPaymentPage({ requestId }: StellarPaymentPageProps) {
  const [status, setStatus] = useState<PaymentStatus>("idle");
  const [copied, setCopied] = useState(false);
  const request = { ...stellarPaymentRequest, requestId };

  function connectWallet() {
    setStatus("wallet_connected");
  }

  function submitPayment() {
    setStatus("submitting");
    window.setTimeout(() => setStatus("confirming"), 900);
    window.setTimeout(() => setStatus("confirmed"), 1800);
  }

  async function copyHash() {
    await navigator.clipboard.writeText(request.transactionHash);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 payment-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-mint/10 blur-[130px]" />

      <div className="relative z-10">
        <PaymentHeader />

        <section className="ur-container pb-12 pt-5">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <Link
              href={`/request-viewing/${request.propertyId}`}
              className="inline-flex w-fit items-center gap-2 rounded-ur-sm text-sm font-bold text-white/60 transition-colors hover:text-white ur-focus"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to request viewing
            </Link>

            <div className="flex flex-wrap gap-2">
              <Badge variant="success">
                <ShieldCheck className="h-3.5 w-3.5" />
                Testnet-safe payment
              </Badge>
              <Badge variant="outline">
                <Sparkles className="h-3.5 w-3.5" />
                Stellar network
              </Badge>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
              Stellar payment screen
            </p>
            <h1 className="mt-3 max-w-[820px] text-[42px] font-black leading-[1.02] tracking-[-0.07em] text-white sm:text-[56px]">
              Pay the viewing fee on Stellar testnet.
            </h1>
            <p className="mt-4 max-w-[760px] text-base leading-7 text-white/66">
              Complete the payment, track transaction status, and keep the transaction hash for proof generation. Access stays locked until proof verification succeeds.
            </p>
          </div>

          <PaymentProgress status={status} />

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_390px]">
            <section className="space-y-6">
              <PaymentAmountCard request={request} />
              <StellarWalletCard
                request={request}
                status={status}
                onConnectWallet={connectWallet}
                onSubmitPayment={submitPayment}
              />
              <TransactionStatusPanel status={status} request={request} />
              {status === "confirmed" ? (
                <TransactionHashCard
                  hash={request.transactionHash}
                  copied={copied}
                  onCopy={copyHash}
                />
              ) : null}
              {status === "confirmed" ? (
                <PaymentSuccessActions request={request} />
              ) : null}
            </section>

            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <PaymentSummaryCard request={request} status={status} />
              <PaymentInstructions request={request} />
              <SecurityNotesCard />
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
