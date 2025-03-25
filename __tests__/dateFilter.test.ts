import { applyDateFilter } from '@/app/utils/dateFilter';

describe('applyDateFilter', () => {
  const mockData = [
    { id: 1, date: '2025-03-23' },
    { id: 2, date: '2025-03-24' },
    { id: 3, date: '2025-03-25' },
    { id: 4, date: '2025-03-26' },
  ];

  it('returns all data if dateRange is undefined', () => {
    const result = applyDateFilter(mockData, undefined, 'date');

    expect(result).toHaveLength(4);
  });

  it('filters data within a valid date range', () => {
    const dateRange = {
      from: new Date('2025-03-24'),
      to: new Date('2025-03-25'),
    };
    const result = applyDateFilter(mockData, dateRange, 'date');

    expect(result).toEqual([
      { id: 2, date: '2025-03-24' },
      { id: 3, date: '2025-03-25' },
    ]);
  });

  it('filters with only "from" date', () => {
    const dateRange = {
      from: new Date('2025-03-25'),
      to: undefined,
    };
    const result = applyDateFilter(mockData, dateRange, 'date');

    expect(result).toEqual([
      { id: 3, date: '2025-03-25' },
      { id: 4, date: '2025-03-26' },
    ]);
  });

  it('filters with only "to" date', () => {
    const dateRange = {
      from: undefined,
      to: new Date('2025-03-24'),
    };
    const result = applyDateFilter(mockData, dateRange, 'date');

    expect(result).toEqual([
      { id: 1, date: '2025-03-23' },
      { id: 2, date: '2025-03-24' },
    ]);
  });

  it('returns empty array for invalid date format', () => {
    const result = applyDateFilter([{ id: 5, date: 'invalid-date' }], {
      from: new Date('2025-03-20'),
      to: new Date('2025-03-30'),
    }, 'date');

    expect(result).toEqual([]);
  });
});
