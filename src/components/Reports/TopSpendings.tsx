'use client';

import { formatCurrency } from '@/app/utils/formatCurrency';
import { useTopSpendingByCategory } from '@/hooks/useTopSpendingByCategory';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function TopSpendings() {
  const { data: spending } = useTopSpendingByCategory();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold">Top Spendings</CardTitle>
      </CardHeader>
      {spending?.length > 0
        ? (
            <CardContent className="space-y-4">
              {spending.map((category: any) => (
                <div
                  key={category.category}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar className="size-12 items-center justify-center">
                      <AvatarFallback className="text-lg font-semibold">
                        {category.category[0]}
                      </AvatarFallback>
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
                    <p className="font-semibold">
                      {formatCurrency('CAD', category.amount)}
                    </p>
                    <p
                      className={`flex items-center justify-end text-sm ${
                        category.percentage > 50 ? 'text-red-500' : 'text-green-500'
                      }`}
                    >
                      {category.percentage > 50
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
          )
        : (
            <p>Sorry no spending data yet</p>
          )}
    </Card>
  );
}
