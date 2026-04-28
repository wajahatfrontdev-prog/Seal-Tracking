// Scans API Route - Connected to Database
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/scans - Record a new scan
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    if (!body.sealCode) {
      return NextResponse.json(
        { error: 'Seal code is required' },
        { status: 400 }
      );
    }

    // Get client info
    const deviceInfo = request.headers.get('user-agent') || 'Unknown';
    const ipAddress = request.headers.get('x-forwarded-for') ||
                     request.headers.get('x-real-ip') ||
                     'Unknown';

    // Find seal by code
    const seal = await prisma.seal.findUnique({
      where: { sealCode: body.sealCode },
      include: {
        shipments: {
          where: { status: { not: 'delivered' } },
          take: 1,
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!seal) {
      return NextResponse.json(
        { error: 'Seal not found' },
        { status: 404 }
      );
    }

    // Record scan
    const scan = await prisma.scan.create({
      data: {
        sealId: seal.id,
        shipmentId: seal.shipments[0]?.id || null,
        scannedBy: body.userId || 'admin-user-id', // TODO: Get from session
        location: body.location,
        deviceInfo,
        ipAddress,
      }
    });

    // Get scan count for this seal
    const scanCount = await prisma.scan.count({
      where: { sealId: seal.id }
    });

    // Get all scans for history
    const scanHistory = await prisma.scan.findMany({
      where: { sealId: seal.id },
      include: {
        user: {
          select: { name: true }
        }
      },
      orderBy: { scannedAt: 'desc' }
    });

    // Return complete scan data
    const response = {
      seal: {
        sealCode: seal.sealCode,
        status: seal.status,
        createdAt: seal.createdAt,
      },
      shipment: seal.shipments[0] || null,
      scans: scanHistory.map(s => ({
        scannedAt: s.scannedAt,
        scannedBy: s.user.name,
        location: s.location,
        deviceInfo: s.deviceInfo,
        ipAddress: s.ipAddress,
      })),
      scanCount,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error recording scan:', error);
    return NextResponse.json(
      { error: 'Failed to record scan' },
      { status: 500 }
    );
  }
}

// GET /api/scans?sealId=xxx - Get scan history for a seal
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sealId = searchParams.get('sealId');

    if (!sealId) {
      return NextResponse.json(
        { error: 'Seal ID is required' },
        { status: 400 }
      );
    }

    const scans = await prisma.scan.findMany({
      where: { sealId },
      include: {
        user: {
          select: { name: true, email: true }
        }
      },
      orderBy: { scannedAt: 'desc' }
    });

    return NextResponse.json(scans);
  } catch (error) {
    console.error('Error fetching scans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch scans' },
      { status: 500 }
    );
  }
}
