import { Icon, type IconName } from "@/components/ui/icon";

const trustBadges: { title: string; description: string; icon: IconName }[] = [
  { title: "Zero-Knowledge", description: "We don't see your data. You stay private.", icon: "visibility" },
  { title: "On-Chain Verified", description: "All records are verified on the blockchain.", icon: "verified_user" },
  { title: "Secured & Encrypted", description: "Bank-grade security for your data.", icon: "lock" },
  { title: "You're in Control", description: "Your data, your keys, your rules.", icon: "key" },
];

interface AccessSidebarProps {
  onTryDemo: () => void;
  onUseEmail: () => void;
  onConnectWallet: () => void;
}

export function AccessSidebar({ onTryDemo, onUseEmail, onConnectWallet }: AccessSidebarProps) {
  const accessOptions: { title: string; description: string; cta: string; icon: IconName; onClick: () => void }[] = [
    {
      title: "Demo Login",
      description: "Explore the platform with sample data in one click.",
      cta: "Try Demo",
      icon: "bolt",
      onClick: onTryDemo,
    },
    {
      title: "Email Login",
      description: "Secure access with your email and password.",
      cta: "Use Email",
      icon: "mail",
      onClick: onUseEmail,
    },
    {
      title: "Wallet Access",
      description: "Connect your Web3 wallet for full on-chain access.",
      cta: "Connect Wallet",
      icon: "account_balance_wallet",
      onClick: onConnectWallet,
    },
  ];

  return (
    <aside className="hidden w-full max-w-sm flex-col gap-6 lg:flex">
      <div className="ur-card p-6">
        <h2 className="text-lg font-bold text-ur-navy">Access your way</h2>
        <div className="mt-5 space-y-4">
          {accessOptions.map((option) => (
            <div key={option.title} className="rounded-ur border border-ur-border bg-ur-card-soft p-4">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-ur-primary/10 text-ur-primary">
                <Icon name={option.icon} size={16} />
              </span>
              <h3 className="mt-3 text-sm font-bold text-ur-navy">{option.title}</h3>
              <p className="mt-1 text-xs text-ur-text-secondary">{option.description}</p>
              <button
                type="button"
                onClick={option.onClick}
                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-ur-sm border border-ur-border px-3 py-2 text-xs font-bold text-ur-navy transition-colors hover:border-ur-primary/50 hover:text-ur-primary"
              >
                {option.cta}
                <Icon name="arrow_forward" size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="ur-card grid grid-cols-2 gap-4 p-5">
        {trustBadges.map((badge) => (
          <div key={badge.title}>
            <Icon name={badge.icon} size={16} className="text-ur-primary" />
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
        <a href="/api-docs" className="hover:text-ur-mint">
          Docs
        </a>
      </div>
    </aside>
  );
}
