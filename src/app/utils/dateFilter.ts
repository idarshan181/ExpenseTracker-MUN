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
  dateKey: keyof T,
): T[] => {
  if (!dateRange?.from && !dateRange?.to) {
    return data;
  } // No filter applied

  return data.filter((item) => {
    const dateValue = item[dateKey];
    if (!dateValue) {
      return false;
    }

    // Convert to Date object and normalize to the start of the day
    const transactionDate = new Date(dateValue);
    transactionDate.setHours(0, 0, 0, 0); // Normalize time

    if (Number.isNaN(transactionDate.getTime())) {
      return false;
    }

    // Normalize dateRange values
    const fromDate = dateRange.from ? new Date(dateRange.from) : null;
    const toDate = dateRange.to ? new Date(dateRange.to) : null;

    if (fromDate) {
      fromDate.setHours(0, 0, 0, 0);
    }
    if (toDate) {
      toDate.setHours(23, 59, 59, 999);
    } // Include entire day

    return (
      (!fromDate || transactionDate >= fromDate)
      && (!toDate || transactionDate <= toDate)
    );
  });
};
