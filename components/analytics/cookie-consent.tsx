"use client"

import CookieConsent from "react-cookie-consent";
import { Button } from '../ui/button';
import { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';
import { CookieSettings } from './cookie-settings';
import { adCookies } from './constants';
import { setCookies } from "./utils";


// @SEE: https://blog.stackademic.com/understanding-website-cookies-and-implementing-cookie-consent-in-next-js-project-136311f6c1e0
export const CookieConsentBanner = () => {

  const handleAccept = () => {
    setCookies(adCookies)
  };

  const handleDecline = () => { };
  return (
    <CookieConsent
      location="bottom"
      buttonText="I Understand"
      declineButtonText="Decline"
      enableDeclineButton
      disableButtonStyles
      contentClasses=''
      style={{ background: 'var(hsl(--accent))' }}
      containerClasses='bg-accent/40 backdrop-blur-md animate-in fade-in slide-in-from-bottom transform-gpu shadow-md'
      ButtonComponent={({ children, ...props }: PropsWithChildren<{ id?: string }>) => {
        const variant = props?.id === "rcc-decline-button" ? "default" : "secondary"
        const classes = props?.id === "rcc-decline-button" ? "text-neutral" : "text-neutral hover:shadow-md hover:text-gray-800"
        return (
          <Button variant={variant} {...props} className={cn(classes, "rounded-md mr-2")} size="sm">
            {children}
          </Button>
        );
      }}
      cookieName="app-consent"
      cookieValue={'true'}
      expires={60 * 60 * 24 * 7}// Set expiration (1 week)
      onAccept={handleAccept}
      onDecline={() => {
        handleDecline();
      }}
    >
      <div className='flex items-center justify-between'>
        <p className="text-gray-800">This website uses cookies to enhance your experience.</p>
        <CookieSettings />
      </div>
    </CookieConsent >
  );
};