// src/app/utils/formatCurrency.ts

export const formatCurrency = (currency: string = 'CAD', amount: number): string => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};
