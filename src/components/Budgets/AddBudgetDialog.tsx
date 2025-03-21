'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import AddBudgetForm from '../forms/AddBudgetForm';

type BudgetDialogProps = {
  refreshBudgets?: () => void;
  budget?: any;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export default function AddBudgetDialog({ refreshBudgets, budget = null, isOpen, setIsOpen }: BudgetDialogProps) {
  const closeDialog = () => {
    setIsOpen(false);
    refreshBudgets?.();
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-full max-w-xl">
        <DialogHeader>
          <DialogTitle>{budget ? 'Edit Budget' : 'Add New Budget'}</DialogTitle>
          <DialogDescription>
            {budget && 'Update the budget details'}
          </DialogDescription>
        </DialogHeader>
        <AddBudgetForm onSuccess={closeDialog} onCancel={closeDialog} budget={budget} />
      </DialogContent>
    </Dialog>
  );
}
