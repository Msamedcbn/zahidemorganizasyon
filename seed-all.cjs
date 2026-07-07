const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const services = [
  { title: 'Doğum Günü Organizasyonu', slug: 'dogum-gunu-organizasyonu', description: 'Her yaş için özel temalı doğum günü organizasyonları.', icon: 'Cake', image: 'https://pub-365b4e03c8dc46d7919fac8a7ec75bed.r2.dev/hizmetler/dogum-gunu-organizasyonu-1783361776676.webp', order: 0 },
  { title: 'Mezuniyet', slug: 'mezuniyet', description: 'Mezuniyet sevincinizi profesyonel bir organizasyonla taçlandırın.', icon: 'Graduation', image: 'https://pub-365b4e03c8dc46d7919fac8a7ec75bed.r2.dev/hizmetler/mezuniyet-1783361777797.webp', order: 1 },
  { title: 'Söz & Nişan Konsepti', slug: 'soz-nisan-konsepti', description: 'En özel anınızı unutulmaz kılacak profesyonel söz ve nişan organizasyonu.', icon: 'Ring', image: 'https://pub-365b4e03c8dc46d7919fac8a7ec75bed.r2.dev/hizmetler/soz-nisan-konsepti-1783361778618.webp', order: 2 },
  { title: 'Sevgililer Günü', slug: 'sevgililer-gunu', description: 'Sevdiklerinize unutulmaz bir Sevgililer Günü sürprizi.', icon: 'Heart', image: 'https://pub-365b4e03c8dc46d7919fac8a7ec75bed.r2.dev/hizmetler/sevgililer-gunu-1783361779433.webp', order: 3 },
  { title: 'Açılış Organizasyonu', slug: 'acilis-organizasyonu', description: 'İşletmeniz için etkileyici açılış ve lansman organizasyonları.', icon: 'Store', image: 'https://pub-365b4e03c8dc46d7919fac8a7ec75bed.r2.dev/hizmetler/acilis-organizasyonu-1783361780170.webp', order: 4 },
  { title: 'Masa Sandalye Kiralama', slug: 'masa-sandalye-kiralama', description: 'Her tür etkinlik için şık ve kaliteli masa sandalye kiralama hizmeti.', icon: 'Armchair', image: 'https://pub-365b4e03c8dc46d7919fac8a7ec75bed.r2.dev/hizmetler/masa-sandalye-kiralama-1783361780923.webp', order: 5 },
  { title: 'Kokteyl Organizasyonu', slug: 'kokteyl-organizasyonu', description: 'Davetlerinize şıklık katan profesyonel kokteyl organizasyon hizmeti.', icon: 'Glass', image: 'https://pub-365b4e03c8dc46d7919fac8a7ec75bed.r2.dev/hizmetler/kokteyl-organizasyonu-1783361782053.webp', order: 6 },
  { title: 'Yapay Ağaç Dekoru', slug: 'yapay-agac-dekoru', description: 'Mekanlarınıza doğal görünüm katan yapay ağaç dekorasyonları.', icon: 'Stars', image: 'https://pub-365b4e03c8dc46d7919fac8a7ec75bed.r2.dev/hizmetler/yapay-agac-dekoru-1783361782910.webp', order: 7 },
  { title: 'Yapay Çiçek Dekoru', slug: 'yapay-cicek-dekoru', description: 'Bakım gerektirmeyen yapay çiçek aranjmanları ile kalıcı güzellik.', icon: 'Celebration', image: 'https://pub-365b4e03c8dc46d7919fac8a7ec75bed.r2.dev/hizmetler/yapay-cicek-dekoru-1783361783835.webp', order: 8 },
  { title: 'Piknik Organizasyonu', slug: 'piknik-organizasyonu', description: 'Açık havada unutulmaz piknik organizasyonları.', icon: 'Flag', image: 'https://pub-365b4e03c8dc46d7919fac8a7ec75bed.r2.dev/hizmetler/piknik-organizasyonu-1783361784969.webp', order: 9 },
  { title: 'Sünnet Organizasyonu', slug: 'sunnet-organizasyonu', description: 'Geleneksel ve modern çizgide unutulmaz sünnet töreni organizasyonu.', icon: 'Stars', image: 'https://pub-365b4e03c8dc46d7919fac8a7ec75bed.r2.dev/hizmetler/sunnet-organizasyonu-1783361785634.webp', order: 10 },
  { title: 'Balon Aranjmanı', slug: 'balon-aranjmani', description: 'Yaratıcı ve göz alıcı balon aranjman tasarımları.', icon: 'Bubble', image: 'https://pub-365b4e03c8dc46d7919fac8a7ec75bed.r2.dev/hizmetler/balon-aranjmani-1783361786657.webp', order: 11 },
];

const settings = [
  ['siteName', 'Zahidem Organizasyon'],
  ['siteDescription', 'Istanbulun her noktasinda profesyonel organizasyon hizmeti.'],
  ['phone', '+90 531 663 29 30'],
  ['email', 'info@zahidemorganizasyon.com'],
  ['address', 'istanbul, Anadolu ve Avrupa Yakasi'],
  ['mapsUrl', 'https://maps.app.goo.gl/xxxxxxxx'],
  ['whatsapp', '905316632930'],
  ['instagram', 'https://www.instagram.com/zahidemorganizasyon'],
  ['facebook', 'https://www.facebook.com/zahidemorganizasyonn'],
  ['youtube', 'https://www.youtube.com/channel/UCfSemzsL-ElAbQT3j_2xTaQ'],
  ['seoTitle', 'Zahidem Organizasyon'],
  ['seoDescription', 'Istanbulun her noktasinda profesyonel organizasyon hizmeti.'],
];

(async () => {
  const client = await pool.connect();
  try {
    // Services
    for (const s of services) {
      const existing = await client.query('SELECT id FROM "Service" WHERE slug = $1', [s.slug]);
      if (existing.rows.length > 0) {
        await client.query('UPDATE "Service" SET title = $1, description = $2, icon = $3, image = $4, "order" = $5 WHERE slug = $6',
          [s.title, s.description, s.icon, s.image, s.order, s.slug]);
        console.log('+ ' + s.slug + ' (updated)');
      } else {
        const id = 'svc-' + s.slug;
        await client.query('INSERT INTO "Service" (id, title, slug, description, icon, image, "order", "isActive", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, true, NOW(), NOW())',
          [id, s.title, s.slug, s.description, s.icon, s.image, s.order]);
        console.log('+ ' + s.slug + ' (inserted)');
      }
    }

    // Settings
    for (const [k, v] of settings) {
      await client.query('INSERT INTO "SiteSetting" (id, key, value) VALUES ($1, $2, $3) ON CONFLICT (key) DO UPDATE SET value = $3', [k, k, v]);
    }
    console.log('+ settings saved');

    // Admin user
    const admin = await client.query('SELECT id FROM "AdminUser" WHERE email = $1', ['admin@zahidemorganizasyon.com']);
    if (admin.rows.length === 0) {
      await client.query('INSERT INTO "AdminUser" (id, email, name, "hashedPassword", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, NOW(), NOW())',
        ['admin-001', 'admin@zahidemorganizasyon.com', 'Admin', '$2b$10$S1l/ppB3WLLzdyfXcAJHj..Hu73idbnBsFo6erztMoCm01ZhWt7Ay']);
      console.log('+ admin user created');
    } else {
      console.log('+ admin user exists');
    }
  } finally {
    client.release();
    await pool.end();
  }
})();

