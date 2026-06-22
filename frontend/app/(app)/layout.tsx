"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "@/components/app-shell/sidebar";
import { Topbar } from "@/components/app-shell/topbar";
import { useAuth } from "@/lib/auth";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isOnboarding = pathname === "/onboarding";
  const isChangePassword = pathname === "/change-password";

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (user.mustChangePassword && !isChangePassword) {
      router.replace("/change-password");
      return;
    }
    if (!user.mustChangePassword && !user.avatarUrl && !isOnboarding) {
      router.replace("/onboarding");
    }
  }, [loading, user, isOnboarding, isChangePassword, router]);

  if (loading || !user) {
    return (
      <main className="grid min-h-screen place-items-center bg-ur-bg text-ur-muted">
        <p>Loading...</p>
      </main>
    );
  }

  if (isChangePassword) {
    return <>{children}</>;
  }

  if (user.mustChangePassword) {
    return (
      <main className="grid min-h-screen place-items-center bg-ur-bg text-ur-muted">
        <p>Loading...</p>
      </main>
    );
  }

  if (isOnboarding) {
    return <>{children}</>;
  }

  if (!user.avatarUrl) {
    return (
      <main className="grid min-h-screen place-items-center bg-ur-bg text-ur-muted">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <div className="flex min-h-screen bg-ur-bg">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex-1 bg-ur-bg">{children}</main>
      </div>
    </div>
  );
}
