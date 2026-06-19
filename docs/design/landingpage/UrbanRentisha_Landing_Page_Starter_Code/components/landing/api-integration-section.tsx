import { Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";

const endpoints = [
  "POST /api/viewing-requests",
  "GET /api/viewing-requests/:id/status",
  "POST /api/proofs/verify",
  "GET /api/viewing-codes/:code/verify",
];

export function ApiIntegrationSection() {
  return (
    <section id="api" className="ur-section bg-white">
      <div className="ur-container grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="B2B platform API"
            title="Designed for rental platforms that need a trust layer."
            description="UrbanRentisha can later be integrated into existing rental marketplaces through clean viewing-request, proof-status, report, and code-verification APIs."
          />
        </div>

        <div className="ur-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-ur-border bg-ur-card-soft p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-ur bg-white text-ur-primary">
                <Code2 className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-ur-navy">API preview</p>
                <p className="text-sm text-ur-text-secondary">
                  Simple endpoints for external platforms.
                </p>
              </div>
            </div>
            <Badge variant="outline">REST</Badge>
          </div>

          <div className="divide-y divide-ur-border">
            {endpoints.map((endpoint) => (
              <div key={endpoint} className="flex items-center justify-between gap-4 p-5">
                <code className="font-mono text-sm text-ur-navy">{endpoint}</code>
                <span className="rounded-full bg-ur-success-bg px-3 py-1 text-xs font-semibold text-ur-success">
                  Ready
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
