'use server';

import { signOut } from './utils/auth';

export const handleSignOut = async () => {
  await signOut({ redirectTo: '/' });
};

export const fetchCategoriesById = async () => {
  // const user = await requireUser();
  // const { backendToken } = user;

  const categories = [
    { id: 1, name: 'Food', isDefault: true },
    { id: 2, name: 'Transportation', isDefault: true },
    { id: 3, name: 'Housing', isDefault: true },
    { id: 4, name: 'Utilities', isDefault: true },
    { id: 5, name: 'Insurance', isDefault: true },
    { id: 6, name: 'Debt Repayment', isDefault: true },
    { id: 7, name: 'Entertainment', isDefault: true },
    { id: 8, name: 'Miscellaneous', isDefault: true },
  ];

  const response = {
    categories,
    success: true,
  };
  return response;
};
