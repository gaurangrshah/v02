import { Analytics } from '@vercel/analytics/react';

import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import AnalyticsComponent from '@/components/analytics';
import { Suspense } from 'react';
import { CookieConsentBanner } from '@/components/analytics/cookie-consent';
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function RootProviders({ children }: { children: React.ReactNode }) {

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Suspense fallback={<>{children}</>}>
          <AnalyticsComponent>
            {children}
          </AnalyticsComponent>
        </Suspense>
      </ThemeProvider>
      <Analytics />
      <CookieConsentBanner />
      <Toaster richColors />
      <SpeedInsights />
    </>
  )
}
