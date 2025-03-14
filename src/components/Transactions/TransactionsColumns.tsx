/* eslint-disable no-console */
/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { formatCurrency } from '@/app/utils/formatCurrency';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Transaction } from '@/types/Transactions';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDown, CreditCard, MoreHorizontal, Pencil, Wallet } from 'lucide-react';
import { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import AddTransactionDialog from './AddTransactionDialog';
import { DeleteTransactionButton } from './DeleteTransactionButton';

// Define the type for transaction data

// Function to get the payment method icon
const getPaymentIcon = (method?: string) => {
  if (!method) {
    return <Wallet className="size-4" />;
  } // Default icon
  return method.toLowerCase().includes('credit') ? <CreditCard className="size-4" /> : <Wallet className="size-4" />;
};

// Define the columns for the DataTable
export const TransactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="flex items-center space-x-2 text-base font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span>Date</span>
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-base font-medium">{format(row.getValue('createdAt'), 'dd MMMM, yyyy')}</div>,
  },
  {
    accessorKey: 'description',
    header: () => <div className="text-base font-semibold">Description</div>,
    cell: ({ row }) => (
      <div>
        <div className="text-base font-medium">{row.getValue('description')}</div>
        {row.original.notes && (
          <div className="text-sm text-gray-500">{row.original.notes}</div>
        )}
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
    accessorKey: 'amount',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="flex items-center space-x-2 text-base font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span>Amount</span>
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = Number(row.getValue('amount'));
      return (
        <div className={cn(
          'font-medium',
          amount >= 0 ? 'text-green-600' : 'text-red-600',
        )}
        >
          {formatCurrency('CAD', amount)}
        </div>
      );
    },
  },
  {
    accessorKey: 'source',
    header: () => <div className="text-base font-semibold">Source</div>,
    cell: ({ row }) => {
      const source = row.getValue<string>('source');
      return (
        <div className="flex items-center space-x-2">
          {getPaymentIcon(source)}
          <span>{source}</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const transaction = row.original;

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
                  console.log(`transaction`, transaction);
                  setIsDialogOpen(true); // Open the edit dialog
                  setIsMenuOpen(false); // Close the dropdown
                }}
              >
                <Pencil className="mr-2 size-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="w-full p-0" asChild>
                <DeleteTransactionButton transactionId={transaction.id} closeDropDown={() => setIsMenuOpen(false)} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Transaction Edit Dialog */}
          <AddTransactionDialog
            transaction={transaction}
            isOpen={isDialogOpen}
            setIsOpen={setIsDialogOpen}
          />
        </>
      );
    },
  },
];
