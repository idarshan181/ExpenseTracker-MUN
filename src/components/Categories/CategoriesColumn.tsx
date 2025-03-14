/* eslint-disable no-console */
/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // Ensure you have a utility function for merging class names
import { Category } from '@/types/categories';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import * as LucideIcons from 'lucide-react';
import { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import AddCategoriesDialog from './AddCategoriesDialog';
import { DeleteCategoryButton } from './DeleteCategoryButton';

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
        <span>Date</span>
        <LucideIcons.ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-base font-medium">{format(row.getValue('createdAt'), 'dd MMMM, yyyy')}</div>,
  },
  {
    accessorKey: 'updatedAt',
    header: () => <div className="text-base font-semibold">Last Updated</div>,
    cell: ({ row }) => (
      <div className="text-base font-medium ">
        {format(row.getValue('updatedAt'), 'dd MMMM, yyyy')}
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const category = row.original;

      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const [isDialogOpen, setIsDialogOpen] = useState(false);

      return (
        <>
          <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-8 p-0">
                <span className="sr-only">Open menu</span>
                <LucideIcons.MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  console.log(`category`, category);
                  setIsDialogOpen(true); // Open the edit dialog
                  setIsMenuOpen(false); // Close the dropdown
                }}
              >
                <LucideIcons.Pencil className="mr-2 size-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="w-full p-0" asChild>
                <DeleteCategoryButton categoryId={category.id} closeDropDown={() => setIsMenuOpen(false)} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Transaction Edit Dialog */}
          <AddCategoriesDialog
            category={category}
            isOpen={isDialogOpen}
            setIsOpen={setIsDialogOpen}
          />
        </>
      );
    },
  },
];
