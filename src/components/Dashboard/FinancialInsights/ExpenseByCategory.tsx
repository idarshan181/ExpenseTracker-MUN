'use client';

import { expensesByCategory } from '@/app/data/mockData';
import { formatCurrency } from '@/app/utils/formatCurrency';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

import { TrendingUp } from 'lucide-react';
import * as React from 'react';
import { Cell, Label, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';

export default function ExpenseByCategory() {
  const totalExpenses = React.useMemo(() => {
    return expensesByCategory.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

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
                {expensesByCategory.map(entry => (
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
