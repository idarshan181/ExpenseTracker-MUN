import ExpenseDistribution from './ExpenseDistribution';
import IncomeExpenseTrend from './IncomeExpenseTrend';

export default function DistributionTrend() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
      <IncomeExpenseTrend />
      <ExpenseDistribution />
    </div>
  );
}
