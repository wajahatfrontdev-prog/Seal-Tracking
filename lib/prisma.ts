// Prisma Client Singleton
// This prevents multiple instances in development
// TODO: Uncomment when Prisma is installed and database is setup

// import { PrismaClient } from '@prisma/client'

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined
// }

// export const prisma = globalForPrisma.prisma ?? new PrismaClient()

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Mock prisma client for now (until database is setup)
export const prisma = {
  seal: {
    findMany: async () => [],
    findUnique: async () => null,
    create: async (data: any) => data,
    update: async (data: any) => data,
    delete: async () => null,
  },
  shipment: {
    findMany: async () => [],
    findUnique: async () => null,
    create: async (data: any) => data,
    update: async (data: any) => data,
    delete: async () => null,
  },
  scan: {
    findMany: async () => [],
    create: async (data: any) => data,
    count: async () => 0,
  },
  user: {
    findMany: async () => [],
    findUnique: async () => null,
    create: async (data: any) => data,
    update: async (data: any) => data,
    delete: async () => null,
  },
} as any;
