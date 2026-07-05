import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminStats } from "@/components/admin/AdminStats";

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
    recentMessages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });
    recentPosts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });
  } catch {
    // Database not available
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-headline font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted mt-1">Hoş geldiniz, {session.name || "Admin"}</p>
        </div>

        <AdminStats stats={stats} />

        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <h2 className="font-headline font-bold text-foreground mb-4">Son Mesajlar</h2>
            {recentMessages.length === 0 ? (
              <p className="text-sm text-muted">Henüz mesaj yok.</p>
            ) : (
              <div className="space-y-3">
                {recentMessages.map((msg) => (
                  <div key={msg.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${msg.isRead ? "bg-gray-300" : "bg-primary"}`} />
                      <span className="font-medium">{msg.name}</span>
                    </div>
                    <span className="text-xs text-muted">
                      {new Date(msg.createdAt).toLocaleDateString("tr-TR")}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="glass-card p-6">
            <h2 className="font-headline font-bold text-foreground mb-4">Son Blog Yazıları</h2>
            {recentPosts.length === 0 ? (
              <p className="text-sm text-muted">Henüz blog yazısı yok.</p>
            ) : (
              <div className="space-y-3">
                {recentPosts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between text-sm">
                    <span className="font-medium truncate max-w-[200px]">{post.title}</span>
                    <span className={`text-xs ${post.published ? "text-green-500" : "text-muted"}`}>
                      {post.published ? "Yayında" : "Taslak"}
                    </span>
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
