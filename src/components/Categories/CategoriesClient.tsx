'use client';

import { useCategories } from '@/hooks/useCategories';
import { DataTable } from '../Transactions/TransactionTable';
import AddCategoriesDialog from './AddCategoriesDialog';
import { CategoriesColumn } from './CategoriesColumn';

export default function CategoriesClient() {
  const { data: categories, isLoading, refetch } = useCategories();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categories</h1>
        <div className="flex items-center space-x-4 ">
          <AddCategoriesDialog refreshCategories={refetch} />
        </div>
      </div>

      <DataTable data={categories} columns={CategoriesColumn} />
    </div>
  );
}
