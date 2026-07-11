import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { GlassNavbar } from "@/components/ui/GlassNavbar";
import { Footer } from "@/components/ui/Footer";
import { prisma } from "@/lib/prisma";

const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

async function getSettings() {
  try {
    const settings = await prisma.siteSetting.findMany();
    const map: Record<string, string> = {};
    settings.forEach((s) => { map[s.key] = s.value; });
    return map;
  } catch {
    return {};
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  const siteName = s.siteName || "Zahidem Organizasyon";
  const description = s.seoDescription || "İstanbul'un her noktasında profesyonel organizasyon hizmeti. Doğum günü, mezuniyet, söz & nişan, sevgililer günü, açılış, masa sandalye kiralama, kokteyl, yapay ağaç çiçek dekoru, piknik, sünnet, balon aranjmanı.";
  const defaultTitle = s.seoTitle || `${siteName} | Söz, Nişan, Düğün, Doğum Günü Organizasyonu`;
  const logo = s.logo || "";

  return {
    title: { default: defaultTitle, template: `%s | ${siteName}` },
    description,
    metadataBase: new URL("https://zahidemorganizasyon.com"),
    alternates: { canonical: "/" },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      siteName,
      title: defaultTitle,
      description,
      url: "https://zahidemorganizasyon.com",
      ...(logo && { images: [{ url: logo, width: 512, height: 512, alt: siteName }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description,
      ...(logo && { images: [logo] }),
    },
    verification: { google: "google25ee5ff439ffbaa2" },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const s = await getSettings();
  const h = await headers();
  const pathname = h.get("x-url") || h.get("x-invoke-path") || h.get("next-url") || "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="tr" className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <head>
        {s.favicon && <link rel="icon" href={s.favicon} />}
        {s.googleAnalytics && (
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${s.googleAnalytics}`} />
        )}
        {s.googleAnalytics && (
          <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${s.googleAnalytics}');` }} />
        )}
      </head>
      <body className="min-h-full flex flex-col bg-background font-sans text-foreground">
        {!isAdmin && <GlassNavbar logo={s.logo} siteName={s.siteName} phone={s.phone} whatsapp={s.whatsapp} />}
        <main className="flex-1">{children}</main>
        {!isAdmin && <Footer logo={s.logo} siteName={s.siteName} phone={s.phone} email={s.email} address={s.address} instagram={s.instagram} facebook={s.facebook} youtube={s.youtube} whatsapp={s.whatsapp} />}
      </body>
    </html>
  );
}
