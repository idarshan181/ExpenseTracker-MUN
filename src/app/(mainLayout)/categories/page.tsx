import { getQueryClient } from '@/app/utils/getQueryClient';
import { requireUser } from '@/app/utils/requireUser';
import CategoriesClient from '@/components/Categories/CategoriesClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Manage your categories',
};

export default async function CategoriesPage() {
  await requireUser();

  const queryClient = getQueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoriesClient />
    </HydrationBoundary>
  );
}
