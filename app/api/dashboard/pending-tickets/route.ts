import { NextResponse } from 'next/server';
import { pendingTicketsData } from '@/data/dashboard';

export async function GET() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({
      data: pendingTicketsData,
      success: true
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as string) || 'Failed to get pending tickets data' },
      { status: 500 }
    );
  }
}
