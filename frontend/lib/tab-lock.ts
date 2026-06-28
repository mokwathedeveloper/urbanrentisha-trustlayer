"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_PREFIX = "ur_flow_lock:";
const CHANNEL_PREFIX = "ur-flow-lock:";

// 3 missed heartbeats = stale. A backgrounded/throttled tab can have its
// timers delayed by the browser, so this needs real slack - not just
// "barely more than one heartbeat interval" - to avoid treating a merely
// slow tab as crashed and yanking the lock out from under it.
const HEARTBEAT_MS = 4000;
const LOCK_TIMEOUT_MS = 15000;
// How often a waiting tab re-checks for staleness on its own, since a
// crashed holder never writes again and so never fires a storage event -
// only time passing reveals that.
const WAITER_POLL_MS = 3000;

type LockRecord = {
  tabId: string;
  acquiredAt: number;
  lastHeartbeat: number;
};

type ChannelMessage =
  | { type: "heartbeat"; tabId: string; scopeKey: string }
  | { type: "release"; tabId: string; scopeKey: string }
  | { type: "takeover"; tabId: string; scopeKey: string };

export type FlowLockStatus =
  | "checking"
  | "active"
  | "warning"
  | "readonly"
  | "taken-over";

function storageKey(scopeKey: string) {
  return `${STORAGE_PREFIX}${scopeKey}`;
}

function readLock(scopeKey: string): LockRecord | null {
  try {
    const raw = window.localStorage.getItem(storageKey(scopeKey));
    if (!raw) return null;
    return JSON.parse(raw) as LockRecord;
  } catch {
    return null;
  }
}

function writeLock(scopeKey: string, record: LockRecord) {
  window.localStorage.setItem(storageKey(scopeKey), JSON.stringify(record));
}

function clearLock(scopeKey: string) {
  window.localStorage.removeItem(storageKey(scopeKey));
}

function isStale(record: LockRecord) {
  return Date.now() - record.lastHeartbeat > LOCK_TIMEOUT_MS;
}

/**
 * Guards a booking/payment/proof flow against being driven from two
 * browser tabs at once for the same user. Scoped to whatever `scopeKey`
 * the caller passes (e.g. `payment:${requestId}`) - different flows, or
 * the same flow for a different id, never collide.
 *
 * BroadcastChannel is the primary transport (instant heartbeat/release/
 * takeover signals); localStorage is both the durable lock record (so a
 * freshly-opened tab can see who already holds it) and the fallback
 * transport for browsers without BroadcastChannel, via the native
 * `storage` event that fires in *other* same-origin tabs on every write.
 *
 * This is a UX guard only - see payments.service.ts / viewing-requests
 * .service.ts for the actual backend idempotency/status-guard protection
 * that remains the real source of truth.
 */
function generateTabId(): string {
  return typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
}

export function useFlowLock(scopeKey: string | null) {
  const [tabId] = useState(generateTabId);
  const [status, setStatus] = useState<FlowLockStatus>("checking");
  const statusRef = useRef(status);
  useEffect(() => {
    statusRef.current = status;
  }, [status]);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const holdingRef = useRef(false);

  const release = useCallback(() => {
    if (!scopeKey || typeof window === "undefined") return;
    const current = readLock(scopeKey);
    if (current?.tabId === tabId) {
      clearLock(scopeKey);
      channelRef.current?.postMessage({ type: "release", tabId, scopeKey } satisfies ChannelMessage);
    }
    holdingRef.current = false;
  }, [scopeKey, tabId]);

  const claim = useCallback(() => {
    if (!scopeKey) return;
    const now = Date.now();
    writeLock(scopeKey, { tabId, acquiredAt: now, lastHeartbeat: now });
    holdingRef.current = true;
    setStatus("active");
  }, [scopeKey, tabId]);

  const takeOver = useCallback(() => {
    if (!scopeKey) return;
    claim();
    channelRef.current?.postMessage({ type: "takeover", tabId, scopeKey } satisfies ChannelMessage);
  }, [claim, scopeKey, tabId]);

  const continueReadOnly = useCallback(() => {
    setStatus("readonly");
  }, []);

  useEffect(() => {
    if (!scopeKey || typeof window === "undefined") {
      queueMicrotask(() => setStatus("checking"));
      return;
    }
    const key = scopeKey;
    holdingRef.current = false;

    // Deferred a tick so the lock decision runs as a callback rather than
    // synchronously in the effect body - same external-system-sync shape
    // as the heartbeat/poll intervals below, just running once up front.
    queueMicrotask(() => {
      const existing = readLock(key);
      if (!existing || existing.tabId === tabId || isStale(existing)) {
        claim();
      } else {
        setStatus("warning");
      }
    });

    let channel: BroadcastChannel | null = null;
    if (typeof BroadcastChannel !== "undefined") {
      channel = new BroadcastChannel(`${CHANNEL_PREFIX}${key}`);
      channelRef.current = channel;
    }

    function handleLostLock() {
      if (holdingRef.current) {
        holdingRef.current = false;
        setStatus("taken-over");
      }
    }

    function claimIfWaiting() {
      // Holder left voluntarily - whichever tab is actually waiting
      // (status === "warning") can claim it immediately instead of
      // sitting until the next waiter poll tick.
      if (statusRef.current === "warning") claim();
    }

    function onChannelMessage(event: MessageEvent<ChannelMessage>) {
      const msg = event.data;
      if (msg.tabId === tabId) return;
      if (msg.type === "takeover") {
        handleLostLock();
      } else if (msg.type === "release") {
        claimIfWaiting();
      }
    }
    channel?.addEventListener("message", onChannelMessage);

    function onStorage(event: StorageEvent) {
      if (event.key !== storageKey(key)) return;
      if (!event.newValue) {
        claimIfWaiting();
        return;
      }
      const updated = JSON.parse(event.newValue) as LockRecord;
      if (updated.tabId !== tabId) handleLostLock();
    }
    window.addEventListener("storage", onStorage);

    const heartbeat = window.setInterval(() => {
      if (!holdingRef.current) return;
      const now = Date.now();
      writeLock(key, { tabId, acquiredAt: now, lastHeartbeat: now });
      channel?.postMessage({ type: "heartbeat", tabId, scopeKey: key } satisfies ChannelMessage);
    }, HEARTBEAT_MS);

    const waiterPoll = window.setInterval(() => {
      if (holdingRef.current) return;
      const current = readLock(key);
      if (!current || isStale(current)) claim();
    }, WAITER_POLL_MS);

    function handleBeforeUnload() {
      release();
    }
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.clearInterval(heartbeat);
      window.clearInterval(waiterPoll);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      channel?.removeEventListener("message", onChannelMessage);
      release();
      channel?.close();
      channelRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- claim/release are stable refs scoped to this same scopeKey/tabId pair
  }, [scopeKey, tabId]);

  return { status, takeOver, continueReadOnly, release };
}
