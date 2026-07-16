import chaptersDataRaw from '@/data/chapters.json';

export interface Chapter {
  number: number;
  slug: string;
  sanskritTitle: string;
  transliteratedTitle: string;
  englishTitle: string;
  shortDescription: string;
  category?: string;
  content?: string;
  published?: boolean;
}

const chaptersData = chaptersDataRaw as Chapter[];

export function getAllChapters(): Chapter[] {
  return chaptersData;
}

export function getPublishedChapters(): Chapter[] {
  return chaptersData.filter(ch => ch.published !== false);
}

export function getChapter(number: number): Chapter | undefined {
  return chaptersData.find(ch => ch.number === number);
}

export function getChapterBySlug(slug: string): Chapter | undefined {
  return chaptersData.find(ch => ch.slug === slug);
}

export function getPrevNextChapter(number: number): {
  prev: Chapter | null;
  next: Chapter | null;
} {
  const chapters = getPublishedChapters();
  // Ensure sorted
  const sorted = [...chapters].sort((a, b) => a.number - b.number);
  
  const currentIndex = sorted.findIndex(ch => ch.number === number);
  if (currentIndex === -1) return { prev: null, next: null };
  
  const prev = currentIndex > 0 ? sorted[currentIndex - 1] : null;
  const next = currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null;
  
  return { prev, next };
}
