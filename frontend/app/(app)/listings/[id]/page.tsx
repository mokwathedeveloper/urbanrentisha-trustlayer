"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ApiError, api, type EscrowPhase, type Listing, type MessageItem, type ReviewSummary } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { Icon } from "@/components/ui/icon";
import { formatDate } from "@/components/dashboard/dashboard-ui";
import { isOnline, formatLastSeen } from "@/lib/presence";
import { useListingRealtime, useRealtimeEvent } from "@/lib/realtime";

const CHAT_POLL_INTERVAL_MS = 5000;

interface Poster {
  userId: string;
  name: string;
  email: string;
  lastActiveAt: string | null;
  profileHref: string | null;
  subtitle: string;
  trustScore: number | null;
}

function resolvePoster(listing: Listing): Poster {
  if (listing.agent) {
    return {
      userId: listing.agent.user.id,
      name: listing.agent.user.name,
      email: listing.agent.user.email,
      lastActiveAt: listing.agent.user.lastActiveAt,
      profileHref: `/agents/${listing.agent.id}`,
      subtitle: listing.agent.agencyName ?? "Property Agent",
      trustScore: listing.agent.trustScore,
    };
  }
  if (listing.manager) {
    return {
      userId: listing.manager.user.id,
      name: listing.manager.user.name,
      email: listing.manager.user.email,
      lastActiveAt: listing.manager.user.lastActiveAt,
      profileHref: null,
      subtitle: listing.manager.agencyName ?? "Property Manager",
      trustScore: listing.manager.trustScore,
    };
  }
  return {
    userId: listing.owner.id,
    name: listing.owner.name,
    email: listing.owner.email,
    lastActiveAt: listing.owner.lastActiveAt,
    profileHref: null,
    subtitle: "Landlord",
    trustScore: null,
  };
}

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
  const [chatLoading, setChatLoading] = useState(false);
  const [listingThreadId, setListingThreadId] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [reviewSummary, setReviewSummary] = useState<ReviewSummary | null>(null);
  const [myRating, setMyRating] = useState(0);
  const [myComment, setMyComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSubmitError, setReviewSubmitError] = useState<string | null>(null);
  const [availabilityActionError, setAvailabilityActionError] = useState<string | null>(null);
  const [availabilityActing, setAvailabilityActing] = useState(false);
  const [escrowPhase, setEscrowPhase] = useState<EscrowPhase | null>(null);

  function load() {
    api.listings
      .findOne(params.id)
      .then(setListing)
      .catch(() => setError("Could not load this property."))
      .finally(() => setLoading(false));
  }

  useEffect(load, [params.id]);

  useListingRealtime(token, params.id);
  useRealtimeEvent(token, "listing:reserved", (payload: { listingId: string }) => {
    if (payload.listingId === params.id) load();
  });
  useRealtimeEvent(token, "listing:released", (payload: { listingId: string }) => {
    if (payload.listingId === params.id) load();
  });
  useRealtimeEvent(token, "listing:rented", (payload: { listingId: string }) => {
    if (payload.listingId === params.id) load();
  });
  // Escrow funded/released/refunded notifications also push in real time -
  // refetch the escrow phase so it updates without a manual refresh. Only
  // for users who can actually see it - everyone else would get a 403 on
  // every unrelated payment notification.
  useRealtimeEvent(token, "notification:new", (notification: { type: string }) => {
    const canSeeEscrow =
      listing &&
      (listing.ownerId === user?.id ||
        listing.agent?.user.id === user?.id ||
        listing.manager?.user.id === user?.id);
    if (notification.type === "PAYMENT" && token && canSeeEscrow) {
      api.listings.escrowPhase(token, params.id).then(setEscrowPhase);
    }
  });

  useEffect(() => {
    if (!listing) return;
    const poster = resolvePoster(listing);
    api.reviews.findForUser(poster.userId).then(setReviewSummary);
  }, [listing]);

  // Escrow detail is owner/agent/manager-only - fetched separately from a
  // dedicated authenticated endpoint rather than baked into the public
  // listing payload, so payment amounts and tenant identity never leak to
  // anonymous listing views.
  useEffect(() => {
    if (!token || !listing) return;
    const canSeeEscrow =
      listing.ownerId === user?.id ||
      listing.agent?.user.id === user?.id ||
      listing.manager?.user.id === user?.id;
    if (!canSeeEscrow) return;
    api.listings.escrowPhase(token, listing.id).then(setEscrowPhase);
  }, [token, listing, user?.id]);

  useEffect(() => {
    if (!token || user?.role !== "TENANT") return;
    api.viewingRequests.findMine(token).then((requests) => {
      const match = requests.find((request) => request.listingId === params.id);
      setViewingRequestId(match?.id ?? null);
    });
  }, [token, user, params.id]);

  const activeThreadId = viewingRequestId ?? listingThreadId;

  useEffect(() => {
    if (!token || !activeThreadId || !chatOpen) return;
    const currentToken = token;
    const threadId = activeThreadId;
    function loadMessages() {
      const fetcher = viewingRequestId
        ? api.messages.findForRequest(currentToken, threadId)
        : api.listingThreads.findMessages(currentToken, threadId);
      fetcher.then(setChatMessages);
    }
    loadMessages();
    const interval = setInterval(loadMessages, CHAT_POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [token, activeThreadId, viewingRequestId, chatOpen]);

  async function handleOpenChat() {
    if (chatOpen) {
      setChatOpen(false);
      return;
    }
    if (!token) return;
    if (!viewingRequestId && !listingThreadId) {
      setChatLoading(true);
      try {
        const thread = await api.listingThreads.getOrCreate(token, params.id);
        setListingThreadId(thread.id);
      } finally {
        setChatLoading(false);
      }
    }
    setChatOpen(true);
  }

  async function handleSendChat() {
    if (!token || !activeThreadId || !chatDraft.trim()) return;
    setChatSending(true);
    try {
      const message = viewingRequestId
        ? await api.messages.send(token, activeThreadId, chatDraft.trim())
        : await api.listingThreads.send(token, activeThreadId, chatDraft.trim());
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

  const poster = resolvePoster(listing);
  const canMessage = Boolean(user) && user?.role === "TENANT" && !isOwner;
  const canReview = canMessage;

  async function handleMarkRented() {
    if (!token) return;
    setAvailabilityActing(true);
    setAvailabilityActionError(null);
    try {
      await api.listings.markRented(token, listing!.id);
      load();
    } catch (err) {
      setAvailabilityActionError(err instanceof ApiError ? err.message : "Could not mark this listing as rented.");
    } finally {
      setAvailabilityActing(false);
    }
  }

  async function handleReleaseReservation() {
    if (!token) return;
    setAvailabilityActing(true);
    setAvailabilityActionError(null);
    try {
      await api.listings.releaseReservation(token, listing!.id);
      load();
    } catch (err) {
      setAvailabilityActionError(err instanceof ApiError ? err.message : "Could not release this reservation.");
    } finally {
      setAvailabilityActing(false);
    }
  }

  async function handleSubmitReview() {
    if (!token || myRating === 0) return;
    setSubmittingReview(true);
    setReviewSubmitError(null);
    try {
      await api.reviews.create(token, poster.userId, {
        rating: myRating,
        comment: myComment.trim() || undefined,
        listingId: listing!.id,
      });
      const summary = await api.reviews.findForUser(poster.userId);
      setReviewSummary(summary);
      setMyComment("");
      setMyRating(0);
    } catch (err) {
      setReviewSubmitError(err instanceof ApiError ? err.message : "Could not submit your review.");
    } finally {
      setSubmittingReview(false);
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
              <div className="mt-4 space-y-2">
                <div className="rounded-ur-sm border border-ur-border bg-ur-card-soft p-3 text-center text-sm text-ur-text-secondary">
                  This is your listing -{" "}
                  <span className="font-semibold text-ur-navy">{listing.availabilityStatus}</span>
                </div>
                {escrowPhase ? (
                  <div className="rounded-ur-sm border border-ur-cyan/30 bg-ur-cyan/5 p-3 text-sm">
                    <p className="flex items-center gap-1.5 font-semibold text-ur-cyan">
                      <Icon name="lock" size={14} />
                      {escrowPhase.label}
                    </p>
                    <p className="mt-1 text-xs text-ur-text-secondary">
                      {escrowPhase.tenantName} - {escrowPhase.amount} {escrowPhase.currency}
                    </p>
                    <Link href="/escrow" className="mt-1 inline-block text-xs font-semibold text-ur-primary hover:underline">
                      View in Escrow Management &rarr;
                    </Link>
                  </div>
                ) : null}
                {availabilityActionError ? (
                  <p className="text-xs text-ur-error">{availabilityActionError}</p>
                ) : null}
                {listing.availabilityStatus === "RESERVED" ? (
                  <div className="flex gap-2">
                    <Button
                      className="flex-1"
                      disabled={availabilityActing}
                      onClick={handleMarkRented}
                    >
                      Mark as Rented
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      disabled={availabilityActing}
                      onClick={handleReleaseReservation}
                    >
                      Release Reservation
                    </Button>
                  </div>
                ) : null}
              </div>
            ) : isAdmin ? (
              <div className="mt-4 rounded-ur-sm border border-ur-border bg-ur-card-soft p-3 text-center text-sm text-ur-text-secondary">
                Use Admin Review to approve or reject this listing.
              </div>
            ) : listing.availabilityStatus === "RESERVED" ? (
              <div className="mt-4 rounded-ur-sm border border-ur-warning/30 bg-ur-warning-bg p-3 text-center text-sm text-ur-warning">
                Reserved by another tenant right now. Check back soon.
              </div>
            ) : listing.availabilityStatus === "RENTED" ? (
              <div className="mt-4 rounded-ur-sm border border-ur-border bg-ur-card-soft p-3 text-center text-sm text-ur-text-secondary">
                This property has already been rented.
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

          <div className="ur-card p-5">
            <p className="text-sm font-bold text-ur-navy">Listed By</p>
            {poster.profileHref ? (
              <Link href={poster.profileHref} className="mt-3 flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-ur-card-soft text-ur-primary">
                  {poster.name.charAt(0)}
                </div>
                <div>
                  <p className="flex items-center gap-1 text-sm font-bold text-ur-navy hover:underline">
                    {poster.name}
                    <Icon name="verified_user" size={14} className="text-ur-primary" />
                  </p>
                  <p className="text-xs text-ur-text-secondary">{poster.subtitle}</p>
                  {poster.trustScore != null ? (
                    <p className="mt-1 flex items-center gap-1 text-xs text-ur-warning">
                      <Icon name="star" size={12} className="fill-ur-warning" />
                      {poster.trustScore / 20} trust score
                    </p>
                  ) : null}
                </div>
              </Link>
            ) : (
              <div className="mt-3 flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-ur-card-soft text-ur-primary">
                  {poster.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-ur-navy">{poster.name}</p>
                  <p className="text-xs text-ur-text-secondary">{poster.subtitle}</p>
                </div>
              </div>
            )}

            <p className="mt-2 flex items-center gap-1.5 text-xs">
              <span className={`h-1.5 w-1.5 rounded-full ${isOnline(poster.lastActiveAt) ? "bg-ur-primary" : "bg-ur-text-muted"}`} />
              <span className={isOnline(poster.lastActiveAt) ? "text-ur-primary" : "text-ur-text-muted"}>
                {formatLastSeen(poster.lastActiveAt)}
              </span>
            </p>

            {reviewSummary ? (
              <p className="mt-2 flex items-center gap-1 text-xs text-ur-text-secondary">
                <Icon name="star" size={12} className="fill-ur-warning text-ur-warning" />
                {reviewSummary.count > 0
                  ? `${reviewSummary.average} (${reviewSummary.count} review${reviewSummary.count === 1 ? "" : "s"})`
                  : "No reviews yet"}
              </p>
            ) : null}

            <p className="mt-3 flex items-center gap-2 text-xs text-ur-text-secondary">
              <Icon name="call" size={14} />
              Contact via platform
            </p>
            <p className="flex items-center gap-2 text-xs text-ur-text-secondary">
              <Icon name="mail" size={14} />
              {poster.email}
            </p>

            {canMessage ? (
              <>
                <Button className="mt-4 w-full" disabled={chatLoading} onClick={handleOpenChat}>
                  <Icon name="chat_bubble" size={16} />
                  {chatLoading ? "Loading..." : chatOpen ? "Hide Chat" : "Message"}
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

          {reviewSummary ? (
            <div className="ur-card p-5">
              <p className="text-sm font-bold text-ur-navy">
                Reviews of {poster.name} <span className="text-ur-text-muted">({reviewSummary.count})</span>
              </p>
              <div className="mt-3 max-h-56 space-y-3 overflow-y-auto">
                {reviewSummary.reviews.length === 0 ? (
                  <p className="text-sm text-ur-text-muted">No reviews yet.</p>
                ) : (
                  reviewSummary.reviews.map((review) => (
                    <div key={review.id} className="border-b border-ur-border pb-2 last:border-0">
                      <p className="flex items-center gap-1 text-xs font-semibold text-ur-navy">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Icon
                            key={i}
                            name="star"
                            size={12}
                            className={i < review.rating ? "fill-ur-warning text-ur-warning" : "text-ur-text-muted"}
                          />
                        ))}
                      </p>
                      {review.comment ? (
                        <p className="mt-1 text-sm text-ur-text-secondary">{review.comment}</p>
                      ) : null}
                      <p className="mt-1 text-xs text-ur-text-muted">{review.reviewer.name}</p>
                    </div>
                  ))
                )}
              </div>

              {canReview ? (
                <div className="mt-4 border-t border-ur-border pt-3">
                  <p className="text-xs font-semibold text-ur-text-secondary">Leave a Review</p>
                  <div className="mt-2 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button key={i} type="button" onClick={() => setMyRating(i + 1)} aria-label={`Rate ${i + 1} stars`}>
                        <Icon
                          name="star"
                          size={18}
                          className={i < myRating ? "fill-ur-warning text-ur-warning" : "text-ur-text-muted"}
                        />
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={myComment}
                    onChange={(e) => setMyComment(e.target.value)}
                    placeholder="Share your experience (optional)"
                    className="mt-2 h-16 w-full rounded-ur-sm border border-ur-border bg-ur-input px-3 py-2 text-sm text-ur-text outline-none focus:border-ur-primary"
                  />
                  {reviewSubmitError ? <p className="mt-1 text-xs text-ur-error">{reviewSubmitError}</p> : null}
                  <Button
                    className="mt-2 w-full"
                    disabled={submittingReview || myRating === 0}
                    onClick={handleSubmitReview}
                  >
                    {submittingReview ? "Submitting..." : "Submit Review"}
                  </Button>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
