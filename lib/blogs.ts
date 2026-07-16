import blogsDataRaw from '@/data/blogs.json';

export interface BlogPost {
  id: string; // Unique identifier (e.g. timestamp or uuid)
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  content: string;
  published: boolean;
  date: string;
}

const blogsData = blogsDataRaw as BlogPost[];

export function getAllBlogs(): BlogPost[] {
  return blogsData;
}

export function getPublishedBlogs(): BlogPost[] {
  return blogsData.filter(blog => blog.published !== false);
}

export function getBlog(id: string): BlogPost | undefined {
  return blogsData.find(blog => blog.id === id);
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogsData.find(blog => blog.slug === slug);
}
