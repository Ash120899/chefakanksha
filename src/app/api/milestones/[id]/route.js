import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function PUT(request, { params }) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const { org, title, description, type } = await request.json();

    const db = await readDB();
    if (!db.milestones) db.milestones = [];

    const index = db.milestones.findIndex((m) => m.id === id);

    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Milestone not found' }, { status: 404 });
    }

    const updated = {
      ...db.milestones[index],
      org: org || db.milestones[index].org,
      title: title || db.milestones[index].title,
      description: description || db.milestones[index].description,
      type: type || db.milestones[index].type,
    };

    db.milestones[index] = updated;
    await writeDB(db);

    return NextResponse.json({ success: true, milestone: updated });
  } catch (error) {
    console.error('PUT milestone error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update milestone' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const db = await readDB();
    if (!db.milestones) db.milestones = [];

    const exists = db.milestones.some((m) => m.id === id);

    if (!exists) {
      return NextResponse.json({ success: false, error: 'Milestone not found' }, { status: 404 });
    }

    db.milestones = db.milestones.filter((m) => m.id !== id);
    await writeDB(db);

    return NextResponse.json({ success: true, message: 'Milestone deleted successfully' });
  } catch (error) {
    console.error('DELETE milestone error:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete milestone' }, { status: 500 });
  }
}
