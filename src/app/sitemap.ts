import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { priorityDistricts } from "@/lib/data";
import { slugifyTr } from "@/lib/slugify";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://zahidemorganizasyon.com";
  const now = new Date();

  const staticPages = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/hakkimizda`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/hizmetler`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/galeri`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/iletisim`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
  ];

  let serviceSlugs: string[] = [];
  let blogSlugs: string[] = [];

  try {
    const services = await prisma.service.findMany({ where: { isActive: true }, select: { slug: true } });
    serviceSlugs = services.map((s) => s.slug);
    const posts = await prisma.blogPost.findMany({ where: { published: true }, select: { slug: true } });
    blogSlugs = posts.map((p) => p.slug);
  } catch {}

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
