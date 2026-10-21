import { GlassNavbar } from "@/components/ui/GlassNavbar";
import { Footer } from "@/components/ui/Footer";
import { WhatsAppFloatButton } from "@/components/ui/WhatsAppFloatButton";
import { getSettings } from "@/lib/site-data";

export const revalidate = 86400;

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const s = await getSettings();
  return (
    <>
      <GlassNavbar logo={s.logo} siteName={s.siteName} phone={s.phone} whatsapp={s.whatsapp} />
      <main className="flex-1">{children}</main>
      <WhatsAppFloatButton whatsapp={s.whatsapp} />
      <Footer
        logo={s.logo} siteName={s.siteName} phone={s.phone} email={s.email}
        address={s.address} instagram={s.instagram} facebook={s.facebook}
        youtube={s.youtube} whatsapp={s.whatsapp}
      />
    </>
  );
}
