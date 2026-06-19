"use client";

import { demoRoles, type DemoRoleId } from "@/lib/auth-data";
import { cn } from "@/lib/utils";

type RoleSelectorProps = {
  value: DemoRoleId;
  onChange: (role: DemoRoleId) => void;
};

export function RoleSelector({ value, onChange }: RoleSelectorProps) {
  return (
    <div className="grid gap-2" role="radiogroup" aria-label="Choose demo role">
      {demoRoles.map((role) => {
        const Icon = role.icon;
        const selected = value === role.id;

        return (
          <button
            key={role.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(role.id)}
            className={cn(
              "flex items-center gap-3 rounded-ur-sm border p-3 text-left transition-colors ur-focus",
              selected
                ? "border-ur-primary/70 bg-ur-primary/10"
                : "border-white/10 bg-black/12 hover:border-white/20 hover:bg-white/5"
            )}
          >
            <div
              className={cn(
                "grid h-9 w-9 shrink-0 place-items-center rounded-ur-sm",
                selected ? "bg-ur-primary text-white" : "bg-white/5 text-ur-muted"
              )}
            >
              <Icon className="h-4.5 w-4.5" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-bold text-white">{role.label}</p>
              <p className="mt-0.5 text-xs leading-4 text-white/52">
                {role.description}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
