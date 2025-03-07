'use client';

import { categories, transactions } from '@/app/data/mockData';
import { formatCurrency } from '@/app/utils/formatCurrency';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, CreditCard, Download, Filter, Pencil, Search, Trash2, WalletIcon } from 'lucide-react';
import { useState } from 'react';
import AddTransactionDialog from '../Dashboard/TransactionsInsights/AddTransactionDialog';
import CustomPagination from '../general/CustomPagination';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export default function TransactionsClient() {
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState<boolean>(false);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesCategory = selectedCategory === 'All' || transaction.category === selectedCategory;
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
      || transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);
  const currentTransactions = filteredTransactions.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <div className="flex items-center space-x-4 ">
          <Button variant="default" className="flex items-center rounded-lg border bg-green-500 px-4 py-2 text-white hover:bg-green-600">
            <Download className="mr-2 size-4" />
            Export
          </Button>
          <AddTransactionDialog />
        </div>
      </div>

      {/* Filters */}
      <Card className="space-y-4 rounded-lg px-6 pt-6 shadow">
        <CardContent className="flex flex-wrap items-center gap-4">
          <div className="min-w-[240px] flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 size-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarIcon className="size-5 text-gray-400" />
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-[240px] justify-start text-left font-normal',
                    !date && 'text-muted-foreground',
                  )}
                  onClick={() => setOpen(prev => !prev)}
                >
                  <CalendarIcon />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => {
                    setDate(selectedDate);
                    setOpen(false); // Close popover after selection
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="size-5 text-gray-400" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="overflow-hidden rounded-lg shadow">
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 ">
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Method</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map(transaction => (
                <tr key={transaction.id} className="border-b border-gray-100 ">
                  <td className="px-4 py-3">{transaction.date}</td>
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium">{transaction.description}</div>
                      <div className="text-sm text-gray-500">{transaction.notes}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full px-2 py-1 text-sm">
                      {transaction.category}
                    </span>
                  </td>
                  <td className={`px-4 py-3 font-medium ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                  >
                    {formatCurrency('CAD', transaction.amount)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      {transaction.method === 'Credit Card'
                        ? (
                            <CreditCard className="size-4" />
                          )
                        : (
                            <WalletIcon className="size-4" />
                          )}
                      <span>{transaction.method}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-sm ${
                      transaction.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                    >
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" className="rounded p-1 ">
                        <Pencil className="size-4 text-gray-500" />
                      </Button>
                      <Button variant="ghost" className="rounded p-1 ">
                        <Trash2 className="size-4 text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center justify-end">
            <CustomPagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
            />
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
