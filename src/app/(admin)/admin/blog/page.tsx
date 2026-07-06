"use client";

import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Modal, ConfirmDialog } from "@/components/admin/Modal";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { AdminEditor } from "@/components/admin/AdminEditor";
import { useToast } from "@/components/admin/Toast";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  category: string | null;
  image: string | null;
  author: string;
  published: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const emptyPost: Omit<Post, "id" | "createdAt"> = {
  title: "",
  slug: "",
  content: "",
  excerpt: "",
  category: null,
  image: null,
  author: "Zahidem Organizasyon",
  published: false,
  seoTitle: "",
  seoDescription: "",
};

function turkishSlug(text: string): string {
  return text.toLowerCase().replace(/ı/g, "i").replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s").replace(/ö/g, "o").replace(/ç/g, "c").replace(/İ/g, "i").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Post | null>(null);
  const [form, setForm] = useState(emptyPost);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const toast = useToast();

  const fetchData = async () => {
    try {
      const [postsRes, catsRes] = await Promise.all([fetch("/api/admin/blog"), fetch("/api/admin/kategoriler")]);
      if (postsRes.ok) setPosts(await postsRes.json());
      if (catsRes.ok) setCategories(await catsRes.json());
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const openNew = () => { setEditing(null); setForm(emptyPost); setModalOpen(true); };
  const openEdit = (p: Post) => {
    setEditing(p);
    setForm({ title: p.title, slug: p.slug, content: p.content, excerpt: p.excerpt || "", category: p.category, image: p.image, author: p.author, published: p.published, seoTitle: p.seoTitle || "", seoDescription: p.seoDescription || "" });
    setModalOpen(true);
  };

  const handleTitleChange = (title: string) => {
    setForm((f) => ({ ...f, title, slug: f.slug === turkishSlug(f.title) || !f.slug ? turkishSlug(title) : f.slug, excerpt: !f.excerpt ? title.slice(0, 150) : f.excerpt }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = "/api/admin/blog";
      const method = editing ? "PUT" : "POST";
      const body = editing ? { id: editing.id, ...form } : form;
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (res.ok) { toast(editing ? "Yazı güncellendi" : "Yazı eklendi", "success"); setModalOpen(false); fetchData(); }
      else toast("Hata oluştu", "error");
    } catch { toast("Bağlantı hatası", "error"); }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch("/api/admin/blog", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: deleteId }) });
      if (res.ok) { toast("Yazı silindi", "success"); fetchData(); } else toast("Silinemedi", "error");
    } catch { toast("Bağlantı hatası", "error"); } finally { setDeleteId(null); }
  };

  const togglePublish = async (p: Post) => {
    try {
      await fetch("/api/admin/blog", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: p.id, title: p.title, slug: p.slug, content: p.content, excerpt: p.excerpt, category: p.category, image: p.image, author: p.author, published: !p.published, seoTitle: p.seoTitle, seoDescription: p.seoDescription }) });
      fetchData(); toast(p.published ? "Taslağa alındı" : "Yayınlandı", "success");
    } catch {}
  };

  const filtered = posts.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || (filter === "published" && p.published) || (filter === "draft" && !p.published);
    return matchSearch && matchFilter;
  });

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-headline font-bold text-foreground">Blog Yazıları</h1>
          <p className="text-sm text-muted mt-1">Blog yazılarını yönetin</p>
        </div>
        <button onClick={openNew} className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors flex items-center gap-2 justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Yeni Yazı
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input type="text" placeholder="Yazı ara..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full sm:w-64 px-4 py-2.5 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none text-sm" />
        <div className="flex gap-2">
          {(["all", "published", "draft"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${filter === f ? "bg-primary text-white" : "bg-white/10 text-muted hover:text-foreground"}`}>
              {f === "all" ? "Tümü" : f === "published" ? "Yayında" : "Taslak"}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        {loading ? <div className="p-8 text-center text-muted">Yükleniyor...</div> : filtered.length === 0 ? (
          <div className="p-8 text-center text-muted">{search ? "Sonuç bulunamadı" : "Henüz blog yazısı yok."}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 font-medium text-muted">Başlık</th>
                  <th className="text-left p-4 font-medium text-muted hidden md:table-cell">Kategori</th>
                  <th className="text-left p-4 font-medium text-muted hidden sm:table-cell">Tarih</th>
                  <th className="text-left p-4 font-medium text-muted">Durum</th>
                  <th className="text-right p-4 font-medium text-muted">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-4">
                      <div className="font-medium">{p.title}</div>
                      <div className="text-xs text-muted">{p.slug}</div>
                    </td>
                    <td className="p-4 hidden md:table-cell text-muted text-xs">{p.category || "—"}</td>
                    <td className="p-4 hidden sm:table-cell text-muted text-xs">{new Date(p.createdAt).toLocaleDateString("tr-TR")}</td>
                    <td className="p-4">
                      <button onClick={() => togglePublish(p)} className={`text-xs px-3 py-1 rounded-full transition-colors ${p.published ? "bg-green-500/20 text-green-500" : "bg-gray-500/20 text-gray-400"}`}>
                        {p.published ? "Yayında" : "Taslak"}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <button onClick={() => openEdit(p)} className="text-primary text-xs hover:underline">Düzenle</button>
                        <button onClick={() => setDeleteId(p.id)} className="text-red-400 text-xs hover:underline">Sil</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Yazı Düzenle" : "Yeni Blog Yazısı"} size="xl">
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

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1">Kategori</label>
              <select value={form.category || ""} onChange={(e) => setForm({ ...form, category: e.target.value || null })} className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none text-sm">
                <option value="">Kategori yok</option>
                {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1">Yazar</label>
              <input type="text" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">Özet</label>
            <textarea value={form.excerpt || ""} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none text-sm resize-none" placeholder="Yazının kısa özeti (ilk 150 karakter otomatik)" />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">İçerik *</label>
            <AdminEditor content={form.content} onChange={(html) => setForm({ ...form, content: html })} placeholder="Blog yazısının içeriğini yazın..." />
          </div>

          <ImageUpload value={form.image || ""} onChange={(url) => setForm({ ...form, image: url })} folder="blog" label="Kapak Görseli" />

          <div className="border-t border-white/10 pt-4">
            <h3 className="text-sm font-medium text-foreground/80 mb-3">SEO Ayarları</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-muted mb-1">SEO Başlık</label>
                <input type="text" value={form.seoTitle || ""} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })} className="w-full px-4 py-2 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none text-sm" placeholder="Arama motoru başlığı" />
              </div>
              <div>
                <label className="block text-xs text-muted mb-1">SEO Açıklama</label>
                <input type="text" value={form.seoDescription || ""} onChange={(e) => setForm({ ...form, seoDescription: e.target.value })} className="w-full px-4 py-2 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none text-sm" placeholder="Meta açıklama" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="w-4 h-4 rounded" />
              <span className="text-sm text-foreground/80">Hemen Yayınla</span>
            </label>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-white/10">
            <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 rounded-full text-sm text-muted hover:text-foreground hover:bg-white/10 transition-colors">İptal</button>
            <button type="submit" className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors">{editing ? "Güncelle" : "Yayınla"}</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog open={!!deleteId} onConfirm={handleDelete} onCancel={() => setDeleteId(null)} title="Yazıyı Sil" message="Bu yazı silinecek. Bu işlem geri alınamaz." confirmText="Sil" />
    </AdminLayout>
  );
}
