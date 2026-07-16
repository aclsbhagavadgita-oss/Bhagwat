import Link from 'next/link';
import { getAllChapters } from '@/lib/chapters';

const chapters = getAllChapters();

const categoryColors: Record<string, { bg: string; text: string }> = {
  'Karma Yoga': { bg: '#fff3eb', text: '#e85d04' },
  'Jnana Yoga': { bg: '#f0ebff', text: '#7c3aed' },
  'Bhakti Yoga': { bg: '#fef0eb', text: '#c44d03' },
  'Raja Yoga': { bg: '#ebf5ff', text: '#2563eb' },
  'Moksha Yoga': { bg: '#ebfff5', text: '#059669' },
  'ACLS Guidelines': { bg: '#ffebee', text: '#d32f2f' },
  'Default': { bg: '#f3f4f6', text: '#4b5563' },
};

export default function ChapterGrid() {
  return (
    <section className="py-16 px-4" aria-labelledby="chapters-heading">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: '#e85d04' }}>
            Complete Scripture
          </p>
          <h2
            id="chapters-heading"
            className="font-serif text-3xl md:text-4xl font-bold mb-3"
            style={{ color: '#1a1008' }}
          >
            All 18 Chapters
          </h2>
          <p className="mx-auto max-w-xl text-base" style={{ color: '#7a6555' }}>
            Each chapter reveals a unique facet of divine wisdom. Begin your journey from Chapter 1 or jump to any chapter that calls to you.
          </p>
        </div>

        {/* Chapter grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
          {chapters.map((chapter) => {
            const categoryName = chapter.category || 'ACLS';
            const colors = categoryColors[categoryName] || categoryColors['Default'];
            
            return (
              <Link
                key={chapter.number}
                href={`/chapter/${chapter.number}`}
                className="group block rounded-2xl border-2 p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{
                  background: '#ffffff',
                  borderColor: '#e8ddd0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}
                aria-label={`Read Chapter ${chapter.number}: ${chapter.transliteratedTitle}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span
                      className="inline-block px-2 py-0.5 rounded text-xs font-semibold mb-2"
                      style={{ background: colors.bg, color: colors.text }}
                    >
                      {categoryName}
                    </span>
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#e85d04' }}>
                      Chapter {chapter.number}
                    </p>
                  </div>
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold text-white transition-transform group-hover:scale-110"
                    style={{ background: 'linear-gradient(135deg, #e85d04, #c44d03)' }}
                    aria-hidden="true"
                  >
                    {chapter.number}
                  </div>
                </div>

                <h3 className="font-serif text-lg font-bold mb-1 leading-snug" style={{ color: '#1a1008' }}>
                  {chapter.transliteratedTitle}
                </h3>
                <p className="text-sm font-devanagari mb-1" style={{ color: '#c9a84c' }}>
                  {chapter.sanskritTitle}
                </p>
                <p className="text-xs italic mb-3" style={{ color: '#7a6555' }}>
                  {chapter.englishTitle}
                </p>

                <p className="text-sm leading-relaxed line-clamp-3 mb-4" style={{ color: '#5a4535' }}>
                  {chapter.shortDescription}
                </p>

                <div className="flex items-center justify-between">
                    <span>Read Article</span>
                  <span
                    className="flex items-center gap-1 text-xs font-semibold transition-colors group-hover:text-orange-600"
                    style={{ color: '#e85d04' }}
                  >
                    Read Chapter
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
