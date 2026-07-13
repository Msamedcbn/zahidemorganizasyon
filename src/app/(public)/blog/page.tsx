import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { FluidShapes } from "@/components/ui/FluidShapes";
import { GlassCard } from "@/components/ui/GlassCard";

export const metadata: Metadata = {
  title: "Blog",
  description: "Organizasyon trendleri, etkinlik fikirleri ve Zahidem Organizasyon haberleri.",
};

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof prisma.blogPost.findMany>> = [];
  try {
    posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    // Database not available during build
  }

  return (
    <div className="relative pt-32 pb-16 min-h-screen">
      <FluidShapes />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-4">
            Blog & Haberler
          </h1>
          <p className="text-muted text-lg max-w-xl mx-auto">
            Organizasyon trendleri, etkinlik fikirleri ve ipuçları
          </p>
          <div className="w-20 h-0.5 bg-primary mx-auto mt-6" />
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted">Henüz blog yazısı bulunmuyor.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className={`${i === 0 ? "md:col-span-2 lg:col-span-2" : ""}`}
              >
                <GlassCard className={`h-full ${i === 0 ? "p-8" : "p-6"}`}>
                  {post.image && (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4 bg-primary/5">
                      <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                    </div>
                  )}
                  {post.category && (
                    <span className="inline-block glass-card !px-3 !py-1 text-xs text-muted mb-3">
                      {post.category}
                    </span>
                  )}
                  <h2 className={`font-headline font-bold text-foreground mb-2 ${i === 0 ? "text-2xl" : "text-lg"}`}>
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-sm text-muted line-clamp-2">{post.excerpt}</p>
                  )}
                  <div className="flex items-center gap-3 mt-4 text-xs text-muted">
                    <span>{post.author}</span>
                    <span>·</span>
                    <span>{new Date(post.createdAt).toLocaleDateString("tr-TR")}</span>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
