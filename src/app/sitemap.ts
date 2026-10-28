import type { MetadataRoute } from "next";
import { getActiveServices, getPublishedPosts } from "@/lib/site-data";
import { priorityDistricts, services as fallbackServices } from "@/lib/data";
import { slugifyTr } from "@/lib/slugify";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.zahidemorganizasyon.com";
  const now = new Date();

  const staticPages = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/hakkimizda`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/hizmetler`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/galeri`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/iletisim`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
  ];

  let serviceSlugs: string[] = fallbackServices.map((s) => s.slug);
  let blogSlugs: string[] = [];

  const services = await getActiveServices();
  if (services.length > 0) serviceSlugs = services.map((s) => s.slug);
  const posts = await getPublishedPosts();
  if (posts.length > 0) blogSlugs = posts.map((p) => p.slug);

  const servicePages = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/hizmetler/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPages = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Sadece arama hacmi olan ilçeler sitemap'e girer (~12 hizmet × 12 ilçe).
  // Noindex ilçeler crawl bütçesini tüketmesin diye dışarıda bırakıldı.
  const districtServicePages = serviceSlugs.flatMap((slug) =>
    priorityDistricts.map((district) => ({
      url: `${baseUrl}/hizmetler/${slug}/${slugifyTr(district)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [...staticPages, ...servicePages, ...blogPages, ...districtServicePages];
}
