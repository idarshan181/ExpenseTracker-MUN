'use client';

import ExpenseDistribution from './ExpenseDistribution';
import IncomeExpenseTrend from './IncomeExpenseTrend';
import Summary from './Summary';
import TopSpendings from './TopSpendings';

export default function ReportClient() {
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
