import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const settings = await prisma.siteSetting.findMany();
  const map: Record<string, string> = {};
  settings.forEach((s) => { map[s.key] = s.value; });
  return NextResponse.json(map);
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  const results: Record<string, string> = {};

  for (const [key, value] of Object.entries(data)) {
    const setting = await prisma.siteSetting.upsert({
      where: { key },
      update: { value: value as string },
      create: { key, value: value as string },
    });
    results[setting.key] = setting.value;
  }

  revalidatePath("/", "layout");
  return NextResponse.json(results);
}
