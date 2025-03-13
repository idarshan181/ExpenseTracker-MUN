import { BarChart, Boxes, Home, Target, Wallet } from 'lucide-react';

export const sidebarItems = [
  { icon: Home, label: 'Dashboard', value: '/dashboard' },
  { icon: Wallet, label: 'Transactions', value: '/transactions' },
  { icon: BarChart, label: 'Reports & Insights', value: '/reports' },
  { icon: Boxes, label: 'Categories', value: '/categories' },
  { icon: Target, label: 'Budgets', value: '/budgets' },
];
