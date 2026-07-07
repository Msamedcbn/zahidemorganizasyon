const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
(async () => {
  const c = await pool.connect();
  await c.query('UPDATE "SiteSetting" SET value = $1 WHERE key = $2', ['Abdurrahmangazi, Aktutan Cd. No:1, 34920 Sultanbeyli/İstanbul', 'address']);
  await c.query('UPDATE "SiteSetting" SET value = $1 WHERE key = $2', ['https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3012.9325778377342!2d29.259031276423126!3d40.96105582233063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cad07188d299a5%3A0x90304b6c7c0ab556!2sAbdurrahmangazi%2C%20Aktutan%20Cd.%20No%3A1%2C%2034920%20Sultanbeyli%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1783363503767!5m2!1str!2str', 'mapsUrl']);
  console.log('+ address and maps updated');
  c.release();
  await pool.end();
})();
