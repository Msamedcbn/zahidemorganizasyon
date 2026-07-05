import { Metadata } from "next";
import { FluidShapes } from "@/components/ui/FluidShapes";
import { GlassCard } from "@/components/ui/GlassCard";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Zahidem Organizasyon, İstanbul'da söz, nişan, düğün, doğum günü ve kurumsal organizasyon hizmetleri sunan profesyonel bir firmadır.",
};

export default function HakkimizdaPage() {
  return (
    <div className="relative pt-32 pb-16 min-h-screen">
      <FluidShapes />
      <div className="relative max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-8 text-center">
          Hakkımızda
        </h1>

        <div className="space-y-8">
          <GlassCard className="p-8 md:p-12">
            <h2 className="text-2xl font-headline font-bold text-foreground mb-4">Zahidem Organizasyon</h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Zahidem Organizasyon olarak, yılların verdiği deneyim ve profesyonel ekibimizle
                İstanbul&apos;un her noktasında organizasyon hizmeti sunuyoruz.
              </p>
              <p>
                Söz, nişan, düğün, doğum günü, sünnet, açılış, kokteyl gibi özel günlerinizin
                yanı sıra kurumsal etkinliklerinizde de yanınızdayız. Her organizasyonu
                özenle planlıyor, hayal ettiğinizden daha fazlasını sunmak için çalışıyoruz.
              </p>
              <p>
                Müşteri memnuniyetini her şeyin önünde tutuyor, her detayı titizlikle
                yönetiyoruz. Sizin için en özel anı, en özel anılara dönüştürüyoruz.
              </p>
            </div>
          </GlassCard>

          <div className="grid md:grid-cols-2 gap-6">
            <GlassCard className="p-8">
              <h3 className="font-headline font-bold text-lg text-foreground mb-3">Misyonumuz</h3>
              <p className="text-sm text-muted leading-relaxed">
                Her müşterimizin hayalindeki organizasyonu, profesyonel yaklaşım ve yaratıcı
                çözümlerle gerçeğe dönüştürmek. Kaliteli hizmet anlayışımızla, her etkinliği
                unutulmaz kılmak.
              </p>
            </GlassCard>
            <GlassCard className="p-8">
              <h3 className="font-headline font-bold text-lg text-foreground mb-3">Vizyonumuz</h3>
              <p className="text-sm text-muted leading-relaxed">
                Türkiye&apos;nin en güvenilir ve tercih edilen organizasyon firması olmak.
                Yenilikçi trendleri takip ederek, her geçen gün hizmet kalitemizi artırmak.
              </p>
            </GlassCard>
          </div>

          <GlassCard className="p-8">
            <h3 className="font-headline font-bold text-lg text-foreground mb-4">Neden Biz?</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Profesyonel ve deneyimli ekip",
                "Size özel tasarım çözümler",
                "Uygun fiyat, kaliteli hizmet",
                "7/24 kesintisiz destek",
                "İstanbul genelinde hizmet",
                "Geniş ekipman ve malzeme ağı",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-muted">
                  <svg className="w-4 h-4 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
