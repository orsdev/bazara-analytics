import { NextResponse } from 'next/server';
import { resolvedTicketsData } from '@/data/dashboard';

export async function GET() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({
      data: resolvedTicketsData,
      success: true
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as string) || 'Failed to get resolved tickets data' },
      { status: 500 }
    );
  }
}
