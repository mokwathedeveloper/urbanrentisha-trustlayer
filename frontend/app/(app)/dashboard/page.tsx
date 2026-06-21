"use client";

import { AdminDashboardView } from "@/components/dashboard/admin-dashboard";
import { LandlordDashboardView } from "@/components/dashboard/landlord-dashboard";
import { PropertyManagerDashboardView } from "@/components/dashboard/property-manager-dashboard";
import { TenantDashboardView } from "@/components/dashboard/tenant-dashboard";
import { useAuth } from "@/lib/auth";

export default function DashboardPage() {
  const { user } = useAuth();

  if (user?.role === "ADMIN" || user?.role === "PLATFORM") {
    return <AdminDashboardView />;
  }

  if (user?.role === "LANDLORD") {
    return <LandlordDashboardView />;
  }

  if (user?.role === "AGENT" || user?.role === "MANAGER") {
    return <PropertyManagerDashboardView />;
  }

  return <TenantDashboardView />;
}
