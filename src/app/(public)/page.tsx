import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { FluidShapes } from "@/components/ui/FluidShapes";
import { ServiceGrid } from "@/components/ui/ServiceGrid";
import { GlassCard } from "@/components/ui/GlassCard";
import { siteConfig, districts, services as fallbackServices } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { LocalBusinessSchema, FaqSchema } from "@/components/seo/SchemaJsonLd";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "İstanbul Organizasyon Firması | Söz, Nişan, Düğün & Doğum Günü",
    description:
      "İstanbul'da organizasyon firması: söz & nişan, doğum günü, sünnet, açılış, balon süsleme ve masa sandalye kiralama. 38 ilçede ücretsiz keşif için hemen arayın.",
    alternates: { canonical: "https://www.zahidemorganizasyon.com" },
    openGraph: {
      title: "İstanbul Organizasyon Firması | Söz, Nişan, Düğün & Doğum Günü",
      description:
        "Söz & nişan, doğum günü, sünnet, açılış ve balon süsleme — İstanbul 38 ilçede ücretsiz keşif.",
      type: "website",
      url: "https://www.zahidemorganizasyon.com",
    },
  };
}

export default async function HomePage() {
  let services: Array<{ title: string; slug: string; description: string; icon: string; image?: string | null }> = [];
  try {
    const dbServices = await prisma.service.findMany({ where: { isActive: true }, orderBy: { order: "asc" } });
    services = dbServices.map((s) => {
      const fallback = fallbackServices.find((f) => f.slug === s.slug);
      return {
        title: s.title,
        slug: s.slug,
        description: s.description,
        icon: s.icon,
        image: s.image || fallback?.image || undefined,
      };
    });
  } catch {}
  if (services.length === 0) {
    services = fallbackServices;
  }

  return (
    <>
      <LocalBusinessSchema />
      <FaqSchema questions={[
        { question: "İstanbul'da söz organizasyonu fiyatları ne kadar?", answer: "Fiyat konsept büyüklüğü, mekan ve ilçeye göre değişir. Telefonda ön fiyat veriyor, ücretsiz keşif sonrası net fiyat çıkarıyoruz: +90 531 663 29 30." },
        { question: "Evde söz ve nişan konsepti kuruyor musunuz?", answer: "Evet. Arka fon, gelin masası, çiçek, balon, masa sandalye ve ikram düzenini aynı gün kurup topluyoruz. 38 ilçeye hizmet veriyoruz." },
        { question: "Hangi bölgelere hizmet veriyorsunuz?", answer: "İstanbul'un Anadolu ve Avrupa yakası olmak üzere 38 ilçede hizmet vermekteyiz. Yoğun bölgeler: Sultanbeyli, Pendik, Kartal, Maltepe, Kadıköy, Üsküdar, Ataşehir." },
        { question: "Organizasyon için ne kadar önceden rezervasyon yapmalıyım?", answer: "En az 2-3 hafta öncesinden iletişime geçmenizi öneririz. Müsaitliğe göre aynı hafta kurulum da yapabiliyoruz." },
        { question: "Doğum günü ve sünnet organizasyonu da yapıyor musunuz?", answer: "Evet. Doğum günü, sünnet, açılış, kokteyl, piknik ve masa sandalye kiralama hizmetlerimiz de bulunmaktadır." },
      ]} />
      <HeroSection />
      <StatsSection />
      <ServiceGrid services={services} />
      <SeoContent services={services} />
      <AboutPreview />
      <FaqSection />
      <ContactBanner />
    </>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-primary/15">

      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[120px] animate-pulse"
        />
        <div
          className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary-light/20 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "4s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-primary/15 rounded-full"
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-primary/8 rounded-full"
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1300px] h-[1300px] border border-primary/5 rounded-full"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20 text-center">
        <div className="inline-flex items-center gap-2 glass-card !px-4 !py-2 !rounded-full text-sm text-muted mb-8">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          İstanbul&apos;un Profesyonel Organizasyon Firması
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold text-foreground leading-tight mb-6 max-w-5xl mx-auto">
          İstanbul Organizasyon Firması:{" "}
          <span className="text-gradient">Söz, Nişan, Düğün & Doğum Günü</span>
        </h1>

        <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10">
          Sultanbeyli merkezli ekibimizle İstanbul&apos;un 38 ilçesinde evde söz konsepti,
          doğum günü, sünnet, açılış ve balon süsleme — ücretsiz keşif, kurulum dahil.
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

function SeoContent({ services }: { services: Array<{ title: string; slug: string; description: string }> }) {
  const popularDistricts = ["Sultanbeyli", "Pendik", "Kartal", "Maltepe", "Üsküdar", "Kadıköy", "Ataşehir", "Çekmeköy", "Sancaktepe", "Tuzla", "Ümraniye", "Şile"];
  return (
    <section className="relative py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-headline font-bold text-foreground mb-4">
              İstanbul&apos;da Hangi Organizasyon Hizmetlerini Veriyoruz?
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              Sultanbeyli merkezli ekibimiz evde söz & nişan konseptinden doğum günü partisine,
              sünnet düğününden mağaza açılışına kadar uçtan uca kurulum yapar: konsept tasarım,
              balon ve çiçek süsleme, masa sandalye kurulumu, ikram düzeni ve gün akış yönetimi.
              Tüm fiyatlar konsept ve ilçe mesafesine göre netleşir — telefonda ön fiyat, keşifte net fiyat veriyoruz.
            </p>
            <ul className="grid sm:grid-cols-2 gap-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/hizmetler/${s.slug}`} className="text-sm text-foreground/80 hover:text-primary transition-colors">
                    → {s.title} İstanbul
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-headline font-bold text-foreground mb-4">
              Hangi İlçelere Hizmet Veriyoruz?
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              Anadolu ve Avrupa yakasında 38 ilçede kurulum yapıyoruz. En yoğun çalıştığımız
              bölgeler aşağıda — ilçe sayfasında o bölgeye özel konsept ve fiyat bilgisini bulursunuz.
            </p>
            <ul className="grid sm:grid-cols-2 gap-2">
              {popularDistricts.map((d) => (
                <li key={d}>
                  <Link href="/hizmetler/soz-nisan-konsepti" className="text-sm text-foreground/80 hover:text-primary transition-colors">
                    → {d} organizasyon
                  </Link>
                </li>
              ))}
            </ul>
          </div>
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
    { q: "İstanbul'da söz organizasyonu fiyatları ne kadar?", a: "Fiyat konsept büyüklüğü, mekan (ev/salon) ve ilçeye göre değişir. Telefonda ön fiyat veriyor, ücretsiz keşif sonrası net fiyat çıkarıyoruz. Ortalama evde söz konseptleri için bizi arayıp aynı gün fiyat alabilirsiniz: +90 531 663 29 30." },
    { q: "Evde söz ve nişan konsepti kuruyor musunuz?", a: "Evet, en çok yaptığımız iş evde söz & nişan kurulumu. Arka fon, gelin masası, çiçek, balon, masa sandalye ve ikram düzenini aynı gün kurup topluyoruz. Sultanbeyli merkezliyiz, 38 ilçeye gidiyoruz." },
    { q: "Hangi bölgelere hizmet veriyorsunuz?", a: "İstanbul'un Anadolu ve Avrupa yakası olmak üzere 38 ilçede hizmet vermekteyiz. Yoğun bölgelerimiz: Sultanbeyli, Pendik, Kartal, Maltepe, Kadıköy, Üsküdar, Ataşehir, Çekmeköy ve Tuzla." },
    { q: "Organizasyon için ne kadar önceden rezervasyon yapmalıyım?", a: "Yoğun dönemlere (Mayıs-Eylül, Sevgililer Günü) göre değişmekle birlikte en az 2-3 hafta öncesinden iletişime geçmenizi öneririz. Son dakika işler için de müsaitliğe göre aynı hafta kurulum yapabiliyoruz." },
    { q: "Fiyatlandırmanız nasıl?", a: "Her organizasyon özel olduğu için fiyatlarımız konsept, mekan ve hizmet kapsamına göre değişmektedir. Ücretsiz keşif ve net teklif için bizi arayabilirsiniz." },
    { q: "Doğum günü ve sünnet organizasyonu da yapıyor musunuz?", a: "Evet. Doğum günü (temalı konsept + balon süsleme), sünnet (taht, mevlüt düzeni, eğlence), açılış, kokteyl, piknik ve masa sandalye kiralama hizmetlerimiz de var. Tüm liste için Hizmetler sayfasına bakın." },
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
