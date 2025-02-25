import { requireUser } from '@/app/utils/requireUser';
import TransactionsClient from '@/components/Transactions/TransactionsClient';

export default async function TranscationPage() {
  await requireUser();
  return (
    <TransactionsClient />
  );
}
