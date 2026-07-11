import Link from "next/link";
import { BreadcrumbSchema } from "./SchemaJsonLd";

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <>
      <BreadcrumbSchema items={items} />
      <nav className="flex items-center gap-2 text-sm text-muted mb-8" aria-label="Breadcrumb">
        {items.map((item, i) => (
          <span key={item.url} className="flex items-center gap-2">
            {i > 0 && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            )}
            {i === items.length - 1 ? (
              <span className="text-foreground/60">{item.name}</span>
            ) : (
              <Link href={item.url} className="hover:text-primary transition-colors">
                {item.name}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
