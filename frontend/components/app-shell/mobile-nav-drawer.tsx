"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@/components/ui/icon";
import { SidebarNavContent } from "@/components/app-shell/sidebar";

/**
 * The `lg:hidden` counterpart to the desktop <Sidebar> - same nav content
 * (via SidebarNavContent, so ROLE_NAV_ITEMS logic lives in exactly one
 * place), shown as a slide-in panel with a dismissible overlay instead of
 * a fixed-width column. Triggered from Topbar's hamburger button.
 */
export function MobileNavDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    // Prevent the page behind the drawer from scrolling while it's open.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <button
        type="button"
        aria-label="Close navigation menu"
        onClick={onClose}
        className="ur-drawer-overlay absolute inset-0 bg-black/60"
      />
      <aside className="ur-drawer-panel relative flex h-full w-72 max-w-[85vw] flex-col border-r border-ur-border bg-ur-sidebar shadow-ur-soft">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
          className="ur-focus absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full text-ur-text-secondary hover:bg-ur-card-hover hover:text-ur-navy"
        >
          <Icon name="close" size={20} />
        </button>
        <SidebarNavContent onNavigate={onClose} />
      </aside>
    </div>
  );
}
