// Hizmet sayfalarında zaten kullanılan gerçek galeri fotoğraflarını
// GalleryItem tablosuna aktarır, böylece /galeri sayfası boş kalmaz.
// Çalıştırma: DATABASE_URL production'a işaret ederken `node seed-gallery-from-services.cjs`
const { Pool } = require('pg');
const crypto = require('crypto');

if (!process.env.DATABASE_URL) {
  console.error('HATA: DATABASE_URL ortam değişkeni ayarlanmamış.');
  process.exit(1);
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

(async () => {
  const client = await pool.connect();
  try {
    const services = await client.query('SELECT title, image, gallery, "order" FROM "Service" ORDER BY "order" ASC');

    const existing = await client.query('SELECT image FROM "GalleryItem"');
    const existingUrls = new Set(existing.rows.map((r) => r.image));

    let order = 0;
    let inserted = 0;
    for (const svc of services.rows) {
      let urls = [];
      try { urls = svc.gallery ? JSON.parse(svc.gallery) : []; } catch { urls = []; }
      if (urls.length === 0 && svc.image) urls = [svc.image];

      for (const url of urls) {
        if (existingUrls.has(url)) { order++; continue; }
        const id = 'gal-' + crypto.randomBytes(8).toString('hex');
        await client.query(
          'INSERT INTO "GalleryItem" (id, image, caption, category, "order", "createdAt") VALUES ($1, $2, $3, $4, $5, NOW())',
          [id, url, svc.title, svc.title, order]
        );
        existingUrls.add(url);
        inserted++;
        order++;
      }
    }
    console.log('Tamamlandı: ' + inserted + ' fotoğraf galeri tablosuna eklendi.');
  } finally {
    client.release();
    await pool.end();
  }
})().catch((e) => {
  console.error('HATA:', e.message || e.code || e);
  process.exit(1);
});
