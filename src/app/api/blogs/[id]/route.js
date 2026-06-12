import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function PUT(request, { params }) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const { title, excerpt, content, image, category } = await request.json();

    const db = await readDB();
    const blogIndex = db.blogs.findIndex((b) => b.id === id);

    if (blogIndex === -1) {
      return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
    }

    // Update fields
    const updatedBlog = {
      ...db.blogs[blogIndex],
      title: title || db.blogs[blogIndex].title,
      excerpt: excerpt || db.blogs[blogIndex].excerpt,
      content: content || db.blogs[blogIndex].content,
      image: image || db.blogs[blogIndex].image,
      category: category || db.blogs[blogIndex].category,
    };

    db.blogs[blogIndex] = updatedBlog;
    await writeDB(db);

    return NextResponse.json({ success: true, blog: updatedBlog });
  } catch (error) {
    console.error('PUT blog error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update blog' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const db = await readDB();
    const blogExists = db.blogs.some((b) => b.id === id);

    if (!blogExists) {
      return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
    }

    db.blogs = db.blogs.filter((b) => b.id !== id);
    await writeDB(db);

    return NextResponse.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('DELETE blog error:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete blog' }, { status: 500 });
  }
}
