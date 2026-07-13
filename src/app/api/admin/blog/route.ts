import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await req.json();
  const post = await prisma.blogPost.create({
    data: {
      title: data.title,
      slug: data.slug,
      content: data.content || "",
      excerpt: data.excerpt || null,
      category: data.category || null,
      categoryId: data.categoryId || null,
      image: data.image || null,
      author: data.author || "Zahidem Organizasyon",
      published: data.published || false,
      seoTitle: data.seoTitle || null,
      seoDescription: data.seoDescription || null,
    },
  });
  revalidatePath("/", "layout");
  return NextResponse.json(post);
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, ...data } = await req.json();
  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      content: data.content,
      excerpt: data.excerpt,
      category: data.category,
      categoryId: data.categoryId,
      image: data.image,
      author: data.author,
      published: data.published,
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
    },
  });
  revalidatePath("/", "layout");
  return NextResponse.json(post);
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/", "layout");
  return NextResponse.json({ success: true });
}
