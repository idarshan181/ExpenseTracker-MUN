import { recentTransactions } from '@/app/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import AddTransactionDialog from './AddTransactionDialog';
import { columns } from './columns';
import { DataTable } from './data-table';

export default async function TransactionsInsight() {
  return (
    <Card>
      <CardContent className="py-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <AddTransactionDialog />
        </div>
        <DataTable columns={columns} data={recentTransactions} />
      </CardContent>
    </Card>
  );
}
