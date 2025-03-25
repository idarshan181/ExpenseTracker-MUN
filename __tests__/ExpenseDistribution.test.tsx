import ExpenseDistribution from '@/components/Reports/ExpenseDistribution';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

beforeAll(() => {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

//  Mock backend-related modules to avoid ESM issues
jest.mock('@/app/utils/auth', () => ({}));
jest.mock('@/app/utils/requireUser', () => ({}));

jest.mock('@/hooks/useAnalytics', () => ({
  useSpendingByCategories: () => ({
    data: [{ category: 'Food', amount: 200, month: '2025-03' }],
    isLoading: false,
    refetch: jest.fn(),
  }),
}));

describe('Expense Distribution unit tests', () => {
  it('renders Expense ditribution', () => {
    render(<ExpenseDistribution />);

    expect(screen.getByText('Expense Distribution')).toBeInTheDocument();
  });
});
