const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
(async () => {
  const c = await pool.connect();
  await c.query('INSERT INTO "SiteSetting" (id, key, value) VALUES ($1, $2, $3) ON CONFLICT (key) DO UPDATE SET value = $3',
    ['logo', 'logo', 'https://pub-365b4e03c8dc46d7919fac8a7ec75bed.r2.dev/logo/logo-main.webp']);
  console.log('+ logo saved');
  c.release();
  await pool.end();
})();
