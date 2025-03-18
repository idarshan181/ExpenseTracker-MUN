import {
  fetchOverallSummary,
  fetchSpendingByCategory,
  fetchTopSpendingByCategory,
  fetchTransactionsTrend,
} from '@/app/actions/financialAnalyticsActions';
import { queryOptions } from '@tanstack/react-query';

export const getSpendingsQuery = () =>
  queryOptions({
    queryKey: ['categories'],
    queryFn: async () => await fetchSpendingByCategory(),
    staleTime: 86400000,
    retry: 1,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

export const transactionsTrendQuery = () => ({
  queryKey: ['categories'],
  queryFn: async () => await fetchTransactionsTrend(),
  staleTime: 86400000,
  retry: 1,
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
});

export const overallSpendingQuery = () => ({
  queryKey: ['categories'],
  queryFn: async () => await fetchOverallSummary(),
  staleTime: 86400000,
  retry: 1,
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
});

export const getTopSpendingByCategory = () => ({
  queryKey: ['categories'],
  queryFn: async () => await fetchTopSpendingByCategory(),
  staleTime: 86400000,
  retry: 1,
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
});
