import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(messages);
}

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, isRead } = await req.json();
  const message = await prisma.contactMessage.update({ where: { id }, data: { isRead } });
  return NextResponse.json(message);
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { ids } = await req.json();
  if (ids && Array.isArray(ids)) {
    await prisma.contactMessage.deleteMany({ where: { id: { in: ids } } });
  } else {
    const { id } = await req.json();
    await prisma.contactMessage.delete({ where: { id } });
  }
  return NextResponse.json({ success: true });
}
