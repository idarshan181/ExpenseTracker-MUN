import { DateRange } from 'react-day-picker';

/**
 * Filters an array of objects based on a date range.
 *
 * @param data - The array of objects to filter.
 * @param dateRange - The selected date range (from & to).
 * @param dateKey - The key in the object that contains the date.
 * @returns A filtered array of objects within the selected date range.
 */
export const applyDateFilter = <T extends Record<string, any>>(
  data: T[],
  dateRange: DateRange | undefined,
  dateKey: keyof T, // Allow dynamic date key selection
): T[] => {
  if (!dateRange?.from && !dateRange?.to) {
    return data;
  } // No filter applied

  return data.filter((item) => {
    const dateValue = item[dateKey];
    if (!dateValue) {
      return false;
    }

    const transactionDate = new Date(dateValue); // Convert to Date object
    if (Number.isNaN(transactionDate.getTime())) {
      return false;
    }

    return (
      (!dateRange.from || transactionDate >= dateRange.from)
      && (!dateRange.to || transactionDate <= dateRange.to)
    );
  });
};
