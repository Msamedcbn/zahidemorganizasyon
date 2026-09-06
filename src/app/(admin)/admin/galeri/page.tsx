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

const GENEL_KATEGORI = "Genel";
const emptyItem: Omit<GalleryItem, "id"> = { image: "", caption: "", category: GENEL_KATEGORI, order: 0 };

export default function AdminGaleriPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [serviceTitles, setServiceTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [form, setForm] = useState(emptyItem);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Tümü");
  const toast = useToast();

  const fetchItems = async () => {
    try { const res = await fetch("/api/admin/galeri"); if (res.ok) setItems(await res.json()); } catch {} finally { setLoading(false); }
  };

  const fetchServiceTitles = async () => {
    try {
      const res = await fetch("/api/admin/hizmetler");
      if (res.ok) {
        const services: Array<{ title: string }> = await res.json();
        setServiceTitles(services.map((s) => s.title));
      }
    } catch {}
  };

  useEffect(() => { fetchItems(); fetchServiceTitles(); }, []);

  const categoryOptions = Array.from(new Set([...serviceTitles, GENEL_KATEGORI, ...items.map((i) => i.category).filter((c): c is string => !!c)]));
  const filteredItems = (activeCategory === "Tümü" ? items : items.filter((i) => (i.category || GENEL_KATEGORI) === activeCategory))
    .slice()
    .sort((a, b) => a.order - b.order);

  const nextOrderInCategory = (category: string) => {
    const inCat = items.filter((i) => (i.category || GENEL_KATEGORI) === category);
    return inCat.length > 0 ? Math.max(...inCat.map((i) => i.order)) + 1 : 0;
  };

  const openNew = () => { setEditing(null); setForm({ ...emptyItem, order: nextOrderInCategory(GENEL_KATEGORI) }); setModalOpen(true); };
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

  const moveToCategory = async (item: GalleryItem, category: string) => {
    if (category === (item.category || GENEL_KATEGORI)) return;
    // Appends to the end of the target category's own sequence, rather than
    // carrying over an order value from the old category (which could clash
    // or place it in a confusing spot).
    const newOrder = nextOrderInCategory(category);
    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, category, order: newOrder } : i)));
    try {
      const res = await fetch("/api/admin/galeri", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, image: item.image, caption: item.caption, category, order: newOrder }),
      });
      if (res.ok) toast(`"${category}" kategorisine taşındı`, "success");
      else { toast("Taşınamadı", "error"); fetchItems(); }
    } catch { toast("Bağlantı hatası", "error"); fetchItems(); }
  };

  const moveWithinCategory = async (item: GalleryItem, direction: "up" | "down") => {
    const category = item.category || GENEL_KATEGORI;
    const inCategory = items.filter((i) => (i.category || GENEL_KATEGORI) === category).sort((a, b) => a.order - b.order);
    const idx = inCategory.findIndex((i) => i.id === item.id);
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= inCategory.length) return;

    const reordered = [...inCategory];
    [reordered[idx], reordered[swapIdx]] = [reordered[swapIdx], reordered[idx]];
    const updates = reordered.map((it, i) => ({ ...it, order: i }));

    setItems((prev) => prev.map((i) => updates.find((u) => u.id === i.id) || i));
    try {
      const results = await Promise.all(
        updates.map((it) =>
          fetch("/api/admin/galeri", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: it.id, image: it.image, caption: it.caption, category: it.category, order: it.order }),
          })
        )
      );
      if (results.some((r) => !r.ok)) { toast("Sıralama kaydedilemedi", "error"); fetchItems(); }
    } catch { toast("Bağlantı hatası", "error"); fetchItems(); }
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

      {items.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {["Tümü", ...categoryOptions].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                activeCategory === cat ? "bg-primary text-white" : "glass-card text-muted hover:text-foreground"
              }`}
            >
              {cat}
              {cat !== "Tümü" && (
                <span className="ml-1.5 opacity-70">({items.filter((i) => (i.category || GENEL_KATEGORI) === cat).length})</span>
              )}
            </button>
          ))}
        </div>
      )}

      {loading ? <div className="text-center text-muted py-12">Yükleniyor...</div> : items.length === 0 ? (
        <div className="glass-card p-12 text-center"><p className="text-muted">Henüz galeri öğesi yok.</p></div>
      ) : filteredItems.length === 0 ? (
        <div className="glass-card p-12 text-center"><p className="text-muted">Bu kategoride görsel yok.</p></div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredItems.map((item, idx) => (
            <div key={item.id} className="relative group aspect-square rounded-xl overflow-hidden glass-card !p-0">
              <img src={item.image} alt={item.caption || ""} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full truncate max-w-[85%]">
                {item.category || GENEL_KATEGORI}
              </div>
              {activeCategory !== "Tümü" && (
                <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => moveWithinCategory(item, "up")}
                    disabled={idx === 0}
                    title="Yukarı taşı"
                    className="bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed text-foreground w-6 h-6 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 19V5" /><path d="m5 12 7-7 7 7" /></svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => moveWithinCategory(item, "down")}
                    disabled={idx === filteredItems.length - 1}
                    title="Aşağı taşı"
                    className="bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed text-foreground w-6 h-6 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></svg>
                  </button>
                </div>
              )}
              {item.caption && <div className="absolute bottom-8 left-0 right-0 bg-black/60 text-white text-xs p-2 truncate">{item.caption}</div>}
              <div className="absolute inset-x-0 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <select
                  value={item.category || GENEL_KATEGORI}
                  onChange={(e) => moveToCategory(item, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full text-[11px] px-1.5 py-1 bg-black/70 text-white border-t border-white/20 focus:outline-none"
                  title="Kategori değiştir"
                >
                  {categoryOptions.map((cat) => (
                    <option key={cat} value={cat} className="text-foreground">{cat}</option>
                  ))}
                </select>
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 pb-6">
                <button onClick={() => openEdit(item)} className="bg-primary text-white px-3 py-1.5 rounded-full text-xs">Düzenle</button>
                <button onClick={() => setDeleteId(item.id)} className="bg-red-500 text-white px-3 py-1.5 rounded-full text-xs">Sil</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Görsel Düzenle" : "Yeni Görsel"} size="lg">
        <form onSubmit={handleSubmit} className="space-y-5">
          <ImageUpload value={form.image} onChange={(url) => setForm({ ...form, image: url })} folder="galeri" label="Görsel" />
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">Açıklama</label>
            <input type="text" value={form.caption || ""} onChange={(e) => setForm({ ...form, caption: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">Kategori</label>
            <select
              value={form.category || GENEL_KATEGORI}
              onChange={(e) => {
                const category = e.target.value;
                if (category === (editing?.category || GENEL_KATEGORI)) {
                  setForm({ ...form, category });
                } else {
                  setForm({ ...form, category, order: nextOrderInCategory(category) });
                }
              }}
              className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none text-sm"
            >
              {Array.from(new Set([...serviceTitles, GENEL_KATEGORI])).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">Sıra (kategori içinde)</label>
            <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none text-sm" />
            <p className="text-xs text-muted mt-1">Kategori değiştirilince otomatik olarak sona eklenir; galeri listesinde ▲▼ ile de sıralayabilirsiniz.</p>
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
