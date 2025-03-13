'use server';

import { requireUser } from '../utils/requireUser';

export const fetchCategoriesById = async () => {
  const user = await requireUser();
  const { backendToken } = user;

  if (!backendToken) {
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/categories/`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${backendToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};
