import { Suspense } from 'react';
import type { Metadata } from 'next';
import {
  DashboardHeader,
  MetricsCards,
  PendingRequestsTable,
  RequestTicketsTable,
  IncidentTicketsTable,
  ResponseTimeCards,
  PendingTicketCard,
  PendingApprovalCard,
  TeamTicketsBarChart,
  CategoryPieChart,
  ChangeRequestLineChart,
  ResolutionBarChart,
  ChangeRequestBarChart
} from '@/features/dashboard/components';
import { Skeleton } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Dashboard | Bazara Technologies',
  description:
    'Analytics dashboard for monitoring tickets, requests, and team performance. View real-time metrics, resolved tickets, pending approvals, and team performance data.'
};

export default function DashboardPage() {
  return (
    <div className="bg-background rounded-[0.5rem] py-7 px-3 sm:px-6 max-w-xl2 mx-auto">
      <DashboardHeader />
      <MetricsCards />
      <div className="grid lg:grid-cols-[1fr_27rem] gap-6">
        <div className="flex gap-6 flex-col">
          <Suspense fallback={<Skeleton className="h-64 w-full" />}>
            <TeamTicketsBarChart />
          </Suspense>
          <Suspense fallback={<Skeleton className="h-64 w-full" />}>
            <ResponseTimeCards />
          </Suspense>
        </div>
        <div className="flex flex-col gap-6">
          <Suspense fallback={<Skeleton className="h-48 w-full" />}>
            <PendingTicketCard />
          </Suspense>
          <Suspense fallback={<Skeleton className="h-48 w-full" />}>
            <PendingApprovalCard />
          </Suspense>
          <Suspense fallback={<Skeleton className="h-64 w-full" />}>
            <CategoryPieChart />
          </Suspense>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        <Suspense fallback={<Skeleton className="h-80 w-full" />}>
          <ChangeRequestLineChart />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-96 w-full" />}>
          <PendingRequestsTable />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-80 w-full" />}>
          <IncidentTicketsTable />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-80 w-full" />}>
          <ResolutionBarChart />
        </Suspense>
        <div className="grid md:grid-cols-2 gap-6">
          <Suspense fallback={<Skeleton className="h-80 w-full" />}>
            <ChangeRequestBarChart />
          </Suspense>
          <Suspense fallback={<Skeleton className="h-96 w-full" />}>
            <RequestTicketsTable />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
