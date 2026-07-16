'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Chapter } from '@/lib/chapters';
import { BlogPost } from '@/lib/blogs';

export default function AdminDashboard() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'chapters' | 'blogs'>('chapters');

  useEffect(() => {
    Promise.all([fetchChapters(), fetchBlogs()]).then(() => setLoading(false));
  }, []);

  async function fetchChapters() {
    try {
      const res = await fetch('/api/chapters');
      if (res.ok) {
        const data = await res.json();
        data.sort((a: Chapter, b: Chapter) => a.number - b.number);
        setChapters(data);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function fetchBlogs() {
    try {
      const res = await fetch('/api/blogs');
      if (res.ok) {
        const data = await res.json();
        // Sort by date descending
        data.sort((a: BlogPost, b: BlogPost) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setBlogs(data);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function deleteChapter(number: number) {
    if (!confirm(`Are you sure you want to delete Chapter ${number}?`)) return;
    try {
      const res = await fetch(`/api/chapters?number=${number}`, { method: 'DELETE' });
      if (res.ok) {
        setChapters(chapters.filter(ch => ch.number !== number));
      } else {
        alert('Failed to delete chapter');
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function deleteBlog(id: string) {
    if (!confirm(`Are you sure you want to delete this blog post?`)) return;
    try {
      const res = await fetch(`/api/blogs?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setBlogs(blogs.filter(b => b.id !== id));
      } else {
        alert('Failed to delete blog post');
      }
    } catch (e) {
      console.error(e);
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        {activeTab === 'chapters' ? (
          <Link
            href="/admin/editor"
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md font-medium"
          >
            Create New Chapter
          </Link>
        ) : (
          <Link
            href="/admin/blog-editor"
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md font-medium"
          >
            Create New Blog Post
          </Link>
        )}
      </div>

      <div className="mb-6 flex gap-4 border-b border-gray-200">
        <button 
          onClick={() => setActiveTab('chapters')} 
          className={`pb-2 px-1 font-medium text-sm ${activeTab === 'chapters' ? 'border-b-2 border-orange-600 text-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Chapters
        </button>
        <button 
          onClick={() => setActiveTab('blogs')} 
          className={`pb-2 px-1 font-medium text-sm ${activeTab === 'blogs' ? 'border-b-2 border-orange-600 text-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Blog Posts
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {activeTab === 'chapters' && chapters.map(chapter => (
            <li key={chapter.number}>
              <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-orange-600 truncate">
                      Chapter {chapter.number}: {chapter.transliteratedTitle}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${chapter.published !== false ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {chapter.published !== false ? 'Published' : 'Draft'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        {chapter.englishTitle}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="ml-5 flex-shrink-0 flex items-center gap-3">
                  <Link
                    href={`/admin/editor?number=${chapter.number}`}
                    className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteChapter(chapter.number)}
                    className="text-red-600 hover:text-red-900 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
          {activeTab === 'chapters' && chapters.length === 0 && (
            <li className="px-4 py-8 text-center text-gray-500">
              No chapters found. Create one to get started!
            </li>
          )}

          {activeTab === 'blogs' && blogs.map(blog => (
            <li key={blog.id}>
              <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-orange-600 truncate">
                      {blog.title}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${blog.published !== false ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {blog.published !== false ? 'Published' : 'Draft'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex flex-col">
                      <p className="flex items-center text-sm text-gray-500">
                        /{blog.slug} | {blog.category}
                      </p>
                      <p className="flex items-center text-xs text-gray-400 mt-1">
                        {new Date(blog.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="ml-5 flex-shrink-0 flex items-center gap-3">
                  <Link
                    href={`/admin/blog-editor?id=${blog.id}`}
                    className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteBlog(blog.id)}
                    className="text-red-600 hover:text-red-900 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
          {activeTab === 'blogs' && blogs.length === 0 && (
            <li className="px-4 py-8 text-center text-gray-500">
              No blog posts found. Create one to get started!
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
