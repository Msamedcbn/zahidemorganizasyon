import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminLayout } from "@/components/admin/AdminLayout";

export default async function AdminHizmetlerPage() {
  const session = await getSession();
  if (!session) redirect("/admin");

  let services: Awaited<ReturnType<typeof prisma.service.findMany>> = [];
  try {
    services = await prisma.service.findMany({ orderBy: { order: "asc" } });
  } catch {
    // Database not available
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-headline font-bold text-foreground">Hizmetler</h1>
          <p className="text-sm text-muted">Tüm hizmetleri yönetin</p>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left p-4 font-medium text-muted">Sıra</th>
              <th className="text-left p-4 font-medium text-muted">Başlık</th>
              <th className="text-left p-4 font-medium text-muted">Slug</th>
              <th className="text-left p-4 font-medium text-muted">Durum</th>
              <th className="text-right p-4 font-medium text-muted">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {services.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-muted">Henüz hizmet eklenmemiş.</td>
              </tr>
            ) : (
              services.map((s) => (
                <tr key={s.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4">{s.order}</td>
                  <td className="p-4 font-medium">{s.title}</td>
                  <td className="p-4 text-muted">{s.slug}</td>
                  <td className="p-4">
                    <span className={`text-xs ${s.isActive ? "text-green-500" : "text-muted"}`}>
                      {s.isActive ? "Aktif" : "Pasif"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-primary text-xs hover:underline">Düzenle</button>
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
