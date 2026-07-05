import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminLayout } from "@/components/admin/AdminLayout";

export default async function AdminAyarlarPage() {
  const session = await getSession();
  if (!session) redirect("/admin");

  let map: Record<string, string> = {};
  try {
    const settings = await prisma.siteSetting.findMany();
    settings.forEach((s) => { map[s.key] = s.value; });
  } catch {
    // Database not available
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <div className="mb-8">
          <h1 className="text-2xl font-headline font-bold text-foreground">Ayarlar</h1>
          <p className="text-sm text-muted">Site ayarlarını yönetin</p>
        </div>

        <div className="glass-card p-6">
          <p className="text-sm text-muted mb-4">Site ayarları (geliştirme aşamasında)</p>
          <div className="space-y-3">
            {Object.entries(map).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between text-sm py-2 border-b border-white/5">
                <span className="font-medium">{key}</span>
                <span className="text-muted">{value}</span>
              </div>
            ))}
            {Object.keys(map).length === 0 && (
              <p className="text-xs text-muted">Henüz ayar eklenmemiş.</p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
