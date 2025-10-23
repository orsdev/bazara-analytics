import { NextRequest, NextResponse } from 'next/server';
import { getCookie } from 'cookies-next';
import { authTokenKey } from '@/constants';

export async function GET(request: NextRequest) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const authHeader = request.headers.get('authorization');
    let token = authHeader?.replace('Bearer ', '');

    if (!token) {
      token = getCookie(authTokenKey, { req: request }) as string;
    }

    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { error: 'No authentication token found' },
        { status: 401 }
      );
    }

    if (!token.startsWith('mock-token-')) {
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
