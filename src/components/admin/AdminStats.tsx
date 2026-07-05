import { GlassCard } from "@/components/ui/GlassCard";

export function AdminStats({
  stats,
}: {
  stats: {
    services: number;
    posts: number;
    messages: number;
    unreadMessages: number;
    galleryItems: number;
  };
}) {
  const items = [
    { label: "Hizmetler", value: stats.services, icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
    { label: "Blog Yazıları", value: stats.posts, icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" },
    { label: "Gelen Mesajlar", value: stats.messages, sub: `${stats.unreadMessages} okunmamış`, icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" },
    { label: "Galeri", value: stats.galleryItems, icon: "M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <GlassCard key={item.label} className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-muted">{item.label}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
              <path d={item.icon} />
            </svg>
          </div>
          <div className="text-3xl font-headline font-bold text-foreground">{item.value}</div>
          {item.sub && <div className="text-xs text-muted mt-1">{item.sub}</div>}
        </GlassCard>
      ))}
    </div>
  );
}
