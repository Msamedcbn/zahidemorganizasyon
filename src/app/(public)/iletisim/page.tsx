import { Metadata } from "next";
import { GlassCard } from "@/components/ui/GlassCard";
import { FluidShapes } from "@/components/ui/FluidShapes";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Zahidem Organizasyon ile iletişime geçin. İstanbul'un her noktasında profesyonel organizasyon hizmeti için bizi arayın.",
};

export default function IletisimPage() {
  return (
    <div className="relative pt-32 pb-16 min-h-screen">
      <FluidShapes />
      <div className="relative max-w-7xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-4 text-center">
          İletişim
        </h1>
        <p className="text-muted text-lg text-center max-w-xl mx-auto mb-12">
          Hayalinizdeki organizasyon için bizimle iletişime geçin, ücretsiz keşif teklifi alın.
        </p>

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3">
            <GlassCard className="p-8">
              <h2 className="text-xl font-headline font-bold text-foreground mb-6">Bize Yazın</h2>
              <form
                className="space-y-4"
                action="/api/iletisim"
                method="POST"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-1">Adınız Soyadınız *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none transition-colors text-sm"
                      placeholder="Adınız Soyadınız"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-1">E-posta Adresiniz *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none transition-colors text-sm"
                      placeholder="ornek@email.com"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-1">Telefon</label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none transition-colors text-sm"
                      placeholder="+90 5XX XXX XX XX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-1">Konu</label>
                    <input
                      type="text"
                      name="subject"
                      className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none transition-colors text-sm"
                      placeholder="Organizasyon türü"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-1">Mesajınız *</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/30 focus:border-primary focus:outline-none transition-colors text-sm resize-none"
                    placeholder="Organizasyon talebiniz hakkında detayları yazın..."
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors"
                >
                  Mesajı Gönder
                </button>
              </form>
            </GlassCard>
          </div>

          <div className="md:col-span-2 space-y-4">
            <GlassCard className="p-6">
              <h3 className="font-headline font-bold text-foreground mb-4">İletişim Bilgileri</h3>
              <div className="space-y-4">
                <a href="tel:+905316632930" className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-muted">Telefon</div>
                    <div className="font-medium">+90 531 663 29 30</div>
                  </div>
                </a>
                <a href="mailto:info@zahidemorganizasyon.com" className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-muted">E-posta</div>
                    <div className="font-medium">info@zahidemorganizasyon.com</div>
                  </div>
                </a>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-muted">Adres</div>
                    <div className="font-medium">İstanbul, Anadolu ve Avrupa Yakası</div>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="font-headline font-bold text-foreground mb-4">Sosyal Medya</h3>
              <div className="flex gap-3">
                {[
                  { name: "Instagram", url: "https://www.instagram.com/zahidemorganizasyon", icon: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" },
                  { name: "Facebook", url: "https://www.facebook.com/zahidemorganizasyonn", icon: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
                  { name: "YouTube", url: "https://www.youtube.com/channel/UCfSemzsL-ElAbQT3j_2xTaQ", icon: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z M9.75 15.02 15.5 12 9.75 8.98v6.04z" },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                    title={s.name}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d={s.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <a
                href="https://wa.me/905316632930"
                className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-muted">7/24 Hızlı Destek</div>
                  <div className="font-medium text-green-500">WhatsApp&apos;tan Yazın</div>
                </div>
              </a>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
