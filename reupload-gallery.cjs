const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const r2 = new S3Client({
  region: "auto",
  endpoint: "https://56de2cc321dbcf653f06727736559244.r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: "4f111d4d41ae3158a6c0aec6e8dd07c4",
    secretAccessKey: "dfc8d5fe39313385a3677ce78be754de19bac4e1c48a5a004041395f6dd9d638",
  },
});

const BUCKET = "zahidemorganizasyon";
const PUBLIC_URL = "https://pub-365b4e03c8dc46d7919fac8a7ec75bed.r2.dev";
const IMAGES_DIR = "C:\\Users\\coban\\OneDrive\\Masaüstü\\görseller";

// Correct mapping based on actual Windows folder order
const folderToSlug = {
  "14 subat sevgililer gunu": "sevgililer-gunu",
  "acilis organizasyonu": "acilis-organizasyonu",
  "balon aranjmani": "balon-aranjmani",
  "dogum gunu organizasyonu": "dogum-gunu-organizasyonu",
  "kokteyl masasi": "kokteyl-organizasyonu",
  "masa sandalye kiralama": "masa-sandalye-kiralama",
  "mezuniyet": "mezuniyet",
  "nisan organizasyonu": "soz-nisan-konsepti",
  "piknik organizasyonu": "piknik-organizasyonu",
  "sunnet organizasyonu": "sunnet-organizasyonu",
  "yapay agac dekoru": "yapay-agac-dekoru",
  "yapay cicek dekoru": "yapay-cicek-dekoru",
};

async function main() {
  const entries = fs.readdirSync(IMAGES_DIR, { withFileTypes: true });
  const dirs = entries.filter((e) => e.isDirectory());

  for (const dir of dirs) {
    const folderName = dir.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/ı/g, "i").replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s").replace(/ö/g, "o").replace(/ç/g, "c");
    const slug = folderToSlug[folderName] || "unknown";
    const folderPath = path.join(IMAGES_DIR, dir.name);

    const files = fs.readdirSync(folderPath).filter((f) => /\.(jpg|jpeg|png)$/i.test(f)).sort();

    const [existing] = await Promise.all([Promise.resolve()]);
    const urls = [];

    for (const file of files) {
      const buffer = fs.readFileSync(path.join(folderPath, file));
      const webpBuffer = await sharp(buffer)
        .resize(1920, 1920, { fit: "inside", withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer();
      const filename = `hizmetler/${slug}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.webp`;
      await r2.send(new PutObjectCommand({
        Bucket: BUCKET, Key: filename, Body: webpBuffer, ContentType: "image/webp",
      }));
      urls.push(`${PUBLIC_URL}/${filename}`);
    }
    console.log(`+ ${slug}: ${urls.length} images`);
    console.log(`-- SQL for ${slug}:`);
    console.log(`UPDATE "Service" SET "gallery" = '${JSON.stringify(urls).replace(/'/g, "''")}' WHERE slug = '${slug}';`);
  }

  console.log("\n=== ALL DONE ===");
}
main().catch(console.error);
