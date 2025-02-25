// src/app/utils/formatCurrency.ts

export const formatCurrency = (currency: string = 'CAD', amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};
