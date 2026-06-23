"use client";

import { useEffect, useRef } from "react";
import { io, type Socket } from "socket.io-client";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/api\/v1$/, "") ??
  "http://localhost:4000";

let socket: Socket | null = null;
let socketToken: string | null = null;

/**
 * One socket per browser tab, reused across every useRealtimeEvent call.
 * Reconnects automatically if the token changes (e.g. login/logout).
 */
function getSocket(token: string): Socket {
  if (socket && socketToken === token) return socket;

  socket?.disconnect();
  socket = io(SOCKET_URL, {
    auth: { token },
    transports: ["websocket"],
  });
  socketToken = token;
  return socket;
}

export function disconnectRealtime() {
  socket?.disconnect();
  socket = null;
  socketToken = null;
}

/**
 * Subscribes to a server-pushed event for as long as the component is
 * mounted and a token is available. Existing 30s/5s polling elsewhere stays
 * in place as a fallback - this hook only adds instant updates on top.
 */
export function useRealtimeEvent<T = unknown>(
  token: string | null,
  event: string,
  handler: (payload: T) => void,
) {
  const handlerRef = useRef(handler);
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!token) return;
    const s = getSocket(token);
    const listener = (payload: T) => handlerRef.current(payload);
    s.on(event, listener);
    return () => {
      s.off(event, listener);
    };
  }, [token, event]);
}

export function emitRealtimeEvent(token: string | null, event: string, payload: unknown) {
  if (!token) return;
  getSocket(token).emit(event, payload);
}

export function useListingRealtime(token: string | null, listingId: string | null) {
  useEffect(() => {
    if (!token || !listingId) return;
    const s = getSocket(token);
    s.emit("listing:subscribe", listingId);
    return () => {
      s.emit("listing:unsubscribe", listingId);
    };
  }, [token, listingId]);
}
