import BudgetsClient from '@/components/Budgets/BudgetsClient';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// ✅ Mock everything server-related or complex
jest.mock('@/components/Budgets/AddBudgetDialog', () => () => <div>AddBudgetDialog</div>);
jest.mock('@/components/Budgets/MonthlyOverview', () => () => <div>Monthly Overview</div>);
jest.mock('@/components/Budgets/BudgetCard', () => () => <div>Budget Card</div>);
jest.mock('@/components/Budgets/BudgetTable', () => () => <div>Budget Table</div>);

jest.mock('@/hooks/useBudgets', () => ({
  useBudgets: () => ({
    data: [
      {
        id: '1',
        amount: 1000,
        categoryId: 'cat1',
        category: { name: 'Food' },
      },
    ],
    isLoading: false,
    refetch: jest.fn(),
  }),
}));

jest.mock('@/hooks/useTransactions', () => ({
  useTransactions: () => ({
    data: [
      {
        id: 'txn1',
        amount: 200,
        categoryId: 'cat1',
        transactionType: 'expense',
      },
    ],
  }),
}));

// ✅ Safe test
describe('BudgetsClient UI - Safe Smoke Test', () => {
  it('renders without crashing', () => {
    render(<BudgetsClient />);

    expect(screen.getByText('Budget Management')).toBeInTheDocument();
    expect(screen.getByText('Create Budget')).toBeInTheDocument();
    expect(screen.getByText('Monthly Overview')).toBeInTheDocument();
    expect(screen.getByText('Budget Table')).toBeInTheDocument();
    expect(screen.getByText('Budget Card')).toBeInTheDocument();
    expect(screen.getByText('AddBudgetDialog')).toBeInTheDocument();
  });
});
