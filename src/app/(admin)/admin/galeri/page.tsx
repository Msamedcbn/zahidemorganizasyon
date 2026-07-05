import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminLayout } from "@/components/admin/AdminLayout";

export default async function AdminGaleriPage() {
  const session = await getSession();
  if (!session) redirect("/admin");

  let items: Awaited<ReturnType<typeof prisma.galleryItem.findMany>> = [];
  try {
    items = await prisma.galleryItem.findMany({ orderBy: { order: "asc" } });
  } catch {
    // Database not available
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-headline font-bold text-foreground">Galeri</h1>
          <p className="text-sm text-muted">Galeri görsellerini yönetin</p>
        </div>
      </div>

      <div className="glass-card p-6">
        {items.length === 0 ? (
          <p className="text-center text-muted py-12">Henüz galeri öğesi yok.</p>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {items.map((item) => (
              <div key={item.id} className="aspect-square bg-primary/5 rounded-lg flex items-center justify-center text-primary/30 text-xs relative group">
                Görsel
                {item.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity truncate">
                    {item.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
