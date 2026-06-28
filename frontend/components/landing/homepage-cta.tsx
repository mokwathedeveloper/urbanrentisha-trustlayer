"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { api, type ViewingRequest } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Icon } from "@/components/ui/icon";

// Statuses where the tenant still has something actionable to finish -
// mirrors ViewingRequestStatus in prisma/schema.prisma minus the terminal
// ones (ACCESS_UNLOCKED/EXPIRED/REVOKED/CANCELLED) and QUEUED, which has no
// single next step page since the tenant doesn't hold the turn yet.
const CONTINUABLE_STATUS_TO_HREF: Record<string, (id: string) => string> = {
  CREATED: (id) => `/requests/${id}/payment`,
  AWAITING_PAYMENT: (id) => `/requests/${id}/payment`,
  PAYMENT_RECEIVED: (id) => `/requests/${id}/proof`,
  PROOF_GENERATING: (id) => `/requests/${id}/proof`,
  PROOF_READY: (id) => `/requests/${id}/verify`,
  PROOF_VERIFIED: (id) => `/requests/${id}/code`,
};

function findContinuableRequest(requests: ViewingRequest[]): ViewingRequest | null {
  return requests.find((r) => r.status in CONTINUABLE_STATUS_TO_HREF) ?? null;
}

/**
 * Auth-aware primary CTA for the public homepage (navbar + hero). Guest
 * visitors see the existing "Get Started" -> /login link, unchanged.
 * Logged-in visitors (real session via useAuth, not a guess from
 * localStorage alone - useAuth's loading state already covers the
 * /auth/me round-trip and clears an invalid/expired token) see
 * "Continue Booking" when they have a real in-progress viewing request,
 * otherwise "Go to Dashboard".
 */
export function HomepageCta({ size = "lg" }: { size?: "sm" | "md" | "lg" }) {
  const { user, token, loading } = useAuth();
  const [continuable, setContinuable] = useState<ViewingRequest | null>(null);

  // useAuth's `loading` is computed from `typeof window !== "undefined"`,
  // which is false during SSR - so the server-rendered HTML always shows
  // the guest CTA, even for an already-logged-in visitor, and the client
  // only catches up after hydration. Without this guard that produces
  // exactly the flicker this component exists to avoid: guest CTA ->
  // (brief) -> real CTA. Staying on the loading skeleton until mounted
  // sidesteps the SSR/client `loading` divergence entirely.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  useEffect(() => {
    if (!token || user?.role !== "TENANT") return;
    let cancelled = false;
    api.viewingRequests
      .findMine(token, { limit: 20 })
      .then((res) => {
        if (!cancelled) setContinuable(findContinuableRequest(res.items));
      })
      .catch(() => {
        // Best-effort surface only - the dashboard remains the fallback CTA.
      });
    return () => {
      cancelled = true;
    };
  }, [token, user?.role]);

  if (!mounted || loading) {
    return <Skeleton className={size === "lg" ? "h-12 w-44" : size === "md" ? "h-10 w-36" : "h-9 w-28"} />;
  }

  if (!user) {
    return (
      <Link href="/login">
        <Button size={size}>
          Get Started
          <Icon name="arrow_forward" size={16} />
        </Button>
      </Link>
    );
  }

  if (continuable) {
    return (
      <Link href={CONTINUABLE_STATUS_TO_HREF[continuable.status](continuable.id)}>
        <Button size={size}>
          Continue Booking
          <Icon name="arrow_forward" size={16} />
        </Button>
      </Link>
    );
  }

  return (
    <Link href="/dashboard">
      <Button size={size}>
        Go to Dashboard
        <Icon name="arrow_forward" size={16} />
      </Button>
    </Link>
  );
}
