import {
  fetchIncomeExpenseTrend,
  fetchMonthlySummary,
  fetchOverallSummary,
  fetchSpendingByCategory,
  fetchTopSpendingByCategory,
} from '@/app/actions/financialAnalyticsActions';
import { queryOptions } from '@tanstack/react-query';

export const getSpendingsQuery = () =>
  queryOptions({
    queryKey: ['spendingByCategory'],
    queryFn: fetchSpendingByCategory,
    staleTime: 86400000,
    retry: 1,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

export const monthlySummaryQuery = (month?: string) => ({
  queryKey: ['transactionsTrend', month],
  queryFn: async () => await fetchMonthlySummary(month),
  staleTime: 86400000,
  retry: 1,
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
});

export const overallSummaryQuery = () => ({
  queryKey: ['overallSummary'],
  queryFn: fetchOverallSummary,
  staleTime: 86400000,
  retry: 1,
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
});

export const getTopSpendingByCategoryQuery = () => ({
  queryKey: ['topSpendingByCategory'],
  queryFn: fetchTopSpendingByCategory,
  staleTime: 86400000,
  retry: 1,
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
});

export const getIncomeExpenseTrendQuery = () => ({
  queryKey: ['incomeExpenseTrend'],
  queryFn: fetchIncomeExpenseTrend,
  staleTime: 86400000,
  retry: 1,
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
});
