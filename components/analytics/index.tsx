'use client';

import Analytics from 'analytics';
import { AnalyticsProvider } from 'use-analytics';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { doNotTrackEnabled } from 'analytics-plugin-do-not-track';
import googleTagManager from '@analytics/google-tag-manager';
import { env } from '@/lib/env.mjs';
import { getCookie, hasCookie, setCookie } from 'cookies-next';
import { gtagFn, setCookies, getCookies, setInitialCookies } from './utils';
import {
  COOKIE_CONSENT_KEY,
  GTM_APP_NAME,
  adCookies,
  cookieExpiry,
  defaultCookies,
  redactionCookie,
} from './constants';
import { ConsentBanner } from '@/components/consent-banner';
import { AnimatedLoader } from '../animated-loader';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';

export default function AnalyticsComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [consent, setConsent] = useState<boolean>(() => {
    console.log('initialize', hasCookie(COOKIE_CONSENT_KEY));
    return hasCookie(COOKIE_CONSENT_KEY);
  });
  const doNotTrack = doNotTrackEnabled();

  const analytics = Analytics({
    app: GTM_APP_NAME,
    debug: true,
    plugins: [
      googleTagManager({
        containerId: env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
        enabled: consent && !doNotTrack,
      }),
    ],
  });

  useEffect(() => {
    analytics.identify(GTM_APP_NAME);
    analytics.page();
  }, [analytics, pathname, searchParams]);

  useEffect(() => {
    const onMount = () => {
      if (typeof window === 'undefined') return;
      const gtag = gtagFn('dataLayer', 'gtag');
      setInitialCookies([...defaultCookies]);
      setInitialCookies([...adCookies], true);
      if (typeof gtag === 'function') {
        gtag?.('set', redactionCookie, true); // set redaction cookie by default
        gtag?.('consent', 'default', {
          ...getCookies([...defaultCookies, ...adCookies]), // initialize default consents
        });

        analytics.track('consent-success', {
          consent: 'success',
          ...getCookies([...defaultCookies, ...adCookies]),
          gtagState: typeof gtag,
        });

        if (hasCookie(COOKIE_CONSENT_KEY)) {
          console.log('app cookie exists');
          setConsent(true);
        } else {
          console.log('setting app cookie');
        }
      } else {
        // console.log('gtag not found');
        analytics.track('consent-issue', {
          consent: 'error',
          ...getCookies([...defaultCookies, ...adCookies]),
          gtagState: typeof gtag,
        });
      }
    };
    onMount();
    setConsent(hasCookie(COOKIE_CONSENT_KEY));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnalyticsProvider instance={analytics}>
      {children}
      <ConsentBanner consent={consent} />
      {hasCookie(COOKIE_CONSENT_KEY) && <VercelAnalytics />}
    </AnalyticsProvider>
  );
}
