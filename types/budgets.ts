export type Budget = {
  id: number;
  userId: string;
  categoryId?: number;
  currency: string;
  amount: number;
  period: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  category?: { id: number; name: string };
};
