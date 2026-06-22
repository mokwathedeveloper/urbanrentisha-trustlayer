"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ApiError, api, type Payment, type ViewingRequest } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Stepper } from "@/components/requests/stepper";
import { Icon } from "@/components/ui/icon";

const POLL_INTERVAL_MS = 5000;

const howItWorks = [
  "Click \"Pay Viewing Fee\" below",
  "We process your payment automatically",
  "You'll be redirected as soon as it's confirmed",
  "Your viewing request will be automatically confirmed",
];

export default function PaymentPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { token } = useAuth();

  const [request, setRequest] = useState<ViewingRequest | null>(null);
  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  // Safety net: if a payment somehow arrives some other way, still pick it up.
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

  async function handlePay() {
    if (!token || !payment) return;
    setError(null);
    setPaying(true);
    try {
      const updated = await api.payments.payNow(token, payment.id);
      setPayment(updated);
      if (updated.status === "RECEIVED") {
        router.push(`/requests/${params.id}/proof`);
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not process this payment.");
    } finally {
      setPaying(false);
    }
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
          <h1 className="text-2xl font-black tracking-[-0.02em] text-ur-navy">Pay Viewing Fee</h1>
          <p className="mt-1 text-sm text-ur-text-secondary">Complete your payment to confirm your viewing request.</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Stepper currentStep={2} />

          <div className="ur-card p-5">
            <h2 className="font-bold text-ur-navy">Viewing Fee</h2>
            <p className="mt-1 text-2xl font-black text-ur-navy">
              {payment.currency} {payment.amount.toLocaleString()}
            </p>
            <p className="mt-1 text-sm text-ur-text-secondary">
              Paying this fee schedules your viewing and lets us verify your proof once it&apos;s processed.
            </p>

            {!received ? (
              <Button className="mt-4 w-full" size="lg" disabled={paying} onClick={handlePay}>
                {paying ? "Processing..." : "Pay Viewing Fee"}
              </Button>
            ) : (
              <div className="mt-4 flex items-center gap-3 rounded-ur border border-ur-primary/30 bg-ur-success-bg p-4">
                <Icon name="check_circle" size={20} className="text-ur-primary" />
                <p className="font-bold text-ur-primary">Payment Received</p>
              </div>
            )}
            {error ? <p className="mt-2 text-sm text-ur-error">{error}</p> : null}
          </div>

          <div className="ur-card p-5">
            <h2 className="font-bold text-ur-navy">How It Works</h2>
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
                  {payment.currency} {payment.amount.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="mt-3 flex justify-between border-t border-ur-border pt-3">
              <span className="text-sm font-bold text-ur-navy">Total Amount</span>
              <span className="text-sm font-black text-ur-primary">
                {payment.currency} {payment.amount.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="ur-card p-5">
            <div className="flex items-center gap-2">
              <Icon name="verified_user" size={16} className="text-ur-primary" />
              <h2 className="font-bold text-ur-navy">Secure &amp; Transparent</h2>
            </div>
            <div className="mt-3 space-y-2">
              {["Real on-chain testnet transaction", "Processed automatically by the platform", "No wallet or technical knowledge required", "Instant confirmation"].map(
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
