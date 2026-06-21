import { Icon, type IconName } from "@/components/ui/icon";

const items: { title: string; description: string; icon: IconName }[] = [
  { title: "Verified Properties", description: "All listings are verified", icon: "verified_user" },
  { title: "Secure Payments", description: "Pay viewing fees securely", icon: "account_balance_wallet" },
  { title: "24/7 Support", description: "We're here to help", icon: "support_agent" },
  { title: "Trusted Platform", description: "Build confidence with verified data", icon: "auto_awesome" },
];

export function TrustStrip() {
  return (
    <div className="mt-8 grid gap-4 border-t border-ur-border pt-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.title} className="flex items-center gap-3">
          <Icon name={item.icon} size={20} className="text-ur-primary" />
          <div>
            <p className="text-sm font-bold text-ur-navy">{item.title}</p>
            <p className="text-xs text-ur-text-secondary">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
