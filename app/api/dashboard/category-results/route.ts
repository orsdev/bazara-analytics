import { NextResponse } from 'next/server';
import { categoryResults } from '@/data/dashboard';

export async function GET() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({
      data: categoryResults,
      success: true
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as string) || 'Failed to get category results data' },
      { status: 500 }
    );
  }
}
