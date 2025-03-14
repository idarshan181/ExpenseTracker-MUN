'use client';

import AddTransactionForm from '@/components/forms/AddTransactionForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type AddTransactionDialogProps = {
  refreshTransaction?: () => void;
  transaction?: any;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export default function AddTransactionDialog({ refreshTransaction, transaction = null, isOpen, setIsOpen }: AddTransactionDialogProps) {
  const closeDialog = () => {
    setIsOpen(false);
    if (refreshTransaction) {
      refreshTransaction();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-full max-w-xl">
        <DialogHeader>
          <DialogTitle>{transaction ? 'Edit Transcation' : 'Add New Transacation'}</DialogTitle>
          <DialogDescription>
            {transaction ? 'Update the transaction details' : 'Record a new expense or income'}
          </DialogDescription>
        </DialogHeader>
        <AddTransactionForm onSuccess={closeDialog} onCancel={closeDialog} transaction={transaction} />
      </DialogContent>
    </Dialog>
  );
}
