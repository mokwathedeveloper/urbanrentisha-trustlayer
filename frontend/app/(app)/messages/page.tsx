"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { api, type MessageItem, type MessageThread } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { formatDate } from "@/components/dashboard/dashboard-ui";
import { Icon } from "@/components/ui/icon";
import { isOnline, formatLastSeen } from "@/lib/presence";

const POLL_INTERVAL_MS = 5000;

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
  const consumedThreadParam = useRef<string | null>(null);

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
          : api.messages.findForRequest(currentToken, currentId);
      fetcher.then(setActiveMessages);
    }
    loadMessages();
    const interval = setInterval(loadMessages, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [token, activeId, activeKind]);

  async function handleSend() {
    if (!token || !activeId || !activeKind || !draft.trim()) return;
    setSending(true);
    try {
      const message =
        activeKind === "listing_thread"
          ? await api.listingThreads.send(token, activeId, draft.trim())
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
                className={`block w-full px-4 py-3 text-left transition-colors ${
                  thread.id === activeId ? "bg-ur-card-soft" : "hover:bg-ur-card-soft/60"
                }`}
              >
                <p className="text-sm font-bold text-ur-navy">{thread.listingTitle}</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-ur-text-secondary">
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                      isOnline(thread.otherPartyLastActiveAt) ? "bg-ur-primary" : "bg-ur-text-muted"
                    }`}
                  />
                  {thread.otherParty}
                </p>
                <p className="mt-1 truncate text-xs text-ur-text-muted">{thread.lastMessage}</p>
                <p className="mt-1 text-xs text-ur-text-muted">{formatDate(thread.lastMessageAt)}</p>
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
              <div className="border-b border-ur-border px-5 py-4">
                <p className="text-sm font-bold text-ur-navy">{activeThread.listingTitle}</p>
                <p className="flex items-center gap-1.5 text-xs">
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                      isOnline(activeThread.otherPartyLastActiveAt) ? "bg-ur-primary" : "bg-ur-text-muted"
                    }`}
                  />
                  <span className="text-ur-text-secondary">{activeThread.otherParty}</span>
                  <span className={isOnline(activeThread.otherPartyLastActiveAt) ? "text-ur-primary" : "text-ur-text-muted"}>
                    · {formatLastSeen(activeThread.otherPartyLastActiveAt)}
                  </span>
                </p>
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
                        <p className={`mt-1 text-xs ${isOwn ? "text-white/70" : "text-ur-text-muted"}`}>
                          {formatDate(message.createdAt)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-2 border-t border-ur-border px-4 py-3">
                <input
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
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
