'use client';

import { getTransactions } from '@/app/actions/transactionActions';
import { useQuery } from '@tanstack/react-query';

export function useTransactions(limit?: number) {
  return useQuery({
    queryKey: limit !== undefined ? ['transactions', limit] : ['transactions'],
    queryFn: async () => await getTransactions(limit),
    staleTime: 5000, // Re-fetch every 5 seconds
  });
}
