'use client';
// directive applied because this gets passed in as a prop to the consent manager.

import { Slot } from '@radix-ui/react-slot';
import { Cookie } from 'lucide-react';
import { background } from '@gshah.dev/transparency/dist/utils/styles';

import { BannerTriggerGroup } from './buttons';
import { BannerContent, type IBannerContentProps } from './banner-content';

import { cn } from '@/lib/utils';

export interface IBannerProps
  extends React.PropsWithChildren<IBannerContentProps> {
  bannerClass?: string;
  asChild?: boolean;
  buttonGroup?: React.ReactNode;
  leftElement?: React.ReactNode;
}

/**
 *
 * Responsible for rendering the shell and defining the structure of the banner components
 * orchestrates where and how each of the elements are rendered, and is configurable.
 * uses radix-ui's Slot primitive to facilitate this behavior by default as a wrapper around the children
 *
 * @export
 * @param {BannerProps} props: React.PropsWithChildren<{
 *   bannerClass?: string; asChild?: boolean; buttonGroup?: React.ReactNode; leftElement?: React.ReactNode;
 * }>
 * @return {*} {React.ReactNode}
 */
export default function Banner(props: IBannerProps) {
  const { asChild, leftElement, buttonGroup, bannerClass, ...rest } = props;

  const ContentSlot = asChild ? Slot : BannerContent;

  return (
    <div className='fixed inset-x-0 bottom-10 z-10 mx-auto max-w-3xl'>
      <div className={cn(background, bannerClass)}>
        {leftElement ? leftElement : <Cookie className='h-8 w-8' />}
        <ContentSlot {...rest}>{props.children}</ContentSlot>
        {buttonGroup ? buttonGroup : <BannerTriggerGroup />}
      </div>
    </div>
  );
}
