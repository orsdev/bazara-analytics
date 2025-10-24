import { NextResponse } from 'next/server';
import { responseTimeData } from '@/data/dashboard';

export async function GET() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({
      data: responseTimeData,
      success: true
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as string) || 'Failed to get response time data' },
      { status: 500 }
    );
  }
}
