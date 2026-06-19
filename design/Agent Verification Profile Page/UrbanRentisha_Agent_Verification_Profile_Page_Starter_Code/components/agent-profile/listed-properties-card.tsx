import Link from "next/link";
import { ArrowRight, Building2, MapPin } from "lucide-react";
import { listedProperties, type PropertyStatus } from "@/lib/agent-profile-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function propertyVariant(status: PropertyStatus) {
  if (status === "verified") return "success";
  if (status === "review_needed") return "warning";
  return "danger";
}

export function ListedPropertiesCard() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
            Listed properties
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            Active properties managed by this agent
          </h2>
        </div>

        <Button variant="outline" size="sm">
          View all
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-5 space-y-3">
        {listedProperties.map((property) => (
          <article
            key={property.id}
            className="rounded-ur-lg border border-white/10 bg-black/16 p-4 transition-colors hover:border-ur-primary/40 hover:bg-white/[0.04]"
          >
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div className="flex gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                  <Building2 className="h-6 w-6" />
                </div>

                <div>
                  <Link
                    href={`/properties/${property.id}`}
                    className="font-black text-white transition-colors hover:text-ur-mint ur-focus"
                  >
                    {property.title}
                  </Link>
                  <p className="mt-1 flex items-center gap-2 text-sm text-white/52">
                    <MapPin className="h-4 w-4 text-ur-primary" />
                    {property.location}
                  </p>
                  <p className="mt-2 font-mono text-xs font-bold text-ur-mint">
                    {property.id}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[360px]">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/38">Rent</p>
                  <p className="mt-1 text-sm font-black text-white">KES {property.rentKes.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/38">Requests</p>
                  <p className="mt-1 text-sm font-black text-white">{property.requests}</p>
                </div>
                <div>
                  <Badge variant={propertyVariant(property.status)}>
                    {property.status.replace("_", " ")}
                  </Badge>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
