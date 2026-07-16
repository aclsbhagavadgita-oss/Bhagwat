import type { MetadataRoute } from 'next';
import { getPublishedChapters } from '@/lib/chapters';

const BASE_URL = 'https://gitawisdom.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const chapters = getPublishedChapters();
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/author`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/search`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  const chapterPages: MetadataRoute.Sitemap = chapters.map(ch => ({
    url: `${BASE_URL}/chapter/${ch.number}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...chapterPages];
}
