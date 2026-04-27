import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'سينما ماكس - أفلام ومسلسلات',
    short_name: 'سينما ماكس',
    description: 'شاهد أحدث الأفلام والمسلسلات العربية والأجنبية مترجمة بجودة عالية HD',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#2563eb',
    orientation: 'portrait',
    icons: [
      {
        src: '/favicon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
