// Individual Seal API Routes
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

// GET /api/seals/:id - Get single seal
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const seal = await prisma.seal.findUnique({
      where: { id },
      include: {
        creator: {
          select: { name: true, email: true }
        },
        shipments: {
          orderBy: { createdAt: 'desc' }
        },
        scans: {
          orderBy: { scannedAt: 'desc' },
          take: 10
        }
      }
    });

    if (!seal) {
      return NextResponse.json(
        { error: 'Seal not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(seal);
  } catch (error) {
    console.error('Error fetching seal:', error);
    return NextResponse.json(
      { error: 'Failed to fetch seal' },
      { status: 500 }
    );
  }
}

// PUT /api/seals/:id - Update seal
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    // Check if seal exists
    const existingSeal = await prisma.seal.findUnique({
      where: { id }
    });

    if (!existingSeal) {
      return NextResponse.json(
        { error: 'Seal not found' },
        { status: 404 }
      );
    }

    // Update seal
    const seal = await prisma.seal.update({
      where: { id },
      data: {
        status: body.status || existingSeal.status,
        sealType: body.sealType || existingSeal.sealType,
      }
    });

    return NextResponse.json(seal);
  } catch (error) {
    console.error('Error updating seal:', error);
    return NextResponse.json(
      { error: 'Failed to update seal' },
      { status: 500 }
    );
  }
}

// DELETE /api/seals/:id - Delete seal
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    // Check if seal exists
    const seal = await prisma.seal.findUnique({
      where: { id }
    });

    if (!seal) {
      return NextResponse.json(
        { error: 'Seal not found' },
        { status: 404 }
      );
    }

    // Delete seal (cascades to shipments and scans)
    await prisma.seal.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Seal deleted successfully' });
  } catch (error) {
    console.error('Error deleting seal:', error);
    return NextResponse.json(
      { error: 'Failed to delete seal' },
      { status: 500 }
    );
  }
}
