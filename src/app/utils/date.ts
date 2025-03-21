import { differenceInDays, differenceInMonths, differenceInYears } from 'date-fns';

/**
 * Calculates the period between two dates in a human-readable format.
 * @param startDate The start date.
 * @param endDate The end date.
 * @returns A string representing the period (e.g., "2 months", "1 year", "3 weeks").
 */
export function calculatePeriod(startDate: Date, endDate: Date): string {
  if (!startDate || !endDate || endDate <= startDate) {
    return 'Invalid period';
  }

  const years = differenceInYears(endDate, startDate);
  if (years >= 1) {
    return years === 1 ? '1 year' : `${years} years`;
  }

  const months = differenceInMonths(endDate, startDate);
  if (months >= 1) {
    return months === 1 ? '1 month' : `${months} months`;
  }

  const days = differenceInDays(endDate, startDate);
  if (days >= 14) {
    const weeks = Math.floor(days / 7);
    return weeks === 1 ? '1 week' : `${weeks} weeks`;
  }

  return days === 1 ? '1 day' : `${days} days`;
}
