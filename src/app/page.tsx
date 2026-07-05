import Image from "next/image";
import Link from "next/link";
import { FluidShapes } from "@/components/ui/FluidShapes";
import { ServiceGrid } from "@/components/ui/ServiceGrid";
import { GlassCard } from "@/components/ui/GlassCard";
import { siteConfig, districts } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServiceGrid />
      <AboutPreview />
      <FaqSection />
      <ContactBanner />
    </>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0">
        <img
          src="/images/hero-atmosphere.jpg"
          alt=""
          className="w-full h-full object-cover object-center md:object-[center_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-background/40 to-primary-dark/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent md:from-background/90" />
      </div>

      <div className="absolute inset-0">
        <div
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse"
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/10 rounded-full"
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/5 rounded-full"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20 text-center">
        <div className="inline-flex items-center gap-2 glass-card !px-4 !py-2 !rounded-full text-sm text-muted mb-8">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          İstanbul&apos;un Profesyonel Organizasyon Firması
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold text-foreground leading-tight mb-6 max-w-5xl mx-auto">
          En Özel Anlarınızı{" "}
          <span className="text-gradient">En Özel Anılara</span>{" "}
          Dönüştürüyoruz
        </h1>

        <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10">
          İstanbul&apos;un her noktasında, sözden düğüne, doğum gününden kurumsal etkinliklere kadar
          profesyonel organizasyon hizmeti.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/#hizmetler"
            className="bg-primary text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
          >
            Hizmetlerimizi İnceleyin
          </Link>
          <a
            href="https://wa.me/905316632930"
            className="glass-card !px-8 !py-4 !rounded-full text-base font-semibold hover:!bg-white/25 transition-colors"
          >
            Hemen Teklif Alın
          </a>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: "250+", label: "Mutlu Müşteri" },
            { value: "11", label: "Hizmet Türü" },
            { value: "38", label: "İstanbul İlçesi" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl md:text-4xl font-headline font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-xs text-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      <FluidShapes />
    </section>
  );
}

function StatsSection() {
  return (
    <section className="relative py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "12+", label: "Yıllık Deneyim", desc: "Sektörde güvenilir ve köklü hizmet" },
            { value: "500+", label: "Etkinlik", desc: "Başarıyla tamamlanmış organizasyon" },
            { value: "38", label: "İstanbul İlçesi", desc: "Anadolu ve Avrupa yakasında hizmet" },
            { value: "7/24", label: "Destek", desc: "Kesintisiz müşteri iletişimi" },
          ].map((stat) => (
            <GlassCard key={stat.label} className="p-6 text-center">
              <div className="text-3xl font-headline font-bold text-primary mb-1">{stat.value}</div>
              <div className="font-semibold text-sm mb-1">{stat.label}</div>
              <div className="text-xs text-muted">{stat.desc}</div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutPreview() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="fluid-shape w-[500px] h-[500px] bg-primary/5 -top-32 right-0" />
      <div className="fluid-shape w-[300px] h-[300px] bg-primary/5 bottom-0 left-0" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-headline font-bold text-foreground mb-6">
              Neden <span className="text-gradient">Zahidem Organizasyon</span>?
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Zahidem Organizasyon olarak, her etkinliğin özel ve benzersiz olduğuna inanıyoruz.
                Bu yüzden her müşterimize özel çözümler sunuyor, hayallerindeki organizasyonu
                gerçeğe dönüştürüyoruz.
              </p>
              <p>
                İstanbul&apos;un Anadolu ve Avrupa yakasında 38 ilçede hizmet veren ekibimiz,
                söz organizasyonundan düğüne, doğum gününden kurumsal etkinliklere kadar
                11 farklı alanda profesyonel hizmet sunmaktadır.
              </p>
            </div>
            <Link
              href="/hakkimizda"
              className="inline-flex items-center gap-2 mt-6 text-primary font-semibold hover:gap-3 transition-all"
            >
              Daha Fazla Bilgi
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "Profesyonel Ekip", desc: "Deneyimli ve uzman kadro" },
              { title: "Özel Tasarım", desc: "Size özel konsept çözümler" },
              { title: "Uygun Fiyat", desc: "Kaliteli hizmet, makul fiyat" },
              { title: "7/24 Destek", desc: "Kesintisiz iletişim ve destek" },
            ].map((item) => (
              <GlassCard key={item.title} className="p-5">
                <h3 className="font-headline font-bold text-foreground mb-1">{item.title}</h3>
                <p className="text-xs text-muted">{item.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const faqs = [
    { q: "Hangi bölgelere hizmet veriyorsunuz?", a: "İstanbul'un Anadolu ve Avrupa yakası olmak üzere 38 ilçede hizmet vermekteyiz." },
    { q: "Organizasyon için ne kadar önceden rezervasyon yapmalıyım?", a: "Yoğun dönemlere göre değişmekle birlikte, en az 2-3 hafta öncesinden iletişime geçmenizi öneririz." },
    { q: "Fiyatlandırmanız nasıl?", a: "Her organizasyon özel olduğu için fiyatlarımız konsept, mekan ve hizmet kapsamına göre değişmektedir. Ücretsiz keşif ve teklif için bizi arayabilirsiniz." },
    { q: "Hangi hizmetleri sunuyorsunuz?", a: "Söz, nişan, düğün, doğum günü, sünnet, açılış, kokteyl, balon süsleme, sandalye kiralama, asker uğurlama ve mezuniyet organizasyonu hizmetlerimiz bulunmaktadır." },
  ];

  return (
    <section className="relative py-24">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-headline font-bold text-foreground mb-4">
            Sıkça Sorulan Sorular
          </h2>
          <div className="w-20 h-0.5 bg-primary mx-auto mt-6" />
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <details key={i} className="glass-card !p-0 group [&_[open]]:!bg-white/20">
              <summary className="px-6 py-4 font-medium cursor-pointer list-none flex items-center justify-between [&::-webkit-details-marker]:hidden">
                <span>{faq.q}</span>
                <svg
                  className="w-5 h-5 text-primary transition-transform group-open:rotate-180"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-sm text-muted leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactBanner() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="fluid-shape w-[600px] h-[600px] bg-primary/10 -top-48 -right-48" />
      <div className="fluid-shape w-[400px] h-[400px] bg-primary/5 -bottom-32 -left-32" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <GlassCard className="!p-12 md:!p-16">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground mb-4">
            Hayalinizdeki Organizasyon İçin
          </h2>
          <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
            Profesyonel ekibimizle tanışmak ve ücretsiz keşif teklifi almak için hemen iletişime geçin.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+905316632930"
              className="bg-primary text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-primary-dark transition-colors"
            >
              {siteConfig.phone}
            </a>
            <a
              href="/iletisim"
              className="glass-card !px-8 !py-4 !rounded-full text-base font-semibold hover:!bg-white/25 transition-colors"
            >
              İletişim Formu
            </a>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
