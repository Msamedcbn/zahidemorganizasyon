import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // sharp'ın linux-x64 native binary'si (libvips) output file tracing tarafından
  // otomatik tespit edilemiyor; deploy edilen fonksiyona elle dahil ediyoruz.
  outputFileTracingIncludes: {
    "/api/admin/upload": ["./node_modules/@img/sharp-linux-x64/**", "./node_modules/@img/sharp-libvips-linux-x64/**"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-*.r2.dev",
      },
    ],
  },
  async redirects() {
    return [
      // Eski site (.html) URL'leri hâlâ arama motorlarında indeksli - en yakın karşılığa yönlendiriyoruz
      { source: "/sultanbeyli-nisan-organizasyonu.html", destination: "/blog/sultanbeyli-nisan-organizasyonu", permanent: true },
      { source: "/soz-masasi-susleme-istanbul.html", destination: "/hizmetler/soz-nisan-konsepti", permanent: true },
      { source: "/cekmekoy-surpriz-evlilik-teklifi-organizasyonu.html", destination: "/hizmetler/soz-nisan-konsepti/cekmekoy", permanent: true },
      { source: "/sile-surpriz-evlilik-teklifi-organizasyonu.html", destination: "/hizmetler/soz-nisan-konsepti/sile", permanent: true },
      { source: "/tuzla-soz-organizasyonu-firmasi.html", destination: "/hizmetler/soz-nisan-konsepti/tuzla", permanent: true },
      { source: "/nisan-organizasyonu-hizmeti", destination: "/hizmetler/soz-nisan-konsepti", permanent: true },
      // Eşleşmeyen diğer tüm eski .html sayfaları ana sayfaya yönlendiriyoruz (404 yerine)
      { source: "/:slug*.html", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
