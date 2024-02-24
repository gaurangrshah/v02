"use client";

import { useState } from 'react';

import Image from 'next/image';

import { PlaceholderValue } from '@/lib/types';
import { dataUrl } from '@/lib/utils';

import { AspectRatio } from '../ui/aspect-ratio';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';

export default function GifPopover({ image, children }: { image: { src: string; width?: number, height?: number; alt: string }, children: React.ReactNode }) {

  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen(!open)
  }

  return (
    <Popover open={open}>
      <PopoverTrigger
        asChild
        onMouseEnter={toggleOpen}
        onMouseLeave={toggleOpen}
        className='p-9'
      >
        {children}
      </PopoverTrigger>
      <PopoverContent side="top" sideOffset={0} className="bg-white/20 backdrop-blur-lg">
        <AspectRatio ratio={16 / 9} className='w-full h-full'>
          <Image src={image.src} fill alt={image.alt ?? "gif"} placeholder={dataUrl as PlaceholderValue} loading="lazy" />
        </AspectRatio>
      </PopoverContent>
    </Popover >
  )
}
