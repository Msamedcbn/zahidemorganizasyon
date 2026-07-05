import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminLayout } from "@/components/admin/AdminLayout";

export default async function AdminBlogPage() {
  const session = await getSession();
  if (!session) redirect("/admin");

  let posts: Awaited<ReturnType<typeof prisma.blogPost.findMany>> = [];
  try {
    posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    // Database not available
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-headline font-bold text-foreground">Blog Yazıları</h1>
          <p className="text-sm text-muted">Blog yazılarını yönetin</p>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left p-4 font-medium text-muted">Başlık</th>
              <th className="text-left p-4 font-medium text-muted">Kategori</th>
              <th className="text-left p-4 font-medium text-muted">Tarih</th>
              <th className="text-left p-4 font-medium text-muted">Durum</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-muted">Henüz blog yazısı yok.</td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4 font-medium">{post.title}</td>
                  <td className="p-4 text-muted text-xs">{post.category || "—"}</td>
                  <td className="p-4 text-muted text-xs">
                    {new Date(post.createdAt).toLocaleDateString("tr-TR")}
                  </td>
                  <td className="p-4">
                    <span className={`text-xs ${post.published ? "text-green-500" : "text-muted"}`}>
                      {post.published ? "Yayında" : "Taslak"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
