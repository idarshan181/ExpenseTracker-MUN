/* eslint-disable react/no-array-index-key */
/* eslint-disable react-dom/no-missing-button-type */
import TransactionsInsight from '@/components/Dashboard/TransactionsInsight'; // Adjust the import path
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mocking the required components and hooks
jest.mock('@/components/Transactions/TransactionsColumns', () => ({
  TransactionColumns: ['Date', 'Description', 'Amount'], // Mocked columns
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>, // Mocked Button
}));

jest.mock('@/components/ui/card', () => ({
  Card: ({ children }: any) => <div>{children}</div>, // Mocked Card
  CardContent: ({ children }: any) => <div>{children}</div>, // Mocked CardContent
}));

// Mock useTransactions to return some transactions
jest.mock('@/hooks/useTransactions', () => ({
  useTransactions: jest.fn().mockReturnValue({
    data: [
      { date: '2023-04-01', description: 'Coffee', amount: 5 },
      { date: '2023-04-02', description: 'Lunch', amount: 12 },
    ],
    isLoading: false,
    refetch: jest.fn(),
  }),
}));

jest.mock('@/components/Transactions/AddTransactionDialog', () => ({
  __esModule: true,
  default: ({ isOpen }: any) => (
    isOpen ? <div>Transaction Dialog</div> : null
  ),
}));

jest.mock('@/components/Transactions/TransactionTable', () => ({
  TransactionTable: ({ columns, data }: any) => (
    <table>
      <thead>
        <tr>{columns.map((col: string) => <th key={col}>{col}</th>)}</tr>
      </thead>
      <tbody>
        {data.map((row: any, index: number) => (
          <tr key={index}>
            {Object.values(row).map((val: any, idx: number) => <td key={idx}>{val}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  ),
}));

describe('TransactionsInsight Component', () => {
  it('renders the "Recent Transactions" heading', () => {
    render(<TransactionsInsight />);

    expect(screen.getByText(/Recent Transactions/i)).toBeInTheDocument();
  });

  it('renders the "Add Transaction" button', () => {
    render(<TransactionsInsight />);
    const button = screen.getByRole('button', { name: /Add Transaction/i });

    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.getByText('Transaction Dialog')).toBeInTheDocument();
  });

  it('renders the TransactionTable component when transactions are available', () => {
    render(<TransactionsInsight />);

    // Check if the TransactionTable is rendered with the correct data
    expect(screen.getByText('Coffee')).toBeInTheDocument(); // Check if "Coffee" transaction is in the table
    expect(screen.getByText('Lunch')).toBeInTheDocument(); // Check if "Lunch" transaction is in the table
    expect(screen.getByText('5')).toBeInTheDocument(); // Check if amount "5" is displayed
    expect(screen.getByText('12')).toBeInTheDocument(); // Check if amount "12" is displayed
  });
});
