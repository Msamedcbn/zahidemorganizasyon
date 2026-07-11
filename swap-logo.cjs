const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
(async () => {
  const c = await pool.connect();
  await c.query('UPDATE "SiteSetting" SET value = $1 WHERE key = $2',
    ['https://pub-365b4e03c8dc46d7919fac8a7ec75bed.r2.dev/logo/logo-light.webp', 'logo']);
  console.log('+ logo updated');
  c.release();
  await pool.end();
})();
