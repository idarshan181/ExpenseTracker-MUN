'use server';

import { requireUser } from '../utils/requireUser';

export const fetchBudgets = async () => {
  const user = await requireUser();
  const { backendToken } = user;

  if (!backendToken) {
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/budget/`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${backendToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch budgets: ${response.statusText}`);
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching budgets:', error);
    return [];
  }
};

// write deleteCategoryById function here
export const deleteBudgetById = async (budgetId: number) => {
  const user = await requireUser();
  const { backendToken } = user;

  if (!backendToken) {
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/budget/${budgetId}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${backendToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to delete budget: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    console.error('Error deleting budget:', error);
    return { error: 'Failed to delete budget' };
  }
};
