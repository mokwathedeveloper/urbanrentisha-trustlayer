"use client";

import { PropertyManagerDashboardView } from "@/components/dashboard/property-manager-dashboard";
import { TenantDashboardView } from "@/components/dashboard/tenant-dashboard";
import { useAuth } from "@/lib/auth";

export default function DashboardPage() {
  const { user } = useAuth();

  if (user?.role === "AGENT" || user?.role === "MANAGER") {
    return <PropertyManagerDashboardView />;
  }

  return <TenantDashboardView />;
}
