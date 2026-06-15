import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const { image } = await request.json();
    if (!image) {
      return NextResponse.json({ success: false, error: 'No image provided' }, { status: 400 });
    }

    // Extract base64 data
    const base64Data = image.replace(/^data:image\/png;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');

    const filePath = path.join(process.cwd(), 'public/images/logos.png');
    fs.writeFileSync(filePath, buffer);

    console.log('Successfully saved updated logo to:', filePath);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving logo:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
