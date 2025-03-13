'use client';
import { Card, CardContent } from '@/components/ui/card';
import { useTransactions } from '@/hooks/useTransactions';
import AddTransactionDialog from './AddTransactionDialog';
import { columns } from './columns';
import { DataTable } from './data-table';

export default function TransactionsInsight() {
  const { data: recentTransactions, refetch } = useTransactions();
  return (
    <Card>
      <CardContent className="py-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <AddTransactionDialog refreshTransaction={refetch} />
        </div>
        <DataTable columns={columns} data={recentTransactions} />
      </CardContent>
    </Card>
  );
}
