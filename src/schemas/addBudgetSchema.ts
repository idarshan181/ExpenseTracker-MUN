import { z } from 'zod';

export const budgetSchema = z.object({
  id: z.string().optional(), // Optional since it's auto-generated
  bname: z.string().optional(), // Optional budget name
  description: z.string().optional(), // Optional description
  categoryId: z.string().optional(), // Optional category ID
  currency: z.string().optional().default('CAD'), // Default to "CAD"
  amount: z.number().min(0, 'Amount must be a positive number'), // Decimal (10,2) equivalent
  period: z.string().optional(), // Optional period
  startDate: z.date(), // No restriction, can be past or future
  endDate: z.date().optional(),
  isActive: z.boolean().default(true), // Default value
  createdAt: z.string().optional(), // Auto-generated timestamp
  updatedAt: z.string().optional(), // Auto-generated timestamp
}).superRefine((data, ctx) => {
  if (data.endDate && data.startDate && data.endDate <= data.startDate) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'End date must be after start date',
      path: ['endDate'],
    });
  }
});

// Type inference for TypeScript
export type typeAddBudget = z.infer<typeof budgetSchema> & {
  category?: { id: number; name: string } | null; // Ensure category exists in type
};
