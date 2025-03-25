import TopSpendings from '@/components/Reports/TopSpendings';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

beforeAll(() => {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

jest.mock('@/app/utils/auth', () => ({}));
jest.mock('@/app/utils/requireUser', () => ({}));

jest.mock('@/app/utils/formatCurrency', () => ({
  formatCurrency: (currency: any, amount: any) =>
    `${currency} ${amount.toFixed(2)}`,
}));

jest.mock('@/hooks/useAnalytics', () => ({
  useTopSpendingByCategory: jest.fn(() => ({
    data: [
      {
        category: 'Rent',
        amount: 100,
        percentage: 100,
      },
    ],
    isLoading: false,
    refetch: jest.fn(),
  })),
}));

describe('TopSpendings unit tests', () => {
  it('displays spending data correctly', () => {
    render(<TopSpendings />);

    expect(screen.getByText('Rent')).toBeInTheDocument();
    expect(screen.getByText('CAD 100.00')).toBeInTheDocument();
    expect(screen.getByText('100.00% of total expenses')).toBeInTheDocument();
  });
});
