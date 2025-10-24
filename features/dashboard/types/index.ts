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
  [key: string]: string | number;
}

export interface CategoryResults {
  currency: string;
  categories: Category[];
}

export interface ResponseTime {
  id: string;
  currentValue: string;
  previousValue: string;
  comparisonRange: string;
  chartData: { value: number }[];
}

export interface ResponseTimeData {
  [key: string]: ResponseTime;
}

export interface TransformedResponseTime {
  id: string;
  title: string;
  value: string;
  unit: string;
  change: {
    value: string;
    label: string;
    isPositive: boolean;
  };
  chartData: { value: number }[];
}

export interface ChangeRequestItem {
  date: string;
  emergency: number;
  normal: number;
  standard: number;
}

export type ChangeRequestData = ChangeRequestItem[];
