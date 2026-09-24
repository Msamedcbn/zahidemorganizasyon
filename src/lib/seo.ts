import { slugifyTr } from "./slugify";

// Her hizmet için elle yazılmış, tıklama odaklı SEO başlık + açıklama.
// Format: [Hizmet] İstanbul + CTR kancası (fiyat/teklif/ücretsiz keşif).
// 55-60 karakter title, 150-160 karakter description hedeflendi.
export const serviceSeo: Record<string, { seoTitle: string; seoDescription: string; h1: string; keywords: string[] }> = {
  "dogum-gunu-organizasyonu": {
    seoTitle: "İstanbul Doğum Günü Organizasyonu | Ücretsiz Keşif",
    seoDescription:
      "İstanbul'da doğum günü organizasyonu: temalı konsept, balon süsleme, masa düzeni ve eğlence. 38 ilçede ücretsiz keşif ve aynı gün teklif için arayın.",
    h1: "İstanbul Doğum Günü Organizasyonu",
    keywords: ["doğum günü organizasyonu istanbul", "doğum günü süsleme", "çocuk doğum günü konsepti"],
  },
  "mezuniyet": {
    seoTitle: "İstanbul Mezuniyet Organizasyonu | Okul & Balo",
    seoDescription:
      "İstanbul'da mezuniyet organizasyonu: okul töreni, balo, kep atma konsepti ve sahne kurulumu. Ücretsiz keşif için hemen teklif alın.",
    h1: "İstanbul Mezuniyet Organizasyonu",
    keywords: ["mezuniyet organizasyonu istanbul", "mezuniyet balosu", "okul mezuniyet töreni"],
  },
  "soz-nisan-konsepti": {
    seoTitle: "İstanbul Söz & Nişan Organizasyonu | Evde Konsept",
    seoDescription:
      "İstanbul'da söz ve nişan organizasyonu: evde konsept kurulum, masa sandalye, çiçek ve ikram düzeni. Sultanbeyli merkezli, 38 ilçede hizmet.",
    h1: "İstanbul Söz & Nişan Organizasyonu",
    keywords: ["söz organizasyonu istanbul", "nişan organizasyonu", "evde söz konsepti", "söz masası süsleme"],
  },
  "sevgililer-gunu": {
    seoTitle: "Sevgililer Günü Sürprizi İstanbul | Romantik Konsept",
    seoDescription:
      "İstanbul'da Sevgililer Günü sürprizi: romantik masa, çiçek, balon ve mekan dekorasyonu. Sevgilinize unutulmaz bir gün için teklif alın.",
    h1: "İstanbul Sevgililer Günü Organizasyonu",
    keywords: ["sevgililer günü sürprizi istanbul", "romantik sürpriz organizasyon"],
  },
  "acilis-organizasyonu": {
    seoTitle: "İstanbul Açılış Organizasyonu | Mağaza & Ofis",
    seoDescription:
      "İstanbul'da açılış organizasyonu: balon süsleme, kokteyl, sunucu ve lansman düzeni. Kurumsal açılışlar için profesyonel ekip, ücretsiz keşif.",
    h1: "İstanbul Açılış Organizasyonu",
    keywords: ["açılış organizasyonu istanbul", "mağaza açılışı", "işyeri açılış süsleme"],
  },
  "masa-sandalye-kiralama": {
    seoTitle: "İstanbul Masa Sandalye Kiralama | Söz & Düğün",
    seoDescription:
      "İstanbul'da masa sandalye kiralama: söz, nişan, düğün ve etkinlikler için şık modeller, kurulum dahil. Günlük kiralama fiyatları için arayın.",
    h1: "İstanbul Masa Sandalye Kiralama",
    keywords: ["masa sandalye kiralama istanbul", "söz masası kiralama", "organizasyon sandalye kiralama"],
  },
  "kokteyl-organizasyonu": {
    seoTitle: "İstanbul Kokteyl Organizasyonu | Davet & Etkinlik",
    seoDescription:
      "İstanbul'da kokteyl organizasyonu: kurumsal davet, açılış ve özel günler için ikram düzeni ve servis. Menü ve fiyat için teklif alın.",
    h1: "İstanbul Kokteyl Organizasyonu",
    keywords: ["kokteyl organizasyonu istanbul", "davet ikram servisi"],
  },
  "yapay-agac-dekoru": {
    seoTitle: "Yapay Ağaç Dekoru İstanbul | Mekan & Düğün",
    seoDescription:
      "İstanbul'da yapay ağaç dekoru: düğün, mekan ve etkinlikler için gerçekçi ağaç kurulumu. Kiralama ve satış seçenekleri için arayın.",
    h1: "İstanbul Yapay Ağaç Dekoru",
    keywords: ["yapay ağaç dekoru", "yapay ağaç kiralama istanbul"],
  },
  "yapay-cicek-dekoru": {
    seoTitle: "Yapay Çiçek Dekoru İstanbul | Gelin Masası & Arka Fon",
    seoDescription:
      "İstanbul'da yapay çiçek dekoru: söz, nişan ve düğün için gelin masası, arka fon ve mekan süsleme. Konsept kataloğu için yazın.",
    h1: "İstanbul Yapay Çiçek Dekoru",
    keywords: ["yapay çiçek dekoru istanbul", "söz çiçek konsepti", "gelin masası süsleme"],
  },
  "piknik-organizasyonu": {
    seoTitle: "İstanbul Piknik Organizasyonu | Şirket & Aile",
    seoDescription:
      "İstanbul'da piknik organizasyonu: şirket pikniği, aile günü ve açık hava etkinlikleri için alan kurulumu ve ikram. Teklif için arayın.",
    h1: "İstanbul Piknik Organizasyonu",
    keywords: ["piknik organizasyonu istanbul", "şirket pikniği"],
  },
  "sunnet-organizasyonu": {
    seoTitle: "İstanbul Sünnet Organizasyonu | Taht & Konvoy",
    seoDescription:
      "İstanbul'da sünnet organizasyonu: sünnet tahtı, mevlüt düzeni, balon süsleme ve eğlence. Geleneksel ve modern konseptler için teklif alın.",
    h1: "İstanbul Sünnet Organizasyonu",
    keywords: ["sünnet organizasyonu istanbul", "sünnet düğünü", "sünnet tahtı kiralama"],
  },
  "balon-aranjmani": {
    seoTitle: "İstanbul Balon Süsleme & Aranjman | Doğum Günü",
    seoDescription:
      "İstanbul'da balon süsleme: doğum günü, açılış, söz ve vitrin için zincir balon, arka fon ve giriş tagı. Aynı hafta kurulum için arayın.",
    h1: "İstanbul Balon Süsleme & Aranjman",
    keywords: ["balon süsleme istanbul", "balon aranjmanı", "açılış balon süsleme"],
  },
};

