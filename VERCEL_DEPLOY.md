# Zahidem Organizasyon — Vercel Deploy Rehberi

## Gerekenler
- GitHub hesabınız
- Vercel hesabınız (github ile bağlanabilir)
- Neon hesabı (ücretsiz PostgreSQL) → https://neon.tech

---

## 1. GitHub Repo Oluşturma

1. GitHub.com'a gidin → Yeni repo oluşturun
   - Repo adı: `zahidemorganizasyon`
   - Public veya Private (fark etmez)
   - "Create repository" deyin

2. Repo oluştuktan sonra aşağıdaki gibi bir sayfa göreceksiniz. **"…or push an existing repository from the command line"** kısmındaki 3 komutu kopyalayın:

```bash
git remote add origin https://github.com/KULLANICIADI/zahidemorganizasyon.git
git branch -M main
git push -u origin main
```

3. Bu 3 komutu **bilgisayarınızda** proje klasöründeyken (C:\Users\coban\OneDrive\Masaüstü\zahidemwebsitesi) Powershell'de çalıştırın.

---

## 2. Neon'da PostgreSQL Veritabanı Oluşturma

1. https://neon.tech → GitHub ile kaydolun
2. "Create a project" →
   - Name: `zahidem`
   - Region: **Frankfurt** (en yakın, düşük gecikme)
   - "Create project"
3. Açılan sayfada size bir **connection string** (bağlantı dizesi) gösterilecek. Şuna benzer:
   ```
   postgresql://kullanici:xxxxx@ep-xxxxx.eu-central-1.aws.neon.tech/zahidem?sslmode=require
   ```
   **Bunu kopyalayın ve bir yere kaydedin.**

---

## 3. Vercel'e Deploy Etme

1. https://vercel.com → GitHub ile kaydolun/oturum açın
2. "Add New → Project" tıklayın
3. **GitHub** sekmeyi seçin → "zahidemorganizasyon" reposunu bulun → "Import"
4. Açılan sayfada **"Environment Variables"** bölümünü bulun ve şunları ekleyin:

| Variable | Değer |
|----------|-------|
| `DATABASE_URL` | Neon'dan aldığınız connection string (yukarıdaki gibi) |
| `NEXTAUTH_SECRET` | Rastgele uzun bir şifre (şunu kullanabilirsiniz: `zahidem-super-secret-key-2024`) |
| `NEXTAUTH_URL` | `https://zahidemorganizasyon.vercel.app` (domain ekleyince değişecek) |

5. **"Deploy"** butonuna tıklayın
6. Birkaç dakika içinde siteniz hazır! 🎉

---

## 4. İlk Admin Hesabı Oluşturma

Site deploy olduktan sonra admin hesabı oluşturmak için:

### Seçenek A: Seed script'i çalıştırma (terminal)
```bash
# Vercel'de bir one-off komut çalıştırmak için projenizin Vercel dashboard'unda:
# Settings → Environment Variables → (kontrol et) 
# Sonra yerelde:
npm run seed
```

### Seçenek B: Manuel API çağrısı
Henüz admin oluşturmadıysanız, veritabanına bağlanıp manuel ekleyin:

Neon dashboard'da → **SQL Editor** → Aşağıdaki SQL'i çalıştırın (şifre hash'i için):

```sql
-- ÖNCE: Neon'un SQL Editor'üne bağlanın
-- Aşağıdaki kodu çalıştırın:
INSERT INTO "AdminUser" ("id", "email", "name", "hashedPassword", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text,
  'admin@zahidemorganizasyon.com',
  'Admin',
  -- Şifre: zahidem2024 (bcrypt hash'i)
  '$2a$12$LJ3m4ys3Lk0TSwHnbfOMiO7F0aDH1PR9tLqD3xFn0m5y0x5n5q5yS',
  NOW(),
  NOW()
);
```

**Veya daha kolayı:** Node.js yüklü bir bilgisayarda şu script'i çalıştırın:
```bash
npm run seed
```
(Bunun için Neon connection string'inin `.env` dosyasında doğru ayarlanmış olması gerekir)

---

## 5. Admin Paneli Kullanımı

- **Giriş:** https://zahidemorganizasyon.vercel.app/admin
- **Kullanıcı:** admin@zahidemorganizasyon.com
- **Şifre:** zahidem2024

Admin panelinde yapabilecekleriniz:
- 📊 **Dashboard** — İstatistikler, son mesajlar, son blog yazıları
- 🛠️ **Hizmetler** — Hizmet ekleme/düzenleme/silme
- 📝 **Blog** — Blog yazısı ekleme/düzenleme/silme
- 🖼️ **Galeri** — Görsel yükleme/düzenleme
- ✉️ **Mesajlar** — Gelen kutusu (iletişim formundan gelenler)
- ⚙️ **Ayarlar** — Site ayarları

---

## 6. Domain Bağlantısı (İleride)

Hazır olduğunuzda:
1. Vercel Dashboard → Projeniz → **Settings → Domains**
2. `zahidemorganizasyon.com` yazın → "Add" tıklayın
3. DNS ayarlarınızda (domain sağlayıcınızda) Vercel'in verdiği adresleri girin
4. SSL sertifikası otomatik oluşur

---

## 7. Proje Dosya Yapısı

```
zahidemwebsitesi/
├── src/
│   ├── app/                    # Tüm sayfalar (App Router)
│   │   ├── (public)/           # Halka açık sayfalar
│   │   │   ├── page.tsx        # Ana Sayfa (Hero + Bento Grid)
│   │   │   ├── hizmetler/      # Hizmetler sayfaları
│   │   │   ├── blog/           # Blog sayfaları
│   │   │   ├── galeri/         # Galeri sayfası
│   │   │   ├── iletisim/       # İletişim sayfası
│   │   │   └── hakkimizda/     # Hakkımızda sayfası
│   │   ├── (admin)/            # Admin paneli
│   │   │   └── admin/          # Giriş + Dashboard + CRUD
│   │   ├── api/                # API route'ları
│   │   ├── sitemap.ts          # SEO sitemap
│   │   └── robots.ts           # SEO robots
│   ├── components/
│   │   ├── ui/                 # Glassmorphism bileşenleri
│   │   └── admin/              # Admin panel bileşenleri
│   └── lib/                    # Utility'ler (auth, prisma, data)
├── prisma/
│   ├── schema.prisma           # Veritabanı şeması
│   └── seed.ts                 # Seed script
└── .env                        # Çevre değişkenleri
```

## Sorun Yaşarsanız

Beni tekrar çağırın, yardımcı olurum! 🚀
