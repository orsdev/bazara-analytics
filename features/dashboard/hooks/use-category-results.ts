'use client';

import { useCustomQuery } from '@/hooks';
import { dashboardService } from '../services/dashboard-service';
import { CategoryResults } from '../types';

export const useCategoryResults = () => {
  const {
    data: responseData,
    isLoading,
    error
  } = useCustomQuery<{ data: CategoryResults }>({
    queryKey: dashboardService.keys.categoryResults,
    url: dashboardService.getCategoryResults().url
  });

  const response = responseData?.data ?? {
    currency: 'NGN',
    categories: []
  };

  const { currency, categories } = response;

  return {
    currency,
    categories,
    isLoading,
    error
  };
};
