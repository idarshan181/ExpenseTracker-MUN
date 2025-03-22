'use client';

import FinancialInsights from './FinancialInsights/FinancialInsights';
import MonthlyInsights from './MonthlyInsights';
import TransactionsInsight from './TransactionsInsight';

export default function DashboardClient() {
  return (
    <div className="space-y-6">
      <MonthlyInsights />
      <TransactionsInsight />
      <FinancialInsights />
    </div>
  );
}
