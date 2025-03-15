import { getQueryClient } from '@/app/utils/getQueryClient';
import { requireUser } from '@/app/utils/requireUser';
import BudgetsClient from '@/components/Budgets/BudgetsClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Budgets',
  description: 'Manage your budgets',
};

export default async function BudgetsPage() {
  await requireUser();

  const queryClient = getQueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BudgetsClient />
    </HydrationBoundary>
  );
}
