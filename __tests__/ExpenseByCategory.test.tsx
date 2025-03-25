import ExpenseByCategory from '@/components/Dashboard/FinancialInsights/ExpenseByCategory';
import { useSpendingByCategories } from '@/hooks/useAnalytics';

import { render, screen } from '@testing-library/react';

jest.mock('@/hooks/useAnalytics', () => ({
  useSpendingByCategories: jest.fn(),
}));

jest.mock('recharts', () => {
  const original = jest.requireActual('recharts');
  return {
    ...original,
    ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
  };
});

jest.mock('@/components/ui/chart', () => ({
  ChartContainer: ({ children }: any) => <div data-testid="chart-container">{children}</div>,
  ChartTooltip: () => <div data-testid="chart-tooltip" />,
  ChartTooltipContent: () => <div data-testid="chart-tooltip-content" />,
}));

jest.mock('lucide-react', () => ({
  TrendingUp: () => <svg data-testid="trending-up-icon" />,
}));

describe('ExpenseByCategory', () => {
  it('renders pie chart and content when data is available', () => {
    (useSpendingByCategories as jest.Mock).mockReturnValue({
      data: [
        { category: 'Food', amount: 300, fill: '#FF0000' },
        { category: 'Transport', amount: 200, fill: '#00FF00' },
      ],
      isLoading: false,
      isSuccess: true,
    });

    render(<ExpenseByCategory />);

    expect(screen.getByText(/Expense by Category/i)).toBeInTheDocument();
    expect(screen.getByText(/January - June 2024/i)).toBeInTheDocument();
    expect(screen.getByTestId('chart-container')).toBeInTheDocument();

    expect(screen.getByTestId('trending-up-icon')).toBeInTheDocument();
    expect(screen.getByText(/Trending up by 5.2% this month/i)).toBeInTheDocument();
    expect(screen.getByText(/Showing total expenses for the last 6 months/i)).toBeInTheDocument();
  });
});
