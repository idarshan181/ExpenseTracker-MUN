'use client';

import ExpenseByCategory from './ExpenseByCategory';
import MonthlyTrend from './MonthlyTrend';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
export default function FinancialInsights() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Expense by Category */}
      <ExpenseByCategory />

      {/* Monthly Trend */}
      <MonthlyTrend />
    </div>
  );
}
