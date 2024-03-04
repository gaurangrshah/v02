import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button';


export function MusicSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link" className="text-md px-0 py-0 my-0 m-0 text-emerald-400">
          Music
        </Button>
      </SheetTrigger>
      <SheetContent className='bg-emerald-500/20 backdrop-blur-lg bg-opacity-20'>
        <SheetHeader>
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
