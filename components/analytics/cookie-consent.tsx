"use client"
import { setCookie } from 'cookies-next'
import CookieConsent, { Cookies } from "react-cookie-consent";
import { Button } from '../ui/button';
import { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

// @SEE: https://blog.stackademic.com/understanding-website-cookies-and-implementing-cookie-consent-in-next-js-project-136311f6c1e0
export const CookieConsentBanner = () => {
  // Parse cookies from the request or browser
  const cookie = Cookies.get("app-consent");

  // const handleAccept = () => {
  //   setCookie("app-consent", 1, {
  //     maxAge: 60 * 60 * 24 * 7, // Set expiration (1 week)
  //     // path: "/", // Cookie path (optional)
  //   });
  // };
  return (
    <CookieConsent
      location="bottom"
      buttonText="I Understand"
      declineButtonText="Decline"
      enableDeclineButton
      disableButtonStyles
      // style={{ background: "#e3fadb" }}
      contentClasses=''
      style={{ background: 'var(hsl(--accent))' }}
      containerClasses='animate-in fade-in slide-in-from-bottom transform-gpu shadow-md'
      ButtonComponent={({ children, ...props }: PropsWithChildren<{ id?: string }>) => {
        const variant = props?.id === "rcc-decline-button" ? "default" : "secondary"
        const classes = props?.id === "rcc-decline-button" ? "" : "text-gray-100 hover:shadow-md hover:text-gray-800"
        return (

          <Button variant={variant} {...props} className={cn(classes, "rounded-md mr-2")} size="sm">
            {children}
          </Button>

        );
      }}
      cookieName="app-consent"
      cookieValue={'true'}
      expires={60 * 60 * 24 * 7}// Set expiration (1 week)
    // onAccept={handleAccept}
    >
      <p className="text-gray-800">This website uses cookies to enhance user experience.</p>
    </CookieConsent>
  );
};
