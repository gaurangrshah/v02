'use client';
import { CookieIcon } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { CookieOption, DefaultCookieOption } from './analytics/cookie-settings';
import { hasCookie, setCookie } from 'cookies-next';
import {
  COOKIE_CONSENT_KEY as COOKIE_CONSENT_KEY,
  adCookies,
  cookieExpiry,
} from './analytics/constants';
import { setCookies } from './analytics/utils';
import { useCallback, useEffect, useState } from 'react';
import { BasicFn } from '@/lib/types';
import { toast } from 'sonner';

type ConsentBannerProps = {
  consent?: boolean;
  message?: string;
  acceptLabel?: string;
  declineLabel?: string;
  handleAccept?: (e: React.MouseEvent) => void;
  handleDecline?: (e: React.MouseEvent) => void;
};

const slideUpFadeIn =
  'animate-in fade-in-80 slide-in-from-bottom-80 motion-reduce:animate-none ease-in-cubic';

const frosty =
  'container mx-auto w-full max-w-4xl rounded-t-md border bg-background/40 bg-opacity-40 px-4 py-2 text-sm text-foreground shadow-md backdrop-blur-xl before:absolute before:inset-0 before:-z-10 before:bg-background/10 md:px-6 md:py-3';

const frostyContainer =
  'container mx-auto w-full max-w-4xl rounded-t-md border bg-background/90 px-4 py-2 text-sm text-foreground shadow-md backdrop-blur-lg dark:bg-background/40';

const bottomCenter = 'fixed inset-x-0 bottom-10 z-50 max-w-3xl mx-auto';

export function ConsentBanner({ consent }: ConsentBannerProps) {
  const [open, setOpen] = useState(false);

  const handleConsentAll = useCallback(() => {
    // console.log('updating consent cookie');
    setCookie(COOKIE_CONSENT_KEY, 1, { maxAge: cookieExpiry });
    setCookies(adCookies);
    setOpen(false);
    return;
  }, []);

  const handleClose = useCallback(() => {
    const hasConsented = hasCookie(COOKIE_CONSENT_KEY);
    if (!hasConsented) {
      // decline consenting
      setCookie(COOKIE_CONSENT_KEY, 0, { maxAge: cookieExpiry });
    }
    setOpen(false); // close the banner regardless
  }, []);

  useEffect(() => setOpen(consent ? false : true), [consent]);
  return open ? (
    <div
      id='consent-banner1'
      className={cn(slideUpFadeIn, bottomCenter)}
      data-state={open ? 'open' : 'closed'}
    >
      <div className={cn(frosty)}>
        <div className='flex items-center justify-between'>
          <BannerText />
          <DrawerBody
            handleConsent={handleConsentAll}
            handleClose={handleClose}
          />
        </div>
      </div>
    </div>
  ) : null;
}

function DrawerBody({
  handleConsent,
  handleClose,
}: {
  handleConsent: BasicFn;
  handleClose: BasicFn;
}) {
  return (
    <Drawer closeThreshold={0.5}>
      <div className='flex items-center space-x-2'>
        <Button size='sm' variant='primary' onClick={handleConsent}>
          I Understand
        </Button>
        <DrawerTrigger asChild>
          <Button variant='outline' className='hover:text-whites'>
            Show me
          </Button>
        </DrawerTrigger>
      </div>
      <ConsentSettings handleClose={handleClose} />
    </Drawer>
  );
}

function BannerText() {
  return (
    <div className='flex items-center space-x-3'>
      <CookieIcon className='h-6 w-6' />
      <div className='flex flex-col gap-y-1'>
        <p className='text-semibold'>Full Transparency</p>
        <p className='text-xs text-foreground'>
          This website uses cookies to ensure you get the best experience on our
          website.
        </p>
      </div>
    </div>
  );
}

function ConsentSettings({ handleClose }: { handleClose: () => void }) {
  return (
    <DrawerContent className={frostyContainer}>
      <div className='mx-auto w-full max-w-3xl'>
        <DrawerHeader>
          <DrawerTitle>Cookie Consent</DrawerTitle>
          <DrawerDescription>
            Please review and accept our use of cookies. You can manage your
            preferences at any time.
          </DrawerDescription>
        </DrawerHeader>
        <DefaultCookieOption
          category='Necessary'
          description='These cookies are essential for the website to function properly. They are used for things like saving your preferences to your browser and managing secure authentication.'
        />
        <CookieOption
          category='Ads & Analytics'
          description='These cookies help us to understand how you interact with the website and deliver relevant marketing messages to you..'
        />
        <DrawerFooter className='flex'>
          <DrawerClose asChild>
            <Button
              size='sm'
              variant='outline'
              className='ml-auto'
              onClick={() => handleClose()}
            >
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  );
}
