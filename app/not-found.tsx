import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found | Gita Wisdom',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="font-devanagari text-8xl mb-4" style={{ color: '#e85d04' }} aria-hidden="true">
        ॐ
      </div>
      <h1 className="font-serif text-4xl font-bold mb-3" style={{ color: '#1a1008' }}>
        Page Not Found
      </h1>
      <p className="text-base mb-2" style={{ color: '#7a6555' }}>
        This page does not exist — but the eternal truth does.
      </p>
      <p className="font-serif italic text-sm mb-6" style={{ color: '#c9a84c' }}>
        &ldquo;नासतो विद्यते भावो नाभावो विद्यते सतः&rdquo;
      </p>
      <p className="text-xs mb-8" style={{ color: '#9a8070' }}>
        That which is unreal has no existence. — Bhagavad Gita 2.16
      </p>
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="rounded-xl px-6 py-3 text-sm font-bold text-white"
          style={{ background: 'linear-gradient(135deg, #e85d04, #c44d03)' }}
        >
          Return Home
        </Link>
        <Link
          href="/chapter/2"
          className="rounded-xl border-2 px-6 py-3 text-sm font-semibold"
          style={{ borderColor: '#e85d04', color: '#e85d04' }}
        >
          Read Chapter 2
        </Link>
      </div>
    </div>
  );
}
