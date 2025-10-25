import { NextRequest, NextResponse } from 'next/server';
import { requestsData } from '@/data/dashboard';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const team = searchParams.get('team');
  const search = searchParams.get('search');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  let data = requestsData;

  if (status) {
    data = data.filter((item) => item.status === status);
  }

  if (team) {
    data = data.filter((item) => item.team === team);
  }

  if (search) {
    const searchLower = search.toLowerCase();
    data = data.filter((item) =>
      item.title.toLowerCase().includes(searchLower)
    );
  }

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    data = data.filter((item) => {
      const itemDate = new Date(item.createdAt);
      return itemDate >= start && itemDate <= end;
    });
  }

  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json(data);
}
