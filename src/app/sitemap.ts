import { MetadataRoute } from 'next';
import { allContent } from '@/data';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nextgear.space'; // Assuming this is the domain based on previous messages

  // Base routes
  const routes = [
    '',
    '/movies',
    '/series',
    '/new',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Content routes (Movies and Series)
  const contentRoutes = allContent.map((item: any) => ({
    url: `${baseUrl}/watch/${item.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Genre routes
  const genres = new Set<string>();
  allContent.forEach((item: any) => {
    item.genre?.forEach((g: string) => genres.add(g));
  });

  const genreRoutes = Array.from(genres).map((genre) => ({
    url: `${baseUrl}/genre/${encodeURIComponent(genre)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [...routes, ...contentRoutes, ...genreRoutes];
}
