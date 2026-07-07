-- Schema güncellemeleri - Neon SQL Editor'da çalıştırın

-- Service tablosuna longDescription ekle
ALTER TABLE "Service" ADD COLUMN IF NOT EXISTS "longDescription" TEXT;

-- BlogPost'a yeni alanlar ekle
ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "categoryId" TEXT;
ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "seoTitle" TEXT;
ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "seoDescription" TEXT;

-- GalleryItem'a kategori alanı ekle
ALTER TABLE "GalleryItem" ADD COLUMN IF NOT EXISTS "category" TEXT;

-- Category tablosu
CREATE TABLE IF NOT EXISTS "Category" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "color" TEXT NOT NULL DEFAULT '#C4957A',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "Category_name_key" ON "Category"("name");
CREATE UNIQUE INDEX IF NOT EXISTS "Category_slug_key" ON "Category"("slug");

-- ActivityLog tablosu
CREATE TABLE IF NOT EXISTS "ActivityLog" (
  "id" TEXT NOT NULL,
  "action" TEXT NOT NULL,
  "entity" TEXT NOT NULL,
  "entityId" TEXT,
  "details" TEXT,
  "adminEmail" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("id")
);
