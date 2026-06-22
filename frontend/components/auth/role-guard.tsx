"use client";

import { useAuth } from "@/lib/auth";
import type { UserRole } from "@/lib/api";

/**
 * True only once we know the logged-in user's role is in `allow`. Use this
 * to gate data-fetching effects on role-specific pages - RoleGuard alone
 * only blocks the rendered output, not effects that already ran on mount,
 * so an effect with no role check still fires a doomed, forbidden request
 * for the wrong role.
 */
export function useHasRole(allow: UserRole[]): boolean {
  const { user } = useAuth();
  return Boolean(user && allow.includes(user.role));
}

/**
 * Renders children only if the logged-in user's role is in `allow`.
 * Use to keep role-specific pages (e.g. tenant-only, admin-only) from
 * rendering their content for the wrong role when reached directly by URL.
 */
export function RoleGuard({ allow, children }: { allow: UserRole[]; children: React.ReactNode }) {
  const allowed = useHasRole(allow);

  if (!allowed) {
    return (
      <div className="px-6 py-8">
        <h1 className="text-2xl font-black tracking-[-0.02em] text-ur-navy">Access Restricted</h1>
        <p className="mt-4 text-sm text-ur-error">This page isn&apos;t available for your account type.</p>
      </div>
    );
  }

  return <>{children}</>;
}
