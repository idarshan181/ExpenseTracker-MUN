import ReportClient from '@/components/Reports/ReportClient';
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
  }),
  useSpendingByCategories: () => ({
    data: [
      { category: 'Rent', amount: 1000 },
      { category: 'Groceries', amount: 500 },
    ],
    isLoading: false,
  }),
  useTopSpendingByCategory: () => ({
    data: [
      { category: 'Rent', amount: 1000, percentage: 60 },
      { category: 'Groceries', amount: 500, percentage: 40 },
    ],
    isLoading: false,
  }),
}));

jest.mock('@/components/Reports/IncomeExpenseTrend', () => () => (
  <div data-testid="income-expense-trend">IncomeExpenseTrend Component</div>
));

describe('ReportClient Integration Test', () => {
  it('renders all report sections correctly ', () => {
    render(<ReportClient />);

    // Check Summary component
    expect(screen.getByText('Total Income')).toBeInTheDocument();
    expect(screen.getByText('Total Expenses')).toBeInTheDocument();
    expect(screen.getByText('Net Savings')).toBeInTheDocument();
    expect(screen.getByText('CA$30,000')).toBeInTheDocument();
    expect(screen.getByText('CA$21,000')).toBeInTheDocument();
    expect(screen.getByText('CA$9,000')).toBeInTheDocument();

    // Check IncomeExpenseTrend component (mocked)
    expect(screen.getByTestId('income-expense-trend')).toBeInTheDocument();

    // Check ExpenseDistribution component
    expect(screen.getByText('Expense Distribution')).toBeInTheDocument();
    expect(screen.getByText('Rent')).toBeInTheDocument();
    expect(screen.getByText('Groceries')).toBeInTheDocument();
  });
});
