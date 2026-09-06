import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { r2, R2_BUCKET, R2_PUBLIC_URL } from "@/lib/r2";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { url, degrees } = await req.json();
    if (typeof url !== "string" || ![90, -90, 180].includes(degrees)) {
      return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
    }

    // A just-rotated (or just-uploaded) object can take a few seconds to become
    // servable through the R2 custom domain's edge layer, even though it's
    // already durably written. Retry with backoff before failing.
    let sourceRes = await fetch(url, { cache: "no-store" });
    for (const delayMs of [1000, 2000, 4000, 8000]) {
      if (sourceRes.ok) break;
      await new Promise((r) => setTimeout(r, delayMs));
      sourceRes = await fetch(url, { cache: "no-store" });
    }
    if (!sourceRes.ok) throw new Error(`Kaynak görsel okunamadı (HTTP ${sourceRes.status})`);
    const buffer = Buffer.from(await sourceRes.arrayBuffer());

    const rotatedBuffer = await sharp(buffer)
      .rotate(degrees)
      .webp({ quality: 80 })
      .toBuffer();

    // Reuse the folder from the source URL so the rotated copy lands next to
    // the original in R2, then always write through the current (working)
    // bucket/domain regardless of where the source image was hosted.
    let folder = "galeri";
    try {
      const parts = new URL(url).pathname.split("/").filter(Boolean);
      if (parts.length > 1) folder = parts.slice(0, -1).join("/");
    } catch {}

    const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.webp`;

    await r2.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: filename,
        Body: rotatedBuffer,
        ContentType: "image/webp",
      })
    );

    return NextResponse.json({ url: `${R2_PUBLIC_URL}/${filename}` });
  } catch (err) {
    console.error("rotate-image error:", err);
    const message = err instanceof Error ? err.message : "Bilinmeyen hata";
    return NextResponse.json({ error: `Döndürme hatası: ${message}` }, { status: 500 });
  }
}
