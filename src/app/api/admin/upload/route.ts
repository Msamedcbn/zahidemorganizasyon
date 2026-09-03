import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { r2, R2_BUCKET, R2_PUBLIC_URL, R2_ENDPOINT_HOST } from "@/lib/r2";
import { auth } from "@/lib/auth";

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

    // R2 PUT can report success without the object actually being retrievable
    // (wrong bucket/credentials pointing elsewhere). Confirm it landed before
    // telling the client the upload worked, so failures surface immediately
    // instead of as a silently-broken image URL later.
    try {
      await r2.send(new HeadObjectCommand({ Bucket: R2_BUCKET, Key: filename }));
    } catch (verifyErr) {
      const detail = verifyErr instanceof Error ? verifyErr.message : "Bilinmeyen hata";
      throw new Error(`Görsel R2'ye yazıldı ama doğrulanamadı (bucket/URL uyuşmazlığı olabilir): ${detail}`);
    }

    const url = `${R2_PUBLIC_URL}/${filename}`;

    return NextResponse.json({ url, filename });
  } catch (err) {
    console.error("upload error:", err, { R2_BUCKET, R2_PUBLIC_URL, R2_ENDPOINT_HOST });
    const message = err instanceof Error ? err.message : "Bilinmeyen hata";
    return NextResponse.json(
      { error: `Yükleme hatası: ${message} [bucket=${R2_BUCKET}, publicUrl=${R2_PUBLIC_URL}, endpoint=${R2_ENDPOINT_HOST}]` },
      { status: 500 }
    );
  }
}
