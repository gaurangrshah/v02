import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard', '/account', '/settings'],
      },
    ],
    sitemap:
      process.env.NODE_ENV === 'development'
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`
        : `${process.env.NEXT_PUBLIC_VERCEL_URL}/sitemap.xml`,
  };
}
