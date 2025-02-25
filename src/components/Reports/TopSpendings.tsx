import { topSpending } from '@/app/data/mockData';
import { formatCurrency } from '@/app/utils/formatCurrency';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function TopSpendings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold">Top Spendings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {topSpending.map(category => (
          <div key={category.category} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="size-12 items-center justify-center">
                <AvatarFallback className="text-lg font-semibold">{category.category[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{category.category}</p>
                <p className="text-sm text-gray-500">
                  {category.percentage}
                  % of total expenses
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">{formatCurrency('CAD', category.amount)}</p>
              <p className={`flex items-center justify-end text-sm ${
                category.trend === 'up' ? 'text-red-500' : 'text-green-500'
              }`}
              >
                {category.trend === 'up'
                  ? (
                      <TrendingUp className="mr-1 size-4" />
                    )
                  : (
                      <TrendingDown className="mr-1 size-4" />
                    )}
                vs last period
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
