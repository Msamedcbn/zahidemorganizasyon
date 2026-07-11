import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { siteConfig, districts, services as fallbackServices } from "@/lib/data";
import { GlassCard } from "@/components/ui/GlassCard";
import { FluidShapes } from "@/components/ui/FluidShapes";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ServiceSchema } from "@/components/seo/SchemaJsonLd";

export async function generateStaticParams() {
  try {
    const db = await prisma.service.findMany({ where: { isActive: true } });
    if (db.length > 0) return db.map((s) => ({ slug: s.slug }));
  } catch {}
  return fallbackServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  let title = "", description = "";
  try { const s = await prisma.service.findUnique({ where: { slug } }); if (s) { title = s.title; description = s.description; } } catch {}
  if (!title) { const s = fallbackServices.find((x) => x.slug === slug); if (s) { title = s.title; description = s.description; } }
  if (!title) return { title: "Sayfa Bulunamadı" };
  return { title: `${title} | Zahidem Organizasyon`, description, alternates: { canonical: `/hizmetler/${slug}` } };
}

export default async function HizmetDetayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let dbService: Awaited<ReturnType<typeof prisma.service.findUnique>> | null = null;
  try { dbService = await prisma.service.findUnique({ where: { slug } }); } catch {}

  const fallback = fallbackServices.find((s) => s.slug === slug);
  const service = dbService || fallback;
  if (!service) notFound();

  const title = service.title;
  const description = service.description;
  const longDescription = "longDescription" in service ? (service as any).longDescription : undefined;
  const gallery: string[] = (dbService && (dbService as any).gallery) ? JSON.parse((dbService as any).gallery) : [];

  let otherServices: Array<{ id?: string; slug: string; title: string; description: string }> = [];
  if (dbService) {
    try {
      otherServices = (await prisma.service.findMany({ where: { isActive: true, id: { not: dbService.id } }, orderBy: { order: "asc" }, take: 5 })) as any;
    } catch {}
  } else {
    otherServices = fallbackServices.filter((s) => s.slug !== slug).slice(0, 5);
  }

  return (
    <div className="relative pt-32 pb-16 min-h-screen">
      <FluidShapes />
      <ServiceSchema title={title} description={description} slug={slug} />
      <div className="relative max-w-7xl mx-auto px-6">
        <Breadcrumbs items={[
          { name: "Ana Sayfa", url: "/" },
          { name: "Hizmetlerimiz", url: "/hizmetler" },
          { name: title, url: `/hizmetler/${slug}` },
        ]} />
        <div className="mb-8">
          <Link href="/hizmetler" className="text-sm text-muted hover:text-primary transition-colors flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
            Hizmetlere Dön
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-10 mb-20">
          <div className="md:col-span-2">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-6">{title}</h1>
            <div className="prose prose-lg max-w-none text-muted leading-relaxed space-y-4">
              <p className="text-xl text-foreground/80 font-medium">{description}</p>
              {longDescription && <p>{longDescription}</p>}
              <p>Zahidem Organizasyon olarak, {title.toLowerCase()} hizmetimizde kaliteyi, müşteri memnuniyetini ve hayal ettiğiniz organizasyonu gerçeğe dönüştürmeyi ön planda tutuyoruz.</p>
            </div>
          </div>

          <div>
            <GlassCard className="p-6 sticky top-28">
              <h3 className="font-headline font-bold text-lg mb-4">Hemen Teklif Alın</h3>
              <div className="space-y-4">
                <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  {siteConfig.phone}
                </a>
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary shrink-0"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  {siteConfig.email}
                </a>
                <a href="https://wa.me/905316632930" className="w-full bg-primary text-white px-4 py-3 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors text-center block">WhatsApp&apos;tan Yaz</a>
              </div>
            </GlassCard>
          </div>
        </div>

        {gallery.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-headline font-bold text-foreground mb-8">{title} Galerisi</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((url, i) => (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="group aspect-[4/3] rounded-xl overflow-hidden glass-card !p-0">
                  <img src={url} alt={`${title} ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="mb-16">
          <h2 className="text-2xl font-headline font-bold text-foreground mb-8">Hizmet Bölgelerimiz</h2>
          <div className="flex flex-wrap gap-2">
            {districts.map((d) => <span key={d} className="glass-card !px-3 !py-1.5 text-xs text-muted">{d}</span>)}
          </div>
        </div>

        {otherServices.length > 0 && (
          <div>
            <h2 className="text-2xl font-headline font-bold text-foreground mb-8">Diğer Hizmetlerimiz</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {otherServices.map((s) => (
                <Link key={s.slug} href={`/hizmetler/${s.slug}`}>
                  <GlassCard className="p-4 text-center h-full">
                    <div className="text-sm font-medium">{s.title}</div>
                    <div className="text-xs text-muted mt-1">{s.description.slice(0, 40)}...</div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
