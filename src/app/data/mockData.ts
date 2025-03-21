import { Budget } from '@/types/budgets';
import { TransactionStatus } from '../../../types/TransactionStatus';

// Mock data
const monthlyStats = {
  income: 5200,
  previousIncome: 4800,
  expenses: 3100,
  previousExpenses: 3400,
  balance: 2100,
  savings: 800,
};

const transactions = [
  {
    id: '1',
    date: '2024-03-15',
    description: 'Grocery Shopping',
    category: 'Food',
    amount: -120.50,
    method: 'Credit Card',
    status: TransactionStatus.Completed,
    recurring: false,
    notes: 'Weekly groceries from Whole Foods',
  },
  {
    id: '2',
    date: '2024-03-14',
    description: 'Salary Deposit',
    category: 'Income',
    amount: 3200.00,
    method: 'Bank Transfer',
    status: TransactionStatus.Completed,
    recurring: true,
    notes: 'Monthly salary',
  },
];

const budgets: Budget[] = [
  {
    id: '1',
    bname: 'Food Budget', // ✅ Added bname
    userId: 'user_01',
    categoryId: '1',
    currency: 'CAD',
    amount: 1500,
    period: 'monthly',
    startDate: '2024-01-01T00:00:00.000Z',
    endDate: '2024-12-31T23:59:59.999Z',
    isActive: true,
    createdAt: '2024-01-01T08:30:15.123Z',
    updatedAt: '2024-03-01T14:20:45.789Z',
    category: { id: '1', name: 'Food' },
  },
  {
    id: '2',
    bname: 'Shopping Budget', // ✅ Added bname
    userId: 'user_01',
    categoryId: '4',
    currency: 'CAD',
    amount: 300,
    period: 'monthly',
    startDate: '2024-03-01T00:00:00.000Z',
    endDate: '2024-12-31T23:59:59.999Z',
    isActive: true,
    createdAt: '2024-03-01T09:15:22.456Z',
    updatedAt: '2024-03-15T16:45:30.001Z',
    category: { id: '4', name: 'Shopping' },
  },
  {
    id: '3',
    bname: 'Utilities Budget', // ✅ Added bname
    userId: 'user_01',
    categoryId: '2',
    currency: 'CAD',
    amount: 500,
    period: 'monthly',
    startDate: '2024-01-01T00:00:00.000Z',
    endDate: '2024-12-31T23:59:59.999Z',
    isActive: true,
    createdAt: '2024-01-01T10:00:00.000Z',
    updatedAt: '2024-03-01T11:30:15.200Z',
    category: { id: '2', name: 'Utilities' },
  },
  {
    id: '4',
    bname: 'Housing Budget', // ✅ Added bname
    userId: 'user_01',
    categoryId: '14',
    currency: 'CAD',
    amount: 2000,
    period: 'monthly',
    startDate: '2024-03-01T00:00:00.000Z',
    endDate: '2024-12-31T23:59:59.999Z',
    isActive: false,
    createdAt: '2024-02-15T14:25:10.500Z',
    updatedAt: '2024-03-01T09:45:05.300Z',
    category: { id: '14', name: 'Housing' },
  },
];

const budgetCard = [
  {
    id: '1',
    category: 'Food & Dining',
    limit: 1000,
    spent: 800,
    remaining: 200,
    status: 'on_track',
    transactions: 15,
  },
  {
    id: '2',
    category: 'Transportation',
    limit: 500,
    spent: 480,
    remaining: 20,
    status: 'warning',
    transactions: 8,
  },
  {
    id: '3',
    category: 'Entertainment',
    limit: 300,
    spent: 350,
    remaining: -50,
    status: 'exceeded',
    transactions: 5,
  },
  {
    id: '4',
    category: 'Shopping',
    limit: 600,
    spent: 250,
    remaining: 350,
    status: 'on_track',
    transactions: 3,
  },
  {
    id: '5',
    category: 'Utilities',
    limit: 400,
    spent: 380,
    remaining: 20,
    status: 'warning',
    transactions: 4,
  },
];

const topSpending = [
  { category: 'Food', amount: 800, percentage: 27.6, trend: 'up' },
  { category: 'Utilities', amount: 600, percentage: 20.7, trend: 'down' },
  { category: 'Shopping', amount: 500, percentage: 17.2, trend: 'up' },
  { category: 'Transport', amount: 400, percentage: 13.8, trend: 'down' },
];

const expensesByCategory = [
  { name: 'Food', value: 800, fill: 'hsl(var(--chart-1))' },
  { name: 'Transport', value: 400, fill: 'hsl(var(--chart-2))' },
  { name: 'Entertainment', value: 300, fill: 'hsl(var(--chart-3))' },
  { name: 'Utilities', value: 600, fill: 'hsl(var(--chart-4))' },
  { name: 'Shopping', value: 500, fill: 'hsl(var(--chart-5))' },
  { name: 'Health', value: 350, fill: 'hsl(var(--chart-6))' },
];

const monthlyTrend = [
  { month: 'Oct', income: 4800, expenses: 3400, savings: 1400 },
  { month: 'Nov', income: 5000, expenses: 3300, savings: 1700 },
  { month: 'Dec', income: 4900, expenses: 3600, savings: 1300 },
  { month: 'Jan', income: 5100, expenses: 3200, savings: 1900 },
  { month: 'Feb', income: 4800, expenses: 3100, savings: 1700 },
  { month: 'Mar', income: 5200, expenses: 3100, savings: 2100 },
];

export { budgetCard, budgets, expensesByCategory, monthlyStats, monthlyTrend, topSpending, transactions };
