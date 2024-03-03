import { cookieExpiry } from './constants';
import { getCookie, setCookie } from 'cookies-next';

/**
 * @SEE: Dashboard: https://tagassistant.google.com/
 * @SEE: https://gist.github.com/dobesv/0dba69925b8975e69b3392da46063db2
 * @SEE: https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced
 * Analytics package setups up tag manager on the window as 'google_tag_manager
 * not as 'gtag' as expected by the gtag function.
 * This function is a workaround to set up the gtag function on the window
 *
 * @param {DataLayerName} dataLayerName
 * @param {GtagName} gtagName
 * @return {*}  {((..._args: any[]) => any)}
 */
export type DataLayerName = 'dataLayer' | 'ga4DataLayer' | 'adwordsDataLayer';
export type GtagName =
  | 'gtag'
  | 'adwordsGtag'
  | 'gtmGtag'
  | 'google_tag_manager';

export type GTagFn = (
  method: string,
  event?: string,
  params?: Record<string, any>
) => void;

export const gtagFn = (
  dataLayerName: DataLayerName,
  gtagName: GtagName
): ((..._args: any[]) => any) =>
  // @ts-expect-error
  window[gtagName] ||
  // @ts-expect-error
  (window[gtagName] = function () {
    // @ts-expect-error
    (window[dataLayerName] || (window[dataLayerName] = [])).push(arguments);
  });

/**
 * Consent update event to update the consent based on the user's action
 * This function will set the cookies and update the consent based on the user's action
 * It will also update the consent in the dataLayer
 *
 * @export
 * @param {Record<string, boolean>} consent
 * @param {boolean} [update]
 */
export function consentUpdateEvent(
  consent: Record<string, boolean>,
  update?: boolean
) {
  const gTag = gtagFn('dataLayer', 'google_tag_manager');
  if (typeof gTag === 'function') {
    Object.entries(consent).forEach(([key, value]) => {
      setCookie('app-consent', true, { maxAge: cookieExpiry });
      setCookie(key, value ? 1 : 0, { maxAge: cookieExpiry });
      gTag('consent', update ? 'update' : 'default', {
        [key]: getConsent(value),
      });
    });
  } else {
    console.log('gtag not found');
    console.log('cookie not set', consent);
  }
}

/**
 * Consent format is an enum of 'granted' or 'denied'
 * This is a helper function to get the consent value based on the condition
 *
 * @export
 * @param {boolean} condition
 * @return {*}
 */
export function getConsent(condition: boolean) {
  return condition ? 'granted' : 'denied';
}
/**
 * Set cookies based on the cookieList
 * will create a cookie with a maxAge of 1 year for each cookie in the list
 *
 * @export
 * @param {string[]} cookieList
 */
export function setCookies(cookieList: string[], denied?: boolean) {
  if (typeof window !== 'undefined' && cookieList?.length) {
    cookieList.forEach((cookie) => {
      setCookie(cookie, !denied ? 1 : 0, { maxAge: cookieExpiry });
    });
  } else {
    console.warn('No cookies to set');
  }
}
/**
 * Get cookies based on the cookieList
 * will return a list of cookies with a boolean value based on the consent
 * if skipConsent is true, it will return the cookies without transforming the consent
 *
 *
 * @export
 * @param {string[]} cookieList
 * @param {boolean} [skipConsent]
 * @return {*}
 */
export function getCookies(cookieList: string[], skipConsent?: boolean) {
  if (typeof window !== 'undefined' && cookieList?.length) {
    return cookieList.reduce((acc, cookie) => {
      if (skipConsent) {
        return { ...acc, [cookie]: !!getCookie(cookie) };
      } else {
        return { ...acc, [cookie]: getConsent(!!getCookie(cookie)) };
      }
    }, {});
  }
  return [];
}
