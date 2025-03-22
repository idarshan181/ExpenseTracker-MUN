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

  // Determine color for title and value
  const getColor = () => {
    if (type === 'income') {
      return 'text-green-600';
    }
    if (type === 'expense') {
      return 'text-red-600';
    }
    if ((type === 'balance' || type === 'savings') && amount > 0) {
      return 'text-green-600';
    }
    return 'text-red-600';
  };

  const textColor = getColor();

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className={cn('text-sm font-medium')}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline">
          <p className={cn('text-2xl font-semibold', textColor)}>
            {formatCurrency('CAD', amount)}
          </p>
          {previousAmount !== undefined && (
            <p
              className={cn(
                'ml-2 flex items-baseline text-sm font-semibold',
                type === 'income' || change >= 0
                  ? 'text-green-600'
                  : 'text-red-600',
              )}
            >
              {change >= 0
                ? (
                    <TrendingUp className="mr-1 size-4" />
                  )
                : (
                    <TrendingDown className="mr-1 size-4" />
                  )}
              {Math.abs(change).toFixed(1)}
              %
            </p>
          )}
        </div>
        {percentage !== undefined && (
          <div className="mt-1">
            <span
              className={cn(
                'text-sm',
                percentage >= 10 ? 'text-primary' : 'text-destructive',
              )}
            >
              {percentage.toFixed(1)}
              % of income
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
