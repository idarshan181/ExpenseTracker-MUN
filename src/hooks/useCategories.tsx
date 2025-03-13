'use client';

import { fetchCategoriesById } from '@/app/actions/categoryActions';
import { useQuery } from '@tanstack/react-query';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategoriesById,
    staleTime: 5000, // Re-fetch every 5 seconds
    retry: 1,

  });
}
