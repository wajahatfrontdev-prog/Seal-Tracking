'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import { ToastProvider } from '@/components/ToastContext';
import { ThemeProvider } from '@/components/ThemeProvider';
import Sidebar from '@/components/Sidebar';
import { Menu } from 'lucide-react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Check if current page is login or register
  const isAuthPage = pathname === '/login' || pathname === '/register';

  // If it's an auth page, don't show sidebar/navigation
  if (isAuthPage) {
    return (
      <ToastProvider>
        {children}
      </ToastProvider>
    );
  }

  // For authenticated pages, show full layout with sidebar
  return (
    <SessionProvider>
      <ThemeProvider>
        <ToastProvider>
          <div className="flex min-h-screen bg-dark-950">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>

            <main className="flex-1 lg:ml-64 bg-dark-950">
              {children}
            </main>
          </div>
        </ToastProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
