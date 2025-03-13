'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import AddCategoriesForm from '../forms/AddCategoriesForm';

export default function AddCategoriesDialog({ refreshCategories }: { refreshCategories: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const closeDialog = () => {
    setIsOpen(false);
    refreshCategories?.();
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)} className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
          <Plus className="size-5" />
          <span>Add Category</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-xl">
        <DialogHeader>
          <div>
            <DialogTitle>Add New Category</DialogTitle>
          </div>
        </DialogHeader>
        <AddCategoriesForm onSuccess={closeDialog} onCancel={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}
