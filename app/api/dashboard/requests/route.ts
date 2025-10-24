import { NextRequest, NextResponse } from 'next/server';
import { requestsData } from '@/data/dashboard';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  let data = requestsData;

  if (status) {
    data = data.filter((item) => item.status === status);
  }

  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json(data);
}
