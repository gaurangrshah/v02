"use client";

import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function Settings() {
  const { setTheme } = useTheme();

  return (
    <>
      <Button
        asChild
        variant={"ghost"}
        className="w-fit h-fit"
        onClick={() => setTheme("light")}
      >
        <div className="flex flex-col">
          <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
            <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
              <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
              </div>
              <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
              </div>
              <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
              </div>
            </div>
          </div>
          <span className="block w-full p-2 text-center font-normal">
            Light
          </span>
        </div>
      </Button>
      <Button
        asChild
        variant={"ghost"}
        onClick={() => setTheme("dark")}
        className="w-fit h-fit"
      >
        <div className="flex flex-col">
          <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
            <div className="space-y-2 rounded-sm bg-neutral-950 p-2">
              <div className="space-y-2 rounded-md bg-neutral-800 p-2 shadow-sm">
                <div className="h-2 w-[80px] rounded-lg bg-neutral-400" />
                <div className="h-2 w-[100px] rounded-lg bg-neutral-400" />
              </div>
              <div className="flex items-center space-x-2 rounded-md bg-neutral-800 p-2 shadow-sm">
                <div className="h-4 w-4 rounded-full bg-neutral-400" />
                <div className="h-2 w-[100px] rounded-lg bg-neutral-400" />
              </div>
              <div className="flex items-center space-x-2 rounded-md bg-neutral-800 p-2 shadow-sm">
                <div className="h-4 w-4 rounded-full bg-neutral-400" />
                <div className="h-2 w-[100px] rounded-lg bg-neutral-400" />
              </div>
            </div>
          </div>
          <span className="block w-full p-2 text-center font-normal">
            Dark
          </span>
        </div>
      </Button>
      <Button
        asChild
        variant={"ghost"}
        onClick={() => setTheme("system")}
        className="w-fit h-fit"
      >
        <div className="flex flex-col">
          <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
            <div className="space-y-2 rounded-sm bg-neutral-300 p-2">
              <div className="space-y-2 rounded-md bg-neutral-600 p-2 shadow-sm">
                <div className="h-2 w-[80px] rounded-lg bg-neutral-400" />
                <div className="h-2 w-[100px] rounded-lg bg-neutral-400" />
              </div>
              <div className="flex items-center space-x-2 rounded-md bg-neutral-600 p-2 shadow-sm">
                <div className="h-4 w-4 rounded-full bg-neutral-400" />
                <div className="h-2 w-[100px] rounded-lg bg-neutral-400" />
              </div>
              <div className="flex items-center space-x-2 rounded-md bg-neutral-600 p-2 shadow-sm">
                <div className="h-4 w-4 rounded-full bg-neutral-400" />
                <div className="h-2 w-[100px] rounded-lg bg-neutral-400" />
              </div>
            </div>
          </div>
          <span className="block w-full p-2 text-center font-normal">
            System
          </span>
        </div>
      </Button>
    </>
  )
}