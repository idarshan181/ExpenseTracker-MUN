import { getQueryClient } from '@/app/utils/getQueryClient';
import { requireUser } from '@/app/utils/requireUser';
import TransactionsClient from '@/components/Transactions/TransactionsClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function TranscationPage() {
  await requireUser();
  const queryClient = getQueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TransactionsClient />
    </HydrationBoundary>
  );
}
