"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Stepper } from "@/components/requests/stepper";
import { api, type Payment, type ViewingRequest } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { Icon } from "@/components/ui/icon";

const POLL_INTERVAL_MS = 5000;

const howItWorks = [
  "Send the exact amount of XLM to the address above",
  "We watch Stellar Testnet for your payment automatically",
  "You'll be redirected as soon as it's confirmed - no transaction hash needed",
  "Your viewing request will be automatically confirmed",
];

export default function PaymentPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { token } = useAuth();

  const [request, setRequest] = useState<ViewingRequest | null>(null);
  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!token) return;
    api.viewingRequests
      .findOne(token, params.id)
      .then(async (req) => {
        setRequest(req);
        if (req.payment) {
          setPayment(req.payment);
        } else {
          const created = await api.payments.create(token, { viewingRequestId: params.id });
          setPayment(created);
        }
      })
      .catch(() => setError("Could not load this viewing request."))
      .finally(() => setLoading(false));
  }, [token, params.id]);

  useEffect(() => {
    if (!token || !payment || payment.status === "RECEIVED") return;
    const currentToken = token;
    const paymentId = payment.id;
    const interval = setInterval(() => {
      api.payments.pollStatus(currentToken, paymentId).then((updated) => {
        setPayment(updated);
        if (updated.status === "RECEIVED") {
          router.push(`/requests/${params.id}/proof`);
        }
      });
    }, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [token, payment, params.id, router]);

  function copyAddress() {
    if (!payment) return;
    navigator.clipboard.writeText(payment.destinationWallet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  if (loading) return <p className="p-8 text-sm text-ur-text-muted">Loading...</p>;
  if (error && !payment) return <p className="p-8 text-sm text-ur-error">{error}</p>;
  if (!request || !payment) return null;

  const received = payment.status === "RECEIVED";

  return (
    <div className="px-6 py-8">
      <Link
        href={`/listings/${request.listingId}/request`}
        className="flex items-center gap-1 text-sm font-semibold text-ur-mint hover:underline"
      >
        <Icon name="arrow_back" size={16} />
        Back to Request
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black tracking-[-0.02em] text-ur-navy">Stellar Testnet Payment</h1>
          <p className="mt-1 text-sm text-ur-text-secondary">Complete your payment to confirm your viewing request.</p>
        </div>
        <span className="flex items-center gap-2 rounded-full border border-ur-primary/30 bg-ur-success-bg px-3 py-1 text-xs font-bold text-ur-primary">
          <span className="h-2 w-2 rounded-full bg-ur-primary" />
          Testnet Network
        </span>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Stepper currentStep={2} />

          <div className="ur-card p-5">
            <h2 className="font-bold text-ur-navy">Pay Viewing Fee</h2>
            <p className="mt-1 text-sm text-ur-text-secondary">Send the exact amount below to complete your payment.</p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-ur-text-secondary">Amount to Pay</p>
                <p className="mt-1 flex items-center gap-2 text-2xl font-black text-ur-navy">
                  {payment.amount.toLocaleString()} {payment.stellarAsset}
                </p>
                <p className="text-xs text-ur-text-muted">
                  (&asymp; {payment.currency} {payment.amount.toLocaleString()}.00)
                </p>
              </div>
              <div>
                <p className="text-xs text-ur-text-secondary">Send to This Address</p>
                <div className="mt-1 flex items-center gap-2 rounded-ur-sm border border-ur-border bg-ur-input px-3 py-2.5">
                  <span className="truncate text-xs text-ur-text">{payment.destinationWallet}</span>
                  <button type="button" onClick={copyAddress} aria-label="Copy address" className="shrink-0 text-ur-text-muted hover:text-ur-primary">
                    {copied ? <Icon name="check" size={14} className="text-ur-primary" /> : <Icon name="content_copy" size={14} />}
                  </button>
                </div>
                <p className="mt-1 text-xs text-ur-text-muted">Memo: {payment.stellarMemo}</p>
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-ur-text-secondary">Asset</p>
                <p className="mt-1 text-sm font-semibold text-ur-navy">XLM &middot; Stellar Lumens</p>
              </div>
              <div>
                <p className="text-xs text-ur-text-secondary">Network</p>
                <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-ur-navy">
                  <span className="h-2 w-2 rounded-full bg-ur-primary" />
                  Stellar Testnet &middot; Public Test Network
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-2 rounded-ur border border-ur-cyan/30 bg-ur-bg-soft p-3 text-xs text-ur-cyan">
              <Icon name="info" size={14} className="mt-0.5 shrink-0" />
              Only send XLM on Stellar Testnet. Sending any other asset may result in permanent loss.
            </div>
          </div>

          <div className="ur-card p-5">
            <h2 className="font-bold text-ur-navy">Payment Status</h2>
            <div className="mt-3 flex items-center justify-between rounded-ur border border-ur-border bg-ur-card-soft p-4">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full border-2 border-ur-primary text-ur-primary">
                  {received ? <Icon name="check" size={20} /> : <Icon name="schedule" size={20} />}
                </div>
                <div>
                  <p className="font-bold text-ur-primary">{received ? "Payment Received" : "Waiting for Payment..."}</p>
                  <p className="text-xs text-ur-text-secondary">
                    {received
                      ? "Your transaction has been confirmed."
                      : "Send the exact amount to the address above."}
                  </p>
                  {!received ? (
                    <p className="flex items-center gap-1.5 text-xs text-ur-text-secondary">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ur-cyan" />
                      We&apos;re watching Stellar Testnet for your payment - this page updates automatically.
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            {error ? <p className="mt-2 text-sm text-ur-error">{error}</p> : null}
          </div>

          <div className="ur-card p-5">
            <h2 className="font-bold text-ur-navy">Transaction Details</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-ur-text-secondary">Transaction Hash</dt>
                <dd className="text-ur-text">{payment.txHash ?? "— (Waiting for payment)"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ur-text-secondary">Status</dt>
                <dd className="font-semibold text-ur-warning">
                  {received ? "Received" : "Awaiting Payment"}
                </dd>
              </div>
            </dl>

            <h3 className="mt-4 text-sm font-bold text-ur-navy">How It Works</h3>
            <ol className="mt-2 space-y-2">
              {howItWorks.map((step, i) => (
                <li key={step} className="flex items-start gap-2 text-sm text-ur-text-secondary">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ur-primary/15 text-xs font-bold text-ur-primary">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>

            <p className="mt-4 flex items-start gap-2 rounded-ur border border-ur-border bg-ur-card-soft p-3 text-xs text-ur-text-secondary">
              <Icon name="info" size={14} className="mt-0.5 shrink-0" />
              This is a test payment on Stellar Testnet. No real funds are used.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="ur-card p-5">
            <h2 className="font-bold text-ur-navy">Payment Summary</h2>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between text-ur-text-secondary">
                <span>Viewing Fee</span>
                <span>
                  {payment.amount.toLocaleString()} {payment.stellarAsset}
                </span>
              </div>
              <div className="flex justify-between text-ur-text-secondary">
                <span>Network Fee (Est.)</span>
                <span>~0.0000020 {payment.stellarAsset}</span>
              </div>
            </div>
            <div className="mt-3 flex justify-between border-t border-ur-border pt-3">
              <span className="text-sm font-bold text-ur-navy">Total Amount</span>
              <span className="text-sm font-black text-ur-primary">
                {payment.amount.toLocaleString()} {payment.stellarAsset}
              </span>
            </div>
          </div>

          <div className="ur-card p-5">
            <div className="flex items-center gap-2">
              <Icon name="verified_user" size={16} className="text-ur-primary" />
              <h2 className="font-bold text-ur-navy">Secure &amp; Transparent</h2>
            </div>
            <div className="mt-3 space-y-2">
              {["100% on-chain payment", "Secure Stellar Testnet!", "Funds are held in escrow", "Instant transaction confirmation"].map(
                (item) => (
                  <p key={item} className="flex items-center gap-2 text-sm text-ur-text-secondary">
                    <Icon name="check" size={16} className="text-ur-primary" />
                    {item}
                  </p>
                ),
              )}
            </div>
          </div>

          <div className="ur-card p-5">
            <div className="flex items-center gap-2">
              <Icon name="support_agent" size={16} className="text-ur-primary" />
              <h2 className="font-bold text-ur-navy">Need Help?</h2>
            </div>
            <p className="mt-2 text-sm text-ur-text-secondary">
              If you have any issues with payment, our support team is here to help.
            </p>
            <Button variant="outline" className="mt-3 w-full">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
