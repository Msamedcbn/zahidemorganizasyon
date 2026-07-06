"use client";

import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Modal, ConfirmDialog } from "@/components/admin/Modal";
import { useToast } from "@/components/admin/Toast";

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function AdminMesajlarPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);
  const [deleteIds, setDeleteIds] = useState<string[]>([]);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const toast = useToast();

  const fetchMessages = async () => {
    try { const res = await fetch("/api/admin/mesajlar"); if (res.ok) setMessages(await res.json()); } catch {} finally { setLoading(false); }
  };

  useEffect(() => { fetchMessages(); }, []);

  const markRead = async (msg: Message) => {
    try { await fetch("/api/admin/mesajlar", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: msg.id, isRead: true }) }); fetchMessages(); setSelected({ ...msg, isRead: true }); } catch {}
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    try { const res = await fetch("/api/admin/mesajlar", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: deleteConfirm }) }); if (res.ok) { toast("Mesaj silindi", "success"); fetchMessages(); } else toast("Silinemedi", "error"); } catch {} finally { setDeleteConfirm(null); setSelected(null); }
  };

  const handleBulkDelete = async () => {
    if (deleteIds.length === 0) return;
    try { const res = await fetch("/api/admin/mesajlar", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ids: deleteIds }) }); if (res.ok) { toast(`${deleteIds.length} mesaj silindi`, "success"); setDeleteIds([]); fetchMessages(); } else toast("Silinemedi", "error"); } catch {}
  };

  const toggleSelect = (id: string) => { setDeleteIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]); };

  const filtered = messages.filter((m) => filter === "all" || (filter === "unread" && !m.isRead) || (filter === "read" && m.isRead));
  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div><h1 className="text-2xl font-headline font-bold text-foreground">Mesajlar</h1><p className="text-sm text-muted mt-1">{unreadCount} okunmamış mesaj</p></div>
        {deleteIds.length > 0 && (
          <button onClick={handleBulkDelete} className="bg-red-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors">
            {deleteIds.length} Seçiliyi Sil
          </button>
        )}
      </div>

      <div className="flex gap-2 mb-4">
        {(["all", "unread", "read"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${filter === f ? "bg-primary text-white" : "bg-white/10 text-muted hover:text-foreground"}`}>
            {f === "all" ? `Tümü (${messages.length})` : f === "unread" ? `Okunmamış (${unreadCount})` : `Okunmuş (${messages.length - unreadCount})`}
          </button>
        ))}
      </div>

      {loading ? <div className="text-center text-muted py-12">Yükleniyor...</div> : filtered.length === 0 ? (
        <div className="glass-card p-8 text-center"><p className="text-muted">Mesaj yok.</p></div>
      ) : (
        <div className="space-y-3">
          {filtered.map((msg) => (
            <div key={msg.id} className={`glass-card p-5 cursor-pointer transition-colors hover:bg-white/10 ${!msg.isRead ? "border-l-4 border-l-primary" : ""}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <input type="checkbox" checked={deleteIds.includes(msg.id)} onChange={() => toggleSelect(msg.id)} onClick={(e) => e.stopPropagation()} className="w-4 h-4 rounded" />
                  <button onClick={() => { setSelected(msg); if (!msg.isRead) markRead(msg); }} className="text-left">
                    <span className="font-medium text-foreground">{msg.name}</span>
                    <span className="text-xs text-muted ml-3">{msg.email}</span>
                    {msg.phone && <span className="text-xs text-muted ml-2">{msg.phone}</span>}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted">{new Date(msg.createdAt).toLocaleDateString("tr-TR")}</span>
                  {!msg.isRead && <span className="w-2 h-2 bg-primary rounded-full" />}
                </div>
              </div>
              {msg.subject && <p className="text-xs font-medium text-foreground/70 mb-1">Konu: {msg.subject}</p>}
              <p className="text-sm text-muted leading-relaxed line-clamp-2">{msg.message}</p>
            </div>
          ))}
        </div>
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Mesaj Detayı" size="md">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-muted">Ad:</span> <span className="font-medium">{selected.name}</span></div>
              <div><span className="text-muted">E-posta:</span> <a href={`mailto:${selected.email}`} className="text-primary hover:underline">{selected.email}</a></div>
              {selected.phone && <div><span className="text-muted">Telefon:</span> <a href={`tel:${selected.phone}`} className="text-primary hover:underline">{selected.phone}</a></div>}
              <div><span className="text-muted">Tarih:</span> <span>{new Date(selected.createdAt).toLocaleString("tr-TR")}</span></div>
            </div>
            {selected.subject && <div><span className="text-muted">Konu:</span> <span className="font-medium ml-2">{selected.subject}</span></div>}
            <div className="border-t border-white/10 pt-4">
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{selected.message}</p>
            </div>
            <div className="flex gap-3 justify-end pt-4 border-t border-white/10">
              <a href={`mailto:${selected.email}?subject=Re: ${selected.subject || selected.name}`} className="px-5 py-2.5 rounded-full text-sm bg-primary text-white hover:bg-primary-dark transition-colors">Yanıtla</a>
              <button onClick={() => setDeleteConfirm(selected.id)} className="px-5 py-2.5 rounded-full text-sm text-red-400 hover:bg-red-500/10 transition-colors">Sil</button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog open={!!deleteConfirm} onConfirm={handleDelete} onCancel={() => setDeleteConfirm(null)} title="Mesajı Sil" message="Bu mesaj silinecek. Bu işlem geri alınamaz." confirmText="Sil" />
    </AdminLayout>
  );
}
