'use client';

import { useMonthlySummary } from '@/hooks/useAnalytics';
import { useMemo } from 'react';
import QuickStatCard from '../general/QuickStatCard';
import { Skeleton } from '../ui/skeleton';

export default function MonthlyInsights() {
  const { data: monthlySummary, isLoading } = useMonthlySummary();
  const {
    income,
    expenses,
    balance,
    savings,
    savingsRate,
  } = useMemo(() => {
    if (!monthlySummary) {
      return {
        income: 0,
        expenses: 0,
        balance: 0,
        savings: 0,
        savingsRate: 0,
      };
    }

    return {
      income: monthlySummary.totalIncome,
      expenses: monthlySummary.totalExpense,
      balance: monthlySummary.balance,
      savings: monthlySummary.totalIncome - monthlySummary.totalExpense,
      savingsRate: monthlySummary.savingsRate,
    };
  }, [monthlySummary]);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {isLoading
        ? (
            <>
              <Skeleton className="h-28 w-40" />
              <Skeleton className="h-28 w-40" />
              <Skeleton className="h-28 w-40" />
              <Skeleton className="h-28 w-40" />
            </>
          )
        : (
            <>
              <QuickStatCard
                title="Monthly Income"
                amount={income}
                type="income"
              />
              <QuickStatCard
                title="Monthly Expenses"
                amount={expenses}
                type="expense"
              />
              <QuickStatCard
                title="Available Balance"
                amount={balance}
                type="balance"
              />
              <QuickStatCard
                title="Monthly Savings"
                amount={savings}
                percentage={savingsRate}
                type="savings"
              />
            </>
          )}
    </div>
  );
}
