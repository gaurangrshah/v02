import { Analytics } from '@vercel/analytics/react';

import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import AnalyticsComponent from '@/components/analytics';
import { Suspense } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Fallback from '@/components/fallback';

export default function RootProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        <AnalyticsComponent>{children}</AnalyticsComponent>
      </ThemeProvider>
      <Toaster richColors />
      <SpeedInsights />
    </>
  );
}
