import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { DashboardHeader, MetricsCards } from '@/features/dashboard/components';
import { Skeleton } from '@/components/ui';

// Tables
const PendingRequestsTable = dynamic(
  () =>
    import('@/features/dashboard/components').then((mod) => ({
      default: mod.PendingRequestsTable
    })),
  { loading: () => <Skeleton className="h-96 w-full" /> }
);

const RequestTicketsTable = dynamic(
  () =>
    import('@/features/dashboard/components').then((mod) => ({
      default: mod.RequestTicketsTable
    })),
  { loading: () => <Skeleton className="h-96 w-full" /> }
);

const IncidentTicketsTable = dynamic(
  () =>
    import('@/features/dashboard/components').then((mod) => ({
      default: mod.IncidentTicketsTable
    })),
  { loading: () => <Skeleton className="h-80 w-full" /> }
);

// Cards
const ResponseTimeCards = dynamic(
  () =>
    import('@/features/dashboard/components').then((mod) => ({
      default: mod.ResponseTimeCards
    })),
  { loading: () => <Skeleton className="h-64 w-full" /> }
);

const PendingTicketCard = dynamic(
  () =>
    import('@/features/dashboard/components').then((mod) => ({
      default: mod.PendingTicketCard
    })),
  { loading: () => <Skeleton className="h-48 w-full" /> }
);

const PendingApprovalCard = dynamic(
  () =>
    import('@/features/dashboard/components').then((mod) => ({
      default: mod.PendingApprovalCard
    })),
  { loading: () => <Skeleton className="h-48 w-full" /> }
);

// Charts
const TeamTicketsBarChart = dynamic(
  () =>
    import('@/features/dashboard/components').then((mod) => ({
      default: mod.TeamTicketsBarChart
    })),
  { loading: () => <Skeleton className="h-64 w-full" /> }
);

const CategoryPieChart = dynamic(
  () =>
    import('@/features/dashboard/components').then((mod) => ({
      default: mod.CategoryPieChart
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

const ResolutionBarChart = dynamic(
  () =>
    import('@/features/dashboard/components').then((mod) => ({
      default: mod.ResolutionBarChart
    })),
  { loading: () => <Skeleton className="h-80 w-full" /> }
);

const ChangeRequestBarChart = dynamic(
  () =>
    import('@/features/dashboard/components').then((mod) => ({
      default: mod.ChangeRequestBarChart
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
      <MetricsCards />
      <div className="grid lg:grid-cols-[1fr_27rem] gap-6">
        <div className="flex gap-6 flex-col">
          <TeamTicketsBarChart />
          <ResponseTimeCards />
        </div>
        <div className="flex flex-col gap-6">
          <PendingTicketCard />
          <PendingApprovalCard />
          <CategoryPieChart />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        <ChangeRequestLineChart />
        <PendingRequestsTable />
        <IncidentTicketsTable />
        <ResolutionBarChart />
        <div className="grid md:grid-cols-2 gap-6">
          <ChangeRequestBarChart />
          <RequestTicketsTable />
        </div>
      </div>
    </div>
  );
}
