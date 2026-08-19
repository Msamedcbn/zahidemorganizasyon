import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { FluidShapes } from "@/components/ui/FluidShapes";
import { GlassCard } from "@/components/ui/GlassCard";
import { GaleriGrid } from "@/components/ui/GaleriGrid";

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
          <GaleriGrid items={items} />
        )}
      </div>
    </div>
  );
}
