"use client";

import * as React from 'react';

import { useTheme } from 'next-themes';

import {
  MoonIcon,
  SunIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { cn } from '@/lib/utils';

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="bg-transparent hover:bg-accent/70 text-foreground dark:bg-transparent dark:hover:bg-white/30 dark:text-foreground">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


export function ModeToggle2({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();


  function switchToggle() {
    switch (theme) {
      case "dark":
        return <SunIcon className="h-[1.2rem] w-[1.2rem] dark:rotate-0 dark:scale-100 transition-all rotate-90 scale-0 duration-300" />
        break;
      case "light":
        return <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        break;
      default:
        return <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        break;
    }
  }

  const onClick = theme === 'light' ? () => setTheme('dark') : () => setTheme('light')

  return (
    <Button className={cn(className, "bg-transparent hover:bg-accent/30 dark:hover:bg-white/20 text-foreground dark:bg-transparent dark:text-gray-300")} variant="ghost" size="icon" onClick={onClick}>
      {switchToggle()}
    </Button >
  )
}
