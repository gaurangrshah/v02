"use client";

import Analytics from 'analytics';
import { AnalyticsProvider } from 'use-analytics';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, type PropsWithChildren } from 'react';
import { doNotTrackEnabled } from 'analytics-plugin-do-not-track'
import googleTagManager from '@analytics/google-tag-manager'
import googleAnalytics from '@analytics/google-analytics'

const doNotTrack = doNotTrackEnabled();
// Only enable analytics in production and if doNotTrack is NOT enabled
const enabled = process.env.NODE_ENV === 'production' && !doNotTrack;

export const analytics = Analytics({
  app: 'gshahdev-v2',
  debug: true,
  plugins: [
    googleTagManager({
      containerId: "GTM-T548B3LB",
      enabled: true,
    }),
    googleAnalytics({
      measurementIds: ['G-7BRVNV68JY'],
      enabled: true,
    })
  ],
});


export function getConsent() {
  if (typeof window !== 'undefined') {
    // Check if consent is already given
    const consent = localStorage.getItem('app-consent');
    if (consent === null) {
      // If consent is not given, default to false
      localStorage.setItem('app-consent', 'false');
      return true;
    }
    // default to false (not tracking)
    return false;
  }
}

export default function AnalyticsComponent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    analytics.page();
  }, [pathname, searchParams])

  return (
    <AnalyticsProvider instance={analytics}>
      {children}
    </AnalyticsProvider>
  )
}
