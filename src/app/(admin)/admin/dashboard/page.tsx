import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminStats } from "@/components/admin/AdminStats";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/admin");

  let stats = { services: 0, posts: 0, messages: 0, unreadMessages: 0, galleryItems: 0 };
  let recentMessages: Awaited<ReturnType<typeof prisma.contactMessage.findMany>> = [];
  let recentPosts: Awaited<ReturnType<typeof prisma.blogPost.findMany>> = [];

  try {
    stats = {
      services: await prisma.service.count(),
      posts: await prisma.blogPost.count(),
      messages: await prisma.contactMessage.count(),
      unreadMessages: await prisma.contactMessage.count({ where: { isRead: false } }),
      galleryItems: await prisma.galleryItem.count(),
    };
    recentMessages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 5 });
    recentPosts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" }, take: 5 });
  } catch {}

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-headline font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted mt-1">Hoş geldiniz, {session.name || "Admin"}</p>
        </div>

        <AdminStats stats={stats} />

        <div className="grid md:grid-cols-4 gap-4">
          <Link href="/admin/hizmetler" className="glass-card p-5 hover:bg-white/10 transition-colors group">
            <div className="text-xs text-muted mb-1">Hızlı Erişim</div>
            <div className="font-medium text-foreground group-hover:text-primary transition-colors">Hizmetleri Yönet</div>
          </Link>
          <Link href="/admin/blog" className="glass-card p-5 hover:bg-white/10 transition-colors group">
            <div className="text-xs text-muted mb-1">Hızlı Erişim</div>
            <div className="font-medium text-foreground group-hover:text-primary transition-colors">Blog Yazısı Ekle</div>
          </Link>
          <Link href="/admin/galeri" className="glass-card p-5 hover:bg-white/10 transition-colors group">
            <div className="text-xs text-muted mb-1">Hızlı Erişim</div>
            <div className="font-medium text-foreground group-hover:text-primary transition-colors">Galeriye Görsel Ekle</div>
          </Link>
          <Link href="/admin/ayarlar" className="glass-card p-5 hover:bg-white/10 transition-colors group">
            <div className="text-xs text-muted mb-1">Hızlı Erişim</div>
            <div className="font-medium text-foreground group-hover:text-primary transition-colors">Site Ayarları</div>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-headline font-bold text-foreground">Son Mesajlar</h2>
              {stats.unreadMessages > 0 && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{stats.unreadMessages} yeni</span>}
            </div>
            {recentMessages.length === 0 ? <p className="text-sm text-muted">Henüz mesaj yok.</p> : (
              <div className="space-y-3">
                {recentMessages.map((msg) => (
                  <Link key={msg.id} href="/admin/mesajlar" className="flex items-center justify-between text-sm hover:bg-white/5 p-2 rounded-lg transition-colors">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${msg.isRead ? "bg-gray-300" : "bg-primary"}`} />
                      <span className="font-medium">{msg.name}</span>
                    </div>
                    <span className="text-xs text-muted">{new Date(msg.createdAt).toLocaleDateString("tr-TR")}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-headline font-bold text-foreground">Son Blog Yazıları</h2>
              <Link href="/admin/blog" className="text-xs text-primary hover:underline">Tümü</Link>
            </div>
            {recentPosts.length === 0 ? <p className="text-sm text-muted">Henüz blog yazısı yok.</p> : (
              <div className="space-y-3">
                {recentPosts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between text-sm">
                    <span className="font-medium truncate max-w-[200px]">{post.title}</span>
                    <span className={`text-xs ${post.published ? "text-green-500" : "text-muted"}`}>{post.published ? "Yayında" : "Taslak"}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
