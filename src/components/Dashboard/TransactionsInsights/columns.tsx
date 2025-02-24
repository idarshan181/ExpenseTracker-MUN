'use client';

import { formatCurrency } from '@/app/utils/formatCurrency';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // Ensure you have a utility function for merging class names
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Briefcase, CreditCard, DollarSign, ShoppingCart, Wallet } from 'lucide-react';

export type Transaction = {
  id: number;
  date: string;
  description: string;
  category: string;
  amount: number;
  method: string;
  status: 'completed' | 'pending' | 'failed';
};

// Get icon based on category
const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'food':
      return <ShoppingCart className="size-4 text-blue-600" />;
    case 'income':
      return <DollarSign className="size-4 text-green-600" />;
    case 'salary':
      return <Briefcase className="size-4 text-gray-600" />;
    default:
      return <ShoppingCart className="size-4 text-gray-400" />;
  }
};

// Get icon based on payment method
const getPaymentIcon = (method: string) => {
  return method.toLowerCase().includes('credit')
    ? <CreditCard className="size-4" />
    : <Wallet className="size-4" />;
};

const getStatusBadge = (status: string) => {
  const statusStyles = {
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800',
  };
  const statusStyle = statusStyles[status as keyof typeof statusStyles];

  return (
    <span className={cn('rounded-full px-3 py-1 text-sm font-semibold', statusStyle)}>
      {status}
    </span>
  );
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="flex items-center space-x-2 text-base font-semibold "
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span>Date</span>
        <ArrowUpDown className="size-5" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-base font-medium ">{row.getValue('date')}</div>,
  },
  {
    accessorKey: 'description',
    header: () => <div className="text-base font-semibold ">Description</div>,
    cell: ({ row }) => <div className="text-base font-medium">{row.getValue('description')}</div>,
  },
  {
    accessorKey: 'category',
    header: () => <div className="text-base font-semibold ">Category</div>,
    cell: ({ row }) => {
      const category = row.getValue<string>('category');
      return (
        <div className="flex items-center space-x-3">
          {getCategoryIcon(category)}
          <span className="text-base font-medium">{category}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="flex w-full items-center justify-center space-x-2 text-base font-semibold "
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span>Amount</span>
        <ArrowUpDown className="size-5" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = Number(row.getValue('amount'));
      return (
        <div className={cn('flex justify-center items-center text-base font-medium w-full', amount >= 0 ? 'text-green-600' : 'text-red-600')}>
          {formatCurrency('CAD', amount)}
        </div>
      );
    },
  },
  {
    accessorKey: 'method',
    header: () => <div className="text-base font-semibold ">Method</div>,
    cell: ({ row }) => {
      const method = row.getValue<string>('method');
      return (
        <div className="flex items-center space-x-3">
          {getPaymentIcon(method)}
          <span className="text-base font-medium text-foreground">{method}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="flex items-center space-x-2 text-base font-semibold "
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span>Status</span>
        <ArrowUpDown className="size-5" />
      </Button>
    ),
    cell: ({ row }) => getStatusBadge(row.getValue('status')),
  },
];
