import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

import { checkAuth } from '@/lib/auth/utils';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth();
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 md:p-8 pt-2 p-8 overflow-y-auto">
        <Navbar />
        {children}
      </main>
    </div>

  )
}
