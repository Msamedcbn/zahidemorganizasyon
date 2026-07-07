"use client";

import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useToast } from "@/components/admin/Toast";

interface Settings {
  siteName: string;
  siteDescription: string;
  phone: string;
  email: string;
  address: string;
  mapsUrl: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  youtube: string;
  logo: string;
  favicon: string;
  seoTitle: string;
  seoDescription: string;
  googleAnalytics: string;
}

const defaultSettings: Settings = {
  siteName: "Zahidem Organizasyon",
  siteDescription: "İstanbul'un her noktasında profesyonel organizasyon hizmeti.",
  phone: "+90 531 663 29 30",
  email: "info@zahidemorganizasyon.com",
  address: "İstanbul, Anadolu ve Avrupa Yakası",
  mapsUrl: "",
  whatsapp: "905316632930",
  instagram: "https://www.instagram.com/zahidemorganizasyon",
  facebook: "https://www.facebook.com/zahidemorganizasyonn",
  youtube: "https://www.youtube.com/channel/UCfSemzsL-ElAbQT3j_2xTaQ",
  logo: "",
  favicon: "",
  seoTitle: "",
  seoDescription: "",
  googleAnalytics: "",
};

const tabs = [
  { id: "general", label: "Genel", icon: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" },
  { id: "logo", label: "Logo & Favicon", icon: "M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" },
  { id: "contact", label: "İletişim", icon: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" },
  { id: "social", label: "Sosyal Medya", icon: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
  { id: "seo", label: "SEO", icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6" },
];

export default function AdminAyarlarPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetch("/api/admin/ayarlar")
      .then((r) => r.json())
      .then((data) => {
        if (data && typeof data === "object") {
          setSettings((prev) => ({ ...prev, ...data }));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/ayarlar", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(settings) });
      if (res.ok) { toast("Ayarlar kaydedildi", "success"); } else { toast("Kaydedilemedi", "error"); }
    } catch { toast("Bağlantı hatası", "error"); } finally { setSaving(false); }
  };

  const update = (key: keyof Settings, value: string) => setSettings((prev) => ({ ...prev, [key]: value }));

  if (loading) return <AdminLayout><div className="text-center text-muted py-12">Yükleniyor...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div><h1 className="text-2xl font-headline font-bold text-foreground">Ayarlar</h1><p className="text-sm text-muted mt-1">Site ayarlarını yönetin</p></div>
        <button onClick={handleSave} disabled={saving} className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center gap-2">
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab.id ? "bg-primary text-white" : "bg-white/10 text-muted hover:text-foreground"}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={tab.icon} /></svg>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="glass-card p-6">
        {activeTab === "general" && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1">Site Adı</label>
              <input type="text" value={settings.siteName} onChange={(e) => update("siteName", e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1">Site Açıklaması</label>
              <textarea value={settings.siteDescription} onChange={(e) => update("siteDescription", e.target.value)} rows={3} className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none text-sm resize-none" />
            </div>
          </div>
        )}

        {activeTab === "logo" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-foreground/80 mb-3">Logo</h3>
              <p className="text-xs text-muted mb-4">Tek logo yükleyin — header, footer ve mobil otomatik kullanır.</p>
              <ImageUpload value={settings.logo} onChange={(url) => update("logo", url)} folder="logo" label="Site Logosu" />
            </div>
            <div className="border-t border-white/10 pt-6">
              <h3 className="text-sm font-medium text-foreground/80 mb-3">Favicon</h3>
              <ImageUpload value={settings.favicon} onChange={(url) => update("favicon", url)} folder="favicon" label="Favicon (.ico, .png)" />
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1">Telefon</label>
                <input type="tel" value={settings.phone} onChange={(e) => update("phone", e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1">WhatsApp (sadece numara)</label>
                <input type="text" value={settings.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none text-sm" placeholder="905316632930" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1">E-posta</label>
              <input type="email" value={settings.email} onChange={(e) => update("email", e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1">Adres</label>
              <input type="text" value={settings.address} onChange={(e) => update("address", e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1">Google Maps URL / Embed Kodu</label>
              <input type="text" value={settings.mapsUrl} onChange={(e) => update("mapsUrl", e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none text-sm" placeholder="https://maps.app.goo.gl/xxx veya iframe src URL" />
              <p className="text-xs text-muted mt-1">Google Maps embed URL'si (iframe src). İletişim sayfasında gösterilir.</p>
            </div>
          </div>
        )}

        {activeTab === "social" && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1">Instagram URL</label>
              <input type="url" value={settings.instagram} onChange={(e) => update("instagram", e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1">Facebook URL</label>
              <input type="url" value={settings.facebook} onChange={(e) => update("facebook", e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1">YouTube URL</label>
              <input type="url" value={settings.youtube} onChange={(e) => update("youtube", e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none text-sm" />
            </div>
          </div>
        )}

        {activeTab === "seo" && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1">Varsayılan SEO Başlık</label>
              <input type="text" value={settings.seoTitle} onChange={(e) => update("seoTitle", e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none text-sm" placeholder="Site adı + anahtar kelime" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1">Varsayılan SEO Açıklama</label>
              <textarea value={settings.seoDescription} onChange={(e) => update("seoDescription", e.target.value)} rows={3} className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none text-sm resize-none" placeholder="150-160 karakter" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1">Google Analytics ID</label>
              <input type="text" value={settings.googleAnalytics} onChange={(e) => update("googleAnalytics", e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none text-sm" placeholder="G-XXXXXXXXXX" />
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
