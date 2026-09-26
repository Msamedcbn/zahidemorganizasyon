export function LocalBusinessSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["EventPlanningService", "ProfessionalService", "LocalBusiness"],
    name: "Zahidem Organizasyon",
    alternateName: "Zahidem Organizasyon & Davet Hizmetleri",
    image: "https://www.zahidemorganizasyon.com/images/service-soz.jpg",
    "@id": "https://www.zahidemorganizasyon.com/#organization",
    url: "https://www.zahidemorganizasyon.com",
    telephone: "+90 531 663 29 30",
    email: "info@zahidemorganizasyon.com",
    description: "İstanbul'da söz & nişan, doğum günü, sünnet, kına, açılış, kokteyl, balon süsleme ve masa sandalye kiralama hizmetleri. Sultanbeyli merkezli, 38 ilçede ücretsiz keşif ve aynı gün anahtar teslim kurulum.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Abdurrahmangazi Mah. Aktutan Cd. No:1",
      addressLocality: "Sultanbeyli",
      addressRegion: "İstanbul",
      postalCode: "34920",
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.9611,
      longitude: 29.2592,
    },
    hasMap: "https://www.google.com/maps/search/?api=1&query=Zahidem+Organizasyon+Sultanbeyli",
    areaServed: [
      "Sultanbeyli", "Sancaktepe", "Pendik", "Kartal", "Maltepe", "Ataşehir",
      "Ümraniye", "Çekmeköy", "Kadıköy", "Üsküdar", "Tuzla", "Şile",
      "Bahçelievler", "Bağcılar", "Esenyurt", "Beylikdüzü", "Küçükçekmece", "Başakşehir",
    ].map((d) => ({ "@type": "AdministrativeArea", name: `${d}, İstanbul` })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "22:00",
    },
    sameAs: [
      "https://www.instagram.com/zahidemorganizasyon",
      "https://www.facebook.com/zahidemorganizasyonn",
      "https://www.youtube.com/channel/UCfSemzsL-ElAbQT3j_2xTaQ",
    ],
    priceRange: "₺₺",
    currenciesAccepted: "TRY",
    paymentAccepted: "Nakit, Kredi Kartı, Banka Havalesi / EFT",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "87",
      bestRating: "5",
      worstRating: "1",
    },
    knowsAbout: [
      "Söz Organizasyonu",
      "Nişan Masası Kurulumu",
      "Kına Gecesi Tahtı",
      "Sünnet Düğünü Organizasyonu",
      "Masa Sandalye Kiralama",
      "Balon Süsleme & Aranjman",
      "Mağaza Açılış Kokteyli",
      "Evde Söz Hazırlığı",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Organizasyon Hizmetleri",
      itemListElement: [
        "Söz & Nişan Organizasyonu",
        "Doğum Günü Organizasyonu",
        "Sünnet Organizasyonu",
        "Açılış Organizasyonu",
        "Balon Süsleme",
        "Masa Sandalye Kiralama",
        "Kokteyl Organizasyonu",
        "Kına Gecesi Organizasyonu",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function FaqSchema({ questions }: { questions: { question: string; answer: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ArticleSchema({
  title,
  description,
  slug,
  image,
  author,
  publishedTime,
  modifiedTime,
  keywords,
}: {
  title: string;
  description: string;
  slug: string;
  image?: string | null;
  author: string;
  publishedTime: string;
  modifiedTime: string;
  keywords?: string[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    ...(keywords && keywords.length > 0 && { keywords: keywords.join(", ") }),
    ...(image && { image: [image] }),
    author: { "@type": "Organization", name: author },
    publisher: {
      "@type": "Organization",
      name: "Zahidem Organizasyon",
      logo: { "@type": "ImageObject", url: "https://www.zahidemorganizasyon.com/favicon.ico" },
    },
    datePublished: publishedTime,
    dateModified: modifiedTime,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.zahidemorganizasyon.com/blog/${slug}`,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "article p:first-of-type", "h2", "h3"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ServiceSchema({ title, description, slug, district }: { title: string; description: string; slug: string; district?: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description,
    provider: {
      "@type": "LocalBusiness",
      "@id": "https://www.zahidemorganizasyon.com/#organization",
      name: "Zahidem Organizasyon",
      url: "https://www.zahidemorganizasyon.com",
      telephone: "+90 531 663 29 30",
      priceRange: "₺₺",
    },
    url: `https://www.zahidemorganizasyon.com/hizmetler/${slug}`,
    areaServed: district
      ? { "@type": "AdministrativeArea", name: `${district}, İstanbul` }
      : { "@type": "City", name: "İstanbul" },
    offers: {
      "@type": "Offer",
      priceCurrency: "TRY",
      availability: "https://schema.org/InStock",
      url: `https://www.zahidemorganizasyon.com/hizmetler/${slug}`,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "p:first-of-type"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebSiteSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Zahidem Organizasyon",
    url: "https://www.zahidemorganizasyon.com",
    inLanguage: "tr-TR",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.zahidemorganizasyon.com/blog?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
