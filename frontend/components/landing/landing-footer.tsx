"use client";

import { LogoMark } from "@/components/landing/logo-mark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { footerColumns } from "@/lib/landing-data";

export function LandingFooter() {
  return (
    <footer className="border-t border-ur-border bg-ur-page">
      <div className="ur-container border-b border-ur-border py-10">
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
          <div>
            <h3 className="text-lg font-bold text-ur-navy">Stay Updated</h3>
            <p className="mt-1 text-sm text-ur-text-secondary">
              Get the latest updates, features, and security tips.
            </p>
          </div>
          <form className="flex w-full max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
            <Input
              label="Email address"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="flex-1"
              required
            />
            <Button className="self-end" type="submit">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

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

      <div className="ur-container flex flex-col items-center justify-between gap-3 border-t border-ur-border py-6 text-xs text-ur-text-muted sm:flex-row">
        <p>&copy; {new Date().getFullYear()} UrbanRentisha TrustLayer. All rights reserved.</p>
      </div>
    </footer>
  );
}
