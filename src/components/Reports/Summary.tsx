'use client';

import { useOverallSummary } from '@/hooks/useAnalytics';
import ReportCard from '../general/ReportCard';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export default function Summary() {
  const { data: summary, isLoading: isSummaryLoading } = useOverallSummary();

  if (isSummaryLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map(index => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-4 w-32" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <ReportCard
        title="Total Income"
        amount={summary.totalIncome}
        previousAmount={27500}
        percentage={8.2}
        type="income"
      />
      <ReportCard
        title="Total Expenses"
        amount={summary.totalExpense}
        previousAmount={20300}
        percentage={3.1}
        type="expense"
      />
      <ReportCard
        title="Net Savings"
        amount={summary.balance}
        previousAmount={8900}
        percentage={12.5}
        type="savings"
      />
    </div>
  );
}
