// Example API Route for Shipments
import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';

// GET /api/shipments - Get all shipments
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    // Uncomment when database is setup
    // const shipments = await prisma.shipment.findMany({
    //   where: status ? { status } : undefined,
    //   include: {
    //     seal: true,
    //     creator: {
    //       select: { name: true, email: true }
    //     }
    //   },
    //   orderBy: { createdAt: 'desc' }
    // });

    // Mock data
    const shipments = [
      {
        id: 'SHP-001',
        sealCode: 'QR-2024-001',
        truckId: 'DEZ-389',
        productName: 'Cotton Bales',
        quantity: 150,
        unit: 'bags',
        origin: 'Karachi',
        destination: 'Lahore',
        status: 'IN_TRANSIT',
        createdAt: new Date(),
      }
    ];

    return NextResponse.json(shipments);
  } catch (error) {
    console.error('Error fetching shipments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch shipments' },
      { status: 500 }
    );
  }
}

// POST /api/shipments - Create new shipment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const required = ['sealId', 'truckId', 'productName', 'quantity', 'origin', 'destination'];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Uncomment when database is setup
    // const shipment = await prisma.shipment.create({
    //   data: {
    //     sealId: body.sealId,
    //     truckId: body.truckId,
    //     productName: body.productName,
    //     productDescription: body.productDescription || '',
    //     quantity: body.quantity,
    //     unit: body.unit || 'bags',
    //     origin: body.origin,
    //     destination: body.destination,
    //     createdBy: body.userId, // Get from session
    //   }
    // });

    // Mock response
    const shipment = {
      id: 'SHP-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      ...body,
      status: 'PENDING',
      createdAt: new Date(),
    };

    return NextResponse.json(shipment, { status: 201 });
  } catch (error) {
    console.error('Error creating shipment:', error);
    return NextResponse.json(
      { error: 'Failed to create shipment' },
      { status: 500 }
    );
  }
}
