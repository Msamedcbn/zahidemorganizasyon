import { NextRequest, NextResponse } from "next/server";
import { revalidateSiteData } from "@/lib/site-data";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const items = await prisma.galleryItem.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await req.json();
  const item = await prisma.galleryItem.create({
    data: { image: data.image, caption: data.caption || null, category: data.category || null, order: data.order || 0 },
  });
  revalidateSiteData();
  return NextResponse.json(item);
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, ...data } = await req.json();
  const item = await prisma.galleryItem.update({ where: { id }, data });
  revalidateSiteData();
  return NextResponse.json(item);
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  await prisma.galleryItem.delete({ where: { id } });
  revalidateSiteData();
  return NextResponse.json({ success: true });
}
