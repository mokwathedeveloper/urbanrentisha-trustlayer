import { Play, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ApiPlaygroundPanel() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 shadow-soft-dark backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">API playground</p><h2 className="mt-2 text-lg font-black text-white">Test request preview</h2></div><Badge variant="warning">Demo</Badge></div>
      <div className="mt-4 space-y-3">
        <label className="block"><span className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">Endpoint</span><select className="mt-2 h-11 w-full rounded-ur-sm border border-white/10 bg-black/18 px-3 text-sm text-white outline-none focus:border-ur-primary"><option>POST /api/v1/external/viewing-requests</option><option>POST /api/v1/external/payments/stellar-intent</option><option>POST /api/v1/external/proofs/verify</option></select></label>
        <label className="block"><span className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">Request body</span><textarea className="mt-2 min-h-[150px] w-full rounded-ur-sm border border-white/10 bg-black/18 p-3 font-mono text-xs leading-5 text-white outline-none focus:border-ur-primary" defaultValue={`{
  "listingId": "UR-LST-1001",
  "tenantExternalId": "TEN-123456"
}`} /></label>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3"><Button><Play className="h-4 w-4" /> Send</Button><Button variant="outline"><RefreshCcw className="h-4 w-4" /> Reset</Button></div>
    </section>
  );
}
