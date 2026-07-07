import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import fs from "fs";
import path from "path";

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

// Map by position index (0-11)
const slugMap = [
  "dogum-gunu-organizasyonu",    // 0: dogum gunu...
  "mezuniyet",                     // 1: mezuniyet
  "soz-nisan-konsepti",           // 2: nisan...
  "sevgililer-gunu",              // 3: 14 subat...
  "acilis-organizasyonu",         // 4: acilis...
  "masa-sandalye-kiralama",       // 5: masa sandalye...
  "kokteyl-organizasyonu",        // 6: kokteyl...
  "yapay-agac-dekoru",            // 7: yapay agac...
  "yapay-cicek-dekoru",           // 8: yapay cicek...
  "piknik-organizasyonu",         // 9: piknik...
  "sunnet-organizasyonu",         // 10: sunnet...
  "balon-aranjmani",              // 11: balon aranjmani...
];

async function main() {
  const entries = fs.readdirSync(IMAGES_DIR, { withFileTypes: true });
  const dirs = entries.filter(e => e.isDirectory());

  for (let i = 0; i < dirs.length; i++) {
    const folderName = dirs[i].name;
    const folderPath = path.join(IMAGES_DIR, folderName);
    const slug = slugMap[i] || `unknown-${i}`;

    const files = fs.readdirSync(folderPath)
      .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
      .sort();

    if (files.length === 0) {
      console.log(`✕ ${slug}: görsel yok`);
      continue;
    }

    const firstFile = files[0];
    const filePath = path.join(folderPath, firstFile);
    const buffer = fs.readFileSync(filePath);

    const webpBuffer = await sharp(buffer)
      .resize(1920, 1920, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    const filename = `hizmetler/${slug}-${Date.now()}.webp`;

    await r2.send(new PutObjectCommand({
      Bucket: BUCKET,
      Key: filename,
      Body: webpBuffer,
      ContentType: "image/webp",
    }));

    const url = `${PUBLIC_URL}/${filename}`;
    console.log(`✓ ${slug} → ${url}`);
  }
}

main().catch(console.error);
