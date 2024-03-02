import { Analytics } from '@vercel/analytics/react';

import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import AnalyticsComponent from '@/components/analytics';
import { Suspense } from 'react';

export default function RootProviders({ children }: { children: React.ReactNode }) {

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Suspense>
          <AnalyticsComponent>
            {children}
          </AnalyticsComponent>
        </Suspense>
      </ThemeProvider>
      <Analytics />
      <Toaster richColors />
    </>
  )
}
