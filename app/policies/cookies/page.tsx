import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'The cookies and browser storage this site uses, and how to control them.',
};

type Item = {
  name: string;
  provider: string;
  purpose: string;
  category: string;
  duration: string;
};

const items: Item[] = [
  {
    name: 'app-consent (cookie)',
    provider: 'This site',
    purpose:
      'Remembers the choice you made in the cookie banner. It holds your choices as a small block of text.',
    category: 'Necessary',
    duration: '7 days',
  },
  {
    name: 'auth_session (cookie)',
    provider: 'This site',
    purpose:
      'Keeps you signed in. It is set only if you create an account or sign in. Scripts on the page cannot read it.',
    category: 'Necessary',
    duration: 'About 1 year, or until you sign out',
  },
  {
    name: 'theme (local storage)',
    provider: 'This site',
    purpose:
      'Remembers your light, dark or system theme. It is set only when you pick a theme.',
    category: 'Necessary',
    duration: 'Until you clear site data',
  },
  {
    name: '__lc_cid and __lc_cst (cookies)',
    provider: 'LiveChat (livechatinc.com), third party',
    purpose:
      'Set by the chat widget on this site. They identify a visitor to the chat service.',
    category: 'Not controlled by the banner (see below)',
    duration: 'About 13 months',
  },
  {
    name: '__oauth_redirect_detector (cookie)',
    provider: 'LiveChat (livechatinc.com), third party',
    purpose: 'Set by the chat widget sign-in frame.',
    category: 'Not controlled by the banner (see below)',
    duration: 'Expires almost at once',
  },
];

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className='space-y-3'>
      <h2 className='text-xl font-semibold text-foreground'>{title}</h2>
      {children}
    </section>
  );
}

export default function CookiePolicyPage() {
  return (
    <main className='mx-auto w-full max-w-3xl space-y-10 px-4 pb-96 pt-12 text-foreground sm:px-6'>
      <div className='space-y-3'>
        <Link href='/' className='text-sm text-muted-foreground hover:underline'>
          &larr; Back to home
        </Link>
        <h1 className='text-3xl font-bold'>Cookie Policy</h1>
        <p className='text-muted-foreground'>
          This page lists what this site stores in your browser. It lists only
          what we have checked.
        </p>
      </div>

      <Section title='What cookies are'>
        <p className='text-muted-foreground'>
          A cookie is a small piece of text that a site saves in your browser.
          Local storage is a similar space that only holds data on your device.
          We call both of them cookies on this page unless we say otherwise.
        </p>
      </Section>

      <Section title='What this site stores'>
        <table className='hidden w-full border-collapse text-left text-sm md:table'>
          <thead>
            <tr className='border-b border-border'>
              <th className='py-2 pr-4 font-semibold'>Name</th>
              <th className='py-2 pr-4 font-semibold'>Provider</th>
              <th className='py-2 pr-4 font-semibold'>Purpose</th>
              <th className='py-2 pr-4 font-semibold'>Category</th>
              <th className='py-2 font-semibold'>Duration</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.name} className='border-b border-border align-top'>
                <td className='py-3 pr-4 font-mono text-xs'>{item.name}</td>
                <td className='py-3 pr-4 text-muted-foreground'>{item.provider}</td>
                <td className='py-3 pr-4 text-muted-foreground'>{item.purpose}</td>
                <td className='py-3 pr-4 text-muted-foreground'>{item.category}</td>
                <td className='py-3 text-muted-foreground'>{item.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ul className='space-y-4 md:hidden'>
          {items.map((item) => (
            <li
              key={item.name}
              className='space-y-1 rounded-md border border-border p-4 text-sm'
            >
              <p className='break-words font-mono text-xs font-semibold'>{item.name}</p>
              <p className='text-muted-foreground'>
                <span className='text-foreground'>Provider: </span>
                {item.provider}
              </p>
              <p className='text-muted-foreground'>
                <span className='text-foreground'>Purpose: </span>
                {item.purpose}
              </p>
              <p className='text-muted-foreground'>
                <span className='text-foreground'>Category: </span>
                {item.category}
              </p>
              <p className='text-muted-foreground'>
                <span className='text-foreground'>Duration: </span>
                {item.duration}
              </p>
            </li>
          ))}
        </ul>
        <p className='text-muted-foreground'>
          This site also uses Vercel Analytics and Vercel Speed Insights. In our
          test they set no cookies and no local storage. Neither one waits for
          your choice in the banner.
        </p>
      </Section>

      <Section title='How consent works'>
        <p className='text-muted-foreground'>
          The first time you visit, a banner asks for your choice. It has two
          buttons.
        </p>
        <ul className='list-disc space-y-2 pl-6 text-muted-foreground'>
          <li>
            &ldquo;Got it&rdquo; saves your choice with the necessary group on
            and the analytics group off.
          </li>
          <li>
            &ldquo;Show Me&rdquo; opens a panel with a switch for each group
            and for each item. The necessary group is always on. The analytics
            group is off until you turn it on. &ldquo;Done&rdquo; saves your
            choice.
          </li>
        </ul>
        <p className='text-muted-foreground'>
          The analytics group has four Google consent-mode settings:
          ad_storage, ad_user_data, ad_personalization and analytics_storage.
          The site tells Google Tag Manager that all four are denied until you
          turn them on. The necessary group has three settings:
          functionality_storage, personalization_storage and security_storage.
          These are granted.
        </p>
        <p className='text-muted-foreground'>
          The site loads Google Tag Manager. The tags that it runs come from a
          container that is set up outside this site&rsquo;s code. The chat
          widget in the table above is not controlled by the banner. It sets
          its cookies before you make a choice.
        </p>
      </Section>

      <Section title='How to change or withdraw consent'>
        <p className='text-muted-foreground'>
          After you make a choice, the banner does not come back. This site has
          no control to open it again. To change your choice, clear this
          site&rsquo;s cookies and site data in your browser settings. You can
          also delete only the app-consent cookie. The banner shows again when
          you reload the page. The banner also returns when the app-consent
          cookie expires after 7 days.
        </p>
        <p className='text-muted-foreground'>
          Clearing site data also removes your sign-in and your theme choice.
        </p>
      </Section>

      <p className='text-sm text-muted-foreground'>Last updated: 2026-11-05</p>
    </main>
  );
}
