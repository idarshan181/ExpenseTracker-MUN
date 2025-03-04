/* eslint-disable unused-imports/no-unused-vars */
'use client';

import { transactions } from '@/app/data/mockData';
import { formatCurrency } from '@/app/utils/formatCurrency';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, CreditCard, Pencil, Trash2, WalletIcon } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function BudgetTable() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesCategory = selectedCategory === 'All' || transaction.category === selectedCategory;
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
      || transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const currentTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="space-y-6">

      {/* Filters */}
      {/* Transactions Table */}
      <Card className="overflow-hidden rounded-lg shadow">
        <CardHeader className="border-b border-gray-200">
          <CardTitle>Active Budgets</CardTitle>
        </CardHeader>
        <CardContent className="m-0 w-full p-0">
          <table className="w-full">
            <thead>
              <tr className="w-full border-b border-gray-200">
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

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
            <div className="text-sm text-gray-500">
              Showing
              {' '}
              {((currentPage - 1) * itemsPerPage) + 1}
              {' '}
              to
              {' '}
              {Math.min(currentPage * itemsPerPage, filteredTransactions.length)}
              {' '}
              of
              {' '}
              {filteredTransactions.length}
              {' '}
              transactions
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="rounded p-2 hover:bg-gray-100 disabled:opacity-50"
              >
                <ChevronLeft className="size-5" />
              </Button>
              <span className="rounded border px-3 py-1">
                {currentPage}
                {' '}
                /
                {totalPages}
              </span>
              <Button
                variant="ghost"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="rounded p-2 hover:bg-gray-100 disabled:opacity-50"
              >
                <ChevronRight className="size-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
