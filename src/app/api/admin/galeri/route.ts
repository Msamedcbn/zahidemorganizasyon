import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
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
  revalidatePath("/", "layout");
  return NextResponse.json(item);
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, ...data } = await req.json();
  const item = await prisma.galleryItem.update({ where: { id }, data });
  revalidatePath("/", "layout");
  return NextResponse.json(item);
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  await prisma.galleryItem.delete({ where: { id } });
  revalidatePath("/", "layout");
  return NextResponse.json({ success: true });
}
