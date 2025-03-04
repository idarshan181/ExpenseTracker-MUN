import { formatCurrency } from '@/app/utils/formatCurrency';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';

interface MonthlyOverviewProps {
  data: { totalBudget: number; totalSpent: number; remaining: number; activeBudgets: number; exceededBudgets: number; nearLimitBudgets: number };
}

export default function MonthlyOverview({ data }: MonthlyOverviewProps) {
  const progress = (data.totalSpent / data.totalBudget) * 100;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-500">Total Budget</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex items-center text-2xl font-semibold">
            {formatCurrency('CAD', data.totalBudget)}
            <span className="ml-2 text-sm text-muted-foreground">
              {' '}
              {' '}
              / month
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm">
            <p>
              Spent:
              {formatCurrency('CAD', data.totalSpent)}
            </p>
            <p className="text-green-500">
              Remaining:
              {formatCurrency('CAD', data.remaining)}
            </p>
          </div>

          <Progress className={cn('mt-4', '[&>*]:bg-blue-500')} value={progress} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="text-sm text-gray-500">Budget Status</CardTitle>
        </CardHeader>

        <CardContent className="pb-2">
          <div className="mt-3 flex items-center justify-between text-sm">
            <p>Active Budgets</p>
            <p className="text-lg font-bold">{data.activeBudgets}</p>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <p className="text-red-600">Exceeded Budgets</p>
            <p className="text-lg font-bold">{data.exceededBudgets}</p>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <p className="text-yellow-600">Near Limit</p>
            <p className="text-lg font-bold">{data.nearLimitBudgets}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-gray-500">Quick Actions</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="text-muted-foreground">
            <Button className="w-full justify-start" variant="ghost">
              Adjust Budget Limits
            </Button>
            <Button className="w-full justify-start" variant="ghost">
              Set Up Notifications
            </Button>
            <Button className="w-full justify-start" variant="ghost">
              View Spending Insights
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
