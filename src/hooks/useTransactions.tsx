'use client';

import { getTransactionsQuery } from '@/query/transactions';
import { useQuery } from '@tanstack/react-query';

export function useTransactions(limit?: number) {
  const transactionQuery = getTransactionsQuery(limit);
  return useQuery(transactionQuery);
}
