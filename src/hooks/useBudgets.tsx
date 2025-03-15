'use client';

import { getBudgetsQuery } from '@/query/budgets';
import { useQuery } from '@tanstack/react-query';

export function useBudgets() {
  const budgetsQuery = getBudgetsQuery();
  return useQuery(budgetsQuery);
}
