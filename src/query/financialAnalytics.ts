import {
  fetchOverallSummary,
  fetchSpendingByCategory,
  fetchTopSpendingByCategory,
  fetchTransactionsTrend,
} from '@/app/actions/financialAnalyticsActions';
import { queryOptions } from '@tanstack/react-query';

export const getSpendingsQuery = () =>
  queryOptions({
    queryKey: [],
    queryFn: async () => await fetchSpendingByCategory(),
    staleTime: 86400000,
    retry: 1,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

export const transactionsTrendQuery = () => ({
  queryKey: [],
  queryFn: async () => await fetchTransactionsTrend(),
  staleTime: 86400000,
  retry: 1,
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
});

export const overallSpendingQuery = () => ({
  queryKey: [],
  queryFn: async () => await fetchOverallSummary(),
  staleTime: 86400000,
  retry: 1,
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
});

export const getTopSpendingByCategory = () => ({
  queryKey: [],
  queryFn: async () => await fetchTopSpendingByCategory(),
  staleTime: 86400000,
  retry: 1,
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
});
