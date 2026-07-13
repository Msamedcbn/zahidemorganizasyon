import { GlassNavbar } from "@/components/ui/GlassNavbar";
import { Footer } from "@/components/ui/Footer";
import { prisma } from "@/lib/prisma";

export const revalidate = 86400;

async function getSettings() {
  try {
    const settings = await prisma.siteSetting.findMany();
    const map: Record<string, string> = {};
    settings.forEach((s) => { map[s.key] = s.value; });
    return map;
  } catch {
    return {};
  }
}

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const s = await getSettings();
  return (
    <>
      <GlassNavbar logo={s.logo} siteName={s.siteName} phone={s.phone} whatsapp={s.whatsapp} />
      <main className="flex-1">{children}</main>
      <Footer
        logo={s.logo} siteName={s.siteName} phone={s.phone} email={s.email}
        address={s.address} instagram={s.instagram} facebook={s.facebook}
        youtube={s.youtube} whatsapp={s.whatsapp}
      />
    </>
  );
}
