'use client';

import { useSpendingTrendQuery } from '@/hooks/useSpendingTrend';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ChartContainer } from '../ui/chart';

export default function IncomeExpenseTrend() {
  const { data: trend, isLoading } = useSpendingTrendQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!trend || trend.length === 0) {
    return null;
  }

  const formattedTrend = trend.map((item: any) => ({
    ...item,
    savings: item.income - item.expense,
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="self-start text-lg font-bold">
          Income vs Expenses Trend
        </CardTitle>
      </CardHeader>
      <CardContent className="mx-auto w-full flex-1 pb-0 pt-4">
        <ChartContainer
          config={{}}
          className="mx-auto aspect-square max-h-[350px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#0088FE"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#FF8042"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="savings"
                stroke="#82ca9d"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
