const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const updates = [
  ['dogum-gunu-organizasyonu', 'https://pub-365b4e03c8dc46d7919fac8a7ec75bed.r2.dev/hizmetler/dogum-gunu-organizasyonu-1783361776676.webp'],
  ['mezuniyet', 'https://pub-365b4e03c8dc46d7919fac8a7ec75bed.r2.dev/hizmetler/mezuniyet-1783361777797.webp'],
  ['soz-nisan-konsepti', 'https://pub-365b4e03c8dc46d7919fac8a7ec75bed.r2.dev/hizmetler/soz-nisan-konsepti-1783361778618.webp'],
  ['sevgililer-gunu', 'https://pub-365b4e03c8dc46d7919fac8a7ec75bed.r2.dev/hizmetler/sevgililer-gunu-1783361779433.webp'],
  ['acilis-organizasyonu', 'https://pub-365b4e03c8dc46d7919fac8a7ec75bed.r2.dev/hizmetler/acilis-organizasyonu-1783361780170.webp'],
  ['masa-sandalye-kiralama', 'https://pub-365b4e03c8dc46d7919fac8a7ec75bed.r2.dev/hizmetler/masa-sandalye-kiralama-1783361780923.webp'],
  ['kokteyl-organizasyonu', 'https://pub-365b4e03c8dc46d7919fac8a7ec75bed.r2.dev/hizmetler/kokteyl-organizasyonu-1783361782053.webp'],
  ['yapay-agac-dekoru', 'https://pub-365b4e03c8dc46d7919fac8a7ec75bed.r2.dev/hizmetler/yapay-agac-dekoru-1783361782910.webp'],
  ['yapay-cicek-dekoru', 'https://pub-365b4e03c8dc46d7919fac8a7ec75bed.r2.dev/hizmetler/yapay-cicek-dekoru-1783361783835.webp'],
  ['piknik-organizasyonu', 'https://pub-365b4e03c8dc46d7919fac8a7ec75bed.r2.dev/hizmetler/piknik-organizasyonu-1783361784969.webp'],
  ['sunnet-organizasyonu', 'https://pub-365b4e03c8dc46d7919fac8a7ec75bed.r2.dev/hizmetler/sunnet-organizasyonu-1783361785634.webp'],
  ['balon-aranjmani', 'https://pub-365b4e03c8dc46d7919fac8a7ec75bed.r2.dev/hizmetler/balon-aranjmani-1783361786657.webp'],
];

(async () => {
  const client = await pool.connect();
  try {
    for (const [slug, image] of updates) {
      const res = await client.query('UPDATE "Service" SET image = $1 WHERE slug = $2', [image, slug]);
      console.log(res.rowCount > 0 ? '+ ' + slug : '- ' + slug + ' (not found)');
    }
  } finally {
    client.release();
    await pool.end();
  }
})();
