"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { api, type MessageItem, type MessageThread } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { formatDate } from "@/components/dashboard/dashboard-ui";
import { Icon } from "@/components/ui/icon";
import { isOnline, formatLastSeen } from "@/lib/presence";
import { broadcastMessagesChanged } from "@/lib/messages";
import { emitRealtimeEvent, useRealtimeEvent } from "@/lib/realtime";

const POLL_INTERVAL_MS = 5000;
const TYPING_STOP_DELAY_MS = 2500;

function referenceId(id: string): string {
  return id.slice(-8).toUpperCase();
}

export default function MessagesPage() {
  const { token, user } = useAuth();
  const searchParams = useSearchParams();
  const threadParam = searchParams.get("thread");
  const [threads, setThreads] = useState<MessageThread[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeMessages, setActiveMessages] = useState<MessageItem[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [otherPartyTyping, setOtherPartyTyping] = useState(false);
  const consumedThreadParam = useRef<string | null>(null);
  const typingStopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wasTypingRef = useRef(false);

  useEffect(() => {
    if (!token) return;
    const currentToken = token;
    function loadInbox() {
      api.messages
        .findInbox(currentToken)
        .then((data) => {
          setThreads(data);
          setActiveId((current) => {
            const wantsThreadParam =
              threadParam && threadParam !== consumedThreadParam.current && data.some((thread) => thread.id === threadParam);
            if (wantsThreadParam) {
              consumedThreadParam.current = threadParam;
              return threadParam;
            }
            if (current && data.some((thread) => thread.id === current)) {
              return current;
            }
            return data.length > 0 ? data[0].id : null;
          });
        })
        .finally(() => setLoading(false));
    }
    loadInbox();
    const interval = setInterval(loadInbox, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [token, threadParam]);

  const activeThread = threads.find((thread) => thread.id === activeId);
  const activeKind = activeThread?.kind;

  useEffect(() => {
    if (!token || !activeId || !activeKind) return;
    const currentToken = token;
    const currentId = activeId;
    function loadMessages() {
      const fetcher =
        activeKind === "listing_thread"
          ? api.listingThreads.findMessages(currentToken, currentId)
          : activeKind === "support"
            ? api.support.findMessages(currentToken, currentId)
            : api.messages.findForRequest(currentToken, currentId);
      fetcher.then(setActiveMessages);
    }
    loadMessages();
    const interval = setInterval(loadMessages, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [token, activeId, activeKind]);

  // Opening a conversation marks the other party's messages as read - both
  // here (unread badge clears) and on their end (read receipt appears).
  useEffect(() => {
    if (!token || !activeId || !activeKind) return;
    const markRead =
      activeKind === "listing_thread"
        ? api.listingThreads.markRead(token, activeId)
        : activeKind === "support"
          ? api.support.markRead(token, activeId)
          : api.messages.markRead(token, activeId);
    markRead.then(() => {
      setThreads((prev) => prev.map((t) => (t.id === activeId ? { ...t, unreadCount: 0 } : t)));
      broadcastMessagesChanged();
    });
  }, [token, activeId, activeKind]);

  useRealtimeEvent(token, "message:new", () => {
    if (!token) return;
    api.messages.findInbox(token).then(setThreads);
  });

  useRealtimeEvent(token, "message:read", (payload: { threadId: string; readAt: string }) => {
    if (payload.threadId !== activeId) return;
    setActiveMessages((prev) =>
      prev.map((m) => (m.senderId === user?.id && !m.readAt ? { ...m, readAt: payload.readAt } : m)),
    );
  });

  useRealtimeEvent(
    token,
    "typing",
    (payload: { threadId: string; userId: string; isTyping: boolean }) => {
      if (payload.threadId !== activeId || payload.userId !== activeThread?.otherPartyId) return;
      setOtherPartyTyping(payload.isTyping);
    },
  );

  // Reset the typing indicator when switching conversations, so it doesn't
  // carry over from whichever thread was open before. Adjusting state during
  // render (rather than in an effect) per React's guidance for resetting
  // state on a prop/key change.
  const [typingResetForId, setTypingResetForId] = useState(activeId);
  if (typingResetForId !== activeId) {
    setTypingResetForId(activeId);
    setOtherPartyTyping(false);
  }

  function sendTyping(isTyping: boolean) {
    if (!activeId || !activeThread) return;
    emitRealtimeEvent(token, "typing", {
      threadId: activeId,
      recipientId: activeThread.otherPartyId,
      isTyping,
    });
  }

  function handleDraftChange(value: string) {
    setDraft(value);
    if (!wasTypingRef.current) {
      wasTypingRef.current = true;
      sendTyping(true);
    }
    if (typingStopTimer.current) clearTimeout(typingStopTimer.current);
    typingStopTimer.current = setTimeout(() => {
      wasTypingRef.current = false;
      sendTyping(false);
    }, TYPING_STOP_DELAY_MS);
  }

  async function handleSend() {
    if (!token || !activeId || !activeKind || !draft.trim()) return;
    if (typingStopTimer.current) clearTimeout(typingStopTimer.current);
    wasTypingRef.current = false;
    sendTyping(false);
    setSending(true);
    try {
      const message =
        activeKind === "listing_thread"
          ? await api.listingThreads.send(token, activeId, draft.trim())
          : activeKind === "support"
            ? await api.support.send(token, activeId, draft.trim())
            : await api.messages.send(token, activeId, draft.trim());
      setActiveMessages((prev) => [...prev, message]);
      setThreads((prev) =>
        prev.map((thread) =>
          thread.id === activeId
            ? { ...thread, lastMessage: message.body, lastMessageAt: message.createdAt }
            : thread,
        ),
      );
      setDraft("");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="px-6 py-8">
      <div>
        <h1 className="text-2xl font-black tracking-[-0.02em] text-ur-navy">Messages</h1>
        <p className="mt-1 text-sm text-ur-text-secondary">Conversations tied to your viewing requests.</p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[320px_1fr]">
        <div className="ur-card overflow-hidden">
          {loading ? <p className="p-5 text-sm text-ur-text-muted">Loading...</p> : null}
          {!loading && threads.length === 0 ? (
            <div className="flex flex-col items-center gap-3 p-10 text-center">
              <Icon name="mail" size={32} className="text-ur-text-muted" />
              <p className="text-sm text-ur-text-muted">No conversations yet.</p>
              <p className="text-xs text-ur-text-muted">
                Messages appear once you start a conversation about a viewing request.
              </p>
            </div>
          ) : null}
          <div className="divide-y divide-ur-border">
            {threads.map((thread) => (
              <button
                key={thread.id}
                onClick={() => setActiveId(thread.id)}
                className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors ${
                  thread.id === activeId ? "bg-ur-card-soft" : "hover:bg-ur-card-soft/60"
                }`}
              >
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-ur-sm bg-ur-card-soft">
                  {thread.kind === "support" ? (
                    <div className="grid h-full w-full place-items-center text-ur-primary">
                      <Icon name="support_agent" size={18} />
                    </div>
                  ) : thread.listingImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={thread.listingImageUrl} alt={thread.listingTitle} className="h-full w-full object-cover" />
                  ) : (
                    <div className="grid h-full w-full place-items-center text-ur-text-muted">
                      <Icon name="apartment" size={16} />
                    </div>
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-bold text-ur-navy">{thread.listingTitle}</p>
                    {thread.unreadCount > 0 ? (
                      <span className="grid h-5 min-w-5 shrink-0 place-items-center rounded-full bg-ur-mint px-1 text-[10px] font-bold text-ur-bg">
                        {thread.unreadCount > 99 ? "99+" : thread.unreadCount}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs text-ur-text-secondary">
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                        isOnline(thread.otherPartyLastActiveAt) ? "bg-ur-primary" : "bg-ur-text-muted"
                      }`}
                    />
                    {thread.otherParty}
                  </p>
                  <p
                    className={`mt-1 truncate text-xs ${
                      thread.unreadCount > 0 ? "font-semibold text-ur-navy" : "text-ur-text-muted"
                    }`}
                  >
                    {thread.lastMessage}
                  </p>
                  <p className="mt-1 text-xs text-ur-text-muted">{formatDate(thread.lastMessageAt)}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="ur-card flex min-h-[480px] flex-col">
          {!activeThread ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
              <Icon name="chat" size={32} className="text-ur-text-muted" />
              <p className="text-sm text-ur-text-muted">Select a conversation to view messages.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 border-b border-ur-border px-5 py-4">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-ur-sm bg-ur-card-soft">
                  {activeThread.kind === "support" ? (
                    <div className="grid h-full w-full place-items-center text-ur-primary">
                      <Icon name="support_agent" size={20} />
                    </div>
                  ) : activeThread.listingImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={activeThread.listingImageUrl}
                      alt={activeThread.listingTitle}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center text-ur-text-muted">
                      <Icon name="apartment" size={18} />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  {activeThread.listingId ? (
                    <Link href={`/listings/${activeThread.listingId}`} className="text-sm font-bold text-ur-navy hover:underline">
                      {activeThread.listingTitle}
                    </Link>
                  ) : (
                    <p className="text-sm font-bold text-ur-navy">{activeThread.listingTitle}</p>
                  )}
                  {activeThread.kind === "support" && !activeThread.otherPartyId ? (
                    <p className="text-xs font-semibold text-ur-warning">Waiting for an agent to join...</p>
                  ) : (
                    <p className="flex items-center gap-1.5 text-xs">
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                          isOnline(activeThread.otherPartyLastActiveAt) ? "bg-ur-primary" : "bg-ur-text-muted"
                        }`}
                      />
                      <span className="text-ur-text-secondary">{activeThread.otherParty}</span>
                      {otherPartyTyping ? (
                        <span className="font-semibold text-ur-mint">· typing...</span>
                      ) : (
                        <span className={isOnline(activeThread.otherPartyLastActiveAt) ? "text-ur-primary" : "text-ur-text-muted"}>
                          · {formatLastSeen(activeThread.otherPartyLastActiveAt)}
                        </span>
                      )}
                    </p>
                  )}
                  <p className="mt-0.5 font-mono text-[11px] text-ur-text-muted">Ref: {referenceId(activeThread.id)}</p>
                </div>
              </div>
              <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
                {activeMessages.map((message) => {
                  const isOwn = message.senderId === user?.id;
                  return (
                    <div key={message.id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[75%] rounded-ur-sm px-3 py-2 text-sm ${
                          isOwn ? "bg-ur-primary text-white" : "bg-ur-card-soft text-ur-navy"
                        }`}
                      >
                        <p>{message.body}</p>
                        <p
                          className={`mt-1 flex items-center justify-end gap-1 text-xs ${
                            isOwn ? "text-white/70" : "text-ur-text-muted"
                          }`}
                        >
                          {formatDate(message.createdAt)}
                          {isOwn ? (
                            <Icon
                              name={message.readAt ? "done_all" : "check"}
                              size={12}
                              className={message.readAt ? "text-ur-cyan" : "text-white/70"}
                            />
                          ) : null}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-2 border-t border-ur-border px-4 py-3">
                <input
                  value={draft}
                  onChange={(event) => handleDraftChange(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Write a message..."
                  className="flex-1 rounded-ur-sm border border-ur-border bg-transparent px-3 py-2 text-sm text-ur-navy placeholder:text-ur-text-muted focus:outline-none focus:ring-2 focus:ring-ur-primary/40"
                />
                <button
                  onClick={handleSend}
                  disabled={sending || !draft.trim()}
                  className="flex items-center gap-2 rounded-ur-sm bg-ur-primary px-4 py-2 text-sm font-bold text-white hover:bg-ur-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Icon name="send" size={16} />
                  Send
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
