// Prisma Client Singleton
// Prisma v7 with pg adapter (stable, works with Neon PostgreSQL)

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

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

  // Clean URL - remove unsupported params for pg driver
  const cleanUrl = connectionString
    .replace(/[&?]channel_binding=[^&]*/g, '')
    .replace(/\?&/, '?')
    .replace(/&&/g, '&');

  const pool = new Pool({
    connectionString: cleanUrl,
    ssl: cleanUrl.includes('sslmode=require') ? { rejectUnauthorized: false } : false,
    max: 1, // Serverless: keep pool small
  });

  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
