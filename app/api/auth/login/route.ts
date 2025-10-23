import { NextRequest, NextResponse } from 'next/server';
import { setCookie } from 'cookies-next';
import { authTokenKey, cookieOptions } from '@/constants';
import { isDev } from '@/utils';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (email !== 'admin@example.com' || password !== 'Password1!') {
      throw new Error('Invalid credentials');
    }

    const mockToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.mock_signature';

    const nextResponse = NextResponse.json({
      data: {
        token: mockToken
      },
      success: true
    });

    const options = isDev() ? cookieOptions.dev() : cookieOptions.prod();
    setCookie(authTokenKey, mockToken, {
      res: nextResponse,
      httpOnly: true,
      path: '/',
      ...options
    });

    return nextResponse;
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Login failed' },
      { status: 401 }
    );
  }
}
