"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  BookOpen,
  ChevronDown,
  Code2,
  CreditCard,
  Flag,
  Headset,
  KeyRound,
  Network,
  Rocket,
  Search,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { faqTopics } from "@/lib/faq-data";

const topicIcons: Record<string, typeof Network> = {
  "stellar-testnet": Network,
  "zk-proof": ShieldCheck,
  "payment-hold-status": CreditCard,
  "viewing-codes": KeyRound,
  reports: Flag,
  "safety-rules": ShieldAlert,
  "known-limitations": AlertTriangle,
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
  const [search, setSearch] = useState("");
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<"checking" | "operational" | "degraded">("checking");

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
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ur-text-muted" />
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
            <Headset className="h-4 w-4" />
            Contact Support
          </a>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-7">
        {faqTopics.map((topic) => {
          const Icon = topicIcons[topic.id] ?? Network;
          const active = activeTopic === topic.id;
          return (
            <button
              key={topic.id}
              type="button"
              onClick={() => setActiveTopic(active ? null : topic.id)}
              className={`ur-card p-4 text-left transition-colors ${active ? "border-ur-primary bg-ur-success-bg" : ""}`}
            >
              <Icon className={`h-5 w-5 ${topicColor[topic.id] ?? "text-ur-cyan"}`} />
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
                      <ChevronDown className={`h-4 w-4 shrink-0 text-ur-text-muted transition-transform ${open ? "rotate-180" : ""}`} />
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
            <p className="text-sm font-bold text-ur-navy">Quick Links</p>
            <div className="mt-2 space-y-1">
              <QuickLink href="/listings" icon={Rocket} label="Find Verified Properties" />
              <QuickLink href="/api-docs" icon={Code2} label="API Documentation" />
              <QuickLink href="/reports/new" icon={Flag} label="Report Fake Listing" />
              <QuickLink href="/dashboard" icon={BookOpen} label="Back to Dashboard" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickLink({ href, icon: Icon, label }: { href: string; icon: typeof Rocket; label: string }) {
  return (
    <Link href={href} className="flex items-center gap-2 rounded-ur-sm px-2 py-2 text-sm text-ur-text-secondary hover:bg-ur-card-hover hover:text-ur-navy">
      <Icon className="h-4 w-4 text-ur-primary" />
      {label}
    </Link>
  );
}
