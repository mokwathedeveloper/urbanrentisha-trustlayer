import { Headset, ShieldCheck, Sparkles, Wallet } from "lucide-react";

const items = [
  { title: "Verified Properties", description: "All listings are verified", icon: ShieldCheck },
  { title: "Secure Payments", description: "Pay viewing fees securely", icon: Wallet },
  { title: "24/7 Support", description: "We're here to help", icon: Headset },
  { title: "Trusted Platform", description: "Build confidence with verified data", icon: Sparkles },
];

export function TrustStrip() {
  return (
    <div className="mt-8 grid gap-4 border-t border-ur-border pt-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.title} className="flex items-center gap-3">
          <item.icon className="h-5 w-5 text-ur-primary" />
          <div>
            <p className="text-sm font-bold text-ur-navy">{item.title}</p>
            <p className="text-xs text-ur-text-secondary">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
