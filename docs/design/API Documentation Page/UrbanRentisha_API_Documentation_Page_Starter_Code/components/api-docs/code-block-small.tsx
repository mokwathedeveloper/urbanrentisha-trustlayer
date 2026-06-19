import { Copy } from "lucide-react";

export function CodeBlockSmall({ label, code }: { label: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-ur-sm border border-white/10 bg-[#050806]">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2"><p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">{label}</p><Copy className="h-3.5 w-3.5 text-white/36" /></div>
      <pre className="max-h-[260px] overflow-auto p-3 text-xs leading-5 text-white/72 api-scrollbar"><code>{code}</code></pre>
    </div>
  );
}
