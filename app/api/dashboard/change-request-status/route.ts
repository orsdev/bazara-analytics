import { NextResponse } from 'next/server';
import { changeRequestStatusData } from '@/data/dashboard';

export async function GET() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({
      data: changeRequestStatusData,
      success: true
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: (error as string) || 'Failed to get change request status data'
      },
      { status: 500 }
    );
  }
}
