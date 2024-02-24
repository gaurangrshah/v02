const footerLinks = [
  {
    title: 'Brittany Chiang Website',
    url: 'https://brittanychiang.com',
  },
  {
    title: 'Visual Studio Code',
    url: 'https://code.visualstudio.com/',
  },
  {
    title: 'Next.js',
    url: 'https://nextjs.org/',
  },
  {
    title: 'Tailwind CSS',
    url: 'https://tailwindcss.com/',
  },
  {
    title: 'Kirimase',
    url: 'https://kirimase.dev/',
  },
  {
    title: 'Vercel',
    url: 'https://vercel.com/',
  },
  {
    title: 'Geist',
    url: '',
  }
]

export function Footer() {
  return (
    <footer className="max-w-md pb-16 text-sm text-slate-500 sm:pb-0">
      <p>
        This portfolio design was inspired by the work of the talented{" "}
        <a
          className="font-medium text-slate-400 hover:text-accent focus-visible:text-accent"
          href="https://brittanychiang.com/"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Brittany Chiang (opens in a new tab)"
        >
          Brittany Chiang
        </a>
        {" "}and coded in{" "}
        <a
          href="https://code.visualstudio.com/"
          className="font-medium text-slate-400 hover:text-accent focus-visible:text-accent"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Visual Studio Code (opens in a new tab)"
        >
          Visual Studio Code
        </a>
        {" "}
        by yours truly. Built with{" "}
        <a
          href="https://nextjs.org/"
          className="font-medium text-slate-400 hover:text-accent focus-visible:text-accent"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Next.js (opens in a new tab)"
        >
          Next.js
        </a>
        {" "}and{" "}
        <a
          href="https://tailwindcss.com/"
          className="font-medium text-slate-400 hover:text-accent focus-visible:text-accent"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Tailwind CSS (opens in a new tab)"
        >
          Tailwind CSS
        </a>
        , bootstrapped with{" "}
        <a
          href="https://kirimase.dev/"
          className="font-medium text-slate-400 hover:text-accent focus-visible:text-accent"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Kirimase (opens in a new tab)"
        >
          Kirimase
        </a>
        , deployed on{" "}
        <a
          href="https://vercel.com/"
          className="font-medium text-slate-400 hover:text-accent focus-visible:text-accent"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Vercel (opens in a new tab)"
        >
          Vercel
        </a>

        . All text is set in the{" "}
        <a
          href="https://github.com/vercel/geist-font"
          className="font-medium text-slate-400 hover:text-accent focus-visible:text-accent"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Inter (opens in a new tab)"
        >
          Geist
        </a>
        {" "}
        typeface.
      </p>
    </footer>
  )
}
