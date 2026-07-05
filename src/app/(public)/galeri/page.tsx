import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { FluidShapes } from "@/components/ui/FluidShapes";
import { GlassCard } from "@/components/ui/GlassCard";

export const metadata: Metadata = {
  title: "Galeri",
  description: "Zahidem Organizasyon tarafından düzenlenen etkinliklerden kareler.",
};

export default async function GaleriPage() {
  let items: Awaited<ReturnType<typeof prisma.galleryItem.findMany>> = [];
  try {
    items = await prisma.galleryItem.findMany({
      orderBy: { order: "asc" },
    });
  } catch {
    // Database not available during build
  }

  return (
    <div className="relative pt-32 pb-16 min-h-screen">
      <FluidShapes />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-4">
            Galeri
          </h1>
          <p className="text-muted text-lg max-w-xl mx-auto">
            Organizasyonlarımızdan unutulmaz kareler
          </p>
          <div className="w-20 h-0.5 bg-primary mx-auto mt-6" />
        </div>

        {items.length === 0 ? (
          <GlassCard className="p-12 text-center">
            <p className="text-muted">
              Galeri henüz güncellenmedi. Instagram hesabımızı ziyaret edin.
            </p>
            <a
              href="https://www.instagram.com/zahidemorganizasyon"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-primary font-semibold hover:underline"
            >
              @zahidemorganizasyon
            </a>
          </GlassCard>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="break-inside-avoid">
                <GlassCard className="overflow-hidden p-0">
                  <div className="aspect-[4/3] bg-primary/5 flex items-center justify-center text-primary/30">
                    Görsel
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
        )}
      </div>
    </div>
  );
}
