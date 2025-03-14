'use client';

import { Button } from '@/components/ui/button';
import { useTransactions } from '@/hooks/useTransactions';
import { Download, Plus } from 'lucide-react';
import { useState } from 'react';
import AddTransactionDialog from './AddTransactionDialog';
import { TransactionColumns } from './TransactionsColumns';
import { DataTable } from './TransactionTable';

export default function TransactionsClient() {
  const { data: transactions, isLoading, refetch } = useTransactions();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <div className="flex items-center space-x-4 ">
          <Button variant="default" className="flex items-center rounded-lg border bg-green-500 px-4 py-2 text-white hover:bg-green-600">
            <Download className="mr-2 size-4" />
            Export
          </Button>
          <Button onClick={() => setIsDialogOpen(true)} className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
            <Plus className="size-5" />
            <span>Add Transaction</span>
          </Button>
          <AddTransactionDialog refreshTransaction={refetch} isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
        </div>
      </div>

      {/* Transactions Table */}
      <DataTable columns={TransactionColumns} data={transactions} />

    </div>
  );
}
