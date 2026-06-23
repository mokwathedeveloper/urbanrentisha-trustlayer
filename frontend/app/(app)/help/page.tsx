"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { faqTopics } from "@/lib/faq-data";
import { Icon, type IconName } from "@/components/ui/icon";

const topicIcons: Record<string, IconName> = {
  "stellar-testnet": "hub",
  "zk-proof": "verified_user",
  "payment-hold-status": "credit_card",
  "viewing-codes": "key",
  reports: "flag",
  "safety-rules": "gpp_maybe",
  "known-limitations": "warning",
};

const topicColor: Record<string, string> = {
  "stellar-testnet": "text-ur-cyan",
  "zk-proof": "text-ur-primary",
  "payment-hold-status": "text-ur-warning",
  "viewing-codes": "text-ur-cyan",
  reports: "text-ur-mint",
  "safety-rules": "text-ur-error",
  "known-limitations": "text-ur-warning",
};

export default function HelpFaqPage() {
  const router = useRouter();
  const { token } = useAuth();
  const [search, setSearch] = useState("");
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<"checking" | "operational" | "degraded">("checking");
  const [startingChat, setStartingChat] = useState(false);

  async function handleContactSupport() {
    if (!token) return;
    setStartingChat(true);
    try {
      const thread = await api.support.getOrCreateMyThread(token);
      router.push(`/messages?thread=${thread.id}`);
    } finally {
      setStartingChat(false);
    }
  }

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api/v1";
    fetch(`${base}/listings`)
      .then((res) => setApiStatus(res.ok ? "operational" : "degraded"))
      .catch(() => setApiStatus("degraded"));
  }, []);

  const allItems = useMemo(
    () => faqTopics.flatMap((topic) => topic.items.map((item) => ({ ...item, topicId: topic.id, topicLabel: topic.label }))),
    [],
  );

  const filtered = allItems.filter((item) => {
    if (activeTopic && item.topicId !== activeTopic) return false;
    if (search) {
      const haystack = `${item.question} ${item.answer}`.toLowerCase();
      if (!haystack.includes(search.toLowerCase())) return false;
    }
    return true;
  });

  return (
    <div className="px-6 py-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-[-0.02em] text-ur-navy">Help Center / FAQ</h1>
          <p className="mt-1 text-sm text-ur-text-secondary">
            Find answers to common questions about UrbanRentisha and how everything works.
          </p>
          <div className="relative mt-4 max-w-md">
            <Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ur-text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for help articles, topics, or questions..."
              className="w-full rounded-ur-sm border border-ur-border bg-ur-input py-2 pl-9 pr-3 text-sm text-ur-text"
            />
          </div>
        </div>

        <div className="ur-card w-full max-w-xs p-4 sm:w-auto">
          <p className="text-sm font-bold text-ur-navy">Still need help?</p>
          <p className="mt-1 text-xs text-ur-text-secondary">Our support team is here to help you with any questions.</p>
          <a
            href="mailto:support@urbanrentisha.local"
            className="mt-3 flex items-center justify-center gap-2 rounded-ur-sm bg-ur-primary px-4 py-2 text-sm font-bold text-white hover:bg-ur-primary-hover"
          >
            <Icon name="support_agent" size={16} />
            Contact Support
          </a>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-7">
        {faqTopics.map((topic) => {
          const topicIcon = topicIcons[topic.id] ?? "hub";
          const active = activeTopic === topic.id;
          return (
            <button
              key={topic.id}
              type="button"
              onClick={() => setActiveTopic(active ? null : topic.id)}
              className={`ur-card p-4 text-left transition-colors ${active ? "border-ur-primary bg-ur-success-bg" : ""}`}
            >
              <Icon name={topicIcon} size={20} className={`${topicColor[topic.id] ?? "text-ur-cyan"}`} />
              <p className="mt-2 text-sm font-bold text-ur-navy">{topic.label}</p>
              <p className="mt-1 text-xs text-ur-cyan">{topic.items.length} articles</p>
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="ur-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-ur-navy">Frequently Asked Questions</p>
            {activeTopic ? (
              <button type="button" onClick={() => setActiveTopic(null)} className="text-xs font-semibold text-ur-primary hover:underline">
                Clear filter
              </button>
            ) : null}
          </div>

          {filtered.length === 0 ? (
            <p className="mt-4 text-sm text-ur-text-muted">No FAQ entries match your search.</p>
          ) : (
            <div className="mt-3 divide-y divide-ur-border">
              {filtered.map((item) => {
                const open = openItem === item.id;
                return (
                  <div key={item.id} className="py-3">
                    <button
                      type="button"
                      onClick={() => setOpenItem(open ? null : item.id)}
                      className="flex w-full items-center justify-between gap-3 text-left"
                    >
                      <span>
                        <span className="block text-sm font-bold text-ur-text">{item.question}</span>
                        <span className="text-xs text-ur-text-muted">{item.topicLabel}</span>
                      </span>
                      <Icon name="expand_more" size={16} className={`shrink-0 text-ur-text-muted transition-transform ${open ? "rotate-180" : ""}`} />
                    </button>
                    {open ? <p className="mt-2 text-sm text-ur-text-secondary">{item.answer}</p> : null}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="ur-card p-4">
            <p className="text-sm font-bold text-ur-navy">System Status</p>
            <div className="mt-3 flex items-center gap-2 text-sm">
              <span
                className={`h-2 w-2 rounded-full ${
                  apiStatus === "operational" ? "bg-ur-primary" : apiStatus === "degraded" ? "bg-ur-error" : "bg-ur-warning"
                }`}
              />
              <span className="text-ur-text-secondary">
                {apiStatus === "checking" ? "Checking API status..." : apiStatus === "operational" ? "API Operational" : "API Unreachable"}
              </span>
            </div>
          </div>

          <div className="ur-card p-4">
            <div className="flex items-center gap-2">
              <Icon name="support_agent" size={16} className="text-ur-primary" />
              <p className="text-sm font-bold text-ur-navy">Need More Help?</p>
            </div>
            <p className="mt-1 text-xs text-ur-text-secondary">
              Chat with our support team - a real person will respond, not a bot.
            </p>
            <button
              type="button"
              onClick={handleContactSupport}
              disabled={startingChat}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-ur-sm bg-ur-primary px-4 py-2 text-sm font-bold text-white hover:bg-ur-primary-hover disabled:opacity-60"
            >
              <Icon name="chat_bubble" size={16} />
              {startingChat ? "Starting chat..." : "Contact Support"}
            </button>
          </div>

          <div className="ur-card p-4">
            <p className="text-sm font-bold text-ur-navy">Quick Links</p>
            <div className="mt-2 space-y-1">
              <QuickLink href="/listings" icon="rocket_launch" label="Find Verified Properties" />
              <QuickLink href="/api-docs" icon="code" label="API Documentation" />
              <QuickLink href="/reports/new" icon="flag" label="Report Fake Listing" />
              <QuickLink href="/dashboard" icon="menu_book" label="Back to Dashboard" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickLink({ href, icon, label }: { href: string; icon: IconName; label: string }) {
  return (
    <Link href={href} className="flex items-center gap-2 rounded-ur-sm px-2 py-2 text-sm text-ur-text-secondary hover:bg-ur-card-hover hover:text-ur-navy">
      <Icon name={icon} size={16} className="text-ur-primary" />
      {label}
    </Link>
  );
}
