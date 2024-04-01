import { Analytics } from '@vercel/analytics/react';

import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import { SpeedInsights } from '@vercel/speed-insights/next';
import CookieConsentProvider from '@gshah.dev/transparency/dist/context/consent-provider';
import Banner from '@/components/consent/banner';
export default function RootProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        {children}
      </ThemeProvider>
      <CookieConsentProvider
        necessaryTags={['personalization_storage', 'functionality_storage']}
      >
        <Banner />
      </CookieConsentProvider>
      <Analytics />
      <Toaster richColors />
      <SpeedInsights />
    </>
  );
}
