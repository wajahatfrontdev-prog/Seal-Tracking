import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Simple query to test connection
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    
    // Check if users table exists
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;

    return NextResponse.json({
      status: 'connected',
      tables,
      dbUrl: process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':***@'),
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      message: error?.message,
      code: error?.code,
      dbUrl: process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':***@'),
    }, { status: 500 });
  }
}
