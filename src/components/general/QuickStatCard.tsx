/* eslint-disable unused-imports/no-unused-vars */
import { formatCurrency } from '@/app/utils/formatCurrency';
import { cn } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function QuickStatCard({
  title,
  amount,
  previousAmount,
  percentage,
  type,
}: {
  title: string;
  amount: number;
  previousAmount?: number;
  percentage?: number;
  type: 'income' | 'expense' | 'balance' | 'savings';
}) {
  const change = previousAmount
    ? ((amount - previousAmount) / previousAmount) * 100
    : 0;

  return (

    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline">
          <p className="text-2xl font-semibold">{formatCurrency('CAD', amount)}</p>
          {previousAmount && (
            <p className={cn('ml-2 flex items-baseline text-sm font-semibold', change >= 0 ? 'text-green-600' : 'text-red-600')}>
              {change >= 0 ? <TrendingUp className="mr-1 size-4" /> : <TrendingDown className="mr-1 size-4" />}
              {Math.abs(change).toFixed(1)}
              %
            </p>
          )}
        </div>
        {percentage !== undefined && (
          <div className="mt-1">
            <span className={cn('text-sm', percentage >= 10 ? 'text-primary' : 'text-destructive')}>
              {percentage.toFixed(1)}
              % of income
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
