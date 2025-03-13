import { fetchCategoriesById } from '@/app/actions/categoryActions';
import { queryOptions } from '@tanstack/react-query';

export const getCategoryQueryOptions = () => queryOptions({
  queryKey: ['categories'],
  queryFn: async () => await fetchCategoriesById(),
  staleTime: 86400000,
  retry: 1,
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
});
