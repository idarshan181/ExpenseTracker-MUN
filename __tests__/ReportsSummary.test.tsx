import Summary from '@/components/Reports/Summary';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

beforeAll(() => {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

jest.mock('@/hooks/useAnalytics', () => ({
  useOverallSummary: () => ({
    data: {
      totalIncome: 30000,
      totalExpense: 21000,
      balance: 9000,
    },
    isLoading: false,
    refetch: jest.fn(),
  }),
}));

describe('Summary unit tests', () => {
  it('renders the summary with correct data', () => {
    render(<Summary />);

    expect(screen.getByText('Total Income')).toBeInTheDocument();
    expect(screen.getByText('Total Expenses')).toBeInTheDocument();
    expect(screen.getByText('Net Savings')).toBeInTheDocument();
    expect(screen.getByText('CA$30,000')).toBeInTheDocument();
    expect(screen.getByText('CA$21,000')).toBeInTheDocument();
    expect(screen.getByText('CA$9,000')).toBeInTheDocument();
  });
});
