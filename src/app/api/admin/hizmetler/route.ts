import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(services);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  const service = await prisma.service.create({
    data: {
      title: data.title,
      slug: data.slug,
      description: data.description,
      longDescription: data.longDescription || "",
      icon: data.icon || "Ring",
      image: data.image || null,
      order: data.order || 0,
      isActive: data.isActive !== false,
    },
  });
  return NextResponse.json(service);
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, ...data } = await req.json();
  const service = await prisma.service.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      description: data.description,
      longDescription: data.longDescription,
      icon: data.icon,
      image: data.image,
      order: data.order,
      isActive: data.isActive,
    },
  });
  return NextResponse.json(service);
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  await prisma.service.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
