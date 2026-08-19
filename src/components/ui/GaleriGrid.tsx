"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";

interface GalleryItem {
  id: string;
  image: string;
  caption: string | null;
  category: string | null;
}

export function GaleriGrid({ items }: { items: GalleryItem[] }) {
  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => { if (item.category) set.add(item.category); });
    return Array.from(set);
  }, [items]);

  const [active, setActive] = useState<string>("Tümü");

  const filtered = active === "Tümü" ? items : items.filter((item) => item.category === active);

  return (
    <div>
      {categories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {["Tümü", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                active === cat ? "bg-primary text-white" : "glass-card text-muted hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {filtered.map((item) => (
          <div key={item.id} className="break-inside-avoid">
            <GlassCard className="overflow-hidden p-0">
              <div className="relative aspect-[4/3] bg-primary/5">
                <Image
                  src={item.image}
                  alt={item.caption || "Zahidem Organizasyon etkinlik fotoğrafı"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              {item.caption && (
                <div className="p-3">
                  <p className="text-xs text-muted">{item.caption}</p>
                </div>
              )}
            </GlassCard>
          </div>
        ))}
      </div>
    </div>
  );
}
