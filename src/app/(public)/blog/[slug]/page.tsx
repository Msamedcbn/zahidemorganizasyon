import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { FluidShapes } from "@/components/ui/FluidShapes";
import { GlassCard } from "@/components/ui/GlassCard";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ArticleSchema } from "@/components/seo/SchemaJsonLd";

export async function generateStaticParams() {
  try {
    const posts = await prisma.blogPost.findMany({ where: { published: true } });
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await prisma.blogPost.findUnique({ where: { slug } });
    if (!post) return { title: "Sayfa Bulunamadı" };
    return {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt || post.title,
      alternates: { canonical: `https://zahidemorganizasyon.com/blog/${slug}` },
      openGraph: {
        title: post.seoTitle || post.title,
        description: post.excerpt || post.title,
        type: "article",
        publishedTime: post.createdAt.toISOString(),
        ...(post.image && { images: [{ url: post.image, width: 1200, height: 630 }] }),
      },
      twitter: {
        card: "summary_large_image",
        title: post.seoTitle || post.title,
        description: post.excerpt || post.title,
        ...(post.image && { images: [post.image] }),
      },
    };
  } catch {
    return { title: "Blog" };
  }
}

export default async function BlogDetayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let post: Awaited<ReturnType<typeof prisma.blogPost.findUnique>> | null = null;
  try {
    post = await prisma.blogPost.findUnique({ where: { slug } });
  } catch {
    // Database not available
  }

  if (!post || !post.published) notFound();

  let recentPosts: Awaited<ReturnType<typeof prisma.blogPost.findMany>> = [];
  try {
    recentPosts = await prisma.blogPost.findMany({
      where: { published: true, id: { not: post.id } },
      orderBy: { createdAt: "desc" },
      take: 3,
    });
  } catch {
    // Database not available
  }

  return (
      <div className="relative pt-32 pb-16 min-h-screen">
      <FluidShapes />
      <ArticleSchema
        title={post.seoTitle || post.title}
        description={post.seoDescription || post.excerpt || post.title}
        slug={post.slug}
        image={post.image}
        author={post.author}
        publishedTime={post.createdAt.toISOString()}
        modifiedTime={post.updatedAt.toISOString()}
      />
      <article className="relative max-w-4xl mx-auto px-6">
        <Breadcrumbs items={[
          { name: "Ana Sayfa", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.title, url: `/blog/${post.slug}` },
        ]} />
        <div className="mb-8">
          <Link href="/blog" className="text-sm text-muted hover:text-primary transition-colors flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
            </svg>
            Blog&apos;a Dön
          </Link>
        </div>

        <header className="mb-10">
          {post.category && (
            <span className="inline-block glass-card !px-3 !py-1 text-xs text-muted mb-4">
              {post.category}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-headline font-bold text-foreground mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-muted">
            <span>{post.author}</span>
            <span>·</span>
            <time>{new Date(post.createdAt).toLocaleDateString("tr-TR")}</time>
          </div>
        </header>

        <div
          className="prose prose-lg max-w-none text-muted leading-relaxed mb-16 [&_h2]:text-foreground [&_h2]:font-headline [&_h2]:font-bold [&_h3]:text-foreground [&_h3]:font-headline [&_h3]:font-bold [&_a]:text-primary [&_img]:rounded-xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {recentPosts.length > 0 && (
          <div>
            <h2 className="text-2xl font-headline font-bold text-foreground mb-6">Son Yazılar</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {recentPosts.map((rp) => (
                <Link key={rp.id} href={`/blog/${rp.slug}`}>
                  <GlassCard className="p-5 h-full">
                    <h3 className="font-headline font-bold text-sm text-foreground mb-2">{rp.title}</h3>
                    <p className="text-xs text-muted">{rp.excerpt?.slice(0, 80)}...</p>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
