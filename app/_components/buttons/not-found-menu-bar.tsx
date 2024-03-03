"use client";

import { useRouter } from 'next/navigation';

import { Menubar } from './menu-bar';

export default function NotFoundMenuBar() {
  const router = useRouter();
  return (
    <div className='absolute bottom-24 w-full flex justify-center z-50'>
      <Menubar items={[{
        label: 'Back',
        onClick: router.back
      },
      {
        label: 'Home',
        onClick: router.push.bind(null, '/')
      }]}
      />
    </div>
  )
}
