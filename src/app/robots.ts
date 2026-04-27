import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://nextgear.space';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/'], // Disallow CMS admin area
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
