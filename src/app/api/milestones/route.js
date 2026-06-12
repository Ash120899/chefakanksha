import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    const db = await readDB();
    return NextResponse.json({ success: true, milestones: db.milestones || [] });
  } catch (error) {
    console.error('GET milestones error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch milestones' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { org, title, description, type } = await request.json();

    if (!org || !title || !description || !type) {
      return NextResponse.json({ success: false, error: 'All fields (org, title, description, type) are required' }, { status: 400 });
    }

    const db = await readDB();
    const id = Date.now().toString();

    const newMilestone = {
      id,
      org,
      title,
      description,
      type, // training, event, venture
    };

    if (!db.milestones) db.milestones = [];
    db.milestones.push(newMilestone); // append to the end of timeline
    await writeDB(db);

    return NextResponse.json({ success: true, milestone: newMilestone });
  } catch (error) {
    console.error('POST milestone error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create milestone' }, { status: 500 });
  }
}
