// Seed script to create initial admin user
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';

// Load environment variables from .env.local
config({ path: '.env.local' });

// Get DATABASE_URL and validate
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ DATABASE_URL is not defined in .env.local');
  process.exit(1);
}

console.log('✓ Database URL loaded');

// Create PostgreSQL connection pool
const pool = new Pool({ connectionString: databaseUrl });

// Create Prisma adapter
const adapter = new PrismaPg(pool);

// Initialize Prisma Client with adapter
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database...');

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@logifast.com' },
  });

  if (existingAdmin) {
    console.log('✅ Admin user already exists');
    return;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@logifast.com',
      password: hashedPassword,
      role: 'admin',
      status: 'active',
    },
  });

  console.log('✅ Admin user created:');
  console.log('   Email: admin@logifast.com');
  console.log('   Password: admin123');
  console.log('   Role: admin');
  console.log('');
  console.log('⚠️  IMPORTANT: Change this password after first login!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
