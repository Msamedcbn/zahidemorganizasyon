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

### 7. Görsel depolama kararı (06.07.2026)
- **Seçim:** Cloudflare R2 (S3-uyumlu, 10 GB ücretsiz, egress ücretsiz)
- **Neden:** Vercel Blob 500 MB yetersiz, R2 20x fazla + trafik ücretsiz
- **10 GB / 4 sene** yeter (kullanıcı onayı)
- **Sharp ile webp dönüşümü** upload sırasında yapılacak
- **Neon'a sadece URL** yazılacak (0.5 GB yıllarca yeter)
- **Migration kolay:** S3 API → başka hosta klasör kopyala

### Yapılacaklar (sonraki oturum)
1. Cloudflare R2 hesabı oluştur + bucket: `zahidem`
2. API token al (access key + secret)
3. Vercel env: `R2_ACCESS_KEY`, `R2_SECRET_KEY`, `R2_ENDPOINT`, `R2_BUCKET`
4. `npm install @aws-sdk/client-s3 sharp`
5. `/api/admin/upload/route.ts` yaz:
   - multipart al
   - sharp ile webp dönüştür
   - R2'ye yükle
   - URL döndür
6. Admin panele görsel upload UI ekle (Hizmet/Blog/Galeri formlarına)
7. Mevcut `<img>` etiketlerini Next.js `<Image>`'e çevir
8. `next.config.ts` R2 domain remote patterns'a ekle
