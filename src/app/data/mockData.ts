import { Transaction } from '@/components/Dashboard/TransactionsInsights/columns';

// Mock data
const monthlyStats = {
  income: 5200,
  previousIncome: 4800,
  expenses: 3100,
  previousExpenses: 3400,
  balance: 2100,
  savings: 800,
};

const recentTransactions: Transaction[] = [
  {
    id: 1,
    date: '2024-03-15',
    description: 'Grocery Shopping',
    category: 'Food',
    amount: -120.50,
    method: 'Credit Card',
    status: 'completed',
  },
  {
    id: 2,
    date: '2024-03-14',
    description: 'Salary Deposit',
    category: 'Income',
    amount: 3200.00,
    method: 'Bank Transfer',
    status: 'completed',
  },
];

const expensesByCategory = [
  { name: 'Food', value: 800, fill: 'hsl(var(--chart-1))' },
  { name: 'Transport', value: 400, fill: 'hsl(var(--chart-2))' },
  { name: 'Entertainment', value: 300, fill: 'hsl(var(--chart-3))' },
  { name: 'Utilities', value: 600, fill: 'hsl(var(--chart-4))' },
];

const monthlyTrend = [
  { month: 'Oct', income: 4800, expenses: 3400 },
  { month: 'Nov', income: 5000, expenses: 3300 },
  { month: 'Dec', income: 4900, expenses: 3600 },
  { month: 'Jan', income: 5100, expenses: 3200 },
  { month: 'Feb', income: 4800, expenses: 3100 },
  { month: 'Mar', income: 5200, expenses: 3100 },
];

export { expensesByCategory, monthlyStats, monthlyTrend, recentTransactions };
