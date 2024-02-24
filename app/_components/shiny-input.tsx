"use client"

import {
  type ComponentProps,
  useRef,
  useState,
} from 'react';

import { cn } from '@/lib/utils';

export type ShinyInputProps = {
  field: ComponentProps<'input'>;
  className: string;
  label: {
    className?: ComponentProps<'label'>['className'];
    text: string | undefined;
  }
  children?: React.ReactNode;
}

export function ShinyInput({ field, className, label, children }: ShinyInputProps) {
  const divRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLInputElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };
  return (
    <div className="relative group" role="group">
      <label htmlFor={field.name} className={cn(label.className, "peer text-xs font-medium text-gray-900 sr-only dark:text-white capitalize")}>{label.text || field.name}</label>
      <input onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        autoComplete="off"
        {...field}
        className={cn(className, " peer-focus-within:-translate-y-4 peer w-full min-h-10 ps-4  border border-neutral-800 bg-background focus-visible:bg-neutral-950 text-slate-400 transition-all duration-500 placeholder:select-none placeholder:text-slate-600 focus:border-[hsl(150_40%_52%)] focus:outline-none focus-visible:focus:ring-0 focus-visible:ring-0 focus-within:focus:ring-0 rounded-md")} />
      <input
        ref={divRef}
        disabled
        style={{
          border: "1px solid hsl(var(--secondary))",
          opacity,
          WebkitMaskImage: `radial-gradient(30% 28px at ${position.x}px ${position.y}px, black 45%, transparent)`,
        }}
        aria-hidden="true"
        className="peer peer-focus-within:hidden visible border-[hsl(var)] pointer-events-none absolute left-0 top-0 z-10 h-11 w-full cursor-default rounded-md border bg-transparent p-3.5 opacity-0 transition-opacity duration-500 placeholder:select-none"
      />
      {children}
    </div>
  )
}
