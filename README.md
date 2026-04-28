# Security Seal Tracking System

Modern web-based QR Code and Barcode scanning system for tracking security seals on cotton products.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📱 Features

- **QR/Barcode Scanner**: Real-time scanning via camera
- **Dashboard**: Overview of shipments and statistics
- **Shipment Tracking**: Manage and track all shipments
- **Seal Management**: Generate and manage security seals
- **Dark Theme**: Modern UI with purple accents
- **Responsive**: Works on mobile, tablet, desktop

## 🛠️ Tech Stack

- Next.js 16 + React 19
- TypeScript
- Tailwind CSS v4
- html5-qrcode
- Lucide React Icons

## 📁 Project Structure

```
seal-tracking/
├── app/
│   ├── page.tsx          # Dashboard
│   ├── scan/             # Scanner
│   ├── shipments/        # Shipments
│   ├── seals/            # Seals
│   └── layout.tsx        # Root layout
├── components/
│   ├── Sidebar.tsx
│   └── QRScanner.tsx
└── types/
    └── index.ts
```

## 🎯 Pages

- `/` - Dashboard with stats
- `/scan` - QR/Barcode scanner
- `/shipments` - Shipments list
- `/seals` - Seals management

## 🔧 Backend Setup Required

This is frontend-only. For full functionality:

1. Setup database (PostgreSQL/MongoDB)
2. Create API routes in `app/api/`
3. Add authentication (NextAuth.js)
4. Connect scanner to backend

See `BACKEND_SETUP.md` for details.

## 📝 Scripts

```bash
npm run dev      # Development
npm run build    # Production build
npm run start    # Production server
```

## 🌐 Browser Support

- Chrome/Edge (Recommended)
- Firefox
- Safari
- Mobile browsers with camera

## 📄 License

ISC
