import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://zahidemorganizasyon.com";

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/hakkimizda`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/hizmetler`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/galeri`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/iletisim`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
  ];

  const serviceSlugs = [
    "soz-organizasyonu", "nisan-organizasyonu", "dugun-organizasyonu",
    "dogum-gunu-organizasyonu", "sunnet-organizasyonu", "acilis-organizasyonu",
    "kokteyl-organizasyonu", "balon-susleme", "sandalye-kiralama",
    "asker-ugurlama", "mezuniyet-toreni",
  ];

  const servicePages = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/hizmetler/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages];
}
