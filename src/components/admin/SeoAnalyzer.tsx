"use client";

interface SeoAnalyzerProps {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  focusKeyword: string;
  hasImage: boolean;
}

type Status = "good" | "warn" | "bad";

interface Check {
  label: string;
  status: Status;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function slugify(text: string): string {
  const map: Record<string, string> = { ı: "i", ğ: "g", ü: "u", ş: "s", ö: "o", ç: "c" };
  return text
    .toLowerCase()
    .split("")
    .map((ch) => map[ch] ?? ch)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function countOccurrences(haystack: string, needle: string): number {
  if (!needle) return 0;
  let count = 0;
  let pos = 0;
  while ((pos = haystack.indexOf(needle, pos)) !== -1) {
    count++;
    pos += needle.length;
  }
  return count;
}

function analyze({ title, slug, content, seoTitle, seoDescription, focusKeyword, hasImage }: SeoAnalyzerProps): Check[] {
  const checks: Check[] = [];
  const kw = focusKeyword.trim().toLowerCase();
  const plainContent = stripHtml(content).toLowerCase();
  const wordCount = plainContent ? plainContent.split(/\s+/).length : 0;
  const effectiveTitle = (seoTitle || title).toLowerCase();
  const effectiveDescription = seoDescription.toLowerCase();

  checks.push({ label: "Focus keyword belirlendi", status: kw ? "good" : "bad" });

  if (kw) {
    checks.push({ label: "Focus keyword SEO başlıkta geçiyor", status: effectiveTitle.includes(kw) ? "good" : "bad" });
    checks.push({ label: "Focus keyword meta açıklamada geçiyor", status: effectiveDescription.includes(kw) ? "good" : "bad" });

    const kwSlugWords = slugify(kw).split("-").filter(Boolean);
    const slugHasKeyword = kwSlugWords.length > 0 && kwSlugWords.every((w) => slug.includes(w));
    checks.push({ label: "Focus keyword URL/slug içinde geçiyor", status: slugHasKeyword ? "good" : "warn" });

    const intro = plainContent.split(/\s+/).slice(0, 60).join(" ");
    checks.push({ label: "Focus keyword ilk paragrafta geçiyor", status: intro.includes(kw) ? "good" : "warn" });

    const occurrences = countOccurrences(plainContent, kw);
    const density = wordCount > 0 ? (occurrences * kw.split(/\s+/).length) / wordCount * 100 : 0;
    let densityStatus: Status = "bad";
    if (occurrences === 0) densityStatus = "bad";
    else if (density > 3.5) densityStatus = "warn";
    else densityStatus = "good";
    checks.push({ label: `Anahtar kelime yoğunluğu (${occurrences} kez geçiyor)`, status: densityStatus });
  }

  let lengthStatus: Status = "bad";
  if (wordCount >= 300) lengthStatus = "good";
  else if (wordCount >= 150) lengthStatus = "warn";
  checks.push({ label: `İçerik uzunluğu (${wordCount} kelime, önerilen 300+)`, status: lengthStatus });

  const titleLen = (seoTitle || title).length;
  checks.push({ label: "SEO başlık uzunluğu (30-60 karakter)", status: titleLen >= 30 && titleLen <= 60 ? "good" : "warn" });

  const descLen = seoDescription.length;
  checks.push({ label: "Meta açıklama uzunluğu (70-155 karakter)", status: descLen >= 70 && descLen <= 155 ? "good" : "warn" });

  checks.push({ label: "İçerikte en az bir iç link var", status: /href=["']\/(?!\/)/.test(content) ? "good" : "warn" });
  checks.push({ label: "Kapak görseli eklendi", status: hasImage ? "good" : "warn" });
  checks.push({ label: "İçerikte alt başlık (H2) var", status: /<h2/i.test(content) ? "good" : "warn" });

  return checks;
}

const statusStyles: Record<Status, string> = {
  good: "bg-green-500",
  warn: "bg-amber-500",
  bad: "bg-red-400",
};

export function SeoAnalyzer(props: SeoAnalyzerProps) {
  const checks = analyze(props);
  const score = Math.round((checks.filter((c) => c.status === "good").length / checks.length) * 100);
  const scoreLabel = score >= 80 ? "İyi" : score >= 50 ? "Orta" : "Zayıf";
  const scoreColor = score >= 80 ? "text-green-500" : score >= 50 ? "text-amber-500" : "text-red-400";

  const displayTitle = props.seoTitle || props.title || "Sayfa başlığı";
  const displayDescription = props.seoDescription || props.excerpt || "Meta açıklama girilmedi.";

  return (
    <div className="border-t border-white/10 pt-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-foreground/80">SEO Analizi</h3>
        <span className={`text-xs font-semibold ${scoreColor}`}>SEO Skoru: {score}/100 ({scoreLabel})</span>
      </div>

      <div className="rounded-xl border border-black/10 bg-white p-4 mb-4">
        <div className="text-xs text-muted mb-1 truncate">zahidemorganizasyon.com › blog › {props.slug || "yazi-slug"}</div>
        <div className="text-base text-blue-700 truncate">{displayTitle}</div>
        <div className="text-sm text-gray-600 mt-1 line-clamp-2">{displayDescription}</div>
      </div>

      <ul className="space-y-1.5">
        {checks.map((c) => (
          <li key={c.label} className="flex items-center gap-2 text-xs text-foreground/70">
            <span className={`w-2 h-2 rounded-full shrink-0 ${statusStyles[c.status]}`} />
            {c.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
