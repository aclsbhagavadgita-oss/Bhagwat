'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import ReactQuill to prevent SSR window errors
const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false, 
  loading: () => <p className="p-4 text-gray-500">Loading editor...</p> 
});
import 'react-quill-new/dist/quill.snow.css'; // Quill styling

function AdminEditorForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editNumber = searchParams.get('number');

  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    number: '',
    slug: '',
    sanskritTitle: '',
    transliteratedTitle: '',
    englishTitle: '',
    shortDescription: '',
    content: '',
    category: '',
    published: true,
  });

  useEffect(() => {
    if (editNumber) {
      setLoading(true);
      fetch('/api/chapters')
        .then(res => res.json())
        .then(data => {
          const ch = data.find((c: any) => c.number === Number(editNumber));
          if (ch) {
            setFormData({
              number: String(ch.number),
              slug: ch.slug || '',
              sanskritTitle: ch.sanskritTitle || '',
              transliteratedTitle: ch.transliteratedTitle || '',
              englishTitle: ch.englishTitle || '',
              shortDescription: ch.shortDescription || '',
              category: ch.category || '',
              content: ch.content || '',
              published: ch.published !== false,
            });
          }
          setLoading(false);
        });
    }
  }, [editNumber]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'transliteratedTitle') {
      setFormData(prev => ({ ...prev, transliteratedTitle: value, englishTitle: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleQuillChange = (value: string) => {
    setFormData(prev => ({ ...prev, content: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        number: Number(formData.number)
      };
      const res = await fetch('/api/chapters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        router.push('/admin');
      } else {
        alert('Failed to save');
      }
    } catch (e) {
      console.error(e);
      alert('Error saving chapter');
    }
    setLoading(false);
  };

  if (loading && editNumber && !formData.transliteratedTitle) {
    return <div className="p-8 text-center text-gray-500">Loading editor...</div>;
  }

  // Customize Quill Editor Toolbar
  const modules = {
    toolbar: [
      [{ 'header': [2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 fixed inset-0 z-50">
      {/* Blogger-like Top Bar */}
      <header className="flex-shrink-0 bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 z-10">
        <div className="flex items-center gap-4 flex-1">
          <Link href="/admin" className="text-gray-500 hover:text-gray-900 transition-colors" aria-label="Back to Dashboard">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
            </svg>
          </Link>
          <input 
            type="text" 
            name="transliteratedTitle"
            placeholder="Post Title"
            value={formData.transliteratedTitle}
            onChange={handleChange}
            className="text-xl sm:text-2xl font-bold border-transparent focus:border-transparent focus:ring-0 bg-transparent flex-1 outline-none text-gray-900 placeholder-gray-400"
            required
          />
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors hidden sm:block"
            title="Toggle Settings"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="15" y1="3" x2="15" y2="21"/>
            </svg>
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="inline-flex items-center justify-center px-6 py-2 border border-transparent font-medium rounded-full text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all shadow-sm disabled:opacity-70"
          >
            {loading ? 'Saving...' : formData.published ? 'Publish' : 'Save Draft'}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor (Left) */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white relative">
          <style dangerouslySetInnerHTML={{ __html: `
            .quill { display: flex; flex-direction: column; height: 100%; }
            .ql-toolbar.ql-snow { border: none !important; border-bottom: 1px solid #e5e7eb !important; padding: 12px 16px !important; }
            .ql-container.ql-snow { border: none !important; flex: 1; overflow-y: auto; font-size: 1.125rem; font-family: 'Inter', sans-serif; color: #374151; }
            .ql-editor { padding: 2rem 4rem !important; line-height: 1.8; }
            @media (max-width: 640px) { .ql-editor { padding: 1rem 1.5rem !important; } }
          `}} />
          {/* @ts-ignore */}
          <ReactQuill 
            theme="snow" 
            value={formData.content} 
            onChange={handleQuillChange}
            modules={modules}
            placeholder="Write your beautiful content here..."
          />
        </div>

        {/* Sidebar Settings (Right) */}
        <div className={`${sidebarOpen ? 'w-80' : 'w-0'} flex-shrink-0 transition-all duration-300 border-l border-gray-200 bg-gray-50 overflow-y-auto hidden sm:block`}>
          <div className="p-6 space-y-6">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Post Settings</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <div className="flex items-center">
                <input 
                  id="published" 
                  name="published" 
                  type="checkbox" 
                  checked={formData.published} 
                  onChange={handleChange}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
                  Published (Visible to public)
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-1">Chapter Number</label>
              <input 
                type="number" 
                name="number" 
                id="number" 
                value={formData.number} 
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm p-2 border" 
              />
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
              <input 
                type="text" 
                name="slug" 
                id="slug" 
                value={formData.slug} 
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm p-2 border" 
                placeholder="e.g. karma-yoga"
              />
            </div>

            <div className="pt-4 border-t border-gray-200">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input 
                type="text" 
                name="category" 
                id="category" 
                value={formData.category} 
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm p-2 border" 
                placeholder="e.g. Science & Spirituality"
              />
            </div>

            <div className="pt-4 border-t border-gray-200">
              <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-1">Search Description</label>
              <textarea 
                name="shortDescription" 
                id="shortDescription" 
                rows={4} 
                value={formData.shortDescription} 
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm p-2 border" 
                placeholder="Brief summary for search engines..."
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminEditor() {
  return (
    <Suspense fallback={<p>Loading editor...</p>}>
      <AdminEditorForm />
    </Suspense>
  );
}
