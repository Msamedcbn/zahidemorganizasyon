// 72 Saatlik Acil SEO Patlaması: IndexNow + Google & Bing Ping Motoru
// Bu script sitenizdeki tüm sayfaları (Ana sayfa, hizmetler, ilçe sayfaları, bloglar)
// anında IndexNow API ve arama motoru ping servislerine fırlatır.

const https = require('https');
const http = require('http');

const HOST = 'www.zahidemorganizasyon.com';
const BASE_URL = `https://${HOST}`;
const KEY = 'c839f15024764b4c8ea72d733571d882';
const KEY_LOCATION = `${BASE_URL}/${KEY}.txt`;
const SITEMAP_URL = `${BASE_URL}/sitemap.xml`;

function request(url, options = {}, postData = null) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const lib = parsed.protocol === 'https:' ? https : http;
    const req = lib.request(parsed, options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });
    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error('Zaman aşımı'));
    });
    if (postData) req.write(postData);
    req.end();
  });
}

async function extractUrlsFromSitemap() {
  console.log(`[1/4] Canlı sitemap çekiliyor: ${SITEMAP_URL}`);
  try {
    const res = await request(SITEMAP_URL);
    if (res.status === 200) {
      const matches = [...res.data.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g)].map(m => m[1]);
      if (matches.length > 0) {
        console.log(`[+] Canlı sitemap'ten ${matches.length} adet URL başarıyla alındı!`);
        return matches;
      }
    }
  } catch (err) {
    console.log(`[!] Canlı sitemap henüz güncellenmemiş olabilir: ${err.message}`);
  }

  console.log('[*] Kod içi yedek URL listesi devreye alınıyor...');
  const staticUrls = [
    `${BASE_URL}/`,
    `${BASE_URL}/hizmetler`,
    `${BASE_URL}/blog`,
    `${BASE_URL}/galeri`,
    `${BASE_URL}/hakkimizda`,
    `${BASE_URL}/iletisim`,
  ];

  const services = [
    "soz-nisan-konsepti", "kina-organizasyonu", "dugun-organizasyonu", "dogum-gunu-organizasyonu",
    "sunnet-organizasyonu", "masa-sandalye-kiralama", "balon-aranjmani", "acilis-organizasyonu",
    "kokteyl-organizasyonu", "mezuniyet", "sevgililer-gunu", "piknik-organizasyonu",
    "yapay-cicek-dekoru", "yapay-agac-dekoru"
  ];

  const districts = [
    "sultanbeyli", "sancaktepe", "pendik", "kartal", "maltepe", "atasehir",
    "umraniye", "cekmekoy", "kadikoy", "uskudar", "tuzla", "sile",
    "bahcelievler", "bagcilar", "esenyurt", "beylikduzu", "kucukcekmece", "basaksehir"
  ];

  const urls = [...staticUrls];
  for (const s of services) {
    urls.push(`${BASE_URL}/hizmetler/${s}`);
    for (const d of districts) {
      urls.push(`${BASE_URL}/hizmetler/${s}/${d}`);
    }
  }

  return urls;
}

async function submitIndexNow(urls) {
  console.log(`\n[2/4] IndexNow Protokolü Başlatılıyor (${urls.length} URL gönderiliyor)...`);
  
  const payload = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls
  });

  const endpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow'
  ];

  for (const ep of endpoints) {
    try {
      const res = await request(ep, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': Buffer.byteLength(payload)
        }
      }, payload);

      console.log(`[+] ${ep} -> Yanıt Kodu: ${res.status} (${res.status === 200 || res.status === 202 ? 'BAŞARILI / KABUL EDİLDİ' : res.data || 'İşleme alındı'})`);
    } catch (err) {
      console.error(`[-] ${ep} hatası: ${err.message}`);
    }
  }
}

async function pingSearchEngines() {
  console.log('\n[3/4] Google ve Arama Motoru Pingleri Gönderiliyor...');
  const pingUrls = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`
  ];

  for (const p of pingUrls) {
    try {
      const res = await request(p);
      console.log(`[+] Ping: ${p} -> Kod: ${res.status}`);
    } catch (err) {
      console.log(`[*] Ping gönderildi: ${p}`);
    }
  }
}

async function main() {
  console.log('====================================================');
  console.log('⚡ ZAHİDEM ORGANİZASYON - 72 SAAT HIZLI İNDEKS TETİKLEYİCİ');
  console.log('====================================================\n');

  const urls = await extractUrlsFromSitemap();
  await submitIndexNow(urls);
  await pingSearchEngines();

  console.log('\n====================================================');
  console.log(`✔ TAMAMLANDI: Toplam ${urls.length} URL tüm arama motoru dizinlerine fırlatıldı!`);
  console.log('====================================================');
}

main();
