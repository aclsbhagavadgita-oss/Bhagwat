import type { Metadata } from 'next';
import Link from 'next/link';
import { BASE_URL } from '@/lib/seo';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { getPublishedBlogs } from '@/lib/blogs';
import JsonLd, { getBreadcrumbSchema } from '@/components/ui/JsonLd';

export const metadata: Metadata = {
  title: 'Blog — Evidence-Based Resuscitation & Wisdom | Gita Wisdom',
  description: 'Explore articles combining ACLS protocols, emergency medicine, and spiritual wisdom from the Bhagavad Gita.',
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
};

export default function BlogPage() {
  const blogs = getPublishedBlogs();

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: BASE_URL },
    { name: 'Blog', url: `${BASE_URL}/blog` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      
      <div className="mx-auto max-w-4xl px-4">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} />
      </div>

      <header className="py-12 px-4 text-center" style={{ background: 'linear-gradient(135deg, #1a0808 0%, #2d1010 100%)' }}>
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-white mb-3">
          Our Blog
        </h1>
        <p className="mx-auto max-w-xl text-base leading-relaxed" style={{ color: '#c4a882' }}>
          Insights on resuscitation, evidence-based medicine, and timeless spiritual wisdom.
        </p>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-12">
        {blogs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No blog posts published yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <Link 
                key={blog.id} 
                href={`/blog/${blog.slug}`}
                className="block group rounded-2xl border-2 p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white border-gray-200"
              >
                <div className="mb-3">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-gray-100 text-gray-600 mb-2">
                    {blog.category || 'Article'}
                  </span>
                  <h2 className="font-serif text-xl font-bold mb-2 group-hover:text-orange-600 transition-colors" style={{ color: '#1a1008' }}>
                    {blog.title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-3">
                    {blog.shortDescription}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(blog.date).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
