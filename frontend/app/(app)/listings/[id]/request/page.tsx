"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { TimePicker } from "@/components/ui/time-picker";
import { api, ApiError, type Listing } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { Icon } from "@/components/ui/icon";
import { PageLoader } from "@/components/ui/page-loader";
import { useFlowLock } from "@/lib/tab-lock";
import { FlowLockGuard, isFlowLockReadOnly } from "@/components/flow-lock/flow-lock-guard";

const whyChargeReasons = [
  "Ensures genuine and serious enquiries",
  "Protects agents' time and schedules",
  "Helps reduce no-shows",
  "100% refundable if cancelled within 2 hours",
];

export default function RequestViewingPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { token, user } = useAuth();

  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [fullName, setFullName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [message, setMessage] = useState("");
  const [contactPreference, setContactPreference] = useState<"WHATSAPP" | "PHONE" | "EMAIL">("WHATSAPP");

  const { status: lockStatus, takeOver, continueReadOnly } = useFlowLock(`booking-create:${params.id}`);
  const readOnly = isFlowLockReadOnly(lockStatus);

  useEffect(() => {
    api.listings
      .findOne(params.id)
      .then(setListing)
      .catch(() => setError("Could not load this property."))
      .finally(() => setLoading(false));
  }, [params.id]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!token || submitting || readOnly) return;
    setError(null);
    setSubmitting(true);
    try {
      const request = await api.viewingRequests.create(token, {
        listingId: params.id,
        preferredDate: preferredDate || undefined,
        preferredTime: preferredTime || undefined,
      });
      router.push(`/requests/${request.id}/payment`);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not submit this request.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <PageLoader />;
  if (error && !listing) return <p className="p-8 text-sm text-ur-error">{error}</p>;
  if (!listing) return null;

  const platformFee = 0;
  const total = listing.viewingFee + platformFee;

  return (
    <div className="px-6 py-8">
      <FlowLockGuard
        status={lockStatus}
        flowLabel="This booking"
        onTakeOver={takeOver}
        onContinueReadOnly={continueReadOnly}
      />
      <Link
        href={`/listings/${listing.id}`}
        className="flex items-center gap-1 text-sm font-semibold text-ur-mint hover:underline"
      >
        <Icon name="arrow_back" size={16} />
        Back to Property
      </Link>

      <h1 className="mt-4 text-2xl font-black tracking-[-0.02em] text-ur-navy">Request a Viewing</h1>
      <p className="mt-1 text-sm text-ur-text-secondary">Fill in your details to request a viewing for this property.</p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <div className="ur-card flex gap-4 overflow-hidden p-0">
            <div className="relative h-32 w-44 shrink-0 bg-ur-card-soft">
              {listing.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={listing.imageUrl} alt={listing.title} className="h-full w-full object-cover" />
              ) : null}
              {listing.verificationStatus === "VERIFIED" ? (
                <Badge variant="verified" className="absolute bottom-2 left-2">
                  Verified Property
                </Badge>
              ) : null}
            </div>
            <div className="py-4 pr-4">
              <h2 className="font-bold text-ur-navy">{listing.title}</h2>
              <p className="mt-1 text-sm text-ur-text-secondary">{listing.location}</p>
              <div className="mt-2 flex items-center gap-3 text-xs text-ur-text-secondary">
                {listing.bedrooms != null ? <span>{listing.bedrooms} Beds</span> : null}
                {listing.bathrooms != null ? <span>{listing.bathrooms} Baths</span> : null}
              </div>
              <p className="mt-2 text-sm font-bold text-ur-navy">
                {listing.currency} {listing.rentAmount.toLocaleString()}
                <span className="text-xs font-medium text-ur-text-muted"> / year</span>
              </p>
            </div>
          </div>

          <div className="ur-card p-5">
            <h2 className="font-bold text-ur-navy">Your Details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <Input
                label="Full Name"
                name="fullName"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <Input
                label="Email Address"
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="Phone Number"
                name="phone"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <h3 className="mt-5 text-sm font-bold text-ur-navy">Preferred Viewing Schedule</h3>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <Calendar label="Select Date" value={preferredDate} onChange={setPreferredDate} />
              <TimePicker label="Select Time" value={preferredTime} onChange={setPreferredTime} />
            </div>

            <label className="mt-4 block text-xs font-semibold tracking-[0.04em] text-white/78" htmlFor="message">
              Additional Message (Optional)
            </label>
            <textarea
              id="message"
              maxLength={200}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell the agent anything about your preferred visit..."
              className="mt-2 h-20 w-full rounded-ur-sm border border-white/12 bg-ur-input px-3 py-2 text-sm text-white outline-none focus:border-ur-primary"
            />
            <p className="text-right text-xs text-ur-text-muted">{message.length}/200</p>
          </div>

          <div className="ur-card p-5">
            <h2 className="font-bold text-ur-navy">Contact Preference</h2>
            <p className="mt-1 text-sm text-ur-text-secondary">How would you like the agent to contact you?</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {(
                [
                  ["WHATSAPP", "WhatsApp", "chat_bubble", "Recommended"],
                  ["PHONE", "Phone Call", "call", null],
                  ["EMAIL", "Email", "mail", null],
                ] as const
              ).map(([value, label, icon, tag]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setContactPreference(value)}
                  className={`flex items-center gap-2 rounded-ur-sm border px-4 py-3 text-left text-sm font-semibold ${
                    contactPreference === value
                      ? "border-ur-primary bg-ur-success-bg text-ur-primary"
                      : "border-ur-border text-ur-text-secondary"
                  }`}
                >
                  <Icon name={icon} size={16} />
                  <span>
                    {label}
                    {tag ? <span className="block text-xs font-normal text-ur-primary">{tag}</span> : null}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {error ? <p className="text-sm text-ur-error">{error}</p> : null}

          <div className="flex flex-col gap-3 rounded-ur border border-ur-primary/25 bg-ur-success-bg p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Icon name="verified_user" size={20} className="text-ur-primary" />
              <div>
                <p className="text-sm font-bold text-ur-primary">Your payment is secure and protected.</p>
                <p className="text-xs text-ur-text-secondary">We use secure payment gateways. Your money is safe with us.</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Button type="submit" size="lg" loading={submitting} disabled={readOnly}>
                {submitting ? "Submitting..." : "Proceed to Payment"}
                {!submitting ? <Icon name="arrow_forward" size={16} /> : null}
              </Button>
              <p className="flex items-center gap-1 text-xs text-ur-text-secondary">
                <Icon name="lock" size={12} />
                You will be redirected to a secure payment page
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="ur-card p-5">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-1 font-bold text-ur-navy">
                Viewing Fee
                <Icon name="info" size={14} className="text-ur-text-muted" />
              </h2>
              <Icon name="verified_user" size={20} className="text-ur-primary" />
            </div>

            <div className="mt-3 rounded-ur border border-ur-border bg-ur-card-soft p-4">
              <p className="text-xs text-ur-text-secondary">Required Viewing Fee</p>
              <p className="mt-1 text-2xl font-black text-ur-primary">
                {listing.currency} {listing.viewingFee.toLocaleString()}
              </p>
            </div>

            <div className="mt-3 flex items-start gap-2 rounded-ur border border-ur-warning/30 bg-ur-warning-bg p-3 text-xs text-ur-warning">
              <Icon name="lock" size={14} className="mt-0.5 shrink-0" />
              Pay the viewing fee to confirm your request. The fee ensures serious enquiries only.
            </div>

            <div className="mt-4 border-t border-ur-border pt-4">
              <p className="text-sm font-bold text-ur-navy">Fee Breakdown</p>
              <div className="mt-2 flex justify-between text-sm text-ur-text-secondary">
                <span>Agent Viewing Fee</span>
                <span>
                  {listing.currency} {listing.viewingFee.toLocaleString()}
                </span>
              </div>
              <div className="mt-1 flex justify-between text-sm text-ur-text-secondary">
                <span>Platform Service Fee</span>
                <span>
                  {listing.currency} {platformFee.toLocaleString()}
                </span>
              </div>
              <div className="mt-3 flex justify-between border-t border-ur-border pt-3 text-sm font-bold text-ur-navy">
                <span>Total</span>
                <span>
                  {listing.currency} {total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="ur-card p-5">
            <h2 className="font-bold text-ur-navy">Why We Charge a Viewing Fee</h2>
            <div className="mt-3 space-y-2">
              {whyChargeReasons.map((reason) => (
                <p key={reason} className="flex items-start gap-2 text-sm text-ur-text-secondary">
                  <Icon name="check_circle" size={16} className="mt-0.5 shrink-0 text-ur-primary" />
                  {reason}
                </p>
              ))}
            </div>
            <a href="#" className="mt-3 flex items-center gap-1 text-sm font-semibold text-ur-mint hover:underline">
              Learn More
              <Icon name="arrow_forward" size={14} />
            </a>
          </div>

          {listing.agent ? (
            <div className="ur-card p-5">
              <h2 className="font-bold text-ur-navy">Agent Information</h2>
              <div className="mt-3 flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-ur-card-soft text-ur-primary">
                  {listing.agent.user.name.charAt(0)}
                </div>
                <div>
                  <p className="flex items-center gap-1 text-sm font-bold text-ur-navy">
                    {listing.agent.user.name}
                    <Icon name="verified_user" size={14} className="text-ur-primary" />
                  </p>
                  <p className="text-xs text-ur-text-secondary">Verified Property Agent</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-ur-warning">
                    <Icon name="star" size={12} className="fill-ur-warning" />
                    {(listing.agent.trustScore / 20).toFixed(1)} trust score
                  </p>
                </div>
              </div>
              <p className="mt-3 flex items-center gap-2 text-xs text-ur-text-secondary">
                <Icon name="mail" size={14} />
                {listing.agent.user.email}
              </p>
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
}
