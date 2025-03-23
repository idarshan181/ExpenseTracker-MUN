import BudgetsClient from '@/components/Budgets/BudgetsClient';
import { fireEvent, render, screen } from '@testing-library/react';

//  Mock custom hook
jest.mock('@/hooks/useBudgets', () => ({
  useBudgets: () => ({
    data: [
      { id: 1, name: 'Rent', amount: 1000 },
      { id: 2, name: 'Groceries', amount: 500 },
    ],
    isLoading: false,
    refetch: jest.fn(),
  }),
}));

//  Mock backend-related modules to avoid ESM issues
jest.mock('@/app/utils/auth', () => ({}));
jest.mock('@/app/utils/requireUser', () => ({}));
jest.mock('@/app/actions/budgetActions', () => ({
  deleteBudget: jest.fn(),
}));

// Mock deeply nested components to isolate frontend UI
jest.mock('@/components/Budgets/DeleteBudgetButton', () => () => <div>MockDeleteButton</div>);
jest.mock('@/components/Budgets/BudgetColumn', () => ({
  BudgetColumn: [],
}));

// Mock static data used inside BudgetsClient
jest.mock('@/app/data/mockData', () => ({
  budgetCard: [
    { id: 1, name: 'Rent' },
    { id: 2, name: 'Groceries' },
  ],
}));

//  Mock child components
jest.mock('@/components/Budgets/AddBudgetDialog', () => ({
  __esModule: true,
  default: ({ isOpen }: any) => (isOpen ? <div data-testid="budget-dialog">Dialog Open</div> : null),
}));

jest.mock('@/components/Budgets/BudgetCard', () => ({ budget }: any) => (
  <div>
    MockBudgetCard -
    {budget.name}
  </div>
));

jest.mock('@/components/Budgets/MonthlyOverview', () => () => <div>MockMonthlyOverview</div>);
jest.mock('@/components/Budgets/BudgetTable', () => ({
  __esModule: true,
  BudgetTable: () => <div>MockBudgetTable</div>,
}));

// ✅ Test cases
describe('BudgetsClient (Frontend UI only)', () => {
  it('renders title, overview, table, and budget cards', () => {
    render(<BudgetsClient />);

    expect(screen.getByText('Budget Management')).toBeInTheDocument();
    expect(screen.getByText('Create Budget')).toBeInTheDocument();
    expect(screen.getByText('MockMonthlyOverview')).toBeInTheDocument();
    expect(screen.getByText('MockBudgetTable')).toBeInTheDocument();
    expect(screen.getByText(/MockBudgetCard -\s*Rent/i)).toBeInTheDocument();

    expect(screen.getByText(/MockBudgetCard -\s*Groceries/i)).toBeInTheDocument();
  });

  it('opens AddBudgetDialog when Create Budget is clicked', () => {
    render(<BudgetsClient />);
    const button = screen.getByText('Create Budget');
    fireEvent.click(button);

    expect(screen.getByTestId('budget-dialog')).toBeInTheDocument();
  });
});
