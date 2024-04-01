'use client';

import { useCallback, useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { CookieSwitch } from './cookie-switch';

import {
  useConsent,
  useConsentDispatch,
} from '@gshah.dev/transparency/dist/hooks';
import {
  categoryDescriptions,
  tagDetails,
} from '@gshah.dev/transparency/dist/utils/data';
import { convertTagsToCookies } from '@gshah.dev/transparency/dist/utils/cookie-conversion-utils';
import { cn } from '@/lib/utils';
import {
  AnalyticsTags,
  BrowserCookies,
  NecessaryAnalyticsTagsTupleArrays,
  NecessaryTags,
  TagArray,
} from '@gshah.dev/transparency/dist/types';

/**
 * Responsible for building up and syncing the options object from cookies with the consent manager context
 * Delegates GroupedOptions to render out the options and assign functionality.
 *
 * @export
 * @return {*} {React.ReactNode}
 */
export function BannerOptions() {
  const { setHasConsent, handleConsentUpdate } = useConsentDispatch();
  const { tags, hasConsent } = useConsent(); // provide only the options that the user has selected
  const [cookies, setCookies] = useState<Partial<BrowserCookies>>(() =>
    convertTagsToCookies(tags as NecessaryAnalyticsTagsTupleArrays)
  );

  const [NECESSARY, ANALYTICS] = tags;
  const [isChecked, setIsChecked] = useState([
    NECESSARY?.length
      ? NECESSARY?.every((tag) => !!cookies[tag as keyof typeof cookies])
      : false,
    ANALYTICS?.length
      ? ANALYTICS?.every((tag) => !!cookies[tag as keyof typeof cookies])
      : false,
  ]);

  const updateCookiesState = useCallback(
    (cookies: Partial<BrowserCookies>) => {
      setCookies((prev) => {
        const updatedCookies = { ...prev, ...cookies };

        setIsChecked([
          NECESSARY?.length
            ? NECESSARY?.every(
                (tag) => !!updatedCookies[tag as keyof typeof updatedCookies]
              )
            : false,
          ANALYTICS?.length
            ? ANALYTICS?.every(
                (tag) => !!updatedCookies[tag as keyof typeof updatedCookies]
              )
            : false,
        ]);
        return updatedCookies;
      });

      handleConsentUpdate(cookies);
    },
    [NECESSARY, ANALYTICS, handleConsentUpdate]
  );

  const renderSwitch = (
    tagGroup: TagArray<NecessaryTags> | TagArray<AnalyticsTags> | undefined,
    index: number
  ) => {
    const category = index ? 'Analytics' : 'Necessary';
    if (!tagGroup || !tagGroup.length) return null;
    const isDisabled = category === 'Necessary';

    return (
      <div key={category} className='p-2'>
        <CookieSwitch
          type='category'
          label={category}
          description={
            categoryDescriptions[
              category.toLowerCase() as keyof typeof categoryDescriptions
            ]
          }
          isDisabled={isDisabled}
          cookieName={tagGroup[index]}
          onCheckedChange={(checked) => {
            updateCookiesState(
              tagGroup?.reduce((acc, tag) => {
                acc[tag as keyof typeof acc] = checked;
                return acc;
              }, {} as Partial<BrowserCookies>)
            );
          }}
          isChecked={!!isChecked[index]}
        />
        <Accordion type='single' collapsible>
          <AccordionItem value={category}>
            <AccordionTrigger className='text-xs'>
              <p className='ml-auto pr-2'>
                Show all {category.toLowerCase()} cookies
              </p>
            </AccordionTrigger>
            <AccordionContent>
              <>
                {Array.isArray(tagGroup) &&
                  tagGroup.map((tag) => {
                    return (
                      <CookieSwitch
                        type='tag'
                        key={tag}
                        className='ml-4'
                        {...tagDetails[tag as keyof typeof tagDetails]}
                        isDisabled={isDisabled}
                        cookieName={tagGroup[index]}
                        onCheckedChange={(checked) => {
                          updateCookiesState({ [tag]: checked });
                        }}
                        isChecked={cookies[tag as keyof typeof cookies]!}
                      />
                    );
                  })}
              </>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  };

  return (
    <div className='min-w-2xl grid gap-4'>
      <div
        className={cn(
          'z-10 w-full rounded-md bg-background/40 p-2 backdrop-blur-md transition-opacity duration-150 [&:not(:first-child)]:border-t'
        )}
      >
        {tags.map(renderSwitch)}
      </div>
      <div className='flex w-full flex-row p-1'>
        <Button
          type='button'
          size='sm'
          className='ml-auto'
          onClick={() => {
            if (!hasConsent) {
              handleConsentUpdate(cookies);
              setHasConsent(true);
            }
          }}
        >
          Done
        </Button>
      </div>
    </div>
  );
}
