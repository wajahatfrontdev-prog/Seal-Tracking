// Example API Route for Scans
import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';

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

    // Uncomment when database is setup
    // // Find seal by code
    // const seal = await prisma.seal.findUnique({
    //   where: { sealCode: body.sealCode },
    //   include: {
    //     shipments: {
    //       where: { status: { not: 'DELIVERED' } },
    //       take: 1
    //     }
    //   }
    // });

    // if (!seal) {
    //   return NextResponse.json(
    //     { error: 'Seal not found' },
    //     { status: 404 }
    //   );
    // }

    // // Record scan
    // const scan = await prisma.scan.create({
    //   data: {
    //     sealId: seal.id,
    //     shipmentId: seal.shipments[0]?.id,
    //     scannedBy: body.userId, // Get from session
    //     location: body.location,
    //     deviceInfo,
    //     ipAddress,
    //   }
    // });

    // // Get scan count for this seal
    // const scanCount = await prisma.scan.count({
    //   where: { sealId: seal.id }
    // });

    // // Get all scans for history
    // const scanHistory = await prisma.scan.findMany({
    //   where: { sealId: seal.id },
    //   include: {
    //     scanner: {
    //       select: { name: true }
    //     }
    //   },
    //   orderBy: { scannedAt: 'desc' }
    // });

    // Mock response
    const mockData = {
      seal: {
        sealCode: body.sealCode,
        status: 'ACTIVE',
        createdAt: new Date(),
      },
      shipment: {
        id: 'SHP-001',
        truckId: 'DEZ-389',
        productName: 'Cotton Bales',
        quantity: 150,
        unit: 'bags',
        origin: 'Karachi',
        destination: 'Lahore',
        status: 'IN_TRANSIT',
      },
      scans: [
        {
          scannedAt: new Date(),
          scannedBy: 'Current User',
          location: body.location || 'Unknown',
          deviceInfo,
          ipAddress,
        }
      ],
      scanCount: 1,
    };

    return NextResponse.json(mockData, { status: 201 });
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

    // Uncomment when database is setup
    // const scans = await prisma.scan.findMany({
    //   where: { sealId },
    //   include: {
    //     scanner: {
    //       select: { name: true, email: true }
    //     }
    //   },
    //   orderBy: { scannedAt: 'desc' }
    // });

    // Mock data
    const scans = [
      {
        id: '1',
        scannedAt: new Date(),
        scannedBy: 'User 1',
        location: 'Checkpoint A',
        deviceInfo: 'Mobile',
      }
    ];

    return NextResponse.json(scans);
  } catch (error) {
    console.error('Error fetching scans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch scans' },
      { status: 500 }
    );
  }
}
