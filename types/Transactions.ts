export type Transaction = {
  id: number;
  createdAt: string;
  description: string;
  notes?: string;
  categoryId: number;
  category: { id: number; name: string } | null;
  amount: number;
  source: string;
  status: 'completed' | 'pending' | 'failed';
};
