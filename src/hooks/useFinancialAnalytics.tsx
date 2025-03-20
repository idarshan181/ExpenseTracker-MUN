import { getSpendingsQuery } from '@/query/financialAnalytics';
import { useQuery } from '@tanstack/react-query';

export function useSpendingByCategoriesQuery() {
  const categoriesSpendingQuery = getSpendingsQuery();
  return useQuery(categoriesSpendingQuery);
}
