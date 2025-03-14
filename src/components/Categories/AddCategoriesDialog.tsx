'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import AddCategoriesForm from '../forms/AddCategoriesForm';

type CategoryDialogProps = {
  refreshCategories?: () => void;
  category?: any;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export default function AddCategoriesDialog({ refreshCategories, category = null, isOpen, setIsOpen }: CategoryDialogProps) {
  const closeDialog = () => {
    setIsOpen(false);
    refreshCategories?.();
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-full max-w-xl">
        <DialogHeader>
          <DialogTitle>{category ? 'Edit Category' : 'Add New Category'}</DialogTitle>
          <DialogDescription>
            {category ? 'Update the category details' : 'Add a new category'}
          </DialogDescription>
        </DialogHeader>
        <AddCategoriesForm onSuccess={closeDialog} onCancel={closeDialog} category={category} />
      </DialogContent>
    </Dialog>
  );
}
