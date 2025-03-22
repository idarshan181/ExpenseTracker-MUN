import { getQueryClient } from '@/app/utils/getQueryClient';
import { requireUser } from '@/app/utils/requireUser';
import ReportClient from '@/components/Reports/ReportClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function ReportsPage() {
  await requireUser();

  const queryClient = getQueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ReportClient />
    </HydrationBoundary>
  );
}
