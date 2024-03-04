import './globals.css';

import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';

import RootProviders from './root-providers';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://gshahdev.com/'),
  title: {
    default: 'G.Shah Dev',
    template:
      '%s | G.Shah Dev | Freelance Web Developer & UX Engineer | NJ Consulting',
  },
  description:
    'Help brands scale their web presence with freelance web development, UX design, growth marketing, branding & tech consulting',
  keywords:
    'Technology Consultant, Freelance Developer, Web Developer, Web Designer, Web Development, Search Engine Optimization, UX Design, Clifton, NJ, New Jersey, E-commerce Website Development, WordPress Development, Landing Page Design, Shopify Development, Hoboken, Montclair, Parsippany.',
  twitter: {
    site: '@soham_asmi',
    card: 'summary_large_image',
  },
  openGraph: {
    title: 'G.Shah Dev | Freelance Web Developer & UX Engineer | NJ Consulting',
    description:
      'Help brands scale their web presence with freelance web development, UX design, growth marketing, branding & tech consulting',
    type: 'website',
    locale: 'en_US',
    url: 'https://gshahdev.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={GeistSans.className} suppressHydrationWarning>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
