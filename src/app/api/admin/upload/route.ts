import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { r2, R2_BUCKET, R2_PUBLIC_URL } from "@/lib/r2";
import { auth } from "@/lib/auth";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "uploads";

    if (!file) return NextResponse.json({ error: "Dosya gerekli" }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());

    // Convert to webp with sharp (auto-rotate based on EXIF orientation first)
    const webpBuffer = await sharp(buffer)
      .rotate()
      .resize(1920, 1920, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    const ext = "webp";
    const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    await r2.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: filename,
        Body: webpBuffer,
        ContentType: "image/webp",
      })
    );

    const url = `${R2_PUBLIC_URL}/${filename}`;

    // The custom domain fronting R2 can take a few seconds to propagate a brand
    // new object across Cloudflare's edge right after DNS/SSL activation. Retry
    // with backoff before giving up, so a transient edge miss doesn't surface as
    // a broken image URL.
    let verifyRes = await fetch(url, { method: "GET", cache: "no-store" });
    for (const delayMs of [500, 1500, 3000]) {
      if (verifyRes.ok) break;
      await sleep(delayMs);
      verifyRes = await fetch(url, { method: "GET", cache: "no-store" });
    }
    if (!verifyRes.ok) {
      throw new Error(`Görsel yüklendi ama şu anda erişilemiyor (HTTP ${verifyRes.status}). Lütfen tekrar deneyin.`);
    }

    return NextResponse.json({ url, filename });
  } catch (err) {
    console.error("upload error:", err);
    const message = err instanceof Error ? err.message : "Bilinmeyen hata";
    return NextResponse.json({ error: `Yükleme hatası: ${message}` }, { status: 500 });
  }
}
