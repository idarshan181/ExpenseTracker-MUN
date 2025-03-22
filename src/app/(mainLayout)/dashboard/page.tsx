import { getQueryClient } from '@/app/utils/getQueryClient';
import DashboardClient from '@/components/Dashboard/DashboardClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';
import { requireUser } from '../../utils/requireUser';

export const metadata: Metadata = {
  title: 'Dashboard | Expense Vision',
  description: 'Analyze your financial dashboard',
};

export default async function DashboardHome() {
  await requireUser();

  const queryClient = getQueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardClient />
    </HydrationBoundary>
  );
}
