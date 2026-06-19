import { AlertTriangle, ShieldCheck } from "lucide-react";
import type { VerificationStatus } from "@/lib/listings-data";
import { Badge } from "@/components/ui/badge";

type VerifiedBadgeProps = { status: VerificationStatus };

export function VerifiedBadge({ status }: VerifiedBadgeProps) {
  if (status === "Verified") {
    return <Badge variant="success"><ShieldCheck className="h-3.5 w-3.5" />Verified</Badge>;
  }
  return <Badge variant="warning"><AlertTriangle className="h-3.5 w-3.5" />Pending</Badge>;
}
