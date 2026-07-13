import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { siteConfig, districts, priorityDistricts, services as fallbackServices } from "@/lib/data";
import { slugifyTr } from "@/lib/slugify";
import { GlassCard } from "@/components/ui/GlassCard";
import { FluidShapes } from "@/components/ui/FluidShapes";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ServiceSchema } from "@/components/seo/SchemaJsonLd";

export const revalidate = 604800;

const districtBySlug = new Map(districts.map((d) => [slugifyTr(d), d]));

const introTemplates = (district: string, title: string, description: string) => [
  `${district} bölgesinde ${title.toLocaleLowerCase("tr")} arayışındaysanız doğru yerdesiniz. Zahidem Organizasyon olarak ${district} ve çevresinde ${description.toLocaleLowerCase("tr")}`,
  `${district}'de unutulmaz bir ${title.toLocaleLowerCase("tr")} için profesyonel destek mi arıyorsunuz? Ekibimiz ${district} genelinde ${description.toLocaleLowerCase("tr")}`,
  `İstanbul'un ${district} ilçesinde ${title.toLocaleLowerCase("tr")} hizmeti sunan Zahidem Organizasyon, ${description.toLocaleLowerCase("tr")}`,
];

export async function generateStaticParams() {
  const params: { slug: string; ilce: string }[] = [];
  let serviceSlugs: string[] = fallbackServices.map((s) => s.slug);
  try {
    const db = await prisma.service.findMany({ where: { isActive: true }, select: { slug: true } });
    if (db.length > 0) serviceSlugs = db.map((s) => s.slug);
  } catch {}

  for (const slug of serviceSlugs) {
    for (const district of priorityDistricts) {
      params.push({ slug, ilce: slugifyTr(district) });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; ilce: string }> }): Promise<Metadata> {
  const { slug, ilce } = await params;
  const district = districtBySlug.get(ilce);
  if (!district) return { title: "Sayfa Bulunamadı" };

  let title = "", description = "";
  try {
    const s = await prisma.service.findUnique({ where: { slug } });
    if (s) { title = s.title; description = s.description; }
  } catch {}
  if (!title) {
    const s = fallbackServices.find((x) => x.slug === slug);
    if (s) { title = s.title; description = s.description; }
  }
  if (!title) return { title: "Sayfa Bulunamadı" };

  const pageTitle = `${district} ${title} | Zahidem Organizasyon`;
  const pageDescription = `${district} bölgesinde profesyonel ${title.toLocaleLowerCase("tr")} hizmeti. ${description}`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: { canonical: `/hizmetler/${slug}/${ilce}` },
    openGraph: { title: pageTitle, description: pageDescription, type: "website" },
  };
}

export default async function HizmetIlcePage({ params }: { params: Promise<{ slug: string; ilce: string }> }) {
  const { slug, ilce } = await params;
  const district = districtBySlug.get(ilce);
  if (!district) notFound();

  let dbService: Awaited<ReturnType<typeof prisma.service.findUnique>> | null = null;
  try { dbService = await prisma.service.findUnique({ where: { slug } }); } catch {}
  const fallback = fallbackServices.find((s) => s.slug === slug);
  const service = dbService || fallback;
  if (!service) notFound();

  const title = service.title;
  const description = service.description;
  const longDescription = "longDescription" in service ? (service as { longDescription?: string }).longDescription : undefined;

  const variantIndex = (district.length + slug.length) % 3;
  const intro = introTemplates(district, title, description)[variantIndex];

  const nearbyDistricts = districts.filter((d) => d !== district).slice(0, 8);

  return (
    <div className="relative pt-32 pb-16 min-h-screen">
      <FluidShapes />
      <ServiceSchema title={`${district} ${title}`} description={description} slug={`${slug}/${ilce}`} district={district} />
      <div className="relative max-w-7xl mx-auto px-6">
        <Breadcrumbs items={[
          { name: "Ana Sayfa", url: "/" },
          { name: "Hizmetlerimiz", url: "/hizmetler" },
          { name: title, url: `/hizmetler/${slug}` },
          { name: district, url: `/hizmetler/${slug}/${ilce}` },
        ]} />

        <div className="grid md:grid-cols-3 gap-10 mb-20">
          <div className="md:col-span-2">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-6">
              {district} {title}
            </h1>
            <div className="prose prose-lg max-w-none text-muted leading-relaxed space-y-4">
              <p className="text-xl text-foreground/80 font-medium">{intro}</p>
              {longDescription && <p>{longDescription}</p>}
              <p>
                {district} ve çevresindeki mahallelerde 12+ yıllık deneyimimizle mekan seçiminden dekorasyona,
                ikramdan organizasyon gününün akışına kadar tüm süreci sizin adınıza yönetiyoruz. {district}&apos;deki
                mekanları ve tedarikçileri yakından tanıyan ekibimiz, bütçenize en uygun çözümü sunar.
              </p>
            </div>
          </div>

          <div>
            <GlassCard className="p-6 sticky top-28">
              <h3 className="font-headline font-bold text-lg mb-4">{district}&apos;den Hemen Teklif Alın</h3>
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

        <div className="mb-16">
          <h2 className="text-2xl font-headline font-bold text-foreground mb-8">
            {district} Çevresinde Hizmet Verdiğimiz Diğer İlçeler
          </h2>
          <div className="flex flex-wrap gap-2">
            {nearbyDistricts.map((d) => (
              <Link key={d} href={`/hizmetler/${slug}/${slugifyTr(d)}`} className="glass-card !px-3 !py-1.5 text-xs text-muted hover:text-primary transition-colors">
                {d}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-headline font-bold text-foreground mb-8">Diğer Hizmetlerimiz</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {fallbackServices.filter((s) => s.slug !== slug).slice(0, 5).map((s) => (
              <Link key={s.slug} href={`/hizmetler/${s.slug}`}>
                <GlassCard className="p-4 text-center h-full">
                  <div className="text-sm font-medium">{s.title}</div>
                  <div className="text-xs text-muted mt-1">{s.description.slice(0, 40)}...</div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
