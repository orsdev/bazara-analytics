export interface DashboardMetricRaw {
  id: string;
  currentValue: number;
  previousValue: number;
  comparisonRange: string;
  chartData: number[];
}

export interface DashboardMetric {
  [key: string]: DashboardMetricRaw;
}

export interface TransformedMetric {
  id: string;
  title: string;
  value: number;
  change: {
    value: string;
    label: string;
    isPositive: boolean;
  };
  chartData: number[];
}
export interface ResolvedTicketAgent {
  id: string;
  name: string;
  ticketsResolved: number;
}

export interface PendingTicket {
  id: string;
  count: number;
}

export interface PendingApproval {
  id: string;
  count: number;
}

export interface Category {
  id: string;
  name: string;
  value: number;
}

export interface CategoryResults {
  currency: string;
  categories: Category[];
}
