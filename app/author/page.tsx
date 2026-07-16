import type { Metadata } from 'next';
import { BASE_URL } from '@/lib/seo';
import Breadcrumb from '@/components/layout/Breadcrumb';
import JsonLd, { getBreadcrumbSchema } from '@/components/ui/JsonLd';

export const metadata: Metadata = {
  title: 'About the Author | Gita Wisdom',
  description: 'Learn about the author and their background in Emergency Medicine and spiritual philosophy.',
  alternates: {
    canonical: `${BASE_URL}/author`,
  },
};

export default function AuthorPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: BASE_URL },
    { name: 'About Author', url: `${BASE_URL}/author` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      
      <div className="mx-auto max-w-4xl px-4">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About Author' }]} />
      </div>

      <header className="py-12 px-4 text-center" style={{ background: 'linear-gradient(135deg, #1a0808 0%, #2d1010 100%)' }}>
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-white mb-3">
          About the Author
        </h1>
        <p className="font-devanagari text-xl mb-2" style={{ color: '#c9a84c' }}>वैद्यो नारायणो हरिः</p>
        <p className="mx-auto max-w-xl text-base leading-relaxed" style={{ color: '#c4a882' }}>
          Over three decades of experience in Emergency Medicine.
        </p>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-16">
        <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-orange-600 prose-p:text-gray-800 prose-p:leading-relaxed">
          <p className="text-xl italic text-gray-700 border-l-4 border-orange-300 pl-6 py-2 mb-8 bg-orange-50 rounded-r-lg">
            "During more than three decades in Emergency Medicine, I have learned that the first minute determines the next thirty. The best resuscitation teams are not necessarily the fastest—they are the ones who recognize the problem early, remain calm, and execute the basics flawlessly."
          </p>
          
          <p>
            The intersection of high-stakes emergency medicine and the ancient wisdom of the Bhagavad Gita may seem unusual at first glance. However, the battlefield of Kurukshetra and the chaos of an emergency room share a profound commonality: they both demand clear action, equanimity, and absolute focus amidst life-and-death stakes.
          </p>

          <p>
            This project was born out of a desire to bridge the gap between technical proficiency and emotional resilience. While the American Heart Association provides the critical algorithms required to save a life, the Bhagavad Gita offers the internal framework needed to save the practitioner from the burdens of anxiety, burnout, and moral injury.
          </p>

          <p>
            Through this synthesis, the goal is to cultivate a new generation of healthcare providers—those who act with the precision of a master clinician and the serene detachment of a Karma Yogi.
          </p>
        </div>
      </main>
    </>
  );
}
