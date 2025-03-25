import MonthlyTrend from '@/components/Dashboard/FinancialInsights/MonthlyTrend';
import { useIncomeExpenseTrend } from '@/hooks/useAnalytics';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('@/hooks/useAnalytics', () => ({
  useIncomeExpenseTrend: jest.fn(),
}));

jest.mock('recharts', () => {
  const OriginalModule = jest.requireActual('recharts');
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
    LineChart: ({ children }: any) => <div data-testid="mock-chart">{children}</div>,
    Line: () => <div data-testid="line" />,
    XAxis: () => <div data-testid="x-axis" />,
    YAxis: () => <div data-testid="y-axis" />,
    CartesianGrid: () => <div data-testid="grid" />,
    Tooltip: () => <div data-testid="tooltip" />,
    Legend: () => <div data-testid="legend" />,
  };
});

describe('MonthlyTrend Component', () => {
  it('renders loading skeletons when data is loading', () => {
    (useIncomeExpenseTrend as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });

    const { container } = render(<MonthlyTrend />);
    const skeletons = container.querySelectorAll('.animate-pulse');

    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders chart and heading when data is loaded', () => {
    (useIncomeExpenseTrend as jest.Mock).mockReturnValue({
      data: [
        { month: 'Jan', income: 2000, expenses: 1500 },
        { month: 'Feb', income: 2200, expenses: 1600 },
      ],
      isLoading: false,
    });

    render(<MonthlyTrend />);

    expect(screen.getByText('Monthly Trend')).toBeInTheDocument();
    expect(screen.getByTestId('mock-chart')).toBeInTheDocument();
    expect(screen.getAllByTestId('line').length).toBe(2);
  });
});
