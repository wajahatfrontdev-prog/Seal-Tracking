// Seals API Route - Connected to Database
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

// GET /api/seals - Get all seals
export async function GET() {
  try {
    const seals = await prisma.seal.findMany({
      include: {
        creator: {
          select: { name: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

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
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validate input
    if (!body.sealCode || !body.sealType) {
      return NextResponse.json(
        { error: 'Missing required fields: sealCode, sealType' },
        { status: 400 }
      );
    }

    // Check if seal code already exists
    const existingSeal = await prisma.seal.findUnique({
      where: { sealCode: body.sealCode }
    });

    if (existingSeal) {
      return NextResponse.json(
        { error: 'Seal code already exists' },
        { status: 409 }
      );
    }

    // Create seal
    const seal = await prisma.seal.create({
      data: {
        sealCode: body.sealCode,
        sealType: body.sealType,
        status: body.status || 'active',
        createdBy: session.user.id,
      }
    });

    return NextResponse.json(seal, { status: 201 });
  } catch (error) {
    console.error('Error creating seal:', error);
    return NextResponse.json(
      { error: 'Failed to create seal' },
      { status: 500 }
    );
  }
}
