"use client";

import { useEffect, useState } from "react";
import { api, type MessageItem, type MessageThread } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { formatDate } from "@/components/dashboard/dashboard-ui";
import { Icon } from "@/components/ui/icon";

export default function MessagesPage() {
  const { token, user } = useAuth();
  const [threads, setThreads] = useState<MessageThread[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeMessages, setActiveMessages] = useState<MessageItem[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!token) return;
    api.messages
      .findInbox(token)
      .then((data) => {
        setThreads(data);
        if (data.length > 0) setActiveId(data[0].viewingRequestId);
      })
      .finally(() => setLoading(false));
  }, [token]);

  useEffect(() => {
    if (!token || !activeId) return;
    api.messages.findForRequest(token, activeId).then(setActiveMessages);
  }, [token, activeId]);

  const activeThread = threads.find((thread) => thread.viewingRequestId === activeId);

  async function handleSend() {
    if (!token || !activeId || !draft.trim()) return;
    setSending(true);
    try {
      const message = await api.messages.send(token, activeId, draft.trim());
      setActiveMessages((prev) => [...prev, message]);
      setThreads((prev) =>
        prev.map((thread) =>
          thread.viewingRequestId === activeId
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
                key={thread.viewingRequestId}
                onClick={() => setActiveId(thread.viewingRequestId)}
                className={`block w-full px-4 py-3 text-left transition-colors ${
                  thread.viewingRequestId === activeId ? "bg-ur-card-soft" : "hover:bg-ur-card-soft/60"
                }`}
              >
                <p className="text-sm font-bold text-ur-navy">{thread.listingTitle}</p>
                <p className="mt-0.5 text-xs text-ur-text-secondary">{thread.otherParty}</p>
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
                <p className="text-xs text-ur-text-secondary">{activeThread.otherParty}</p>
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
