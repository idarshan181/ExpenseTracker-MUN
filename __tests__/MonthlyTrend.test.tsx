import MonthlyTrend from '@/components/Dashboard/FinancialInsights/MonthlyTrend'; // Adjust the import path based on your project structure
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mocking the necessary components and data
jest.mock('@/app/data/mockData', () => ({
  monthlyTrend: [
    { month: 'January', income: 5000, expenses: 3000 },
    { month: 'February', income: 4500, expenses: 2500 },
    { month: 'March', income: 6000, expenses: 3500 },
    { month: 'April', income: 5500, expenses: 2800 },
  ],
}));

jest.mock('@/components/ui/chart', () => ({
  ChartContainer: ({ children }: any) => <div>{children}</div>, // Mocking ChartContainer
}));

jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
  LineChart: ({ children }: any) => <div>{children}</div>,
  CartesianGrid: () => <div>CartesianGrid</div>,
  XAxis: () => <div>X-Axis</div>,
  YAxis: () => <div>Y-Axis</div>,
  Tooltip: () => <div>Tooltip</div>,
  Legend: () => <div>Legend</div>,
  Line: ({ dataKey }: any) => (
    <div>
      {dataKey}
      {' '}
      Line
    </div>
  ),
}));

describe('MonthlyTrend Component', () => {
  it('renders the Monthly Trend section correctly', () => {
    render(<MonthlyTrend />);

    // Check if the section header is rendered
    expect(screen.getByText(/Monthly Trend/i)).toBeInTheDocument();

    // Check if the line chart components are rendered
    expect(screen.getByText(/CartesianGrid/i)).toBeInTheDocument();
    expect(screen.getByText(/X-Axis/i)).toBeInTheDocument();
    expect(screen.getByText(/Y-Axis/i)).toBeInTheDocument();
    expect(screen.getByText(/Tooltip/i)).toBeInTheDocument();
    expect(screen.getByText(/Legend/i)).toBeInTheDocument();

    // Check if the lines for 'income' and 'expenses' are rendered
    expect(screen.getByText(/income Line/i)).toBeInTheDocument();
    expect(screen.getByText(/expenses Line/i)).toBeInTheDocument();
  });
});
