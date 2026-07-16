import type { Metadata } from 'next';
import Link from 'next/link';
import { BASE_URL } from '@/lib/seo';
import Breadcrumb from '@/components/layout/Breadcrumb';
import JsonLd, { getBreadcrumbSchema } from '@/components/ui/JsonLd';

export const metadata: Metadata = {
  title: 'About — Evidence-Based Resuscitation & Spiritual Wisdom | Gita Wisdom',
  description: 'Learn about the synthesis of Advanced Cardiovascular Life Support (ACLS) and the Bhagavad Gita.',
  alternates: {
    canonical: `${BASE_URL}/about`,
  },
};

export default function AboutPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: BASE_URL },
    { name: 'About', url: `${BASE_URL}/about` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      
      <div className="mx-auto max-w-4xl">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
      </div>

      {/* Hero */}
      <header className="py-12 px-4 text-center" style={{ background: 'linear-gradient(135deg, #1a0808 0%, #2d1010 100%)' }}>
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-white mb-3">
          About This Project
        </h1>
        <p className="font-devanagari text-xl mb-2" style={{ color: '#c9a84c' }}>विज्ञानं ब्रह्म</p>
        <p className="mx-auto max-w-xl text-base leading-relaxed" style={{ color: '#c4a882' }}>
          A synthesis of modern evidence-based resuscitation guidelines and timeless spiritual wisdom.
        </p>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-12 space-y-10">
        {/* What is this project */}
        <section aria-labelledby="what-heading">
          <h2 id="what-heading" className="font-serif text-2xl font-bold mb-4" style={{ color: '#1a1008' }}>
            ACLS Through the Lens of the Bhagavad Gita
          </h2>
          <div className="prose-spiritual">
            <p className="text-base leading-relaxed mb-4" style={{ color: '#3d2b1f' }}>
              Advanced Cardiovascular Life Support (ACLS) represents the pinnacle of modern medical science in responding to life-threatening cardiac emergencies. The American Heart Association (AHA) continuously updates these guidelines based on rigorous evidence to maximize survival.
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: '#3d2b1f' }}>
              However, the practice of resuscitation requires more than just technical knowledge. It demands immense emotional resilience, split-second decision-making, and profound compassion in the face of death. This is where the <strong>Bhagavad Gita</strong> comes in.
            </p>
            <p className="text-base leading-relaxed" style={{ color: '#3d2b1f' }}>
              By integrating the 2025 AHA Guidelines with the timeless teachings of Lord Krishna, this project offers healthcare providers a unique framework. It transforms the mechanical steps of a code blue into a mindful practice of <em>Karma Yoga</em>—selfless action—helping to combat burnout and cultivate true clinical wisdom.
            </p>
          </div>
        </section>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { n: '18', label: 'Chapters', icon: '📖' },
            { n: '2025', label: 'AHA Guidelines', icon: '❤️' },
            { n: '1', label: 'Synthesis', icon: '🕉️' },
            { n: '∞', label: 'Lives Saved', icon: '🙏' },
          ].map(stat => (
            <div key={stat.label} className="text-center rounded-2xl p-5 border-2" style={{ background: '#fff', borderColor: '#e8ddd0' }}>
              <div className="text-3xl mb-2" aria-hidden="true">{stat.icon}</div>
              <p className="font-serif text-3xl font-bold mb-1" style={{ color: '#e85d04' }}>{stat.n}</p>
              <p className="text-xs font-semibold" style={{ color: '#7a6555' }}>{stat.label}</p>
            </div>
          ))}
        </div>



        {/* Start reading CTA */}
        <div className="text-center py-6">
          <Link
            href="/chapter/1"
            className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-bold text-white shadow-xl transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #e85d04, #c44d03)' }}
          >
            Begin Reading Chapter 1
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
