import { transactionsTrendQuery } from '@/query/financialAnalytics';
import { useQuery } from '@tanstack/react-query';

export function useSpendingTrendQuery() {
  const spendingTrend = transactionsTrendQuery();
  return useQuery(spendingTrend);
}
