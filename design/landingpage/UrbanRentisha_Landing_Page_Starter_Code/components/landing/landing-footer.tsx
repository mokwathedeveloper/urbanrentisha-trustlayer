import { LogoMark } from "@/components/landing/logo-mark";

export function LandingFooter() {
  return (
    <footer className="border-t border-ur-border bg-ur-page">
      <div className="ur-container flex flex-col gap-5 py-8 md:flex-row md:items-center md:justify-between">
        <LogoMark />
        <p className="text-sm text-ur-text-secondary">
          Secure. Private. Verifiable. Built on Stellar.
        </p>
      </div>
    </footer>
  );
}
