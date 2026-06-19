import { Braces, Copy, LockKeyhole } from "lucide-react";
import { methodVisuals, statusVisuals, type ApiEndpoint } from "@/lib/api-docs-data";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/api-docs/status-badge";
import { Button } from "@/components/ui/button";

export function EndpointCard({ endpoint }: { endpoint: ApiEndpoint }) {
  const method = methodVisuals[endpoint.method];
  const status = statusVisuals[endpoint.status];
  return (
    <article className="rounded-ur-lg border border-white/10 bg-black/16 p-4 transition-colors hover:border-ur-primary/40 hover:bg-white/[0.04]">
      <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-start">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2"><Badge variant={method.variant}>{method.label}</Badge><p className="break-all font-mono text-sm font-black text-ur-mint">{endpoint.path}</p></div>
          <h3 className="mt-3 text-lg font-black text-white">{endpoint.title}</h3>
          <p className="mt-2 max-w-[820px] text-sm leading-6 text-white/56">{endpoint.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <StatusBadge label={status.label} variant={status.variant} icon={status.icon} />
            <Badge variant="outline"><LockKeyhole className="h-3.5 w-3.5" /> {endpoint.auth}</Badge>
            <Badge variant="neutral"><Braces className="h-3.5 w-3.5" /> {endpoint.id}</Badge>
          </div>
        </div>
        <Button variant="outline" size="sm"><Copy className="h-4 w-4" /> Copy path</Button>
      </div>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <CodeBlock label="Request" code={endpoint.requestExample} />
        <CodeBlock label="Response" code={endpoint.responseExample} />
      </div>
    </article>
  );
}

function CodeBlock({ label, code }: { label: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-ur-sm border border-white/10 bg-[#050806]">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2"><p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">{label}</p><Copy className="h-3.5 w-3.5 text-white/36" /></div>
      <pre className="max-h-[260px] overflow-auto p-3 text-xs leading-5 text-white/72 api-scrollbar"><code>{code}</code></pre>
    </div>
  );
}
