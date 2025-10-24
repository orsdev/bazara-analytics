import { NextResponse } from 'next/server';
import { authTokenKey } from '@/constants/auth';

export async function POST() {
  try {
    const nextResponse = NextResponse.json({ success: true });
    nextResponse.cookies.set(authTokenKey, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/'
    });

    return nextResponse;
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Logout failed' },
      { status: 500 }
    );
  }
}
