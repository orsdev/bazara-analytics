import { NextResponse } from 'next/server';
import { dashboardMetrics } from '@/data/dashboard';

export async function GET() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({
      data: dashboardMetrics,
      success: true
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as string) || 'Failed to get dashboard metrics' },
      { status: 500 }
    );
  }
}
