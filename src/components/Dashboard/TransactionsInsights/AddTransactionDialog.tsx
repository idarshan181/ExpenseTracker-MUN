'use client';

import AddTransactionForm from '@/components/forms/AddTransactionForm';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export default function AddTransactionDialog({ refreshTransaction }: { refreshTransaction?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const closeDialog = () => {
    setIsOpen(false);
    if (refreshTransaction) {
      refreshTransaction();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)} className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
          <Plus className="size-5" />
          <span>Add Transaction</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-xl">
        <DialogHeader>
          <div>
            <DialogTitle>Add New Transacation</DialogTitle>
            <DialogDescription>Record a new expense or income</DialogDescription>
          </div>
        </DialogHeader>
        <AddTransactionForm onSuccess={closeDialog} onCancel={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}
