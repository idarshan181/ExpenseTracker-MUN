import { formatCurrency } from '@/app/utils/formatCurrency';
import { cn } from '@/lib/utils';
import { BarChart, LineChart, PieChart, TrendingDown, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

interface ReportCardProps {
  title: string;
  amount: number;
  previousAmount?: number;
  percentage?: number;
  type: 'income' | 'expense' | 'balance' | 'savings';
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'income':
      return <LineChart className="size-5 text-blue-600" />;
    case 'expense':
      return <BarChart className="size-5 text-red-600" />;
    case 'balance':
    case 'savings':
      return <PieChart className="size-5 text-green-600" />;
    default:
      return null;
  }
};

export default function ReportCard({ title, amount, previousAmount, percentage, type }: ReportCardProps) {
  const change = previousAmount ? ((amount - previousAmount) / previousAmount) * 100 : 0;
  const isPositive = change >= 0;

  return (
    <Card className="rounded-xl px-5 pt-5 shadow-sm">
      <CardContent className="flex items-center justify-between">
        {/* Left Content */}
        <div>
          <p className="text-sm ">{title}</p>
          <p className="text-3xl font-bold">{formatCurrency('CAD', amount)}</p>

          {previousAmount !== undefined && (
            <div className="mt-2 flex items-center">
              {isPositive
                ? (
                    <TrendingUp className="mr-1 size-4 text-green-500" />
                  )
                : (
                    <TrendingDown className="mr-1 size-4 text-red-500" />
                  )}
              <span className={cn('text-sm font-medium', isPositive ? 'text-green-500' : 'text-red-500')}>
                {Math.abs(change).toFixed(1)}
                % vs last period
              </span>
            </div>
          )}

          {percentage !== undefined && (
            <p className="mt-1 text-sm">
              {percentage.toFixed(1)}
              % of income
            </p>
          )}
        </div>

        {/* Right Icon */}
        <div
          className="flex size-14 items-center justify-center rounded-full"
          style={{ backgroundColor: type === 'income' ? '#EBF5FF' : type === 'expense' ? '#FCE8E8' : '#E8F5E9' }}
        >
          {getTypeIcon(type)}
        </div>
      </CardContent>
    </Card>
  );
}
