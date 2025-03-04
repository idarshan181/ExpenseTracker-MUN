import { requireUser } from '@/app/utils/requireUser';
import BudgetCard from '@/components/Budgets/BudgetCard';
import BudgetTable from '@/components/Budgets/BudgetTable';
import MonthlyOverview from '@/components/Budgets/MonthlyOverview';
import { Button } from '@/components/ui/button';

import { Plus } from 'lucide-react';

const getBudgets = async () => {
  return [
    {
      id: 1,
      category: 'Food & Dining',
      limit: 1000,
      spent: 800,
      remaining: 200,
      status: 'on_track',
      transactions: 15,
    },
    {
      id: 2,
      category: 'Transportation',
      limit: 500,
      spent: 480,
      remaining: 20,
      status: 'warning',
      transactions: 8,
    },
    {
      id: 3,
      category: 'Entertainment',
      limit: 300,
      spent: 350,
      remaining: -50,
      status: 'exceeded',
      transactions: 5,
    },
    {
      id: 4,
      category: 'Shopping',
      limit: 600,
      spent: 250,
      remaining: 350,
      status: 'on_track',
      transactions: 3,
    },
    {
      id: 5,
      category: 'Utilities',
      limit: 400,
      spent: 380,
      remaining: 20,
      status: 'warning',
      transactions: 4,
    },
  ];
};

export default async function Budgets() {
  await requireUser();

  const budgets = await getBudgets();
  const monthlyOverview = { totalBudget: 2800, totalSpent: 2260, remaining: 540, activeBudgets: 5, exceededBudgets: 1, nearLimitBudgets: 2 };

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Budget Management</h1>
        <Button className="flex items-center rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
          <Plus className="mr-2 size-4" />
          Create Budget
        </Button>
      </div>

      <MonthlyOverview data={monthlyOverview} />
      <BudgetTable />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {budgets.map(budget => (
          <BudgetCard key={budget.id} budget={budget} />
        ))}
      </div>
    </div>
  );
}
