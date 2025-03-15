import { fetchBudgets } from '@/app/actions/budgetActions';
import { queryOptions } from '@tanstack/react-query';

export const getBudgetsQuery = () => queryOptions({
  queryKey: ['budgets'],
  queryFn: async () => await fetchBudgets(),
  staleTime: 86400000,
  retry: 1,
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
});
