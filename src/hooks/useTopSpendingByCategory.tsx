import { getTopSpendingByCategory } from '@/query/financialAnalytics';
import { useQuery } from '@tanstack/react-query';

export function useTopSpendingByCategory() {
  const topSpendingByCategoryQuery = getTopSpendingByCategory();
  return useQuery(topSpendingByCategoryQuery);
}
