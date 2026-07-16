'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';

interface Chapter {
  number: number;
  slug: string;
  transliteratedTitle: string;
  englishTitle: string;
  shortDescription: string;
  content?: string;
  published?: boolean;
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Chapter[]>([]);
  const [allChapters, setAllChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(false);
  const fuseRef = useRef<Fuse<Chapter> | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const chRes = await fetch('/api/chapters').catch(() => null);
        if (chRes && chRes.ok) {
          const data = await chRes.json();
          const published = data.filter((ch: Chapter) => ch.published !== false);
          setAllChapters(published);
          fuseRef.current = new Fuse(published, {
            keys: ['transliteratedTitle', 'englishTitle', 'shortDescription', 'content'],
            threshold: 0.3,
            includeScore: true,
          });
        }
      } catch {
        // silently fail
      }
      setLoading(false);
    }
    loadData();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    if (fuseRef.current) {
      const r = fuseRef.current.search(query).slice(0, 20);
      setResults(r.map(x => x.item));
    } else {
      const q = query.toLowerCase();
      setResults(
        allChapters
          .filter(v =>
            v.transliteratedTitle.toLowerCase().includes(q) ||
            v.englishTitle.toLowerCase().includes(q) ||
            v.shortDescription.toLowerCase().includes(q) ||
            (v.content && v.content.toLowerCase().includes(q))
          )
          .slice(0, 20)
      );
    }
  }, [query, allChapters]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1a1008' }}>
        Search Chapters
      </h1>
      <p className="text-base mb-8" style={{ color: '#7a6555' }}>
        Search through our published articles and chapters.
      </p>

      {/* Search input */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#7a6555' }}>
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.34-4.34" />
          </svg>
        </div>
        <input
          type="search"
          id="chapter-search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder='Search chapters... e.g. "karma", "duty"'
          className="w-full rounded-xl border-2 pl-12 pr-4 py-4 text-base outline-none transition-all"
          style={{
            borderColor: query ? '#e85d04' : '#e8ddd0',
            background: '#ffffff',
            color: '#1a1008',
          }}
          aria-label="Search Chapters"
          autoComplete="off"
          autoFocus
        />
        {query && (
          <button
            className="absolute inset-y-0 right-4 flex items-center px-2"
            onClick={() => setQuery('')}
            aria-label="Clear search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#7a6555' }}>
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-12">
          <div className="font-devanagari text-4xl mb-3 animate-pulse" style={{ color: '#e85d04' }}>ॐ</div>
          <p style={{ color: '#7a6555' }}>Loading articles...</p>
        </div>
      )}

      {/* Results */}
      {!loading && results.length > 0 && (
        <div className="mt-6">
          <p className="text-sm mb-4" style={{ color: '#7a6555' }}>
            Found <strong>{results.length}</strong> results for &ldquo;<strong>{query}</strong>&rdquo;
          </p>
          <div className="space-y-3">
            {results.map((result) => (
              <Link
                key={result.number}
                href={`/chapter/${result.number}`}
                className="group block rounded-xl border-2 p-4 transition-all hover:shadow-md hover:border-orange-300"
                style={{ background: '#ffffff', borderColor: '#e8ddd0' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold" style={{ color: '#e85d04' }}>
                    Chapter {result.number}: {result.transliteratedTitle}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1" style={{ color: '#e85d04' }} aria-hidden="true">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#3d2b1f' }}>
                  {result.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* No results */}
      {!loading && query && results.length === 0 && (
        <div className="text-center py-12">
          <div className="font-devanagari text-4xl mb-3" style={{ color: '#e0d0bb' }}>🔍</div>
          <p className="font-semibold mb-1" style={{ color: '#1a1008' }}>No articles found</p>
          <p className="text-sm" style={{ color: '#7a6555' }}>
            Try different keywords.
          </p>
        </div>
      )}
    </div>
  );
}
