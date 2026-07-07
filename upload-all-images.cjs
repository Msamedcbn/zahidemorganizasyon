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

const slugMap = [
  "dogum-gunu-organizasyonu", "mezuniyet", "soz-nisan-konsepti", "sevgililer-gunu",
  "acilis-organizasyonu", "masa-sandalye-kiralama", "kokteyl-organizasyonu", "yapay-agac-dekoru",
  "yapay-cicek-dekoru", "piknik-organizasyonu", "sunnet-organizasyonu", "balon-aranjmani",
];

async function uploadAll() {
  const entries = fs.readdirSync(IMAGES_DIR, { withFileTypes: true });
  const dirs = entries.filter((e) => e.isDirectory());
  const allResults = [];

  for (let i = 0; i < dirs.length; i++) {
    const folderName = dirs[i].name;
    const folderPath = path.join(IMAGES_DIR, folderName);
    const slug = slugMap[i] || "unknown";

    const files = fs.readdirSync(folderPath)
      .filter((f) => /\.(jpg|jpeg|png)$/i.test(f))
      .sort();

    if (files.length === 0) { console.log(`- ${slug}: no images`); continue; }

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

    allResults.push({ slug, urls, count: urls.length });
    console.log(`+ ${slug}: ${urls.length} images uploaded`);
  }

  // Output as SQL updates
  console.log("\n=== SQL Updates ===");
  for (const r of allResults) {
    if (r.urls.length > 0) {
      const json = JSON.stringify(r.urls);
      console.log(`UPDATE "Service" SET "gallery" = '${json.replace(/'/g, "''")}' WHERE slug = '${r.slug}';`);
    }
  }
}

uploadAll().catch(console.error);
