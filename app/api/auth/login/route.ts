import { NextRequest, NextResponse } from 'next/server';
import { authTokenKey } from '@/constants/auth';

export const mockToken =
  'mock-token-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.mock_signature';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (email !== 'admin@example.com' || password !== 'Password1!') {
      throw new Error('Invalid credentials');
    }

    const nextResponse = NextResponse.json({
      data: {
        token: mockToken
      },
      success: true
    });

    nextResponse.cookies.set(authTokenKey, mockToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/'
    });

    return nextResponse;
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Login failed' },
      { status: 401 }
    );
  }
}
