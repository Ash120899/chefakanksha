import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    const db = await readDB();
    return NextResponse.json({ success: true, testimonials: db.testimonials || [] });
  } catch (error) {
    console.error('GET testimonials error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { rating, text, avatar, author, role } = await request.json();

    if (!rating || !text || !author) {
      return NextResponse.json({ success: false, error: 'Rating, text and author are required' }, { status: 400 });
    }

    const db = await readDB();
    const id = Date.now().toString();

    const newTestimonial = {
      id,
      rating: Number(rating) || 5,
      text,
      avatar: avatar || '🌿',
      author,
      role: role || '',
    };

    if (!db.testimonials) db.testimonials = [];
    db.testimonials.unshift(newTestimonial);
    await writeDB(db);

    return NextResponse.json({ success: true, testimonial: newTestimonial });
  } catch (error) {
    console.error('POST testimonial error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create testimonial' }, { status: 500 });
  }
}
