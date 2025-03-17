export type Budget = {
  id: string;
  userId: string;
  categoryId?: string;
  currency: string;
  amount: number;
  period: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  category?: { id: string; name: string };
};
