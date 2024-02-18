import Image from 'next/image';

import NotFoundMenuBar from './_components/buttons/not-found-menu-bar';

export default function NotFound() {
  return (
    <>
      <div className='fixed inset-0 min-w-screen min-h-screen shadow-[0_0_1900px_hsl(var(--background))_inset] z-20' />
      <div className="min-w-screen min-h-screen relative flex items-center justify-center">
        <Image
          src="/404_astro_gs.png"
          alt='404 Not Found'
          fill
          objectFit='cover'
          loading="eager"
        />
        <div className='absolute top-48 w-96 h-36 bg-background/60 z-20 rounded-md shadow-lg backdrop-blur-lg px-6 flex justify-center items-center'>
          <h1 className='text-3xl text-center font-bold text-foreground/70 drop-shadow-md'>You&apos;ve come too far... seen too much</h1>
        </div>
      </div>
      <NotFoundMenuBar />
    </>
  )
}
