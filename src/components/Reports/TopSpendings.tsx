'use client';

import { formatCurrency } from '@/app/utils/formatCurrency';
import { useTopSpendingByCategory } from '@/hooks/useAnalytics';
import { TrendingDown, TrendingUp } from 'lucide-react';
import EmptyState from '../general/EmptyState';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export default function TopSpendings() {
  const { data: spending, isLoading } = useTopSpendingByCategory();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold">Top Spendings</CardTitle>
      </CardHeader>

      {/* Skeleton while loading */}
      {isLoading
        ? (
            <CardContent className="space-y-4">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="flex items-center justify-between space-x-4"
                >
                  <div className="flex items-center space-x-4">
                    <Skeleton className="size-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <div className="space-y-2 text-right">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))}
            </CardContent>
          )
        : spending?.length > 0
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
                          {category.percentage.toFixed(2)}
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
              <CardContent className="flex h-[200px] items-center justify-center">
                <EmptyState message="No spending data available" />
              </CardContent>
            )}
    </Card>
  );
}
