export type Transaction = {
  id: string;
  createdAt: string;
  description: string;
  notes?: string;
  categoryId: string;
  category: { id: string; name: string } | null;
  amount: number;
  source: string;
  status: 'completed' | 'pending' | 'failed';
};
