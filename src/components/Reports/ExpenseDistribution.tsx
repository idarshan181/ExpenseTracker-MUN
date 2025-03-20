'use client';

import { useSpendingByCategoriesQuery } from '@/hooks/useFinancialAnalytics';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';

export default function ExpenseDistribution() {
  const { data: spending, isLoading } = useSpendingByCategoriesQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!spending || spending.length === 0) {
    return null;
  }

  const formattedData = spending.map((entry: any) => ({
    name: entry.category,
    value: entry.amount,
    fill: getRandomColor(),
  }));

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

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
