import FinancialInsights from '@/components/Dashboard/FinancialInsights/FinancialInsights';
import TransactionsInsight from '@/components/Dashboard/TransactionsInsights/TransactionsInsight';
import QuickStatCard from '@/components/general/QuickStatCard';
import { monthlyStats } from '../../data/mockData';
import { requireUser } from '../../utils/requireUser';

export default async function DashboardHome() {
  await requireUser();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <QuickStatCard
          title="Monthly Income"
          amount={monthlyStats.income}
          previousAmount={monthlyStats.previousIncome}
          type="income"
        />
        <QuickStatCard
          title="Monthly Expenses"
          amount={monthlyStats.expenses}
          previousAmount={monthlyStats.previousExpenses}
          type="expense"
        />
        <QuickStatCard
          title="Available Balance"
          amount={monthlyStats.balance}
          type="balance"
        />
        <QuickStatCard
          title="Monthly Savings"
          amount={monthlyStats.savings}
          percentage={(monthlyStats.savings / monthlyStats.income) * 100}
          type="savings"
        />
      </div>
      <TransactionsInsight />
      <FinancialInsights />
    </div>
  );
}
