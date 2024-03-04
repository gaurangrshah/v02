'use client';

import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { consentUpdateEvent, getCookies } from './utils';
import { adCookies, defaultCookies } from './constants';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

type CookeOptionsProps = {
  category: string;
  description: string;
};

export function DefaultCookieOption({
  category,
  description,
  // permissions
}: Omit<CookeOptionsProps, 'onParentCheckedChange' | 'onCheckedChange'>) {
  const permissions = [...defaultCookies, 'ads_data_redaction'].reduce(
    (acc, cookie) => ({ ...acc, [cookie]: true }),
    {}
  );

  return (
    <div className='flex items-start space-x-4 rounded-md border px-4 py-6'>
      <Switch
        className='mt-1 disabled:hover:opacity-30 data-[state=checked]:disabled:bg-secondary'
        id={category}
        defaultChecked={true}
        disabled={true}
      />
      <div className='max-w-xl space-y-1.5'>
        <Label htmlFor={category}>{category}</Label>
        <p className='text-sm text-gray-500 dark:text-gray-400'>
          {description}
        </p>
        <Accordion type='single' collapsible className='pt-6px-3 rounded-md'>
          <AccordionItem value={category}>
            <AccordionTrigger className='shadow-xs mt-4 rounded-md bg-background/30 px-4 text-xs text-foreground/80'>
              <div className='flex w-full items-center justify-between'>
                <p>Cookies</p>
                {/* adds one for the additional redaction cookie */}
                <p>
                  {defaultCookies.length + 1}/{defaultCookies.length + 1}
                  &nbsp;&nbsp;Active
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent className='rounded-md bg-background/60'>
              <ul>
                {Object.keys(permissions)?.length &&
                  Object.keys(permissions).map((permission) => {
                    return (
                      <li
                        key={permission}
                        className='border-b py-2 last-of-type:border-none'
                      >
                        <div className='flex items-center space-x-4 px-4 pt-2'>
                          <Switch
                            id={permission}
                            className='mt-1 scale-75 disabled:hover:opacity-30 data-[state=checked]:disabled:bg-secondary'
                            defaultChecked={
                              permissions[
                                permission as keyof typeof permissions
                              ]
                            }
                            disabled={true} // disable by default
                          />
                          <div className='flex space-y-1.5'>
                            <Label htmlFor={permission}>{permission}</Label>
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

// @TODO: Add toast notification for user feedback
export function CookieOption({
  category,
  description,
}: Omit<CookeOptionsProps, 'enabled'>) {
  const [options, setOptions] = useState(getCookies(adCookies, true));
  const [allActive, setAllActive] = useState(
    () => !!Object.values(options).every(Boolean)
  );

  const updateSingleOption = useCallback(
    (key: string, value: boolean) => {
      setOptions({ ...options, [key]: value });
    },
    [options]
  );

  const updateAllOptions = useCallback(
    (value: boolean) => {
      setOptions(
        Object.keys(options).reduce(
          (acc, key) => ({ ...acc, [key]: value }),
          {}
        )
      );
      setAllActive(value);
    },
    [options]
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      console.log('not client');
      return;
    }
    setAllActive(!!Object.values(options).every(Boolean));
    consentUpdateEvent(options, true);
    toast.success(`Cookie settings updated ${JSON.stringify(options)}`);
  }, [options]);

  return (
    <div className='flex items-start space-x-4 rounded-md border px-4 py-6'>
      <Switch
        className='mt-1 disabled:hover:opacity-30 data-[state=checked]:disabled:bg-secondary'
        id={category}
        checked={allActive}
        disabled={false}
        onCheckedChange={(checked) => {
          updateAllOptions(checked);
        }}
      />
      <div className='max-w-xl space-y-1.5'>
        <Label htmlFor={category}>{category}</Label>
        <p className='text-sm text-gray-500 dark:text-gray-400'>
          {description}
        </p>
        <Accordion type='single' collapsible className='pt-6px-3 rounded-md'>
          <AccordionItem value={category}>
            <AccordionTrigger className='shadow-xs mt-4 rounded-md bg-background/30 px-4 text-xs text-foreground/80'>
              <div className='flex w-full items-center justify-between'>
                <p>Cookies</p>
                {/* adds one for the additional redaction cookie */}
                <p>
                  {Object.values(options).filter(Boolean).length}/
                  {Object.keys(options).length}&nbsp;&nbsp;Active
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent className='rounded-md bg-background/60'>
              <ul>
                {Object.keys(options)?.length &&
                  Object.keys(options).map((option) => {
                    return (
                      <li
                        key={option}
                        className='border-b py-2 last-of-type:border-none'
                      >
                        <div className='flex items-center space-x-4 px-4 pt-2'>
                          <Switch
                            id={option}
                            className='mt-1 scale-75 disabled:hover:opacity-30 data-[state=checked]:disabled:bg-secondary'
                            defaultChecked={allActive}
                            checked={options[option as keyof typeof options]}
                            onCheckedChange={(checked) => {
                              updateSingleOption(option, checked);
                            }}
                          />
                          <div className='flex space-y-1.5'>
                            <Label htmlFor={option}>{option}</Label>
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
