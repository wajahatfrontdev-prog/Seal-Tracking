// Prisma Client Singleton
// Prisma v7 with Neon adapter for serverless PostgreSQL

import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const connectionString =
    process.env.DATABASE_URL ||
    process.env.DATABASE_POSTGRES_PRISMA_URL ||
    process.env.DATABASE_POSTGRES_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  // Create Neon adapter with connection string
  const adapter = new PrismaNeon({
    connectionString,
  });

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
