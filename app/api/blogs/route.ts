import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { BlogPost } from '@/lib/blogs';

const DATA_FILE = path.join(process.cwd(), 'data', 'blogs.json');

// Get all blogs
export async function GET() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    const blogs = JSON.parse(data) as BlogPost[];
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Failed to read blogs:", error);
    return NextResponse.json({ error: 'Failed to read blogs' }, { status: 500 });
  }
}

// Create or update a blog
export async function POST(request: Request) {
  try {
    const newBlog = await request.json() as BlogPost;
    if (!newBlog.title) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!newBlog.id) {
      newBlog.id = Date.now().toString(); // assign an ID if missing
      newBlog.date = new Date().toISOString();
    }

    const data = fs.readFileSync(DATA_FILE, 'utf8');
    const blogs = JSON.parse(data) as BlogPost[];
    
    const index = blogs.findIndex(b => b.id === newBlog.id);
    if (index >= 0) {
      // Update existing
      blogs[index] = { ...blogs[index], ...newBlog };
    } else {
      // Create new
      blogs.push(newBlog);
    }

    // Save back to file
    fs.writeFileSync(DATA_FILE, JSON.stringify(blogs, null, 2));

    return NextResponse.json({ success: true, blog: newBlog });
  } catch (error) {
    console.error("Failed to save blog:", error);
    return NextResponse.json({ error: 'Failed to save blog' }, { status: 500 });
  }
}

// Delete a blog
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Missing blog id' }, { status: 400 });
    }

    const data = fs.readFileSync(DATA_FILE, 'utf8');
    let blogs = JSON.parse(data) as BlogPost[];
    
    blogs = blogs.filter(b => b.id !== id);
    
    fs.writeFileSync(DATA_FILE, JSON.stringify(blogs, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
