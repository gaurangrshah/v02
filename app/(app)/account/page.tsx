import type { Metadata } from 'next';

import {
  checkAuth,
  getUserAuth,
} from '@/lib/auth/utils';

import UserSettings from './UserSettings';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  }
}

export default async function Account() {
  await checkAuth();
  const { session } = await getUserAuth();

  return (
    <main>
      <h1 className="text-2xl font-semibold my-4">Account</h1>
      <div className="space-y-4">
        <UserSettings session={session} />
      </div>
    </main>
  );
}
