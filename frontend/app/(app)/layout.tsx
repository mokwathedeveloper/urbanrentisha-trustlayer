"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "@/components/app-shell/sidebar";
import { Topbar } from "@/components/app-shell/topbar";
import { SoundEffects } from "@/components/app-shell/sound-effects";
import { useAuth } from "@/lib/auth";
import { LogoMark } from "@/components/landing/logo-mark";
import { Spinner } from "@/components/ui/spinner";

/**
 * The first thing every authenticated page renders, while useAuth()
 * resolves the session (and again briefly during the mustChangePassword/
 * onboarding redirect checks) - previously a bare "Loading..." on a black
 * screen with no branding at all.
 */
function AppShellLoader() {
  return (
    <main className="grid min-h-screen place-items-center bg-ur-bg">
      <div className="flex flex-col items-center gap-4">
        <LogoMark className="h-12 w-auto" />
        <Spinner size="lg" className="text-ur-primary" aria-label="Loading" />
      </div>
    </main>
  );
}

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
    return <AppShellLoader />;
  }

  if (isChangePassword) {
    return <>{children}</>;
  }

  if (user.mustChangePassword) {
    return <AppShellLoader />;
  }

  if (isOnboarding) {
    return <>{children}</>;
  }

  if (!user.avatarUrl) {
    return <AppShellLoader />;
  }

  return (
    <div className="flex min-h-screen bg-ur-bg">
      <SoundEffects />
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex-1 bg-ur-bg">{children}</main>
      </div>
    </div>
  );
}
