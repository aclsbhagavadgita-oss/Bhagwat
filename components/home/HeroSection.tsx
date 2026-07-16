import Link from 'next/link';

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: '85vh' }}
      aria-label="Hero section"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #1a0808 0%, #2d1010 40%, #3d1a08 70%, #1a0a04 100%)',
        }}
        aria-hidden="true"
      />

      {/* Decorative mandala pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #e85d04 0%, transparent 50%), 
                           radial-gradient(circle at 80% 50%, #c9a84c 0%, transparent 50%),
                           radial-gradient(circle at 50% 20%, #e85d04 0%, transparent 40%)`,
        }}
        aria-hidden="true"
      />

      {/* Sanskrit text watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-5 font-devanagari select-none"
        style={{ fontSize: '20rem', color: '#c9a84c', lineHeight: 1, pointerEvents: 'none' }}
        aria-hidden="true"
      >
        गीता
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-24 text-center" style={{ minHeight: '85vh' }}>
        {/* Badge */}
        <div
          className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider animate-fade-in-up"
          style={{ background: 'rgba(232,93,4,0.15)', borderColor: 'rgba(232,93,4,0.4)', color: '#f48c06' }}
        >
          <span style={{ fontSize: '1rem' }}>॥</span>
          Timeless Wisdom & Modern Medicine
          <span style={{ fontSize: '1rem' }}>॥</span>
        </div>

        {/* Main heading */}
        <h1
          className="font-serif font-bold leading-tight mb-4 animate-fade-in-up"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            color: '#ffffff',
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
            animationDelay: '0.1s',
          }}
        >
          Advanced Cardiovascular Life Support Through the Lens of the Bhagavad Gita
        </h1>

        {/* Sanskrit subtitle */}
        <p
          className="font-devanagari mb-3 animate-fade-in-up"
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            color: '#c9a84c',
            textShadow: '0 1px 10px rgba(0,0,0,0.5)',
            animationDelay: '0.2s',
          }}
        >
          विज्ञानं ब्रह्म
        </p>

        <p
          className="mb-6 font-serif italic animate-fade-in-up"
          style={{ fontSize: '1.1rem', color: '#d4b090', animationDelay: '0.25s' }}
        >
          A Synthesis of Science and Spirituality
        </p>

        {/* Description */}
        <p
          className="mx-auto mb-8 max-w-2xl leading-relaxed animate-fade-in-up"
          style={{ fontSize: '1.05rem', color: '#c4a882', animationDelay: '0.3s' }}
        >
          Explore all <strong style={{ color: '#f48c06' }}>18 chapters</strong> integrating 
          the 2025 AHA Guidelines for ACLS with the profound teachings of the Bhagavad Gita.
          Master life-saving skills while cultivating equanimity and compassion.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Link
            href="/chapter/1"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-8 py-4 text-base font-bold text-white shadow-xl transition-all hover:shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #e85d04, #c44d03)', boxShadow: '0 8px 30px rgba(232,93,4,0.4)' }}
          >
            <span>Start Reading</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1" aria-hidden="true">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Stats row */}
        <div className="mt-12 grid grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          {[
            { number: '18', label: 'Chapters' },
            { number: '2025', label: 'AHA Guidelines' },
            { number: '1', label: 'Profound Synthesis' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="font-serif text-3xl font-bold"
                style={{ color: '#e85d04' }}
              >
                {stat.number}
              </p>
              <p className="text-sm" style={{ color: '#9a7060' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{ background: 'linear-gradient(to bottom, transparent, #fdf8f0)' }}
        aria-hidden="true"
      />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#e85d04' }}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
