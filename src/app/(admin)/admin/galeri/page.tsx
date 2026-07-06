"use client";

import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Modal, ConfirmDialog } from "@/components/admin/Modal";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useToast } from "@/components/admin/Toast";

interface GalleryItem {
  id: string;
  image: string;
  caption: string | null;
  category: string | null;
  order: number;
}

const emptyItem: Omit<GalleryItem, "id"> = { image: "", caption: "", category: null, order: 0 };

export default function AdminGaleriPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [form, setForm] = useState(emptyItem);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const toast = useToast();

  const fetchItems = async () => {
    try { const res = await fetch("/api/admin/galeri"); if (res.ok) setItems(await res.json()); } catch {} finally { setLoading(false); }
  };

  useEffect(() => { fetchItems(); }, []);

  const openNew = () => { setEditing(null); setForm(emptyItem); setModalOpen(true); };
  const openEdit = (item: GalleryItem) => { setEditing(item); setForm({ image: item.image, caption: item.caption || "", category: item.category, order: item.order }); setModalOpen(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = "/api/admin/galeri";
      const method = editing ? "PUT" : "POST";
      const body = editing ? { id: editing.id, ...form } : form;
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (res.ok) { toast(editing ? "Görsel güncellendi" : "Görsel eklendi", "success"); setModalOpen(false); fetchItems(); } else toast("Hata", "error");
    } catch { toast("Bağlantı hatası", "error"); }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try { const res = await fetch("/api/admin/galeri", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: deleteId }) }); if (res.ok) { toast("Silindi", "success"); fetchItems(); } else toast("Silinemedi", "error"); } catch {} finally { setDeleteId(null); }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div><h1 className="text-2xl font-headline font-bold text-foreground">Galeri</h1><p className="text-sm text-muted mt-1">Galeri görsellerini yönetin</p></div>
        <button onClick={openNew} className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors flex items-center gap-2 justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Görsel Ekle
        </button>
      </div>

      {loading ? <div className="text-center text-muted py-12">Yükleniyor...</div> : items.length === 0 ? (
        <div className="glass-card p-12 text-center"><p className="text-muted">Henüz galeri öğesi yok.</p></div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {items.map((item) => (
            <div key={item.id} className="relative group aspect-square rounded-xl overflow-hidden glass-card !p-0">
              <img src={item.image} alt={item.caption || ""} className="w-full h-full object-cover" />
              {item.caption && <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2 truncate">{item.caption}</div>}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button onClick={() => openEdit(item)} className="bg-primary text-white px-3 py-1.5 rounded-full text-xs">Düzenle</button>
                <button onClick={() => setDeleteId(item.id)} className="bg-red-500 text-white px-3 py-1.5 rounded-full text-xs">Sil</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Görsel Düzenle" : "Yeni Görsel"} size="md">
        <form onSubmit={handleSubmit} className="space-y-5">
          <ImageUpload value={form.image} onChange={(url) => setForm({ ...form, image: url })} folder="galeri" label="Görsel" />
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">Açıklama</label>
            <input type="text" value={form.caption || ""} onChange={(e) => setForm({ ...form, caption: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">Kategori</label>
            <input type="text" value={form.category || ""} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none text-sm" placeholder="örn: Düğün, Doğum Günü" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">Sıra</label>
            <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none text-sm" />
          </div>
          <div className="flex gap-3 justify-end pt-4 border-t border-white/10">
            <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 rounded-full text-sm text-muted hover:text-foreground hover:bg-white/10 transition-colors">İptal</button>
            <button type="submit" className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors">{editing ? "Güncelle" : "Ekle"}</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog open={!!deleteId} onConfirm={handleDelete} onCancel={() => setDeleteId(null)} title="Görseli Sil" message="Bu görsel silinecek. Bu işlem geri alınamaz." confirmText="Sil" />
    </AdminLayout>
  );
}
