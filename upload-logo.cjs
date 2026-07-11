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
const ROOT = "C:\\Users\\coban\\OneDrive\\Masaüstü\\zahidemwebsitesi";

const files = [
  "Ekran g\u00f6r\u00fcnt\u00fcs\u00fc 2026-07-11 090241.png",
  "Ekran g\u00f6r\u00fcnt\u00fcs\u00fc 2026-07-11 090304.png",
];

async function main() {
  for (const file of files) {
    const filePath = path.join(ROOT, file);
    if (!fs.existsSync(filePath)) { console.log("- not found: " + file); continue; }

    const buffer = fs.readFileSync(filePath);
    const webpBuffer = await sharp(buffer)
      .resize(512, 512, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 90 })
      .toBuffer();

    const isSecond = file.includes("090304");
    const filename = isSecond ? "logo/logo-light.webp" : "logo/logo-main.webp";

    await r2.send(new PutObjectCommand({
      Bucket: BUCKET, Key: filename, Body: webpBuffer, ContentType: "image/webp",
    }));

    const url = `${PUBLIC_URL}/${filename}`;
    console.log("+ " + filename + " -> " + url);
  }
}

main().catch(console.error);
