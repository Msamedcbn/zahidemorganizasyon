"use client";

import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Modal, ConfirmDialog } from "@/components/admin/Modal";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useToast } from "@/components/admin/Toast";

const icons = ["Ring", "Celebration", "Heart", "Cake", "Stars", "Store", "Glass", "Bubble", "Armchair", "Flag", "Graduation"];

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  icon: string;
  image: string | null;
  order: number;
  isActive: boolean;
}

const emptyService: Omit<Service, "id"> = {
  title: "",
  slug: "",
  description: "",
  longDescription: "",
  icon: "Ring",
  image: null,
  order: 0,
  isActive: true,
};

function turkishSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/ı/g, "i").replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ö/g, "o").replace(/ç/g, "c").replace(/İ/g, "i")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function AdminHizmetlerPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState(emptyService);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const toast = useToast();

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/admin/hizmetler");
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm(emptyService);
    setModalOpen(true);
  };

  const openEdit = (s: Service) => {
    setEditing(s);
    setForm({
      title: s.title,
      slug: s.slug,
      description: s.description,
      longDescription: s.longDescription,
      icon: s.icon,
      image: s.image,
      order: s.order,
      isActive: s.isActive,
    });
    setModalOpen(true);
  };

  const handleTitleChange = (title: string) => {
    setForm((f) => ({ ...f, title, slug: f.slug === turkishSlug(f.title) || !f.slug ? turkishSlug(title) : f.slug }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editing ? "/api/admin/hizmetler" : "/api/admin/hizmetler";
      const method = editing ? "PUT" : "POST";
      const body = editing ? { id: editing.id, ...form } : form;
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (res.ok) {
        toast(editing ? "Hizmet güncellendi" : "Hizmet eklendi", "success");
        setModalOpen(false);
        fetchServices();
      } else {
        toast("Hata oluştu", "error");
      }
    } catch {
      toast("Bağlantı hatası", "error");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch("/api/admin/hizmetler", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteId }),
      });
      if (res.ok) {
        toast("Hizmet silindi", "success");
        fetchServices();
      } else {
        toast("Silinemedi", "error");
      }
    } catch {
      toast("Bağlantı hatası", "error");
    } finally {
      setDeleteId(null);
    }
  };

  const toggleActive = async (s: Service) => {
    try {
      await fetch("/api/admin/hizmetler", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: s.id, title: s.title, slug: s.slug, description: s.description, longDescription: s.longDescription, icon: s.icon, image: s.image, order: s.order, isActive: !s.isActive }),
      });
      fetchServices();
      toast(s.isActive ? "Pasife alındı" : "Aktife alındı", "success");
    } catch {}
  };

  const filtered = services.filter((s) => s.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-headline font-bold text-foreground">Hizmetler</h1>
          <p className="text-sm text-muted mt-1">Tüm hizmetleri yönetin</p>
        </div>
        <button onClick={openNew} className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors flex items-center gap-2 justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Yeni Hizmet
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Hizmet ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64 px-4 py-2.5 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none text-sm"
        />
      </div>

      <div className="glass-card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted">Yükleniyor...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-muted">
            {search ? "Sonuç bulunamadı" : "Henüz hizmet eklenmemiş."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 font-medium text-muted">Sıra</th>
                  <th className="text-left p-4 font-medium text-muted">Başlık</th>
                  <th className="text-left p-4 font-medium text-muted hidden md:table-cell">İkon</th>
                  <th className="text-left p-4 font-medium text-muted">Durum</th>
                  <th className="text-right p-4 font-medium text-muted">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-4">{s.order}</td>
                    <td className="p-4">
                      <div className="font-medium">{s.title}</div>
                      <div className="text-xs text-muted">{s.slug}</div>
                    </td>
                    <td className="p-4 hidden md:table-cell text-muted text-xs">{s.icon}</td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleActive(s)}
                        className={`text-xs px-3 py-1 rounded-full transition-colors ${s.isActive ? "bg-green-500/20 text-green-500" : "bg-gray-500/20 text-gray-400"}`}
                      >
                        {s.isActive ? "Aktif" : "Pasif"}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <button onClick={() => openEdit(s)} className="text-primary text-xs hover:underline">Düzenle</button>
                        <button onClick={() => setDeleteId(s.id)} className="text-red-400 text-xs hover:underline">Sil</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Hizmet Düzenle" : "Yeni Hizmet"} size="xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1">Başlık *</label>
              <input type="text" value={form.title} onChange={(e) => handleTitleChange(e.target.value)} required className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1">Slug</label>
              <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">Kısa Açıklama *</label>
            <input type="text" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none text-sm" />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">Detaylı Açıklama</label>
            <textarea value={form.longDescription} onChange={(e) => setForm({ ...form, longDescription: e.target.value })} rows={4} className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none text-sm resize-none" />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1">İkon</label>
              <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none text-sm">
                {icons.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1">Sıra</label>
              <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none text-sm" />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 rounded" />
                <span className="text-sm text-foreground/80">Aktif</span>
              </label>
            </div>
          </div>

          <ImageUpload value={form.image || ""} onChange={(url) => setForm({ ...form, image: url })} folder="hizmetler" label="Hizmet Görseli" />

          <div className="flex gap-3 justify-end pt-4 border-t border-white/10">
            <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 rounded-full text-sm text-muted hover:text-foreground hover:bg-white/10 transition-colors">İptal</button>
            <button type="submit" className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors">
              {editing ? "Güncelle" : "Ekle"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        title="Hizmeti Sil"
        message="Bu hizmet silinecek. Bu işlem geri alınamaz."
        confirmText="Sil"
      />
    </AdminLayout>
  );
}
