import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPublishedChapters, getChapter, getPrevNextChapter } from '@/lib/chapters';
import { getChapterMetadata, BASE_URL } from '@/lib/seo';
import Breadcrumb from '@/components/layout/Breadcrumb';
import JsonLd, { getBreadcrumbSchema } from '@/components/ui/JsonLd';

// Force server-render so admin changes to chapters appear instantly
export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ chapterNumber: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { chapterNumber } = await params;
  const chapter = getChapter(Number(chapterNumber));
  if (!chapter) return {};
  return getChapterMetadata(chapter);
}

export default async function ChapterPage({ params }: PageProps) {
  const { chapterNumber } = await params;
  const chNum = Number(chapterNumber);
  const chapter = getChapter(chNum);
  if (!chapter || chapter.published === false) notFound();

  const { prev, next } = getPrevNextChapter(chNum);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: BASE_URL },
    { name: `Chapter ${chNum}: ${chapter.transliteratedTitle}`, url: `${BASE_URL}/chapter/${chNum}` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-4xl">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Chapters', href: '/#chapters-heading' },
            { label: `Chapter ${chNum}` },
          ]}
        />
      </div>

      {/* Chapter Hero */}
      <header
        className="py-12 px-4 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a0808 0%, #2d1010 50%, #1a0808 100%)' }}
      >
        <div className="absolute inset-0 opacity-10 font-devanagari flex items-center justify-center pointer-events-none select-none" style={{ fontSize: '20rem', color: '#c9a84c', lineHeight: 1 }} aria-hidden="true">
          {chNum}
        </div>
        <div className="relative z-10 mx-auto max-w-4xl">
          <span
            className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-4"
            style={{ background: 'rgba(232,93,4,0.2)', color: '#f48c06' }}
          >
            Chapter {chapter.number}
          </span>
          <h1
            className="font-serif text-3xl md:text-5xl font-bold text-white mb-4"
          >
            {chapter.transliteratedTitle}
          </h1>
          <p className="font-serif italic text-xl mb-4" style={{ color: '#d4b090' }}>
            {chapter.englishTitle}
          </p>
          <p className="mx-auto max-w-2xl text-base leading-relaxed" style={{ color: '#c4a882' }}>
            {chapter.shortDescription}
          </p>
        </div>
      </header>

      {/* Main content */}
      <article className="mx-auto max-w-3xl px-4 py-12">
        <div
          className="prose prose-lg prose-orange mx-auto whitespace-pre-wrap"
          style={{ color: '#3d2b1f', fontFamily: 'var(--font-sans)', lineHeight: 1.8 }}
          dangerouslySetInnerHTML={{ __html: chapter.content || '' }}
        />

        {/* Prev/Next Chapter Navigation */}
        <nav
          className="mt-16 pt-8 border-t-2 flex items-center justify-between gap-4"
          style={{ borderColor: '#e8ddd0' }}
          aria-label="Chapter navigation"
        >
          {prev ? (
            <Link
              href={`/chapter/${prev.number}`}
              className="group flex items-center gap-3 rounded-xl border-2 px-5 py-3 transition-all hover:shadow-md hover:-translate-x-1"
              style={{ background: '#ffffff', borderColor: '#e8ddd0' }}
              aria-label={`Previous: Chapter ${prev.number}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1" aria-hidden="true">
                <path d="m15 18-6-6 6-6" />
              </svg>
              <div>
                <p className="text-xs" style={{ color: '#7a6555' }}>Previous</p>
                <p className="text-sm font-semibold" style={{ color: '#1a1008' }}>Chapter {prev.number}</p>
              </div>
            </Link>
          ) : <div />}

          {next ? (
            <Link
              href={`/chapter/${next.number}`}
              className="group flex items-center gap-3 rounded-xl border-2 px-5 py-3 transition-all hover:shadow-md hover:translate-x-1 text-right ml-auto"
              style={{ background: '#ffffff', borderColor: '#e8ddd0' }}
              aria-label={`Next: Chapter ${next.number}`}
            >
              <div>
                <p className="text-xs" style={{ color: '#7a6555' }}>Next</p>
                <p className="text-sm font-semibold" style={{ color: '#1a1008' }}>Chapter {next.number}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          ) : <div />}
        </nav>
      </article>
    </>
  );
}
