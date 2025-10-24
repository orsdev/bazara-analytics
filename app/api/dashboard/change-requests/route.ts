import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { parseISO, isValid } from 'date-fns';
import { changeRequestData } from '@/data/dashboard';

export async function GET(request: NextRequest) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    let filteredData = changeRequestData;

    if (startDate && endDate) {
      const start = parseISO(startDate);
      const end = parseISO(endDate);

      if (isValid(start) && isValid(end)) {
        filteredData = changeRequestData.filter((item) => {
          const itemDate = parseISO(item.date);
          return itemDate >= start && itemDate <= end;
        });
      }
    }

    return NextResponse.json({
      data: filteredData,
      success: true
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as string) || 'Failed to get change request data' },
      { status: 500 }
    );
  }
}
