import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/data";
import { FluidShapes } from "@/components/ui/FluidShapes";
import { GlassCard } from "@/components/ui/GlassCard";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ArticleSchema, FaqSchema } from "@/components/seo/SchemaJsonLd";

function extractFaqs(html: string): { question: string; answer: string }[] {
  const matches = [...html.matchAll(/<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g)];
  return matches.map((m) => ({
    question: m[1].replace(/<[^>]*>/g, "").trim(),
    answer: m[2].replace(/<[^>]*>/g, "").trim(),
  }));
}

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
    const keywords = [post.focusKeyword, ...(post.tags ? post.tags.split(",").map((t) => t.trim()) : [])].filter(Boolean) as string[];
    return {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt || post.title,
      ...(keywords.length > 0 && { keywords }),
      alternates: { canonical: `https://www.zahidemorganizasyon.com/blog/${slug}` },
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

  const tagList = post.tags ? post.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
  const faqs = extractFaqs(post.content);

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
        keywords={[post.focusKeyword, ...tagList].filter((k): k is string => Boolean(k))}
      />
      {faqs.length > 0 && <FaqSchema questions={faqs} />}
      <div className="relative max-w-7xl mx-auto px-6">
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

        <div className="grid md:grid-cols-3 gap-10">
          <article className="md:col-span-2">
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

            {tagList.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-16">
                {tagList.map((tag) => (
                  <span key={tag} className="glass-card !px-3 !py-1 text-xs text-muted">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {recentPosts.length > 0 && (
              <div>
                <h2 className="text-2xl font-headline font-bold text-foreground mb-6">Son Yazılar</h2>
                <div className="grid sm:grid-cols-3 gap-4">
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

          <div>
            <GlassCard className="p-6 sticky top-28">
              <h3 className="font-headline font-bold text-lg mb-4">Hemen Teklif Alın</h3>
              <div className="space-y-4">
                <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  {siteConfig.phone}
                </a>
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary shrink-0"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  {siteConfig.email}
                </a>
                <a href="https://wa.me/905316632930" className="w-full bg-primary text-white px-4 py-3 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors text-center block">WhatsApp&apos;tan Yaz</a>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
