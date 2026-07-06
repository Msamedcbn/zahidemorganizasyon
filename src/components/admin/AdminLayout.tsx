"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/admin/mesajlar")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUnreadCount(data.filter((m: any) => !m.isRead).length);
        }
      })
      .catch(() => {});
  }, [pathname]);

  return (
    <div className="min-h-screen flex bg-background">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} unreadCount={unreadCount} />
      <div className="flex-1 lg:ml-64 p-4 sm:p-8 pt-20 lg:pt-8">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-[60] w-10 h-10 rounded-xl glass-card flex items-center justify-center text-foreground"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
  { href: "/admin/hizmetler", label: "Hizmetler", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
  { href: "/admin/blog", label: "Blog Yazıları", icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8" },
  { href: "/admin/galeri", label: "Galeri", icon: "M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" },
  { href: "/admin/mesajlar", label: "Mesajlar", icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" },
  { href: "/admin/kategoriler", label: "Kategoriler", icon: "M4 6h16M4 12h16M4 18h16" },
  { href: "/admin/ayarlar", label: "Ayarlar", icon: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" },
];

function AdminSidebar({ open, onClose, unreadCount }: { open: boolean; onClose: () => void; unreadCount: number }) {
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin";
  };

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/50 z-[55] lg:hidden" onClick={onClose} />}
      <aside className={`fixed left-0 top-0 bottom-0 w-64 glass-card !rounded-none !border-0 border-r border-white/20 p-6 z-[60] flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="mb-8">
          <Link href="/admin/dashboard" className="text-xl font-headline font-bold text-primary">Zahidem Panel</Link>
        </div>

        <nav className="space-y-1 flex-1">
          {links.map((link) => {
            const isActive = pathname === link.href || pathname?.startsWith(link.href + "/");
            return (
              <Link key={link.href} href={link.href} onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${isActive ? "bg-primary/15 text-primary font-medium" : "text-muted hover:text-foreground hover:bg-white/10"}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0"><path d={link.icon} /></svg>
                {link.label}
                {link.href === "/admin/mesajlar" && unreadCount > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center">{unreadCount}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-2 mt-auto">
          <Link href="/" onClick={onClose}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-muted hover:text-foreground hover:bg-white/10 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
            Siteye Dön
          </Link>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
            Çıkış Yap
          </button>
        </div>
      </aside>
    </>
  );
}
