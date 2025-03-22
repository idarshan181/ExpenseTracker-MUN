'use server';

import { format } from 'date-fns';
import { requireUser } from '../utils/requireUser';

export const fetchSpendingByCategory = async () => {
  const user = await requireUser();
  const { backendToken } = user;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/finance/expense-by-category`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${backendToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch fetchSpendingByCategory: ${response.statusText}`);
    }

    const { data } = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching spending by category:', error);
    return [];
  }
};

export const fetchMonthlySummary = async (month?: string) => {
  const user = await requireUser();
  const { backendToken } = user;

  const targetMonth = month || format(new Date(), 'yyyy-MM');

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/finance/monthly-summary/${targetMonth}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${backendToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch monthly summary: ${response.statusText}`);
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching monthly summary:', error);
    return null;
  }
};

export const fetchOverallSummary = async () => {
  const user = await requireUser();
  const { backendToken } = user;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/finance/overall-summary`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${backendToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch overall summary: ${response.statusText}`);
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching overall summary:', error);
    return [];
  }
};

export const fetchTopSpendingByCategory = async () => {
  const user = await requireUser();
  const { backendToken } = user;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/finance/top-spending-by-category`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${backendToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch top spending categories: ${response.statusText}`);
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching top spending categories:', error);
    return [];
  }
};

export const fetchIncomeExpenseTrend = async () => {
  const user = await requireUser();
  const { backendToken } = user;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/finance/income-expense-trend`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${backendToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch income expense trend: ${response.statusText}`);
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching income expense trend:', error);
    return [];
  }
};
