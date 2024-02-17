"use client";

import {
  useEffect,
  useRef,
} from 'react';

export function Wrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const updateMousePosition = (ev: MouseEvent) => {
      if (!ref.current) return;
      const { clientX, clientY } = ev;
      ref.current.style.setProperty("--x", `${clientX}px`);
      ref.current.style.setProperty("--y", `${clientY}px`);
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);
  return (
    < div ref={ref} className="relative mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0 before:pointer-events-none before:fixed before:inset-0 before:z-0 before:isolate dark:before:bg-[radial-gradient(circle_Closest-side_at_var(--x,_10px)_var(--y,_100px),hsl(116,42%,28%)_20%,_transparent_100%)] before:bg-[radial-gradient(circle_Closest-side_at_var(--x,_10px)_var(--y,_100px),hsl(var(--accent))_50%,_transparent_100%)] before:opacity-10">

      {children}
    </div >
  );
}
