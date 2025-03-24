export type Budget = {
  bname: string;
  id: string;
  userId: string;
  categoryId?: string;
  category: { id: string; name: string } | null;
  currency: string;
  amount: number;
  period: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type BudgetCardType = {
  id: string;
  category: { id: string; name: string };
  limit: number;
  spent: number;
  remaining: number;
  status: 'on_track' | 'warning' | 'exceeded';
  transactions: number;
  amount: number;
  categoryId: string;
};
