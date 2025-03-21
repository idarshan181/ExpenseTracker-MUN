'use client';
import { budgetCard } from '@/app/data/mockData';

import BudgetCard from '@/components/Budgets/BudgetCard';
import MonthlyOverview from '@/components/Budgets/MonthlyOverview';

import { Button } from '@/components/ui/button';
import { useBudgets } from '@/hooks/useBudgets';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import AddBudgetDialog from './AddBudgetDialog';
import { BudgetColumn } from './BudgetColumn';
import { BudgetTable } from './BudgetTable';

export default function BudgetsClient() {
  const monthlyOverview = { totalBudget: 2800, totalSpent: 2260, remaining: 540, activeBudgets: 5, exceededBudgets: 1, nearLimitBudgets: 2 };
  const { data: budgets, isLoading, refetch } = useBudgets();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
