import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ServiceGrid } from "@/components/ui/ServiceGrid";
import { FluidShapes } from "@/components/ui/FluidShapes";
import { services as fallbackServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Hizmetlerimiz",
  description: "Doğum günü, mezuniyet, söz & nişan, sevgililer günü, açılış, masa sandalye kiralama, kokteyl, yapay ağaç dekoru, yapay çiçek dekoru, piknik, sünnet, balon aranjmanı. İstanbul'un her noktasında profesyonel organizasyon hizmeti.",
};

export default async function HizmetlerPage() {
  let services: Awaited<ReturnType<typeof prisma.service.findMany>> = [];
  try {
    services = await prisma.service.findMany({ where: { isActive: true }, orderBy: { order: "asc" } });
  } catch {}

  const displayServices = services.length > 0
    ? services.map((s) => ({ title: s.title, slug: s.slug, description: s.description, icon: s.icon, image: s.image || undefined }))
    : fallbackServices;

  return (
    <div className="relative pt-32 pb-16 min-h-screen">
      <FluidShapes />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-4">
            Tüm Hizmetlerimiz
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            12 farklı kategoride, İstanbul&apos;un her noktasında profesyonel organizasyon çözümleri
          </p>
        </div>
        <ServiceGrid services={displayServices} />
      </div>
    </div>
  );
}
