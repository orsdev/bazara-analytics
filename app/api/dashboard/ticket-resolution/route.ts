import { NextResponse } from 'next/server';
import { ticketResolutionData } from '@/data/dashboard';

export async function GET() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({
      data: ticketResolutionData,
      success: true
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as string) || 'Failed to get ticket resolution data' },
      { status: 500 }
    );
  }
}
