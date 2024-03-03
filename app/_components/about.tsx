import { Button } from '@/components/ui/button';
import { SectionTitle } from './section-title';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-16 lg:scroll-mt-24"
      aria-label="About me"
    >
      <SectionTitle>
        <h2 className="text-sm font-bold uppercase tracking-widest">
          About
        </h2>
      </SectionTitle>
      <div className="text-slate-400 max-w-[60ch]">
        <p className="mb-4 text-pretty">
          My love for technology started very early in my childhood. I remember getting a hand-me-down Commodore 128 from a neighbor. It didn&apos;t take very long at all before I figured out it did more than just play rudimentary video games. I was hooked. I went from writing simple BASIC programs to today where I help people build businesses that leverage technology to achieve some really amazing things.
        </p>
        <p className="mb-4 text-pretty">
          These days I leverage my experience in building and scaling on the web to solve complex problems faced by startups and SMBs. My goal is to always help avoid common pitfalls early on that most businesses face when they first get into the tech industry. I try to keep my finger on the pulse to ensure I am always able to leverage proven technologies and best practices to help my clients succeed.
        </p>
        <p className="text-pretty">
          When I&apos;m not in front of a screen, I love hiking, spending time with family, and reading. I also have an insatiable appetite for <MusicSidebar /> and try to scratch my itch every chance I get.
        </p>
      </div>
    </section>
  )
}


export function MusicSidebar() {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="link" className="text-md px-0 text-emerald-400">
          Music
        </Button>
      </SheetTrigger>
      <SheetContent className='bg-emerald-500/20 backdrop-blur-lg bg-opacity-20'>
        <SheetHeader className='py-6'>
          <SheetTitle>Music</SheetTitle>
          <SheetDescription>
            Sample some of my favorites..
          </SheetDescription>
        </SheetHeader>
        <iframe allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" frameBorder="0" height="450" className="w-full max-w-2xl overflow-hidden rounded-md" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/us/playlist/finds-2024/pl.u-EdAVVp3CavqbeEj" />
      </SheetContent>
    </Sheet>
  )
}
