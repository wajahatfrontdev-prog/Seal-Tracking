// Example API Route for Seals
// Install Prisma first: npm install @prisma/client && npx prisma init

import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';

// GET /api/seals - Get all seals
export async function GET() {
  try {
    // Uncomment when database is setup
    // const seals = await prisma.seal.findMany({
    //   include: {
    //     creator: {
    //       select: { name: true, email: true }
    //     }
    //   },
    //   orderBy: { createdAt: 'desc' }
    // });

    // Mock data for now
    const seals = [
      {
        id: '1',
        sealCode: 'QR-2024-001',
        sealType: 'QR',
        status: 'ACTIVE',
        createdAt: new Date(),
      }
    ];

    return NextResponse.json(seals);
  } catch (error) {
    console.error('Error fetching seals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch seals' },
      { status: 500 }
    );
  }
}

// POST /api/seals - Create new seal
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    if (!body.sealCode || !body.sealType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Uncomment when database is setup
    // const seal = await prisma.seal.create({
    //   data: {
    //     sealCode: body.sealCode,
    //     sealType: body.sealType,
    //     createdBy: body.userId, // Get from session
    //   }
    // });

    // Mock response
    const seal = {
      id: Math.random().toString(),
      ...body,
      createdAt: new Date(),
    };

    return NextResponse.json(seal, { status: 201 });
  } catch (error) {
    console.error('Error creating seal:', error);
    return NextResponse.json(
      { error: 'Failed to create seal' },
      { status: 500 }
    );
  }
}
