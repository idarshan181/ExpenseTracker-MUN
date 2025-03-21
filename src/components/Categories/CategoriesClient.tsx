'use client';

import { useCategories } from '@/hooks/useCategories';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import AddCategoriesDialog from './AddCategoriesDialog';
import { CategoriesColumn } from './CategoriesColumn';
import { CategoriesTable } from './CategoriesTable';

export default function CategoriesClient() {
  const { data: categories, isLoading, refetch } = useCategories();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categories</h1>
        <div className="flex items-center space-x-4 ">
          <Button onClick={() => setIsDialogOpen(true)} className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
            <Plus className="size-5" />
            <span>Add Category</span>
          </Button>
          <AddCategoriesDialog refreshCategories={refetch} isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
        </div>
      </div>

      <CategoriesTable data={categories} columns={CategoriesColumn} />
    </div>
  );
}
