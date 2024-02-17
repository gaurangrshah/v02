import Image from 'next/image';

export function WhoButton() {
  return (
    <div>
      <button
        className="hover:-text-teal-300 absolute bottom-0 right-0 inline-flex items-center px-2 py-4 font-medium text-slate-400 hover:-translate-y-2 focus-visible:text-teal-300"
        type="button"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="radix-:R4l6:"
        data-state="closed"
      >
        <span className="sr-only">Click to time travel</span>
        <Image
          alt="Spinning Tardis from Doctor Who"
          loading="lazy"
          width={100}
          height={86}
          decoding="async"
          data-nimg={1}
          style={{ color: "transparent" }}
          src="https://brittanychiang.com/_next/image?url=%2Fimages%2Ftardis%2Frotate.gif&w=256&q=75"
        />
      </button>
    </div>
  )
}
