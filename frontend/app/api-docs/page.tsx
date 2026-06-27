"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { apiEndpoints, apiGroups, type ApiEndpoint, type HttpMethod } from "@/lib/api-docs-data";
import { Icon, type IconName } from "@/components/ui/icon";
import { ButtonSpinner } from "@/components/ui/spinner";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api/v1";

const methodTone: Record<HttpMethod, string> = {
  GET: "border-ur-cyan/40 text-ur-cyan",
  POST: "border-ur-primary/40 text-ur-primary",
  PATCH: "border-ur-warning/40 text-ur-warning",
};

export default function ApiDocsPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ApiEndpoint>(apiEndpoints[0]);
  const [method, setMethod] = useState<HttpMethod>(selected.method);
  const [path, setPath] = useState(selected.path);
  const [token, setToken] = useState("");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState<{ status: number; body: string } | null>(null);
  const [sending, setSending] = useState(false);

  const filtered = useMemo(() => {
    if (!search) return apiEndpoints;
    const term = search.toLowerCase();
    return apiEndpoints.filter(
      (endpoint) =>
        endpoint.title.toLowerCase().includes(term) ||
        endpoint.path.toLowerCase().includes(term) ||
        endpoint.description.toLowerCase().includes(term),
    );
  }, [search]);

  function selectEndpoint(endpoint: ApiEndpoint) {
    setSelected(endpoint);
    setMethod(endpoint.method);
    setPath(endpoint.path);
    setResponse(null);
  }

  async function sendRequest() {
    setSending(true);
    setResponse(null);
    try {
      const res = await fetch(`${API_BASE_URL}${path}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: method === "GET" ? undefined : body || undefined,
      });
      const text = await res.text();
      setResponse({ status: res.status, body: text });
    } catch (err) {
      setResponse({ status: 0, body: err instanceof Error ? err.message : "Request failed." });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-ur-page text-ur-text">
      <header className="flex items-center justify-between border-b border-ur-border px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Icon name="home" size={20} className="text-ur-primary" />
          <span className="font-black">
            <span className="text-white">URBAN</span> <span className="text-ur-primary">RENTISHA</span>
          </span>
        </Link>
        <div className="relative w-80">
          <Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ur-text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search endpoints, resources, or examples..."
            className="w-full rounded-ur-sm border border-ur-border bg-ur-input py-2 pl-9 pr-3 text-sm text-ur-text"
          />
        </div>
        <Link href="/login" className="text-sm font-semibold text-ur-primary hover:underline">
          Sign In
        </Link>
      </header>

      <div className="px-6 py-8">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-black tracking-[-0.02em] text-ur-navy">UrbanRentisha API</h1>
          <span className="rounded-full border border-ur-primary/40 px-2 py-0.5 text-xs font-bold text-ur-primary">v0.1.0</span>
        </div>
        <p className="mt-2 max-w-2xl text-sm text-ur-text-secondary">
          Integrate with UrbanRentisha to automate rental operations, verify trust, manage viewing requests, and
          read real Stellar testnet payment and zero-knowledge proof verification status.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge icon="code" label="REST API" />
          <Badge icon="data_object" label="JSON Responses" />
          <Badge icon="key" label="API Key for Partners" />
        </div>
      </div>

      <div className="grid gap-6 px-6 pb-10 lg:grid-cols-[280px_1fr_380px]">
        <div className="ur-card min-w-0 p-4">
          <p className="mb-3 text-sm font-bold text-ur-navy">Endpoints ({filtered.length})</p>
          <div className="max-h-[70vh] space-y-4 overflow-y-auto">
            {apiGroups.map((group) => {
              const groupEndpoints = filtered.filter((e) => e.group === group);
              if (groupEndpoints.length === 0) return null;
              return (
                <div key={group}>
                  <p className="text-xs font-bold uppercase text-ur-text-muted">{group}</p>
                  <div className="mt-1 space-y-1">
                    {groupEndpoints.map((endpoint) => (
                      <button
                        key={endpoint.id}
                        type="button"
                        onClick={() => selectEndpoint(endpoint)}
                        className={`flex w-full min-w-0 items-center gap-2 rounded-ur-sm px-2 py-1.5 text-left text-sm ${
                          selected.id === endpoint.id ? "bg-ur-card-hover text-ur-primary" : "text-ur-text-secondary hover:bg-ur-card-hover"
                        }`}
                      >
                        <span className={`shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-bold ${methodTone[endpoint.method]}`}>
                          {endpoint.method}
                        </span>
                        <span className="min-w-0 truncate font-mono text-xs">{endpoint.path}</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="min-w-0 space-y-4">
          <div className="ur-card p-5">
            <div className="flex items-center gap-2">
              <span className={`rounded border px-2 py-0.5 text-xs font-bold ${methodTone[selected.method]}`}>{selected.method}</span>
              <span className="font-mono text-sm text-ur-text">{selected.path}</span>
              <span className="ml-auto rounded-full border border-ur-border px-2 py-0.5 text-xs font-semibold text-ur-text-secondary">
                {selected.auth}
              </span>
            </div>
            <p className="mt-2 text-sm font-bold text-ur-navy">{selected.title}</p>
            <p className="mt-1 text-sm text-ur-text-secondary">{selected.description}</p>
          </div>

          <div className="ur-card p-5">
            <p className="text-sm font-bold text-ur-navy">Try it out</p>
            <div className="mt-3 flex gap-2">
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as HttpMethod)}
                className="rounded-ur-sm border border-ur-border bg-ur-input px-2 py-2 text-sm font-bold text-ur-text"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PATCH">PATCH</option>
              </select>
              <input
                value={path}
                onChange={(e) => setPath(e.target.value)}
                className="flex-1 rounded-ur-sm border border-ur-border bg-ur-input px-3 py-2 font-mono text-sm text-ur-text"
              />
              <button
                type="button"
                onClick={sendRequest}
                disabled={sending}
                className="flex items-center gap-2 rounded-ur-sm bg-ur-primary px-4 py-2 text-sm font-bold text-white disabled:opacity-60"
              >
                {sending ? <ButtonSpinner /> : <Icon name="send" size={16} />}
                {sending ? "Sending..." : "Send"}
              </button>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-ur-text-secondary">Bearer Token (optional)</label>
                <input
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Paste a JWT from /auth/login"
                  className="mt-1 w-full rounded-ur-sm border border-ur-border bg-ur-input px-3 py-2 font-mono text-xs text-ur-text"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-ur-text-secondary">Request Body (JSON)</label>
                <input
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder='{"key": "value"}'
                  disabled={method === "GET"}
                  className="mt-1 w-full rounded-ur-sm border border-ur-border bg-ur-input px-3 py-2 font-mono text-xs text-ur-text disabled:opacity-50"
                />
              </div>
            </div>

            {response ? (
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase text-ur-text-muted">Response</p>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-xs font-bold ${
                      response.status >= 200 && response.status < 300
                        ? "border-ur-primary/40 text-ur-primary"
                        : "border-ur-error/40 text-ur-error"
                    }`}
                  >
                    {response.status || "ERROR"}
                  </span>
                </div>
                <pre className="mt-2 max-h-64 max-w-full overflow-auto whitespace-pre-wrap break-all rounded-ur-sm border border-ur-border bg-ur-input p-3 font-mono text-xs text-ur-text">
                  {response.body}
                </pre>
              </div>
            ) : null}
          </div>
        </div>

        <div className="min-w-0 space-y-4">
          <div className="ur-card p-4">
            <p className="text-sm font-bold text-ur-navy">Base URL</p>
            <div className="mt-2 flex items-center gap-2 rounded-ur-sm border border-ur-border bg-ur-input px-3 py-2">
              <span className="flex-1 truncate font-mono text-xs text-ur-text">{API_BASE_URL}</span>
              <button type="button" onClick={() => navigator.clipboard.writeText(API_BASE_URL)} className="text-ur-text-muted hover:text-ur-primary">
                <Icon name="content_copy" size={14} />
              </button>
            </div>
          </div>

          <div className="ur-card p-4">
            <p className="flex items-center gap-2 text-sm font-bold text-ur-navy">
              <Icon name="verified_user" size={16} className="text-ur-primary" />
              Authentication
            </p>
            <p className="mt-2 text-sm text-ur-text-secondary">
              Most endpoints require a JWT bearer token obtained from <code className="font-mono text-xs">POST /auth/login</code>.
              Admin-only endpoints additionally require the <code className="font-mono text-xs">ADMIN</code> role.
            </p>
            <p className="mt-2 text-sm text-ur-text-secondary">
              External partner integrations use an <code className="font-mono text-xs">X-API-Key</code> header instead of a JWT.
            </p>
          </div>

          <div className="ur-card p-4">
            <p className="text-sm font-bold text-ur-navy">Roles &amp; Permissions</p>
            <ul className="mt-2 space-y-1 text-sm text-ur-text-secondary">
              <li><span className="font-semibold text-ur-text">TENANT</span> — request viewings, pay, generate proofs, file reports</li>
              <li><span className="font-semibold text-ur-text">AGENT / MANAGER</span> — create listings, manage own dashboard</li>
              <li><span className="font-semibold text-ur-text">ADMIN</span> — verify listings, view audit logs and platform overview</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Badge({ icon, label }: { icon: IconName; label: string }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-ur-border bg-ur-card px-3 py-1 text-xs font-semibold text-ur-text-secondary">
      <Icon name={icon} size={14} className="text-ur-primary" />
      {label}
    </span>
  );
}
