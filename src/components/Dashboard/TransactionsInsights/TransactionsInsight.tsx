import { recentTransactions } from '@/app/data/mockData';
import { Plus } from 'lucide-react';
import { Button } from '../../ui/button';
import { columns } from './columns';
import { DataTable } from './data-table';

export default async function TransactionsInsight() {
  return (
    <div className="rounded-lg p-6 shadow">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recent Transactions</h2>
        <Button className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
          <Plus className="size-5" />
          <span>Add Transaction</span>
        </Button>
      </div>
      <DataTable columns={columns} data={recentTransactions} />
    </div>
  );
}
