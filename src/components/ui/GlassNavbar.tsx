"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface GlassNavbarProps {
  logo?: string;
  siteName?: string;
  phone?: string;
  whatsapp?: string;
}

const navLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/#hizmetler", label: "Hizmetlerimiz" },
  { href: "/galeri", label: "Galeri" },
  { href: "/blog", label: "Blog" },
  { href: "/iletisim", label: "İletişim" },
];

export function GlassNavbar({ logo, siteName = "Zahidem Organizasyon", phone = "+90 531 663 29 30", whatsapp = "905316632930" }: GlassNavbarProps) {
  const nameParts = siteName.split(" ");
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-background/95 backdrop-blur-md mx-4 mt-4 rounded-2xl px-6 py-3 max-w-7xl lg:mx-auto shadow-lg shadow-black/5 border border-white/20">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            {logo ? (
              <Image src={logo} alt={siteName} width={160} height={32} className="h-8 w-auto" priority />
            ) : (
              <>
                <span className="text-xl font-headline font-bold text-primary">{nameParts[0]}</span>
                {nameParts.length > 1 && <span className="text-sm text-foreground/60 hidden sm:inline">{nameParts.slice(1).join(" ")}</span>}
              </>
            )}
          </Link>

          <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-primary transition-colors">{link.label}</Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="hidden sm:flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              {phone}
            </a>
            <a href={`https://wa.me/${whatsapp}`} className="hidden sm:inline-block bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors">Hemen Teklif Al</a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={open}
              className="lg:hidden p-2 -mr-2 text-foreground hover:text-primary transition-colors"
            >
              {open ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
              )}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden mt-3 pt-3 border-t border-white/10 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-2 py-2.5 rounded-lg text-sm font-medium hover:bg-white/10 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-white/10">
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-2 px-2 py-2 text-sm font-semibold text-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                {phone}
              </a>
              <a href={`https://wa.me/${whatsapp}`} className="bg-primary text-white px-4 py-2.5 rounded-full text-sm font-semibold text-center hover:bg-primary-dark transition-colors">Hemen Teklif Al</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
