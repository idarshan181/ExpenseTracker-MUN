'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // Ensure you have a utility function for merging class names
import { Category } from '@/types/categories';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import * as LucideIcons from 'lucide-react';

const getCategoryIcon = (iconName?: string, color?: string) => {
  if (!iconName) {
    return <LucideIcons.Package className="size-4 text-gray-400" />;
  }

  const Icon = (LucideIcons as unknown as Record<string, React.ElementType>)[
    iconName
  ];
  if (!Icon) {
    return <LucideIcons.Package className="size-4 text-gray-400" />;
  }

  return <Icon className={`size-4 ${color ?? 'text-gray-400'}`} />;
};

export const CategoriesColumn: ColumnDef<Category>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="flex items-center space-x-2 text-base font-semibold "
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span>Name</span>
        <LucideIcons.ArrowUpDown className="size-5" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-base font-medium">{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'description',
    header: () => <div className="text-base  font-semibold">Description</div>,
    cell: ({ row }) => (
      <div className="text-base font-medium">
        {row.getValue('description') || '—'}
      </div>
    ),
  },
  {
    accessorKey: 'icon',
    header: () => <div className="text-base font-semibold">Icon</div>,
    cell: ({ row }) => {
      const icon = row.getValue<string>('icon');
      const color = row.original.color;
      return (
        <div className="flex items-center space-x-3">
          {getCategoryIcon(icon, color)}
          <span className="text-base font-medium">{icon || 'Default'}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'isDefault',
    header: () => <div className="text-base font-semibold">Default</div>,
    cell: ({ row }) => {
      const isDefault = row.getValue<boolean>('isDefault');
      return (
        <div
          className={cn(
            'px-2 py-1 rounded-full text-sm font-medium',
            isDefault
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800',
          )}
        >
          {isDefault ? 'Yes' : 'No'}
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="flex items-center space-x-2 text-base font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span>Created At</span>
        <LucideIcons.ArrowUpDown className="size-5" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-base font-medium ">
        {format(new Date(row.getValue('createdAt')), 'yyyy-MM-dd')}
      </div>
    ),
  },
  {
    accessorKey: 'updatedAt',
    header: () => <div className="text-base font-semibold">Last Updated</div>,
    cell: ({ row }) => (
      <div className="text-base font-medium ">
        {format(new Date(row.getValue('updatedAt')), 'yyyy-MM-dd')}
      </div>
    ),
  },
];
