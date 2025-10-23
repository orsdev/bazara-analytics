import { NextResponse } from 'next/server';
import { deleteCookie } from 'cookies-next';
import { authTokenKey } from '@/constants';

export async function POST() {
  try {
    const nextResponse = NextResponse.json({ success: true });

    deleteCookie(authTokenKey, {
      res: nextResponse,
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
