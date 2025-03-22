import ExpenseByCategory from '@/components/Dashboard/FinancialInsights/ExpenseByCategory'; // Adjust the import path
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mocking the necessary components and data
jest.mock('@/app/data/mockData', () => ({
  expensesByCategory: [
    { name: 'Food', value: 200, fill: '#ff8042' },
    { name: 'Transportation', value: 150, fill: '#ffbb28' },
    { name: 'Entertainment', value: 50, fill: '#00C49F' },
  ],
}));

jest.mock('@/app/utils/formatCurrency', () => ({
  formatCurrency: (currency: string, amount: number) => `${currency} ${amount.toFixed(2)}`,
}));

jest.mock('@/components/ui/chart', () => ({
  ChartContainer: ({ children }: any) => <div>{children}</div>,
  ChartTooltip: ({ children }: any) => <div>{children}</div>,
  ChartTooltipContent: ({ hideLabel }: any) => <div>{hideLabel ? 'Tooltip Hidden' : 'Tooltip Content'}</div>,
}));

// Mock Recharts components
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
  PieChart: ({ children }: any) => <div>{children}</div>,
  Pie: ({ children }: any) => <div>{children}</div>,
  Cell: ({ fill }: any) => <div style={{ backgroundColor: fill }}>Cell</div>,
  Label: ({ content }: any) => <div>{content ? content({ viewBox: { cx: 100, cy: 100 } }) : null}</div>,
  Legend: () => <div>Legend</div>,
}));

describe('ExpenseByCategory Component', () => {
  it('renders the Expense by Category section correctly', () => {
    render(<ExpenseByCategory />);

    // Check if the section header is rendered
    expect(screen.getByText(/Expense by Category/i)).toBeInTheDocument();
    expect(screen.getByText(/January - June 2024/i)).toBeInTheDocument();

    // Check if the Pie chart is rendered (mocked)
    expect(screen.getByText(/Legend/i)).toBeInTheDocument();

    // Check if the total expenses label is displayed correctly (mocked data)
    expect(screen.getByText(/CAD 400.00/)).toBeInTheDocument(); // Based on mocked data (200 + 150 + 50)

    // Check if the "Trending up" message is displayed
    expect(screen.getByText(/Trending up by 5.2% this month/i)).toBeInTheDocument();
    expect(screen.getByText(/Showing total expenses for the last 6 months/i)).toBeInTheDocument();
  });
});
