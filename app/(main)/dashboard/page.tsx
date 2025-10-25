import {
  DashboardHeader,
  MetricsGrid,
  ResolvedTickets,
  PendingTicket,
  PendingApproval,
  CategoryChart,
  ChangeRequestLineChart,
  AwaitingApprovalTable,
  TicketsTable,
  TicketResolutionBarChart,
  TeamTicketsTable
} from '@/features/dashboard/components';
import { ResponseTime } from '@/features/dashboard/components';
import { ChangeRequestBarChart } from '@/features/dashboard/components/change-request-bar-chart';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Bazara Technologies',
  description:
    "Empowering Digital Transformation through Advanced Platforms, AI, and Hybrid Cloud and transform your business with Bazara's cutting-edge solutions"
};

export default function DashboardPage() {
  return (
    <div className="bg-background rounded-[0.5rem] py-7 px-3 sm:px-6 max-w-xl2 mx-auto">
      <DashboardHeader />
      <MetricsGrid />
      <div className="grid lg:grid-cols-[1fr_27rem] gap-6">
        <div className="flex gap-6 flex-col">
          <ResolvedTickets />
          <ResponseTime />
        </div>
        <div className="flex flex-col gap-6">
          <PendingTicket />
          <PendingApproval />
          <CategoryChart />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        <ChangeRequestLineChart />
        <AwaitingApprovalTable />
        <TicketsTable />
        <TicketResolutionBarChart />
        <div className="grid md:grid-cols-2 gap-6">
          <ChangeRequestBarChart />
          <TeamTicketsTable />
        </div>
      </div>
    </div>
  );
}
