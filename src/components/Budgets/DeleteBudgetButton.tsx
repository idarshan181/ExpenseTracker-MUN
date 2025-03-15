'use client';

import { deleteBudgetById } from '@/app/actions/budgetActions';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { ConfirmDialog } from '../general/ConfirmDialog';

export function DeleteBudgetButton({ budgetId, closeDropDown }: { budgetId: number; closeDropDown?: () => void }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await deleteBudgetById(budgetId);
      if (response.error) {
        throw new Error(response.error);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['budgets'] });
      toast.success('Category deleted successfully!');
      if (closeDropDown) {
        closeDropDown();
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete budget');
      if (closeDropDown) {
        closeDropDown();
      }
    },
  });

  return (
    <>
      <Button
        variant="ghost"
        className="flex w-full cursor-pointer items-center justify-start text-destructive"
        onClick={() => setIsDialogOpen(true)}
      >
        <Trash className="mr-2 size-4" />
        Delete
      </Button>

      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={() => {
          mutation.mutate();
          setIsDialogOpen(false);
        }}
        title="Delete Budget?"
        message="Are you sure you want to delete this budget? This action cannot be undone."
      />
    </>
  );
}
