import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getBlogBySlug, getAllBlogs } from '@/lib/blogs';
import { BASE_URL } from '@/lib/seo';
import Breadcrumb from '@/components/layout/Breadcrumb';
import JsonLd, { getBreadcrumbSchema } from '@/components/ui/JsonLd';

export async function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const blog = getBlogBySlug(params.slug);
  
  if (!blog) {
    return { title: 'Not Found' };
  }

  return {
    title: `${blog.title} | Gita Wisdom Blog`,
    description: blog.shortDescription,
    alternates: {
      canonical: `${BASE_URL}/blog/${blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.shortDescription,
      url: `${BASE_URL}/blog/${blog.slug}`,
      type: 'article',
      publishedTime: blog.date,
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const blog = getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: BASE_URL },
    { name: 'Blog', url: `${BASE_URL}/blog` },
    { name: blog.title, url: `${BASE_URL}/blog/${blog.slug}` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      
      <div className="mx-auto max-w-4xl px-4 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: blog.title }]} />
      </div>

      <article className="mx-auto max-w-3xl px-4 pb-20">
        <header className="mb-10 text-center">
          <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-orange-100 text-orange-800 mb-4">
            {blog.category || 'Article'}
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4" style={{ color: '#1a1008' }}>
            {blog.title}
          </h1>
          <p className="text-gray-500 mb-6">
            Published on {new Date(blog.date).toLocaleDateString()}
          </p>
          {blog.shortDescription && (
            <p className="text-lg text-gray-700 italic border-l-4 border-orange-300 pl-4 text-left mx-auto max-w-2xl">
              {blog.shortDescription}
            </p>
          )}
        </header>

        <div 
          className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-orange-600"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>
    </>
  );
}
