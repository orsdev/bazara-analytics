import { NextRequest, NextResponse } from 'next/server';
import { getCookie } from 'cookies-next';
import { authTokenKey } from '@/constants';

export async function GET(request: NextRequest) {
  try {
    const token = getCookie(authTokenKey, { req: request });

    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { error: 'No authentication token found' },
        { status: 401 }
      );
    }

    if (!token.startsWith('mock-jwt-token-')) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const user = {
      id: 'user-1',
      email: 'admin@example.com',
      name: 'Daniel John',
      avatar: 'https://avatar.iran.liara.run/public/27'
    };

    return NextResponse.json({
      data: user,
      success: true
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as string) || 'Failed to get user details' },
      { status: 500 }
    );
  }
}
