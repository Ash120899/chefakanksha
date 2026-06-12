import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

// Helper to make a slug from a title
function makeSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function GET() {
  try {
    const db = await readDB();
    return NextResponse.json({ success: true, blogs: db.blogs || [] });
  } catch (error) {
    console.error('GET blogs error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { title, excerpt, content, image, category } = await request.json();

    if (!title || !content) {
      return NextResponse.json({ success: false, error: 'Title and content are required' }, { status: 400 });
    }

    const db = await readDB();
    
    // Auto-generate ID and unique slug
    const id = Date.now().toString();
    let baseSlug = makeSlug(title) || 'blog-post';
    let slug = baseSlug;
    let counter = 1;

    while (db.blogs.some((b) => b.slug === slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const newBlog = {
      id,
      slug,
      title,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      excerpt: excerpt || content.substring(0, 150) + '...',
      content,
      image: image || '/images/sec-image.png',
      category: category || 'General',
    };

    db.blogs.unshift(newBlog); // Prepend to show latest first
    await writeDB(db);

    return NextResponse.json({ success: true, blog: newBlog });
  } catch (error) {
    console.error('POST blog error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create blog' }, { status: 500 });
  }
}
