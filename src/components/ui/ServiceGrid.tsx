import Link from "next/link";
import { services } from "@/lib/data";
import { GlassCard } from "./GlassCard";

const iconMap: Record<string, React.ReactNode> = {
  Ring: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 2l4 4-4 4" /><path d="M3 11v-1a4 4 0 0 1 4-4h14" /><path d="M7 22l-4-4 4-4" /><path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </svg>
  ),
  Celebration: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Heart: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  Cake: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="8" r="2" /><path d="M12 2v2" /><path d="M18 8a6 6 0 0 1-12 0" />
    </svg>
  ),
  Stars: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Store: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Glass: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 21h8" /><path d="M12 17v4" /><path d="M17 3l-2.5 10H9.5L7 3" /><path d="M6.5 13A3.5 3.5 0 0 0 10 9.5" />
    </svg>
  ),
  Bubble: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="13" r="8" /><path d="M9 11a3 3 0 0 1 5 2" /><circle cx="7" cy="6" r="2" /><circle cx="18" cy="8" r="1" />
    </svg>
  ),
  Armchair: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 12V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6" /><path d="M3 12v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4" /><path d="M7 12h10" />
    </svg>
  ),
  Flag: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  ),
  Graduation: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
};

export function ServiceCard({
  title,
  slug,
  description,
  icon,
  image,
  index,
}: {
  title: string;
  slug: string;
  description: string;
  icon: string;
  image?: string;
  index: number;
}) {
  const isLarge = index === 0 || index === 3 || index === 7;
  const isWide = index === 2 || index === 6;

  return (
    <Link
      href={`/hizmetler/${slug}`}
      className={`group relative ${isLarge ? "md:col-span-2 md:row-span-2" : ""} ${isWide ? "md:col-span-2" : ""} ${!isLarge && !isWide ? "md:col-span-1" : ""}`}
    >
      <GlassCard className="h-full p-0 flex flex-col items-start justify-between min-h-[200px] md:min-h-[240px] relative overflow-hidden">
        {image && (
          <div className="relative w-full h-32 md:h-40 overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
        )}

        <div className="relative p-5 md:p-6 w-full">
          <div className="fluid-shape w-32 h-32 bg-primary/10 -top-10 -right-10 group-hover:scale-150 transition-transform duration-700" />

          <div className="relative">
            <div className="text-primary mb-3">{iconMap[icon] || iconMap.Ring}</div>
            <h3 className={`font-headline font-bold text-foreground mb-2 ${isLarge ? "text-xl" : "text-base"}`}>
              {title}
            </h3>
            <p className="text-muted text-xs leading-relaxed line-clamp-2">{description}</p>
          </div>

          <div className="relative mt-3 flex items-center gap-1 text-primary text-xs font-medium group-hover:gap-2 transition-all">
            Detaylı Bilgi
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}

export function ServiceGrid() {
  return (
    <section id="hizmetler" className="relative py-24 overflow-hidden">
      <div className="fluid-shape w-[600px] h-[600px] bg-primary/5 top-0 -left-48" />
      <div className="fluid-shape w-[400px] h-[400px] bg-primary/5 bottom-0 -right-32" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-headline font-bold text-foreground mb-4">
            Hizmetlerimiz
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            İstanbul&apos;un her noktasında, her tür etkinlik için profesyonel organizasyon çözümleri
          </p>
          <div className="w-20 h-0.5 bg-primary mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} {...service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