export function getServiceSeo(slug: string, fallbackTitle: string, fallbackDesc: string) {
  const custom = serviceSeo[slug];
  if (custom) return custom;
  return {
    seoTitle: `İstanbul ${fallbackTitle} | Zahidem Organizasyon`,
    seoDescription: `İstanbul'da profesyonel ${fallbackTitle.toLocaleLowerCase("tr")} hizmeti. ${fallbackDesc} Ücretsiz keşif için arayın.`,
    h1: `İstanbul ${fallbackTitle}`,
    keywords: [`${fallbackTitle.toLocaleLowerCase("tr")} istanbul`],
  };
}

// Sitemap + indeks kararı: sadece arama hacmi olan ilçeler indekslenir.
// Geri kalan ilçe sayfaları noindex,follow — ince içerik cezası riskini keser,
// crawl bütçesini para sayfalarına odaklar.
export const indexableDistricts = new Set([
  "Kadıköy", "Üsküdar", "Maltepe", "Pendik", "Kartal", "Ataşehir",
  "Ümraniye", "Bahçelievler", "Bağcılar", "Esenyurt", "Beylikdüzü", "Sultanbeyli",
  "Çekmeköy", "Sancaktepe", "Tuzla", "Şile", "Küçükçekmece", "Başakşehir",
]);

export function isIndexableDistrict(district: string) {
  return indexableDistricts.has(district);
}

export function ilceSeoTitle(district: string, serviceTitle: string) {
  return `${district} ${serviceTitle} | Fiyat & Konsept 2026`;
}

export function ilceSeoDescription(district: string, serviceTitle: string, serviceDesc: string) {
  return `${district}'de ${serviceTitle.toLocaleLowerCase("tr")}: ${serviceDesc} Ücretsiz keşif, kurulum dahil, aynı hafta organizasyon için arayın.`;
}

export function ilceSlug(district: string) {
  return slugifyTr(district);
}
