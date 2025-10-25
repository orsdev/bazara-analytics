import {
  DashboardHeader,
  MetricsGrid,
  ResolvedTickets,
  PendingTicket,
  PendingApproval,
  ResultCategory,
  ChangeRequest,
  AwaitingApprovalTable,
  TicketsTable
} from '@/features/dashboard/components';
import { ResponseTime } from '@/features/dashboard/components';

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
          <ResultCategory />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        <ChangeRequest />
        <AwaitingApprovalTable />
        <TicketsTable />
      </div>
    </div>
  );
}
