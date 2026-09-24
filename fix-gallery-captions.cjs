// Galeri alt-metin çeşitlendirmesi: 137 görselde 12 kopya caption vardı.
// Her kategoriye 6 benzersiz caption şablonu, sırayla dağıtılır.
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const templates = {
  "Masa Sandalye Kiralama": ["Tiffany sandalye ve yuvarlak masa kurulumu", "Söz töreni için beyaz sandalye dizimi", "Açık hava davet masa düzeni", "Nişan salonu masa sandalye yerleşimi", "Gold detaylı sandalye giydirme", "Düğün yemeği masa kurulumu İstanbul"],
  "Doğum Günü Organizasyonu": ["Çocuk doğum günü tema fonu ve balon zinciri", "Rakam balonlu doğum günü köşesi", "Pastel tonlarda doğum günü masası", "Prenses temalı parti kurulumu", "Yetişkin doğum günü kokteyl düzeni", "Balon sütunlu doğum günü girişi"],
  "Açılış Organizasyonu": ["Mağaza açılışı balon tag ve sütun kurulumu", "Kurdele kesim töreni hazırlığı", "Açılış kokteyl ikram standı", "Cadde mağazası giriş süslemesi", "Ofis açılışı davet düzeni", "Showroom lansman dekorasyonu"],
  "Söz & Nişan Konsepti": ["Evde söz masası — beyaz gold konsept", "Nişan arka fon ve çiçek kurulumu", "Söz çiçek ve isimlik detayı", "Bohem tarz söz köşesi", "Pembe beyaz nişan masası", "Işıklı isimlikli söz fonu"],
  "Mezuniyet": ["Mezuniyet töreni sahne ve fon kurulumu", "Kep atma alanı balon süslemesi", "Okul bahçesi mezuniyet düzeni", "Mezuniyet balosu masa dekorasyonu", "Diploma töreni giriş tagı", "Balo salonu çiçek aranjmanı"],
  "Kokteyl Organizasyonu": ["Davet kokteyl bistro masa düzeni", "Açılış kokteyl ikram masası", "Kurumsal etkinlik finger food standı", "Kokteyl peçete ve sunum detayı", "Akşam daveti bar düzeni", "Nikah sonrası kokteyl alanı"],
  "Piknik Organizasyonu": ["Açık hava piknik masa ve minder düzeni", "Şirket pikniği alan kurulumu", "Kır bahçesi kahvaltı organizasyonu", "Piknik oyun alanı ve gölgelik", "Aile günü mangal ve ikram düzeni", "Doğa içinde davet sofrası"],
  "Yapay Ağaç Dekoru": ["Mekan girişi yapay ağaç düzenlemesi", "Düğün salonu ağaçlı fon kurulumu", "Restoran içi yapay bitki dekoru", "Fotoğraf köşesi ağaç ve ışık kombosu", "Açık hava yapay ağaç yerleşimi", "Lobi yapay yeşillik tasarımı"],
  "Balon Aranjmanı": ["Zincir balon duvar detayı", "Giriş balon tagı iki sütun", "Rakam folyo balon kompozisyonu", "Tavan balon sarkıt süsleme", "Pastel balon arka fon çerçevesi", "Balon ve çiçek kombine aranjman"],
  "Sevgililer Günü": ["Romantik masa çiçek ve mum düzeni", "Sevgililer günü sürpriz fon kurulumu", "Kalp balonlu kutlama köşesi", "Restoran sürpriz masa süslemesi", "Kırmızı gül aranjman detayı", "Evde romantik akşam konsepti"],
  "Yapay Çiçek Dekoru": ["Gelin masası yapay çiçek aranjmanı", "Arka fon çiçek duvarı kurulumu", "Nişan masası çiçek detayı", "Salon girişi çiçek tagı", "Pasta masası çiçek süslemesi", "Fotoğraf fonu çiçek ve tül kombosu"],
  "Sünnet Organizasyonu": ["Sünnet tahtı ve fon kurulumu", "Şehzade kostümlü taht fotoğraf köşesi", "Sünnet mevlüt oturma düzeni", "Mavi beyaz sünnet balon süslemesi", "Sünnet konvoy araç süslemesi", "Sünnet eğlence alanı palyaço köşesi"],
};

async function main() {
  let total = 0;
  for (const [cat, vars] of Object.entries(templates)) {
    const r = await pool.query('SELECT id FROM "GalleryItem" WHERE category = $1 ORDER BY "order" ASC, id ASC', [cat]);
    for (let i = 0; i < r.rows.length; i++) {
      const caption = `${vars[i % vars.length]} | İstanbul`;
      await pool.query('UPDATE "GalleryItem" SET caption = $1 WHERE id = $2', [caption, r.rows[i].id]);
      total++;
    }
    console.log("OK:", cat, r.rows.length);
  }
  await pool.end();
  console.log("Toplam güncellenen:", total);
}
main().catch((e) => { console.error(e.message); process.exit(1); });
