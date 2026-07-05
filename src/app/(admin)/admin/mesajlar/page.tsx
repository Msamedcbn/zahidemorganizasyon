import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminLayout } from "@/components/admin/AdminLayout";

export default async function AdminMesajlarPage() {
  const session = await getSession();
  if (!session) redirect("/admin");

  let messages: Awaited<ReturnType<typeof prisma.contactMessage.findMany>> = [];
  try {
    messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    // Database not available
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-headline font-bold text-foreground">Mesajlar</h1>
          <p className="text-sm text-muted">Gelen iletişim formu mesajları</p>
        </div>
      </div>

      <div className="space-y-3">
        {messages.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <p className="text-muted">Henüz mesaj yok.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`glass-card p-5 ${!msg.isRead ? "border-l-2 border-l-primary" : ""}`}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="font-medium text-foreground">{msg.name}</span>
                  <span className="text-xs text-muted ml-3">{msg.email}</span>
                  {msg.phone && <span className="text-xs text-muted ml-2">{msg.phone}</span>}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted">
                    {new Date(msg.createdAt).toLocaleDateString("tr-TR")}
                  </span>
                  {!msg.isRead && (
                    <span className="w-2 h-2 bg-primary rounded-full" />
                  )}
                </div>
              </div>
              {msg.subject && <p className="text-xs font-medium text-foreground/70 mb-1">Konu: {msg.subject}</p>}
              <p className="text-sm text-muted leading-relaxed">{msg.message}</p>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
}
