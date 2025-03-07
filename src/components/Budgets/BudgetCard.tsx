import { formatCurrency } from '@/app/utils/formatCurrency';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';

interface BudgetCardProps {
  budget: { category: string; spent: number; limit: number; transactions: number; remaining: number };
}

export default function BudgetCard({ budget }: BudgetCardProps) {
  const progress = Math.round((budget.spent / budget.limit) * 100);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{budget.category}</CardTitle>
        <CardDescription>
          {budget.transactions}
          {' '}
          transactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm ">
              <p className="text-muted-foreground">Progress</p>
              <p className="font-bold">
                {progress}
                %
              </p>
            </div>
            <Progress
              className={cn(
                progress <= 80
                  ? '[&>*]:bg-green-500'
                  : progress < 100
                    ? '[&>*]:bg-yellow-500'
                    : '[&>*]:bg-red-500',
              )}
              value={progress}
            />
          </div>

          <div className="flex justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Spent</p>
              <p className={cn('text-sm font-bold')}>{formatCurrency('CAD', budget.spent)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Remaining</p>
              <p className={cn('text-sm text-end font-bold', budget.remaining < 0 ? 'text-red-500' : 'text-green-500')}>{formatCurrency('CAD', budget.remaining)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
