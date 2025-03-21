/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { formatCurrency } from '@/app/utils/formatCurrency';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils'; // Ensure you have a utility function for merging class names
import { Budget } from '@/types/budgets';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDown, MoreHorizontal, Pencil } from 'lucide-react';
import { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import AddBudgetDialog from './AddBudgetDialog';
import { DeleteBudgetButton } from './DeleteBudgetButton';

export const BudgetColumn: ColumnDef<Budget>[] = [
  {
    accessorKey: 'bname',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="flex items-center space-x-2 text-base font-semibold "
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span>Name</span>
        <ArrowUpDown className="size-5" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-base font-medium">{row.getValue('bname')}</div>
    ),
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-base font-semibold">Amount</div>,
    cell: ({ row }) => (
      <div className="text-base font-medium">
        {formatCurrency(`${row.original.currency}`, row.getValue('amount'))}
      </div>
    ),
  },
  {
    accessorKey: 'category',
    header: () => <div className="text-base font-semibold">Category</div>,
    cell: ({ row }) => {
      const category = row.original.category; // Extract category object
      return <span>{category?.name || 'No Category'}</span>; // Safely get category name
    },
  },
  {
    accessorKey: 'isActive',
    header: () => <div className="w-full max-w-16 text-center text-base font-semibold">Active</div>,
    cell: ({ row }) => {
      const isDefault = row.getValue<boolean>('isActive');
      return (
        <div
          className={cn(
            'px-2 py-1 rounded-full w-full max-w-16 text-center text-sm font-medium',
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
    accessorKey: 'startDate',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="flex items-center space-x-2 text-base font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span>Start Date</span>
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-base font-medium">{format(new Date(row.getValue('startDate')), 'dd MMMM, yyyy')}</div>,
  },
  {
    accessorKey: 'endDate',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="flex items-center space-x-2 text-base font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span>End Date</span>
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-base font-medium">{format(new Date(row.getValue('endDate')), 'dd MMMM, yyyy')}</div>,
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
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-base font-medium">{format(new Date(row.getValue('createdAt')), 'dd MMMM, yyyy')}</div>,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const budget = row.original;

      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const [isDialogOpen, setIsDialogOpen] = useState(false);

      return (
        <>
          <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  setIsDialogOpen(true); // Open the edit dialog
                  setIsMenuOpen(false); // Close the dropdown
                }}
              >
                <Pencil className="mr-2 size-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="w-full p-0" asChild>
                <DeleteBudgetButton budgetId={budget.id} closeDropDown={() => setIsMenuOpen(false)} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Transaction Edit Dialog */}
          <AddBudgetDialog
            budget={budget}
            isOpen={isDialogOpen}
            setIsOpen={setIsDialogOpen}
          />
        </>
      );
    },
  },
];
