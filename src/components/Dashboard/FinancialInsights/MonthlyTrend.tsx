'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import { useIncomeExpenseTrend } from '@/hooks/useAnalytics';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function MonthlyTrend() {
  const { data: monthlyTrend, isLoading } = useIncomeExpenseTrend();

  if (isLoading) {
    return (
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <Skeleton className="mb-2 h-5 w-40" />
        </CardHeader>
        <CardContent className="mx-auto w-full flex-1 pb-0">
          <div className="flex aspect-square max-h-[350px] w-full items-center justify-center">
            <Skeleton className="h-[300px] w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Monthly Trend</CardTitle>
      </CardHeader>
      <CardContent className="mx-auto w-full flex-1 pb-0">
        <ChartContainer
          config={{}}
          className="mx-auto aspect-square max-h-[350px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#0088FE" />
              <Line type="monotone" dataKey="expenses" stroke="#FF8042" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
