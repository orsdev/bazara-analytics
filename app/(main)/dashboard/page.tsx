import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { DashboardHeader, MetricsGrid } from '@/features/dashboard/components';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui';

// Lazy load components with dynamic imports (SSR enabled for Server Components)
const ResolvedTickets = dynamic(
  () =>
    import('@/features/dashboard/components').then((mod) => ({
      default: mod.ResolvedTickets
    })),
  { loading: () => <Skeleton className="h-64 w-full" /> }
);

const ResponseTime = dynamic(
  () =>
    import('@/features/dashboard/components').then((mod) => ({
      default: mod.ResponseTime
    })),
  { loading: () => <Skeleton className="h-64 w-full" /> }
);

const PendingTicket = dynamic(
  () =>
    import('@/features/dashboard/components').then((mod) => ({
      default: mod.PendingTicket
    })),
  { loading: () => <Skeleton className="h-48 w-full" /> }
);

const PendingApproval = dynamic(
  () =>
    import('@/features/dashboard/components').then((mod) => ({
      default: mod.PendingApproval
    })),
  { loading: () => <Skeleton className="h-48 w-full" /> }
);

const CategoryChart = dynamic(
  () =>
    import('@/features/dashboard/components').then((mod) => ({
      default: mod.CategoryChart
    })),
  { loading: () => <Skeleton className="h-64 w-full" /> }
);

const ChangeRequestLineChart = dynamic(
  () =>
    import('@/features/dashboard/components').then((mod) => ({
      default: mod.ChangeRequestLineChart
    })),
  { loading: () => <Skeleton className="h-80 w-full" /> }
);

const AwaitingApprovalTable = dynamic(
  () =>
    import('@/features/dashboard/components').then((mod) => ({
      default: mod.AwaitingApprovalTable
    })),
  { loading: () => <Skeleton className="h-96 w-full" /> }
);

const TicketsTable = dynamic(
  () =>
    import('@/features/dashboard/components').then((mod) => ({
      default: mod.TicketsTable
    })),
  { loading: () => <Skeleton className="h-96 w-full" /> }
);

const TicketResolutionBarChart = dynamic(
  () =>
    import('@/features/dashboard/components').then((mod) => ({
      default: mod.TicketResolutionBarChart
    })),
  { loading: () => <Skeleton className="h-80 w-full" /> }
);

const ChangeRequestBarChart = dynamic(
  () =>
    import('@/features/dashboard/components/change-request-bar-chart').then(
      (mod) => ({ default: mod.ChangeRequestBarChart })
    ),
  { loading: () => <Skeleton className="h-80 w-full" /> }
);

const TeamTicketsTable = dynamic(
  () =>
    import('@/features/dashboard/components').then((mod) => ({
      default: mod.TeamTicketsTable
    })),
  { loading: () => <Skeleton className="h-80 w-full" /> }
);

export const metadata: Metadata = {
  title: 'Dashboard',
  description:
    'Analytics dashboard for monitoring tickets, requests, and team performance. View real-time metrics, resolved tickets, pending approvals, and team performance data.',
  keywords: [
    'dashboard',
    'analytics',
    'tickets',
    'metrics',
    'team performance',
    'data visualization'
  ],
  openGraph: {
    title: 'Dashboard | Bazara Technologies',
    description:
      'Analytics dashboard for monitoring tickets and team performance'
  }
};

export default function DashboardPage() {
  return (
    <div className="bg-background rounded-[0.5rem] py-7 px-3 sm:px-6 max-w-xl2 mx-auto">
      <DashboardHeader />
      <MetricsGrid />
      <div className="grid lg:grid-cols-[1fr_27rem] gap-6">
        <div className="flex gap-6 flex-col">
          <Suspense fallback={<Skeleton className="h-64 w-full" />}>
            <ResolvedTickets />
          </Suspense>
          <Suspense fallback={<Skeleton className="h-64 w-full" />}>
            <ResponseTime />
          </Suspense>
        </div>
        <div className="flex flex-col gap-6">
          <Suspense fallback={<Skeleton className="h-48 w-full" />}>
            <PendingTicket />
          </Suspense>
          <Suspense fallback={<Skeleton className="h-48 w-full" />}>
            <PendingApproval />
          </Suspense>
          <Suspense fallback={<Skeleton className="h-64 w-full" />}>
            <CategoryChart />
          </Suspense>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        <Suspense fallback={<Skeleton className="h-80 w-full" />}>
          <ChangeRequestLineChart />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-96 w-full" />}>
          <AwaitingApprovalTable />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-96 w-full" />}>
          <TicketsTable />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-80 w-full" />}>
          <TicketResolutionBarChart />
        </Suspense>
        <div className="grid md:grid-cols-2 gap-6">
          <Suspense fallback={<Skeleton className="h-80 w-full" />}>
            <ChangeRequestBarChart />
          </Suspense>
          <Suspense fallback={<Skeleton className="h-80 w-full" />}>
            <TeamTicketsTable />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
