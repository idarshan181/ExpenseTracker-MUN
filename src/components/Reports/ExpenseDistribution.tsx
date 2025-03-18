'use client';

import { expensesByCategory } from '@/app/data/mockData';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';

export default function ExpenseDistribution() {
  // const { data: spending, isLoading, refetch } = useSpendingByCategoriesQuery();
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
                data={expensesByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value" // Slightly increase outerRadius for spacing
              >
                {expensesByCategory.map(entry => (
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
