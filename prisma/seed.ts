import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  console.log('🌱 Starting database seed...');

  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'admin',
      status: 'active',
    },
  });
  console.log('✅ Created admin user:', admin.email);

  const operatorPassword = await bcrypt.hash('operator123', 10);
  const operator = await prisma.user.upsert({
    where: { email: 'operator@example.com' },
    update: {},
    create: {
      name: 'Operator User',
      email: 'operator@example.com',
      password: operatorPassword,
      role: 'operator',
      status: 'active',
    },
  });
  console.log('✅ Created operator user:', operator.email);

  const seals = [];
  for (let i = 1; i <= 10; i++) {
    const sealType = i % 2 === 0 ? 'qr' : 'barcode';
    const prefix = sealType === 'qr' ? 'QR' : 'BC';
    const seal = await prisma.seal.create({
      data: {
        sealCode: `${prefix}-${Date.now()}-${i.toString().padStart(4, '0')}`,
        sealType,
        status: 'active',
        createdBy: admin.id,
      },
    });
    seals.push(seal);
  }
  console.log(`✅ Created ${seals.length} sample seals`);

  const origins = ['Karachi Warehouse', 'Lahore Factory', 'Islamabad Hub', 'Faisalabad Mill'];
  const destinations = ['Multan Distribution', 'Peshawar Center', 'Quetta Depot', 'Sialkot Port'];
  const products = ['Cotton Bales', 'Raw Cotton', 'Cotton Yarn', 'Cotton Fabric'];
  const statuses = ['pending', 'in-transit', 'delivered'];

  for (let i = 0; i < 5; i++) {
    await prisma.shipment.create({
      data: {
        sealId: seals[i].id,
        truckId: `TRK-${(1000 + i).toString()}`,
        productName: products[i % products.length],
        productDescription: `High quality ${products[i % products.length].toLowerCase()} for export`,
        quantity: Math.floor(Math.random() * 500) + 100,
        unit: 'bags',
        origin: origins[i % origins.length],
        destination: destinations[i % destinations.length],
        status: statuses[i % statuses.length],
        createdBy: operator.id,
      },
    });
  }
  console.log('✅ Created 5 sample shipments');

  for (let i = 0; i < 3; i++) {
    const shipment = await prisma.shipment.findFirst({
      where: { sealId: seals[i].id },
    });

    if (shipment) {
      await prisma.scan.create({
        data: {
          sealId: seals[i].id,
          shipmentId: shipment.id,
          scannedBy: operator.id,
          location: 'Warehouse Gate',
          deviceInfo: 'Mobile Scanner',
          ipAddress: '192.168.1.100',
        },
      });
    }
  }
  console.log('✅ Created sample scan records');

  console.log('\n🎉 Database seeding completed successfully!');
  console.log('\n📝 Login credentials:');
  console.log('   Admin: admin@example.com / admin123');
  console.log('   Operator: operator@example.com / operator123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
