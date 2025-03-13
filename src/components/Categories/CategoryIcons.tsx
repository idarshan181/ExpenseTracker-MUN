import { Banknote, Bus, Car, ClipboardList, CreditCard, FileText, Gift, GraduationCap, Home, Package, PartyPopper, PiggyBank, Plane, Shield, ShoppingCart, Stethoscope, Utensils, Wallet } from 'lucide-react';

export const availableCategories = [
  { name: 'Food & Dining', icon: Utensils, color: 'text-red-500 dark:text-red-400' },
  { name: 'Grocery', icon: ShoppingCart, color: 'text-green-500 dark:text-green-400' },
  { name: 'Savings', icon: PiggyBank, color: 'text-yellow-500 dark:text-yellow-400' },
  { name: 'Income', icon: Banknote, color: 'text-emerald-500 dark:text-emerald-400' },
  { name: 'Expense', icon: CreditCard, color: 'text-rose-500 dark:text-rose-400' },
  { name: 'Entertainment', icon: PartyPopper, color: 'text-purple-500 dark:text-purple-400' },
  { name: 'Transport', icon: Bus, color: 'text-blue-500 dark:text-blue-400' },
  { name: 'Bills & Utilities', icon: FileText, color: 'text-orange-500 dark:text-orange-400' },
  { name: 'Insurance', icon: Shield, color: 'text-indigo-500 dark:text-indigo-400' },
  { name: 'Vehicle', icon: Car, color: 'text-gray-500 dark:text-gray-400' },
  { name: 'Rent & Housing', icon: Home, color: 'text-teal-500 dark:text-teal-400' },
  { name: 'Travel', icon: Plane, color: 'text-cyan-500 dark:text-cyan-400' },
  { name: 'Education', icon: GraduationCap, color: 'text-sky-500 dark:text-sky-400' },
  { name: 'Healthcare', icon: Stethoscope, color: 'text-amber-500 dark:text-amber-400' },
  { name: 'Subscriptions', icon: ClipboardList, color: 'text-lime-500 dark:text-lime-400' },
  { name: 'Gifts & Donations', icon: Gift, color: 'text-yellow-500 dark:text-yellow-400' },
  { name: 'Cash Transactions', icon: Wallet, color: 'text-neutral-500 dark:text-neutral-400' },
  { name: 'Miscellaneous', icon: Package, color: 'text-gray-500 dark:text-gray-400' },
];

// Default Fallbacks
export const DEFAULT_ICON = Package;
export const DEFAULT_COLOR = 'text-primary';
