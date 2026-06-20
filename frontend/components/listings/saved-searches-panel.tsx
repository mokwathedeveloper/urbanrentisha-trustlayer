import { Bookmark, Heart, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

const savedSearches = [
  { title: "Lekki 2-3 Beds", criteria: "500K - 2M • 2-3 Beds", note: "Verified Only • Up to 10K", count: 12 },
  { title: "Victoria Island Luxury", criteria: "1M+ • 3+ Beds", note: "Verified Only", count: 8 },
  { title: "Affordable Apartments", criteria: "Up to 500K • Any Beds", note: "Verified Only", count: 24 },
];

const tips = [
  "Use specific neighborhoods for more accurate results",
  "Adjust viewing fee range to find more options",
  "Verified properties have lower scam risk",
];

export function SavedSearchesPanel() {
  return (
    <aside className="hidden w-72 shrink-0 flex-col gap-5 xl:flex">
      <div className="ur-card p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-ur-navy">Saved Searches</h2>
          <button type="button" className="text-sm font-semibold text-ur-mint hover:underline">
            View All
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {savedSearches.map((search) => (
            <div key={search.title} className="rounded-ur border border-ur-border bg-ur-card-soft p-3">
              <div className="flex items-start justify-between">
                <p className="text-sm font-bold text-ur-navy">{search.title}</p>
                <Heart className="h-4 w-4 fill-ur-primary text-ur-primary" />
              </div>
              <p className="mt-1 text-xs text-ur-text-secondary">{search.criteria}</p>
              <p className="text-xs text-ur-text-secondary">{search.note}</p>
              <p className="mt-1 text-xs font-semibold text-ur-mint">{search.count} properties</p>
            </div>
          ))}
        </div>

        <Button variant="outline" className="mt-4 w-full">
          <Bookmark className="h-4 w-4" />
          Save Current Search
        </Button>
      </div>

      <div className="ur-card p-5">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-ur-warning" />
          <h2 className="font-bold text-ur-navy">Tips for better results</h2>
        </div>
        <ul className="mt-3 space-y-2">
          {tips.map((tip) => (
            <li key={tip} className="flex items-start gap-2 text-xs text-ur-text-secondary">
              <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-ur-primary" />
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
