'use client';

import dynamic from 'next/dynamic';

const SettingsContent = dynamic(() => import('@/components/SettingsContent'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  ),
});

export default function SettingsPage() {
  return <SettingsContent />;
}
