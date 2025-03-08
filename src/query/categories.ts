import { fetchCategoriesById } from '@/app/actions';
import { queryOptions } from '@tanstack/react-query';

const fetchCategories = async () => {
  const response = await fetchCategoriesById();
  return response;
};

export const categoryOptions = queryOptions({
  queryKey: ['categories'],
  queryFn: fetchCategories,
  retry: 1,
});
