"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { demoRoles, type DemoRoleId } from "@/lib/auth-data";
import { Button } from "@/components/ui/button";
import { RoleSelector } from "@/components/auth/role-selector";
import { StatusNotice } from "@/components/auth/status-notice";

export function DemoLoginPanel() {
  const [selectedRole, setSelectedRole] = useState<DemoRoleId>("tenant");
  const [isLoading, setIsLoading] = useState(false);
  const selected = demoRoles.find((role) => role.id === selectedRole) ?? demoRoles[0];

  function handleDemoLogin() {
    setIsLoading(true);
    window.setTimeout(() => setIsLoading(false), 900);
  }

  return (
    <div className="rounded-ur-lg border border-ur-primary/20 bg-ur-primary/8 p-4">
      <div className="mb-4 flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-ur bg-ur-primary/12 text-ur-primary">
          <CheckCircle2 className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-base font-black tracking-[-0.02em] text-white">
            Fast demo login
          </h2>
          <p className="mt-1 text-sm leading-5 text-white/58">
            Best path for judges and quick testing. Choose a demo role and continue.
          </p>
        </div>
      </div>

      <RoleSelector value={selectedRole} onChange={setSelectedRole} />

      <Button
        className="mt-4 w-full"
        size="lg"
        onClick={handleDemoLogin}
        disabled={isLoading}
      >
        {isLoading ? "Opening demo workspace..." : `Continue as ${selected.label}`}
        {!isLoading ? <ArrowRight className="h-4 w-4" /> : null}
      </Button>

      <StatusNotice
        className="mt-4"
        tone="success"
        title="Demo account"
        description={selected.email}
      />
    </div>
  );
}
