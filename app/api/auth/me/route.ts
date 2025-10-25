import { authTokenKey } from '@/constants';
import { Teams } from '@/types';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const cookieStore = await cookies();
    const token = cookieStore.get(authTokenKey)?.value;

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
      avatar: 'https://avatar.iran.liara.run/public/27',
      team: Teams.STRATEGIC_SPARKS
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
