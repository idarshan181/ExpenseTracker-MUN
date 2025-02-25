import { requireUser } from '@/app/utils/requireUser';
import ReportCard from '@/components/general/ReportCard';
import DistributionTrend from '@/components/Reports/DistributionTrend';
import TopSpendings from '@/components/Reports/TopSpendings';

export default async function ReportsPage() {
  await requireUser();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ReportCard
          title="Total Income"
          amount={29800}
          previousAmount={27500}
          percentage={8.2}
          type="income"
        />
        <ReportCard
          title="Total Expenses"
          amount={19700}
          previousAmount={20300}
          percentage={3.1}
          type="expense"
        />
        <ReportCard
          title="Net Savings"
          amount={10100}
          previousAmount={8900}
          percentage={12.5}
          type="savings"
        />
      </div>
      <DistributionTrend />
      <TopSpendings />
    </div>
  );
}
