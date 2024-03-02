import { Analytics } from '@vercel/analytics/react';

import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import AnalyticsComponent from '@/components/analytics';

export default function RootProviders({ children }: { children: React.ReactNode }) {

  return (
    <>
      <AnalyticsComponent>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
        <Toaster richColors />
      </AnalyticsComponent>
    </>
  )
}
