import type { Metadata } from 'next';

export const BASE_URL = 'https://acls-bhagavadgita.com';
const SITE_NAME = 'Gita Wisdom';
const OG_IMAGE = `${BASE_URL}/og-image.jpg`;

export function getBaseMetadata(): Metadata {
  return {
    metadataBase: new URL(BASE_URL),
    applicationName: SITE_NAME,
    authors: [{ name: 'Sage Vyasa', url: BASE_URL }],
    keywords: [
      'bhagavad gita', 'acls', 'cpr guidelines', 'karma yoga in medicine',
      'spiritual resuscitation', 'evidence-based medicine', 'aha guidelines 2025', 'healthcare burnout'
    ],
    openGraph: {
      siteName: SITE_NAME,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@GitaWisdom',
    },
    alternates: {
      languages: {
        'en': `${BASE_URL}`,
        'hi': `${BASE_URL}/hi`,
        'x-default': `${BASE_URL}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function getHomeMetadata(): Metadata {
  return {
    ...getBaseMetadata(),
    title: {
      default: `Bhagavad Gita in English — 18 Chapters | ${SITE_NAME}`,
      template: `%s | ${SITE_NAME}`,
    },
    description:
      'Read the complete Bhagavad Gita online — 18 chapters with Sanskrit shloka, transliteration, word-by-word meaning, English translation and commentary. Free, ad-free, SEO-friendly.',
    alternates: {
      canonical: BASE_URL,
      languages: {
        'en': BASE_URL,
        'hi': `${BASE_URL}/hi`,
        'x-default': BASE_URL,
      },
    },
    openGraph: {
      title: `Bhagavad Gita — 18 Chapters | ${SITE_NAME}`,
      description: 'A synthesis of modern evidence-based resuscitation guidelines (ACLS) and timeless spiritual wisdom from the Bhagavad Gita.',
      url: BASE_URL,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Gita Wisdom — Bhagavad Gita Online' }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Bhagavad Gita — ${SITE_NAME}`,
      description: 'Complete Bhagavad Gita online — 18 chapters with commentary.',
      images: [OG_IMAGE],
    },
  };
}

export function getChapterMetadata(chapter: {
  number: number;
  transliteratedTitle: string;
  englishTitle: string;
  shortDescription: string;
}): Metadata {
  const title = `Chapter ${chapter.number}: ${chapter.transliteratedTitle} — ${chapter.englishTitle} | Bhagavad Gita`;
  const description = `Read Bhagavad Gita Chapter ${chapter.number} — ${chapter.transliteratedTitle} (${chapter.englishTitle}). ${chapter.shortDescription.slice(0, 120)}...`;
  const url = `${BASE_URL}/chapter/${chapter.number}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        'en': url,
        'hi': `${BASE_URL}/hi/chapter/${chapter.number}`,
        'x-default': url,
      },
    },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `Bhagavad Gita Chapter ${chapter.number} — ${chapter.transliteratedTitle}` }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}



