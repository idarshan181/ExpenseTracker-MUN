import BudgetsClient from '@/components/Budgets/BudgetsClient';
import { useBudgets } from '@/hooks/useBudgets';
import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('@/hooks/useBudgets');
jest.mock('@/components/Budgets/MonthlyOverview', () => () => <div>MonthlyOverviewMock</div>);
jest.mock('@/components/Budgets/BudgetCard', () => ({ budget }: any) => (
  <div>
    BudgetCardMock -
    {budget.name}
  </div>
));
jest.mock('./AddBudgetDialog', () => ({ isOpen }: any) => (
  isOpen ? <div data-testid="dialog">AddBudgetDialogMock</div> : null
));
jest.mock('./BudgetTable', () => () => <div>BudgetTableMock</div>);

// Mock budgetCard data
jest.mock('@/app/data/mockData', () => ({
  budgetCard: [
    { id: 1, name: 'Groceries' },
    { id: 2, name: 'Rent' },
  ],
}));

describe('BudgetsClient', () => {
  const mockRefetch = jest.fn();

  it('renders loading state initially', () => {
    (useBudgets as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
      refetch: mockRefetch,
    });

    render(<BudgetsClient />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders main content when data is loaded', () => {
    (useBudgets as jest.Mock).mockReturnValue({
      data: [{ id: 1, name: 'Test Budget' }],
      isLoading: false,
      refetch: mockRefetch,
    });

    render(<BudgetsClient />);

    expect(screen.getByText('Budget Management')).toBeInTheDocument();
    expect(screen.getByText('Create Budget')).toBeInTheDocument();
    expect(screen.getByText('MonthlyOverviewMock')).toBeInTheDocument();
    expect(screen.getByText('BudgetTableMock')).toBeInTheDocument();
    expect(screen.getByText('BudgetCardMock - Groceries')).toBeInTheDocument();
    expect(screen.getByText('BudgetCardMock - Rent')).toBeInTheDocument();
  });

  it('opens AddBudgetDialog on button click', () => {
    (useBudgets as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      refetch: mockRefetch,
    });

    render(<BudgetsClient />);
    const button = screen.getByText('Create Budget');
    fireEvent.click(button);

    expect(screen.getByTestId('dialog')).toBeInTheDocument();
  });
});
