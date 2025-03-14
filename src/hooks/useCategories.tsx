'use client';

import { getCategoryQueryOptions } from '@/query/categories';
import { useQuery } from '@tanstack/react-query';

export function useCategories() {
  const categoryQuery = getCategoryQueryOptions();

  return useQuery(categoryQuery);
}
