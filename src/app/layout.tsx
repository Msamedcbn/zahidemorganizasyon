import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { GlassNavbar } from "@/components/ui/GlassNavbar";
import { Footer } from "@/components/ui/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Zahidem Organizasyon | Söz, Nişan, Düğün, Doğum Günü Organizasyonu",
    template: "%s | Zahidem Organizasyon",
  },
  description:
    "İstanbul'un her noktasında profesyonel organizasyon hizmeti. Söz, nişan, düğün, doğum günü, sünnet, açılış ve daha fazlası.",
  metadataBase: new URL("https://zahidemorganizasyon.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Zahidem Organizasyon",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background font-sans text-foreground">
        <GlassNavbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
