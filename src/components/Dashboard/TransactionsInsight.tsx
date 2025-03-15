'use client';

import { TransactionColumns } from '@/components/Transactions/TransactionsColumns';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTransactions } from '@/hooks/useTransactions';
import { Loader2, Plus } from 'lucide-react';
import { useState } from 'react';

import AddTransactionDialog from '../Transactions/AddTransactionDialog';
import { TransactionTable } from '../Transactions/TransactionTable';

export default function TransactionsInsight() {
  const { data: recentTransactions, isLoading, refetch } = useTransactions(5);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Card>
      <CardContent className="py-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <Button onClick={() => setIsDialogOpen(true)} className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
            <Plus className="size-5" />
            <span>Add Transaction</span>
          </Button>
          <AddTransactionDialog refreshTransaction={refetch} isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
        </div>

        {isLoading
          ? (
              <div className="flex justify-center py-8">
                <Loader2 className="size-6 animate-spin text-gray-500" />
              </div>
            )
          : recentTransactions?.length >= 0
            ? (
                <TransactionTable columns={TransactionColumns} data={recentTransactions} />
              )
            : (
                <div className="flex flex-col items-center justify-center space-y-4 py-12">
                  <p className="text-gray-500">No transactions found.</p>
                  <Button onClick={() => refetch()} className="mt-4">
                    Refresh
                  </Button>
                  <AddTransactionDialog refreshTransaction={refetch} isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
                </div>
              )}
      </CardContent>
    </Card>
  );
}
