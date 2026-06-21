"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api, ApiError, type Listing } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { Icon } from "@/components/ui/icon";

type Category = "LISTING" | "AGENT";
type Severity = "high" | "medium" | "low";

const listingReasons: { value: string; label: string }[] = [
  { value: "FAKE_LISTING", label: "Listing looks fake or doesn't exist" },
  { value: "WRONG_PROPERTY", label: "Wrong property shown for this listing" },
  { value: "UNSAFE_PAYMENT", label: "Payment request feels unsafe" },
  { value: "OTHER", label: "Other" },
];

const agentReasons: { value: string; label: string }[] = [
  { value: "AGENT_MISMATCH", label: "Agent identity does not match profile" },
  { value: "SUSPICIOUS_BEHAVIOR", label: "Suspicious or unprofessional behavior" },
  { value: "OTHER", label: "Other" },
];

const severityOptions: { value: Severity; label: string; description: string }[] = [
  { value: "high", label: "High", description: "Urgent risk" },
  { value: "medium", label: "Medium", description: "Moderate risk" },
  { value: "low", label: "Low", description: "Low risk" },
];

function ReportFormContent() {
  const { token } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const listingId = searchParams.get("listingId");

  const [listing, setListing] = useState<Listing | null>(null);
  const [category, setCategory] = useState<Category>("LISTING");
  const [reportReason, setReportReason] = useState(listingReasons[0].value);
  const [contactDetail, setContactDetail] = useState("");
  const [additionalReason, setAdditionalReason] = useState("");
  const [severity, setSeverity] = useState<Severity>("medium");
  const [allowContact, setAllowContact] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!listingId) return;
    api.listings.findOne(listingId).then(setListing).catch(() => setListing(null));
  }, [listingId]);

  const reasons = category === "LISTING" ? listingReasons : agentReasons;

  function selectCategory(next: Category) {
    setCategory(next);
    setReportReason(next === "LISTING" ? listingReasons[0].value : agentReasons[0].value);
  }

  async function handleSubmit() {
    if (!token) return;
    setSubmitting(true);
    setError(null);
    try {
      const descriptionParts = [additionalReason.trim(), contactDetail.trim() ? `Contact/link: ${contactDetail.trim()}` : ""].filter(Boolean);
      await api.reports.create(token, {
        listingId: listingId ?? undefined,
        reportType: reportReason,
        description: descriptionParts.join(" — ") || "No additional details provided.",
        severity,
        allowContact,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not submit your report. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto mt-16 max-w-md text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-ur-primary/40 bg-ur-success-bg">
          <Icon name="check_circle" size={32} className="text-ur-primary" />
        </div>
        <h1 className="mt-4 text-xl font-black text-ur-navy">Report Submitted</h1>
        <p className="mt-2 text-sm text-ur-text-secondary">
          Thank you for helping keep UrbanRentisha safe. Our trust &amp; safety team will review this report within
          24-48 hours.
        </p>
        <button
          type="button"
          onClick={() => router.push("/listings")}
          className="mt-6 rounded-ur-sm bg-ur-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-ur-primary-hover"
        >
          Back to Listings
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black tracking-[-0.02em] text-ur-navy">Report a Fake Listing or Suspicious Agent</h1>
          <p className="mt-1 text-sm text-ur-text-secondary">
            Help keep our community safe by reporting suspicious listings or agents.
          </p>
        </div>
        <span className="flex items-center gap-2 rounded-full border border-ur-primary/30 bg-ur-success-bg px-3 py-1 text-xs font-bold text-ur-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-ur-primary" />
          Stellar Testnet
        </span>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="ur-card space-y-6 p-6">
          <section>
            <p className="flex items-center gap-2 text-sm font-bold text-ur-navy">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-ur-primary text-xs text-white">1</span>
              What are you reporting?
            </p>
            <p className="ml-7 text-xs text-ur-text-secondary">Select the type of issue you want to report.</p>
            <div className="ml-7 mt-3 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => selectCategory("LISTING")}
                className={`flex items-start gap-3 rounded-ur border p-4 text-left ${
                  category === "LISTING" ? "border-ur-primary bg-ur-success-bg" : "border-ur-border bg-ur-card-soft"
                }`}
              >
                <Icon name="flag" size={16} className={`mt-0.5 ${category === "LISTING" ? "text-ur-primary" : "text-ur-text-muted"}`} />
                <span>
                  <span className="block text-sm font-bold text-ur-navy">Fake or Suspicious Listing</span>
                  <span className="block text-xs text-ur-text-secondary">
                    The property listing appears fake, misleading or fraudulent.
                  </span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => selectCategory("AGENT")}
                className={`flex items-start gap-3 rounded-ur border p-4 text-left ${
                  category === "AGENT" ? "border-ur-primary bg-ur-success-bg" : "border-ur-border bg-ur-card-soft"
                }`}
              >
                <Icon name="person_off" size={16} className={`mt-0.5 ${category === "AGENT" ? "text-ur-primary" : "text-ur-text-muted"}`} />
                <span>
                  <span className="block text-sm font-bold text-ur-navy">Suspicious Agent / Landlord</span>
                  <span className="block text-xs text-ur-text-secondary">
                    The agent or landlord behaves in an unprofessional or fraudulent way.
                  </span>
                </span>
              </button>
            </div>
          </section>

          <section className="border-t border-ur-border pt-6">
            <p className="flex items-center gap-2 text-sm font-bold text-ur-navy">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-ur-primary text-xs text-white">2</span>
              Provide details
            </p>
            <p className="ml-7 text-xs text-ur-text-secondary">Tell us more about the issue.</p>

            <div className="ml-7 mt-3 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-ur-text-secondary">Property / Listing Title (if available)</label>
                <input
                  readOnly
                  value={listing ? listing.title : ""}
                  placeholder="e.g. Modern 2-Bed Apartment"
                  className="mt-1 w-full rounded-ur-sm border border-ur-border bg-ur-input px-3 py-2 text-sm text-ur-text"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-ur-text-secondary">Listing / Agent Link or Contact</label>
                <input
                  value={contactDetail}
                  onChange={(e) => setContactDetail(e.target.value)}
                  placeholder="https://... or phone/email"
                  className="mt-1 w-full rounded-ur-sm border border-ur-border bg-ur-input px-3 py-2 text-sm text-ur-text"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-ur-text-secondary">Report Reason</label>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="mt-1 w-full rounded-ur-sm border border-ur-border bg-ur-input px-3 py-2 text-sm text-ur-text"
                >
                  {reasons.map((reason) => (
                    <option key={reason.value} value={reason.value}>
                      {reason.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-ur-text-secondary">Additional Reason (optional)</label>
                <input
                  value={additionalReason}
                  onChange={(e) => setAdditionalReason(e.target.value)}
                  placeholder="Describe what happened"
                  className="mt-1 w-full rounded-ur-sm border border-ur-border bg-ur-input px-3 py-2 text-sm text-ur-text"
                />
              </div>
            </div>

            <div className="ml-7 mt-4">
              <p className="text-xs font-semibold text-ur-text-secondary">Severity Level</p>
              <p className="text-xs text-ur-text-muted">How serious is this issue?</p>
              <div className="mt-2 grid grid-cols-3 gap-3">
                {severityOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSeverity(option.value)}
                    className={`rounded-ur border p-3 text-center ${
                      severity === option.value
                        ? option.value === "high"
                          ? "border-ur-error bg-ur-error-bg"
                          : option.value === "medium"
                            ? "border-ur-warning bg-ur-warning-bg"
                            : "border-ur-primary bg-ur-success-bg"
                        : "border-ur-border bg-ur-card-soft"
                    }`}
                  >
                    <span
                      className={`block text-sm font-bold ${
                        option.value === "high"
                          ? "text-ur-error"
                          : option.value === "medium"
                            ? "text-ur-warning"
                            : "text-ur-primary"
                      }`}
                    >
                      {option.label}
                    </span>
                    <span className="text-xs text-ur-text-muted">{option.description}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="border-t border-ur-border pt-6">
            <p className="flex items-center gap-2 text-sm font-bold text-ur-navy">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-ur-primary text-xs text-white">3</span>
              Privacy preferences
            </p>
            <p className="ml-7 text-xs text-ur-text-secondary">Choose how we handle your identity.</p>
            <div className="ml-7 mt-3 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setAllowContact(false)}
                className={`flex items-start gap-3 rounded-ur border p-4 text-left ${
                  !allowContact ? "border-ur-primary bg-ur-success-bg" : "border-ur-border bg-ur-card-soft"
                }`}
              >
                <Icon name="lock" size={16} className={`mt-0.5 ${!allowContact ? "text-ur-primary" : "text-ur-text-muted"}`} />
                <span>
                  <span className="block text-sm font-bold text-ur-navy">Keep my identity private</span>
                  <span className="block text-xs text-ur-text-secondary">Your identity will be hidden from the reported party.</span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => setAllowContact(true)}
                className={`flex items-start gap-3 rounded-ur border p-4 text-left ${
                  allowContact ? "border-ur-primary bg-ur-success-bg" : "border-ur-border bg-ur-card-soft"
                }`}
              >
                <Icon name="notifications" size={16} className={`mt-0.5 ${allowContact ? "text-ur-primary" : "text-ur-text-muted"}`} />
                <span>
                  <span className="block text-sm font-bold text-ur-navy">I&apos;m comfortable being contacted</span>
                  <span className="block text-xs text-ur-text-secondary">You may be contacted for more information.</span>
                </span>
              </button>
            </div>
          </section>

          {error ? <p className="text-sm text-ur-error">{error}</p> : null}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-ur-sm bg-ur-primary px-4 py-3 text-sm font-bold text-white hover:bg-ur-primary-hover disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit Report"}
            <Icon name="chevron_right" size={16} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="ur-card border border-ur-warning/30 bg-ur-warning-bg p-4">
            <p className="flex items-center gap-2 text-sm font-bold text-ur-warning">
              <Icon name="gpp_maybe" size={16} />
              Your Safety Matters
            </p>
            <p className="mt-2 text-xs text-ur-text-secondary">
              We take all reports seriously. Your report helps protect other tenants from potential fraud.
            </p>
            <div className="mt-3 flex items-start gap-2 rounded-ur border border-ur-warning/25 bg-ur-bg p-3 text-xs text-ur-text-secondary">
              <Icon name="lock" size={14} className="mt-0.5 text-ur-warning" />
              Your information is secure and encrypted. We never share your identity without your consent.
            </div>
          </div>

          <div className="ur-card p-4">
            <p className="text-sm font-bold text-ur-navy">What Happens Next?</p>
            <ul className="mt-3 space-y-3 text-xs text-ur-text-secondary">
              <li className="flex gap-2">
                <Icon name="flag" size={14} className="mt-0.5 text-ur-cyan" />
                <span>
                  <span className="block font-semibold text-ur-navy">Report Submitted</span>
                  Your report is securely submitted to our trust &amp; safety team.
                </span>
              </li>
              <li className="flex gap-2">
                <Icon name="warning" size={14} className="mt-0.5 text-ur-warning" />
                <span>
                  <span className="block font-semibold text-ur-navy">Under Review</span>
                  We review all reports within 24-48 hours.
                </span>
              </li>
              <li className="flex gap-2">
                <Icon name="check_circle" size={14} className="mt-0.5 text-ur-primary" />
                <span>
                  <span className="block font-semibold text-ur-navy">Action Taken</span>
                  If verified, the listing/agent will be removed or restricted.
                </span>
              </li>
              <li className="flex gap-2">
                <Icon name="notifications" size={14} className="mt-0.5 text-ur-mint" />
                <span>
                  <span className="block font-semibold text-ur-navy">You&apos;ll Be Notified</span>
                  You will receive updates on the status of your report.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReportPage() {
  return (
    <Suspense fallback={null}>
      <ReportFormContent />
    </Suspense>
  );
}
