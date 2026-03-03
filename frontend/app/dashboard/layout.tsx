'use client';

import { useRouter } from 'next/navigation';
import { logoutUser } from '@/lib/api';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import ToastProvider from '@/components/ui/ToastProvider';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  async function handleLogout() {
    await logoutUser();
    router.push('/login');
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <Header onLogout={handleLogout} />
        <main className="ml-64 pt-16">
          <div className="p-8">{children}</div>
        </main>
      </div>
    </ToastProvider>
  );
}
