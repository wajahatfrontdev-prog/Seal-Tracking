'use client';

import { ThemeProvider } from '@/components/ThemeProvider';
import Sidebar from '@/components/Sidebar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-dark-950">
        <Sidebar />
        <main className="flex-1 ml-64 bg-dark-950">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}
