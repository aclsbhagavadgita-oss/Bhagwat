import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import ChapterGrid from '@/components/home/ChapterGrid';
import FaqAccordion from '@/components/home/FaqAccordion';
import JsonLd, { getWebSiteSchema, getHomePageFaqSchema, getBreadcrumbSchema } from '@/components/ui/JsonLd';
import { getHomeMetadata } from '@/lib/seo';
import { BASE_URL } from '@/lib/seo';

export const metadata: Metadata = getHomeMetadata();

export default function HomePage() {
  const websiteSchema = getWebSiteSchema(BASE_URL);
  const faqSchema = getHomePageFaqSchema();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: BASE_URL },
  ]);

  return (
    <>
      <JsonLd data={websiteSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      <HeroSection />
      <ChapterGrid />
      <FaqAccordion />

      {/* Bottom CTA Banner */}
      <section
        className="py-16 px-4 text-center"
        style={{
          background: 'linear-gradient(135deg, #1a0808 0%, #2d1010 50%, #1a0808 100%)',
        }}
        aria-labelledby="cta-heading"
      >
        <p className="font-devanagari text-2xl mb-2" style={{ color: '#c9a84c' }}>
          ॐ नमो भगवते वासुदेवाय
        </p>
        <h2
          id="cta-heading"
          className="font-serif text-2xl md:text-3xl font-bold text-white mb-4"
        >
          Begin Your Spiritual Journey
        </h2>
        <p className="mx-auto max-w-lg mb-8 text-base" style={{ color: '#c4a882' }}>
          Read the timeless wisdom and deep insights in our collection of chapters.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/chapter/1"
            className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-bold text-white shadow-xl transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #e85d04, #c44d03)' }}
          >
            Start Reading Chapter 1
          </a>
          <a
            href="/search"
            className="inline-flex items-center gap-2 rounded-xl border-2 px-8 py-4 text-base font-semibold transition-all hover:bg-white/10"
            style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#ffffff' }}
          >
            Search Articles
          </a>
        </div>
      </section>
    </>
  );
}
