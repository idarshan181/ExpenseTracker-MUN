'use client';
import { budgetCard } from '@/app/data/mockData';

import BudgetCard from '@/components/Budgets/BudgetCard';
import MonthlyOverview from '@/components/Budgets/MonthlyOverview';

import { Button } from '@/components/ui/button';
import { useBudgets } from '@/hooks/useBudgets';
import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import AddBudgetDialog from './AddBudgetDialog';
import { BudgetColumn } from './BudgetColumn';
import { BudgetTable } from './BudgetTable';

export default function BudgetsClient() {
  // const monthlyOverview = { totalBudget: 2800, totalSpent: 2260, remaining: 540, activeBudgets: 5, exceededBudgets: 1, nearLimitBudgets: 2 };
  const { data: budgets, isLoading, refetch } = useBudgets();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const monthlyOverview = useMemo(() => {
    if (!budgets) {
      return {
        totalBudget: 0,
        totalSpent: 0,
        remaining: 0,
        activeBudgets: 0,
        exceededBudgets: 0,
        nearLimitBudgets: 0,
      };
    }

    const totalBudget = budgets.reduce((sum: any, b: { amount: any }) => sum + (b.amount || 0), 0);
    const totalSpent = budgets.reduce((sum: any, b: { spent: any }) => sum + (b.spent || 0), 0);
    const remaining = totalBudget - totalSpent;

    const activeBudgets = budgets.length;
    const exceededBudgets = budgets.filter((b: { spent: any; amount: any }) => (b.spent || 0) > (b.amount || 0)).length;
    const nearLimitBudgets = budgets.filter((b: { amount: number; spent: number }) => {
      const amount = b.amount || 0;
      const spent = b.spent || 0;
      return spent <= amount && spent >= amount * 0.9;
    }).length;

    return {
      totalBudget,
      totalSpent,
      remaining,
      activeBudgets,
      exceededBudgets,
      nearLimitBudgets,
    };
  }, [budgets]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
        {budgetCard.map(budget => (
          <BudgetCard key={budget.id} budget={budget} />
        ))}
      </div>
    </div>
  );
}
