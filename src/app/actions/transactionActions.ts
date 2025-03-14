'use server';

import { auth } from '../utils/auth';
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

export async function deleteTransaction(transactionId: number) {
  const session = await auth();

  if (!session?.user?.backendToken) {
    return { error: 'Unauthorized' };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/transactions/${transactionId}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session.user.backendToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Failed to delete transaction: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    console.error('Error deleting link:', error);
    return { error: 'Failed to delete link' };
  }
}
