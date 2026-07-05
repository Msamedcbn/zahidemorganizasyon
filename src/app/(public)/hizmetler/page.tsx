import { Metadata } from "next";
import { services } from "@/lib/data";
import { ServiceGrid } from "@/components/ui/ServiceGrid";
import { FluidShapes } from "@/components/ui/FluidShapes";

export const metadata: Metadata = {
  title: "Hizmetlerimiz",
  description:
    "Söz, nişan, düğün, doğum günü, sünnet, açılış, kokteyl, balon süsleme, sandalye kiralama ve daha fazlası. İstanbul'un her noktasında profesyonel organizasyon hizmeti.",
};

export default function HizmetlerPage() {
  return (
    <div className="relative pt-32 pb-16 min-h-screen">
      <FluidShapes />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-4">
            Tüm Hizmetlerimiz
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            11 farklı kategoride, İstanbul&apos;un her noktasında profesyonel organizasyon çözümleri
          </p>
        </div>
        <ServiceGrid />
      </div>
    </div>
  );
}
