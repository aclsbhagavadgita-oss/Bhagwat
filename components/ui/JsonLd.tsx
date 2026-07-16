interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Preset schemas
export function getWebSiteSchema(baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}#website`,
    name: 'Gita Wisdom — Bhagavad Gita Online',
    alternateName: ['Bhagavad Gita', 'Bhagwat Geeta', 'Srimad Bhagavad Gita'],
    url: baseUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Gita Wisdom',
      url: baseUrl,
    },
    description: 'Complete Bhagavad Gita online — 18 chapters with Sanskrit shloka, transliteration, word meanings, English translation and commentary.',
    inLanguage: ['en', 'hi', 'sa'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getHomePageFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many chapters are in the Bhagavad Gita?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Bhagavad Gita contains 18 chapters. It forms part of the Mahabharata and records the sacred dialogue between Lord Krishna and Arjuna on the battlefield of Kurukshetra.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who wrote the Bhagavad Gita?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Bhagavad Gita was composed by the sage Vyasa as part of the Mahabharata. It records the sacred dialogue between Lord Sri Krishna and Prince Arjuna on the eve of the Kurukshetra war.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the most famous teaching in the Bhagavad Gita?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The most famous teaching is Karma Yoga, specifically the message: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions." It encapsulates the essence of selfless action.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the three paths (yoga) taught in the Bhagavad Gita?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Bhagavad Gita teaches three primary paths to liberation: Karma Yoga (the yoga of selfless action), Jnana Yoga (the yoga of knowledge and wisdom), and Bhakti Yoga (the yoga of loving devotion to God). All three paths ultimately lead to the same destination — union with the Divine.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the final teaching of the Bhagavad Gita?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The most important final teaching is to abandon all varieties of dharma and just surrender unto the Divine, who will deliver you from all sinful reactions. Do not fear. This is the ultimate instruction of the Gita.',
        },
      },
    ],
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': item.url,
        name: item.name,
      },
    })),
  };
}

