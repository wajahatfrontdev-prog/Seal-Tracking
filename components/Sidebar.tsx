'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Package, Scan, Shield, BarChart3, Settings, Users, Sun, Moon, X, LogOut } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLight = theme === 'light';

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  const navigation = [
    { name: 'Dashboard', href: '/', icon: BarChart3 },
    { name: 'Scan', href: '/scan', icon: Scan },
    { name: 'Shipments', href: '/shipments', icon: Package },
    { name: 'Seals', href: '/seals', icon: Shield },
    { name: 'Users', href: '/users', icon: Users },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  if (!mounted) {
    return (
      <aside className={`w-64 min-h-screen bg-dark-900 border-r border-dark-800 p-4 fixed left-0 top-0 z-40 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="mb-8 px-2">
          <Link href="/">
            <div className="cursor-pointer">
              <img
                src="/Logo-removebg-preview.png"
                alt="Logo"
                className="w-40 h-auto"
              />
            </div>
          </Link>
        </div>
        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-primary-600 text-white' : 'text-gray-400 hover:bg-dark-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    );
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-64 min-h-screen border-r p-4 fixed left-0 top-0 z-40 transition-all duration-300 ${
        isLight
          ? 'bg-white border-gray-200'
          : 'bg-dark-900 border-dark-800'
      } ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-dark-800"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        <div className="mb-8 px-2 flex items-center justify-between">
          <Link href="/" onClick={onClose}>
            <div className="cursor-pointer">
              <img
                src="/Logo-removebg-preview.png"
                alt="Logo"
                className="w-40 h-auto"
              />
            </div>
          </Link>

          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors hidden lg:block ${
              isLight
                ? 'bg-gray-100 hover:bg-gray-200'
                : 'bg-dark-800 hover:bg-dark-700'
            }`}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>

      <nav className="space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-600 text-white'
                  : isLight
                  ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  : 'text-gray-400 hover:bg-dark-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Theme toggle for mobile */}
      <div className="mt-6 lg:hidden">
        <button
          onClick={toggleTheme}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
            isLight
              ? 'bg-gray-100 hover:bg-gray-200'
              : 'bg-dark-800 hover:bg-dark-700'
          }`}
        >
          <span className={`text-sm font-medium ${isLight ? 'text-gray-900' : 'text-white'}`}>
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </span>
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-gray-700" />
          )}
        </button>
      </div>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="card p-3">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">
                {session?.user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${isLight ? 'text-gray-900' : 'text-white'}`}>
                {session?.user?.name || 'User'}
              </p>
              <p className={`text-xs ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                {session?.user?.email || 'user@example.com'}
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className={`w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
              isLight
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                : 'bg-dark-800 hover:bg-dark-700 text-gray-300'
            }`}
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </aside>
    </>
  );
}
