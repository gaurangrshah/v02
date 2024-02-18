import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url:
        process.env.NODE_ENV === 'development'
          ? `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`
          : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/sitemap.xml`,
    },
  ];
}
