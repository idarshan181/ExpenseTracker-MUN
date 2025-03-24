/* eslint-disable no-console */
'use client';

import MonthlyOverview from '@/components/Budgets/MonthlyOverview';

import { Button } from '@/components/ui/button';
import { useSpendingByCategories } from '@/hooks/useAnalytics';
import { useBudgets } from '@/hooks/useBudgets';
import { useTransactions } from '@/hooks/useTransactions';
import { BudgetCardType } from '@/types/budgets';
import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import AddBudgetDialog from './AddBudgetDialog';
import BudgetCard from './BudgetCard';
import { BudgetColumn } from './BudgetColumn';
import { BudgetTable } from './BudgetTable';

export default function BudgetsClient() {
  // const monthlyOverview = { totalBudget: 2800, totalSpent: 2260, remaining: 540, activeBudgets: 5, exceededBudgets: 1, nearLimitBudgets: 2 };
  const { data: budgets, isLoading, refetch } = useBudgets();
  const { data: transactions } = useTransactions();
  const { data: expenseCategory } = useSpendingByCategories();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const monthlyOverview = useMemo(() => {
    if (!budgets || !transactions) {
      return {
        totalBudget: 0,
        totalSpent: 0,
        remaining: 0,
        activeBudgets: 0,
        exceededBudgets: 0,
        nearLimitBudgets: 0,
      };
    }

    // Calculate total budget
    const totalBudget = budgets.reduce((sum: any, b: { amount: any }) => sum + (b.amount || 0), 0);

    // Calculate total spent across all budget-related expense transactions
    const budgetSpentMap = budgets.map((budget: { amount: number; categoryId: any }) => {
      const budgetAmount = budget.amount || 0;

      const matchingTransactions = transactions.filter((txn: { transactionType: string; categoryId: any }) =>
        txn.transactionType === 'expense' && txn.categoryId === budget.categoryId,
      );

      const spent = matchingTransactions.reduce((sum: any, txn: { amount: any }) => sum + txn.amount, 0);

      return {
        spent,
        amount: budgetAmount,
      };
    });

    const totalSpent = budgetSpentMap.reduce((sum: any, b: { spent: any }) => sum + b.spent, 0);
    const remaining = totalBudget - totalSpent;

    const exceededBudgets = budgetSpentMap.filter((b: { spent: number; amount: number }) => b.spent > b.amount).length;
    const nearLimitBudgets = budgetSpentMap.filter((b: { spent: number; amount: number }) => b.spent <= b.amount && b.spent >= b.amount * 0.9).length;

    return {
      totalBudget,
      totalSpent,
      remaining,
      activeBudgets: budgets.length,
      exceededBudgets,
      nearLimitBudgets,
    };
  }, [budgets, transactions]);

  const budgetCards: BudgetCardType[] = useMemo(() => {
    if (!budgets || !transactions) {
      return [];
    }

    return budgets.map((budget: BudgetCardType) => {
      const budgetAmount = Number(budget.amount) || 0;

      const matchingTransactions = transactions.filter((txn: { transactionType: string; categoryId: any }) =>
        txn.transactionType === 'expense'
        && txn.categoryId === budget.categoryId,
      );

      const spent = matchingTransactions.reduce((sum: any, txn: { amount: any }) => sum + txn.amount, 0);
      const remaining = budgetAmount - spent;

      let status: 'on_track' | 'warning' | 'exceeded' = 'on_track';
      if (spent > budgetAmount) {
        status = 'exceeded';
      } else if (spent >= budgetAmount * 0.9) {
        status = 'warning';
      }

      return {
        id: budget.id,
        category: budget.category,
        limit: budgetAmount,
        amount: budgetAmount, // ✅ Add this line
        spent,
        remaining,
        status,
        transactions: matchingTransactions.length,
      };
    });
  }, [budgets, transactions]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log('all data', { budgets, useTransactions, expenseCategory });

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Budget Management</h1>
        <Button onClick={() => setIsDialogOpen(true)} className="flex items-center rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90">
          <Plus className="mr-2 size-4" />
          Create Budget
        </Button>
        <AddBudgetDialog refreshBudgets={refetch} isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
      </div>

      <MonthlyOverview data={monthlyOverview} />
      <BudgetTable data={budgets} columns={BudgetColumn} />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {budgetCards.map(budget => (
          <BudgetCard key={budget.id} budget={budget} />
        ))}
      </div>
    </div>
  );
}
