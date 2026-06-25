"use client";

import { LogoMark } from "@/components/landing/logo-mark";
import { footerColumns } from "@/lib/landing-data";

export function LandingFooter() {
  return (
    <footer className="border-t border-ur-border bg-ur-page">
      <div className="ur-container grid gap-8 py-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div>
          <LogoMark />
          <p className="mt-3 max-w-xs text-sm text-ur-text-secondary">
            Rental scam prevention. Verified trust. On Stellar.
          </p>
        </div>

        {footerColumns.map((column) => (
          <div key={column.title}>
            <h4 className="text-sm font-bold text-ur-navy">{column.title}</h4>
            <ul className="mt-3 space-y-2">
              {column.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-ur-text-secondary hover:text-ur-mint">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="ur-container flex flex-col items-center justify-between gap-3 border-t border-ur-border py-6 text-xs text-ur-text-secondary sm:flex-row">
        <p>&copy; {new Date().getFullYear()} UrbanRentisha TrustLayer. All rights reserved.</p>
      </div>
    </footer>
  );
}
