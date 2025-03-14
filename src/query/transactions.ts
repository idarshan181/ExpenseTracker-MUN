import { getTransactions } from '@/app/actions/transactionActions';
import { queryOptions } from '@tanstack/react-query';

export const getTransactionsQuery = (limit?: number) => queryOptions({
  queryKey: limit !== undefined ? ['transactions', limit] : ['transactions'],
  queryFn: async () => await getTransactions(limit),
  staleTime: 5 * 60 * 1000,
});
