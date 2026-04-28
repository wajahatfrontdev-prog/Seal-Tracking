// Shipments API Route - Connected to Database
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/shipments - Get all shipments
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const shipments = await prisma.shipment.findMany({
      where: status ? { status } : undefined,
      include: {
        seal: true,
        creator: {
          select: { name: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

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

    // Check if seal exists
    const seal = await prisma.seal.findUnique({
      where: { id: body.sealId }
    });

    if (!seal) {
      return NextResponse.json(
        { error: 'Seal not found' },
        { status: 404 }
      );
    }

    // Create shipment
    const shipment = await prisma.shipment.create({
      data: {
        sealId: body.sealId,
        truckId: body.truckId,
        productName: body.productName,
        productDescription: body.productDescription || '',
        quantity: parseInt(body.quantity),
        unit: body.unit || 'bags',
        origin: body.origin,
        destination: body.destination,
        status: body.status || 'pending',
        createdBy: body.userId || 'admin-user-id', // TODO: Get from session
      },
      include: {
        seal: true
      }
    });

    return NextResponse.json(shipment, { status: 201 });
  } catch (error) {
    console.error('Error creating shipment:', error);
    return NextResponse.json(
      { error: 'Failed to create shipment' },
      { status: 500 }
    );
  }
}
