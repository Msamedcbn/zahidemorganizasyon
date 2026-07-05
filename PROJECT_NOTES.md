# Oturum Notları — 06.07.2026

## Tamamlanan
- Hero bölümündeki görsel kaldırıldı, glassmorphism + animated blur shapes tasarımına geçildi
- `www` subdomain CNAME Vercel'e bağlandı
- ServiceGrid bento grid layout düzeltildi
- QA: 2 issue düzeltildi (wide cards duplicate content, decorative alt text)

## Açık Sorunlar

### 1. CMS yeterince gelişmemiş (kullanıcı notu)
Mevcut admin panel:
- Login, Dashboard, CRUD: Hizmetler, Blog, Galeri, Mesajlar, Ayarlar
- ❌ Medya kütüphanesi yok
- ❌ Rich text editor yok
- ❌ Kategori/etiket yönetimi yok
- ❌ Kullanıcı yönetimi yok
- ❌ Rol bazlı yetkilendirme yok
- ❌ Görsel optimizasyonu yok
- ❌ Toplu işlem yok
- ❌ Aktivite log yok
- ❌ SEO meta alanları admin UI'da yok
- ❌ Önizleme yok

### 2. Logo yok — kullanıcı gönderecek

### 3. Hero görseli kaldırıldı
`public/images/hero-atmosphere.jpg` duruyor ama kullanılmıyor

### 4. Veritabanı
- Tablolar manuel SQL ile oluşturuldu
- Admin user eklendi: `admin@zahidemorganizasyon.com` / `zahidem2024`
- Galeri, Blog kayıtları DB'de yok (sayfalar boş dönebilir)

### 5. DNS
- Apex + www Vercel'de çalışıyor
- Nameservers Natro'da (email korunuyor)

### 6. Vercel preview URL'leri
- Deployment protection aktif, preview URL'leri login sayfasına yönlendiriyor
