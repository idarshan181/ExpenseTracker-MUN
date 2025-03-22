/* eslint-disable no-console */
'use client';

import { useMonthlySummary, useSpendingByCategories, useTopSpendingByCategory } from '@/hooks/useAnalytics';
import ExpenseDistribution from './ExpenseDistribution';
import IncomeExpenseTrend from './IncomeExpenseTrend';
import Summary from './Summary';
import TopSpendings from './TopSpendings';

export default function ReportClient() {
  const { data: spendingCategories, isLoading: isSpendingLoading } = useSpendingByCategories();
  const { data: topSpending, isLoading: isTopSpendingLoading } = useTopSpendingByCategory();
  const { data: monthlySummary, isLoading: isMonthlySummaryLoading } = useMonthlySummary();

  if (isSpendingLoading
    || isTopSpendingLoading
    || isMonthlySummaryLoading) {
    return <div>Loading...</div>;
  }

  console.log('all data', { spendingCategories, topSpending, monthlySummary });

  return (
    <div className="space-y-6">
      <Summary />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <IncomeExpenseTrend />
        <ExpenseDistribution />
      </div>
      <TopSpendings />
    </div>
  );
}
