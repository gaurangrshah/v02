"use client";

import Analytics from 'analytics';
import { AnalyticsProvider } from 'use-analytics';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, type PropsWithChildren, Suspense } from 'react';
import { doNotTrackEnabled } from 'analytics-plugin-do-not-track'
import googleTagManager from '@analytics/google-tag-manager'
import googleAnalytics from '@analytics/google-analytics'
import { env } from '@/lib/env.mjs';
import { getCookie, setCookie } from 'cookies-next';

const doNotTrack = doNotTrackEnabled();
// Only enable analytics in production and if doNotTrack is NOT enabled
const consent = getCookie('app-consent') === 'true' ? true : false;
const enabled = process.env.NODE_ENV === 'production' && !!consent && !doNotTrack;

export const analytics = Analytics({
  app: 'gshahdev-v2',
  debug: true,
  plugins: [
    googleTagManager({
      containerId: env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
      enabled: true,
    }),
    // googleAnalytics({
    //   measurementIds: [env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID],
    //   enabled: true,
    // })
  ],
});


export default function AnalyticsComponent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    analytics.identify('gshahdev')


  }, [])

  useEffect(() => {
    analytics.page();
  }, [pathname, searchParams])

  return (
    <AnalyticsProvider instance={analytics}>
      {children}
    </AnalyticsProvider>
  )
}
