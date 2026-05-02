// Individual Shipment API Routes
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

// GET /api/shipments/:id - Get single shipment
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const shipment = await prisma.shipment.findUnique({
      where: { id },
      include: {
        seal: true,
        creator: {
          select: { name: true, email: true }
        },
        scans: {
          orderBy: { scannedAt: 'desc' }
        }
      }
    });

    if (!shipment) {
      return NextResponse.json(
        { error: 'Shipment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(shipment);
  } catch (error) {
    console.error('Error fetching shipment:', error);
    return NextResponse.json(
      { error: 'Failed to fetch shipment' },
      { status: 500 }
    );
  }
}

// PUT /api/shipments/:id - Update shipment
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

    // Check if shipment exists
    const existingShipment = await prisma.shipment.findUnique({
      where: { id }
    });

    if (!existingShipment) {
      return NextResponse.json(
        { error: 'Shipment not found' },
        { status: 404 }
      );
    }

    // Update shipment
    const shipment = await prisma.shipment.update({
      where: { id },
      data: {
        truckId: body.truckId || existingShipment.truckId,
        productName: body.productName || existingShipment.productName,
        productDescription: body.productDescription !== undefined ? body.productDescription : existingShipment.productDescription,
        quantity: body.quantity ? parseInt(body.quantity) : existingShipment.quantity,
        unit: body.unit || existingShipment.unit,
        origin: body.origin || existingShipment.origin,
        destination: body.destination || existingShipment.destination,
        status: body.status || existingShipment.status,
      },
      include: {
        seal: true
      }
    });

    return NextResponse.json(shipment);
  } catch (error) {
    console.error('Error updating shipment:', error);
    return NextResponse.json(
      { error: 'Failed to update shipment' },
      { status: 500 }
    );
  }
}

// DELETE /api/shipments/:id - Delete shipment
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

    // Check if shipment exists
    const shipment = await prisma.shipment.findUnique({
      where: { id }
    });

    if (!shipment) {
      return NextResponse.json(
        { error: 'Shipment not found' },
        { status: 404 }
      );
    }

    // Delete shipment
    await prisma.shipment.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Shipment deleted successfully' });
  } catch (error) {
    console.error('Error deleting shipment:', error);
    return NextResponse.json(
      { error: 'Failed to delete shipment' },
      { status: 500 }
    );
  }
}
