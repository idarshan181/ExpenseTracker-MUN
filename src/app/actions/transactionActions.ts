'use server';

import { requireUser } from '../utils/requireUser';

export const getTransactions = async (limit?: number) => {
  const user = await requireUser();
  const { backendToken } = user;

  try {
    const url
      = limit !== undefined
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/transactions/recent?limit=${limit}`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/transactions/recent`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${backendToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch recent transactions: ${response.statusText}`,
      );
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recent transactions:', error);
    return [];
  }
};
