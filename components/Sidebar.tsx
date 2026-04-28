'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Package, Scan, Shield, BarChart3, Settings, Users, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useEffect, useState } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLight = theme === 'light';

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
      <aside className="w-64 min-h-screen bg-dark-900 border-r border-dark-800 p-4 fixed left-0 top-0">
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
    <aside className={`w-64 min-h-screen border-r p-4 fixed left-0 top-0 transition-colors ${
      isLight
        ? 'bg-white border-gray-200'
        : 'bg-dark-900 border-dark-800'
    }`}>
      <div className="mb-8 px-2 flex items-center justify-between">
        <Link href="/">
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
          className={`p-2 rounded-lg transition-colors ${
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

      <div className="absolute bottom-4 left-4 right-4">
        <div className="card p-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">A</span>
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${isLight ? 'text-gray-900' : 'text-white'}`}>
                Admin User
              </p>
              <p className={`text-xs ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                admin@logifast.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
