"use client";

import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Modal, ConfirmDialog } from "@/components/admin/Modal";
import { useToast } from "@/components/admin/Toast";

interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
}

const emptyCategory: Omit<Category, "id"> = { name: "", slug: "", color: "#D4AF37" };

export default function AdminKategorilerPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState(emptyCategory);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const toast = useToast();

  const fetchCategories = async () => {
    try { const res = await fetch("/api/admin/kategoriler"); if (res.ok) setCategories(await res.json()); } catch {} finally { setLoading(false); }
  };

  useEffect(() => { fetchCategories(); }, []);

  const openNew = () => { setEditing(null); setForm(emptyCategory); setModalOpen(true); };
  const openEdit = (c: Category) => { setEditing(c); setForm({ name: c.name, slug: c.slug, color: c.color }); setModalOpen(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = "/api/admin/kategoriler";
      const method = editing ? "PUT" : "POST";
      const body = editing ? { id: editing.id, ...form } : form;
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (res.ok) { toast(editing ? "Kategori güncellendi" : "Kategori eklendi", "success"); setModalOpen(false); fetchCategories(); } else toast("Hata", "error");
    } catch { toast("Bağlantı hatası", "error"); }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try { const res = await fetch("/api/admin/kategoriler", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: deleteId }) }); if (res.ok) { toast("Kategori silindi", "success"); fetchCategories(); } else toast("Silinemedi", "error"); } catch {} finally { setDeleteId(null); }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div><h1 className="text-2xl font-headline font-bold text-foreground">Kategoriler</h1><p className="text-sm text-muted mt-1">Blog kategorilerini yönetin</p></div>
        <button onClick={openNew} className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors flex items-center gap-2 justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Yeni Kategori
        </button>
      </div>

      {loading ? <div className="text-center text-muted py-12">Yükleniyor...</div> : categories.length === 0 ? (
        <div className="glass-card p-8 text-center"><p className="text-muted">Henüz kategori yok.</p></div>
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="divide-y divide-white/5">
            {categories.map((c) => (
              <div key={c.id} className="flex items-center justify-between p-4 hover:bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: c.color }} />
                  <div>
                    <div className="font-medium text-foreground">{c.name}</div>
                    <div className="text-xs text-muted">{c.slug}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => openEdit(c)} className="text-primary text-xs hover:underline">Düzenle</button>
                  <button onClick={() => setDeleteId(c.id)} className="text-red-400 text-xs hover:underline">Sil</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Kategori Düzenle" : "Yeni Kategori"} size="sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">Ad *</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/ı/g, "i").replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s").replace(/ö/g, "o").replace(/ç/g, "c").replace(/İ/g, "i").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") })} required className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">Slug</label>
            <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">Renk</label>
            <input type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className="w-full h-10 rounded-xl border border-white/30 cursor-pointer" />
          </div>
          <div className="flex gap-3 justify-end pt-4 border-t border-white/10">
            <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 rounded-full text-sm text-muted hover:text-foreground hover:bg-white/10 transition-colors">İptal</button>
            <button type="submit" className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors">{editing ? "Güncelle" : "Ekle"}</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog open={!!deleteId} onConfirm={handleDelete} onCancel={() => setDeleteId(null)} title="Kategoriyi Sil" message="Bu kategori silinecek. Bu işlem geri alınamaz." confirmText="Sil" />
    </AdminLayout>
  );
}
