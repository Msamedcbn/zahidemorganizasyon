// DB'de kalan eski https://pub-*.r2.dev gorsel URL'lerini custom domain'e cevirir.
// pub-*.r2.dev adresleri Cloudflare'de rate-limit'e tabi; production'da gorsellerin
// kopmasinin sebebi bu. Site artik okurken de ceviriyor (src/lib/site-data.ts),
// bu script kaydi kalici olarak duzeltir ve admin panelini de temizler.
//
// Kullanim:
//   DATABASE_URL=... node scripts/migrate-r2-urls.cjs           # sadece rapor (dry-run)
//   DATABASE_URL=... node scripts/migrate-r2-urls.cjs --apply   # degistir
//   CDN_URL=https://cdn.ornek.com ... (varsayilan: https://cdn.zahidemorganizasyon.com)
const { Pool } = require('pg');

const CDN_URL = (process.env.CDN_URL || 'https://cdn.zahidemorganizasyon.com').replace(/\/+$/, '');
const APPLY = process.argv.includes('--apply');
const PATTERN = 'https://pub-[a-z0-9]+\\.r2\\.dev';

// tablo -> URL icerebilecek metin kolonlari
const COLUMNS = {
  Service: ['image', 'gallery', 'longDescription'],
  BlogPost: ['image', 'content'],
  GalleryItem: ['image'],
  SiteSetting: ['value'],
};

(async () => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 1 });
  const c = await pool.connect();
  try {
    await c.query('BEGIN');
    for (const [table, cols] of Object.entries(COLUMNS)) {
      for (const col of cols) {
        const { rows } = await c.query(`SELECT count(*)::int AS n FROM "${table}" WHERE "${col}" ~ $1`, [PATTERN]);
        if (rows[0].n === 0) continue;
        console.log(`${table}.${col}: ${rows[0].n} kayit`);
        if (APPLY) {
          await c.query(`UPDATE "${table}" SET "${col}" = regexp_replace("${col}", $1, $2, 'g') WHERE "${col}" ~ $1`, [PATTERN, CDN_URL]);
        }
      }
    }
    await c.query(APPLY ? 'COMMIT' : 'ROLLBACK');
    console.log(APPLY ? `Tamam: URL'ler ${CDN_URL} adresine cevrildi.` : 'Dry-run bitti. Uygulamak icin --apply ekleyin.');
  } catch (err) {
    await c.query('ROLLBACK');
    throw err;
  } finally {
    c.release();
    await pool.end();
  }
})();
