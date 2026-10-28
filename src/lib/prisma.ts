import { PrismaClient } from "@/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Kucuk havuz + kisa idle suresi: bosta kalan baglantilar Neon compute'unu
// uyanik tutup CU-saat yakmasin.
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
  max: 3,
  idleTimeoutMillis: 5_000,
});

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
