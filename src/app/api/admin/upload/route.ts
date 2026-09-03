import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
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

    const putResult = await r2.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: filename,
        Body: webpBuffer,
        ContentType: "image/webp",
      })
    );

    const url = `${R2_PUBLIC_URL}/${filename}`;
    const putInfo = `httpStatus=${putResult.$metadata.httpStatusCode}, requestId=${putResult.$metadata.requestId}, etag=${putResult.ETag}, bodyBytes=${webpBuffer.length}`;

    // A HeadObject check against R2_BUCKET isn't enough: if R2_BUCKET points to a
    // different bucket than the one R2_PUBLIC_URL's custom domain is actually bound
    // to, the S3-API check succeeds while the public URL 404s. Verify the exact
    // public URL the browser will use is really reachable before reporting success.
    // One retry allows for brief edge-propagation delay before treating it as a
    // genuine misconfiguration.
    let verifyRes = await fetch(url, { method: "GET", cache: "no-store" });
    if (!verifyRes.ok) {
      await new Promise((r) => setTimeout(r, 800));
      verifyRes = await fetch(url, { method: "GET", cache: "no-store" });
    }
    if (!verifyRes.ok) {
      throw new Error(
        `Görsel R2'ye yazıldı ama genel URL'den okunamıyor (HTTP ${verifyRes.status}): ${url}. PUT yanıtı: [${putInfo}]`
      );
    }

    return NextResponse.json({ url, filename, debug: putInfo });
  } catch (err) {
    console.error("upload error:", err, { R2_BUCKET, R2_PUBLIC_URL, R2_ENDPOINT_HOST });
    const message = err instanceof Error ? err.message : "Bilinmeyen hata";
    return NextResponse.json(
      { error: `Yükleme hatası: ${message} [bucket=${R2_BUCKET}, publicUrl=${R2_PUBLIC_URL}, endpoint=${R2_ENDPOINT_HOST}]` },
      { status: 500 }
    );
  }
}
