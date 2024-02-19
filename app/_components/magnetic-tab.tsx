"use client";

// @SEE: https://www.julienthibeaut.xyz/lab/magnetic-tabs

import React, {
  useRef,
  useState,
} from 'react';

export function MagneticTab({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);

  const [hoverPosition, setHoverPosition] = useState({
    x: 0,
    y: 0,
    opacity: 0,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) * 0.15;
    const y = (clientY - top - height / 2) * 0.15;

    setHoverPosition({ x, y, opacity: 1 });
  };

  const onMouseOut = () => {
    setHoverPosition({ x: 0, y: 0, opacity: 0 });
  };

  return (
    <>
      <button
        ref={ref}
        className="relative h-9"
        onMouseMove={handleMouseMove}
        onMouseLeave={onMouseOut}
      >
        <div className="relative px-4 py-2 text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 z-20">
          {children}
        </div>{" "}
        <div
          className="absolute bottom-0 left-0 z-10 h-full w-full rounded-[4px] bg-zinc-200/80 transition-opacity dark:bg-zinc-800/40"
          aria-hidden="true"
          style={{
            transform: `translate(${hoverPosition.x}px, ${hoverPosition.y}px)`,
            opacity: hoverPosition.opacity,
          }}
        />
      </button>
    </>
  );
};
