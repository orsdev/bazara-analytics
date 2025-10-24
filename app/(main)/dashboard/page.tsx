import { DashboardHeader, MetricsGrid } from '@/features/dashboard/components';

export default function DashboardPage() {
  return (
    <div className="bg-background rounded-[0.5rem] py-7 px-6 max-w-xl2 mx-auto">
      <DashboardHeader />
      <MetricsGrid />
    </div>
  );
}
