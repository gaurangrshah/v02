"use-client"

import Image from 'next/image';

import { PlaceholderValue } from '@/lib/types';
import { dataUrl } from '@/lib/utils';

import { AspectRatio } from './ui/aspect-ratio';


type BlurImageProps = {
  src: string;
  alt: string;
};

export function BlurImage({ src, alt }: BlurImageProps) {
  return (
    <div className="relative">
      <AspectRatio ratio={16 / 9} className='w-full h-full'>
        <Image
          src={src}
          alt={alt}
          fill
          objectFit="cover"
          loading="lazy"
          placeholder={dataUrl as PlaceholderValue}
        />
      </AspectRatio>
    </div>
  );
}
