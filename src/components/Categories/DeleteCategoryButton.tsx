'use client';

import { deleteCategoryById } from '@/app/actions/categoryActions';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { ConfirmDialog } from '../general/ConfirmDialog';

export function DeleteCategoryButton({ categoryId, closeDropDown }: { categoryId: string; closeDropDown?: () => void }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await deleteCategoryById(categoryId);
      if (response.error) {
        throw new Error(response.error);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category deleted successfully!');
      if (closeDropDown) {
        closeDropDown();
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete category');
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
        title="Delete Category?"
        message="Are you sure you want to delete this category? This action cannot be undone."
      />
    </>
  );
}
