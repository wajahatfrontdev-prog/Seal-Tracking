# Backend Setup Guide

## 📋 Required Packages

```bash
# Database & ORM (Choose one)
npm install @prisma/client
npm install -D prisma

# Authentication
npm install next-auth @auth/prisma-adapter bcryptjs
npm install -D @types/bcryptjs

# QR Code Generation
npm install qrcode
npm install -D @types/qrcode

# Utilities
npm install date-fns uuid
npm install -D @types/uuid
```

## 🗄️ Database Setup

### Option 1: Vercel Postgres (Recommended)

1. Vercel account pe jao
2. Project connect karo
3. Storage → Create Database → Postgres
4. Environment variables automatically add ho jayenge

### Option 2: MongoDB Atlas

1. MongoDB Atlas account banao
2. Free cluster create karo
3. Connection string copy karo

## 📝 Environment Variables

Create `.env.local`:

```env
# Database (Vercel Postgres)
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=

# OR MongoDB
MONGODB_URI=

# Authentication
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000
```

## 🔧 Prisma Setup

1. **Initialize Prisma**:
```bash
npx prisma init
```

2. **Create Schema** (`prisma/schema.prisma`):
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_PRISMA_URL")
}

model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String
  role      Role     @default(OPERATOR)
  createdAt DateTime @default(now())
  seals     Seal[]
  shipments Shipment[]
  scans     Scan[]
}

enum Role {
  ADMIN
  OPERATOR
  VIEWER
}

model Seal {
  id        String     @id @default(uuid())
  sealCode  String     @unique
  sealType  SealType
  status    SealStatus @default(ACTIVE)
  createdAt DateTime   @default(now())
  createdBy String
  creator   User       @relation(fields: [createdBy], references: [id])
  shipments Shipment[]
  scans     Scan[]
}

enum SealType {
  QR
  BARCODE
}

enum SealStatus {
  ACTIVE
  INACTIVE
  COMPROMISED
}

model Shipment {
  id          String         @id @default(uuid())
  sealId      String
  seal        Seal           @relation(fields: [sealId], references: [id])
  truckId     String
  productName String
  productDescription String
  quantity    Int
  unit        String
  origin      String
  destination String
  status      ShipmentStatus @default(PENDING)
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt
  createdBy   String
  creator     User           @relation(fields: [createdBy], references: [id])
  scans       Scan[]
}

enum ShipmentStatus {
  PENDING
  IN_TRANSIT
  DELIVERED
}

model Scan {
  id         String   @id @default(uuid())
  sealId     String
  seal       Seal     @relation(fields: [sealId], references: [id])
  shipmentId String
  shipment   Shipment @relation(fields: [shipmentId], references: [id])
  scannedBy  String
  scanner    User     @relation(fields: [scannedBy], references: [id])
  scannedAt  DateTime @default(now())
  location   String?
  deviceInfo String
  ipAddress  String
}
```

3. **Run Migration**:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

## 🔌 API Routes Structure

Create these files:

```
app/api/
├── auth/
│   └── [...nextauth]/route.ts
├── seals/
│   ├── route.ts
│   ├── [id]/route.ts
│   └── code/[code]/route.ts
├── shipments/
│   ├── route.ts
│   └── [id]/route.ts
└── scans/
    ├── route.ts
    └── [sealId]/route.ts
```

## 🚀 Next Steps

1. Install packages
2. Setup database
3. Create Prisma schema
4. Run migrations
5. Create API routes (see example-api/ folder)
6. Connect frontend to API
7. Test everything
8. Deploy to Vercel

## 📞 Need Help?

Mujhe batao agar koi specific implementation chahiye!
