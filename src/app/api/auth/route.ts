import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createToken } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return Response.json({ error: "E-posta ve şifre gerekli" }, { status: 400 });
  }

  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user) {
    return Response.json({ error: "Geçersiz giriş bilgileri" }, { status: 401 });
  }

  const isValid = await compare(password, user.hashedPassword);
  if (!isValid) {
    return Response.json({ error: "Geçersiz giriş bilgileri" }, { status: 401 });
  }

  const token = await createToken({
    id: user.id,
    email: user.email,
    name: user.name,
  });

  return Response.json({ token, user: { id: user.id, email: user.email, name: user.name } });
}
