"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ApiError, api, type Listing, type MessageItem } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { Icon } from "@/components/ui/icon";
import { formatDate } from "@/components/dashboard/dashboard-ui";

const CHAT_POLL_INTERVAL_MS = 5000;

export default function PropertyDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { token, user } = useAuth();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewingRequestId, setViewingRequestId] = useState<string | null>(null);
  const [reviewing, setReviewing] = useState(false);
  const [reviewNote, setReviewNote] = useState("");
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<MessageItem[]>([]);
  const [chatDraft, setChatDraft] = useState("");
  const [chatSending, setChatSending] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  function load() {
    api.listings
      .findOne(params.id)
      .then(setListing)
      .catch(() => setError("Could not load this property."))
      .finally(() => setLoading(false));
  }

  useEffect(load, [params.id]);

  useEffect(() => {
    if (!token || user?.role !== "TENANT") return;
    api.viewingRequests.findMine(token).then((requests) => {
      const match = requests.find((request) => request.listingId === params.id);
      setViewingRequestId(match?.id ?? null);
    });
  }, [token, user, params.id]);

  useEffect(() => {
    if (!token || !viewingRequestId || !chatOpen) return;
    const currentToken = token;
    const requestId = viewingRequestId;
    function loadMessages() {
      api.messages.findForRequest(currentToken, requestId).then(setChatMessages);
    }
    loadMessages();
    const interval = setInterval(loadMessages, CHAT_POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [token, viewingRequestId, chatOpen]);

  async function handleSendChat() {
    if (!token || !viewingRequestId || !chatDraft.trim()) return;
    setChatSending(true);
    try {
      const message = await api.messages.send(token, viewingRequestId, chatDraft.trim());
      setChatMessages((prev) => [...prev, message]);
      setChatDraft("");
    } finally {
      setChatSending(false);
    }
  }

  if (loading) {
    return <p className="p-8 text-sm text-ur-text-muted">Loading...</p>;
  }

  if (error || !listing) {
    return <p className="p-8 text-sm text-ur-error">{error ?? "Property not found."}</p>;
  }

  const verified = listing.verificationStatus === "VERIFIED";
  const isAdmin = user?.role === "ADMIN" || user?.role === "PLATFORM";
  const isOwner =
    Boolean(user) &&
    (listing.ownerId === user?.id || listing.agent?.user.id === user?.id || listing.manager?.user.id === user?.id);

  async function handleReview(decision: "verify" | "reject") {
    if (!token) return;
    setReviewing(true);
    setReviewError(null);
    try {
      if (decision === "verify") {
        await api.listings.verify(token, listing!.id);
      } else {
        await api.listings.reject(token, listing!.id, reviewNote || undefined);
      }
      setReviewNote("");
      load();
    } catch (err) {
      setReviewError(err instanceof ApiError ? err.message : "Could not submit review.");
    } finally {
      setReviewing(false);
    }
  }

  async function copyLink(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setReviewError(null);
      setShareError("Could not copy the link. Copy it manually from your browser's address bar.");
      setTimeout(() => setShareError(null), 3000);
    }
  }

  async function handleShare(channel: "copy" | "whatsapp" | "x" | "native") {
    const url = window.location.href;
    const text = `Check out ${listing!.title} on UrbanRentisha`;
    if (channel === "copy") {
      await copyLink(url);
      return;
    }
    if (channel === "whatsapp") {
      window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`, "_blank");
      return;
    }
    if (channel === "x") {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        "_blank",
      );
      return;
    }
    if (navigator.share) {
      try {
        await navigator.share({ title: listing!.title, text, url });
      } catch {
        // user dismissed the native share sheet — not an error
      }
    } else {
      await copyLink(url);
    }
  }

  return (
    <div className="px-6 py-8">
      <Link href="/listings" className="flex items-center gap-1 text-sm font-semibold text-ur-mint hover:underline">
        <Icon name="arrow_back" size={16} />
        Back to Listings
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black tracking-[-0.02em] text-ur-navy">{listing.title}</h1>
          <p className="mt-1 flex items-center gap-1 text-sm text-ur-text-secondary">{listing.location}</p>
        </div>
        {verified ? <Badge variant="verified">Verified Property</Badge> : null}
      </div>

      {(() => {
        const galleryImages = listing.images.length > 0
          ? listing.images
          : listing.imageUrl
            ? [{ id: "legacy", url: listing.imageUrl, gpsPresent: false } as const]
            : [];
        const mainImage = galleryImages[selectedImageIndex] ?? galleryImages[0];

        return (
          <div className="mt-5 grid gap-2 sm:grid-cols-[2fr_1fr_1fr]">
            <div className="relative h-64 rounded-ur bg-ur-card-soft sm:row-span-2 sm:h-full">
              {mainImage ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={mainImage.url} alt={listing.title} className="h-full w-full rounded-ur object-cover" />
                  {mainImage.gpsPresent ? (
                    <Badge variant="success" className="absolute left-2 top-2 px-2 py-0.5 text-[10px]">
                      <Icon name="location_on" size={11} />
                      Location verified
                    </Badge>
                  ) : null}
                </>
              ) : (
                <div className="grid h-full place-items-center text-ur-text-muted">No image</div>
              )}
            </div>
            {galleryImages.slice(0, 4).map((img, i) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setSelectedImageIndex(i)}
                className="hidden h-32 overflow-hidden rounded-ur bg-ur-card-soft sm:block"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt={listing.title} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        );
      })()}

      <div className="mt-5 flex flex-wrap items-center gap-6 rounded-ur border border-ur-border bg-ur-card p-4">
        {listing.bedrooms != null ? (
          <span className="flex items-center gap-2 text-sm text-ur-text-secondary">
            <Icon name="bed" size={16} className="text-ur-primary" />
            {listing.bedrooms} Bedrooms
          </span>
        ) : null}
        {listing.bathrooms != null ? (
          <span className="flex items-center gap-2 text-sm text-ur-text-secondary">
            <Icon name="bathtub" size={16} className="text-ur-primary" />
            {listing.bathrooms} Bathrooms
          </span>
        ) : null}
        <span className="flex items-center gap-2 text-sm text-ur-text-secondary">
          <Icon name="apartment" size={16} className="text-ur-primary" />
          {listing.propertyType}
        </span>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <div className="ur-card p-5">
            <h2 className="font-bold text-ur-navy">About This Property</h2>
            <p className="mt-2 text-sm leading-6 text-ur-text-secondary">{listing.description}</p>
          </div>

          {verified ? (
            <div className="rounded-ur border border-ur-primary/25 bg-ur-success-bg p-5">
              <div className="flex items-center gap-2 text-ur-primary">
                <Icon name="verified_user" size={20} />
                <h2 className="font-bold">This Property is Verified</h2>
              </div>
              <p className="mt-2 text-sm text-ur-text-secondary">
                We have verified this listing&apos;s documents and agent identity. You can rent with confidence.
              </p>
              {listing.agent ? (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <p className="flex items-center gap-2 text-sm text-ur-text-secondary">
                    <Icon name="check_circle" size={16} className="text-ur-primary" />
                    Agent Identity <span className="text-ur-primary">Verified</span>
                  </p>
                  <p className="flex items-center gap-2 text-sm text-ur-text-secondary">
                    <Icon name="check_circle" size={16} className="text-ur-primary" />
                    Agency: <span className="text-ur-navy">{listing.agent.agencyName ?? "Independent"}</span>
                  </p>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="rounded-ur border border-ur-warning/30 bg-ur-warning-bg p-5">
              <div className="flex items-center gap-2 text-ur-warning">
                <Icon name="info" size={20} />
                <h2 className="font-bold">Pending Verification</h2>
              </div>
              <p className="mt-2 text-sm text-ur-text-secondary">
                {listing.verificationStatus === "REJECTED"
                  ? "This listing was reviewed and rejected by UrbanRentisha admins."
                  : "This listing has not yet been verified by UrbanRentisha. Proceed with caution and report anything suspicious."}
              </p>
            </div>
          )}

          {isAdmin ? (
            <div className="ur-card p-5">
              <h2 className="font-bold text-ur-navy">Admin Review</h2>
              <p className="mt-1 text-sm text-ur-text-secondary">
                Current status: <span className="font-semibold text-ur-navy">{listing.verificationStatus}</span>
              </p>
              {reviewError ? <p className="mt-2 text-sm text-ur-error">{reviewError}</p> : null}
              <textarea
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                placeholder="e.g. Ownership documents are blurry, please re-upload."
                className="mt-3 h-20 w-full rounded-ur-sm border border-ur-border bg-ur-input px-3 py-2 text-sm text-ur-text outline-none focus:border-ur-primary"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <Button disabled={reviewing || verified} onClick={() => handleReview("verify")}>
                  <Icon name="check_circle" size={16} />
                  Approve Listing
                </Button>
                <Button
                  variant="danger"
                  disabled={reviewing || listing.verificationStatus === "REJECTED"}
                  onClick={() => handleReview("reject")}
                >
                  <Icon name="close" size={16} />
                  Reject Listing
                </Button>
              </div>
            </div>
          ) : null}
        </div>

        <div className="space-y-5">
          <div className="ur-card p-5">
            <p className="text-xs font-semibold text-ur-text-secondary">Annual Rent</p>
            <p className="mt-1 text-2xl font-black text-ur-navy">
              {listing.currency} {listing.rentAmount.toLocaleString()}
              <span className="text-sm font-medium text-ur-text-muted"> / year</span>
            </p>

            <div className="my-4 border-t border-ur-border" />

            <div className="flex items-center justify-between text-sm">
              <span className="text-ur-text-secondary">Viewing Fee</span>
              <span className="font-bold text-ur-navy">
                {listing.currency} {listing.viewingFee.toLocaleString()}
              </span>
            </div>
            <p className="mt-1 text-xs text-ur-text-muted">Pay viewing fee to schedule a visit.</p>

            {isOwner ? (
              <div className="mt-4 rounded-ur-sm border border-ur-border bg-ur-card-soft p-3 text-center text-sm text-ur-text-secondary">
                This is your listing.
              </div>
            ) : isAdmin ? (
              <div className="mt-4 rounded-ur-sm border border-ur-border bg-ur-card-soft p-3 text-center text-sm text-ur-text-secondary">
                Use Admin Review to approve or reject this listing.
              </div>
            ) : (
              <Link href={`/listings/${listing.id}/request`}>
                <Button className="mt-4 w-full" size="lg">
                  <Icon name="event_available" size={16} />
                  Request Viewing
                </Button>
              </Link>
            )}
          </div>

          <div className="ur-card p-5">
            <div className="flex items-center gap-2 text-ur-navy">
              <Icon name="verified_user" size={16} className="text-ur-primary" />
              <h3 className="text-sm font-bold">Why Pay Viewing Fee?</h3>
            </div>
            <p className="mt-2 text-xs leading-5 text-ur-text-secondary">
              The viewing fee helps us keep listings genuine, agents accountable, and your experience serious.
            </p>
          </div>

          <div className="ur-card p-5">
            <p className="text-sm font-bold text-ur-navy">Share Property</p>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => handleShare("copy")}
                className="grid h-9 w-9 place-items-center rounded-full border border-ur-border text-ur-text-secondary"
                aria-label="Copy link"
              >
                <Icon name="link" size={16} />
              </button>
              <button
                type="button"
                onClick={() => handleShare("whatsapp")}
                className="grid h-9 w-9 place-items-center rounded-full border border-ur-border text-ur-mint"
                aria-label="Share on WhatsApp"
              >
                <Icon name="chat_bubble" size={16} />
              </button>
              <button
                type="button"
                onClick={() => handleShare("x")}
                className="grid h-9 w-9 place-items-center rounded-full border border-ur-border text-ur-text-secondary"
                aria-label="Share on X"
              >
                <Icon name="close" size={16} />
              </button>
              <button
                type="button"
                onClick={() => handleShare("native")}
                className="grid h-9 w-9 place-items-center rounded-full border border-ur-border text-ur-cyan"
                aria-label="Share"
              >
                <Icon name="share" size={16} />
              </button>
            </div>
            {copied ? <p className="mt-2 text-xs text-ur-primary">Copied to clipboard!</p> : null}
            {shareError ? <p className="mt-2 text-xs text-ur-error">{shareError}</p> : null}
          </div>

          {listing.agent ? (
            <div className="ur-card p-5">
              <p className="text-sm font-bold text-ur-navy">Listed By</p>
              <Link href={`/agents/${listing.agent.id}`} className="mt-3 flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-ur-card-soft text-ur-primary">
                  {listing.agent.user.name.charAt(0)}
                </div>
                <div>
                  <p className="flex items-center gap-1 text-sm font-bold text-ur-navy hover:underline">
                    {listing.agent.user.name}
                    <Icon name="verified_user" size={14} className="text-ur-primary" />
                  </p>
                  <p className="text-xs text-ur-text-secondary">{listing.agent.agencyName ?? "Property Agent"}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-ur-warning">
                    <Icon name="star" size={12} className="fill-ur-warning" />
                    {listing.agent.trustScore / 20} trust score
                  </p>
                </div>
              </Link>
              <p className="mt-3 flex items-center gap-2 text-xs text-ur-text-secondary">
                <Icon name="call" size={14} />
                Contact via platform
              </p>
              <p className="flex items-center gap-2 text-xs text-ur-text-secondary">
                <Icon name="mail" size={14} />
                {listing.agent.user.email}
              </p>

              {viewingRequestId ? (
                <>
                  <Button className="mt-4 w-full" onClick={() => setChatOpen((open) => !open)}>
                    <Icon name="chat_bubble" size={16} />
                    {chatOpen ? "Hide Chat" : "Message Agent"}
                  </Button>
                  {chatOpen ? (
                    <div className="mt-3 flex h-80 flex-col rounded-ur border border-ur-border bg-ur-card-soft">
                      <div className="flex-1 space-y-2 overflow-y-auto p-3">
                        {chatMessages.length === 0 ? (
                          <p className="py-6 text-center text-xs text-ur-text-muted">
                            No messages yet. Say hello!
                          </p>
                        ) : (
                          chatMessages.map((message) => {
                            const isOwn = message.senderId === user?.id;
                            return (
                              <div key={message.id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                                <div
                                  className={`max-w-[80%] rounded-ur-sm px-3 py-2 text-sm ${
                                    isOwn ? "bg-ur-primary text-white" : "bg-ur-card text-ur-navy"
                                  }`}
                                >
                                  <p>{message.body}</p>
                                  <p className={`mt-1 text-xs ${isOwn ? "text-white/70" : "text-ur-text-muted"}`}>
                                    {formatDate(message.createdAt)}
                                  </p>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                      <div className="flex items-center gap-2 border-t border-ur-border p-2">
                        <input
                          value={chatDraft}
                          onChange={(e) => setChatDraft(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleSendChat();
                            }
                          }}
                          placeholder="Write a message..."
                          className="flex-1 rounded-ur-sm border border-ur-border bg-ur-input px-3 py-2 text-sm text-ur-text outline-none focus:border-ur-primary"
                        />
                        <button
                          type="button"
                          onClick={handleSendChat}
                          disabled={chatSending || !chatDraft.trim()}
                          className="grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm bg-ur-primary text-white disabled:opacity-50"
                          aria-label="Send message"
                        >
                          <Icon name="send" size={16} />
                        </button>
                      </div>
                    </div>
                  ) : null}
                </>
              ) : null}
              <Button
                variant="danger"
                className="mt-2 w-full"
                onClick={() => router.push(`/reports/new?listingId=${params.id}`)}
              >
                <Icon name="flag" size={16} />
                Report Listing
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
