import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function PUT(request, { params }) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const { rating, text, avatar, author, role } = await request.json();

    const db = await readDB();
    if (!db.testimonials) db.testimonials = [];

    const index = db.testimonials.findIndex((t) => t.id === id);

    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Testimonial not found' }, { status: 404 });
    }

    const updated = {
      ...db.testimonials[index],
      rating: rating !== undefined ? Number(rating) : db.testimonials[index].rating,
      text: text || db.testimonials[index].text,
      avatar: avatar !== undefined ? avatar : db.testimonials[index].avatar,
      author: author || db.testimonials[index].author,
      role: role !== undefined ? role : db.testimonials[index].role,
    };

    db.testimonials[index] = updated;
    await writeDB(db);

    return NextResponse.json({ success: true, testimonial: updated });
  } catch (error) {
    console.error('PUT testimonial error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update testimonial' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const db = await readDB();
    if (!db.testimonials) db.testimonials = [];

    const exists = db.testimonials.some((t) => t.id === id);

    if (!exists) {
      return NextResponse.json({ success: false, error: 'Testimonial not found' }, { status: 404 });
    }

    db.testimonials = db.testimonials.filter((t) => t.id !== id);
    await writeDB(db);

    return NextResponse.json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('DELETE testimonial error:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete testimonial' }, { status: 500 });
  }
}
