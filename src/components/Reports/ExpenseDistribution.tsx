'use client';

import { chartColors } from '@/app/data/chartColors';
import { useSpendingByCategories } from '@/hooks/useAnalytics';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';
import EmptyState from '../general/EmptyState';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { Skeleton } from '../ui/skeleton';

function getCustomColor(index: number) {
  // fallback color in HSL
  const hue = (index * 137) % 360; // Golden angle for variety
  return `hsl(${hue} 60% 60%)`;
}

export default function ExpenseDistribution() {
  const { data: spending, isLoading } = useSpendingByCategories();

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="items-start">
          <CardTitle className="text-lg font-bold">
            Expense Distribution
          </CardTitle>
        </CardHeader>
        <CardContent className="flex aspect-square max-h-[300px] w-full items-center justify-center">
          <Skeleton className="size-[240px] rounded-full" />
        </CardContent>
      </Card>
    );
  }
  if (!spending || spending.length === 0) {
    return (
      <Card>
        <CardHeader className="items-start">
          <CardTitle className="text-lg font-bold">
            Expense Distribution
          </CardTitle>
        </CardHeader>
        <CardContent className="flex h-[300px] items-center justify-center text-muted-foreground">
          <EmptyState message="No expense data available for this period." />
        </CardContent>
      </Card>
    );
  }

  const formattedData = spending.map(
    (entry: { category: any; amount: any }, index: number) => ({
      name: entry.category,
      value: entry.amount,
      fill: chartColors[index] || getCustomColor(index),
    }),
  );

  return (
    <Card>
      <CardHeader className="items-start">
        <CardTitle className="text-lg font-bold">
          Expense Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="mx-auto w-full flex-1 pb-0">
        <ChartContainer
          config={{}}
          className="mx-auto aspect-square max-h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart className="w-full">
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={formattedData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {formattedData.map((entry: any) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
