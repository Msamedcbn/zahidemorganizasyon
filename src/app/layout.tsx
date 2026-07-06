import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
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
  return {
    title: { default: s.seoTitle || "Zahidem Organizasyon | Söz, Nişan, Düğün, Doğum Günü Organizasyonu", template: "%s | Zahidem Organizasyon" },
    description: s.seoDescription || "İstanbul'un her noktasında profesyonel organizasyon hizmeti. Söz, nişan, düğün, doğum günü, sünnet, açılış ve daha fazlası.",
    metadataBase: new URL("https://zahidemorganizasyon.com"),
    alternates: { canonical: "/" },
    openGraph: { type: "website", locale: "tr_TR", siteName: s.siteName || "Zahidem Organizasyon" },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const s = await getSettings();

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
        <GlassNavbar logo={s.logo} siteName={s.siteName} phone={s.phone} whatsapp={s.whatsapp} />
        <main className="flex-1">{children}</main>
        <Footer logo={s.logo} siteName={s.siteName} phone={s.phone} email={s.email} address={s.address} instagram={s.instagram} facebook={s.facebook} youtube={s.youtube} whatsapp={s.whatsapp} />
      </body>
    </html>
  );
}
