// Prisma Client Singleton
// Prisma v7 with Neon serverless adapter

import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neon } from '@neondatabase/serverless';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const connectionString =
    process.env.DATABASE_URL ||
    process.env.DATABASE_POSTGRES_PRISMA_URL ||
    process.env.DATABASE_POSTGRES_URL;

  if (!connectionString) {
    throw new Error('No database connection string found. Set DATABASE_URL environment variable.');
  }

  // Remove channel_binding parameter - not supported by Neon serverless driver
  const cleanUrl = connectionString.replace(/[&?]channel_binding=[^&]*/g, '').replace(/\?&/, '?');

  const sql = neon(cleanUrl);
  const adapter = new PrismaNeon(sql as any);

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
