import { NewsletterForm } from './newsletter-form';
import { Socials } from './socials';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#experiments', label: 'Experiments' },
  { href: '#blog', label: 'Blog' }
]

export function Header() {
  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-primary dark:text-slate-200 sm:text-5xl">
          <a href="/">Gaurang Shah</a>
        </h1>
        <h2 className="mt-3 text-lg font-medium tracking-tight text-secondary sm:text-xl">
          Full Stack Engineer
        </h2>
        <p className="text-sm mt-4 max-w-xs leading-normal text-slate-400">
          I help startups and SMB&apos;s excel online by building engaging experiences that drive growth.
        </p>
        <nav className="nav hidden lg:block" aria-label="In-page jump links">
          <ul className="mt-16 w-max">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a className="group flex items-center py-3" href={link.href}>
                  <span className="nav-indicator mr-4 h-px w-8 bg-secondary dark:group-hover:bg-slate-200 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none" />
                  <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 dark:group-hover:text-slate-200 group-hover:text-secondary group-focus-visible:text-slate-200">
                    {link.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div>
        <NewsletterForm />
        <Socials />
      </div>
    </header>
  )
}
