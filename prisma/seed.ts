import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { hash } from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

import { services } from "../src/lib/data";

async function seed() {
  console.log("🌱 Seeding database...");

  const hashedPassword = await hash("zahidem2024", 12);
  await prisma.adminUser.upsert({
    where: { email: "admin@zahidemorganizasyon.com" },
    update: {},
    create: {
      email: "admin@zahidemorganizasyon.com",
      name: "Admin",
      hashedPassword,
    },
  });
  console.log("✅ Admin user created");

  for (let i = 0; i < services.length; i++) {
    const s = services[i];
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: { title: s.title, description: s.description, icon: s.icon, order: i },
      create: {
        title: s.title,
        slug: s.slug,
        description: s.description,
        icon: s.icon,
        order: i,
        isActive: true,
      },
    });
  }
  console.log(`✅ ${services.length} services created`);

  await prisma.siteSetting.upsert({
    where: { key: "site_name" },
    update: { value: "Zahidem Organizasyon" },
    create: { key: "site_name", value: "Zahidem Organizasyon" },
  });
  await prisma.siteSetting.upsert({
    where: { key: "site_phone" },
    update: { value: "+90 531 663 29 30" },
    create: { key: "site_phone", value: "+90 531 663 29 30" },
  });
  await prisma.siteSetting.upsert({
    where: { key: "site_email" },
    update: { value: "info@zahidemorganizasyon.com" },
    create: { key: "site_email", value: "info@zahidemorganizasyon.com" },
  });
  console.log("✅ Site settings created");

  console.log("🎉 Seed complete!");
  await prisma.$disconnect();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
