import { unstable_cache, revalidatePath, revalidateTag } from "next/cache";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { prisma } from "@/lib/prisma";
import type { Service, BlogPost, GalleryItem } from "@/generated/prisma";

// Public sayfalarin okudugu tum veri bu dosyadan gecer.
//
// Neden: Her ISR yenilemesi, bot taramasi ve sitemap istegi dogrudan Neon'a
// gidiyordu; compute surekli uyanik kaldigi icin aylik CU-saat kotasi doluyordu.
// Artik her tablo tek bir kalici cache girdisinde tutuluyor ve sadece admin
// panelinden bir degisiklik yapildiginda (revalidateSiteData) yenileniyor.
// Sayfa sayisi ne olursa olsun Neon'a giden sorgu sayisi ~4'te kaliyor.
export const SITE_DATA_TAG = "site-data";

// Eski pub-*.r2.dev adresleri Cloudflare tarafindan rate-limit'e tabi ve
// production icin desteklenmiyor; trafik artinca 429 donup gorseller kopuyor.
// DB'de kalan eski URL'leri okurken custom domain'e ceviriyoruz.
const LEGACY_R2_HOST = /https:\/\/pub-[a-z0-9]+\.r2\.dev/g;
const envPublicUrl = process.env.R2_PUBLIC_URL?.replace(/\/+$/, "");
const CDN_URL = envPublicUrl && !envPublicUrl.includes(".r2.dev") ? envPublicUrl : "https://cdn.zahidemorganizasyon.com";

export function toCdnUrl(url: string): string {
  return url.replace(LEGACY_R2_HOST, CDN_URL);
}

function rewriteUrls<T>(value: T): T {
  if (typeof value === "string") return toCdnUrl(value) as T;
  if (Array.isArray(value)) return value.map(rewriteUrls) as T;
  if (value && typeof value === "object" && !(value instanceof Date)) {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, rewriteUrls(v)])) as T;
  }
  return value;
}

// DB hatasi cache'e yazilmaz ve sayfaya kadar firlatilir: ISR yenilemesi sirasinda
// hata olursa Next.js son basarili sayfayi sunmaya devam eder (bos/gorselsiz sayfa
// cache'lenmez). Sadece build sirasinda DB'ye ulasilamazsa statik yedeklere dusuyoruz.
const warnedKeys = new Set<string>();

function cachedQuery<T>(key: string, query: () => Promise<T>, buildFallback: T) {
  const cached = unstable_cache(async () => rewriteUrls(await query()), ["site-data-v1", key], {
    tags: [SITE_DATA_TAG],
  });
  return async (): Promise<T> => {
    try {
      return await cached();
    } catch (err) {
      if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
        if (!warnedKeys.has(key)) {
          warnedKeys.add(key);
          console.warn(`[site-data] ${key} build sirasinda okunamadi, yedek veri kullaniliyor: ${err instanceof Error ? err.message.trim().split("\n").pop() : err}`);
        }
        return buildFallback;
      }
      throw err;
    }
  };
}

// unstable_cache sonucu JSON olarak sakladigi icin Date alanlari string doner.
function withDates<T extends { createdAt: Date | string; updatedAt?: Date | string }>(row: T): T {
  return {
    ...row,
    createdAt: new Date(row.createdAt),
    ...(row.updatedAt !== undefined && { updatedAt: new Date(row.updatedAt) }),
  };
}

const settingsQuery = cachedQuery(
  "settings",
  async () => {
    const rows = await prisma.siteSetting.findMany();
    const map: Record<string, string> = {};
    rows.forEach((s) => { map[s.key] = s.value; });
    return map;
  },
  {} as Record<string, string>,
);

const servicesQuery = cachedQuery(
  "services",
  () => prisma.service.findMany({ orderBy: { order: "asc" } }),
  [] as Service[],
);

const postsQuery = cachedQuery(
  "published-posts",
  () => prisma.blogPost.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } }),
  [] as BlogPost[],
);

const galleryQuery = cachedQuery(
  "gallery",
  () => prisma.galleryItem.findMany({ orderBy: { order: "asc" } }),
  [] as GalleryItem[],
);

export const getSettings = settingsQuery;

export async function getAllServices(): Promise<Service[]> {
  return (await servicesQuery()).map(withDates);
}

export async function getActiveServices(): Promise<Service[]> {
  return (await getAllServices()).filter((s) => s.isActive);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return (await getAllServices()).find((s) => s.slug === slug) ?? null;
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  return (await postsQuery()).map(withDates);
}

export async function getPublishedPostBySlug(slug: string): Promise<BlogPost | null> {
  return (await getPublishedPosts()).find((p) => p.slug === slug) ?? null;
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  return (await galleryQuery()).map(withDates);
}

// Admin panelinde yapilan her degisiklikten sonra cagrilir.
export function revalidateSiteData() {
  revalidateTag(SITE_DATA_TAG, { expire: 0 });
  revalidatePath("/", "layout");
}
