import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculatePercentageChange(current: number, previous: number) {
  if (previous === 0) {
    return 0;
  }
  return ((current - previous) / previous) * 100;
}
