import type { Metadata } from 'next';

import AuthForm from '@/components/auth/Form';

import { getUserAuth } from '@/lib/auth/utils';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  }
}

export default async function Home() {
  const { session } = await getUserAuth();
  return (
    <main className="">
      <h1 className="text-2xl font-bold my-2">Profile</h1>
      <pre className="bg-secondary p-4 rounded-lg my-2">
        {JSON.stringify(session, null, 2)}
      </pre>
      <AuthForm action="/api/sign-out" />
    </main>
  );
}
