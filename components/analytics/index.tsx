"use client";

import Analytics from 'analytics';
import { AnalyticsProvider } from 'use-analytics';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { doNotTrackEnabled } from 'analytics-plugin-do-not-track'
import googleTagManager from '@analytics/google-tag-manager'
import { env } from '@/lib/env.mjs';
import { getCookie } from 'cookies-next';
import { gtagFn, setCookies, getCookies } from './utils';
import { GTM_APP_NAME, adCookies, defaultCookies, redactionCookie } from './constants';



const doNotTrack = doNotTrackEnabled();
const consent = !!getCookie('app-consent');
const enabled = !!consent && !doNotTrack;

export const analytics = Analytics({
  app: GTM_APP_NAME,
  debug: true,
  plugins: [
    googleTagManager({
      containerId: env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
      enabled: true ?? enabled,
    }),
  ],

});


export default function AnalyticsComponent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    analytics.page();
  }, [pathname, searchParams])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      analytics.identify(GTM_APP_NAME)

      setCookies([...defaultCookies, ...adCookies]); // set "necessary" cookies by default

      const gtag = gtagFn('dataLayer', 'google_tag_manager');
      if (typeof gtag === 'function') {
        gtag?.('set', redactionCookie, true); // set redaction cookie by default
        gtag?.('consent', 'default', {
          ...getCookies([...defaultCookies, ...adCookies])
        });
      }

      analytics.track('consent', {
        consent: 'default',
        ...getCookies([...defaultCookies, ...adCookies])
      })
    }
  }, []);

  return (
    <AnalyticsProvider instance={analytics}>
      {children}
    </AnalyticsProvider>
  )
}
