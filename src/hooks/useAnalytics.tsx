'use client';

import { getIncomeExpenseTrendQuery, getSpendingsQuery, getTopSpendingByCategoryQuery, monthlySummaryQuery, overallSummaryQuery } from '@/query/financialAnalytics';
import { useQuery } from '@tanstack/react-query';

export function useSpendingByCategories() {
  const categoriesSpendingQuery = getSpendingsQuery();
  return useQuery(categoriesSpendingQuery);
}

export function useTopSpendingByCategory() {
  const topSpendingByCategoryQuery = getTopSpendingByCategoryQuery();
  return useQuery(topSpendingByCategoryQuery);
}

export function useOverallSummary() {
  const overallSpending = overallSummaryQuery();
  return useQuery(overallSpending);
}

export function useMonthlySummary(month?: string) {
  const monthlySummary = monthlySummaryQuery(month);
  return useQuery(monthlySummary);
}

export function useIncomeExpenseTrend() {
  const incomeExpenseTrend = getIncomeExpenseTrendQuery();
  return useQuery(incomeExpenseTrend);
}
