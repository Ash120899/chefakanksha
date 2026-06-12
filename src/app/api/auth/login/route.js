import { NextResponse } from 'next/server';
import { signToken } from '@/lib/auth';
import { serialize } from 'cookie';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const envUser = process.env.ADMIN_USERNAME || 'admin';
    const envPass = process.env.ADMIN_PASSWORD || 'admin123';

    if (username === envUser && password === envPass) {
      const token = signToken({ role: 'admin', user: username });

      // Serialize session cookie
      const cookie = serialize('admin_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });

      const response = NextResponse.json({ success: true, message: 'Logged in successfully' });
      response.headers.append('Set-Cookie', cookie);
      return response;
    }

    return NextResponse.json(
      { success: false, error: 'Invalid username or password' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
