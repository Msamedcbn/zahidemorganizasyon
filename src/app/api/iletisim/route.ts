import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const data = await req.json();

  if (!data.name || !data.email || !data.message) {
    return NextResponse.json({ error: "Ad, e-posta ve mesaj zorunludur." }, { status: 400 });
  }

  const message = await prisma.contactMessage.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      subject: data.subject || null,
      message: data.message,
    },
  });

  return NextResponse.json({ success: true, message: "Mesajınız başarıyla gönderildi." });
}
