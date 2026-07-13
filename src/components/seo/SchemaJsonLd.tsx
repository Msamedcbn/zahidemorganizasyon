export function LocalBusinessSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Zahidem Organizasyon",
    image: "https://zahidemorganizasyon.com/images/service-soz.jpg",
    "@id": "https://zahidemorganizasyon.com",
    url: "https://zahidemorganizasyon.com",
    telephone: "+90 531 663 29 30",
    email: "info@zahidemorganizasyon.com",
    description: "İstanbul'un her noktasında profesyonel organizasyon hizmeti. Söz, nişan, düğün, doğum günü, sünnet, açılış, kokteyl, balon süsleme, sandalye kiralama, asker uğurlama ve mezuniyet organizasyonu.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Abdurrahmangazi, Aktutan Cd. No:1",
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
    priceRange: "₺",
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
}: {
  title: string;
  description: string;
  slug: string;
  image?: string | null;
  author: string;
  publishedTime: string;
  modifiedTime: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    ...(image && { image: [image] }),
    author: { "@type": "Organization", name: author },
    publisher: {
      "@type": "Organization",
      name: "Zahidem Organizasyon",
      logo: { "@type": "ImageObject", url: "https://zahidemorganizasyon.com/favicon.ico" },
    },
    datePublished: publishedTime,
    dateModified: modifiedTime,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://zahidemorganizasyon.com/blog/${slug}`,
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
      name: "Zahidem Organizasyon",
      url: "https://zahidemorganizasyon.com",
    },
    url: `https://zahidemorganizasyon.com/hizmetler/${slug}`,
    areaServed: district
      ? { "@type": "Place", name: `${district}, İstanbul` }
      : { "@type": "City", name: "İstanbul" },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
