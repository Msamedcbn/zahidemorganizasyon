import type { MetadataRoute } from "next";

const blockedBots = [
  "GPTBot",
  "ChatGPT-User",
  "CCBot",
  "Bytespider",
  "anthropic-ai",
  "ClaudeBot",
  "Claude-Web",
  "Google-Extended",
  "PetalBot",
  "SemrushBot",
  "AhrefsBot",
  "MJ12bot",
  "DotBot",
  "DataForSeoBot",
  "Amazonbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      ...blockedBots.map((userAgent) => ({ userAgent, disallow: "/" })),
    ],
    sitemap: "https://zahidemorganizasyon.com/sitemap.xml",
  };
}
