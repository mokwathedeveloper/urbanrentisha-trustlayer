import { Camera, ImageIcon, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const galleryItems = ["Main living room", "Bedroom suite", "Kitchen", "Balcony"];

export function PropertyGallery() {
  return (
    <section className="overflow-hidden rounded-ur-xl border border-white/10 bg-white/[0.035] p-4 shadow-soft-dark backdrop-blur-xl">
      <div className="grid gap-3 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="relative min-h-[360px] overflow-hidden rounded-ur-lg bg-gradient-to-br from-emerald-950 via-emerald-800/45 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_34%,rgba(52,211,153,0.30),transparent_28%)]" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2"><Badge variant="success"><ShieldCheck className="h-3.5 w-3.5" />Verified photos</Badge><Badge variant="neutral"><Camera className="h-3.5 w-3.5" />12 images</Badge></div>
          <div className="absolute bottom-5 left-5 right-5 rounded-ur-lg border border-white/10 bg-black/32 p-5 backdrop-blur"><p className="text-xs font-bold uppercase tracking-[0.14em] text-white/44">Featured image</p><h2 className="mt-1 text-2xl font-black tracking-[-0.04em] text-white">Bright verified apartment interior</h2><p className="mt-2 max-w-[520px] text-sm leading-6 text-white/58">Professional listing media is treated as part of property verification.</p></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {galleryItems.map((item, index) => (
            <div key={item} className="relative min-h-[170px] overflow-hidden rounded-ur-lg border border-white/10 bg-gradient-to-br from-ur-card via-emerald-950/60 to-black">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(22,163,74,0.24),transparent_32%)]" />
              <div className="absolute inset-0 grid place-items-center text-white/32"><ImageIcon className="h-10 w-10" /></div>
              <div className="absolute bottom-3 left-3 right-3"><p className="rounded-ur-sm border border-white/10 bg-black/28 px-3 py-2 text-xs font-bold text-white/70 backdrop-blur">{index + 1}. {item}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
