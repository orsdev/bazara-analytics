import { NextResponse } from 'next/server';
import { pendingApprovalsData } from '@/data/dashboard';

export async function GET() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({
      data: pendingApprovalsData,
      success: true
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as string) || 'Failed to get pending approvals data' },
      { status: 500 }
    );
  }
}
