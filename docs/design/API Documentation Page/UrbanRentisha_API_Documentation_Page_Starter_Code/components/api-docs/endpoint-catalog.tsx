import { endpointGroups, apiEndpoints } from "@/lib/api-docs-data";
import { EndpointCard } from "@/components/api-docs/endpoint-card";

export function EndpointCatalog() {
  return (
    <section id="endpoints" className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">Endpoints</p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">External rental-platform API catalog</h2>
        <p className="mt-2 max-w-[820px] text-sm leading-6 text-white/56">Use these APIs to add verified viewing, payment proof, access unlocks, and suspicious-listing reporting into existing rental products.</p>
      </div>
      <div className="mt-6 space-y-8">
        {endpointGroups.map((group) => {
          const endpoints = apiEndpoints.filter((endpoint) => endpoint.group === group);
          const anchor = group.toLowerCase().replaceAll(" ", "-");
          return (
            <div key={group} id={anchor}>
              <div className="mb-3 flex items-center gap-3"><div className="h-px flex-1 bg-white/10" /><p className="text-xs font-black uppercase tracking-[0.16em] text-white/42">{group}</p><div className="h-px flex-1 bg-white/10" /></div>
              <div className="space-y-3">{endpoints.map((endpoint) => <EndpointCard key={endpoint.id} endpoint={endpoint} />)}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
