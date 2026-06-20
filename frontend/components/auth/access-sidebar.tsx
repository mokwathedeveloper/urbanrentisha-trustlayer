import { Eye, KeyRound, Lock, Mail, ShieldCheck, Wallet, Zap } from "lucide-react";

const accessOptions = [
  {
    title: "Demo Login",
    description: "Explore the platform with sample data in one click.",
    cta: "Try Demo",
    icon: Zap,
  },
  {
    title: "Email Login",
    description: "Secure access with your email and password.",
    cta: "Use Email",
    icon: Mail,
  },
  {
    title: "Wallet Access",
    description: "Connect your Web3 wallet for full on-chain access.",
    cta: "Connect Wallet",
    icon: Wallet,
  },
];

const trustBadges = [
  { title: "Zero-Knowledge", description: "We don't see your data. You stay private.", icon: Eye },
  { title: "On-Chain Verified", description: "All records are verified on the blockchain.", icon: ShieldCheck },
  { title: "Secured & Encrypted", description: "Bank-grade security for your data.", icon: Lock },
  { title: "You're in Control", description: "Your data, your keys, your rules.", icon: KeyRound },
];

export function AccessSidebar({ onTryDemo }: { onTryDemo: () => void }) {
  return (
    <aside className="hidden w-full max-w-sm flex-col gap-6 lg:flex">
      <div className="ur-card p-6">
        <h2 className="text-lg font-bold text-ur-navy">Access your way</h2>
        <div className="mt-5 space-y-4">
          {accessOptions.map((option) => (
            <div key={option.title} className="rounded-ur border border-ur-border bg-ur-card-soft p-4">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-ur-primary/10 text-ur-primary">
                <option.icon className="h-4 w-4" />
              </span>
              <h3 className="mt-3 text-sm font-bold text-ur-navy">{option.title}</h3>
              <p className="mt-1 text-xs text-ur-text-secondary">{option.description}</p>
              {option.title === "Demo Login" ? (
                <button
                  type="button"
                  onClick={onTryDemo}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-ur-mint hover:underline"
                >
                  {option.cta} &rarr;
                </button>
              ) : (
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-ur-mint">
                  {option.cta} &rarr;
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="ur-card grid grid-cols-2 gap-4 p-5">
        {trustBadges.map((badge) => (
          <div key={badge.title}>
            <badge.icon className="h-4 w-4 text-ur-primary" />
            <p className="mt-2 text-xs font-bold text-ur-navy">{badge.title}</p>
            <p className="mt-1 text-xs text-ur-text-muted">{badge.description}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 text-xs text-ur-text-muted">
        <a href="#" className="hover:text-ur-mint">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-ur-mint">
          Terms of Service
        </a>
        <a href="/docs" className="hover:text-ur-mint">
          Docs
        </a>
      </div>
    </aside>
  );
}
