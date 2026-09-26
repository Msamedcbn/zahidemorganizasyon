import type { MetadataRoute } from "next";

// GEO (Generative Engine Optimization) için AI arama motorlarına (ChatGPT Search, Perplexity, Claude, Gemini)
// izin verilir. Sadece agresif veri madenciliği ve ticari scraper botları engellenir.
const blockedScrapers = [
  "CCBot",
  "Bytespider",
  "PetalBot",
  "SemrushBot",
  "AhrefsBot",
  "MJ12bot",
  "DotBot",
  "DataForSeoBot",
  "Amazonbot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      // GEO Arama Motorları (ChatGPT Search, Perplexity, Gemini, Claude)
      {
        userAgent: ["GPTBot", "ChatGPT-User", "OAI-SearchBot", "PerplexityBot", "ClaudeBot", "Google-Extended"],
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      ...blockedScrapers.map((userAgent) => ({ userAgent, disallow: "/" })),
    ],
    sitemap: "https://www.zahidemorganizasyon.com/sitemap.xml",
  };
}
