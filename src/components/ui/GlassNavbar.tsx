import Link from "next/link";

export function GlassNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="glass mx-4 mt-4 rounded-2xl px-6 py-3 max-w-7xl lg:mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-headline font-bold text-primary">
              Zahidem
            </span>
            <span className="text-sm text-foreground/60 hidden sm:inline">
              Organizasyon
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-primary transition-colors">
              Ana Sayfa
            </Link>
            <Link href="/hakkimizda" className="hover:text-primary transition-colors">
              Hakkımızda
            </Link>
            <Link href="/#hizmetler" className="hover:text-primary transition-colors">
              Hizmetlerimiz
            </Link>
            <Link href="/galeri" className="hover:text-primary transition-colors">
              Galeri
            </Link>
            <Link href="/blog" className="hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="/iletisim" className="hover:text-primary transition-colors">
              İletişim
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:+905316632930"
              className="hidden sm:flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              +90 531 663 29 30
            </a>
            <a
              href="https://wa.me/905316632930"
              className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors"
            >
              Hemen Teklif Al
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
