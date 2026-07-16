import Link from 'next/link';
import { getAllChapters } from '@/lib/chapters';

const chapters = getAllChapters();

const footerLinks = {
  chapters: chapters.slice(0, 9).map(ch => ({
    label: `Chapter ${ch.number}: ${ch.transliteratedTitle}`,
    href: `/chapter/${ch.number}`,
  })),
  moreChapters: chapters.slice(9).map(ch => ({
    label: `Chapter ${ch.number}: ${ch.transliteratedTitle}`,
    href: `/chapter/${ch.number}`,
  })),
  resources: [
    { label: 'About Bhagavad Gita', href: '/about' },
    { label: 'About the Author', href: '/author' },
    { label: 'Blog', href: '/blog' },
    { label: 'Search', href: '/search' },
    { label: 'Chapter 2: Key Teachings', href: '/chapter/2' },
  ],
};

export default function Footer() {
  return (
    <footer
      className="border-t mt-16"
      style={{ background: '#1a0808', borderColor: '#2d1010', color: '#c9b5a5' }}
      role="contentinfo"
    >
      {/* Top section */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4" aria-label="Gita Wisdom Home">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full text-white text-xl font-bold"
                style={{ background: 'linear-gradient(135deg, #e85d04, #c44d03)' }}
                aria-hidden="true"
              >
                ॐ
              </div>
              <div>
                <span className="font-serif text-xl font-bold text-white">Gita Wisdom</span>
                <p className="text-xs font-devanagari" style={{ color: '#c9a84c' }}>श्रीमद्भगवद्गीता</p>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#9a8070' }}>
              The Bhagavad Gita — eternal wisdom of Lord Krishna, presented in a clear, modern format for spiritual seekers.
            </p>
            <p className="text-xs italic font-serif" style={{ color: '#c9a84c' }}>
              &ldquo;सर्वधर्मान् परित्यज्य मामेकं शरणं व्रज&rdquo;
            </p>
            <p className="text-xs mt-1 mb-4" style={{ color: '#7a6555' }}>— Bhagavad Gita 18.66</p>
            
            <div className="text-sm border-t pt-4" style={{ borderColor: '#2d1010', color: '#9a8070' }}>
              <p className="flex items-center gap-2 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <a href="mailto:acls.bhagawadgita@gmail.com" className="hover:text-orange-400 transition-colors">acls.bhagawadgita@gmail.com</a>
              </p>
              <p className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <a href="tel:+919811412126" className="hover:text-orange-400 transition-colors">9811412126</a>
              </p>
            </div>
          </div>

          {/* Chapters 1-9 */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#e85d04' }}>
              Chapters 1–9
            </h3>
            <ul className="space-y-2">
              {footerLinks.chapters.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs transition-colors hover:text-orange-400"
                    style={{ color: '#9a8070' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Chapters 10-18 */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#e85d04' }}>
              Chapters 10–18
            </h3>
            <ul className="space-y-2">
              {footerLinks.moreChapters.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs transition-colors hover:text-orange-400"
                    style={{ color: '#9a8070' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#e85d04' }}>
              Resources
            </h3>
            <ul className="space-y-2">
              {footerLinks.resources.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs transition-colors hover:text-orange-400"
                    style={{ color: '#9a8070' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: '#e85d04' }}>
                Key Stats
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { n: '18', label: 'Chapters' },
                  { n: '1', label: 'Epic' },
                  { n: '5000+', label: 'Years Old' },
                  { n: '∞', label: 'Wisdom' },
                ].map(stat => (
                  <div key={stat.label} className="rounded-lg p-2 text-center" style={{ background: '#2d1010' }}>
                    <p className="font-serif text-lg font-bold" style={{ color: '#e85d04' }}>{stat.n}</p>
                    <p className="text-xs" style={{ color: '#7a6555' }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t" style={{ borderColor: '#2d1010' }}>
        <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs" style={{ color: '#5a4535' }}>
            © {new Date().getFullYear()} Gita Wisdom. Translation by Swami Sivananda (Public Domain).
          </p>
          <div className="flex items-center gap-4">
            <Link href="/sitemap.xml" className="text-xs hover:text-orange-400 transition-colors" style={{ color: '#5a4535' }}>Sitemap</Link>
            <Link href="/about" className="text-xs hover:text-orange-400 transition-colors" style={{ color: '#5a4535' }}>About</Link>
            <Link href="/search" className="text-xs hover:text-orange-400 transition-colors" style={{ color: '#5a4535' }}>Search</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
