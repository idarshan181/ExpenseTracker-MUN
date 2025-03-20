import { overallSpendingQuery } from '@/query/financialAnalytics';
import { useQuery } from '@tanstack/react-query';

export function useOverallSpending() {
  const overallSpending = overallSpendingQuery();
  return useQuery(overallSpending);
}
