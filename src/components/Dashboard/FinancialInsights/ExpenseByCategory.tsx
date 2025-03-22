'use client';

import { chartColors } from '@/app/data/chartColors';
import { formatCurrency } from '@/app/utils/formatCurrency';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import { useSpendingByCategories } from '@/hooks/useAnalytics';

import { TrendingUp } from 'lucide-react';
import { Key, useMemo } from 'react';
import { Cell, Label, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';

export default function ExpenseByCategory() {
  const { data: rawExpensesByCategory = [], isLoading } = useSpendingByCategories();
  const expensesByCategory = useMemo(() => {
    return rawExpensesByCategory.map((item: { category: string; amount: number; fill: string }, index: number) => ({
      name: item.category,
      value: item.amount,
      fill: chartColors[index % chartColors.length],
    }));
  }, [rawExpensesByCategory]);

  const totalExpenses = useMemo(() => {
    return expensesByCategory.reduce((acc: any, curr: { value: any }) => acc + curr.value, 0);
  }, [expensesByCategory]);

  if (isLoading) {
    return (
      <Card className="flex flex-col p-6">
        <CardHeader className="items-center pb-0">
          <Skeleton className="mb-2 h-5 w-40" />
          <Skeleton className="mb-6 h-4 w-32" />
        </CardHeader>
        <CardContent className="mx-auto w-full flex-1 pb-0">
          <div className="flex aspect-square max-h-[300px] w-full items-center justify-center">
            <Skeleton className="size-[200px] rounded-full" />
          </div>
        </CardContent>
        <CardFooter className="mt-4 flex-col gap-2 text-sm">
          <Skeleton className="mx-auto mb-1 h-4 w-52" />
          <Skeleton className="mx-auto h-4 w-64" />
        </CardFooter>
      </Card>
    );
  }
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Expense by Category</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="mx-auto w-full flex-1 pb-0">
        <ChartContainer
          config={{}}
          className="mx-auto aspect-square max-h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart className="w-full">
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={expensesByCategory}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                strokeWidth={40}
                outerRadius={90} // Slightly increase outerRadius for spacing
              >
                {expensesByCategory.map((entry: { name: Key | null | undefined; fill: string | undefined }) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                          <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-2xl font-bold">
                            {formatCurrency('CAD', totalExpenses)}
                          </tspan>
                          <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                            Expenses
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month
          {' '}
          <TrendingUp className="size-4" />
        </div>
        <div className="leading-none text-muted-foreground">Showing total expenses for the last 6 months</div>
      </CardFooter>
    </Card>
  );
}
