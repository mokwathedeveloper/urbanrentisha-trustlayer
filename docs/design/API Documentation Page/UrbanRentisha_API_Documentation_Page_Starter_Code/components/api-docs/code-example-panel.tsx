import { Copy, TerminalSquare } from "lucide-react";
import { codeSamples } from "@/lib/api-docs-data";
import { Button } from "@/components/ui/button";

export function CodeExamplePanel() {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">Quick start</p><h2 className="mt-2 text-lg font-black text-white">Auth token request</h2></div><TerminalSquare className="h-6 w-6 text-ur-primary" /></div>
      <div className="mt-4 overflow-hidden rounded-ur-sm border border-white/10 bg-[#050806]">
        <div className="flex items-center justify-between border-b border-white/10 px-3 py-2"><p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">cURL</p><Copy className="h-3.5 w-3.5 text-white/36" /></div>
        <pre className="max-h-[260px] overflow-auto p-3 text-xs leading-5 text-white/72 api-scrollbar"><code>{codeSamples.authCurl}</code></pre>
      </div>
      <h3 className="mt-5 text-sm font-black text-white">Create viewing request</h3>
      <div className="mt-3 overflow-hidden rounded-ur-sm border border-white/10 bg-[#050806]"><pre className="max-h-[230px] overflow-auto p-3 text-xs leading-5 text-white/72 api-scrollbar"><code>{codeSamples.createRequest}</code></pre></div>
      <Button className="mt-4 w-full"><Copy className="h-4 w-4" /> Copy quick start</Button>
    </section>
  );
}
