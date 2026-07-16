'use client';
import Link from 'next/link';
import { useState } from 'react';
import { getAllChapters } from '@/lib/chapters';

const chapters = getAllChapters();

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [chaptersOpen, setChaptersOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b"
      style={{ background: 'rgba(253,248,240,0.92)', backdropFilter: 'blur(12px)', borderColor: '#e0d0bb' }}
      role="banner"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Gita Wisdom — Home"
          >
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full text-white text-lg font-bold"
              style={{ background: 'linear-gradient(135deg, #e85d04, #c44d03)' }}
              aria-hidden="true"
            >
              ॐ
            </div>
            <div>
              <span className="font-serif text-xl font-bold" style={{ color: '#6b1414' }}>
                Gita Wisdom
              </span>
              <p className="text-xs" style={{ color: '#7a6555', lineHeight: 1 }}>
                श्रीमद्भगवद्गीता
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Primary navigation">
            {/* Chapters dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-orange-600"
                style={{ color: '#3d2b1f' }}
                onClick={() => setChaptersOpen(!chaptersOpen)}
                aria-haspopup="true"
                aria-expanded={chaptersOpen}
                id="chapters-menu-btn"
              >
                Chapters
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform ${chaptersOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {chaptersOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[640px] rounded-xl border shadow-2xl p-4"
                  style={{ background: '#fff', borderColor: '#e0d0bb' }}
                  role="menu"
                  aria-labelledby="chapters-menu-btn"
                  onMouseLeave={() => setChaptersOpen(false)}
                >
                  <div className="grid grid-cols-3 gap-1">
                    {chapters.map((ch) => (
                      <Link
                        key={ch.number}
                        href={`/chapter/${ch.number}`}
                        className="flex items-center gap-2 rounded-lg p-2 text-sm transition-colors hover:bg-orange-50"
                        style={{ color: '#3d2b1f' }}
                        role="menuitem"
                        onClick={() => setChaptersOpen(false)}
                      >
                        <span
                          className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                          style={{ background: '#e85d04' }}
                        >
                          {ch.number}
                        </span>
                        <span className="truncate">{ch.transliteratedTitle}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/blog" className="text-sm font-medium transition-colors hover:text-orange-600" style={{ color: '#3d2b1f' }}>
              Blog
            </Link>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-orange-600" style={{ color: '#3d2b1f' }}>
              About
            </Link>
            <Link href="/author" className="text-sm font-medium transition-colors hover:text-orange-600" style={{ color: '#3d2b1f' }}>
              Author
            </Link>
            <Link href="/search" className="text-sm font-medium transition-colors hover:text-orange-600" style={{ color: '#3d2b1f' }} aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.34-4.34" />
              </svg>
            </Link>
          </nav>

          {/* CTA Button */}
          <Link
            href="/chapter/1"
            className="hidden md:inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-all hover:opacity-90 shadow-md"
            style={{ background: 'linear-gradient(135deg, #e85d04, #c44d03)' }}
          >
            Read Gita
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {mobileOpen ? (
                <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>
              ) : (
                <><path d="M4 5h16" /><path d="M4 12h16" /><path d="M4 19h16" /></>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t"
          style={{ background: '#fdf8f0', borderColor: '#e0d0bb' }}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="px-4 py-4 space-y-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#7a6555' }}>Chapters</p>
              <div className="grid grid-cols-2 gap-1">
                {chapters.map((ch) => (
                  <Link
                    key={ch.number}
                    href={`/chapter/${ch.number}`}
                    className="flex items-center gap-2 rounded-lg p-2 text-sm"
                    style={{ color: '#3d2b1f' }}
                    onClick={() => setMobileOpen(false)}
                  >
                    <span
                      className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ background: '#e85d04' }}
                    >
                      {ch.number}
                    </span>
                    <span className="truncate text-xs">{ch.transliteratedTitle}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="border-t pt-3 space-y-2" style={{ borderColor: '#e0d0bb' }}>
              <Link href="/blog" className="block py-1 text-sm font-medium" style={{ color: '#3d2b1f' }} onClick={() => setMobileOpen(false)}>Blog</Link>
              <Link href="/about" className="block py-1 text-sm font-medium" style={{ color: '#3d2b1f' }} onClick={() => setMobileOpen(false)}>About</Link>
              <Link href="/author" className="block py-1 text-sm font-medium" style={{ color: '#3d2b1f' }} onClick={() => setMobileOpen(false)}>Author</Link>
              <Link href="/search" className="block py-1 text-sm font-medium" style={{ color: '#3d2b1f' }} onClick={() => setMobileOpen(false)}>Search</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
